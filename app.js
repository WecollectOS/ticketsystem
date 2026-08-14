var WORKSPACE_MODE = (typeof google !== 'undefined' && !!google.script && !!google.script.run);

var CURRENT_USER = 'Oreoluwa';

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
  notifications_log: []
};

var STATE = { module: 'dashboard', editingTicketId: null };

function api(action, payload) {
  if (!WORKSPACE_MODE) return Promise.resolve(mockApi(action, payload));
  return new Promise(function(resolve){
    google.script.run
      .withSuccessHandler(function(res){ resolve(res); })
      .withFailureHandler(function(err){ resolve({ ok:false, error: (err && err.message) || String(err) }); })
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
    adminlog: renderAdminLog, notifications: renderNotifications
  };
  c.innerHTML = '';
  c.appendChild(renderers[STATE.module]());
  populateSelects();
}

function renderDashboard(){
  var t = DB.tickets;
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

function renderTickets(){
  var wrap = el('<div></div>');
  var rows = DB.tickets.map(function(t){
    return `<tr onclick="openTicketDetail('${t.ticket_id}')" style="cursor:pointer">
      <td class="mono">${t.ticket_id}</td>
      <td>${typeIcon(t.type)} ${t.title}</td>
      <td><span class="pill pill-dept">${t.department}</span></td>
      <td><span class="pill pill-prio-${t.priority}">${t.priority}</span></td>
      <td><span class="pill" style="background:${STATUS_COLOR[t.status]}22;color:${STATUS_COLOR[t.status]}">${t.status}</span></td>
      <td>${t.owner||' - '}</td>
      <td>${fmtDate(t.due_date)}</td>
    </tr>`;
  }).join('');
  wrap.innerHTML = `
    <div class="section-title">All Tickets</div>
    <div class="card" style="padding:0;overflow-x:auto;">
      <table>
        <thead><tr><th>ID</th><th>Title</th><th>Department</th><th>Priority</th><th>Status</th><th>Owner</th><th>Due</th></tr></thead>
        <tbody>${rows || '<tr><td colspan="7" class="empty">No tickets yet.</td></tr>'}</tbody>
      </table>
    </div>`;
  return wrap;
}

function renderBoard(){
  var wrap = el('<div></div>');
  var cols = STATUS_FLOW.concat(['Blocked']);
  var html = '<div class="board">';
  cols.forEach(function(status){
    var items = DB.tickets.filter(function(t){return t.status===status;});
    html += `<div class="board-col">
      <div class="board-col-h"><span class="board-col-dot" style="background:${STATUS_COLOR[status]}"></span>${status}<span class="board-col-count">${items.length}</span></div>
      <div class="board-drop">${items.map(ticketCardHtml).join('')}</div>
    </div>`;
  });
  html += '</div>';
  wrap.innerHTML = '<div class="section-title">New -> Triaged -> Assigned -> In Progress -> Waiting -> Review -> Approved -> Done</div>' + html;
  return wrap;
}

function ticketCardHtml(t){
  return `<div class="ticket" onclick="openTicketDetail('${t.ticket_id}')">
    <div class="ticket-top"><span class="ticket-id">${t.ticket_id}</span><span class="ticket-type">${typeIcon(t.type)}</span></div>
    <div class="ticket-title">${t.title}</div>
    <div class="ticket-meta">
      <span class="pill pill-dept">${t.department}</span>
      <span class="pill pill-prio-${t.priority}">${t.priority}</span>
      <span class="owner-chip" title="${t.owner}">${initials(t.owner)}</span>
    </div>
  </div>`;
}

var CAL_EVENTS_BY_DATE = {};

function renderCalendar(){
  if(!STATE.calendarMonth) STATE.calendarMonth = new Date();
  var wrap = el('<div></div>');
  wrap.innerHTML = `
    <div class="section-title" style="display:flex;align-items:center;gap:10px;">
      <span id="calMonthLabel" style="font-size:15px;color:var(--text);text-transform:none;letter-spacing:0;"></span>
      <span style="margin-left:auto;display:flex;gap:6px;">
        <button class="cal-nav-btn" onclick="shiftCalMonth(-1)"><</button>
        <button class="btn btn-ghost" onclick="shiftCalMonth(0)">Today</button>
        <button class="cal-nav-btn" onclick="shiftCalMonth(1)">></button>
      </span>
    </div>
    <div class="card" style="padding:14px;" id="calGridCard"><div class="empty">Loading calendar...</div></div>
    <div class="section-title">Selected Day</div>
    <div class="card" id="calAgenda"><div class="empty">Pick a day above.</div></div>
    <div id="calConnError"></div>
  `;

  function buildLocalEvents(map){
    DB.tickets.forEach(function(t){ if(t.due_date) addEv(map, t.due_date.slice(0,10), typeIcon(t.type)+' '+t.title, 'Deadline'); });
    DB.projects.forEach(function(p){ if(p.target_date) addEv(map, p.target_date.slice(0,10), '[] '+p.name, 'Milestone'); });
  }
  function addEv(map, dateStr, label, type){
    if(!dateStr) return;
    (map[dateStr] = map[dateStr] || []).push({label:label, type:type});
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
      if(res.ok){
        res.events.forEach(function(e){ addEv(eventsByDate, e.start.slice(0,10), 'Talk '+e.title, 'Calendar'); });
      } else {
        wrap.querySelector('#calConnError').innerHTML = '<div class="thin-tag" style="margin-top:10px;color:var(--red)">Calendar not connected: '+res.error+'</div>';
      }
      paintGrid(eventsByDate);
    });
  } else {
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
    (evs.length ? evs.map(function(e){ return `<div class="thin-row"><span class="thin-title">${e.label}</span><span class="thin-tag">${e.type}</span></div>`; }).join('') : '<div class="empty">Nothing scheduled.</div>');
}

function renderProjects(){
  var wrap = el('<div></div>');
  wrap.innerHTML = '<div class="section-title">Projects</div><div class="stat-grid" id="projGrid" style="grid-template-columns:repeat(auto-fit,minmax(260px,1fr))"></div>';
  var grid = wrap.querySelector('#projGrid');
  grid.innerHTML = DB.projects.map(function(p){
    var tix = DB.tickets.filter(function(t){return t.project_id===p.project_id;});
    var done = tix.filter(function(t){return t.status==='Done';}).length;
    var pct = tix.length ? Math.round(done/tix.length*100) : 0;
    return `<div class="card">
      <div class="card-h">${p.name} <span class="pill pill-dept">${p.department}</span></div>
      <div class="thin-tag" style="margin-bottom:8px;">Phase: <b>${p.phase}</b> - Target ${fmtDate(p.target_date)}</div>
      <div class="wl-bar-track" style="margin-bottom:6px;"><div class="wl-bar-fill" style="width:${pct}%"></div></div>
      <div class="thin-tag">${done}/${tix.length} tickets done</div>
    </div>`;
  }).join('') || '<div class="empty">No projects yet.</div>';
  return wrap;
}

function renderMeetings(){
  var wrap = el('<div></div>');
  wrap.innerHTML = `<div class="section-title">Meetings <button class="btn btn-ghost" style="margin-left:10px" onclick="openMeetingModal()">+ Log Meeting</button></div>
  <div class="section-title" style="margin-top:0;font-size:11px;">Or create a task directly without a meeting  -  use "+ New Ticket" up top anytime.</div>
  <div id="meetingsList"></div>`;
  var box = wrap.querySelector('#meetingsList');
  box.innerHTML = DB.meetings.slice().reverse().map(function(m){
    var statusLabel = m.processed==='yes' ? 'Processed' : (m.processed==='pending_review' ? 'Review AI proposals' : 'Not processed');
    var statusColor = m.processed==='yes' ? 'var(--green)' : (m.processed==='pending_review' ? 'var(--violet)' : 'var(--text-faint)');
    return `<div class="card" style="margin-bottom:12px;">
      <div class="card-h">${m.title} <span class="thin-tag">${fmtDate(m.date)}</span></div>
      <div class="thin-tag" style="margin-bottom:8px;">Participants: ${m.participants}</div>
      <div style="font-size:12.5px;color:var(--text-dim);margin-bottom:10px;">${(m.raw_notes||'').slice(0,180)}${(m.raw_notes||'').length>180?'...':''}</div>
      <div style="display:flex;align-items:center;gap:10px;">
        <span class="pill" style="background:${statusColor}22;color:${statusColor}">${statusLabel}</span>
        ${m.processed==='no' ? `<button class="btn btn-ghost" onclick="runMeetingAI('${m.meeting_id}')">* Process with AI</button>` : ''}
        ${m.processed==='pending_review' ? `<button class="btn btn-ghost" onclick="reviewMeetingProposals('${m.meeting_id}')">Review proposals</button>` : ''}
      </div>
      <div id="ai-${m.meeting_id}"></div>
    </div>`;
  }).join('') || '<div class="empty">No meetings logged yet.</div>';
  return wrap;
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
    return `<div class="proposal"><b>Decision:</b> ${d.decision_text}<br><span class="thin-tag">Reason: ${d.reason} - Owner: ${d.owner}</span></div>`;
  }).join('');
  var itemsHtml = (p.action_items||[]).map(function(item,i){
    var matchLabel = item.match_ticket_id ? ('Updates existing ticket '+item.match_ticket_id) : 'Creates new ticket';
    return `<div class="proposal"><b>${item.description}</b><br><span class="thin-tag">${matchLabel} - Owner: ${item.owner||'unassigned'}</span></div>`;
  }).join('');
  target.innerHTML = `<div class="ai-box">
    <div class="ai-box-h">* AI Summary</div>
    <div style="margin-bottom:10px;">${p.summary}</div>
    ${decisionsHtml ? '<b style="font-size:12px">Decisions</b>' + decisionsHtml : ''}
    ${itemsHtml ? '<b style="font-size:12px">Action items</b>' + itemsHtml : ''}
    <div class="proposal-actions">
      <button class="btn btn-primary" onclick="approveMeeting('${meetingId}')">Approve & create/update tickets</button>
      <button class="btn btn-ghost" onclick="render()">Discard</button>
    </div>
  </div>`;
}

function approveMeeting(meetingId){
  var p = MEETING_PROPOSALS[meetingId];
  api('approveMeetingTickets', {meeting_id:meetingId, decisions:p.decisions, action_items:p.action_items}).then(function(res){
    render();
  });
}

var SELECTED_PARTICIPANTS = [];

function openMeetingModal(){
  SELECTED_PARTICIPANTS = [];
  document.getElementById('m_title').value = '';
  document.getElementById('m_notes').value = '';
  document.getElementById('m_date').value = new Date().toISOString().slice(0,10);
  renderParticipantPicker();
  openModal('meetingModalBg');
}

function renderParticipantPicker(){
  var box = document.getElementById('m_people_picker');
  if(!box) return;
  box.innerHTML = DB.team.length ? DB.team.map(function(p){
    var active = SELECTED_PARTICIPANTS.indexOf(p.name) > -1;
    return `<span class="ms-chip${active?' ms-chip-active':''}" onclick="toggleParticipant('${p.name}')">${p.name}</span>`;
  }).join('') : '<div class="thin-tag">No team members in the Team tab yet.</div>';
}

function toggleParticipant(name){
  var i = SELECTED_PARTICIPANTS.indexOf(name);
  if(i > -1) SELECTED_PARTICIPANTS.splice(i,1); else SELECTED_PARTICIPANTS.push(name);
  renderParticipantPicker();
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

function handleMeetingFileUpload(event){
  var file = event.target.files[0];
  if(!file) return;
  var name = file.name.toLowerCase();
  var notesBox = document.getElementById('m_notes');

  if(name.endsWith('.txt') || name.endsWith('.md')){
    var r1 = new FileReader();
    r1.onload = function(e){ notesBox.value = e.target.result; };
    r1.onerror = function(){ alert('Could not read that file.'); };
    r1.readAsText(file);
    return;
  }

  if(name.endsWith('.docx')){
    notesBox.value = 'Loading Word reader...';
    loadScriptOnce('https://cdnjs.cloudflare.com/ajax/libs/mammoth/1.6.0/mammoth.browser.min.js').then(function(){
      notesBox.value = 'Reading document...';
      var r2 = new FileReader();
      r2.onload = function(e){
        mammoth.extractRawText({arrayBuffer: e.target.result}).then(function(result){
          notesBox.value = result.value;
        }).catch(function(err){ notesBox.value = ''; alert('Could not read that Word file: '+err.message); });
      };
      r2.readAsArrayBuffer(file);
    }).catch(function(){
      notesBox.value = '';
      alert('Could not load the Word file reader  -  check your connection and try again.');
    });
    return;
  }

  if(name.endsWith('.pdf')){
    notesBox.value = 'Loading PDF reader...';
    loadScriptOnce('https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js').then(function(){
      pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
      notesBox.value = 'Reading PDF...';
      var r3 = new FileReader();
      r3.onload = function(e){
        pdfjsLib.getDocument({data: e.target.result}).promise.then(function(pdf){
          var pagePromises = [];
          for(var i=1; i<=pdf.numPages; i++){
            pagePromises.push(pdf.getPage(i).then(function(page){
              return page.getTextContent().then(function(tc){
                return tc.items.map(function(it){ return it.str; }).join(' ');
              });
            }));
          }
          return Promise.all(pagePromises);
        }).then(function(pages){
          notesBox.value = pages.join('\n\n');
        }).catch(function(err){ notesBox.value = ''; alert('Could not read that PDF: '+err.message); });
      };
      r3.readAsArrayBuffer(file);
    }).catch(function(){
      notesBox.value = '';
      alert('Could not load the PDF reader  -  check your connection and try again.');
    });
    return;
  }

  if(name.endsWith('.doc')){
    alert('Old .doc format (pre-2007 Word) isn\'t supported. Please re-save as .docx or PDF, or paste the text directly.');
    return;
  }

  alert('Unsupported file type. Use .txt, .md, .docx, or .pdf.');
}

function saveMeeting(){
  var payload = {
    title: document.getElementById('m_title').value || 'Untitled Meeting',
    date: document.getElementById('m_date').value || new Date().toISOString().slice(0,10),
    participants: SELECTED_PARTICIPANTS.join(', '),
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
  var html = '<div class="section-title">Daily Stand-up  -  Yesterday / Today / Blockers</div>';
  depts.forEach(function(dept){
    var people = DB.team.filter(function(p){return p.department===dept;});
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
  var html = '<div class="section-title">Team Spaces</div><div class="dash-grid" style="grid-template-columns:repeat(3,1fr)">';
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
  wrap.innerHTML = html;
  return wrap;
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

function renderNotifications(){
  var wrap = el('<div></div>');
  wrap.innerHTML = `<div class="section-title">Connections</div>
  <div class="card" id="connCard"><div class="empty">Checking...</div></div>
  <div class="section-title">Notifications</div>
  <div class="card">
    <div class="thin-tag" style="margin-bottom:10px;">Slack notifications fire from Apps Script (assigned, mentioned, due tomorrow, overdue, blocked, review needed, completed).</div>
    <div id="notifLog"></div>
  </div>`;

  if(WORKSPACE_MODE){
    api('checkConnections', {}).then(function(res){
      var card = wrap.querySelector('#connCard');
      if(!res.ok){ card.innerHTML = '<div class="empty">Could not check connections.</div>'; return; }
      var rows = [
        {label:'Gemini (AI meeting parsing)', c:res.gemini},
        {label:'Slack (notifications)', c:res.slack},
        {label:'Google Calendar', c:res.calendar}
      ];
      card.innerHTML = rows.map(function(r){
        return `<div class="conn-row"><span class="conn-dot ${r.c.connected?'ok':'bad'}"></span><b>${r.label}</b><span class="thin-tag" style="margin-left:auto;">${r.c.note}</span></div>`;
      }).join('');
    });
  } else {
    wrap.querySelector('#connCard').innerHTML = '<div class="empty">Connections only apply once this is running through Apps Script.</div>';
  }

  var box = wrap.querySelector('#notifLog');
  box.innerHTML = DB.notifications_log && DB.notifications_log.length ? DB.notifications_log.slice().reverse().map(function(n){
    return `<div class="thin-row"><span class="thin-title">${n.message}</span><span class="thin-tag">${n.status}</span></div>`;
  }).join('') : '<div class="empty">No notifications sent yet in this session.</div>';
  return wrap;
}

function populateSelects(){
  var ownerSel = document.getElementById('f_owner');
  var projSel = document.getElementById('f_project');
  if(ownerSel){
    ownerSel.innerHTML = '<option value="">Unassigned</option>' + DB.team.map(function(p){return `<option value="${p.name}">${p.name}</option>`;}).join('');
  }
  if(projSel){
    projSel.innerHTML = '<option value="">None</option>' + DB.projects.map(function(p){return `<option value="${p.project_id}">${p.name}</option>`;}).join('');
  }
}

function openNewTicket(){
  STATE.editingTicketId = null;
  document.getElementById('ticketModalTitle').textContent = 'New Ticket';
  ['f_title','f_desc'].forEach(function(id){ document.getElementById(id).value=''; });
  document.getElementById('f_due').value='';
  populateSelects();
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
    reporter: CURRENT_USER
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
  var body = document.getElementById('detailModalBody');
  body.innerHTML = `
    <div class="modal-h"><h2>${typeIcon(t.type)} ${t.title}</h2><button class="close-x" onclick="closeModal('detailModalBg')">X</button></div>
    <div class="thin-tag mono" style="margin-bottom:12px;">${t.ticket_id}</div>
    <div style="font-size:13px;color:var(--text-dim);margin-bottom:14px;">${t.description || 'No description.'}</div>
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
      <span><b>Department:</b> ${t.department}</span><span><b>Reporter:</b> ${t.reporter}</span>
    </div>
    <div class="card-h" style="margin-top:16px;">Activity</div>
    <div class="timeline">
      ${acts.length ? acts.map(function(a){return `<div class="tl-item"><div class="tl-time">${fmtDateTime(a.timestamp)}</div><b>${a.actor}</b> ${a.action.toLowerCase()} ${a.new_value?('-> '+a.new_value):''}</div>`;}).join('') : '<div class="empty">No activity yet.</div>'}
    </div>
    <button class="btn btn-ghost" style="margin-top:18px;color:var(--red);border-color:var(--red-bg);width:100%;justify-content:center;" onclick="deleteTicket('${id}','${(t.title||'').replace(/'/g,"\\'")}')">Delete Delete Ticket</button>
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
  document.getElementById('loginScreen').classList.add('hidden');
  document.getElementById('app').classList.remove('hidden');
  document.getElementById('footAvatar').textContent = initials(name);
  var person = DB.team.filter(function(p){return p.name===name;})[0];
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
