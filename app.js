var WORKSPACE_MODE = (typeof google !== 'undefined' && !!google.script && !!google.script.run);

var CURRENT_USER = 'Oreoluwa';
var CURRENT_USER_ROLE = 'Admin';

var STATUS_FLOW = ['New','Triaged','Assigned','In Progress','Waiting','Review','Approved','Done'];
var STATUS_COLOR = {
  'New':'#8E90A3','Triaged':'#3B6FD4','Assigned':'#3B6FD4','In Progress':'#D9A62E',
  'Waiting':'#946A0C','Review':'#7C5CBF','Approved':'#2E9B5F','Done':'#2E9B5F','Blocked':'#D64545'
};
var TYPE_ICON = {
  'Bug':'[Bug]','Feature':'[Feature]','Task':'[Task]','Idea':'[Idea]','Incident':'[!]',
  'Customer Request':'[Req]','Growth':'[Growth]','Documentation':'[Doc]','Research':'[Research]','Deployment':'[Deploy]'
};

var DB = {
  team: [
    {name:'Oreoluwa',email:'oreoluwa@wecollect.co',slack_handle:'U01OREO',department:'Leadership',role:'Admin'},
    {name:'Chidi',email:'chidi@wecollect.co',slack_handle:'U02CHIDI',department:'Engineering',role:'Team Lead'},
    {name:'Sarah',email:'sarah@wecollect.co',slack_handle:'U03SARAH',department:'Growth',role:'Staff'},
    {name:'Tunde',email:'tunde@wecollect.co',slack_handle:'U04TUNDE',department:'Operations',role:'Staff'}
  ],
  projects: [
    {project_id:'p1',name:'Guinness Study',department:'Operations',phase:'QA',start_date:'2026-06-01',target_date:'2026-09-01',status:'Active'},
    {project_id:'p2',name:'Dashboard Revamp',department:'Engineering',phase:'In Progress',start_date:'2026-07-01',target_date:'2026-08-20',status:'Active'}
  ],
  tickets: [
    {ticket_id:'WC-1042',title:'Dashboard Export Bug',description:'CSV export fails for boards over 500 rows.',type:'Bug',department:'Engineering',priority:'High',status:'In Progress',owner:'Chidi',reporter:'Oreoluwa',project_id:'p2',due_date:'2026-08-08',created_at:'2026-08-01T09:00:00Z',updated_at:'2026-08-04T10:20:00Z',source:'Manual',tags:'export,csv'},
    {ticket_id:'WC-1043',title:'GPS points drifting on Kano dataset',description:'Several records show coordinates offshore.',type:'Bug',department:'Engineering',priority:'Urgent',status:'Blocked',owner:'Chidi',reporter:'Tunde',project_id:'p1',due_date:'2026-08-07',created_at:'2026-08-02T09:00:00Z',updated_at:'2026-08-05T14:10:00Z',source:'Manual',tags:'gps'},
    {ticket_id:'WC-1044',title:'Questionnaire translation review',description:'Hausa translation needs a second pass.',type:'Task',department:'Operations',priority:'Medium',status:'Waiting',owner:'Tunde',reporter:'Oreoluwa',project_id:'p1',due_date:'2026-08-10',created_at:'2026-08-03T09:00:00Z',updated_at:'2026-08-03T09:00:00Z',source:'Manual',tags:''},
    {ticket_id:'WC-1045',title:'August newsletter draft',description:'',type:'Growth',department:'Growth',priority:'Medium',status:'Review',owner:'Sarah',reporter:'Sarah',project_id:'',due_date:'2026-08-06',created_at:'2026-08-01T09:00:00Z',updated_at:'2026-08-06T08:00:00Z',source:'Manual',tags:''},
    {ticket_id:'WC-1046',title:'Client proposal  -  FSD Africa follow-up',description:'',type:'Customer Request',department:'Growth',priority:'High',status:'New',owner:'Sarah',reporter:'Oreoluwa',project_id:'',due_date:'2026-08-12',created_at:'2026-08-05T09:00:00Z',updated_at:'2026-08-05T09:00:00Z',source:'Manual',tags:''},
    {ticket_id:'WC-1047',title:'Deploy Delta build to staging',description:'',type:'Deployment',department:'Operations',priority:'Medium',status:'Approved',owner:'Tunde',reporter:'Chidi',project_id:'p2',due_date:'2026-08-06',created_at:'2026-08-04T09:00:00Z',updated_at:'2026-08-05T16:00:00Z',source:'Manual',tags:''},
    {ticket_id:'WC-1048',title:'Authentication module',description:'',type:'Feature',department:'Engineering',priority:'High',status:'In Progress',owner:'Chidi',reporter:'Oreoluwa',project_id:'p2',due_date:'2026-08-09',created_at:'2026-08-02T09:00:00Z',updated_at:'2026-08-05T11:00:00Z',source:'Manual',tags:''}
  ],
  activities: [
    {activity_id:'a1',ticket_id:'WC-1042',timestamp:'2026-08-01T09:00:00Z',actor:'Oreoluwa',action:'Created',old_value:'',new_value:'New'},
    {activity_id:'a2',ticket_id:'WC-1042',timestamp:'2026-08-01T09:15:00Z',actor:'Oreoluwa',action:'Changed owner',old_value:'',new_value:'Chidi'},
    {activity_id:'a3',ticket_id:'WC-1042',timestamp:'2026-08-04T10:20:00Z',actor:'Chidi',action:'Changed status',old_value:'Assigned',new_value:'In Progress'}
  ],
  meetings: [
    {meeting_id:'m1',title:'Leadership Weekly',date:'2026-08-04',participants:'Oreoluwa, Chidi, Sarah',project_id:'',raw_notes:'Chidi should complete export functionality by Friday. Move the launch date to next week  -  QA needs more time. Switch website headline to reflect brand positioning update.',ai_summary:'',ai_decisions_json:'',processed:'no'}
  ],
  decisions: [
    {decision_id:'d1',decision_text:'Switch Website Headline',reason:'Brand Positioning',owner:'Sarah',meeting_id:'m1',affected_ticket_ids:'',status:'Active'}
  ],
  notifications_log: [],
  templates: [
    {template_id:'t1',name:'Bug report checklist',title:'Bug report',description:'',type:'Bug',department:'Engineering',priority:'Medium',checklist_json:'[{"text":"Reproduce the issue","done":false},{"text":"Identify root cause","done":false},{"text":"Write fix","done":false},{"text":"Test fix","done":false}]'}
  ],
  oneOnOnes: []
};

var STATE = { module: 'dashboard', editingTicketId: null };

var LOADING_COUNT = 0;
function setLoading(isLoading){
  LOADING_COUNT += isLoading ? 1 : -1;
  if(LOADING_COUNT < 0) LOADING_COUNT = 0;
  var ind = document.getElementById('loadingIndicator');
  if(ind) ind.style.display = LOADING_COUNT > 0 ? 'inline-flex' : 'none';
}

function api(action, payload) {
  setLoading(true);
  var finish = function(res){ setLoading(false); return res; };
  if (!WORKSPACE_MODE) return Promise.resolve(finish(mockApi(action, payload)));
  return new Promise(function(resolve){
    google.script.run
      .withSuccessHandler(function(res){ resolve(finish(res)); })
      .withFailureHandler(function(err){ resolve(finish({ ok:false, error: (err && err.message) || String(err) })); })
      .apiCall(action, payload || {});
  });
}

function mockApi(action, payload) {
  switch(action){
    case 'getAll': return { ok:true, data: DB };
    case 'createTicket': {
      var t = Object.assign({ticket_id:'WC-'+(1049+DB.tickets.length),created_at:new Date().toISOString(),updated_at:new Date().toISOString(),status:'New',source:'Manual'}, payload);
      DB.tickets.push(t);
      DB.activities.push({activity_id:'a'+Math.random(),ticket_id:t.ticket_id,timestamp:new Date().toISOString(),actor:t.reporter||CURRENT_USER,action:'Created',old_value:'',new_value:'New'});
      return { ok:true, ticket:t };
    }
    case 'updateTicket': {
      var t = DB.tickets.filter(function(x){return x.ticket_id===payload.ticket_id;})[0];
      if(!t) return {ok:false};
      Object.keys(payload).forEach(function(k){
        if(k==='ticket_id'||k==='actor') return;
        if(String(t[k])!==String(payload[k])){
          DB.activities.push({activity_id:'a'+Math.random(),ticket_id:t.ticket_id,timestamp:new Date().toISOString(),actor:payload.actor||CURRENT_USER,action:'Changed '+k,old_value:t[k],new_value:payload[k]});
        }
        t[k]=payload[k];
      });
      t.updated_at = new Date().toISOString();
      return {ok:true};
    }
    case 'submitMeeting': {
      var m = Object.assign({meeting_id:'m'+(DB.meetings.length+1),ai_summary:'',ai_decisions_json:'',processed:'no'}, payload);
      DB.meetings.push(m);
      return {ok:true, meeting:m};
    }
    case 'processMeetingWithAI': {
      var m = DB.meetings.filter(function(x){return x.meeting_id===payload.meeting_id;})[0];
      var sim = simulateMeetingParse(m.raw_notes);
      m.ai_summary = sim.summary; m.processed='pending_review';
      return { ok:true, proposals: sim };
    }
    case 'approveMeetingTickets': {
      var created=[], updated=[];
      (payload.action_items||[]).forEach(function(item){
        if(item.match_ticket_id){
          var t = DB.tickets.filter(function(x){return x.ticket_id===item.match_ticket_id;})[0];
          if(t){ t.due_date = item.due_date||t.due_date; updated.push(t.ticket_id); }
        } else {
          var nt = {ticket_id:'WC-'+(1049+DB.tickets.length+created.length),title:item.description,type:item.suggested_type||'Task',department:item.suggested_department||'',priority:'Medium',status:'New',owner:item.owner||'',reporter:'AI (meeting)',project_id:'',due_date:item.due_date||'',created_at:new Date().toISOString(),updated_at:new Date().toISOString(),source:'Meeting',source_ref:payload.meeting_id,tags:''};
          DB.tickets.push(nt); created.push(nt.ticket_id);
        }
      });
      (payload.decisions||[]).forEach(function(d){
        DB.decisions.push({decision_id:'d'+Math.random(),decision_text:d.decision_text,reason:d.reason,owner:d.owner,meeting_id:payload.meeting_id,affected_ticket_ids:created.concat(updated).join(','),status:'Active'});
      });
      var mm = DB.meetings.filter(function(x){return x.meeting_id===payload.meeting_id;})[0];
      mm.processed='yes';
      return {ok:true, result:{created_tickets:created, updated_tickets:updated}};
    }
    case 'commandQuery': {
      var q = payload.query.toLowerCase();
      var results = DB.tickets.filter(function(t){
        var deptMatch = ['engineering','operations','growth'].filter(function(d){return q.indexOf(d)>-1;})[0];
        var statusMatch = STATUS_FLOW.concat(['blocked']).filter(function(s){return q.indexOf(s.toLowerCase())>-1;})[0];
        if(deptMatch && t.department.toLowerCase()!==deptMatch) return false;
        if(statusMatch && t.status.toLowerCase()!==statusMatch.toLowerCase()) return false;
        if(!deptMatch && !statusMatch) return q==='' ? true : (t.title.toLowerCase().indexOf(q)>-1);
        return true;
      });
      return {ok:true, explanation:'Local keyword match (connect Gemini for real natural-language parsing).', results:results};
    }
    case 'createTeamMember': {
      if(!payload.name || !payload.email) return {ok:false, error:'Name and email are required.'};
      if(DB.team.some(function(p){return p.email===payload.email;})) return {ok:false, error:'Someone with that email is already on the team.'};
      var member = {name:payload.name, email:payload.email, slack_handle:payload.slack_handle||'', department:payload.department||'', role:payload.role||'Staff'};
      DB.team.push(member);
      return {ok:true, member:member};
    }
    case 'saveTemplate': {
      var tmpl = {template_id:'t'+Math.random(), name:payload.name, title:payload.title||'', description:payload.description||'', type:payload.type||'Task', department:payload.department||'', priority:payload.priority||'Medium', checklist_json:payload.checklist_json||'[]'};
      DB.templates.push(tmpl);
      return {ok:true, template:tmpl};
    }
    case 'createTicketFromTemplate': {
      var srcT = DB.templates.filter(function(x){return x.template_id===payload.template_id;})[0];
      if(!srcT) return {ok:false, error:'Template not found.'};
      return mockApi('createTicket', Object.assign({}, srcT, payload));
    }
    case 'scheduleMeeting': {
      if(!payload.description) return {ok:false, error:'A meeting description is required so an agenda can be generated.'};
      var meeting = {
        meeting_id:'m'+(DB.meetings.length+1), title:payload.title||'Meeting', date:payload.date, time:payload.time||'',
        participants:(payload.invitees||[]).join(', '), invitees_json:JSON.stringify(payload.invitees||[]),
        description:payload.description, agenda:'- Discuss: '+payload.description.slice(0,60)+'\n- Next steps\n- Q&A',
        meeting_link:payload.meeting_link||'', raw_notes:'', ai_summary:'', ai_decisions_json:'', processed:'no', scheduled_by:CURRENT_USER
      };
      DB.meetings.push(meeting);
      return {ok:true, meeting:meeting};
    }
    case 'createOneOnOne': {
      var session = {session_id:'s'+Math.random(), team_member_name:payload.team_member_name, date:payload.date, agenda:payload.agenda||'', notes:'', status:'Scheduled', created_by:CURRENT_USER};
      DB.oneOnOnes.push(session);
      return {ok:true, session:session};
    }
    case 'updateOneOnOne': {
      var s = DB.oneOnOnes.filter(function(x){return x.session_id===payload.session_id;})[0];
      if(!s) return {ok:false, error:'Session not found.'};
      if(payload.hasOwnProperty('notes')) s.notes = payload.notes;
      if(payload.hasOwnProperty('status')) s.status = payload.status;
      return {ok:true, updated:true};
    }
  }
}

function simulateMeetingParse(notes){
  var openTickets = DB.tickets.filter(function(t){return t.status!=='Done';});
  var items = [];
  var decisions = [];
  notes.split(/[.\n]/).map(function(s){return s.trim();}).filter(Boolean).forEach(function(sentence){
    var lower = sentence.toLowerCase();
    if(lower.indexOf('complete')>-1 || lower.indexOf('should')>-1){
      var person = DB.team.filter(function(p){return lower.indexOf(p.name.toLowerCase())>-1;})[0];
      var match = openTickets.filter(function(t){return lower.indexOf(t.title.toLowerCase().split(' ')[0])>-1;})[0];
      items.push({description:sentence, owner:person?person.name:'', due_date:'', match_ticket_id: match?match.ticket_id:'', suggested_type:'Task', suggested_department: person?person.department:''});
    } else if(lower.indexOf('move')>-1 || lower.indexOf('switch')>-1 || lower.indexOf('change')>-1){
      decisions.push({decision_text: sentence, reason:'From meeting notes', owner: CURRENT_USER});
    }
  });
  return { summary: notes.slice(0,140)+'...', decisions: decisions, action_items: items };
}

var MODULES = [
  {group:'', items:[{id:'dashboard',label:'Dashboard',ico:'Home'}]},
  {group:'Work', items:[
    {id:'tickets',label:'Ticket System',ico:'Tix'},
    {id:'board',label:'Workflow Board',ico:'='},
    {id:'calendar',label:'Calendar',ico:'#'},
    {id:'projects',label:'Projects',ico:'[]'}
  ]},
  {group:'Team', items:[
    {id:'meetings',label:'Meetings',ico:'Talk'},
    {id:'standup',label:'Stand-up Mode',ico:'*'},
    {id:'oneonones',label:'One-on-Ones',ico:'2'},
    {id:'feed',label:'Activity Feed',ico:'~'},
    {id:'workload',label:'Workload',ico:'|'},
    {id:'teamspaces',label:'Team Spaces',ico:'#'}
  ]},
  {group:'Intelligence', items:[
    {id:'command',label:'AI Command Center',ico:'*'},
    {id:'decisions',label:'Decision Register',ico:'!'},
    {id:'adminlog',label:'Admin Activity Log',ico:'='},
    {id:'notifications',label:'Notifications',ico:'!'}
  ]}
];

function renderNav(){
  var html = '';
  MODULES.forEach(function(g){
    if(g.group) html += '<div class="nav-label">'+g.group+'</div>';
    g.items.forEach(function(m){
      if(m.id==='oneonones' && CURRENT_USER_ROLE!=='Admin') return;
      var active = STATE.module===m.id ? ' active' : '';
      html += '<div class="nav-item'+active+'" onclick="goTo(\''+m.id+'\')"><span class="nav-ico">'+m.ico+'</span>'+m.label+'</div>';
    });
  });
  document.getElementById('navList').innerHTML = html;
}

function goTo(id){
  STATE.module = id;
  renderNav();
  var titles = {}; MODULES.forEach(function(g){g.items.forEach(function(m){titles[m.id]=m.label;});});
  document.getElementById('pageTitle').textContent = titles[id];
  render();
}

function el(html){ var d=document.createElement('div'); d.innerHTML=html; return d.firstElementChild; }
function fmtDate(d){ if(!d) return ' - '; var dt = new Date(d); if(isNaN(dt)) return d; return dt.toLocaleDateString('en-US',{month:'short',day:'numeric'}); }
function fmtDateTime(d){ if(!d) return ' - '; var dt = new Date(d); if(isNaN(dt)) return d; return dt.toLocaleDateString('en-US',{month:'short',day:'numeric'})+' - '+dt.toLocaleTimeString('en-US',{hour:'numeric',minute:'2-digit'}); }
function initials(name){ return (name||'?').split(' ').map(function(w){return w[0];}).join('').toUpperCase().slice(0,2); }
function typeIcon(t){ return TYPE_ICON[t] || '[Task]'; }

function render(){
  var c = document.getElementById('content');
  var renderers = {
    dashboard: renderDashboard, tickets: renderTickets, board: renderBoard,
    calendar: renderCalendar, projects: renderProjects, meetings: renderMeetings,
    standup: renderStandup, feed: renderFeed, workload: renderWorkload,
    teamspaces: renderTeamSpaces, command: renderCommand, decisions: renderDecisions,
    adminlog: renderAdminLog, notifications: renderNotifications, oneonones: renderOneOnOnes
  };
  c.innerHTML = '';
  c.appendChild(renderers[STATE.module]());
  populateSelects();
}

function visibleTickets(){
  return DB.tickets.filter(function(t){ return t.source !== 'OneOnOne'; });
}

function renderDashboard(){
  var t = visibleTickets();
  var blocked = t.filter(function(x){return x.status==='Blocked';});
  var review = t.filter(function(x){return x.status==='Review';});
  var dueToday = t.filter(function(x){return x.due_date===new Date().toISOString().slice(0,10);});
  var myWork = t.filter(function(x){return x.owner===CURRENT_USER;});
  var completedToday = t.filter(function(x){return x.status==='Done';}).length;
  var overdue = t.filter(function(x){return x.due_date && x.due_date < new Date().toISOString().slice(0,10) && x.status!=='Done';});

  var wrap = el('<div></div>');
  wrap.innerHTML = `
    <div class="section-title">Admin Dashboard</div>
    <div class="stat-grid">
      <div class="stat-card"><div class="stat-num">${t.length}</div><div class="stat-lbl">Total Open Tickets</div></div>
      <div class="stat-card accent-amber"><div class="stat-num">${t.filter(x=>x.department==='Engineering').length}</div><div class="stat-lbl">Engineering</div></div>
      <div class="stat-card accent-amber"><div class="stat-num">${t.filter(x=>x.department==='Operations').length}</div><div class="stat-lbl">Operations</div></div>
      <div class="stat-card accent-amber"><div class="stat-num">${t.filter(x=>x.department==='Growth').length}</div><div class="stat-lbl">Growth</div></div>
      <div class="stat-card accent-green"><div class="stat-num">${completedToday}</div><div class="stat-lbl">Completed Today</div></div>
      <div class="stat-card accent-red"><div class="stat-num">${blocked.length}</div><div class="stat-lbl">Blocked</div></div>
      <div class="stat-card accent-red"><div class="stat-num">${overdue.length}</div><div class="stat-lbl">Overdue</div></div>
      <div class="stat-card accent-violet"><div class="stat-num">${DB.meetings.length}</div><div class="stat-lbl">Meetings</div></div>
      <div class="stat-card"><div class="stat-num">${DB.projects.filter(p=>p.status==='Active').length}</div><div class="stat-lbl">Projects Running</div></div>
    </div>

    <div class="dash-grid">
      <div>
        <div class="card">
          <div class="card-h">My Work <span class="thin-tag">${myWork.length} tickets</span></div>
          <div id="myWorkList"></div>
        </div>
        <div class="card" style="margin-top:14px;">
          <div class="card-h">Blocked Tickets</div>
          <div id="blockedList"></div>
        </div>
        <div class="card" style="margin-top:14px;">
          <div class="card-h">Waiting For Review</div>
          <div id="reviewList"></div>
        </div>
      </div>
      <div>
        <div class="card">
          <div class="card-h">Today's Meetings</div>
          <div id="meetingsToday"></div>
        </div>
        <div class="card" style="margin-top:14px;">
          <div class="card-h">Tasks Due</div>
          <div id="dueList"></div>
        </div>
        <div class="card" style="margin-top:14px;">
          <div class="card-h">Team Activity</div>
          <div id="teamActivityMini"></div>
        </div>
      </div>
    </div>
  `;

  function rowList(container, arr, empty){
    var box = wrap.querySelector(container);
    if(!arr.length){ box.innerHTML = '<div class="empty">'+empty+'</div>'; return; }
    box.innerHTML = arr.slice(0,6).map(function(x){
      return `<div class="thin-row"><span class="thin-dot" style="background:${STATUS_COLOR[x.status]||'#ccc'}"></span>
        <span class="thin-title" onclick="openTicketDetail('${x.ticket_id}')" style="cursor:pointer">${typeIcon(x.type)} ${x.title}</span>
        <span class="thin-tag">${x.owner||'unassigned'}</span></div>`;
    }).join('');
  }
  rowList('#myWorkList', myWork, 'Nothing assigned to you right now.');
  rowList('#blockedList', blocked, 'No blocked tickets. ');
  rowList('#reviewList', review, 'Nothing waiting for review.');
  rowList('#dueList', dueToday, 'Nothing due today.');

  var mtBox = wrap.querySelector('#meetingsToday');
  var todays = DB.meetings.filter(function(m){return m.date===new Date().toISOString().slice(0,10);});
  mtBox.innerHTML = todays.length ? todays.map(function(m){return `<div class="thin-row"><span class="thin-title">${m.title}</span><span class="thin-tag">${m.participants}</span></div>`;}).join('') : '<div class="empty">No meetings logged for today.</div>';

  var actBox = wrap.querySelector('#teamActivityMini');
  var recentAct = DB.activities.slice(-6).reverse();
  actBox.innerHTML = recentAct.length ? recentAct.map(function(a){
    return `<div class="thin-row"><span class="thin-title">${a.actor}  -  ${a.action}</span><span class="thin-tag">${fmtDate(a.timestamp)}</span></div>`;
  }).join('') : '<div class="empty">No recent activity.</div>';

  return wrap;
}

var TICKET_TABLE_COLS = [
  {key:'ticket_id', label:'ID'}, {key:'title', label:'Title'}, {key:'department', label:'Department'},
  {key:'priority', label:'Priority'}, {key:'status', label:'Status'}, {key:'owner', label:'Owner'}, {key:'due_date', label:'Due'}
];

function renderTickets(){
  if(!STATE.ticketFilters) STATE.ticketFilters = {q:'', dept:'All', status:'All', sortBy:'updated_at', sortDir:'desc'};
  var f = STATE.ticketFilters;
  var wrap = el('<div></div>');
  var depts = ['All','Engineering','Operations','Growth'];
  var statuses = ['All'].concat(STATUS_FLOW).concat(['Blocked']);

  wrap.innerHTML = `
    <div class="section-title">All Tickets - filterable, sortable list (use Workflow Board for the visual flow view)</div>
    <div class="card" style="margin-bottom:12px;padding:12px 16px;">
      <div style="display:flex;gap:10px;flex-wrap:wrap;align-items:center;">
        <input id="ticketFilterQ" placeholder="Filter by title or ID..." value="${f.q}" style="flex:1;min-width:180px;padding:7px 10px;border:1px solid var(--line);border-radius:6px;font-family:inherit;font-size:12.5px;">
        <select id="ticketFilterDept" style="padding:7px 10px;border:1px solid var(--line);border-radius:6px;font-family:inherit;font-size:12.5px;">
          ${depts.map(function(d){return `<option ${d===f.dept?'selected':''}>${d}</option>`;}).join('')}
        </select>
        <select id="ticketFilterStatus" style="padding:7px 10px;border:1px solid var(--line);border-radius:6px;font-family:inherit;font-size:12.5px;">
          ${statuses.map(function(s){return `<option ${s===f.status?'selected':''}>${s}</option>`;}).join('')}
        </select>
        <span class="thin-tag" id="ticketFilterCount"></span>
      </div>
    </div>
    <div class="card" style="padding:0;overflow-x:auto;">
      <table>
        <thead><tr id="ticketTableHead"></tr></thead>
        <tbody id="ticketTableBody"></tbody>
      </table>
    </div>`;

  wrap.querySelector('#ticketFilterQ').addEventListener('input', function(e){ STATE.ticketFilters.q = e.target.value; renderTicketRows(); });
  wrap.querySelector('#ticketFilterDept').addEventListener('change', function(e){ STATE.ticketFilters.dept = e.target.value; renderTicketRows(); });
  wrap.querySelector('#ticketFilterStatus').addEventListener('change', function(e){ STATE.ticketFilters.status = e.target.value; renderTicketRows(); });

  renderTicketRows();
  return wrap;
}

function renderTicketRows(){
  var f = STATE.ticketFilters;
  var headEl = document.getElementById('ticketTableHead');
  var bodyEl = document.getElementById('ticketTableBody');
  var countEl = document.getElementById('ticketFilterCount');
  if(!headEl || !bodyEl) return;

  headEl.innerHTML = TICKET_TABLE_COLS.map(function(c){
    var arrow = f.sortBy===c.key ? (f.sortDir==='asc'?' (asc)':' (desc)') : '';
    return `<th style="cursor:pointer;user-select:none;" onclick="sortTickets('${c.key}')">${c.label}${arrow}</th>`;
  }).join('');

  var list = visibleTickets().filter(function(t){
    if(f.dept!=='All' && t.department!==f.dept) return false;
    if(f.status!=='All' && t.status!==f.status) return false;
    if(f.q && t.title.toLowerCase().indexOf(f.q.toLowerCase())===-1 && t.ticket_id.toLowerCase().indexOf(f.q.toLowerCase())===-1) return false;
    return true;
  });
  list.sort(function(a,b){
    var av=(a[f.sortBy]||''), bv=(b[f.sortBy]||'');
    var cmp = String(av).localeCompare(String(bv));
    return f.sortDir==='asc' ? cmp : -cmp;
  });

  bodyEl.innerHTML = list.map(function(t){
    return `<tr onclick="openTicketDetail('${t.ticket_id}')" style="cursor:pointer">
      <td class="mono">${t.ticket_id}</td>
      <td>${typeIcon(t.type)} ${t.title}</td>
      <td><span class="pill pill-dept">${t.department}</span></td>
      <td><span class="pill pill-prio-${t.priority}">${t.priority}</span></td>
      <td><span class="pill" style="background:${STATUS_COLOR[t.status]}22;color:${STATUS_COLOR[t.status]}">${t.status}</span></td>
      <td>${t.owner||' - '}</td>
      <td>${fmtDate(t.due_date)}</td>
    </tr>`;
  }).join('') || '<tr><td colspan="7" class="empty">No tickets match these filters.</td></tr>';

  if(countEl) countEl.textContent = list.length + ' of ' + visibleTickets().length;
}

function sortTickets(key){
  var f = STATE.ticketFilters;
  if(f.sortBy===key){ f.sortDir = f.sortDir==='asc' ? 'desc' : 'asc'; }
  else { f.sortBy = key; f.sortDir = 'asc'; }
  renderTicketRows();
}

function renderBoard(){
  if(!STATE.boardDeptFilter) STATE.boardDeptFilter = 'All';
  var wrap = el('<div></div>');
  var depts = ['All','Engineering','Operations','Growth'];
  var filterHtml = '<div style="display:flex;gap:6px;margin-bottom:14px;">' + depts.map(function(d){
    var active = STATE.boardDeptFilter===d;
    return `<span class="pill" style="cursor:pointer;padding:5px 12px;${active?'background:var(--ink);color:var(--on-ink);':'background:var(--surface2);color:var(--text-dim);'}" onclick="setBoardFilter('${d}')">${d}</span>`;
  }).join('') + '</div>';

  var cols = STATUS_FLOW.concat(['Blocked']);
  var html = '<div class="board">';
  cols.forEach(function(status){
    var items = visibleTickets().filter(function(t){
      if(t.status!==status) return false;
      if(STATE.boardDeptFilter!=='All' && t.department!==STATE.boardDeptFilter) return false;
      return true;
    });
    html += `<div class="board-col">
      <div class="board-col-h"><span class="board-col-dot" style="background:${STATUS_COLOR[status]}"></span>${status}<span class="board-col-count">${items.length}</span></div>
      <div class="board-drop">${items.map(ticketCardHtml).join('')}</div>
    </div>`;
  });
  html += '</div>';
  wrap.innerHTML = '<div class="section-title">New -> Triaged -> Assigned -> In Progress -> Waiting -> Review -> Approved -> Done</div>' + filterHtml + html;
  return wrap;
}

function setBoardFilter(dept){
  STATE.boardDeptFilter = dept;
  render();
}

function parseChecklist(t){
  try { return JSON.parse(t.checklist_json || '[]'); } catch(e){ return []; }
}

function ticketCardHtml(t){
  var checklist = parseChecklist(t);
  var checklistBadge = checklist.length ? `<span class="thin-tag mono">[${checklist.filter(c=>c.done).length}/${checklist.length}]</span>` : '';
  var VISIBLE_ITEMS = 3;
  var checklistItemsHtml = '';
  if(checklist.length){
    checklistItemsHtml = '<div class="ticket-checklist" onclick="event.stopPropagation()">' +
      checklist.slice(0, VISIBLE_ITEMS).map(function(item, i){
        return `<label class="ticket-checklist-item"><input type="checkbox" ${item.done?'checked':''} onchange="toggleCardChecklistItem('${t.ticket_id}',${i},this.checked)"><span style="${item.done?'text-decoration:line-through;color:var(--text-faint);':''}">${item.text}</span></label>`;
      }).join('') +
      (checklist.length > VISIBLE_ITEMS ? `<div class="thin-tag">+${checklist.length - VISIBLE_ITEMS} more</div>` : '') +
      '</div>';
  }
  return `<div class="ticket" onclick="openTicketDetail('${t.ticket_id}')">
    <div class="ticket-top"><span class="ticket-id">${t.ticket_id}</span><span class="ticket-type">${typeIcon(t.type)}</span>${checklistBadge}</div>
    <div class="ticket-title">${t.title}</div>
    ${checklistItemsHtml}
    <div class="ticket-meta">
      <span class="pill pill-dept">${t.department}</span>
      <span class="pill pill-prio-${t.priority}">${t.priority}</span>
      <span class="owner-chip" title="${t.owner}">${initials(t.owner)}</span>
    </div>
  </div>`;
}

function toggleCardChecklistItem(ticketId, idx, done){
  var t = DB.tickets.filter(function(x){return x.ticket_id===ticketId;})[0];
  if(!t) return;
  var checklist = parseChecklist(t);
  checklist[idx].done = done;
  var json = JSON.stringify(checklist);
  api('updateTicket', {ticket_id:ticketId, checklist_json:json, actor:CURRENT_USER}).then(function(res){
    if(!res.ok){ alert('Could not update checklist: '+(res.error||'Unknown error')); return; }
    t.checklist_json = json;
    render();
  });
}

var CAL_EVENTS_BY_DATE = {};

function renderCalendar(){
  if(!STATE.calendarMonth) STATE.calendarMonth = new Date();
  var wrap = el('<div></div>');
  wrap.innerHTML = `
    <div class="section-title" style="display:flex;align-items:center;gap:10px;">
      <span id="calMonthLabel" style="font-size:15px;color:var(--text);text-transform:none;letter-spacing:0;"></span>
      <span style="margin-left:auto;display:flex;gap:6px;">
        <button class="cal-nav-btn" onclick="shiftCalMonth(-1)">Prev</button>
        <button class="btn btn-ghost" onclick="shiftCalMonth(0)">Today</button>
        <button class="cal-nav-btn" onclick="shiftCalMonth(1)">Next</button>
      </span>
    </div>
    <div id="calSyncNote" class="thin-tag" style="margin-bottom:10px;">Checking calendar sync...</div>
    <div class="card" style="padding:14px;" id="calGridCard"><div class="empty">Loading calendar...</div></div>
    <div class="section-title">Selected Day</div>
    <div class="card" id="calAgenda"><div class="empty">Pick a day above.</div></div>
  `;

  function addEv(map, dateStr, label, type, link){
    if(!dateStr) return;
    (map[dateStr] = map[dateStr] || []).push({label:label, type:type, link:link||''});
  }

  function buildLocalEvents(map){
    DB.tickets.forEach(function(t){ if(t.due_date) addEv(map, t.due_date.slice(0,10), typeIcon(t.type)+' '+t.title+' due', 'Deadline'); });
    DB.projects.forEach(function(p){ if(p.target_date) addEv(map, p.target_date.slice(0,10), 'Project: '+p.name+' target', 'Milestone'); });
    DB.meetings.forEach(function(m){ if(m.date) addEv(map, m.date.slice(0,10), 'Meeting: '+m.title, 'Meeting', m.meeting_link); });
  }

  function paintGrid(eventsByDate){
    CAL_EVENTS_BY_DATE = eventsByDate;
    var month = STATE.calendarMonth;
    wrap.querySelector('#calMonthLabel').textContent = month.toLocaleDateString('en-US',{month:'long',year:'numeric'});
    var y = month.getFullYear(), m = month.getMonth();
    var startOffset = new Date(y,m,1).getDay();
    var daysInMonth = new Date(y,m+1,0).getDate();
    var todayStr = new Date().toISOString().slice(0,10);

    var html = '<div class="cal-dow-row">' + ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(function(d){return '<div class="cal-dow">'+d+'</div>';}).join('') + '</div><div class="cal-cells">';
    for(var i=0;i<startOffset;i++) html += '<div class="cal-cell cal-cell-empty"></div>';
    for(var d=1; d<=daysInMonth; d++){
      var dateStr = y+'-'+String(m+1).padStart(2,'0')+'-'+String(d).padStart(2,'0');
      var evs = eventsByDate[dateStr] || [];
      html += `<div class="cal-cell${dateStr===todayStr?' cal-cell-today':''}" id="cal-${dateStr}" onclick="showCalDay('${dateStr}')">
        <div class="cal-daynum">${d}</div>
        ${evs.slice(0,3).map(function(e){return '<div class="cal-ev">'+e.label+'</div>';}).join('')}
        ${evs.length>3 ? '<div class="cal-more">+'+(evs.length-3)+' more</div>' : ''}
      </div>`;
    }
    html += '</div>';
    wrap.querySelector('#calGridCard').innerHTML = html;
    showCalDay(todayStr);
  }

  var eventsByDate = {};
  buildLocalEvents(eventsByDate);

  if (WORKSPACE_MODE) {
    api('getCalendarEvents', {}).then(function(res){
      var note = wrap.querySelector('#calSyncNote');
      if(res.ok){
        note.innerHTML = 'Synced with ' + res.calendarUsed + ' - ' + res.events.length + ' event(s) pulled in.';
        res.events.forEach(function(e){
          if(!e.start) return;
          addEv(eventsByDate, e.start.slice(0,10), 'Calendar: '+e.title, 'Calendar', e.htmlLink);
        });
      } else {
        note.innerHTML = '<span style="color:var(--red)">Not synced with Google Calendar: '+res.error+'</span>';
      }
      paintGrid(eventsByDate);
    });
  } else {
    wrap.querySelector('#calSyncNote').textContent = 'Calendar sync only applies once this is running through Apps Script.';
    paintGrid(eventsByDate);
  }
  return wrap;
}

function shiftCalMonth(dir){
  var d = STATE.calendarMonth || new Date();
  STATE.calendarMonth = (dir === 0) ? new Date() : new Date(d.getFullYear(), d.getMonth()+dir, 1);
  render();
}

function showCalDay(dateStr){
  document.querySelectorAll('.cal-cell').forEach(function(c){ c.classList.remove('cal-cell-selected'); });
  var cell = document.getElementById('cal-'+dateStr);
  if(cell) cell.classList.add('cal-cell-selected');
  var box = document.getElementById('calAgenda');
  if(!box) return;
  var evs = CAL_EVENTS_BY_DATE[dateStr] || [];
  box.innerHTML = '<div class="thin-tag" style="margin-bottom:8px;">'+fmtDate(dateStr)+'</div>' +
    (evs.length ? evs.map(function(e){
      var linkHtml = e.link ? ` <a href="${e.link}" target="_blank" style="color:var(--blue);">Open</a>` : '';
      return `<div class="thin-row"><span class="thin-title">${e.label}</span><span class="thin-tag">${e.type}${linkHtml}</span></div>`;
    }).join('') : '<div class="empty">Nothing scheduled.</div>');
}

function departmentPills(departmentsStr){
  return (departmentsStr||'').split(',').filter(Boolean).map(function(d){
    return '<span class="pill pill-dept">'+d.trim()+'</span>';
  }).join(' ');
}

function renderProjects(){
  var wrap = el('<div></div>');
  wrap.innerHTML = '<div class="section-title">Projects <button class="btn btn-ghost" style="margin-left:10px" onclick="openNewProjectModal()">+ New Project</button></div><div class="stat-grid" id="projGrid" style="grid-template-columns:repeat(auto-fit,minmax(260px,1fr))"></div>';
  var grid = wrap.querySelector('#projGrid');
  grid.innerHTML = DB.projects.map(function(p){
    var tix = DB.tickets.filter(function(t){return t.project_id===p.project_id;});
    var done = tix.filter(function(t){return t.status==='Done';}).length;
    var pct = tix.length ? Math.round(done/tix.length*100) : 0;
    return `<div class="card" style="cursor:pointer;" onclick="openProjectDetail('${p.project_id}')">
      <div class="card-h">${p.name}</div>
      <div style="margin-bottom:8px;">${departmentPills(p.departments||p.department)}</div>
      <div class="thin-tag" style="margin-bottom:8px;">Phase: <b>${p.phase}</b> - Target ${fmtDate(p.target_date)}</div>
      <div class="wl-bar-track" style="margin-bottom:6px;"><div class="wl-bar-fill" style="width:${pct}%"></div></div>
      <div class="thin-tag">${done}/${tix.length} tickets done</div>
    </div>`;
  }).join('') || '<div class="empty">No projects yet. Click "+ New Project" to create one.</div>';
  return wrap;
}

var NEW_PROJECT_DEPTS = [];

function openNewProjectModal(){
  NEW_PROJECT_DEPTS = [];
  document.getElementById('proj_name').value = '';
  document.getElementById('proj_phase').value = '';
  document.getElementById('proj_start').value = '';
  document.getElementById('proj_target').value = '';
  document.getElementById('proj_status').value = 'Active';
  renderProjectDeptPicker();
  renderProjectTicketPicker();
  openModal('newProjectModalBg');
}

function renderProjectDeptPicker(){
  var box = document.getElementById('proj_depts_picker');
  var depts = ['Engineering','Operations','Growth'];
  box.innerHTML = depts.map(function(d){
    var active = NEW_PROJECT_DEPTS.indexOf(d) > -1;
    return `<span class="ms-chip${active?' ms-chip-active':''}" onclick="toggleProjectDept('${d}')">${d}</span>`;
  }).join('');
}
function toggleProjectDept(d){
  var i = NEW_PROJECT_DEPTS.indexOf(d);
  if(i>-1) NEW_PROJECT_DEPTS.splice(i,1); else NEW_PROJECT_DEPTS.push(d);
  renderProjectDeptPicker();
}

function renderProjectTicketPicker(){
  var box = document.getElementById('proj_tickets_picker');
  var unassigned = visibleTickets().filter(function(t){ return !t.project_id; });
  box.innerHTML = unassigned.length ? unassigned.map(function(t){
    return `<label class="thin-row" style="cursor:pointer;"><input type="checkbox" value="${t.ticket_id}" class="proj-ticket-cb" style="margin-right:6px;"><span class="thin-title">${typeIcon(t.type)} ${t.title}</span><span class="thin-tag">${t.department}</span></label>`;
  }).join('') : '<div class="thin-tag">No unassigned tickets right now - you can attach tickets to this project later too.</div>';
}

function saveNewProject(){
  var name = document.getElementById('proj_name').value.trim();
  if(!name){ alert('Project name is required.'); return; }
  var linkedIds = Array.from(document.querySelectorAll('.proj-ticket-cb:checked')).map(function(cb){ return cb.value; });
  var payload = {
    name: name,
    department: NEW_PROJECT_DEPTS.join(','),
    departments: NEW_PROJECT_DEPTS.join(','),
    phase: document.getElementById('proj_phase').value,
    start_date: document.getElementById('proj_start').value,
    target_date: document.getElementById('proj_target').value,
    status: document.getElementById('proj_status').value,
    link_ticket_ids: linkedIds
  };
  api('createProject', payload).then(function(res){
    if(!res.ok){ alert('Could not create project: '+(res.error||'Unknown error')); return; }
    if(WORKSPACE_MODE && res.project){
      DB.projects.push(res.project);
      linkedIds.forEach(function(tid){
        var t = DB.tickets.filter(function(x){return x.ticket_id===tid;})[0];
        if(t) t.project_id = res.project.project_id;
      });
    }
    closeModal('newProjectModalBg');
    render();
  });
}

function openProjectDetail(projectId){
  var p = DB.projects.filter(function(x){return x.project_id===projectId;})[0];
  if(!p) return;
  STATE.projectDetailId = projectId;
  var linked = DB.tickets.filter(function(t){return t.project_id===projectId;});
  var unassigned = visibleTickets().filter(function(t){return !t.project_id;});
  var body = document.getElementById('projectDetailModalBody');
  body.innerHTML = `
    <div class="modal-h"><h2>${p.name}</h2><button class="close-x" onclick="closeModal('projectDetailModalBg')">X</button></div>
    <div style="margin-bottom:8px;">${departmentPills(p.departments||p.department)}</div>
    <div class="thin-tag" style="margin-bottom:14px;">Phase: <b>${p.phase||'-'}</b> - ${fmtDate(p.start_date)} to ${fmtDate(p.target_date)} - Status: ${p.status||'-'}</div>
    <div class="card-h">Linked Tickets (${linked.length})</div>
    <div style="margin-bottom:14px;">${linked.length ? linked.map(ticketCardHtml).join('') : '<div class="empty">No tickets linked yet.</div>'}</div>
    ${unassigned.length ? `
      <div class="card-h">Attach an unassigned ticket</div>
      <select id="projAttachTicketSel" style="width:100%;padding:8px;border:1px solid var(--line);border-radius:6px;font-family:inherit;margin-bottom:8px;">
        ${unassigned.map(function(t){return `<option value="${t.ticket_id}">${t.title}</option>`;}).join('')}
      </select>
      <button class="btn btn-primary" style="width:100%;justify-content:center;padding:10px;" onclick="attachTicketToProject('${projectId}')">Attach Ticket</button>
    ` : '<div class="thin-tag">No unassigned tickets available to attach right now.</div>'}
  `;
  openModal('projectDetailModalBg');
}

function attachTicketToProject(projectId){
  var ticketId = document.getElementById('projAttachTicketSel').value;
  if(!ticketId) return;
  api('updateTicket', {ticket_id:ticketId, project_id:projectId, actor:CURRENT_USER}).then(function(res){
    if(!res.ok){ alert('Could not attach ticket: '+(res.error||'Unknown error')); return; }
    var t = DB.tickets.filter(function(x){return x.ticket_id===ticketId;})[0];
    if(t) t.project_id = projectId;
    openProjectDetail(projectId);
  });
}

function renderMeetings(){
  var wrap = el('<div></div>');
  wrap.innerHTML = `<div class="section-title">Meetings
    <button class="btn btn-ghost" style="margin-left:10px" onclick="openScheduleMeetingModal()">+ Schedule Meeting</button>
    <button class="btn btn-ghost" onclick="document.getElementById('m_title').value='';document.getElementById('m_notes').value='';document.getElementById('m_people').value='';document.getElementById('m_date').value=new Date().toISOString().slice(0,10);openModal('meetingModalBg')">+ Log Past Meeting Notes</button>
  </div>
  <div class="section-title" style="margin-top:0;font-size:11px;">Schedule invites a team, logs an agenda, and DMs invitees on Slack. Logging notes is for meetings that already happened - use "+ New Ticket" directly for standalone tasks.</div>
  <div id="meetingsList"></div>`;
  var box = wrap.querySelector('#meetingsList');
  box.innerHTML = DB.meetings.slice().reverse().map(function(m){
    var statusLabel = m.processed==='yes' ? 'Processed' : (m.processed==='pending_review' ? 'Review AI proposals' : 'Not processed');
    var statusColor = m.processed==='yes' ? 'var(--green)' : (m.processed==='pending_review' ? 'var(--violet)' : 'var(--text-faint)');
    var isScheduled = !!m.agenda;
    return `<div class="card" style="margin-bottom:12px;">
      <div class="card-h">${m.title} <span class="thin-tag">${fmtDate(m.date)}${m.time?' '+m.time:''}</span></div>
      <div class="thin-tag" style="margin-bottom:8px;">${isScheduled ? 'Invitees' : 'Participants'}: ${m.participants}</div>
      ${isScheduled ? `<div style="font-size:12.5px;color:var(--text-dim);margin-bottom:10px;white-space:pre-line;"><b>Agenda:</b>\n${m.agenda}</div>${m.meeting_link?`<div class="thin-tag" style="margin-bottom:10px;">Link: ${m.meeting_link}</div>`:''}` : ''}
      ${!isScheduled ? `<div style="font-size:12.5px;color:var(--text-dim);margin-bottom:10px;">${(m.raw_notes||'').slice(0,180)}${(m.raw_notes||'').length>180?'...':''}</div>` : ''}
      <div style="display:flex;align-items:center;gap:10px;">
        ${!isScheduled ? `<span class="pill" style="background:${statusColor}22;color:${statusColor}">${statusLabel}</span>` : '<span class="pill" style="background:var(--blue-bg);color:var(--blue)">Scheduled</span>'}
        ${m.processed==='no' && !isScheduled ? `<button class="btn btn-ghost" onclick="runMeetingAI('${m.meeting_id}')">* Process with AI</button>` : ''}
        ${m.processed==='pending_review' ? `<button class="btn btn-ghost" onclick="reviewMeetingProposals('${m.meeting_id}')">Review proposals</button>` : ''}
      </div>
      <div id="ai-${m.meeting_id}"></div>
    </div>`;
  }).join('') || '<div class="empty">No meetings logged yet.</div>';
  return wrap;
}

var SCHEDULE_INVITEES = [];

function openScheduleMeetingModal(){
  SCHEDULE_INVITEES = [];
  document.getElementById('sm_title').value = '';
  document.getElementById('sm_desc').value = '';
  document.getElementById('sm_link').value = '';
  document.getElementById('sm_date').value = new Date().toISOString().slice(0,10);
  document.getElementById('sm_time').value = '';
  renderInviteePicker();
  openModal('scheduleMeetingModalBg');
}

function renderInviteePicker(){
  var box = document.getElementById('sm_invitees');
  if(!box) return;
  box.innerHTML = DB.team.length ? DB.team.map(function(p){
    var active = SCHEDULE_INVITEES.indexOf(p.name) > -1;
    return `<span class="ms-chip${active?' ms-chip-active':''}" onclick="toggleInvitee('${p.name}')">${p.name}</span>`;
  }).join('') : '<div class="thin-tag">No team members yet - add some from Team Spaces first.</div>';
}

function toggleInvitee(name){
  var i = SCHEDULE_INVITEES.indexOf(name);
  if(i > -1) SCHEDULE_INVITEES.splice(i,1); else SCHEDULE_INVITEES.push(name);
  renderInviteePicker();
}

function saveScheduledMeeting(){
  var description = document.getElementById('sm_desc').value.trim();
  if(!description){ alert('A meeting description is required so an agenda can be generated.'); return; }
  var payload = {
    title: document.getElementById('sm_title').value || 'Meeting',
    date: document.getElementById('sm_date').value || new Date().toISOString().slice(0,10),
    time: document.getElementById('sm_time').value,
    description: description,
    meeting_link: document.getElementById('sm_link').value,
    invitees: SCHEDULE_INVITEES,
    scheduled_by: CURRENT_USER
  };
  api('scheduleMeeting', payload).then(function(res){
    if(!res.ok){ alert('Could not schedule meeting: '+(res.error||'Unknown error')); return; }
    if(WORKSPACE_MODE && res.meeting){ DB.meetings.push(res.meeting); }
    closeModal('scheduleMeetingModalBg');
    goTo('meetings');

    var lines = [];
    if(res.calendar_status && res.calendar_status.ok){
      lines.push('Calendar: event created on '+res.calendar_status.calendarUsed+'.');
      lines.push('Attendees on the event: '+(res.calendar_status.attendees||[]).join(', ') || '(none)');
      lines.push('Event link: '+res.calendar_status.eventLink);
    } else if(res.calendar_status){
      lines.push('Calendar: FAILED - '+res.calendar_status.error);
    }
    if(res.invitee_emails_used){
      lines.push('Emails looked up for invitees: '+(res.invitee_emails_used.join(', ')||'(none found - check Team tab emails)'));
    }
    if(res.slack_statuses && res.slack_statuses.length){
      lines.push('Slack DMs:');
      res.slack_statuses.forEach(function(s){
        lines.push('  - '+s.name+': '+(s.ok ? 'sent' : 'FAILED - '+s.error));
      });
    }
    alert(lines.join('\n'));
  });
}

var MEETING_PROPOSALS = {};

function runMeetingAI(meetingId){
  var target = document.getElementById('ai-'+meetingId);
  target.innerHTML = '<div class="ai-box"><div class="ai-box-h">* Reading meeting notes...</div></div>';
  api('processMeetingWithAI', {meeting_id: meetingId}).then(function(res){
    if(!res.ok){ target.innerHTML = '<div class="ai-box">Couldn\'t process: '+(res.error||'unknown error')+'</div>'; return; }
    MEETING_PROPOSALS[meetingId] = res.proposals;
    render();
    setTimeout(function(){ reviewMeetingProposals(meetingId); }, 50);
  });
}

function reviewMeetingProposals(meetingId){
  var p = MEETING_PROPOSALS[meetingId];
  var m = DB.meetings.filter(function(x){return x.meeting_id===meetingId;})[0];
  if(!p){ m.processed='no'; render(); return; }
  var target = document.getElementById('ai-'+meetingId);

  var decisionsHtml = (p.decisions||[]).map(function(d,i){
    return `<div class="proposal">
      <div class="field" style="margin-bottom:6px;"><label>Decision</label><input value="${(d.decision_text||'').replace(/"/g,'&quot;')}" oninput="updateProposalDecision('${meetingId}',${i},'decision_text',this.value)"></div>
      <div class="row2">
        <div class="field"><label>Reason</label><input value="${(d.reason||'').replace(/"/g,'&quot;')}" oninput="updateProposalDecision('${meetingId}',${i},'reason',this.value)"></div>
        <div class="field"><label>Owner</label>
          <select onchange="updateProposalDecision('${meetingId}',${i},'owner',this.value)">
            <option value="">Unassigned</option>
            ${DB.team.map(function(person){return `<option ${person.name===d.owner?'selected':''}>${person.name}</option>`;}).join('')}
          </select>
        </div>
      </div>
      <button class="btn btn-ghost" style="color:var(--red);border-color:var(--red-bg);" onclick="removeProposalDecision('${meetingId}',${i})">Remove this decision</button>
    </div>`;
  }).join('');

  var itemsHtml = (p.action_items||[]).map(function(item,i){
    var matchLabel = item.match_ticket_id ? ('Updates existing ticket '+item.match_ticket_id) : 'Creates new ticket';
    return `<div class="proposal">
      <div class="field" style="margin-bottom:6px;"><label>Action item</label><input value="${(item.description||'').replace(/"/g,'&quot;')}" oninput="updateProposalItem('${meetingId}',${i},'description',this.value)"></div>
      <div class="thin-tag" style="margin-bottom:6px;">${matchLabel}</div>
      <div class="row2">
        <div class="field"><label>Owner</label>
          <select onchange="updateProposalItem('${meetingId}',${i},'owner',this.value)">
            <option value="">Unassigned</option>
            ${DB.team.map(function(person){return `<option ${person.name===item.owner?'selected':''}>${person.name}</option>`;}).join('')}
          </select>
        </div>
        <div class="field"><label>Due Date</label><input type="date" value="${item.due_date||''}" onchange="updateProposalItem('${meetingId}',${i},'due_date',this.value)"></div>
      </div>
      <button class="btn btn-ghost" style="color:var(--red);border-color:var(--red-bg);" onclick="removeProposalItem('${meetingId}',${i})">Remove this item</button>
    </div>`;
  }).join('');

  target.innerHTML = `<div class="ai-box">
    <div class="ai-box-h">* AI Summary</div>
    <div style="margin-bottom:10px;">${p.summary}</div>
    ${decisionsHtml ? '<b style="font-size:12px">Decisions - edit or remove before approving</b>' + decisionsHtml : ''}
    ${itemsHtml ? '<b style="font-size:12px">Action items - edit or remove before approving</b>' + itemsHtml : '<div class="thin-tag">No action items left to approve.</div>'}
    <div class="proposal-actions">
      <button class="btn btn-primary" onclick="approveMeeting('${meetingId}')">Approve & create/update tickets</button>
      <button class="btn btn-ghost" onclick="render()">Discard</button>
    </div>
  </div>`;
}

function updateProposalItem(meetingId, idx, field, value){
  MEETING_PROPOSALS[meetingId].action_items[idx][field] = value;
}
function updateProposalDecision(meetingId, idx, field, value){
  MEETING_PROPOSALS[meetingId].decisions[idx][field] = value;
}
function removeProposalItem(meetingId, idx){
  MEETING_PROPOSALS[meetingId].action_items.splice(idx,1);
  reviewMeetingProposals(meetingId);
}
function removeProposalDecision(meetingId, idx){
  MEETING_PROPOSALS[meetingId].decisions.splice(idx,1);
  reviewMeetingProposals(meetingId);
}

function approveMeeting(meetingId){
  var p = MEETING_PROPOSALS[meetingId];
  api('approveMeetingTickets', {meeting_id:meetingId, decisions:p.decisions, action_items:p.action_items}).then(function(res){
    render();
  });
}

function saveMeeting(){
  var payload = {
    title: document.getElementById('m_title').value || 'Untitled Meeting',
    date: document.getElementById('m_date').value || new Date().toISOString().slice(0,10),
    participants: document.getElementById('m_people').value,
    raw_notes: document.getElementById('m_notes').value
  };
  api('submitMeeting', payload).then(function(res){
    if(!res.ok){ alert('Could not save meeting: '+(res.error||'Unknown error')); return; }
    if(WORKSPACE_MODE && res.meeting){ DB.meetings.push(res.meeting); }
    closeModal('meetingModalBg');
    goTo('meetings');
  });
}

function renderStandup(){
  var wrap = el('<div></div>');
  var depts = ['Engineering','Operations','Growth'];
  var norm = function(s){ return (s||'').trim().toLowerCase(); };
  var html = '<div class="section-title">Daily Stand-up  -  Yesterday / Today / Blockers</div>';
  if(!DB.team.length){
    html += '<div class="card"><div class="empty">No team members yet. Add people from the Team Spaces page (or ask an admin to) - Stand-up will populate automatically once they are added.</div></div>';
    wrap.innerHTML = html;
    return wrap;
  }
  var unmatched = DB.team.filter(function(p){ return depts.indexOf(p.department) === -1 && depts.map(norm).indexOf(norm(p.department)) === -1; });
  depts.forEach(function(dept){
    var people = DB.team.filter(function(p){return norm(p.department)===norm(dept);});
    var block = `<div class="dept-block"><div class="dept-h">${dept}</div>`;
    if(!people.length){ block += '<div class="empty">No one on this team yet.</div>'; }
    people.forEach(function(person){
      var mine = DB.tickets.filter(function(t){return t.owner===person.name;});
      var done = mine.filter(function(t){return t.status==='Done';});
      var inprog = mine.filter(function(t){return ['In Progress','Assigned','Triaged'].indexOf(t.status)>-1;});
      var blocked = mine.filter(function(t){return t.status==='Blocked';});
      block += `<div class="standup-person">
        <div class="su-name">${person.name}</div>
        <div class="su-fields">
          <div><span class="su-label">Yesterday</span>${done.length ? done.map(t=>t.title).join(', ') : ' - '}</div>
          <div><span class="su-label">Today</span>${inprog.length ? inprog.map(t=>t.title).join(', ') : ' - '}</div>
          <div class="${blocked.length?'su-blocked':''}"><span class="su-label">Blocked</span>${blocked.length ? blocked.map(t=>t.title).join(', ') : 'None'}</div>
        </div>
      </div>`;
    });
    block += '</div>';
    html += block;
  });
  if(unmatched.length){
    html += '<div class="thin-tag" style="margin-top:6px;">Not shown: '+unmatched.map(p=>p.name+' (department: "'+(p.department||'blank')+'")').join(', ')+' - department must be exactly Engineering, Operations, or Growth.</div>';
  }
  wrap.innerHTML = html;
  return wrap;
}

function renderFeed(){
  var wrap = el('<div></div>');
  wrap.innerHTML = '<div class="section-title">Activity Feed</div><div class="card" id="feedList"></div>';
  var box = wrap.querySelector('#feedList');
  var items = DB.activities.slice().reverse();
  box.innerHTML = items.length ? items.map(function(a){
    var t = DB.tickets.filter(function(x){return x.ticket_id===a.ticket_id;})[0];
    return `<div class="feed-item">
      <div class="feed-dot">${initials(a.actor)}</div>
      <div><b>${a.actor}</b> ${a.action.toLowerCase()} ${t? '<i>'+t.title+'</i>' : ''} ${a.new_value?('-> '+a.new_value):''}</div>
      <div class="feed-time">${fmtDateTime(a.timestamp)}</div>
    </div>`;
  }).join('') : '<div class="empty">Nothing yet  -  activity will appear here as work happens.</div>';
  return wrap;
}

function renderWorkload(){
  var wrap = el('<div></div>');
  var counts = {};
  DB.tickets.forEach(function(t){ if(t.owner && t.status!=='Done'){ counts[t.owner] = (counts[t.owner]||0)+1; } });
  var max = Math.max.apply(null, Object.values(counts).concat([1]));
  wrap.innerHTML = '<div class="section-title">Workload  -  Open Tickets per Person</div><div class="card" id="wlList"></div>';
  var box = wrap.querySelector('#wlList');
  box.innerHTML = Object.keys(counts).length ? Object.keys(counts).map(function(name){
    var n = counts[name];
    return `<div class="wl-row"><div class="wl-name">${name}</div><div class="wl-bar-track"><div class="wl-bar-fill" style="width:${(n/max*100)}%"></div></div><div class="wl-count">${n}</div></div>`;
  }).join('') : '<div class="empty">No assigned tickets yet.</div>';
  return wrap;
}

function renderTeamSpaces(){
  var wrap = el('<div></div>');
  var depts = ['Engineering','Operations','Growth'];
  var html = '<div class="section-title">Team Spaces <button class="btn btn-ghost" style="margin-left:10px" onclick="openAddMemberModal()">+ Add Team Member</button></div>';
  html += '<div class="dash-grid" style="grid-template-columns:repeat(3,1fr)">';
  depts.forEach(function(dept){
    var tix = DB.tickets.filter(function(t){return t.department===dept;});
    var members = DB.team.filter(function(p){return p.department===dept;});
    var kpi = tix.length ? Math.round(tix.filter(t=>t.status==='Done').length/tix.length*100) : 0;
    html += `<div class="card">
      <div class="card-h">${dept}</div>
      <div class="thin-tag" style="margin-bottom:8px;">${members.map(m=>m.name).join(', ') || 'No members yet'}</div>
      <div class="stat-num" style="font-size:20px">${tix.length}</div><div class="stat-lbl">Tickets</div>
      <div style="margin-top:10px;" class="thin-tag">Completion rate: ${kpi}%</div>
    </div>`;
  });
  html += '</div>';

  html += '<div class="section-title">All Team Members</div><div class="card" style="padding:0;"><table><thead><tr><th>Name</th><th>Email</th><th>Department</th><th>Role</th></tr></thead><tbody>' +
    (DB.team.length ? DB.team.map(function(p){
      return `<tr><td>${p.name}</td><td>${p.email}</td><td>${p.department||' - '}</td><td>${p.role||' - '}</td></tr>`;
    }).join('') : '<tr><td colspan="4" class="empty">No team members yet.</td></tr>') +
    '</tbody></table></div>';

  wrap.innerHTML = html;
  return wrap;
}

function openAddMemberModal(){
  document.getElementById('tm_name').value = '';
  document.getElementById('tm_email').value = '';
  document.getElementById('tm_slack').value = '';
  document.getElementById('tm_dept').value = 'Engineering';
  document.getElementById('tm_role').value = 'Staff';
  openModal('addMemberModalBg');
}

function saveTeamMember(){
  var payload = {
    name: document.getElementById('tm_name').value,
    email: document.getElementById('tm_email').value,
    slack_handle: document.getElementById('tm_slack').value,
    department: document.getElementById('tm_dept').value,
    role: document.getElementById('tm_role').value
  };
  if(!payload.name || !payload.email){ alert('Name and email are required.'); return; }
  api('createTeamMember', payload).then(function(res){
    if(!res.ok){ alert('Could not add team member: '+(res.error||'Unknown error')); return; }
    if(WORKSPACE_MODE){
      var existing = DB.team.filter(function(p){return p.email===res.member.email;})[0];
      if(existing){ Object.assign(existing, res.member); } else { DB.team.push(res.member); }
    }
    closeModal('addMemberModalBg');
    render();
    var lines = [res.isNew ? (payload.name+' added.') : (payload.name+' updated.')];
    lines.push('Email: ' + (res.email_status && res.email_status.ok ? 'sent' : (res.email_status && res.email_status.skipped ? 'skipped (existing member)' : 'FAILED - '+(res.email_status && res.email_status.error))));
    lines.push('Slack DM: ' + (res.slack_status && res.slack_status.ok ? 'sent' : 'FAILED - '+(res.slack_status && res.slack_status.error)));
    alert(lines.join('\n'));
  });
}

function renderCommand(){
  var wrap = el('<div></div>');
  wrap.innerHTML = `<div class="section-title">AI Command Center</div>
  <div class="card">
    <div class="thin-tag" style="margin-bottom:10px;">Ask in plain language  -  e.g. "Show all blocked Engineering tickets" or "What's delaying the Guinness project?"</div>
    <div style="display:flex;gap:8px;">
      <input class="field" id="cmdInput" placeholder="Ask a question..." style="flex:1;padding:9px 12px;border:1px solid var(--line);border-radius:6px;font-family:inherit;">
      <button class="btn btn-primary" onclick="runCommand()">Ask</button>
    </div>
    <div id="cmdResult" style="margin-top:14px;"></div>
  </div>`;
  return wrap;
}

function runCommand(){
  var q = document.getElementById('cmdInput').value;
  var result = document.getElementById('cmdResult');
  result.innerHTML = '<div class="thin-tag">Thinking...</div>';
  api('commandQuery', {query:q}).then(function(res){
    if(!res.ok){ result.innerHTML = '<div class="empty">'+res.error+'</div>'; return; }
    result.innerHTML = `<div class="thin-tag" style="margin-bottom:10px;">${res.explanation}</div>` +
      (res.results.length ? res.results.map(ticketCardHtml).join('') : '<div class="empty">No matching tickets.</div>');
  });
}

function renderDecisions(){
  var wrap = el('<div></div>');
  var rows = DB.decisions.map(function(d){
    var m = DB.meetings.filter(function(x){return x.meeting_id===d.meeting_id;})[0];
    return `<tr><td>${d.decision_text}</td><td>${d.reason}</td><td>${d.owner}</td><td>${m?m.title:' - '}</td><td><span class="pill" style="background:var(--green-bg);color:var(--green)">${d.status}</span></td></tr>`;
  }).join('');
  wrap.innerHTML = `<div class="section-title">Decision Register</div>
    <div class="card" style="padding:0;">
      <table><thead><tr><th>Decision</th><th>Reason</th><th>Owner</th><th>Meeting</th><th>Status</th></tr></thead>
      <tbody>${rows || '<tr><td colspan="5" class="empty">No decisions logged yet.</td></tr>'}</tbody></table>
    </div>`;
  return wrap;
}

function renderAdminLog(){
  var wrap = el('<div></div>');
  var rows = DB.activities.slice().reverse().map(function(a){
    return `<tr><td>${a.actor}</td><td>${a.action}</td><td>${fmtDateTime(a.timestamp)}</td><td>${a.old_value||' - '}</td><td>${a.new_value||' - '}</td></tr>`;
  }).join('');
  wrap.innerHTML = `<div class="section-title">Admin Activity Log  -  Every click, every update</div>
    <div class="card" style="padding:0;">
      <table><thead><tr><th>User</th><th>Action</th><th>Date</th><th>Old Value</th><th>New Value</th></tr></thead>
      <tbody>${rows || '<tr><td colspan="5" class="empty">No activity yet.</td></tr>'}</tbody></table>
    </div>`;
  return wrap;
}

function renderOneOnOnes(){
  var wrap = el('<div></div>');
  if(!STATE.oneOnOnePerson){
    var html = '<div class="section-title">One-on-Ones</div>';
    if(!DB.team.length){
      html += '<div class="card"><div class="empty">Add team members from Team Spaces first, then come back here to schedule 1:1s.</div></div>';
    } else {
      html += '<div class="dash-grid" style="grid-template-columns:repeat(3,1fr)">' + DB.team.map(function(p){
        var sessions = (DB.oneOnOnes||[]).filter(function(s){return s.team_member_name===p.name;});
        var openCards = DB.tickets.filter(function(t){return t.source==='OneOnOne' && t.source_ref===p.name && t.status!=='Done';});
        return `<div class="card" style="cursor:pointer;" onclick="openOneOnOneSpace('${p.name}')">
          <div class="card-h">${p.name}</div>
          <div class="thin-tag" style="margin-bottom:8px;">${p.role||''} ${p.department?'- '+p.department:''}</div>
          <div class="thin-tag">${sessions.length} session${sessions.length===1?'':'s'} - ${openCards.length} open tracking card${openCards.length===1?'':'s'}</div>
        </div>`;
      }).join('') + '</div>';
    }
    wrap.innerHTML = html;
    return wrap;
  }

  var person = STATE.oneOnOnePerson;
  var sessions = (DB.oneOnOnes||[]).filter(function(s){return s.team_member_name===person;}).sort(function(a,b){return (b.date||'').localeCompare(a.date||'');});
  var trackingCards = DB.tickets.filter(function(t){return t.source==='OneOnOne' && t.source_ref===person;});
  var openCards = trackingCards.filter(function(t){return t.status!=='Done';});
  var doneCards = trackingCards.filter(function(t){return t.status==='Done';});

  var html = `<div class="section-title"><span style="cursor:pointer;color:var(--text-dim);" onclick="STATE.oneOnOnePerson=null;render();">One-on-Ones</span> / ${person}</div>
    <div class="card" style="margin-bottom:14px;">
      <div class="card-h">Tracking Cards <button class="btn btn-ghost" onclick="openAddTrackingCard('${person}')">+ Add Card</button></div>
      <div class="thin-tag" style="margin-bottom:8px;">Carried forward between sessions - review these before discussing anything new.</div>
      <div id="trackingCardsBox">${trackingCardsHtml(openCards)}</div>
      ${doneCards.length ? `<div class="thin-tag" style="margin-top:10px;">${doneCards.length} completed card${doneCards.length===1?'':'s'} (hidden)</div>` : ''}
    </div>
    <div class="card">
      <div class="card-h">Sessions <button class="btn btn-ghost" onclick="openScheduleOneOnOne('${person}')">+ Schedule 1:1</button></div>
      <div id="sessionsBox">${sessionsHtml(sessions)}</div>
    </div>`;
  wrap.innerHTML = html;
  return wrap;
}

function trackingCardsHtml(cards){
  if(!cards.length) return '<div class="empty">No open tracking cards.</div>';
  return '<div style="display:flex;flex-wrap:wrap;gap:10px;">' +
    cards.map(function(t){ return `<div style="width:220px;">${ticketCardHtml(t)}</div>`; }).join('') +
    '</div>';
}

function sessionsHtml(sessions){
  if(!sessions.length) return '<div class="empty">No 1:1 sessions yet.</div>';
  return sessions.map(function(s){
    return `<div class="proposal">
      <div style="display:flex;justify-content:space-between;"><b>${fmtDate(s.date)}</b><span class="pill" style="background:var(--surface2);">${s.status||'Scheduled'}</span></div>
      <div class="thin-tag" style="margin:6px 0;white-space:pre-line;"><b>Agenda:</b>\n${s.agenda||'(none)'}</div>
      ${s.meeting_link ? `<div class="thin-tag" style="margin-bottom:6px;">Link: <a href="${s.meeting_link}" target="_blank">${s.meeting_link}</a></div>` : ''}
      <div class="field"><label>Notes (admin only)</label><textarea id="notes-${s.session_id}" style="min-height:70px;" placeholder="Add notes from this session...">${s.notes||''}</textarea></div>
      <div class="row2" style="margin-bottom:8px;">
        <div class="field"><label>Upload notes file (.txt, .md, .docx, .pdf)</label>
          <input type="file" accept=".txt,.md,.docx,.pdf" onchange="handleOneOnOneFileUpload(event,'${s.session_id}')">
        </div>
        <div class="field"><label>Or paste a Google Doc link</label>
          <div style="display:flex;gap:6px;">
            <input id="docLink-${s.session_id}" placeholder="https://docs.google.com/document/d/...">
            <button class="btn btn-ghost" onclick="importGoogleDocForSession('${s.session_id}')">Import</button>
          </div>
        </div>
      </div>
      <div style="display:flex;gap:8px;">
        <button class="btn btn-ghost" onclick="saveOneOnOneNotes('${s.session_id}')">Save Notes</button>
        ${s.notes ? `<button class="btn btn-ghost" onclick="processOneOnOneAI('${s.session_id}')">* Process with AI</button>` : ''}
        ${s.drive_doc_url ? `<a class="btn btn-ghost" href="${s.drive_doc_url}" target="_blank" style="text-decoration:none;">Open in Drive</a>` : ''}
      </div>
      <div id="oneOnOneAi-${s.session_id}"></div>
    </div>`;
  }).join('');
}

function importGoogleDocForSession(sessionId){
  var url = document.getElementById('docLink-'+sessionId).value.trim();
  if(!url){ alert('Paste a Google Doc link first.'); return; }
  api('readGoogleDocUrl', {url:url}).then(function(res){
    if(!res.ok){ alert('Could not read that doc: '+(res.error||'Unknown error')+'\n\nMake sure the signed-in account has view access to it.'); return; }
    var box = document.getElementById('notes-'+sessionId);
    box.value = (box.value ? box.value+'\n\n' : '') + res.text;
  });
}

function handleOneOnOneFileUpload(event, sessionId){
  var file = event.target.files[0];
  if(!file) return;
  var name = file.name.toLowerCase();
  var notesBox = document.getElementById('notes-'+sessionId);

  if(name.endsWith('.txt') || name.endsWith('.md')){
    var r1 = new FileReader();
    r1.onload = function(e){ notesBox.value = (notesBox.value?notesBox.value+'\n\n':'') + e.target.result; };
    r1.onerror = function(){ alert('Could not read that file.'); };
    r1.readAsText(file);
    return;
  }
  if(name.endsWith('.docx')){
    var origVal = notesBox.value;
    notesBox.value = origVal + '\n\n[Loading Word reader...]';
    loadScriptOnce('https://cdnjs.cloudflare.com/ajax/libs/mammoth/1.6.0/mammoth.browser.min.js').then(function(){
      var r2 = new FileReader();
      r2.onload = function(e){
        mammoth.extractRawText({arrayBuffer: e.target.result}).then(function(result){
          notesBox.value = (origVal?origVal+'\n\n':'') + result.value;
        }).catch(function(err){ notesBox.value = origVal; alert('Could not read that Word file: '+err.message); });
      };
      r2.readAsArrayBuffer(file);
    }).catch(function(){ notesBox.value = origVal; alert('Could not load the Word file reader.'); });
    return;
  }
  if(name.endsWith('.pdf')){
    var origVal2 = notesBox.value;
    notesBox.value = origVal2 + '\n\n[Loading PDF reader...]';
    loadScriptOnce('https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js').then(function(){
      pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
      var r3 = new FileReader();
      r3.onload = function(e){
        pdfjsLib.getDocument({data: e.target.result}).promise.then(function(pdf){
          var pagePromises = [];
          for(var i=1; i<=pdf.numPages; i++){
            pagePromises.push(pdf.getPage(i).then(function(page){
              return page.getTextContent().then(function(tc){ return tc.items.map(function(it){ return it.str; }).join(' '); });
            }));
          }
          return Promise.all(pagePromises);
        }).then(function(pages){
          notesBox.value = (origVal2?origVal2+'\n\n':'') + pages.join('\n\n');
        }).catch(function(err){ notesBox.value = origVal2; alert('Could not read that PDF: '+err.message); });
      };
      r3.readAsArrayBuffer(file);
    }).catch(function(){ notesBox.value = origVal2; alert('Could not load the PDF reader.'); });
    return;
  }
  alert('Unsupported file type. Use .txt, .md, .docx, or .pdf.');
}

function loadScriptOnce(url){
  return new Promise(function(resolve, reject){
    if (document.querySelector('script[data-lazy-src="'+url+'"]')) { resolve(); return; }
    var s = document.createElement('script');
    s.src = url;
    s.setAttribute('data-lazy-src', url);
    s.onload = function(){ resolve(); };
    s.onerror = function(){ reject(new Error('Failed to load '+url)); };
    document.head.appendChild(s);
  });
}

function processOneOnOneAI(sessionId){
  var target = document.getElementById('oneOnOneAi-'+sessionId);
  target.innerHTML = '<div class="ai-box"><div class="ai-box-h">* Reading notes...</div></div>';
  api('processOneOnOneWithAI', {session_id: sessionId}).then(function(res){
    if(!res.ok){ target.innerHTML = '<div class="ai-box">Could not process: '+(res.error||'unknown error')+'</div>'; return; }
    var itemsHtml = (res.activities||[]).map(function(item,i){
      return `<div class="proposal"><b>${item.description}</b>
        <div class="proposal-actions"><button class="btn btn-primary" onclick="pushOneOnOneItemAsTicket('${sessionId}',${i},'${(item.description||'').replace(/'/g,"\\'")}')">Push as Ticket</button></div>
      </div>`;
    }).join('');
    target.innerHTML = `<div class="ai-box">
      <div class="ai-box-h">* Activities discussed</div>
      ${itemsHtml || '<div class="thin-tag">Nothing actionable found in these notes.</div>'}
    </div>`;
  });
}

function pushOneOnOneItemAsTicket(sessionId, idx, description){
  var s = (DB.oneOnOnes||[]).filter(function(x){return x.session_id===sessionId;})[0];
  var person = s ? s.team_member_name : STATE.oneOnOnePerson;
  var personObj = DB.team.filter(function(p){return p.name===person;})[0];
  api('createTicket', {
    title: description, type: 'Task', department: personObj ? personObj.department : '',
    priority: 'Medium', owner: person, reporter: CURRENT_USER, source: 'Manual'
  }).then(function(res){
    if(!res.ok){ alert('Could not create ticket: '+(res.error||'Unknown error')); return; }
    if(WORKSPACE_MODE && res.ticket){ DB.tickets.push(res.ticket); }
    alert('Pushed to the main ticket system, assigned to '+person+'.');
  });
}

function openOneOnOneSpace(name){
  STATE.oneOnOnePerson = name;
  render();
}

function openAddTrackingCard(person){
  STATE.trackingCardPerson = person;
  document.getElementById('tc_title').value = '';
  openModal('addTrackingCardModalBg');
}

function saveTrackingCard(){
  var person = STATE.trackingCardPerson;
  var title = document.getElementById('tc_title').value.trim();
  if(!title) return;
  var personObj = DB.team.filter(function(p){return p.name===person;})[0];
  api('createTicket', {
    title: title, type: 'Task', department: personObj ? personObj.department : '',
    priority: 'Medium', owner: person, reporter: CURRENT_USER,
    source: 'OneOnOne', source_ref: person
  }).then(function(res){
    if(!res.ok){ alert('Could not add card: '+(res.error||'Unknown error')); return; }
    if(WORKSPACE_MODE && res.ticket){ DB.tickets.push(res.ticket); }
    closeModal('addTrackingCardModalBg');
    render();
  });
}

function markTrackingCardDone(id, checked){
  api('updateTicket', {ticket_id:id, status: checked?'Done':'New', actor:CURRENT_USER}).then(function(res){
    if(!res.ok){ alert('Could not update card: '+(res.error||'Unknown error')); return; }
    var t = DB.tickets.filter(function(x){return x.ticket_id===id;})[0];
    if(t) t.status = checked?'Done':'New';
    render();
  });
}

function openScheduleOneOnOne(person){
  STATE.oneOnOneSchedulePerson = person;
  document.getElementById('oo_date').value = new Date().toISOString().slice(0,10);
  document.getElementById('oo_time').value = '';
  document.getElementById('oo_agenda').value = '';
  openModal('scheduleOneOnOneModalBg');
}

function saveScheduledOneOnOne(){
  var person = STATE.oneOnOneSchedulePerson;
  var payload = {
    team_member_name: person,
    date: document.getElementById('oo_date').value || new Date().toISOString().slice(0,10),
    time: document.getElementById('oo_time').value,
    agenda: document.getElementById('oo_agenda').value,
    created_by: CURRENT_USER
  };
  api('createOneOnOne', payload).then(function(res){
    if(!res.ok){ alert('Could not schedule: '+(res.error||'Unknown error')); return; }
    if(WORKSPACE_MODE && res.session){ DB.oneOnOnes = DB.oneOnOnes || []; DB.oneOnOnes.push(res.session); }
    closeModal('scheduleOneOnOneModalBg');
    render();
    if(res.calendar_status){
      if(res.calendar_status.ok){
        alert('1:1 scheduled. Calendar event created on '+res.calendar_status.calendarUsed+'. '+person+' should also get a Slack DM and calendar invite email.');
      } else {
        alert('1:1 saved, but the calendar event could not be created: '+res.calendar_status.error);
      }
    }
  });
}

function saveOneOnOneNotes(sessionId){
  var notes = document.getElementById('notes-'+sessionId).value;
  api('updateOneOnOne', {session_id: sessionId, notes: notes, status: 'Completed'}).then(function(res){
    if(!res.ok){ alert('Could not save notes: '+(res.error||'Unknown error')); return; }
    var s = (DB.oneOnOnes||[]).filter(function(x){return x.session_id===sessionId;})[0];
    if(s){ s.notes = notes; s.status = 'Completed'; if(res.updated && res.updated.drive_doc_url) s.drive_doc_url = res.updated.drive_doc_url; }
    render();
  });
}

function renderNotifications(){
  var wrap = el('<div></div>');
  wrap.innerHTML = `<div class="section-title">Notifications</div>
  <div class="card">
    <div class="thin-tag" style="margin-bottom:10px;">Private Slack DMs fire from Apps Script (welcome, assigned, due tomorrow, overdue, blocked, review needed, completed, meeting invites). Configure SLACK_BOT_TOKEN in Script Properties to activate - each person also needs their Slack Member ID saved in the Team tab.</div>
    <button class="btn btn-ghost" onclick="sendTestDM()">Send Test DM to Myself</button>
    <div id="notifLog" style="margin-top:14px;"></div>
  </div>`;
  var box = wrap.querySelector('#notifLog');
  box.innerHTML = DB.notifications_log && DB.notifications_log.length ? DB.notifications_log.slice().reverse().map(function(n){
    return `<div class="thin-row"><span class="thin-title">${n.message}</span><span class="thin-tag">${n.status}</span></div>`;
  }).join('') : '<div class="empty">No notifications sent yet in this session.</div>';
  return wrap;
}

function sendTestDM(){
  api('testSlackDM', {}).then(function(res){
    if(!res.ok){ alert('Test DM failed: '+(res.error||'Unknown error')+'\n\nCheck: SLACK_BOT_TOKEN is set correctly, the chat:write scope was added, and your own Team tab row has the right slack_handle.'); return; }
    alert('Test DM sent - check Slack. If nothing arrived within a minute even though this said success, double check the slack_handle is a real Member ID (starts with U), not a username.');
  });
}

function populateSelects(){
  var ownerSel = document.getElementById('f_owner');
  var projSel = document.getElementById('f_project');
  var tmplSel = document.getElementById('f_template');
  if(ownerSel){
    ownerSel.innerHTML = '<option value="">Unassigned</option>' + DB.team.map(function(p){return `<option value="${p.name}">${p.name}</option>`;}).join('');
  }
  if(projSel){
    projSel.innerHTML = '<option value="">None</option>' + DB.projects.map(function(p){return `<option value="${p.project_id}">${p.name}</option>`;}).join('');
  }
  if(tmplSel){
    var templates = DB.templates || [];
    tmplSel.innerHTML = '<option value="">Start from scratch</option>' + templates.map(function(tmpl){return `<option value="${tmpl.template_id}">${tmpl.name}</option>`;}).join('');
  }
}

var NEW_TICKET_CHECKLIST = [];

function applyTemplateToForm(){
  var tmplId = document.getElementById('f_template').value;
  NEW_TICKET_CHECKLIST = [];
  if(!tmplId){ return; }
  var tmpl = (DB.templates||[]).filter(function(t){return t.template_id===tmplId;})[0];
  if(!tmpl) return;
  document.getElementById('f_title').value = tmpl.title || '';
  document.getElementById('f_desc').value = tmpl.description || '';
  document.getElementById('f_type').value = tmpl.type || 'Task';
  document.getElementById('f_dept').value = tmpl.department || '';
  document.getElementById('f_prio').value = tmpl.priority || 'Medium';
  try { NEW_TICKET_CHECKLIST = JSON.parse(tmpl.checklist_json || '[]'); } catch(e){ NEW_TICKET_CHECKLIST = []; }
}

function openNewTicket(){
  STATE.editingTicketId = null;
  NEW_TICKET_CHECKLIST = [];
  document.getElementById('ticketModalTitle').textContent = 'New Ticket';
  ['f_title','f_desc'].forEach(function(id){ document.getElementById(id).value=''; });
  document.getElementById('f_due').value='';
  populateSelects();
  if(document.getElementById('f_template')) document.getElementById('f_template').value='';
  openModal('ticketModalBg');
}

function saveTicket(){
  var payload = {
    title: document.getElementById('f_title').value || 'Untitled Ticket',
    description: document.getElementById('f_desc').value,
    type: document.getElementById('f_type').value,
    department: document.getElementById('f_dept').value,
    priority: document.getElementById('f_prio').value,
    owner: document.getElementById('f_owner').value,
    due_date: document.getElementById('f_due').value,
    project_id: document.getElementById('f_project').value,
    reporter: CURRENT_USER,
    checklist_json: JSON.stringify(NEW_TICKET_CHECKLIST || [])
  };
  api('createTicket', payload).then(function(res){
    if(!res.ok){
      alert('Could not create the ticket: ' + (res.error || 'Unknown error'));
      return;
    }
    if(WORKSPACE_MODE && res.ticket){ DB.tickets.push(res.ticket); }
    closeModal('ticketModalBg');
    render();
  });
}

function openTicketDetail(id){
  var t = DB.tickets.filter(function(x){return x.ticket_id===id;})[0];
  if(!t) return;
  var acts = DB.activities.filter(function(a){return a.ticket_id===id;});
  var checklist = parseChecklist(t);
  var body = document.getElementById('detailModalBody');
  body.innerHTML = `
    <div class="modal-h"><h2 id="d_titleHeader">${typeIcon(t.type)} ${t.title}</h2><button class="close-x" onclick="closeModal('detailModalBg')">X</button></div>
    <div class="thin-tag mono" style="margin-bottom:12px;">${t.ticket_id}</div>
    <div class="field"><label>Title</label><input id="d_title" value="${(t.title||'').replace(/"/g,'&quot;')}" onchange="changeTicketField('${id}','title',this.value)"></div>
    <div class="field"><label>Description</label><textarea id="d_desc" onchange="changeTicketField('${id}','description',this.value)">${t.description||''}</textarea></div>
    <div class="row2">
      <div class="field"><label>Type</label>
        <select id="d_type" onchange="changeTicketField('${id}','type',this.value)">
          ${['Bug','Feature','Task','Idea','Incident','Customer Request','Growth','Documentation','Research','Deployment'].map(function(ty){return `<option ${ty===t.type?'selected':''}>${ty}</option>`;}).join('')}
        </select>
      </div>
      <div class="field"><label>Department</label>
        <select id="d_dept" onchange="changeTicketField('${id}','department',this.value)">
          ${['Engineering','Operations','Growth'].map(function(dp){return `<option ${dp===t.department?'selected':''}>${dp}</option>`;}).join('')}
        </select>
      </div>
    </div>
    <div class="row2">
      <div class="field"><label>Status</label>
        <select id="d_status" onchange="changeTicketField('${id}','status',this.value)">
          ${STATUS_FLOW.concat(['Blocked']).map(function(s){return `<option ${s===t.status?'selected':''}>${s}</option>`;}).join('')}
        </select>
      </div>
      <div class="field"><label>Priority</label>
        <select id="d_prio" onchange="changeTicketField('${id}','priority',this.value)">
          ${['Low','Medium','High','Urgent'].map(function(p){return `<option ${p===t.priority?'selected':''}>${p}</option>`;}).join('')}
        </select>
      </div>
    </div>
    <div class="row2">
      <div class="field"><label>Owner</label>
        <select id="d_owner" onchange="changeTicketField('${id}','owner',this.value)">
          <option value="">Unassigned</option>
          ${DB.team.map(function(p){return `<option ${p.name===t.owner?'selected':''}>${p.name}</option>`;}).join('')}
        </select>
      </div>
      <div class="field"><label>Due Date</label><input type="date" id="d_due" value="${t.due_date||''}" onchange="changeTicketField('${id}','due_date',this.value)"></div>
    </div>
    <div style="display:flex;gap:12px;font-size:12px;color:var(--text-dim);margin-top:4px;">
      <span><b>Reporter:</b> ${t.reporter}</span>
    </div>

    <div class="card-h" style="margin-top:16px;">Checklist <span class="thin-tag">${checklist.filter(c=>c.done).length}/${checklist.length}</span></div>
    <div id="checklistBox">${checklistHtml(checklist)}</div>
    <div style="display:flex;gap:6px;margin-top:8px;">
      <input id="newChecklistItem" placeholder="Add a checklist item..." style="flex:1;padding:7px 10px;border:1px solid var(--line);border-radius:6px;font-family:inherit;font-size:12.5px;" onkeydown="if(event.key==='Enter'){addChecklistItem('${id}');}">
      <button class="btn btn-ghost" onclick="addChecklistItem('${id}')">Add</button>
    </div>

    <div class="card-h" style="margin-top:16px;">Activity</div>
    <div class="timeline">
      ${acts.length ? acts.map(function(a){return `<div class="tl-item"><div class="tl-time">${fmtDateTime(a.timestamp)}</div><b>${a.actor}</b> ${a.action.toLowerCase()} ${a.new_value?('-> '+a.new_value):''}</div>`;}).join('') : '<div class="empty">No activity yet.</div>'}
    </div>

    <div style="display:flex;gap:8px;margin-top:18px;">
      <button class="btn btn-ghost" style="flex:1;justify-content:center;" onclick="saveAsTemplate('${id}')">Save as Template</button>
      <button class="btn btn-ghost" style="flex:1;justify-content:center;color:var(--red);border-color:var(--red-bg);" onclick="deleteTicket('${id}','${(t.title||'').replace(/'/g,"\\'")}')">Delete Ticket</button>
    </div>
  `;
  openModal('detailModalBg');
}

function deleteTicket(id, title){
  if(!confirm('Delete "'+title+'"? This cannot be undone.')) return;
  api('deleteTicket', {ticket_id:id}).then(function(res){
    if(!res.ok){ alert('Could not delete: '+(res.error||'Unknown error')); return; }
    DB.tickets = DB.tickets.filter(function(t){return t.ticket_id!==id;});
    closeModal('detailModalBg');
    render();
  });
}

function checklistHtml(checklist){
  if(!checklist.length) return '<div class="empty" style="padding:14px;">No checklist items yet.</div>';
  return checklist.map(function(item,i){
    return `<div class="thin-row"><input type="checkbox" ${item.done?'checked':''} onchange="toggleChecklistItem(${i},this.checked)"><span class="thin-title" style="${item.done?'text-decoration:line-through;color:var(--text-faint);':''}">${item.text}</span><span class="thin-tag" style="cursor:pointer;color:var(--red);" onclick="removeChecklistItem(${i})">Remove</span></div>`;
  }).join('');
}

var CURRENT_TICKET_ID = null;

function addChecklistItem(id){
  CURRENT_TICKET_ID = id;
  var input = document.getElementById('newChecklistItem');
  var text = input.value.trim();
  if(!text) return;
  var t = DB.tickets.filter(function(x){return x.ticket_id===id;})[0];
  var checklist = parseChecklist(t);
  checklist.push({text:text, done:false});
  input.value = '';
  saveChecklist(id, checklist);
}

function toggleChecklistItem(idx, done){
  var t = DB.tickets.filter(function(x){return x.ticket_id===CURRENT_TICKET_ID;})[0];
  var checklist = parseChecklist(t);
  checklist[idx].done = done;
  saveChecklist(CURRENT_TICKET_ID, checklist);
}

function removeChecklistItem(idx){
  var t = DB.tickets.filter(function(x){return x.ticket_id===CURRENT_TICKET_ID;})[0];
  var checklist = parseChecklist(t);
  checklist.splice(idx,1);
  saveChecklist(CURRENT_TICKET_ID, checklist);
}

function saveChecklist(id, checklist){
  CURRENT_TICKET_ID = id;
  var json = JSON.stringify(checklist);
  api('updateTicket', {ticket_id:id, checklist_json:json, actor:CURRENT_USER}).then(function(res){
    if(!res.ok){ alert('Could not save checklist: '+(res.error||'Unknown error')); return; }
    var t = DB.tickets.filter(function(x){return x.ticket_id===id;})[0];
    if(t) t.checklist_json = json;
    document.getElementById('checklistBox').innerHTML = checklistHtml(checklist);
  });
}

function saveAsTemplate(id){
  STATE.templateSourceTicketId = id;
  var t = DB.tickets.filter(function(x){return x.ticket_id===id;})[0];
  if(!t) return;
  document.getElementById('tpl_name').value = t.title;
  openModal('saveTemplateModalBg');
}

function confirmSaveTemplate(){
  var id = STATE.templateSourceTicketId;
  var t = DB.tickets.filter(function(x){return x.ticket_id===id;})[0];
  if(!t) return;
  var name = document.getElementById('tpl_name').value.trim();
  if(!name) return;
  api('saveTemplate', {
    name: name, title: t.title, description: t.description, type: t.type,
    department: t.department, priority: t.priority, checklist_json: t.checklist_json || '[]',
    created_by: CURRENT_USER
  }).then(function(res){
    if(!res.ok){ alert('Could not save template: '+(res.error||'Unknown error')); return; }
    if(WORKSPACE_MODE && res.template){ DB.templates = DB.templates || []; DB.templates.push(res.template); }
    closeModal('saveTemplateModalBg');
    alert('Template saved. You can reuse it from "+ New Ticket" next time.');
  });
}

function changeTicketField(id, field, value){
  var payload = {ticket_id:id, actor:CURRENT_USER};
  payload[field] = value;
  api('updateTicket', payload).then(function(res){
    if(!res.ok){
      alert('Could not update the ticket: ' + (res.error || 'Unknown error'));
      return;
    }
    if(WORKSPACE_MODE){
      var t = DB.tickets.filter(function(x){return x.ticket_id===id;})[0];
      if(t){
        t[field] = value;
        t.updated_at = new Date().toISOString();
        DB.activities.push({activity_id:'local-'+Date.now(), ticket_id:id, timestamp:new Date().toISOString(), actor:CURRENT_USER, action:'Changed '+field, old_value:'', new_value:value});
      }
    }
    render();
    openTicketDetail(id);
  });
}

function openModal(id){ document.getElementById(id).classList.add('open'); }
function closeModal(id){ document.getElementById(id).classList.remove('open'); }

function renderLoginPeople(){
  var box = document.getElementById('loginPeople');
  if(!DB.team.length){
    box.innerHTML = '<div class="login-loading">No one in the Team tab yet  -  add teammates there, or continue as guest.</div>' +
      '<div class="login-person" onclick="selectUser(\'Guest\')" style="margin-top:10px;"><div class="login-avatar">?</div><div><div class="login-person-name">Continue as Guest</div></div></div>';
    return;
  }
  box.innerHTML = DB.team.map(function(p){
    return `<div class="login-person" onclick="selectUser('${p.name}')">
      <div class="login-avatar">${initials(p.name)}</div>
      <div><div class="login-person-name">${p.name}</div><div class="login-person-role">${p.role||''} ${p.department?'- '+p.department:''}</div></div>
    </div>`;
  }).join('');
}

function selectUser(name){
  CURRENT_USER = name;
  var person = DB.team.filter(function(p){return p.name===name;})[0];
  CURRENT_USER_ROLE = person ? (person.role || '') : '';
  document.getElementById('loginScreen').classList.add('hidden');
  document.getElementById('app').classList.remove('hidden');
  document.getElementById('footAvatar').textContent = initials(name);
  document.getElementById('footLabel').textContent = person ? (name + ' - ' + person.role) : name;
  document.getElementById('greetName').textContent = 'Good Morning, ' + name;
  renderNav();
  render();
}

function switchUser(){
  if (WORKSPACE_MODE) {
    alert('Signed in as ' + CURRENT_USER + ' (verified via your Google Workspace account). To switch accounts, sign out of Google in your browser and reopen this link.');
    return;
  }
  document.getElementById('app').classList.add('hidden');
  document.getElementById('loginScreen').classList.remove('hidden');
  renderLoginPeople();
}

// ── Global Search ─────────────────────────────────────────────────────
function runGlobalSearch(query){
  var box = document.getElementById('searchResults');
  query = (query||'').trim().toLowerCase();
  if(!query){ box.classList.remove('open'); box.innerHTML=''; return; }

  var results = [];
  visibleTickets().filter(function(t){
    return t.title.toLowerCase().indexOf(query)>-1 || t.ticket_id.toLowerCase().indexOf(query)>-1;
  }).slice(0,5).forEach(function(t){
    results.push({group:'Tickets', label: typeIcon(t.type)+' '+t.title, action:"closeSearch();openTicketDetail('"+t.ticket_id+"')"});
  });
  DB.meetings.filter(function(m){
    return (m.title||'').toLowerCase().indexOf(query)>-1;
  }).slice(0,5).forEach(function(m){
    results.push({group:'Meetings', label: m.title, action:"closeSearch();goTo('meetings')"});
  });
  DB.team.filter(function(p){
    return (p.name||'').toLowerCase().indexOf(query)>-1;
  }).slice(0,5).forEach(function(p){
    results.push({group:'People', label: p.name+(p.department?' - '+p.department:''), action:"closeSearch();goTo('teamspaces')"});
  });
  DB.decisions.filter(function(d){
    return (d.decision_text||'').toLowerCase().indexOf(query)>-1;
  }).slice(0,5).forEach(function(d){
    results.push({group:'Decisions', label: d.decision_text, action:"closeSearch();goTo('decisions')"});
  });

  if(!results.length){
    box.innerHTML = '<div class="search-result-item" style="color:var(--text-faint);">No matches for "'+query+'"</div>';
    box.classList.add('open');
    return;
  }

  var lastGroup = '';
  box.innerHTML = results.map(function(r){
    var groupHtml = r.group !== lastGroup ? '<div class="search-result-group">'+r.group+'</div>' : '';
    lastGroup = r.group;
    return groupHtml + '<div class="search-result-item" onclick="'+r.action+'">'+r.label+'</div>';
  }).join('');
  box.classList.add('open');
}

function closeSearch(){
  document.getElementById('searchResults').classList.remove('open');
  document.getElementById('globalSearch').value = '';
}

document.getElementById('globalSearch').addEventListener('input', function(e){
  runGlobalSearch(e.target.value);
});
document.addEventListener('click', function(e){
  if(!e.target.closest('.search-wrap')) closeSearch();
});

document.getElementById('greetDate').textContent = new Date().toLocaleDateString('en-US',{weekday:'long',month:'long',day:'numeric'});

function boot(){
  if (WORKSPACE_MODE) {
    document.getElementById('loginSub').textContent = 'Verifying your account...';
    document.getElementById('loginPeople').innerHTML = '<div class="login-loading">One moment...</div>';
    api('whoAmI', {}).then(function(res){
      if(!res.ok){
        document.getElementById('loginSub').textContent = 'Access issue';
        document.getElementById('loginPeople').innerHTML = '<div class="login-loading">'+res.error+'</div>';
        return;
      }
      selectUser(res.name);
    });
  } else {
    renderLoginPeople();
  }
}

if (WORKSPACE_MODE) {
  document.getElementById('loginSub').textContent = 'Loading your workspace...';
  api('getAll', {}).then(function(res){
    if(res.ok){
      DB.tickets = res.data.tickets || [];
      DB.activities = res.data.activities || [];
      DB.meetings = res.data.meetings || [];
      DB.decisions = res.data.decisions || [];
      DB.projects = res.data.projects || [];
      DB.team = res.data.team || [];
      DB.templates = res.data.templates || [];
      DB.oneOnOnes = res.data.oneOnOnes || [];
      boot();
    } else {
      document.getElementById('loginSub').textContent = 'Could not load your data';
      document.getElementById('loginPeople').innerHTML = '<div class="login-loading">'+(res.error || 'Unknown error')+'<br><br>Try reloading the page. If this keeps happening, check Executions in Apps Script for details.</div>';
    }
  }).catch(function(err){
    document.getElementById('loginSub').textContent = 'Could not reach the server';
    document.getElementById('loginPeople').innerHTML = '<div class="login-loading">'+(err && err.message ? err.message : String(err))+'</div>';
  });
} else {
  boot();
}
