// ═══════════════════════════════════════════════════════════════════════
// Shared board page — the "Outreach Pipeline" layout used by CRM, Engineering,
// UAT and Content: header + primary button, stage tabs with counts, search +
// filter selects + Cards/List/Summary toggle, card grid.
// ═══════════════════════════════════════════════════════════════════════
var SVG_PATHS = {
  home:'<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
  tag:'<path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/>',
  columns:'<rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="3" x2="15" y2="21"/>',
  check:'<polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>',
  calendar:'<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',
  folder:'<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>',
  file:'<path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="13 2 13 9 20 9"/>',
  users:'<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  edit:'<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>',
  card:'<rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/>',
  chart:'<line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/>',
  sun:'<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>',
  book:'<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>',
  award:'<circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>',
  message:'<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
  zap:'<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
  activity:'<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>',
  sliders:'<line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/>',
  grid:'<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>',
  star:'<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
  globe:'<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
  flag:'<path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/>',
  shield:'<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
  bell:'<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>',
  search:'<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',
  menu:'<line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/>',
  chevrons:'<polyline points="11 17 6 12 11 7"/><polyline points="18 17 13 12 18 7"/>',
  more:'<circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>'
};
function svgIco(name, size){
  size = size || 16;
  return '<svg width="'+size+'" height="'+size+'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+(SVG_PATHS[name]||'')+'</svg>';
}
var NAV_ICON = {
  dashboard:'home', tickets:'tag', board:'columns', uat:'check', calendar:'calendar', projects:'folder', filemanager:'file',
  crm:'users', content:'edit', payroll:'card', finance:'chart', leave:'sun', training:'book', trainingadmin:'award',
  meetings:'message', standup:'zap', oneonones:'users', feed:'activity', workload:'sliders', teamspaces:'grid',
  command:'star', newsdigest:'globe', decisions:'flag', adminlog:'shield', notifications:'bell'
};

// ═══════════════════════════════════════════════════════════════════════
// Self-contained shell: this file injects every style, modal and shell control
// the new modules need, so it works even if the pasted Index.html is older.
// Idempotent — safe to run on top of the newer Index.html too.
// ═══════════════════════════════════════════════════════════════════════
var SHELL_CSS = `/* ── Collapsible sidebar (desktop) ───────────────────────────────────── */
#sidebar{transition:width .15s;}
.sidebar-collapse-btn{width:22px;height:22px;border-radius:5px;border:none;background:transparent;color:var(--on-ink-dim);cursor:pointer;font-size:13px;flex-shrink:0;}
.sidebar-collapse-btn:hover{background:var(--line2);color:var(--on-ink);}
#sidebar.collapsed{width:72px;}
#sidebar.collapsed .brand-name,#sidebar.collapsed .brand-sub,#sidebar.collapsed .greet,
#sidebar.collapsed .nav-label,#sidebar.collapsed .nav-item span.nav-label-text,
#sidebar.collapsed #footLabel{display:none;}
#sidebar.collapsed .brand{justify-content:center;padding:0;}
#sidebar.collapsed .nav-item{justify-content:center;padding:9px 0;}
#sidebar.collapsed .nav-count{display:none;}
#sidebar.collapsed .sidebar-foot{justify-content:center;padding:12px 0;}

/* ── Board view-toggle + filter pills (CRM/Ticketing/Content/UAT boards) */
.view-toggle{display:inline-flex;background:var(--surface2);border-radius:7px;padding:3px;gap:2px;}
.view-toggle-btn{border:none;background:transparent;padding:6px 13px;border-radius:5px;font-size:12px;font-weight:500;cursor:pointer;color:var(--text-dim);font-family:inherit;}
.view-toggle-btn.active{background:var(--surface);color:var(--text);box-shadow:var(--shadow);}
.filter-pills{display:flex;gap:6px;flex-wrap:wrap;}
.filter-pill{font-size:12px;padding:6px 12px;border-radius:20px;background:var(--surface2);border:1px solid transparent;cursor:pointer;user-select:none;color:var(--text-dim);}
.filter-pill.active{background:var(--ink);color:var(--on-ink);}
.board-toolbar{display:flex;align-items:center;gap:12px;flex-wrap:wrap;justify-content:space-between;margin-bottom:14px;}
.board-toolbar-filters{display:flex;flex-direction:column;gap:8px;}
.table-scroll{overflow-x:auto;}
.table-scroll table{min-width:640px;}
.summary-bars{display:flex;flex-direction:column;gap:8px;}
.summary-bar-row{display:flex;align-items:center;gap:10px;font-size:12.5px;}
.summary-bar-label{width:150px;flex-shrink:0;}
.summary-bar-track{flex:1;height:9px;background:var(--surface2);border-radius:20px;overflow:hidden;}
.summary-bar-fill{height:100%;border-radius:20px;}
.summary-bar-pct{width:36px;text-align:right;font-family:'IBM Plex Mono';font-size:11px;color:var(--text-dim);}
.stage-btn-row{display:flex;flex-wrap:wrap;gap:6px;margin:10px 0 14px;}
.stage-btn{font-size:11.5px;padding:6px 11px;border-radius:20px;border:1px solid var(--line);background:var(--surface);cursor:pointer;color:var(--text-dim);}
.stage-btn.current{background:var(--ink);color:var(--on-ink);border-color:var(--ink);}
.reveal-panel{background:var(--brand-bg);border:1px solid #CBD0F6;border-radius:8px;padding:12px;margin:10px 0;}
.reveal-panel.decline{background:var(--red-bg);border-color:#F3C8C8;}

/* ── Mobile bottom nav (hidden on desktop) ───────────────────────────── */
#mobileNav{display:none;}
#mobileNavBackdrop{display:none;}

/* ── Mobile / small-screen layout ────────────────────────────────────── */
@media (max-width:760px){
  body{overflow:auto;}
  #app{height:100vh;}
  #sidebar{
    position:fixed; left:0; top:0; bottom:0; z-index:70; width:240px !important;
    transform:translateX(-100%); transition:transform .18s ease;
  }
  #sidebar.mobile-open{transform:translateX(0);}
  #sidebar.collapsed{width:240px !important;} /* collapse is a desktop-only concept on mobile */
  #sidebar.collapsed .brand-name,#sidebar.collapsed .brand-sub,#sidebar.collapsed .greet,
  #sidebar.collapsed .nav-label,#sidebar.collapsed .nav-item span.nav-label-text,
  #sidebar.collapsed #footLabel{display:block;}
  #sidebar.collapsed .nav-item{justify-content:flex-start;padding:8px 10px;}
  .collapse-chevron{display:none;}
  .mobile-hamburger{display:inline-flex !important;}
  #mobileNavBackdrop.open{display:block;position:fixed;inset:0;background:rgba(20,22,31,.45);z-index:65;}

  #topbar{padding:0 14px;gap:8px;}
  .page-title{font-size:15px;}
  .search-wrap{display:none;}
  #content{padding:16px 14px 84px;}
  .dash-grid{grid-template-columns:1fr;}
  .row2{grid-template-columns:1fr;}
  .stat-grid{grid-template-columns:repeat(2,1fr);}
  .modal{position:fixed;width:min(460px,100%);max-height:90vh;overflow-y:auto;border-radius:12px 12px 0 0;}
  .board-toolbar{flex-direction:column;align-items:stretch;}

  #mobileNav{
    display:flex; position:fixed; left:0; right:0; bottom:0; z-index:66;
    background:var(--ink); border-top:1px solid var(--line2);
    padding:6px 4px calc(6px + env(safe-area-inset-bottom));
  }
  .mn-item{flex:1;display:flex;flex-direction:column;align-items:center;gap:2px;padding:6px 0;cursor:pointer;color:var(--on-ink-dim);font-size:10px;border:none;background:none;font-family:inherit;}
  .mn-item.active{color:var(--on-ink);}
  .mn-ico{font-size:14px;line-height:1;}
}
/* ── Shared board page (Outreach-Pipeline layout) ───────────────────── */
.bp{--bp-accent:#4C50E3;}
.bp-head{display:flex;justify-content:space-between;align-items:flex-start;gap:12px;margin-bottom:16px;flex-wrap:wrap;}
.bp-title{font-family:'Space Grotesk',sans-serif;font-size:21px;font-weight:700;letter-spacing:-.3px;}
.bp-sub{font-size:12.5px;color:var(--text-dim);margin-top:3px;}
.bp-head-actions{display:flex;gap:8px;align-items:center;flex-wrap:wrap;}
.bp-btn{background:var(--bp-accent);color:#fff;border:none;border-radius:8px;padding:9px 16px;font-size:13px;font-weight:600;cursor:pointer;font-family:inherit;}
.bp-btn:hover{filter:brightness(.92);}
.bp-tabs{display:flex;gap:6px;overflow-x:auto;padding-bottom:8px;margin-bottom:6px;-webkit-overflow-scrolling:touch;}
.bp-tab{white-space:nowrap;border:1px solid var(--line);background:var(--surface);padding:6px 13px;border-radius:20px;font-size:12.5px;cursor:pointer;color:var(--text-dim);font-family:inherit;}
.bp-tab .n{margin-left:7px;font-size:11px;opacity:.65;font-family:'IBM Plex Mono',monospace;}
.bp-tab:hover{border-color:var(--bp-accent);}
.bp-tab.active{background:var(--bp-accent);border-color:var(--bp-accent);color:#fff;}
.bp-tab.active .n{opacity:.9;}
.bp-bar{display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin:8px 0 16px;}
.bp-search{position:relative;flex:1;min-width:170px;}
.bp-search svg{position:absolute;left:10px;top:50%;transform:translateY(-50%);color:var(--text-faint);pointer-events:none;}
.bp-search input{width:100%;padding:8px 12px 8px 32px;border:1px solid var(--line);border-radius:8px;background:var(--surface);font-size:13px;font-family:inherit;outline:none;}
.bp-search input:focus{border-color:var(--bp-accent);}
.bp-sel{padding:8px 10px;border:1px solid var(--line);border-radius:8px;background:var(--surface);font-size:13px;font-family:inherit;color:var(--text);max-width:100%;}
.bp-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(290px,1fr));gap:12px;}
.bp-card{background:var(--surface);border:1px solid var(--line);border-radius:10px;padding:14px;cursor:pointer;box-shadow:var(--shadow);display:flex;flex-direction:column;gap:8px;transition:.12s;}
.bp-card:hover{border-color:var(--bp-accent);transform:translateY(-1px);}
.bp-card-top{display:flex;align-items:center;justify-content:space-between;gap:8px;}
.bp-stage{font-size:11px;font-weight:600;padding:3px 9px;border-radius:20px;}
.bp-id{font-family:'IBM Plex Mono',monospace;font-size:10.5px;color:var(--text-faint);}
.bp-card-title{font-size:14.5px;font-weight:600;line-height:1.3;}
.bp-card-sub{font-size:12px;color:var(--text-dim);margin-top:-4px;}
.bp-chip{display:inline-block;font-size:11px;padding:2px 8px;border-radius:5px;background:var(--surface2);color:var(--text-dim);}
.bp-chip.tag{background:var(--brand-bg);color:var(--brand);font-weight:500;}
.bp-chips{display:flex;gap:5px;flex-wrap:wrap;}
.bp-prog{display:flex;gap:3px;}
.bp-seg{flex:1;height:4px;border-radius:3px;background:var(--surface2);}
.bp-card-foot{display:flex;justify-content:space-between;align-items:center;font-size:11.5px;color:var(--text-faint);margin-top:2px;padding-top:8px;border-top:1px solid var(--line);}
.bp-owner{display:inline-flex;align-items:center;gap:6px;color:var(--text-dim);}

/* ── Icons / topbar polish ──────────────────────────────────────────── */
.nav-ico{display:inline-flex;align-items:center;justify-content:center;width:18px;flex-shrink:0;}
.search-ico{display:flex;align-items:center;pointer-events:none;}
.sidebar-collapse-btn{display:inline-flex;align-items:center;justify-content:center;}
#sidebar.collapsed .collapse-chevron svg{transform:rotate(180deg);}
.notif-bell-wrap .bell-btn{width:34px;height:34px;border-radius:8px;border:none;background:transparent;color:var(--text-dim);cursor:pointer;display:inline-flex;align-items:center;justify-content:center;position:relative;}
.notif-bell-wrap .bell-btn:hover{background:var(--surface2);}
.mn-ico{display:inline-flex;}
.nav-item.active::before{display:none !important;}
.nav-item.active{box-shadow:inset 3px 0 0 var(--brand);}
@media (max-width:760px){
  #notifDropdown{position:fixed !important;left:10px !important;right:10px !important;top:58px !important;width:auto !important;}
  .bp-sel{flex:1;min-width:120px;}
  .bp-head-actions{width:100%;}
  .bp-btn{flex:1;}
}
`;
var SHELL_MODALS = `<div class="modal-bg" id="newTestCaseModalBg">
  <div class="modal">
    <div class="modal-h"><h2>New Test Case</h2><button class="close-x" onclick="closeModal('newTestCaseModalBg')">X</button></div>
    <div class="row2">
      <div class="field"><label>Module / System</label>
        <select id="tcf_module"><option>Mobile App</option><option>PMD</option><option>OTG</option><option>Super Admin</option></select>
      </div>
      <div class="field"><label>Type</label><input id="tcf_type" placeholder="Functional" value="Functional"></div>
    </div>
    <div class="field"><label>Flow</label><input id="tcf_flow" placeholder="Login"></div>
    <div class="field"><label>Test Case</label><input id="tcf_case" placeholder="Login with valid credentials"></div>
    <div class="field"><label>Steps</label><textarea id="tcf_steps" placeholder="1. Open app  2. Enter credentials  3. Tap Login"></textarea></div>
    <div class="field"><label>Expected Result</label><textarea id="tcf_expected" placeholder="User lands on home dashboard"></textarea></div>
    <div class="field"><label>Priority</label>
      <select id="tcf_priority"><option>Low</option><option selected>Medium</option><option>High</option><option>Critical</option></select>
    </div>
    <button class="btn btn-primary" style="width:100%;justify-content:center;padding:10px;" onclick="saveNewTestCase()">Add Test Case</button>
  </div>
</div>

<div class="modal-bg" id="uatDetailModalBg">
  <div class="modal" id="uatDetailModalBody"></div>
</div>

<div class="modal-bg" id="newLeadModalBg">
  <div class="modal">
    <div class="modal-h"><h2>New Lead</h2><button class="close-x" onclick="closeModal('newLeadModalBg')">X</button></div>
    <div class="row2">
      <div class="field"><label>Name</label><input id="lf_name" placeholder="Amaka Obi"></div>
      <div class="field"><label>Organization</label><input id="lf_org" placeholder="FSD Africa"></div>
    </div>
    <div class="row2">
      <div class="field"><label>Position</label><input id="lf_position" placeholder="Program Lead"></div>
      <div class="field"><label>Email</label><input id="lf_email" placeholder="amaka@fsdafrica.org"></div>
    </div>
    <div class="row2">
      <div class="field"><label>LinkedIn URL</label><input id="lf_linkedin" placeholder="https://linkedin.com/in/..."></div>
      <div class="field"><label>Offering</label><input id="lf_offering" placeholder="M&E Platform"></div>
    </div>
    <div class="row2">
      <div class="field"><label>Owner</label><select id="lf_owner"></select></div>
      <div class="field"><label>Source</label><input id="lf_source" placeholder="Outreach / Referral / Inbound"></div>
    </div>
    <button class="btn btn-primary" style="width:100%;justify-content:center;padding:10px;" onclick="saveNewLead()">Create Lead</button>
  </div>
</div>

<div class="modal-bg" id="leadDetailModalBg">
  <div class="modal" id="leadDetailModalBody"></div>
</div>

<div class="modal-bg" id="newContentModalBg">
  <div class="modal">
    <div class="modal-h"><h2>New Content Item</h2><button class="close-x" onclick="closeModal('newContentModalBg')">X</button></div>
    <div class="field"><label>Title</label><input id="cf_title" placeholder="5 signs your field data has a GPS problem"></div>
    <div class="row2">
      <div class="field"><label>Type</label><input id="cf_type" placeholder="Post / Carousel / Video / Article" value="Post"></div>
      <div class="field"><label>Platform</label>
        <select id="cf_platform"><option>LinkedIn</option><option>Instagram</option><option>Twitter/X</option><option>Blog</option><option>Newsletter</option></select>
      </div>
    </div>
    <div class="field"><label>Owner</label><select id="cf_owner"><option value="">Unassigned</option></select></div>
    <div class="field"><label>Notes / Angle</label><textarea id="cf_notes" placeholder="What's the angle or brief?"></textarea></div>
    <button class="btn btn-primary" style="width:100%;justify-content:center;padding:10px;" onclick="saveNewContent()">Add to Calendar</button>
  </div>
</div>

<div class="modal-bg" id="contentDetailModalBg">
  <div class="modal" id="contentDetailModalBody"></div>
</div>

<div class="modal-bg" id="payrollRunModalBg">
  <div class="modal">
    <div class="modal-h"><h2>Run Monthly Payroll</h2><button class="close-x" onclick="closeModal('payrollRunModalBg')">X</button></div>
    <div class="field"><label>Month</label><input type="month" id="pf_month"></div>
    <div class="thin-tag">Creates a Pending entry for every team member who doesn't already have one this month, carrying forward their last known bank details and salary.</div>
    <button class="btn btn-primary" style="width:100%;justify-content:center;padding:10px;margin-top:10px;" onclick="saveRunPayrollBatch()">Generate Entries</button>
  </div>
</div>

<div class="modal-bg" id="payrollDetailModalBg">
  <div class="modal" id="payrollDetailModalBody"></div>
</div>

<div class="modal-bg" id="newFinanceModalBg">
  <div class="modal">
    <div class="modal-h"><h2>New Finance Entry</h2><button class="close-x" onclick="closeModal('newFinanceModalBg')">X</button></div>
    <div class="row2">
      <div class="field"><label>Type</label><select id="ff_type"><option>Income</option><option>Expense</option></select></div>
      <div class="field"><label>Category</label><input id="ff_category" placeholder="Client payment / Software / Payroll..."></div>
    </div>
    <div class="row2">
      <div class="field"><label>Amount</label><input type="number" id="ff_amount" placeholder="250000"></div>
      <div class="field"><label>Currency</label><input id="ff_currency" value="NGN"></div>
    </div>
    <div class="row2">
      <div class="field"><label>Date</label><input type="date" id="ff_date"></div>
      <div class="field"><label>Project (optional)</label><select id="ff_project"><option value="">None</option></select></div>
    </div>
    <div class="field"><label>Description</label><textarea id="ff_desc" placeholder="What is this entry for?"></textarea></div>
    <button class="btn btn-primary" style="width:100%;justify-content:center;padding:10px;" onclick="saveNewFinanceEntry()">Add Entry</button>
  </div>
</div>

<div class="modal-bg" id="requestLeaveModalBg">
  <div class="modal">
    <div class="modal-h"><h2>Request Leave</h2><button class="close-x" onclick="closeModal('requestLeaveModalBg')">X</button></div>
    <div class="field"><label>Type</label>
      <select id="lvf_type"><option>Annual</option><option>Sick</option><option>Unpaid</option><option>Other</option></select>
    </div>
    <div class="row2">
      <div class="field"><label>Start Date</label><input type="date" id="lvf_start"></div>
      <div class="field"><label>End Date</label><input type="date" id="lvf_end"></div>
    </div>
    <div class="field"><label>Reason (optional)</label><textarea id="lvf_reason"></textarea></div>
    <button class="btn btn-primary" style="width:100%;justify-content:center;padding:10px;" onclick="saveLeaveRequest()">Submit Request</button>
  </div>
</div>
`;
var SHELL_TICKET = `<div class="modal-bg" id="ticketModalBg">
  <div class="modal">
    <div class="modal-h"><h2 id="ticketModalTitle">New Ticket</h2><button class="close-x" onclick="closeModal('ticketModalBg')">X</button></div>
    <div class="field"><label>Start from Template (optional)</label><select id="f_template" onchange="applyTemplateToForm()"></select></div>
    <div class="field"><label>Title</label><input id="f_title" placeholder="Dashboard Export Bug"></div>
    <div class="field">
      <label style="display:flex;justify-content:space-between;align-items:center;">Description
        <button class="btn btn-ghost" style="padding:3px 9px;font-size:11px;" onclick="aiTriageFromDescription()">AI: suggest fields</button>
      </label>
      <textarea id="f_desc" placeholder="What's going on..."></textarea>
      <div id="f_ai_hint" class="thin-tag" style="margin-top:4px;"></div>
    </div>
    <div class="row2">
      <div class="field"><label>Type</label>
        <select id="f_type" onchange="toggleParentPicker()">
          <option>Direction</option><option>Feature</option><option selected>Task</option><option>Bug</option>
          <option>Idea</option><option>Incident</option><option>Customer Request</option><option>Growth</option>
          <option>Documentation</option><option>Research</option><option>Deployment</option>
        </select>
      </div>
      <div class="field"><label>Department</label>
        <select id="f_dept"><option>Engineering</option><option>Operations</option><option>Growth</option></select>
      </div>
    </div>
    <div class="row2">
      <div class="field"><label>System</label>
        <select id="f_system" onchange="toggleParentPicker()">
          <option value="">-</option><option>Mobile App</option><option>PMD</option><option>OTG</option><option>Super Admin</option>
        </select>
      </div>
      <div class="field" id="f_parent_wrap">
        <label>Tied to (Direction/Feature)</label>
        <select id="f_parent"><option value="">None</option></select>
      </div>
    </div>
    <div class="row2">
      <div class="field"><label>Priority</label>
        <select id="f_prio"><option>Low</option><option selected>Medium</option><option>High</option><option>Urgent</option></select>
      </div>
      <div class="field"><label>Owner</label><select id="f_owner"></select></div>
    </div>
    <div class="row2">
      <div class="field"><label>Due Date</label><input type="date" id="f_due"></div>
      <div class="field"><label>Project</label><select id="f_project"></select></div>
    </div>
    <button class="btn btn-primary" style="width:100%;justify-content:center;padding:10px;" onclick="saveTicket()">Create Ticket</button>
  </div>
</div>
`;

function ensureShell(){
  try {
    var vp = document.querySelector('meta[name=viewport]');
    if(!vp){ vp = document.createElement('meta'); vp.name='viewport'; document.head.appendChild(vp); }
    vp.content = 'width=device-width, initial-scale=1, viewport-fit=cover';
  } catch(e){}

  if(!document.getElementById('wcShellCss')){
    var st = document.createElement('style'); st.id = 'wcShellCss'; st.textContent = SHELL_CSS; document.head.appendChild(st);
  }

  var app = document.getElementById('app');

  // modals (only add the ones that are missing)
  var holder = document.createElement('div'); holder.innerHTML = SHELL_MODALS;
  Array.prototype.slice.call(holder.children).forEach(function(m){
    if(m.id && !document.getElementById(m.id)) document.body.appendChild(m);
  });
  // ticket modal: replace when it lacks the System / Tied-to fields
  if(!document.getElementById('f_system')){
    var th = document.createElement('div'); th.innerHTML = SHELL_TICKET;
    var newT = th.firstElementChild, oldT = document.getElementById('ticketModalBg');
    if(oldT) oldT.parentNode.replaceChild(newT, oldT); else document.body.appendChild(newT);
  }

  if(app){
    if(!document.getElementById('mobileNavBackdrop')){
      var bd = document.createElement('div'); bd.id = 'mobileNavBackdrop'; bd.onclick = closeMobileDrawer; app.insertBefore(bd, app.firstChild);
    }
    var brand = document.querySelector('#sidebar .brand');
    if(brand && !brand.querySelector('.collapse-chevron')){
      var ch = document.createElement('button'); ch.className = 'sidebar-collapse-btn collapse-chevron'; ch.title = 'Collapse sidebar';
      ch.innerHTML = svgIco('chevrons', 15); ch.onclick = toggleSidebarCollapse; brand.appendChild(ch);
    } else if(brand){
      var ex = brand.querySelector('.collapse-chevron'); if(ex && ex.textContent.trim()) ex.innerHTML = svgIco('chevrons', 15);
    }
    var tb = document.getElementById('topbar');
    if(tb){
      if(!tb.querySelector('.mobile-hamburger')){
        var hb = document.createElement('button'); hb.className = 'sidebar-collapse-btn mobile-hamburger'; hb.style.display = 'none'; hb.title = 'Menu';
        hb.innerHTML = svgIco('menu', 18); hb.onclick = openMobileDrawer; tb.insertBefore(hb, tb.firstChild);
      } else {
        var h2 = tb.querySelector('.mobile-hamburger'); if(h2.textContent.trim()) h2.innerHTML = svgIco('menu', 18);
      }
      if(!document.getElementById('notifBadge')){
        var old = tb.querySelector('.notif-bell-wrap'); if(old) old.remove();
        var bw = document.createElement('div'); bw.className = 'notif-bell-wrap'; bw.style.position = 'relative';
        bw.innerHTML = '<button class="bell-btn" title="Notifications" onclick="toggleNotifBell()">'+svgIco('bell',18)+
          '<span id="notifBadge" class="hidden" style="position:absolute;top:1px;right:1px;background:var(--red);color:#fff;font-size:9px;line-height:1;border-radius:20px;padding:2px 4px;">0</span></button>'+
          '<div id="notifDropdown" class="search-results" style="width:320px;right:0;left:auto;"></div>';
        tb.appendChild(bw);
      }
    }
    var si = document.querySelector('.search-ico'); if(si) si.innerHTML = svgIco('search', 15);
    if(!document.getElementById('mobileNav')){
      var mn = document.createElement('div'); mn.id = 'mobileNav';
      [['dashboard','home','Home'],['tickets','tag','Tickets'],['board','columns','Board'],['crm','users','CRM']].forEach(function(x){
        mn.innerHTML += '<button class="mn-item" data-id="'+x[0]+'" onclick="goTo(\''+x[0]+'\')"><span class="mn-ico">'+svgIco(x[1],19)+'</span>'+x[2]+'</button>';
      });
      mn.innerHTML += '<button class="mn-item" onclick="openMobileDrawer()"><span class="mn-ico">'+svgIco('more',19)+'</span>More</button>';
      app.appendChild(mn);
    }
  }
}

ensureShell();

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
    {ticket_id:'WC-1042',title:'Dashboard Export Bug',description:'CSV export fails for boards over 500 rows.',type:'Bug',department:'Engineering',system:'Super Admin',parent_ticket_id:'',priority:'High',status:'In Progress',owner:'Chidi',reporter:'Oreoluwa',project_id:'p2',due_date:'2026-08-08',created_at:'2026-08-01T09:00:00Z',updated_at:'2026-08-04T10:20:00Z',source:'Manual',tags:'export,csv'},
    {ticket_id:'WC-1043',title:'Login button unresponsive on OTG',description:'Button does nothing on empty-field submit, no validation shown.',type:'Bug',department:'Engineering',system:'Mobile App',parent_ticket_id:'',priority:'Urgent',status:'Blocked',owner:'Chidi',reporter:'Tunde',project_id:'p1',due_date:'2026-08-07',created_at:'2026-08-02T09:00:00Z',updated_at:'2026-08-05T14:10:00Z',source:'UAT',source_ref:'tc2',tags:'gps'},
    {ticket_id:'WC-1044',title:'Questionnaire translation review',description:'Hausa translation needs a second pass.',type:'Task',department:'Operations',system:'PMD',parent_ticket_id:'WC-1049',priority:'Medium',status:'Waiting',owner:'Tunde',reporter:'Oreoluwa',project_id:'p1',due_date:'2026-08-10',created_at:'2026-08-03T09:00:00Z',updated_at:'2026-08-03T09:00:00Z',source:'Manual',tags:''},
    {ticket_id:'WC-1045',title:'August newsletter draft',description:'',type:'Growth',department:'Growth',system:'',parent_ticket_id:'',priority:'Medium',status:'Review',owner:'Sarah',reporter:'Sarah',project_id:'',due_date:'2026-08-06',created_at:'2026-08-01T09:00:00Z',updated_at:'2026-08-06T08:00:00Z',source:'Manual',tags:''},
    {ticket_id:'WC-1046',title:'Client proposal  -  FSD Africa follow-up',description:'',type:'Customer Request',department:'Growth',system:'',parent_ticket_id:'',priority:'High',status:'New',owner:'Sarah',reporter:'Oreoluwa',project_id:'',due_date:'2026-08-12',created_at:'2026-08-05T09:00:00Z',updated_at:'2026-08-05T09:00:00Z',source:'Manual',tags:''},
    {ticket_id:'WC-1047',title:'Deploy Delta build to staging',description:'',type:'Deployment',department:'Operations',system:'OTG',parent_ticket_id:'',priority:'Medium',status:'Approved',owner:'Tunde',reporter:'Chidi',project_id:'p2',due_date:'2026-08-06',created_at:'2026-08-04T09:00:00Z',updated_at:'2026-08-05T16:00:00Z',source:'Manual',tags:''},
    {ticket_id:'WC-1048',title:'Authentication module',description:'',type:'Feature',department:'Engineering',system:'Super Admin',parent_ticket_id:'',priority:'High',status:'In Progress',owner:'Chidi',reporter:'Oreoluwa',project_id:'p2',due_date:'2026-08-09',created_at:'2026-08-02T09:00:00Z',updated_at:'2026-08-05T11:00:00Z',source:'Manual',tags:''},
    {ticket_id:'WC-1049',title:'Q4 Field Ops Revamp',description:'Overall direction for modernizing field data capture this quarter.',type:'Direction',department:'Operations',system:'PMD',parent_ticket_id:'',priority:'High',status:'In Progress',owner:'Oreoluwa',reporter:'Oreoluwa',project_id:'',due_date:'',created_at:'2026-07-20T09:00:00Z',updated_at:'2026-08-01T09:00:00Z',source:'Manual',tags:''}
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
  notifications_log: [
    {log_id:'n1',timestamp:'2026-10-02T08:00:00Z',trigger_type:'uat_fail',ticket_id:'',recipient:CURRENT_USER,message:'A UAT test failed and was logged as a new Bug ticket: *Login button unresponsive on OTG* [Mobile App]',status:'sent'},
    {log_id:'n2',timestamp:'2026-10-01T15:30:00Z',trigger_type:'lead_followup',ticket_id:'',recipient:CURRENT_USER,message:'Lead *Amaka Obi* has been in "Follow Up" for 3 days with no update - time for a follow-up.',status:'sent'},
    {log_id:'n3',timestamp:'2026-09-30T09:10:00Z',trigger_type:'content_weekly_pool',ticket_id:'',recipient:CURRENT_USER,message:"This week's content pool is ready (6 ideas).",status:'sent'}
  ],
  templates: [
    {template_id:'t1',name:'Bug report checklist',title:'Bug report',description:'',type:'Bug',department:'Engineering',priority:'Medium',checklist_json:'[{"text":"Reproduce the issue","done":false},{"text":"Identify root cause","done":false},{"text":"Write fix","done":false},{"text":"Test fix","done":false}]'}
  ],
  oneOnOnes: [],
  testCases: [
    {test_id:'tc1',module:'Mobile App',flow:'Login',test_case:'Login with valid credentials',type:'Functional',priority:'High',steps:'Open app, enter valid email/password, tap Login',expected_result:'User lands on home dashboard',result:'Pass',actual_notes:'',tester:'Tunde',tested_at:'2026-09-28T10:00:00Z',linked_ticket_id:''},
    {test_id:'tc2',module:'Mobile App',flow:'Login',test_case:'Login button responds to tap',type:'Functional',priority:'High',steps:'Tap Login button with empty fields',expected_result:'Inline validation error shown',result:'Fail',actual_notes:'Button does nothing, no error shown',tester:'Tunde',tested_at:'2026-09-29T11:00:00Z',linked_ticket_id:'WC-1043'},
    {test_id:'tc3',module:'PMD',flow:'Data sync',test_case:'Offline records sync when back online',type:'Functional',priority:'Medium',steps:'Go offline, record data, reconnect',expected_result:'Records upload automatically',result:'',actual_notes:'',tester:'',tested_at:'',linked_ticket_id:''}
  ],
  leads: [
    {lead_id:'l1',name:'Amaka Obi',organization:'FSD Africa',position:'Program Lead',email:'amaka@fsdafrica.org',linkedin_url:'',offering:'M&E Platform',stage:'Follow Up',owner:'Sarah',source:'Outreach',created_at:'2026-09-10T09:00:00Z',updated_at:'2026-09-27T09:00:00Z',stage_history_json:'[{"stage":"Prospecting Pool","at":"2026-09-10T09:00:00Z"},{"stage":"Follow Up","at":"2026-09-27T09:00:00Z"}]',meeting_notes_json:'[]',follow_up_count:1,last_follow_up_at:'2026-09-27T09:00:00Z',next_follow_up_due:'',decline_category:'',competitor:'',demo_date:'',demo_meeting_booked:'',meeting_date:'',meeting_booked:''},
    {lead_id:'l2',name:'Biodun Fashola',organization:'Guinness Nigeria',position:'Insights Manager',email:'biodun@guinness.com',linkedin_url:'',offering:'Field Data Collection',stage:'Demo Session',owner:'Oreoluwa',source:'Referral',created_at:'2026-09-05T09:00:00Z',updated_at:'2026-09-20T09:00:00Z',stage_history_json:'[]',meeting_notes_json:'[]',follow_up_count:0,last_follow_up_at:'',next_follow_up_due:'',decline_category:'',competitor:'',demo_date:'',demo_meeting_booked:'',meeting_date:'',meeting_booked:''}
  ],
  contentCalendar: [
    {content_id:'c1',title:'5 signs your field data has a GPS problem',type:'Carousel',platform:'LinkedIn',stage:'Idea',owner:'',notes:'',scheduled_date:'',created_at:'2026-09-29T09:00:00Z',created_by:'AI (weekly content pool)',source:'AI (weekly pool)'},
    {content_id:'c2',title:'Behind the scenes: a WeCollect field day',type:'Video',platform:'Instagram',stage:'Drafting',owner:'Sarah',notes:'',scheduled_date:'',created_at:'2026-09-26T09:00:00Z',created_by:'Sarah',source:'Manual'}
  ],
  payroll: [
    {payroll_id:'pr1',team_member_name:'Chidi',email:'chidi@wecollect.co',month:'2026-09',bank_name:'GTBank',bank_code:'058',account_number:'0123456789',account_name:'Chidi Okafor',account_verified:'yes',salary_amount:450000,status:'Paid',reminder_sent_at:'',paid_at:'2026-09-28T09:00:00Z',payslip_doc_url:'',created_at:'2026-09-01T09:00:00Z'},
    {payroll_id:'pr2',team_member_name:'Sarah',email:'sarah@wecollect.co',month:'2026-09',bank_name:'Access Bank',bank_code:'044',account_number:'0987654321',account_name:'',account_verified:'no',salary_amount:400000,status:'Pending',reminder_sent_at:'',paid_at:'',payslip_doc_url:'',created_at:'2026-09-01T09:00:00Z'}
  ],
  financeEntries: [
    {entry_id:'f1',project_id:'p1',type:'Income',category:'Client payment',amount:2500000,currency:'NGN',description:'Guinness Study - milestone 1',invoice_url:'',entry_date:'2026-09-15',created_by:'Oreoluwa',created_at:'2026-09-15T09:00:00Z'},
    {entry_id:'f2',project_id:'',type:'Expense',category:'Software',amount:85000,currency:'NGN',description:'Monthly SaaS tools',invoice_url:'',entry_date:'2026-09-01',created_by:'Oreoluwa',created_at:'2026-09-01T09:00:00Z'}
  ],
  leave: []
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
      return {ok:true, explanation:'Local keyword match (connect Claude for real natural-language parsing).', results:results};
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

    // ── Engineering Board ──────────────────────────────────────────────
    case 'getEngineeringParents': {
      var parents = DB.tickets.filter(function(t){return (t.type==='Direction'||t.type==='Feature') && (!payload.system || t.system===payload.system);});
      return {ok:true, parents:parents};
    }
    case 'aiTriageTicket': {
      var text = (payload.description||'').toLowerCase();
      var sysGuess = ['mobile app','pmd','otg','super admin'].filter(function(s){return text.indexOf(s)>-1;})[0];
      return {ok:true, suggestion:{
        title: payload.description.length>60 ? payload.description.slice(0,57)+'...' : payload.description,
        type:'Bug', system: sysGuess ? sysGuess.replace(/\b\w/g,function(c){return c.toUpperCase();}) : '',
        priority:'Medium', parent_ticket_id:null,
        rationale:'Local mock triage (connect Claude for real classification).'
      }};
    }

    // ── UAT / QA Tracker ────────────────────────────────────────────────
    case 'createTestCase': {
      var tc = Object.assign({test_id:'tc'+Math.random(), result:'', actual_notes:'', tester:'', tested_at:'', linked_ticket_id:''}, payload);
      DB.testCases.push(tc);
      return {ok:true, testCase:tc};
    }
    case 'recordTestResult': {
      var tc2 = DB.testCases.filter(function(x){return x.test_id===payload.test_id;})[0];
      if(!tc2) return {ok:false, error:'Test case not found.'};
      tc2.result = payload.result; tc2.actual_notes = payload.actual_notes||''; tc2.tester = CURRENT_USER; tc2.tested_at = new Date().toISOString();
      if(payload.result==='Fail' && !tc2.linked_ticket_id){
        var bugRes = mockApi('createTicket', {title:'UAT Fail: '+(tc2.test_case||tc2.flow||tc2.module), description:'Expected: '+tc2.expected_result+'\n\nActual: '+(tc2.actual_notes||'(see UAT tracker)'), type:'Bug', system: tc2.module, priority:'High', source:'UAT', source_ref:tc2.test_id, reporter:CURRENT_USER});
        tc2.linked_ticket_id = bugRes.ticket.ticket_id;
      }
      return {ok:true, linked_ticket_id: tc2.linked_ticket_id};
    }

    // ── CRM Pipeline ────────────────────────────────────────────────────
    case 'createLead': {
      var lead = Object.assign({lead_id:'l'+Math.random(), created_at:new Date().toISOString(), updated_at:new Date().toISOString(), stage: payload.stage||'Prospecting Pool', stage_history_json:'[]', meeting_notes_json:'[]', follow_up_count:0, last_follow_up_at:'', next_follow_up_due:'', decline_category:'', competitor:'', demo_date:'', demo_meeting_booked:'', meeting_date:'', meeting_booked:''}, payload);
      DB.leads.push(lead);
      return {ok:true, lead:lead};
    }
    case 'updateLeadStage': {
      var lead2 = DB.leads.filter(function(x){return x.lead_id===payload.lead_id;})[0];
      if(!lead2) return {ok:false, error:'Lead not found.'};
      var hist = []; try{ hist = JSON.parse(lead2.stage_history_json||'[]'); }catch(e){}
      if(payload.stage && payload.stage!==lead2.stage) hist.push({stage:payload.stage, at:new Date().toISOString()});
      Object.keys(payload).forEach(function(k){ if(k!=='lead_id' && k!=='actor') lead2[k]=payload[k]; });
      lead2.stage_history_json = JSON.stringify(hist);
      lead2.updated_at = new Date().toISOString();
      return {ok:true, lead_id:payload.lead_id, stage:lead2.stage, stage_history:hist};
    }
    case 'testSlackDM': return {ok:true};
    case 'bookLeadDemo': {
      var lead3 = DB.leads.filter(function(x){return x.lead_id===payload.lead_id;})[0];
      if(!lead3) return {ok:false, error:'Lead not found.'};
      if(payload.kind==='discovery'){ lead3.meeting_date = payload.date||''; lead3.meeting_booked = 'yes'; } else { lead3.demo_date = payload.date||''; lead3.demo_meeting_booked = 'yes'; }
      return {ok:true, meeting:{meeting_id:'m'+Math.random(), title:'Demo: '+lead3.name}};
    }
    case 'reassignLead': {
      var lead4 = DB.leads.filter(function(x){return x.lead_id===payload.lead_id;})[0];
      if(!lead4) return {ok:false, error:'Lead not found.'};
      lead4.owner = payload.new_owner||'';
      return {ok:true};
    }
    case 'aiLeadHealthSummary': {
      var lead5 = DB.leads.filter(function(x){return x.lead_id===payload.lead_id;})[0];
      if(!lead5) return {ok:false, error:'Lead not found.'};
      return {ok:true, health:{summary:'(Mock) '+lead5.name+' is currently at "'+lead5.stage+'" - connect Claude for a real narrative summary.', risk_level:'Medium', suggested_next_action:'Follow up this week.'}};
    }

    // ── Content Calendar ────────────────────────────────────────────────
    case 'createContentItem': {
      var item = Object.assign({content_id:'c'+Math.random(), created_at:new Date().toISOString(), created_by:CURRENT_USER, source:'Manual', stage:'Idea'}, payload);
      DB.contentCalendar.push(item);
      return {ok:true, item:item};
    }
    case 'updateContentStage': {
      var ci = DB.contentCalendar.filter(function(x){return x.content_id===payload.content_id;})[0];
      if(!ci) return {ok:false, error:'Content item not found.'};
      Object.keys(payload).forEach(function(k){ if(k!=='content_id' && k!=='actor') ci[k]=payload[k]; });
      return {ok:true};
    }
    case 'runContentPoolNow': {
      var ideas = ['Field data QA checklist you can use today','Why offline-first matters for African field teams','Client spotlight: faster insights with WeCollect','3 GIS mistakes that cost survey teams weeks','Meet the team: a day in the life of a field agent'];
      var created2 = ideas.slice(0,3).map(function(title){ return mockApi('createContentItem', {title:title, type:'Post', platform:'LinkedIn', notes:'AI-suggested angle', source:'AI (weekly pool)', created_by:'AI (weekly content pool)'}).item; });
      return {ok:true, created:created2.length, items:created2};
    }

    // ── Payroll ─────────────────────────────────────────────────────────
    case 'listPaystackBanks': {
      return {ok:true, banks:[{name:'Access Bank',code:'044'},{name:'GTBank',code:'058'},{name:'Zenith Bank',code:'057'},{name:'UBA',code:'033'},{name:'First Bank',code:'011'}]};
    }
    case 'generateMonthlyPayrollBatch': {
      var already = {}; DB.payroll.filter(function(p){return p.month===payload.month;}).forEach(function(p){already[p.team_member_name]=true;});
      var createdEntries = [];
      DB.team.forEach(function(member){
        if(already[member.name]) return;
        var prior = DB.payroll.filter(function(p){return p.team_member_name===member.name;}).sort(function(a,b){return (b.month||'').localeCompare(a.month||'');})[0] || {};
        var entry = {payroll_id:'pr'+Math.random(), team_member_name:member.name, email:member.email, month:payload.month, bank_name:prior.bank_name||'', bank_code:prior.bank_code||'', account_number:prior.account_number||'', account_name:prior.account_name||'', account_verified:'no', salary_amount:prior.salary_amount||'', status:'Pending', reminder_sent_at:'', paid_at:'', payslip_doc_url:'', created_at:new Date().toISOString()};
        DB.payroll.push(entry); createdEntries.push(entry);
      });
      return {ok:true, created:createdEntries.length, entries:createdEntries};
    }
    case 'verifyPayrollAccount': {
      var pe = DB.payroll.filter(function(x){return x.payroll_id===payload.payroll_id;})[0];
      if(!pe) return {ok:false, error:'Payroll entry not found.'};
      pe.account_number = payload.account_number||pe.account_number; pe.bank_code = payload.bank_code||pe.bank_code;
      pe.account_name = pe.team_member_name; pe.account_verified = 'yes';
      return {ok:true, account_name:pe.account_name};
    }
    case 'updatePayrollEntry': {
      var pe2 = DB.payroll.filter(function(x){return x.payroll_id===payload.payroll_id;})[0];
      if(!pe2) return {ok:false, error:'Payroll entry not found.'};
      Object.keys(payload).forEach(function(k){ if(k!=='payroll_id' && k!=='actor') pe2[k]=payload[k]; });
      if(payload.hasOwnProperty('account_number')||payload.hasOwnProperty('bank_code')) pe2.account_verified='no';
      return {ok:true};
    }
    case 'markPayrollPaid': {
      var pe3 = DB.payroll.filter(function(x){return x.payroll_id===payload.payroll_id;})[0];
      if(!pe3) return {ok:false, error:'Payroll entry not found.'};
      pe3.status = 'Paid'; pe3.paid_at = new Date().toISOString();
      return {ok:true};
    }
    case 'exportPayrollCsv': {
      var entries = DB.payroll.filter(function(p){return p.month===payload.month && p.status!=='Paid';});
      if(!entries.length) return {ok:false, error:'No unpaid payroll entries found for '+payload.month+'.'};
      var unverified = entries.filter(function(e){return e.account_verified!=='yes';});
      if(unverified.length) return {ok:false, error:unverified.length+' entries not yet verified: '+unverified.map(function(e){return e.team_member_name;}).join(', ')};
      var header = ['account_number','bank_code','account_name','amount','narration'];
      var rows = entries.map(function(e){return [e.account_number,e.bank_code,e.account_name,e.salary_amount,'Salary - '+e.month].join(',');});
      return {ok:true, csv:[header.join(',')].concat(rows).join('\n'), count:entries.length};
    }

    // ── Notifications / Finance / Leave ─────────────────────────────────
    case 'getMyNotifications': {
      var mine = DB.notifications_log.filter(function(n){return n.recipient===CURRENT_USER;}).sort(function(a,b){return (b.timestamp||'').localeCompare(a.timestamp||'');});
      var grouped = {}; mine.forEach(function(n){ var k=n.trigger_type||'other'; (grouped[k]=grouped[k]||[]).push(n); });
      return {ok:true, notifications:mine.slice(0,50), grouped:grouped};
    }
    case 'createFinanceEntry': {
      var fe = Object.assign({entry_id:'f'+Math.random(), created_by:CURRENT_USER, created_at:new Date().toISOString()}, payload);
      DB.financeEntries.push(fe);
      return {ok:true, entry:fe};
    }
    case 'deleteFinanceEntry': {
      DB.financeEntries = DB.financeEntries.filter(function(x){return x.entry_id!==payload.entry_id;});
      return {ok:true, deleted:true};
    }
    case 'requestLeave': {
      var lv = {leave_id:'lv'+Math.random(), team_member_name:CURRENT_USER, type:payload.type||'Annual', start_date:payload.start_date, end_date:payload.end_date, reason:payload.reason||'', status:'Pending', approved_by:'', created_at:new Date().toISOString()};
      DB.leave.push(lv);
      return {ok:true, leave:lv};
    }
    case 'decideLeave': {
      var lv2 = DB.leave.filter(function(x){return x.leave_id===payload.leave_id;})[0];
      if(!lv2) return {ok:false, error:'Leave request not found.'};
      lv2.status = payload.status; lv2.approved_by = CURRENT_USER;
      return {ok:true};
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

function bpEsc(s){ return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
function bpState(key){
  if(!STATE.boards) STATE.boards = {};
  if(!STATE.boards[key]) STATE.boards[key] = {stage:'All', q:'', f:{}, view:'cards'};
  return STATE.boards[key];
}
function bpUniq(list){ return list.filter(function(v,i,a){ return v && a.indexOf(v)===i; }).sort(); }
function bpTeamNames(){ return DB.team.map(function(p){return p.name;}); }

var BP_CFGS = {
  crm: function(){
    return {
      title:'Outreach Pipeline', subtitle:'Prospects moving through the 9-stage funnel', accent:'#1F8A5B',
      newLabel:'+ New prospect', onNew:'openNewLead()', emptyMsg:'No prospects match these filters.',
      stages: CRM_STAGES.map(function(s){ return {id:s, color:CRM_STAGE_COLOR[s]}; }),
      items:function(){ return DB.leads; },
      stageOf:function(l){ return l.stage; },
      filters:[
        {key:'owner', all:'All reps', opts:function(){ return bpTeamNames(); }, get:function(l){ return l.owner; }},
        {key:'offering', all:'All offerings', opts:function(){ return bpUniq(DB.leads.map(function(l){return l.offering;})); }, get:function(l){ return l.offering; }}
      ],
      search:function(l){ return [l.name,l.organization,l.position,l.email,l.offering,l.owner].join(' '); },
      desc:function(l){
        var idx = CRM_STAGES.indexOf(l.stage), notes = []; try{ notes = JSON.parse(l.meeting_notes_json||'[]'); }catch(e){}
        var chips = [];
        if(l.meeting_date) chips.push({t:'Discovery · '+fmtDate(l.meeting_date), c:'#3B6FD4'});
        if(l.demo_date) chips.push({t:'Demo · '+fmtDate(l.demo_date), c:'#7C5CBF'});
        if(notes.length) chips.push({t:notes.length+' note'+(notes.length>1?'s':'')});
        if(l.stage==='Declined / Cold Leads' && l.decline_category) chips.push({t:l.decline_category, c:'#D64545'});
        return {
          id:'', stageLabel:l.stage, color:CRM_STAGE_COLOR[l.stage]||'#8E90A3',
          title:l.name, sub:[l.organization,l.position].filter(Boolean).join(' · '), tag:l.offering,
          progress:{n:idx+1, total:CRM_STAGES.length, color:CRM_STAGE_COLOR[l.stage]||'#8E90A3'},
          chips:chips, owner:l.owner, date:fmtDate(l.updated_at), open:"openLeadDetail('"+l.lead_id+"')"
        };
      },
      cols:[
        {h:'Name', v:function(l){return bpEsc(l.name);}}, {h:'Organization', v:function(l){return bpEsc(l.organization||'-');}},
        {h:'Offering', v:function(l){return bpEsc(l.offering||'-');}}, {h:'Stage', stage:true},
        {h:'Owner', v:function(l){return bpEsc(l.owner||'-');}}, {h:'Updated', v:function(l){return fmtDate(l.updated_at);}}
      ],
      stats:function(items){ return [
        {n:items.length,l:'Total prospects'},
        {n:items.filter(function(l){return l.stage==='Demo Session';}).length,l:'In demo',cls:'accent-violet'},
        {n:items.filter(function(l){return l.stage==='Onboarding';}).length,l:'Onboarding',cls:'accent-green'},
        {n:items.filter(function(l){return l.stage==='Declined / Cold Leads';}).length,l:'Declined',cls:'accent-red'}
      ]; }
    };
  },
  eng: function(){
    var cols = STATUS_FLOW.concat(['Blocked']);
    return {
      title:'Engineering Board', subtitle:'Directions → Features → Tasks & Bugs, tied to Mobile App, PMD, OTG and Super Admin', accent:'#4C50E3',
      newLabel:'+ New ticket', onNew:'openNewTicket()', emptyMsg:'No tickets match these filters.',
      stages: cols.map(function(s){ return {id:s, color:STATUS_COLOR[s]}; }),
      items:function(){ return engineeringTickets(); },
      stageOf:function(t){ return t.status; },
      filters:[
        {key:'system', all:'All systems', opts:function(){ return ENGINEERING_SYSTEMS; }, get:function(t){ return t.system; }},
        {key:'type', all:'All types', opts:function(){ return ENGINEERING_TYPES; }, get:function(t){ return t.type; }},
        {key:'owner', all:'All owners', opts:function(){ return bpTeamNames(); }, get:function(t){ return t.owner; }}
      ],
      search:function(t){ return [t.ticket_id,t.title,t.description,t.system,t.type,t.owner].join(' '); },
      desc:function(t){
        var cl = parseChecklist(t), parent = t.parent_ticket_id ? DB.tickets.filter(function(p){return p.ticket_id===t.parent_ticket_id;})[0] : null;
        var chips = [{t:t.type, c:'#4C50E3'},{t:t.priority, c:({Low:'#2E9B5F',Medium:'#946A0C',High:'#D9822E',Urgent:'#D64545'})[t.priority]}];
        if(cl.length) chips.push({t:cl.filter(function(c){return c.done;}).length+'/'+cl.length+' checklist'});
        return {
          id:t.ticket_id, stageLabel:t.status, color:STATUS_COLOR[t.status]||'#8E90A3',
          title:t.title, sub:parent ? '↳ '+parent.title : '', tag:t.system || t.department,
          progress:{n:Math.max(0, STATUS_FLOW.indexOf(t.status)+1), total:STATUS_FLOW.length, color:STATUS_COLOR[t.status]||'#8E90A3'},
          chips:chips, owner:t.owner, date:t.due_date ? 'Due '+fmtDate(t.due_date) : '', open:"openTicketDetail('"+t.ticket_id+"')"
        };
      },
      cols:[
        {h:'ID', v:function(t){return '<span class="mono">'+bpEsc(t.ticket_id)+'</span>';}}, {h:'Type', v:function(t){return bpEsc(t.type);}},
        {h:'System', v:function(t){return bpEsc(t.system||'-');}}, {h:'Title', v:function(t){return bpEsc(t.title);}}, {h:'Stage', stage:true},
        {h:'Priority', v:function(t){return '<span class="pill pill-prio-'+t.priority+'">'+bpEsc(t.priority)+'</span>';}},
        {h:'Owner', v:function(t){return bpEsc(t.owner||'-');}}, {h:'Due', v:function(t){return fmtDate(t.due_date);}}
      ],
      stats:function(items){ return [
        {n:items.length,l:'Matching tickets'},
        {n:items.filter(function(t){return t.status==='Blocked';}).length,l:'Blocked',cls:'accent-red'},
        {n:items.filter(function(t){return t.status==='Done';}).length,l:'Done',cls:'accent-green'},
        {n:items.filter(function(t){return t.type==='Bug';}).length,l:'Bugs',cls:'accent-amber'}
      ]; },
      extraBars:[
        {title:'By type', keys:ENGINEERING_TYPES, fn:function(t){return t.type;}},
        {title:'By system', keys:ENGINEERING_SYSTEMS, fn:function(t){return t.system;}}
      ]
    };
  },
  uat: function(){
    var lanes = ['Not Run','Pass','Fail','Blocked'], colors = {'Not Run':'#8E90A3',Pass:'#2E9B5F',Fail:'#D64545',Blocked:'#946A0C'};
    return {
      title:'UAT / QA Tracker', subtitle:'A Fail automatically opens a Bug on the Engineering Board', accent:'#4C50E3',
      newLabel:'+ New test case', onNew:'openNewTestCase()', emptyMsg:'No test cases match these filters.',
      stages: lanes.map(function(s){ return {id:s, color:colors[s]}; }),
      items:function(){ return DB.testCases; },
      stageOf:function(tc){ return resultLabel(tc.result); },
      filters:[
        {key:'module', all:'All systems', opts:function(){ return ENGINEERING_SYSTEMS; }, get:function(tc){ return tc.module; }},
        {key:'priority', all:'All priorities', opts:function(){ return ['Low','Medium','High','Critical']; }, get:function(tc){ return tc.priority; }}
      ],
      search:function(tc){ return [tc.module,tc.flow,tc.test_case,tc.steps,tc.tester].join(' '); },
      desc:function(tc){
        var r = resultLabel(tc.result);
        return {
          id:tc.test_id, stageLabel:r, color:colors[r], title:tc.test_case||tc.flow, sub:tc.flow||'', tag:tc.module,
          progress:null, chips:[{t:tc.priority, c:({Low:'#2E9B5F',Medium:'#946A0C',High:'#D9822E',Critical:'#D64545'})[tc.priority]}].concat(tc.linked_ticket_id?[{t:'Bug '+tc.linked_ticket_id, c:'#D64545'}]:[]),
          owner:tc.tester, date:tc.tested_at ? fmtDate(tc.tested_at) : '', open:"openTestCaseDetail('"+tc.test_id+"')"
        };
      },
      cols:[
        {h:'System', v:function(tc){return bpEsc(tc.module);}}, {h:'Flow', v:function(tc){return bpEsc(tc.flow||'-');}},
        {h:'Test case', v:function(tc){return bpEsc(tc.test_case||'-');}}, {h:'Result', stage:true},
        {h:'Priority', v:function(tc){return bpEsc(tc.priority||'-');}}, {h:'Linked bug', v:function(tc){return '<span class="mono">'+bpEsc(tc.linked_ticket_id||'-')+'</span>';}}
      ],
      stats:function(items){
        var pass = items.filter(function(tc){return tc.result==='Pass';}).length;
        return [
          {n:items.length,l:'Test cases'},
          {n:Math.round(pass/(items.length||1)*100)+'%',l:'Pass rate',cls:'accent-green'},
          {n:items.filter(function(tc){return tc.result==='Fail';}).length,l:'Failing',cls:'accent-red'},
          {n:items.filter(function(tc){return !tc.result;}).length,l:'Not run'}
        ];
      },
      extraBars:[{title:'By system', keys:ENGINEERING_SYSTEMS, fn:function(tc){return tc.module;}}]
    };
  },
  content: function(){
    return {
      title:'Content Calendar', subtitle:'Claude proposes a fresh pool every Friday morning', accent:'#4C50E3',
      newLabel:'+ New item', onNew:'openNewContent()', emptyMsg:'Nothing here yet.',
      extraButtons: CURRENT_USER_ROLE==='Admin' ? '<button class="btn btn-ghost" onclick="runContentPoolNowClick()">Run weekly pool now</button>' : '',
      stages: CONTENT_STAGES.map(function(s){ return {id:s, color:CONTENT_STAGE_COLOR[s]}; }),
      items:function(){ return DB.contentCalendar; },
      stageOf:function(c){ return c.stage; },
      filters:[
        {key:'platform', all:'All platforms', opts:function(){ return ['LinkedIn','Instagram','Twitter/X','Blog','Newsletter']; }, get:function(c){ return c.platform; }},
        {key:'owner', all:'All owners', opts:function(){ return bpTeamNames(); }, get:function(c){ return c.owner; }}
      ],
      search:function(c){ return [c.title,c.type,c.platform,c.owner,c.notes].join(' '); },
      desc:function(c){
        return {
          id:'', stageLabel:c.stage, color:CONTENT_STAGE_COLOR[c.stage]||'#8E90A3', title:c.title, sub:c.type||'', tag:c.platform,
          progress:{n:CONTENT_STAGES.indexOf(c.stage)+1, total:CONTENT_STAGES.length, color:CONTENT_STAGE_COLOR[c.stage]||'#8E90A3'},
          chips:(c.source && c.source.indexOf('AI')===0) ? [{t:'AI idea', c:'#7C5CBF'}] : [],
          owner:c.owner, date:c.scheduled_date ? 'Posts '+fmtDate(c.scheduled_date) : fmtDate(c.created_at), open:"openContentDetail('"+c.content_id+"')"
        };
      },
      cols:[
        {h:'Title', v:function(c){return bpEsc(c.title);}}, {h:'Type', v:function(c){return bpEsc(c.type||'-');}},
        {h:'Platform', v:function(c){return bpEsc(c.platform||'-');}}, {h:'Stage', stage:true},
        {h:'Owner', v:function(c){return bpEsc(c.owner||'-');}}, {h:'Scheduled', v:function(c){return fmtDate(c.scheduled_date);}}
      ],
      stats:function(items){ return [
        {n:items.length,l:'Total items'},
        {n:items.filter(function(c){return c.stage==='Idea';}).length,l:'Ideas'},
        {n:items.filter(function(c){return c.stage==='Scheduled';}).length,l:'Scheduled',cls:'accent-violet'},
        {n:items.filter(function(c){return c.stage==='Published';}).length,l:'Published',cls:'accent-green'}
      ]; }
    };
  }
};

function bpFiltered(key, ignoreStage){
  var cfg = BP_CFGS[key](), st = bpState(key), q = (st.q||'').toLowerCase();
  return cfg.items().filter(function(it){
    if(q && cfg.search(it).toLowerCase().indexOf(q)<0) return false;
    for(var i=0;i<cfg.filters.length;i++){
      var f = cfg.filters[i], v = st.f[f.key];
      if(v && String(f.get(it)||'')!==v) return false;
    }
    if(!ignoreStage && st.stage!=='All' && cfg.stageOf(it)!==st.stage) return false;
    return true;
  });
}

function bpCardHtml(cfg, it){
  var d = cfg.desc(it), segs = '', chips = '';
  if(d.progress){
    for(var i=0;i<d.progress.total;i++) segs += '<span class="bp-seg"'+(i<d.progress.n?' style="background:'+d.progress.color+'"':'')+'></span>';
  }
  (d.chips||[]).forEach(function(c){
    if(!c || !c.t) return;
    chips += '<span class="bp-chip"'+(c.c?' style="background:'+c.c+'1f;color:'+c.c+'"':'')+'>'+bpEsc(c.t)+'</span>';
  });
  return '<div class="bp-card" onclick="'+d.open+'">'+
    '<div class="bp-card-top"><span class="bp-stage" style="background:'+d.color+'1f;color:'+d.color+'">'+bpEsc(d.stageLabel)+'</span>'+(d.id?'<span class="bp-id">'+bpEsc(d.id)+'</span>':'')+'</div>'+
    '<div class="bp-card-title">'+bpEsc(d.title)+'</div>'+
    (d.sub?'<div class="bp-card-sub">'+bpEsc(d.sub)+'</div>':'')+
    (d.tag?'<div><span class="bp-chip tag">'+bpEsc(d.tag)+'</span></div>':'')+
    (segs?'<div class="bp-prog">'+segs+'</div>':'')+
    (chips?'<div class="bp-chips">'+chips+'</div>':'')+
    '<div class="bp-card-foot"><span class="bp-owner"><span class="owner-chip">'+bpEsc(initials(d.owner))+'</span>'+bpEsc(d.owner||'Unassigned')+'</span><span>'+bpEsc(d.date||'')+'</span></div>'+
  '</div>';
}

function bpRefresh(key){
  var cfg = BP_CFGS[key](), st = bpState(key);
  var tabsEl = document.getElementById('bp_tabs'), viewEl = document.getElementById('bp_view'), bodyEl = document.getElementById('bp_body');
  if(!tabsEl || !bodyEl) return;
  var counted = bpFiltered(key, true), items = bpFiltered(key, false);

  var tabs = '<button class="bp-tab'+(st.stage==='All'?' active':'')+'" onclick="bpTab(\''+key+'\',-1)">All<span class="n">'+counted.length+'</span></button>';
  cfg.stages.forEach(function(s, i){
    var n = counted.filter(function(it){ return cfg.stageOf(it)===s.id; }).length;
    tabs += '<button class="bp-tab'+(st.stage===s.id?' active':'')+'" onclick="bpTab(\''+key+'\','+i+')">'+bpEsc(s.id)+'<span class="n">'+n+'</span></button>';
  });
  tabsEl.innerHTML = tabs;

  viewEl.innerHTML = ['cards','list','summary'].map(function(v){
    return '<button class="view-toggle-btn'+(st.view===v?' active':'')+'" onclick="bpView(\''+key+'\',\''+v+'\')">'+v.charAt(0).toUpperCase()+v.slice(1)+'</button>';
  }).join('');

  if(st.view==='cards'){
    bodyEl.innerHTML = items.length ? '<div class="bp-grid">'+items.map(function(it){ return bpCardHtml(cfg, it); }).join('')+'</div>' : '<div class="empty">'+cfg.emptyMsg+'</div>';
  } else if(st.view==='list'){
    var colorOf = {}; cfg.stages.forEach(function(s){ colorOf[s.id]=s.color; });
    bodyEl.innerHTML = '<div class="card table-scroll"><table><tr>'+cfg.cols.map(function(c){return '<th>'+c.h+'</th>';}).join('')+'</tr>'+
      (items.map(function(it){
        var d = cfg.desc(it);
        return '<tr onclick="'+d.open+'" style="cursor:pointer;">'+cfg.cols.map(function(c){
          return '<td>'+(c.stage ? '<span class="pill" style="background:'+d.color+'22;color:'+d.color+';">'+bpEsc(d.stageLabel)+'</span>' : c.v(it))+'</td>';
        }).join('')+'</tr>';
      }).join('') || '<tr><td colspan="'+cfg.cols.length+'" class="empty">'+cfg.emptyMsg+'</td></tr>')+'</table></div>';
  } else {
    var total = items.length || 1;
    function bars(title, keys, fn, colorFn){
      return '<div class="card"><div class="card-h">'+title+'</div><div class="summary-bars">'+keys.map(function(k){
        var n = items.filter(function(it){ return fn(it)===k; }).length;
        return '<div class="summary-bar-row"><span class="summary-bar-label">'+bpEsc(k)+'</span><div class="summary-bar-track"><div class="summary-bar-fill" style="width:'+Math.round(n/total*100)+'%;background:'+colorFn(k)+';"></div></div><span class="summary-bar-pct">'+n+'</span></div>';
      }).join('')+'</div></div>';
    }
    var colors = {}; cfg.stages.forEach(function(s){ colors[s.id]=s.color; });
    var html = '<div class="stat-grid" style="margin-bottom:16px;">'+cfg.stats(items).map(function(s){
      return '<div class="stat-card '+(s.cls||'')+'"><div class="stat-num">'+s.n+'</div><div class="stat-lbl">'+s.l+'</div></div>';
    }).join('')+'</div>';
    html += '<div class="dash-grid">'+bars('By stage', cfg.stages.map(function(s){return s.id;}), cfg.stageOf, function(k){return colors[k];});
    (cfg.extraBars||[]).forEach(function(b){ html += bars(b.title, b.keys, b.fn, function(){return 'var(--violet)';}); });
    bodyEl.innerHTML = html+'</div>';
  }
}

function bpTab(key, idx){ var cfg = BP_CFGS[key](); bpState(key).stage = idx<0 ? 'All' : cfg.stages[idx].id; bpRefresh(key); }
function bpView(key, v){ bpState(key).view = v; bpRefresh(key); }
function bpSearch(key, v){ bpState(key).q = v; bpRefresh(key); }
function bpFilter(key, f, v){ bpState(key).f[f] = v; bpRefresh(key); }

function renderBoardPage(key){
  var cfg = BP_CFGS[key](), st = bpState(key);
  var wrap = el('<div class="bp" style="--bp-accent:'+cfg.accent+';"></div>');
  var selects = cfg.filters.map(function(f){
    return '<select class="bp-sel" onchange="bpFilter(\''+key+'\',\''+f.key+'\',this.value)"><option value="">'+f.all+'</option>'+
      f.opts().map(function(o){ return '<option'+(st.f[f.key]===o?' selected':'')+'>'+bpEsc(o)+'</option>'; }).join('')+'</select>';
  }).join('');
  wrap.innerHTML =
    '<div class="bp-head"><div><div class="bp-title">'+cfg.title+'</div><div class="bp-sub">'+cfg.subtitle+'</div></div>'+
      '<div class="bp-head-actions">'+(cfg.extraButtons||'')+'<button class="bp-btn" onclick="'+cfg.onNew+'">'+cfg.newLabel+'</button></div></div>'+
    '<div class="bp-tabs" id="bp_tabs"></div>'+
    '<div class="bp-bar"><div class="bp-search">'+svgIco('search',15)+'<input placeholder="Search…" value="'+bpEsc(st.q)+'" oninput="bpSearch(\''+key+'\',this.value)"></div>'+selects+
      '<div class="view-toggle" id="bp_view"></div></div>'+
    '<div id="bp_body"></div>';
  setTimeout(function(){ bpRefresh(key); }, 0);
  return wrap;
}
function renderBoard(){ return renderBoardPage('eng'); }
function renderUat(){ return renderBoardPage('uat'); }
function renderCrm(){ return renderBoardPage('crm'); }
function renderContent(){ return renderBoardPage('content'); }

var MODULES = [
  {group:'', items:[{id:'dashboard',label:'Dashboard'}]},
  {group:'Work', items:[
    {id:'tickets',label:'Ticket System'},
    {id:'board',label:'Engineering Board'},
    {id:'uat',label:'UAT / QA Tracker'},
    {id:'calendar',label:'Calendar'},
    {id:'projects',label:'Projects'},
    {id:'filemanager',label:'Files'}
  ]},
  {group:'Growth', items:[
    {id:'crm',label:'CRM Pipeline'},
    {id:'content',label:'Content Calendar'}
  ]},
  {group:'Finance & People', items:[
    {id:'payroll',label:'Payroll',adminOnly:true},
    {id:'finance',label:'Finance',adminOnly:true},
    {id:'leave',label:'Leave'}
  ]},
  {group:'Training', items:[
    {id:'training',label:'My Training'},
    {id:'trainingadmin',label:'Training Admin'}
  ]},
  {group:'Team', items:[
    {id:'meetings',label:'Meetings'},
    {id:'standup',label:'Stand-up Mode'},
    {id:'oneonones',label:'One-on-Ones'},
    {id:'feed',label:'Activity Feed'},
    {id:'workload',label:'Workload'},
    {id:'teamspaces',label:'Team Spaces'}
  ]},
  {group:'Intelligence', items:[
    {id:'command',label:'AI Command Center'},
    {id:'newsdigest',label:'Industry News'},
    {id:'decisions',label:'Decision Register'},
    {id:'adminlog',label:'Admin Activity Log'},
    {id:'notifications',label:'Notifications'}
  ]}
];

function renderNav(){
  var html = '';
  MODULES.forEach(function(g){
    if(g.group) html += '<div class="nav-label">'+g.group+'</div>';
    g.items.forEach(function(m){
      if((m.id==='oneonones' || m.id==='newsdigest' || m.id==='trainingadmin' || m.adminOnly) && CURRENT_USER_ROLE!=='Admin') return;
      var active = STATE.module===m.id ? ' active' : '';
      html += '<div class="nav-item'+active+'" onclick="goTo(\''+m.id+'\')"><span class="nav-ico">'+svgIco(NAV_ICON[m.id])+'</span><span class="nav-label-text">'+m.label+'</span></div>';
    });
  });
  document.getElementById('navList').innerHTML = html;
  var mobileIds = ['dashboard','board','crm','payroll'];
  document.querySelectorAll('#mobileNav .mn-item[data-id]').forEach(function(btn){
    btn.classList.toggle('active', btn.getAttribute('data-id')===STATE.module);
  });
}

function goTo(id){
  STATE.module = id;
  renderNav();
  var titles = {}; MODULES.forEach(function(g){g.items.forEach(function(m){titles[m.id]=m.label;});});
  document.getElementById('pageTitle').textContent = titles[id];
  closeMobileDrawer();
  render();
}

// ── Collapsible sidebar (desktop) + mobile drawer/bottom-nav ───────────
function toggleSidebarCollapse(){
  var sb = document.getElementById('sidebar');
  var collapsed = sb.classList.toggle('collapsed');
  try { localStorage.setItem('wecollect_sidebar_collapsed', collapsed ? '1' : '0'); } catch(e){}
}
function restoreSidebarCollapse(){
  var pref = '0';
  try { pref = localStorage.getItem('wecollect_sidebar_collapsed') || '0'; } catch(e){}
  if(pref==='1') document.getElementById('sidebar').classList.add('collapsed');
}
function openMobileDrawer(){
  document.getElementById('sidebar').classList.add('mobile-open');
  document.getElementById('mobileNavBackdrop').classList.add('open');
}
function closeMobileDrawer(){
  var sb = document.getElementById('sidebar');
  if(sb) sb.classList.remove('mobile-open');
  var bd = document.getElementById('mobileNavBackdrop');
  if(bd) bd.classList.remove('open');
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
    adminlog: renderAdminLog, notifications: renderNotifications, oneonones: renderOneOnOnes, newsdigest: renderNewsDigest,
    training: renderTraining, trainingadmin: renderTrainingAdmin, filemanager: renderFileManager,
    uat: renderUat, crm: renderCrm, content: renderContent, payroll: renderPayroll, finance: renderFinance, leave: renderLeave
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

var ENGINEERING_SYSTEMS = ['Mobile App','PMD','OTG','Super Admin'];
var ENGINEERING_TYPES = ['Direction','Feature','Task','Bug'];

function engineeringTickets(){
  return visibleTickets().filter(function(t){ return ENGINEERING_TYPES.indexOf(t.type)>-1; });
}

function engFilteredTickets(){
  if(!STATE.eng) STATE.eng = {system:'All', type:'All', view:'cards'};
  return engineeringTickets().filter(function(t){
    if(STATE.eng.system!=='All' && t.system!==STATE.eng.system) return false;
    if(STATE.eng.type!=='All' && t.type!==STATE.eng.type) return false;
    return true;
  });
}

function setEngFilter(kind, val){ STATE.eng[kind] = val; render(); }
function setEngView(view){ STATE.eng.view = view; render(); }


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
  var parent = t.parent_ticket_id ? DB.tickets.filter(function(p){return p.ticket_id===t.parent_ticket_id;})[0] : null;
  return `<div class="ticket" onclick="openTicketDetail('${t.ticket_id}')">
    <div class="ticket-top"><span class="ticket-id">${t.ticket_id}</span><span class="ticket-type">${typeIcon(t.type)}</span>${checklistBadge}</div>
    <div class="ticket-title">${t.title}</div>
    ${parent ? `<div class="thin-tag" style="margin-bottom:6px;">↳ ${parent.title}</div>` : ''}
    ${checklistItemsHtml}
    <div class="ticket-meta">
      ${t.system ? `<span class="pill" style="background:var(--violet-bg);color:var(--violet);">${t.system}</span>` : `<span class="pill pill-dept">${t.department}</span>`}
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

// ── UAT / QA Tracker ─────────────────────────────────────────────────────
var RESULT_COLOR = {Pass:'#2E9B5F', Fail:'#D64545', Blocked:'#946A0C', '':'#8E90A3'};
function resultLabel(r){ return r || 'Not Run'; }

function uatFilteredCases(){
  if(!STATE.uat) STATE.uat = {module:'All', view:'cards'};
  return DB.testCases.filter(function(tc){ return STATE.uat.module==='All' || tc.module===STATE.uat.module; });
}
function setUatFilter(val){ STATE.uat.module = val; render(); }
function setUatView(v){ STATE.uat.view = v; render(); }

function uatCardHtml(tc){
  return `<div class="ticket" onclick="openTestCaseDetail('${tc.test_id}')">
    <div class="ticket-top"><span class="ticket-id">${tc.module}</span></div>
    <div class="ticket-title">${tc.test_case||tc.flow}</div>
    <div class="thin-tag" style="margin-bottom:6px;">${tc.flow||''}</div>
    <div class="ticket-meta">
      <span class="pill" style="background:${RESULT_COLOR[tc.result||'']}22;color:${RESULT_COLOR[tc.result||'']};">${resultLabel(tc.result)}</span>
      <span class="pill pill-prio-${tc.priority}">${tc.priority}</span>
      ${tc.linked_ticket_id ? `<span class="thin-tag mono" style="margin-left:auto;">${tc.linked_ticket_id}</span>` : ''}
    </div>
  </div>`;
}


function openNewTestCase(){
  ['tcf_flow','tcf_case','tcf_steps','tcf_expected'].forEach(function(id){ document.getElementById(id).value=''; });
  openModal('newTestCaseModalBg');
}
function saveNewTestCase(){
  var payload = {
    module: document.getElementById('tcf_module').value,
    type: document.getElementById('tcf_type').value,
    flow: document.getElementById('tcf_flow').value,
    test_case: document.getElementById('tcf_case').value,
    steps: document.getElementById('tcf_steps').value,
    expected_result: document.getElementById('tcf_expected').value,
    priority: document.getElementById('tcf_priority').value
  };
  api('createTestCase', payload).then(function(res){
    if(!res.ok){ alert('Could not add test case: '+(res.error||'Unknown error')); return; }
    if(WORKSPACE_MODE && res.testCase) DB.testCases.push(res.testCase);
    closeModal('newTestCaseModalBg');
    render();
  });
}

function openTestCaseDetail(id){
  var tc = DB.testCases.filter(function(x){return x.test_id===id;})[0];
  if(!tc) return;
  var body = document.getElementById('uatDetailModalBody');
  body.innerHTML = `
    <div class="modal-h"><h2>${tc.test_case||tc.flow}</h2><button class="close-x" onclick="closeModal('uatDetailModalBg')">X</button></div>
    <div class="thin-tag" style="margin-bottom:10px;">${tc.module} · ${tc.flow||''}</div>
    <div class="field"><label>Steps</label><div class="card" style="font-size:12.5px;">${(tc.steps||'-').replace(/\n/g,'<br>')}</div></div>
    <div class="field"><label>Expected Result</label><div class="card" style="font-size:12.5px;">${tc.expected_result||'-'}</div></div>
    <div class="field"><label>Result</label>
      <div class="stage-btn-row">${['Pass','Fail','Blocked'].map(function(r){
        return `<button class="stage-btn ${tc.result===r?'current':''}" onclick="saveTestResult('${id}','${r}')">${r}</button>`;
      }).join('')}</div>
    </div>
    <div class="field"><label>Notes on actual result</label><textarea id="uat_notes">${tc.actual_notes||''}</textarea></div>
    <div class="thin-tag">Notes are saved together with whichever result button above you click.</div>
    ${tc.linked_ticket_id ? `<div class="thin-tag" style="margin-top:10px;">Linked Bug ticket: <a href="javascript:void(0)" onclick="closeModal('uatDetailModalBg');openTicketDetail('${tc.linked_ticket_id}')" class="mono">${tc.linked_ticket_id}</a></div>` : ''}
  `;
  openModal('uatDetailModalBg');
}

function saveTestResult(id, result){
  var notesBox = document.getElementById('uat_notes');
  var notes = notesBox ? notesBox.value : '';
  api('recordTestResult', {test_id:id, result:result, actual_notes:notes}).then(function(res){
    if(!res.ok){ alert('Could not save result: '+(res.error||'Unknown error')); return; }
    if(WORKSPACE_MODE){
      var tc = DB.testCases.filter(function(x){return x.test_id===id;})[0];
      if(tc){ tc.result = result; tc.actual_notes = notes; if(res.linked_ticket_id) tc.linked_ticket_id = res.linked_ticket_id; }
    }
    render();
    openTestCaseDetail(id);
  });
}

// ── CRM Pipeline ─────────────────────────────────────────────────────────
var CRM_STAGES = ['Prospecting Pool','Requested More Info','Agreed to Meeting','Intro Call','Follow Up','Demo Session','Follow up & Feedback','Onboarding','Declined / Cold Leads'];
var CRM_STAGE_COLOR = {'Prospecting Pool':'#8E90A3','Requested More Info':'#3B6FD4','Agreed to Meeting':'#3B6FD4','Intro Call':'#3B6FD4','Follow Up':'#D9A62E','Demo Session':'#7C5CBF','Follow up & Feedback':'#7C5CBF','Onboarding':'#2E9B5F','Declined / Cold Leads':'#D64545'};

function crmFilteredLeads(){
  if(!STATE.crm) STATE.crm = {offering:'All', view:'cards'};
  return DB.leads.filter(function(l){ return STATE.crm.offering==='All' || l.offering===STATE.crm.offering; });
}
function setCrmFilter(val){ STATE.crm.offering = val; render(); }
function setCrmView(v){ STATE.crm.view = v; render(); }

function leadCardHtml(l){
  return `<div class="ticket" onclick="openLeadDetail('${l.lead_id}')">
    <div class="ticket-top"><span class="ticket-id">${l.organization||''}</span></div>
    <div class="ticket-title">${l.name}</div>
    <div class="thin-tag" style="margin-bottom:6px;">${l.offering||''}</div>
    <div class="ticket-meta">
      <span class="owner-chip" title="${l.owner}">${initials(l.owner)}</span>
    </div>
  </div>`;
}


function openNewLead(){
  ['lf_name','lf_org','lf_position','lf_email','lf_linkedin','lf_offering','lf_source'].forEach(function(id){ document.getElementById(id).value=''; });
  var ownerSel = document.getElementById('lf_owner');
  ownerSel.innerHTML = '<option value="">Unassigned</option>' + DB.team.map(function(p){return `<option value="${p.name}">${p.name}</option>`;}).join('');
  openModal('newLeadModalBg');
}
function saveNewLead(){
  var payload = {
    name: document.getElementById('lf_name').value,
    organization: document.getElementById('lf_org').value,
    position: document.getElementById('lf_position').value,
    email: document.getElementById('lf_email').value,
    linkedin_url: document.getElementById('lf_linkedin').value,
    offering: document.getElementById('lf_offering').value,
    owner: document.getElementById('lf_owner').value,
    source: document.getElementById('lf_source').value || 'Manual'
  };
  api('createLead', payload).then(function(res){
    if(!res.ok){ alert('Could not create lead: '+(res.error||'Unknown error')); return; }
    if(WORKSPACE_MODE && res.lead) DB.leads.push(res.lead);
    closeModal('newLeadModalBg');
    render();
  });
}

function openLeadDetail(id){
  var l = DB.leads.filter(function(x){return x.lead_id===id;})[0];
  if(!l) return;
  var showDemo = l.stage==='Demo Session' && l.demo_meeting_booked!=='yes';
  var showDecline = l.stage==='Declined / Cold Leads';
  var showDisc = (l.stage==='Agreed to Meeting' || l.stage==='Intro Call') && l.meeting_booked!=='yes';
  var notes = []; try{ notes = JSON.parse(l.meeting_notes_json||'[]'); }catch(e){}
  var body = document.getElementById('leadDetailModalBody');
  body.innerHTML = `
    <div class="modal-h"><h2>${l.name}</h2><button class="close-x" onclick="closeModal('leadDetailModalBg')">X</button></div>
    <div class="thin-tag" style="margin-bottom:10px;">${l.organization||''} ${l.position?'· '+l.position:''}</div>
    <div class="row2">
      <div class="field"><label>Owner</label>
        <select id="ld_owner" onchange="reassignLead('${id}', this.value)">
          ${DB.team.map(function(p){return `<option ${p.name===l.owner?'selected':''}>${p.name}</option>`;}).join('')}
        </select>
      </div>
      <div class="field"><label>Offering</label><input value="${l.offering||''}" disabled></div>
    </div>
    <div class="field"><label>Stage</label>
      <div class="stage-btn-row">${CRM_STAGES.map(function(s){
        return `<button class="stage-btn ${l.stage===s?'current':''}" onclick="setLeadStage('${id}','${s}')">${s}</button>`;
      }).join('')}</div>
    </div>
    ${l.meeting_booked==='yes' ? `<div class="thin-tag" style="margin:6px 0;">Discovery call booked for ${fmtDate(l.meeting_date)}</div>` : ''}
    ${l.demo_meeting_booked==='yes' ? `<div class="thin-tag" style="margin:6px 0;">Demo booked for ${fmtDate(l.demo_date)}</div>` : ''}
    ${showDisc ? `
      <div class="reveal-panel">
        <b>Schedule Discovery Call</b>
        <div class="row2" style="margin-top:8px;">
          <div class="field" style="margin-bottom:0;"><label>Date</label><input type="date" id="ld_disc_date"></div>
          <div class="field" style="margin-bottom:0;"><label>Time</label><input type="time" id="ld_disc_time"></div>
        </div>
        <button class="btn btn-primary" style="width:100%;justify-content:center;margin-top:10px;" onclick="bookDiscovery('${id}')">Book Discovery Call</button>
      </div>` : ''}
    ${showDemo ? `
      <div class="reveal-panel">
        <b>Book Demo Session</b>
        <div class="row2" style="margin-top:8px;">
          <div class="field" style="margin-bottom:0;"><label>Date</label><input type="date" id="ld_demo_date"></div>
          <div class="field" style="margin-bottom:0;"><label>Time</label><input type="time" id="ld_demo_time"></div>
        </div>
        <button class="btn btn-primary" style="width:100%;justify-content:center;margin-top:10px;" onclick="bookDemo('${id}')">Book Demo</button>
      </div>` : ''}
    ${showDecline ? `
      <div class="reveal-panel decline">
        <b>Decline Reason</b>
        <select id="ld_decline_cat" style="margin-top:8px;width:100%;padding:8px;border:1px solid var(--line);border-radius:6px;">
          <option value="">Select a reason</option><option>Budget</option><option>Chose competitor</option><option>No longer needed</option><option>Went cold / no response</option><option>Other</option>
        </select>
        <input id="ld_competitor" placeholder="Competitor name (if applicable)" style="margin-top:8px;width:100%;padding:8px;border:1px solid var(--line);border-radius:6px;">
        <button class="btn btn-ghost" style="width:100%;justify-content:center;margin-top:10px;" onclick="saveDeclineReason('${id}')">Save Reason</button>
      </div>` : ''}
    <div class="card-h" style="margin-top:14px;">Meeting Notes</div>
    <div id="ld_notes">${notes.map(function(n){ return `<div class="card" style="font-size:12.5px;margin-bottom:6px;"><div class="thin-tag">${n.by||''} · ${fmtDate(n.at)}</div>${bpEsc(n.text)}</div>`; }).join('') || '<div class="thin-tag">No notes yet.</div>'}</div>
    <textarea id="ld_note_text" placeholder="What was discussed on the call..." style="width:100%;margin-top:6px;min-height:60px;padding:8px;border:1px solid var(--line);border-radius:6px;font-family:inherit;"></textarea>
    <button class="btn btn-ghost" style="width:100%;justify-content:center;margin-top:6px;" onclick="addLeadNote('${id}')">Save Note</button>
    <div class="card-h" style="margin-top:14px;display:flex;justify-content:space-between;">AI Lead Health <button class="btn btn-ghost" style="padding:3px 9px;font-size:11px;" onclick="runAiLeadHealth('${id}')">Ask Claude</button></div>
    <div id="ld_health" class="ai-box" style="display:none;"></div>
  `;
  openModal('leadDetailModalBg');
}

function setLeadStage(id, stage){
  api('updateLeadStage', {lead_id:id, stage:stage}).then(function(res){
    if(!res.ok){ alert('Could not update stage: '+(res.error||'Unknown error')); return; }
    if(WORKSPACE_MODE){ var l=DB.leads.filter(function(x){return x.lead_id===id;})[0]; if(l) l.stage=stage; }
    render();
    openLeadDetail(id);
  });
}
function reassignLead(id, newOwner){
  api('reassignLead', {lead_id:id, new_owner:newOwner}).then(function(res){
    if(!res.ok){ alert('Could not reassign: '+(res.error||'Unknown error')); return; }
    if(WORKSPACE_MODE){ var l=DB.leads.filter(function(x){return x.lead_id===id;})[0]; if(l) l.owner=newOwner; }
    render();
  });
}
function bookDemo(id){
  var date = document.getElementById('ld_demo_date').value;
  var time = document.getElementById('ld_demo_time').value;
  if(!date){ alert('Pick a date first.'); return; }
  api('bookLeadDemo', {lead_id:id, kind:'demo', date:date, time:time, invitees:[CURRENT_USER]}).then(function(res){
    if(!res.ok){ alert('Could not book demo: '+(res.error||'Unknown error')); return; }
    if(WORKSPACE_MODE){ var l=DB.leads.filter(function(x){return x.lead_id===id;})[0]; if(l){ l.demo_date=date; l.demo_meeting_booked='yes'; } }
    render();
    openLeadDetail(id);
  });
}
function bookDiscovery(id){
  var date = document.getElementById('ld_disc_date').value;
  var time = document.getElementById('ld_disc_time').value;
  if(!date){ alert('Pick a date first.'); return; }
  api('bookLeadDemo', {lead_id:id, kind:'discovery', date:date, time:time, invitees:[CURRENT_USER]}).then(function(res){
    if(!res.ok){ alert('Could not book call: '+(res.error||'Unknown error')); return; }
    if(WORKSPACE_MODE){ var l=DB.leads.filter(function(x){return x.lead_id===id;})[0]; if(l){ l.meeting_date=date; l.meeting_booked='yes'; } }
    render();
    openLeadDetail(id);
  });
}
function addLeadNote(id){
  var text = (document.getElementById('ld_note_text').value||'').trim();
  if(!text){ alert('Write a note first.'); return; }
  var l = DB.leads.filter(function(x){return x.lead_id===id;})[0]; if(!l) return;
  var notes = []; try{ notes = JSON.parse(l.meeting_notes_json||'[]'); }catch(e){}
  notes.push({text:text, by:CURRENT_USER, at:new Date().toISOString()});
  var json = JSON.stringify(notes);
  api('updateLeadStage', {lead_id:id, stage:l.stage, meeting_notes_json:json}).then(function(res){
    if(!res.ok){ alert('Could not save note: '+(res.error||'Unknown error')); return; }
    l.meeting_notes_json = json;
    render();
    openLeadDetail(id);
  });
}
function saveDeclineReason(id){
  var category = document.getElementById('ld_decline_cat').value;
  var competitor = document.getElementById('ld_competitor').value;
  api('updateLeadStage', {lead_id:id, stage:'Declined / Cold Leads', decline_category:category, competitor:competitor}).then(function(res){
    if(!res.ok){ alert('Could not save: '+(res.error||'Unknown error')); return; }
    if(WORKSPACE_MODE){ var l=DB.leads.filter(function(x){return x.lead_id===id;})[0]; if(l){ l.decline_category=category; l.competitor=competitor; } }
    render();
    openLeadDetail(id);
  });
}
function runAiLeadHealth(id){
  var box = document.getElementById('ld_health');
  box.style.display='block';
  box.innerHTML = '<div class="ai-box-h">Claude</div>Thinking...';
  api('aiLeadHealthSummary', {lead_id:id}).then(function(res){
    if(!res.ok){ box.innerHTML = '<div class="ai-box-h">Claude</div>Could not get a summary: '+(res.error||'Unknown error'); return; }
    var h = res.health || {};
    box.innerHTML = `<div class="ai-box-h">Claude · Risk: ${h.risk_level||'Unknown'}</div>${h.summary||''}<div style="margin-top:8px;"><b>Next:</b> ${h.suggested_next_action||'-'}</div>`;
  });
}

// ── Content Calendar ──────────────────────────────────────────────────
var CONTENT_STAGES = ['Idea','Drafting','Design','Scheduled','Published'];
var CONTENT_STAGE_COLOR = {'Idea':'#8E90A3','Drafting':'#3B6FD4','Design':'#D9A62E','Scheduled':'#7C5CBF','Published':'#2E9B5F'};

function contentFiltered(){
  if(!STATE.content) STATE.content = {platform:'All', view:'cards'};
  return DB.contentCalendar.filter(function(c){ return STATE.content.platform==='All' || c.platform===STATE.content.platform; });
}
function setContentFilter(val){ STATE.content.platform = val; render(); }
function setContentView(v){ STATE.content.view = v; render(); }

function contentCardHtml(c){
  return `<div class="ticket" onclick="openContentDetail('${c.content_id}')">
    <div class="ticket-top"><span class="pill" style="background:var(--brand-bg);color:var(--brand);">${c.type||'Post'}</span></div>
    <div class="ticket-title">${c.title}</div>
    <div class="thin-tag">${c.platform||''}</div>
  </div>`;
}


function openNewContent(){
  ['cf_title','cf_notes'].forEach(function(id){ document.getElementById(id).value=''; });
  document.getElementById('cf_type').value='Post';
  var ownerSel = document.getElementById('cf_owner');
  ownerSel.innerHTML = '<option value="">Unassigned</option>' + DB.team.map(function(p){return `<option value="${p.name}">${p.name}</option>`;}).join('');
  openModal('newContentModalBg');
}
function saveNewContent(){
  var payload = {
    title: document.getElementById('cf_title').value,
    type: document.getElementById('cf_type').value,
    platform: document.getElementById('cf_platform').value,
    owner: document.getElementById('cf_owner').value,
    notes: document.getElementById('cf_notes').value
  };
  api('createContentItem', payload).then(function(res){
    if(!res.ok){ alert('Could not add content item: '+(res.error||'Unknown error')); return; }
    if(WORKSPACE_MODE && res.item) DB.contentCalendar.push(res.item);
    closeModal('newContentModalBg');
    render();
  });
}

function openContentDetail(id){
  var c = DB.contentCalendar.filter(function(x){return x.content_id===id;})[0];
  if(!c) return;
  var body = document.getElementById('contentDetailModalBody');
  body.innerHTML = `
    <div class="modal-h"><h2>${c.title}</h2><button class="close-x" onclick="closeModal('contentDetailModalBg')">X</button></div>
    <div class="thin-tag" style="margin-bottom:10px;">${c.type||''} · ${c.platform||''}</div>
    <div class="field"><label>Stage</label>
      <div class="stage-btn-row">${CONTENT_STAGES.map(function(s){
        return `<button class="stage-btn ${c.stage===s?'current':''}" onclick="setContentStage('${id}','${s}')">${s}</button>`;
      }).join('')}</div>
    </div>
    ${c.stage==='Scheduled' || c.stage==='Design' ? `<div class="field"><label>Scheduled Date</label><input type="date" id="cd_date" value="${c.scheduled_date||''}" onchange="saveContentField('${id}','scheduled_date',this.value)"></div>` : ''}
    <div class="field"><label>Owner</label>
      <select id="cd_owner" onchange="saveContentField('${id}','owner',this.value)">
        <option value="">Unassigned</option>
        ${DB.team.map(function(p){return `<option ${p.name===c.owner?'selected':''}>${p.name}</option>`;}).join('')}
      </select>
    </div>
    <div class="field"><label>Notes</label><textarea onchange="saveContentField('${id}','notes',this.value)">${c.notes||''}</textarea></div>
  `;
  openModal('contentDetailModalBg');
}
function setContentStage(id, stage){
  api('updateContentStage', {content_id:id, stage:stage}).then(function(res){
    if(!res.ok){ alert('Could not update stage: '+(res.error||'Unknown error')); return; }
    if(WORKSPACE_MODE){ var c=DB.contentCalendar.filter(function(x){return x.content_id===id;})[0]; if(c) c.stage=stage; }
    render();
    openContentDetail(id);
  });
}
function saveContentField(id, field, value){
  var payload = {content_id:id}; payload[field]=value;
  api('updateContentStage', payload).then(function(res){
    if(!res.ok){ alert('Could not save: '+(res.error||'Unknown error')); return; }
    if(WORKSPACE_MODE){ var c=DB.contentCalendar.filter(function(x){return x.content_id===id;})[0]; if(c) c[field]=value; }
  });
}
function runContentPoolNowClick(){
  if(!confirm('Ask Claude to propose next week\'s content pool now?')) return;
  api('runContentPoolNow', {}).then(function(res){
    if(!res.ok){ alert('Could not generate content pool: '+(res.error||'Unknown error')); return; }
    if(WORKSPACE_MODE && res.items){ res.items.forEach(function(i){ DB.contentCalendar.push(i); }); }
    alert((res.created||0)+' new content ideas added to the Idea column.');
    render();
  });
}

// ── Payroll (Admin only) ─────────────────────────────────────────────────
function renderPayroll(){
  if(CURRENT_USER_ROLE!=='Admin'){
    var deny = el('<div></div>'); deny.innerHTML = '<div class="empty">Payroll is restricted to Admins.</div>'; return deny;
  }
  if(!STATE.payrollMonth){
    var months = DB.payroll.map(function(p){return p.month;}).filter(Boolean);
    STATE.payrollMonth = months.length ? months.sort().slice(-1)[0] : new Date().toISOString().slice(0,7);
  }
  var wrap = el('<div></div>');
  var allMonths = ['All'].concat(DB.payroll.map(function(p){return p.month;}).filter(function(m,i,arr){return m && arr.indexOf(m)===i;}).sort());
  var items = DB.payroll.filter(function(p){ return STATE.payrollMonth==='All' || p.month===STATE.payrollMonth; });
  var totalSalary = items.reduce(function(s,p){return s+(Number(p.salary_amount)||0);},0);

  wrap.innerHTML = `<div class="section-title">Payroll - verification only; this app never moves money itself</div>
    <div class="stat-grid" style="margin-bottom:16px;">
      <div class="stat-card"><div class="stat-num">${items.length}</div><div class="stat-lbl">Entries this month</div></div>
      <div class="stat-card accent-green"><div class="stat-num">${items.filter(function(p){return p.status==='Paid';}).length}</div><div class="stat-lbl">Paid</div></div>
      <div class="stat-card accent-amber"><div class="stat-num">${items.filter(function(p){return p.account_verified!=='yes';}).length}</div><div class="stat-lbl">Unverified Accounts</div></div>
      <div class="stat-card"><div class="stat-num">₦${totalSalary.toLocaleString()}</div><div class="stat-lbl">Total Salary</div></div>
    </div>
    <div class="board-toolbar">
      <div class="filter-pills">${allMonths.map(function(m){return `<span class="filter-pill ${STATE.payrollMonth===m?'active':''}" onclick="setPayrollMonth('${m}')">${m}</span>`;}).join('')}</div>
      <div style="display:flex;gap:10px;">
        <button class="btn btn-ghost" onclick="exportPayrollCsvClick()">Export CSV</button>
        <button class="btn btn-primary" onclick="openPayrollRun()">Run Monthly Payroll</button>
      </div>
    </div>
    <div class="card table-scroll"><table>
      <tr><th>Team Member</th><th>Bank</th><th>Verified</th><th>Salary</th><th>Status</th></tr>
      ${items.map(function(p){
        return `<tr onclick="openPayrollDetail('${p.payroll_id}')" style="cursor:pointer;">
          <td>${p.team_member_name}</td><td>${p.bank_name||'-'} ${p.account_number?('· '+p.account_number):''}</td>
          <td><span class="pill" style="background:${p.account_verified==='yes'?'var(--green-bg)':'var(--amber-bg)'};color:${p.account_verified==='yes'?'var(--green)':'#946A0C'};">${p.account_verified==='yes'?'Verified':'Unverified'}</span></td>
          <td>₦${(Number(p.salary_amount)||0).toLocaleString()}</td>
          <td><span class="pill" style="background:${p.status==='Paid'?'var(--green-bg)':'var(--surface2)'};color:${p.status==='Paid'?'var(--green)':'var(--text-dim)'};">${p.status}</span></td>
        </tr>`;
      }).join('') || '<tr><td colspan="5" class="empty">No payroll entries for this month yet.</td></tr>'}
    </table></div>`;
  return wrap;
}
function setPayrollMonth(m){ STATE.payrollMonth = m; render(); }

function openPayrollRun(){
  document.getElementById('pf_month').value = new Date().toISOString().slice(0,7);
  openModal('payrollRunModalBg');
}
function saveRunPayrollBatch(){
  var month = document.getElementById('pf_month').value;
  if(!month){ alert('Pick a month first.'); return; }
  api('generateMonthlyPayrollBatch', {month:month}).then(function(res){
    if(!res.ok){ alert('Could not run payroll: '+(res.error||'Unknown error')); return; }
    if(WORKSPACE_MODE && res.entries){ res.entries.forEach(function(e){ DB.payroll.push(e); }); }
    STATE.payrollMonth = month;
    closeModal('payrollRunModalBg');
    alert((res.created||0)+' payroll entries created for '+month+'.');
    render();
  });
}

function openPayrollDetail(id){
  var p = DB.payroll.filter(function(x){return x.payroll_id===id;})[0];
  if(!p) return;
  var body = document.getElementById('payrollDetailModalBody');
  body.innerHTML = `
    <div class="modal-h"><h2>${p.team_member_name} - ${p.month}</h2><button class="close-x" onclick="closeModal('payrollDetailModalBg')">X</button></div>
    <div class="row2">
      <div class="field"><label>Bank Name</label><input id="pd_bank_name" value="${p.bank_name||''}"></div>
      <div class="field"><label>Bank Code</label><input id="pd_bank_code" value="${p.bank_code||''}" placeholder="e.g. 058"></div>
    </div>
    <div class="field"><label>Account Number</label><input id="pd_account_number" value="${p.account_number||''}"></div>
    <div class="thin-tag" style="margin-bottom:10px;">${p.account_verified==='yes' ? ('Verified as: '+(p.account_name||'-')) : 'Not yet verified.'}</div>
    <button class="btn btn-ghost" style="width:100%;justify-content:center;margin-bottom:10px;" onclick="verifyPayrollAcct('${id}')">Verify Account with Paystack</button>
    <div class="field"><label>Salary Amount (₦)</label><input type="number" id="pd_salary" value="${p.salary_amount||''}" onchange="savePayrollField('${id}','salary_amount',this.value)"></div>
    ${p.status!=='Paid' ? `<button class="btn btn-primary" style="width:100%;justify-content:center;" onclick="markPayrollPaidClick('${id}')">Mark Paid (after transferring in Paystack)</button>` : `<div class="thin-tag">Paid on ${fmtDate(p.paid_at)}</div>`}
  `;
  openModal('payrollDetailModalBg');
}
function verifyPayrollAcct(id){
  var accountNumber = document.getElementById('pd_account_number').value;
  var bankCode = document.getElementById('pd_bank_code').value;
  var bankName = document.getElementById('pd_bank_name').value;
  api('updatePayrollEntry', {payroll_id:id, bank_name:bankName, bank_code:bankCode, account_number:accountNumber}).then(function(){
    api('verifyPayrollAccount', {payroll_id:id, account_number:accountNumber, bank_code:bankCode}).then(function(res){
      if(!res.ok){ alert('Verification failed: '+(res.error||'Unknown error')); return; }
      if(WORKSPACE_MODE){ var p=DB.payroll.filter(function(x){return x.payroll_id===id;})[0]; if(p){ p.bank_name=bankName; p.bank_code=bankCode; p.account_number=accountNumber; p.account_name=res.account_name; p.account_verified='yes'; } }
      alert('Verified: '+res.account_name);
      render();
      openPayrollDetail(id);
    });
  });
}
function savePayrollField(id, field, value){
  var payload = {payroll_id:id}; payload[field]=value;
  api('updatePayrollEntry', payload).then(function(res){
    if(!res.ok){ alert('Could not save: '+(res.error||'Unknown error')); return; }
    if(WORKSPACE_MODE){ var p=DB.payroll.filter(function(x){return x.payroll_id===id;})[0]; if(p) p[field]=value; }
  });
}
function markPayrollPaidClick(id){
  if(!confirm('Mark this as paid? Only do this after you have actually transferred the salary in your Paystack dashboard.')) return;
  api('markPayrollPaid', {payroll_id:id}).then(function(res){
    if(!res.ok){ alert('Could not update: '+(res.error||'Unknown error')); return; }
    if(WORKSPACE_MODE){ var p=DB.payroll.filter(function(x){return x.payroll_id===id;})[0]; if(p){ p.status='Paid'; p.paid_at=new Date().toISOString(); } }
    closeModal('payrollDetailModalBg');
    render();
  });
}
function exportPayrollCsvClick(){
  if(STATE.payrollMonth==='All'){ alert('Pick a specific month first.'); return; }
  api('exportPayrollCsv', {month:STATE.payrollMonth}).then(function(res){
    if(!res.ok){ alert('Could not export: '+(res.error||'Unknown error')); return; }
    var blob = new Blob([res.csv], {type:'text/csv'});
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'wecollect-payroll-'+STATE.payrollMonth+'.csv';
    document.body.appendChild(a); a.click(); a.remove();
  });
}

// ── Finance (Admin only) ─────────────────────────────────────────────────
function renderFinance(){
  if(CURRENT_USER_ROLE!=='Admin'){
    var deny = el('<div></div>'); deny.innerHTML = '<div class="empty">Finance is restricted to Admins.</div>'; return deny;
  }
  var wrap = el('<div></div>');
  var income = DB.financeEntries.filter(function(e){return e.type==='Income';}).reduce(function(s,e){return s+(Number(e.amount)||0);},0);
  var expense = DB.financeEntries.filter(function(e){return e.type==='Expense';}).reduce(function(s,e){return s+(Number(e.amount)||0);},0);
  wrap.innerHTML = `<div class="section-title">Finance Dashboard</div>
    <div class="stat-grid" style="margin-bottom:16px;">
      <div class="stat-card accent-green"><div class="stat-num">₦${income.toLocaleString()}</div><div class="stat-lbl">Income</div></div>
      <div class="stat-card accent-red"><div class="stat-num">₦${expense.toLocaleString()}</div><div class="stat-lbl">Expenses</div></div>
      <div class="stat-card"><div class="stat-num">₦${(income-expense).toLocaleString()}</div><div class="stat-lbl">Net</div></div>
    </div>
    <div style="margin-bottom:12px;"><button class="btn btn-primary" onclick="openNewFinanceEntry()">+ New Entry</button></div>
    <div class="card table-scroll"><table>
      <tr><th>Date</th><th>Type</th><th>Category</th><th>Description</th><th>Amount</th><th></th></tr>
      ${DB.financeEntries.slice().reverse().map(function(e){
        return `<tr>
          <td>${fmtDate(e.entry_date)}</td>
          <td><span class="pill" style="background:${e.type==='Income'?'var(--green-bg)':'var(--red-bg)'};color:${e.type==='Income'?'var(--green)':'var(--red)'};">${e.type}</span></td>
          <td>${e.category||'-'}</td><td>${e.description||'-'}</td>
          <td>${e.currency||'NGN'} ${(Number(e.amount)||0).toLocaleString()}</td>
          <td><span class="thin-tag" style="color:var(--red);cursor:pointer;" onclick="deleteFinanceEntryClick('${e.entry_id}')">Delete</span></td>
        </tr>`;
      }).join('') || '<tr><td colspan="6" class="empty">No finance entries yet.</td></tr>'}
    </table></div>`;
  return wrap;
}
function openNewFinanceEntry(){
  ['ff_category','ff_amount','ff_desc'].forEach(function(id){ document.getElementById(id).value=''; });
  document.getElementById('ff_date').value = new Date().toISOString().slice(0,10);
  var projSel = document.getElementById('ff_project');
  projSel.innerHTML = '<option value="">None</option>' + DB.projects.map(function(p){return `<option value="${p.project_id}">${p.name}</option>`;}).join('');
  openModal('newFinanceModalBg');
}
function saveNewFinanceEntry(){
  var payload = {
    type: document.getElementById('ff_type').value,
    category: document.getElementById('ff_category').value,
    amount: Number(document.getElementById('ff_amount').value)||0,
    currency: document.getElementById('ff_currency').value||'NGN',
    entry_date: document.getElementById('ff_date').value,
    project_id: document.getElementById('ff_project').value,
    description: document.getElementById('ff_desc').value
  };
  api('createFinanceEntry', payload).then(function(res){
    if(!res.ok){ alert('Could not add entry: '+(res.error||'Unknown error')); return; }
    if(WORKSPACE_MODE && res.entry) DB.financeEntries.push(res.entry);
    closeModal('newFinanceModalBg');
    render();
  });
}
function deleteFinanceEntryClick(id){
  if(!confirm('Delete this finance entry?')) return;
  api('deleteFinanceEntry', {entry_id:id}).then(function(res){
    if(!res.ok){ alert('Could not delete: '+(res.error||'Unknown error')); return; }
    DB.financeEntries = DB.financeEntries.filter(function(e){return e.entry_id!==id;});
    render();
  });
}

// ── Leave ────────────────────────────────────────────────────────────────
function renderLeave(){
  var wrap = el('<div></div>');
  var isAdmin = CURRENT_USER_ROLE==='Admin';
  var items = isAdmin ? DB.leave : DB.leave.filter(function(l){return l.team_member_name===CURRENT_USER;});
  wrap.innerHTML = `<div class="section-title">${isAdmin?'Leave Requests':'My Leave Requests'}</div>
    <div style="margin-bottom:12px;"><button class="btn btn-primary" onclick="openRequestLeave()">Request Leave</button></div>
    <div class="card table-scroll"><table>
      <tr><th>${isAdmin?'Team Member':'Type'}</th><th>${isAdmin?'Type':'Dates'}</th><th>${isAdmin?'Dates':'Reason'}</th><th>Status</th>${isAdmin?'<th></th>':''}</tr>
      ${items.map(function(l){
        return `<tr>
          <td>${isAdmin?l.team_member_name:l.type}</td>
          <td>${isAdmin?l.type:(l.start_date+' to '+l.end_date)}</td>
          <td>${isAdmin?(l.start_date+' to '+l.end_date):(l.reason||'-')}</td>
          <td><span class="pill" style="background:${l.status==='Approved'?'var(--green-bg)':l.status==='Declined'?'var(--red-bg)':'var(--surface2)'};color:${l.status==='Approved'?'var(--green)':l.status==='Declined'?'var(--red)':'var(--text-dim)'};">${l.status}</span></td>
          ${isAdmin && l.status==='Pending' ? `<td><button class="btn btn-ghost" style="padding:4px 8px;font-size:11px;" onclick="decideLeaveClick('${l.leave_id}','Approved')">Approve</button> <button class="btn btn-ghost" style="padding:4px 8px;font-size:11px;color:var(--red);" onclick="decideLeaveClick('${l.leave_id}','Declined')">Decline</button></td>` : (isAdmin?'<td></td>':'')}
        </tr>`;
      }).join('') || '<tr><td colspan="5" class="empty">No leave requests yet.</td></tr>'}
    </table></div>`;
  return wrap;
}
function openRequestLeave(){
  ['lvf_start','lvf_end','lvf_reason'].forEach(function(id){ document.getElementById(id).value=''; });
  openModal('requestLeaveModalBg');
}
function saveLeaveRequest(){
  var payload = {
    type: document.getElementById('lvf_type').value,
    start_date: document.getElementById('lvf_start').value,
    end_date: document.getElementById('lvf_end').value,
    reason: document.getElementById('lvf_reason').value
  };
  api('requestLeave', payload).then(function(res){
    if(!res.ok){ alert('Could not submit request: '+(res.error||'Unknown error')); return; }
    if(WORKSPACE_MODE && res.leave) DB.leave.push(res.leave);
    closeModal('requestLeaveModalBg');
    render();
  });
}
function decideLeaveClick(id, status){
  api('decideLeave', {leave_id:id, status:status}).then(function(res){
    if(!res.ok){ alert('Could not update: '+(res.error||'Unknown error')); return; }
    if(WORKSPACE_MODE){ var l=DB.leave.filter(function(x){return x.leave_id===id;})[0]; if(l){ l.status=status; l.approved_by=CURRENT_USER; } }
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

// Quick shortcut from Team Directory - "book a meeting with anyone,
// any department" without having to find them in the invitee picker.
function scheduleMeetingWith(name){
  openScheduleMeetingModal();
  SCHEDULE_INVITEES = [name];
  renderInviteePicker();
}

function saveScheduledMeeting(force){
  var description = document.getElementById('sm_desc').value.trim();
  if(!description){ alert('A meeting description is required so an agenda can be generated.'); return; }
  var payload = {
    title: document.getElementById('sm_title').value || 'Meeting',
    date: document.getElementById('sm_date').value || new Date().toISOString().slice(0,10),
    time: document.getElementById('sm_time').value,
    description: description,
    meeting_link: document.getElementById('sm_link').value,
    invitees: SCHEDULE_INVITEES,
    scheduled_by: CURRENT_USER,
    force: !!force
  };
  api('scheduleMeeting', payload).then(function(res){
    if(res.conflict){
      var list = (res.conflicts||[]).map(function(c){ return '- '+c.title+' ('+c.start+')'; }).join('\n');
      if(confirm('This time conflicts with an existing event:\n\n'+list+'\n\nSchedule anyway?')){
        saveScheduledMeeting(true);
      }
      return;
    }
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

  var slowNoticeTimer = setTimeout(function(){
    target.innerHTML = '<div class="ai-box"><div class="ai-box-h">* Still working...</div>This is a long transcript, so it can take up to a minute. Please keep this tab open.</div>';
  }, 8000);

  var gaveUp = false;
  var giveUpTimer = setTimeout(function(){
    gaveUp = true;
    target.innerHTML = '<div class="ai-box">This is taking unusually long and may have timed out in transit. Check Apps Script Executions for the actual result, or try again - it sometimes completes on a retry even if the first attempt seems to hang.<div class="proposal-actions"><button class="btn btn-ghost" onclick="runMeetingAI(\'' + meetingId + '\')">Try Again</button></div></div>';
  }, 100000);

  api('processMeetingWithAI', {meeting_id: meetingId}).then(function(res){
    clearTimeout(slowNoticeTimer);
    clearTimeout(giveUpTimer);
    if(gaveUp) return; // already showed the give-up message, don't overwrite a fresh retry
    if(!res.ok){ target.innerHTML = '<div class="ai-box">Couldn\'t process: '+(res.error||'unknown error')+'</div>'; return; }
    MEETING_PROPOSALS[meetingId] = res.proposals;
    render();
    setTimeout(function(){
      reviewMeetingProposals(meetingId);
      if(res.was_truncated){
        var note = document.getElementById('ai-'+meetingId);
        if(note) note.innerHTML = '<div class="thin-tag" style="margin-bottom:6px;">Note: this transcript was long, so only the first part was used for extraction. The full text is still saved.</div>' + note.innerHTML;
      }
    }, 50);
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
  var notes = document.getElementById('m_notes').value;
  if(/\[Loading (Word|PDF) reader\.\.\.\]/.test(notes)){
    alert('The file is still being read - please wait a moment for it to finish before saving.');
    return;
  }
  var payload = {
    title: document.getElementById('m_title').value || 'Untitled Meeting',
    date: document.getElementById('m_date').value || new Date().toISOString().slice(0,10),
    participants: document.getElementById('m_people').value,
    raw_notes: notes
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

  html += '<div class="section-title">All Team Members - book a meeting with anyone, any department</div><div class="card" style="padding:0;"><table><thead><tr><th>Name</th><th>Email</th><th>Department</th><th>Role</th><th></th></tr></thead><tbody>' +
    (DB.team.length ? DB.team.map(function(p){
      return `<tr><td>${p.name}</td><td>${p.email}</td><td>${p.department||' - '}</td><td>${p.role||' - '}</td><td><button class="btn btn-ghost" style="padding:4px 9px;font-size:11px;" onclick="scheduleMeetingWith('${p.name}')">Meet</button></td></tr>`;
    }).join('') : '<tr><td colspan="5" class="empty">No team members yet.</td></tr>') +
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
    <div class="card" style="margin-bottom:14px;">
      <div class="card-h">KPI History</div>
      <div id="kpiHistoryBox"><div class="empty">Loading...</div></div>
    </div>
    <div class="card">
      <div class="card-h">Sessions <button class="btn btn-ghost" onclick="openScheduleOneOnOne('${person}')">+ Schedule 1:1</button></div>
      <div id="sessionsBox">${sessionsHtml(sessions)}</div>
    </div>`;
  wrap.innerHTML = html;
  loadKPIHistory(person);
  return wrap;
}

function loadKPIHistory(person){
  api('getKPIHistoryForPerson', {team_member_name: person}).then(function(res){
    var box = document.getElementById('kpiHistoryBox');
    if(!box) return;
    if(!res.ok){ box.innerHTML = '<div class="empty">Could not load: '+(res.error||'Unknown error')+'</div>'; return; }
    var history = res.history || [];
    if(!history.length){ box.innerHTML = '<div class="empty">No KPI scores recorded yet - rate this month during your next 1:1 session below.</div>'; return; }
    box.innerHTML = '<table><thead><tr><th>Date</th><th>Overall</th>'+KPI_CATEGORIES.map(function(c){return '<th>'+c+'</th>';}).join('')+'<th>Notes</th></tr></thead><tbody>' +
      history.map(function(r){
        var scores = {};
        try { scores = JSON.parse(r.manual_scores_json || '{}'); } catch(e){}
        return '<tr><td>'+fmtDate(r.review_date)+'</td><td><b>'+r.overall_score+'%</b></td>' +
          KPI_CATEGORIES.map(function(c){ return '<td>'+(scores[c]||'-')+'</td>'; }).join('') +
          '<td>'+(r.admin_notes||'-')+'</td></tr>';
      }).join('') + '</tbody></table>';
  });
}

function saveKPIScoreForSession(sessionId){
  var person = STATE.oneOnOnePerson;
  var s = (DB.oneOnOnes||[]).filter(function(x){return x.session_id===sessionId;})[0];
  var scores = {};
  KPI_CATEGORIES.forEach(function(cat){
    var fieldId = 'kpi-'+sessionId+'-'+cat.replace(/[^a-zA-Z0-9]/g,'');
    var val = document.getElementById(fieldId).value;
    if(val) scores[cat] = Number(val);
  });
  if(!Object.keys(scores).length){ alert('Rate at least one category before saving.'); return; }
  var notes = document.getElementById('kpiNotes-'+sessionId).value;

  api('saveKPIReview', {
    team_member_name: person, session_id: sessionId,
    review_date: s ? s.date : new Date().toISOString().slice(0,10),
    manual_scores: scores, admin_notes: notes, created_by: CURRENT_USER
  }).then(function(res){
    if(!res.ok){ alert('Could not save KPI score: '+(res.error||'Unknown error')); return; }
    alert('KPI score saved - overall: '+res.review.overall_score+'%');
    loadKPIHistory(person);
  });
}

function trackingCardsHtml(cards){
  if(!cards.length) return '<div class="empty">No open tracking cards.</div>';
  return '<div style="display:flex;flex-wrap:wrap;gap:10px;">' +
    cards.map(function(t){ return `<div style="width:220px;">${ticketCardHtml(t)}</div>`; }).join('') +
    '</div>';
}

var KPI_CATEGORIES = ['Quality of Work', 'Productivity', 'Communication', 'Ownership & Reliability', 'Teamwork'];

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

      <div class="card-h" style="margin-top:14px;">KPI Score for this session</div>
      <div id="kpiScoreBox-${s.session_id}">
        ${KPI_CATEGORIES.map(function(cat){
          var fieldId = 'kpi-'+s.session_id+'-'+cat.replace(/[^a-zA-Z0-9]/g,'');
          return `<div class="row2" style="align-items:center;margin-bottom:6px;">
            <label class="thin-tag" style="margin:0;">${cat}</label>
            <select id="${fieldId}" style="padding:6px 8px;border:1px solid var(--line);border-radius:5px;font-family:inherit;">
              <option value="">Not rated</option>
              <option value="1">1 - Needs improvement</option>
              <option value="2">2 - Below expectations</option>
              <option value="3">3 - Meets expectations</option>
              <option value="4">4 - Exceeds expectations</option>
              <option value="5">5 - Outstanding</option>
            </select>
          </div>`;
        }).join('')}
        <div class="field"><label>KPI Notes</label><textarea id="kpiNotes-${s.session_id}" placeholder="Context for this month's rating..."></textarea></div>
        <button class="btn btn-primary" onclick="saveKPIScoreForSession('${s.session_id}')">Save KPI Score</button>
      </div>
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

// Generic notes-file reader used by BOTH the main "Log Past Meeting Notes"
// modal and each 1:1 session. Disables the given save button (if provided)
// for the whole duration of reading/parsing, so it is physically impossible
// to click Save while a placeholder like "[Loading Word reader...]" is
// still sitting in the textarea instead of the real extracted content -
// that exact race is what caused Claude to report "no notes provided"
// on a previous upload.
function handleNotesFileUpload(event, textareaId, saveButtonId){
  var file = event.target.files[0];
  if(!file) return;
  var name = file.name.toLowerCase();
  var notesBox = document.getElementById(textareaId);
  var saveBtn = saveButtonId ? document.getElementById(saveButtonId) : null;

  function lock(){ if(saveBtn){ saveBtn.disabled = true; saveBtn.textContent = 'Reading file...'; } }
  function unlock(label){ if(saveBtn){ saveBtn.disabled = false; saveBtn.textContent = label; } }

  if(name.endsWith('.txt') || name.endsWith('.md')){
    lock();
    var r1 = new FileReader();
    r1.onload = function(e){ notesBox.value = (notesBox.value?notesBox.value+'\n\n':'') + e.target.result; unlock(saveBtn?saveBtn.dataset.label:''); };
    r1.onerror = function(){ alert('Could not read that file.'); unlock(saveBtn?saveBtn.dataset.label:''); };
    r1.readAsText(file);
    return;
  }
  if(name.endsWith('.docx')){
    var origVal = notesBox.value;
    lock();
    notesBox.value = origVal + '\n\n[Loading Word reader...]';
    loadScriptOnce('https://cdnjs.cloudflare.com/ajax/libs/mammoth/1.6.0/mammoth.browser.min.js').then(function(){
      var r2 = new FileReader();
      r2.onload = function(e){
        mammoth.extractRawText({arrayBuffer: e.target.result}).then(function(result){
          notesBox.value = (origVal?origVal+'\n\n':'') + result.value;
          unlock(saveBtn?saveBtn.dataset.label:'');
        }).catch(function(err){ notesBox.value = origVal; alert('Could not read that Word file: '+err.message); unlock(saveBtn?saveBtn.dataset.label:''); });
      };
      r2.readAsArrayBuffer(file);
    }).catch(function(){ notesBox.value = origVal; alert('Could not load the Word file reader.'); unlock(saveBtn?saveBtn.dataset.label:''); });
    return;
  }
  if(name.endsWith('.pdf')){
    var origVal2 = notesBox.value;
    lock();
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
          unlock(saveBtn?saveBtn.dataset.label:'');
        }).catch(function(err){ notesBox.value = origVal2; alert('Could not read that PDF: '+err.message); unlock(saveBtn?saveBtn.dataset.label:''); });
      };
      r3.readAsArrayBuffer(file);
    }).catch(function(){ notesBox.value = origVal2; alert('Could not load the PDF reader.'); unlock(saveBtn?saveBtn.dataset.label:''); });
    return;
  }
  alert('Unsupported file type. Use .txt, .md, .docx, or .pdf.');
}

// Thin wrappers so existing HTML onchange calls keep working unchanged.
function handleMeetingFileUpload(event){
  handleNotesFileUpload(event, 'm_notes', 'm_save_btn');
}
function handleOneOnOneFileUpload(event, sessionId){
  handleNotesFileUpload(event, 'notes-'+sessionId, null);
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

function saveScheduledOneOnOne(force){
  var person = STATE.oneOnOneSchedulePerson;
  var payload = {
    team_member_name: person,
    date: document.getElementById('oo_date').value || new Date().toISOString().slice(0,10),
    time: document.getElementById('oo_time').value,
    agenda: document.getElementById('oo_agenda').value,
    created_by: CURRENT_USER,
    force: !!force
  };
  api('createOneOnOne', payload).then(function(res){
    if(res.conflict){
      var list = (res.conflicts||[]).map(function(c){ return '- '+c.title+' ('+c.start+')'; }).join('\n');
      if(confirm('This time conflicts with an existing event:\n\n'+list+'\n\nSchedule anyway?')){
        saveScheduledOneOnOne(true);
      }
      return;
    }
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

function renderNewsDigest(){
  var wrap = el('<div></div>');
  wrap.innerHTML = `<div class="section-title">Industry News <button class="btn btn-ghost" style="margin-left:10px" onclick="runNewsDigestNow()">Refresh Now</button></div>
  <div class="thin-tag" style="margin-bottom:14px;">Auto-generated from live web search - covers WeCollect's industry, competitors, and customer sectors across Africa. Also DMs admins on Slack when it runs on schedule.</div>
  <div id="newsDigestBox"><div class="empty">Loading...</div></div>`;

  api('getLatestNewsDigest', {}).then(function(res){
    var box = document.getElementById('newsDigestBox');
    if(!box) return;
    if(!res.ok){ box.innerHTML = '<div class="empty">Could not load: '+(res.error||'Unknown error')+'</div>'; return; }
    if(!res.digest){ box.innerHTML = '<div class="empty">No digest generated yet. Click "Refresh Now" to generate the first one, or set up the weekly trigger in Apps Script.</div>'; return; }
    box.innerHTML = newsDigestHtml(res.digest);
  });

  return wrap;
}

function newsDigestHtml(digest){
  function section(title, jsonStr){
    var items = [];
    try { items = JSON.parse(jsonStr || '[]'); } catch(e){ items = []; }
    if(!items.length) return '';
    return `<div class="card" style="margin-bottom:14px;">
      <div class="card-h">${title}</div>
      ${items.map(function(n){
        return `<div class="proposal">
          <b>${n.title}</b>
          <div class="thin-tag" style="margin:6px 0;">${n.summary||''}</div>
          ${n.source_url ? `<a href="${n.source_url}" target="_blank" style="font-size:11.5px;color:var(--blue);">${n.source_name||'Source'}</a>` : ''}
        </div>`;
      }).join('')}
    </div>`;
  }
  return `<div class="thin-tag" style="margin-bottom:10px;">Generated ${fmtDateTime(digest.generated_at)}</div>` +
    section('Funding & Opportunities', digest.funding_news_json) +
    section('Industry', digest.industry_news_json) +
    section('Competitors', digest.competitor_news_json) +
    section('Customers', digest.customer_news_json);
}

function runNewsDigestNow(){
  var box = document.getElementById('newsDigestBox');
  if(box) box.innerHTML = '<div class="empty">Searching the web and generating your digest - this can take 20-30 seconds...</div>';
  api('runNewsDigestNow', {}).then(function(res){
    if(!res.ok){ if(box) box.innerHTML = '<div class="empty">Could not generate digest: '+(res.error||'Unknown error')+'</div>'; return; }
    if(box) box.innerHTML = newsDigestHtml(res.digest);
  });
}

// ═══════════════════════════════════════════════════════════════════════
//  TRAINING MODULE
// ═══════════════════════════════════════════════════════════════════════

var TRAINING_POLL_TIMER = null;
var TRAINING_PLAYER = null;

function renderTraining(){
  var wrap = el('<div></div>');
  var view = STATE.trainingView || 'catalog';
  clearInterval(TRAINING_POLL_TIMER);

  if(view === 'video' && STATE.trainingVideoId){
    wrap.appendChild(buildTrainingVideoView(STATE.trainingVideoId));
  } else if(view === 'quiz' && STATE.trainingVideoId){
    wrap.appendChild(buildTrainingQuizView(STATE.trainingVideoId));
  } else {
    wrap.appendChild(buildTrainingCatalogView());
  }
  return wrap;
}

function goToTraining(view, videoId){
  STATE.trainingView = view;
  STATE.trainingVideoId = videoId || null;
  render();
}

// ── Catalog / "My Training" ─────────────────────────────────────────────

function buildTrainingCatalogView(){
  var wrap = el('<div></div>');
  wrap.innerHTML = '<div class="section-title">My Training</div><div class="thin-tag" style="margin-bottom:14px;">Watch each video fully to unlock its quiz - skipping ahead is checked server-side, not just in this window.</div>' +
    '<div style="display:flex;gap:8px;margin-bottom:12px;flex-wrap:wrap;">' +
    '<input id="trg_search" placeholder="Search videos..." style="flex:1;min-width:180px;padding:8px 10px;border:1px solid var(--line);border-radius:6px;font-family:inherit;font-size:12.5px;">' +
    '<select id="trg_status" style="padding:8px 10px;border:1px solid var(--line);border-radius:6px;font-family:inherit;font-size:12.5px;"><option value="all">All</option><option value="not-started">Not started</option><option value="in-progress">In progress</option><option value="completed">Completed</option></select>' +
    '</div><div id="trg_tags" style="display:flex;gap:6px;margin-bottom:14px;flex-wrap:wrap;"></div>' +
    '<div id="trg_grid" class="stat-grid" style="grid-template-columns:repeat(auto-fit,minmax(220px,1fr));"><div class="empty">Loading...</div></div>';

  api('getTrainingDashboardData', {}).then(function(res){
    var grid = document.getElementById('trg_grid');
    if(!res.ok){ if(grid) grid.innerHTML = '<div class="empty">Could not load: '+(res.error||'Unknown error')+'</div>'; return; }
    TRAINING_CATALOG = res.videos || [];
    renderTrainingTagChips();
    renderTrainingGrid();
  });

  var searchEl = wrap.querySelector('#trg_search');
  var statusEl = wrap.querySelector('#trg_status');
  if(searchEl) searchEl.addEventListener('input', renderTrainingGrid);
  if(statusEl) statusEl.addEventListener('change', renderTrainingGrid);
  return wrap;
}

var TRAINING_CATALOG = [];
var TRAINING_ACTIVE_TAG = null;

function renderTrainingTagChips(){
  var box = document.getElementById('trg_tags');
  if(!box) return;
  var tagSet = {};
  TRAINING_CATALOG.forEach(function(v){ (v.tags||[]).forEach(function(t){ tagSet[t]=true; }); });
  var tags = Object.keys(tagSet).sort();
  if(!tags.length){ box.style.display='none'; return; }
  box.innerHTML = tags.map(function(t){
    var active = TRAINING_ACTIVE_TAG===t;
    return `<span class="pill" style="cursor:pointer;padding:5px 12px;${active?'background:var(--ink);color:var(--on-ink);':'background:var(--surface2);color:var(--text-dim);'}" onclick="toggleTrainingTag('${t}')">${t}</span>`;
  }).join('');
}

function toggleTrainingTag(t){
  TRAINING_ACTIVE_TAG = TRAINING_ACTIVE_TAG===t ? null : t;
  renderTrainingTagChips();
  renderTrainingGrid();
}

function renderTrainingGrid(){
  var grid = document.getElementById('trg_grid');
  if(!grid) return;
  var query = (document.getElementById('trg_search')||{}).value || '';
  query = query.trim().toLowerCase();
  var status = (document.getElementById('trg_status')||{}).value || 'all';

  var list = TRAINING_CATALOG.filter(function(v){
    var statusKey = v.completed ? 'completed' : (v.pct>0 ? 'in-progress' : 'not-started');
    if(status!=='all' && statusKey!==status) return false;
    if(query && v.title.toLowerCase().indexOf(query)===-1) return false;
    if(TRAINING_ACTIVE_TAG && (v.tags||[]).indexOf(TRAINING_ACTIVE_TAG)===-1) return false;
    return true;
  });

  if(!TRAINING_CATALOG.length){ grid.innerHTML = '<div class="empty">No training videos published yet.</div>'; return; }
  if(!list.length){ grid.innerHTML = '<div class="empty">No videos match your search.</div>'; return; }

  grid.innerHTML = list.map(function(v){
    var statusLabel = v.completed ? 'Completed' : (v.pct>0 ? v.pct+'% watched' : 'Not started');
    var target = (v.completed && v.quizAvailable) ? 'quiz' : 'video';
    return `<div class="card" style="cursor:pointer;" onclick="goToTraining('${target}','${v.id}')">
      <img src="${v.thumbnailUrl}" style="width:100%;aspect-ratio:16/9;object-fit:cover;border-radius:6px;margin-bottom:8px;">
      <div style="font-weight:600;font-size:13px;margin-bottom:4px;">${v.title}</div>
      <div class="thin-tag">${statusLabel}${v.bestScore!==null?' - Best score: '+v.bestScore+'%':''}</div>
      ${(v.tags||[]).length ? '<div style="margin-top:6px;">'+v.tags.map(function(t){return '<span class="pill" style="background:var(--surface2);margin-right:4px;">'+t+'</span>';}).join('')+'</div>' : ''}
    </div>`;
  }).join('');
}

// ── Video player with server-enforced anti-skip ────────────────────────

function buildTrainingVideoView(videoId){
  var wrap = el('<div></div>');
  wrap.innerHTML = `<div class="section-title"><span style="cursor:pointer;color:var(--text-dim);" onclick="goToTraining('catalog')">My Training</span> / Video</div>
    <div class="card" id="trg_video_card"><div class="empty">Loading...</div></div>`;

  api('getVideoPageData', {videoId: videoId}).then(function(res){
    var card = document.getElementById('trg_video_card');
    if(!card) return;
    if(!res.ok){ card.innerHTML = '<div class="empty">Could not load: '+(res.error||'Unknown error')+'</div>'; return; }
    var data = res.data;
    var pct = Math.round((data.progress.maxContiguousSec / data.video.durationSec) * 100);
    card.innerHTML = `
      <h2 style="font-family:'Space Grotesk';font-size:16px;margin-bottom:6px;">${data.video.title}</h2>
      <div class="thin-tag" style="margin-bottom:14px;">Watch the full video to unlock the quiz - skipping ahead isn't possible, progress is checked on the server.</div>
      <div style="max-width:640px;">
        <div style="position:relative;aspect-ratio:16/9;background:#000;border-radius:10px;overflow:hidden;">
          <div id="trg_player" style="position:absolute;inset:0;"></div>
          <div style="position:absolute;bottom:0;left:0;right:0;height:40px;" onclick="event.stopPropagation()"></div>
        </div>
        <div class="wl-bar-track" style="margin-top:10px;"><div class="wl-bar-fill" id="trg_fill" style="width:${data.progress.completed?100:pct}%"></div></div>
        <div class="thin-tag" id="trg_pct_label" style="margin-top:4px;">${pct}% watched</div>
        <div id="trg_message"></div>
        <div id="trg_quiz_link"></div>
      </div>
    `;
    initTrainingPlayer(videoId, data);
  });

  return wrap;
}

function initTrainingPlayer(videoId, data){
  var allowedMax = data.progress.maxContiguousSec;
  var completed = data.progress.completed;
  var quizAvailable = data.quizAvailable;
  var durationSec = data.video.durationSec;
  var lastSent = 0;

  if(completed && quizAvailable){
    var linkBox = document.getElementById('trg_quiz_link');
    if(linkBox) linkBox.innerHTML = '<button class="btn btn-primary" style="margin-top:12px;width:100%;justify-content:center;padding:10px;" onclick="goToTraining(\'quiz\',\''+videoId+'\')">Start Quiz</button>';
  }

  function startPlayer(){
    TRAINING_PLAYER = new YT.Player('trg_player', {
      videoId: data.video.youtubeId,
      playerVars: { controls: 0, disablekb: 1, fs: 0, modestbranding: 1, rel: 0, iv_load_policy: 3, enablejsapi: 1 },
      events: {
        onReady: function(){ if(allowedMax > 0) TRAINING_PLAYER.seekTo(allowedMax, true); },
        onStateChange: onTrainingStateChange
      }
    });
  }

  function onTrainingStateChange(e){
    if(e.data === YT.PlayerState.PLAYING){
      clearInterval(TRAINING_POLL_TIMER);
      TRAINING_POLL_TIMER = setInterval(function(){
        var t = TRAINING_PLAYER.getCurrentTime();
        if(Math.abs(t - lastSent) >= 0.5){ lastSent = t; sendTrainingPing('PLAYING'); }
      }, 1500);
    } else if(e.data === YT.PlayerState.PAUSED || e.data === YT.PlayerState.BUFFERING){
      clearInterval(TRAINING_POLL_TIMER);
      sendTrainingPing(e.data === YT.PlayerState.PAUSED ? 'PAUSED' : 'BUFFERING');
    } else if(e.data === YT.PlayerState.ENDED){
      clearInterval(TRAINING_POLL_TIMER);
      sendTrainingPing('ENDED');
    }
  }

  function sendTrainingPing(state){
    var currentTime = TRAINING_PLAYER.getCurrentTime();
    var rate = TRAINING_PLAYER.getPlaybackRate();
    var loadedFraction = TRAINING_PLAYER.getVideoLoadedFraction ? TRAINING_PLAYER.getVideoLoadedFraction() : undefined;

    api('trainingRecordProgress', {videoId: videoId, currentTime: currentTime, playbackRate: rate, playerState: state, loadedFraction: loadedFraction}).then(function(res){
      if(!res.ok) return;
      var r = res.data;
      allowedMax = r.allowedSeekTarget;
      updateTrainingBar();
      if(!r.accepted){
        TRAINING_PLAYER.seekTo(r.allowedSeekTarget, true);
        showTrainingMessage('Skipping is not allowed. Please watch the full video.', 'warn');
      }
      if(r.completed && !completed){
        completed = true;
        showTrainingMessage('Video complete! You can now take the quiz.', 'ok');
        var linkBox = document.getElementById('trg_quiz_link');
        if(linkBox && quizAvailable) linkBox.innerHTML = '<button class="btn btn-primary" style="margin-top:12px;width:100%;justify-content:center;padding:10px;" onclick="goToTraining(\'quiz\',\''+videoId+'\')">Start Quiz</button>';
      }
    });
  }

  function updateTrainingBar(){
    var pct = Math.min(100, Math.round((allowedMax / durationSec) * 100));
    var fill = document.getElementById('trg_fill');
    var label = document.getElementById('trg_pct_label');
    if(fill) fill.style.width = pct + '%';
    if(label) label.textContent = pct + '% watched';
  }

  function showTrainingMessage(text, kind){
    var elBox = document.getElementById('trg_message');
    if(!elBox) return;
    elBox.innerHTML = '<div class="thin-tag" style="margin-top:8px;color:'+(kind==='warn'?'var(--red)':'var(--green)')+';">'+text+'</div>';
    if(kind==='warn') setTimeout(function(){ if(elBox) elBox.innerHTML=''; }, 3000);
  }

  if(window.YT && window.YT.Player){
    startPlayer();
  } else {
    window.onYouTubeIframeAPIReady = startPlayer;
    loadScriptOnce('https://www.youtube.com/iframe_api');
  }
}

// ── Quiz taking ──────────────────────────────────────────────────────────

function buildTrainingQuizView(videoId){
  var wrap = el('<div></div>');
  wrap.innerHTML = `<div class="section-title"><span style="cursor:pointer;color:var(--text-dim);" onclick="goToTraining('catalog')">My Training</span> / Quiz</div>
    <div class="card" id="trg_quiz_card"><div class="empty">Loading...</div></div>`;

  api('getQuizPageData', {videoId: videoId}).then(function(res){
    var card = document.getElementById('trg_quiz_card');
    if(!card) return;
    if(!res.ok){ card.innerHTML = '<div class="empty">Could not load: '+(res.error||'Unknown error')+'</div>'; return; }
    var data = res.data;
    if(data.notReady){
      card.innerHTML = `<div class="empty" style="padding:40px 20px;">
        <div style="font-size:15px;margin-bottom:10px;">${data.reason==='no_quiz' ? "This quiz isn't published yet." : 'You need to finish watching the video before the quiz unlocks.'}</div>
        <button class="btn btn-primary" onclick="goToTraining('video','${videoId}')">Go to video</button>
      </div>`;
      return;
    }
    renderTrainingQuizQuestions(card, videoId, data);
  });

  return wrap;
}

var TRAINING_QUIZ_ANSWERS = {};
var TRAINING_QUIZ_QUESTION_IDS = [];
var TRAINING_QUIZ_SECONDS_LEFT = 0;
var TRAINING_QUIZ_SUBMITTED = false;
var TRAINING_QUIZ_TIMER = null;

function renderTrainingQuizQuestions(card, videoId, data){
  TRAINING_QUIZ_ANSWERS = {};
  TRAINING_QUIZ_QUESTION_IDS = data.questions.map(function(q){ return q.id; });
  TRAINING_QUIZ_SECONDS_LEFT = data.timeLimitSec;
  TRAINING_QUIZ_SUBMITTED = false;
  var startedAt = new Date().toISOString();

  card.innerHTML = `<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;">
      <b>Quiz</b><span class="pill" id="trg_timer" style="background:var(--surface2);font-family:'IBM Plex Mono';">--:--</span>
    </div>
    <div id="trg_quiz_body"></div>
    <button class="btn btn-primary" id="trg_submit_btn" style="width:100%;justify-content:center;padding:10px;margin-top:12px;">Submit Quiz</button>
    <div id="trg_quiz_result"></div>`;

  var body = document.getElementById('trg_quiz_body');
  body.innerHTML = data.questions.map(function(q, i){
    var choicesHtml = '';
    if(q.type === 'MCQ'){
      choicesHtml = (q.choices||[]).map(function(c){
        return `<label class="thin-row" style="cursor:pointer;"><input type="radio" name="${q.id}" value="${c.replace(/"/g,'&quot;')}" onchange="TRAINING_QUIZ_ANSWERS['${q.id}']=this.value" style="margin-right:8px;">${c}</label>`;
      }).join('');
    } else {
      choicesHtml = `<textarea rows="3" style="width:100%;margin-top:6px;" onchange="TRAINING_QUIZ_ANSWERS['${q.id}']=this.value"></textarea>`;
    }
    return `<div class="card" style="margin-bottom:10px;"><div style="font-weight:600;margin-bottom:8px;">${i+1}. ${q.prompt}</div>${choicesHtml}</div>`;
  }).join('');

  document.getElementById('trg_submit_btn').addEventListener('click', function(){
    submitTrainingQuiz(videoId, data.quizId, startedAt);
  });

  clearInterval(TRAINING_QUIZ_TIMER);
  tickTrainingQuizTimer(videoId, data.quizId, startedAt);
}

function tickTrainingQuizTimer(videoId, quizId, startedAt){
  if(TRAINING_QUIZ_SUBMITTED) return;
  TRAINING_QUIZ_SECONDS_LEFT -= 1;
  var mm = String(Math.floor(Math.max(0,TRAINING_QUIZ_SECONDS_LEFT)/60)).padStart(2,'0');
  var ss = String(Math.max(0,TRAINING_QUIZ_SECONDS_LEFT)%60).padStart(2,'0');
  var timerEl = document.getElementById('trg_timer');
  if(timerEl){
    timerEl.textContent = mm+':'+ss;
    if(TRAINING_QUIZ_SECONDS_LEFT <= 30) timerEl.style.color = 'var(--red)';
  }
  if(TRAINING_QUIZ_SECONDS_LEFT <= 0){ submitTrainingQuiz(videoId, quizId, startedAt); return; }
  TRAINING_QUIZ_TIMER = setTimeout(function(){ tickTrainingQuizTimer(videoId, quizId, startedAt); }, 1000);
}

function submitTrainingQuiz(videoId, quizId, startedAt){
  if(TRAINING_QUIZ_SUBMITTED) return;
  TRAINING_QUIZ_SUBMITTED = true;
  clearInterval(TRAINING_QUIZ_TIMER);
  var btn = document.getElementById('trg_submit_btn');
  if(btn){ btn.disabled = true; btn.textContent = 'Submitting...'; }

  api('trainingSubmitQuizAnswers', {videoId: videoId, quizId: quizId, startedAt: startedAt, answers: TRAINING_QUIZ_ANSWERS, questionIds: TRAINING_QUIZ_QUESTION_IDS}).then(function(res){
    if(!res.ok){
      TRAINING_QUIZ_SUBMITTED = false;
      if(btn){ btn.disabled = false; btn.textContent = 'Submit Quiz'; }
      var resultBox = document.getElementById('trg_quiz_result');
      if(String(res.error||'').indexOf('VIDEO_NOT_COMPLETED') > -1){
        if(resultBox) resultBox.innerHTML = '<div class="empty">Video completion could not be verified. Redirecting...</div>';
        setTimeout(function(){ goToTraining('video', videoId); }, 1500);
      } else if(resultBox){
        resultBox.innerHTML = '<div class="empty">Could not submit: '+(res.error||'Unknown error')+'</div>';
      }
      return;
    }
    var r = res.result;
    document.getElementById('trg_quiz_body').style.display = 'none';
    if(btn) btn.style.display = 'none';
    document.getElementById('trg_quiz_result').innerHTML = `<div class="card" style="text-align:center;padding:32px;">
      <div style="font-family:'Space Grotesk';font-size:18px;font-weight:600;">${r.passed ? 'Passed' : 'Not Passed'}</div>
      <div style="font-size:40px;font-weight:700;margin:10px 0;">${r.scorePercent}%</div>
      <button class="btn btn-primary" onclick="goToTraining('catalog')">Back to My Training</button>
    </div>`;
  });
}

// ── Training: Admin ─────────────────────────────────────────────────────

function renderTrainingAdmin(){
  var wrap = el('<div></div>');
  var view = STATE.trainingAdminView || 'list';

  if(view === 'new'){
    wrap.appendChild(buildTrainingAdminNew());
  } else if(view === 'review' && STATE.trainingAdminVideoId){
    wrap.appendChild(buildTrainingAdminReview(STATE.trainingAdminVideoId));
  } else if(view === 'reports'){
    wrap.appendChild(buildTrainingAdminReports());
  } else {
    wrap.appendChild(buildTrainingAdminList());
  }
  return wrap;
}

function goToTrainingAdmin(view, videoId){
  STATE.trainingAdminView = view;
  STATE.trainingAdminVideoId = videoId || null;
  render();
}

function buildTrainingAdminList(){
  var wrap = el('<div></div>');
  wrap.innerHTML = `<div class="section-title">Training Admin
    <button class="btn btn-ghost" style="margin-left:10px" onclick="goToTrainingAdmin('reports')">Reports</button>
    <button class="btn btn-ghost" onclick="goToTrainingAdmin('new')">+ Add Video</button>
  </div>
  <div id="trg_admin_list"><div class="empty">Loading...</div></div>`;

  api('getAdminVideoList', {}).then(function(res){
    var box = document.getElementById('trg_admin_list');
    if(!box) return;
    if(!res.ok){ box.innerHTML = '<div class="empty">Could not load: '+(res.error||'Unknown error')+'</div>'; return; }
    var videos = res.videos || [];
    if(!videos.length){ box.innerHTML = '<div class="empty">No videos yet. Click "+ Add Video" to add your first one.</div>'; return; }
    box.innerHTML = videos.map(function(v){
      var tagsHtml = v.tags
        ? v.tags.split(',').map(function(t){ return '<span class="pill" style="background:var(--surface2);margin-right:4px;">'+t.trim()+'</span>'; }).join('')
        : '<span class="thin-tag">no tags yet</span>';
      var deptOptions = ['','Engineering','Operations','Growth'].map(function(d){
        var label = d || 'Everyone';
        var selected = (v.department==='Everyone' ? '' : v.department) === d ? 'selected' : '';
        return `<option value="${d}" ${selected}>${label}</option>`;
      }).join('');
      return `<div class="card" style="display:flex;gap:14px;align-items:center;margin-bottom:10px;">
        <img src="${v.thumbnailUrl}" style="width:120px;aspect-ratio:16/9;object-fit:cover;border-radius:6px;flex-shrink:0;">
        <div style="flex:1;">
          <div style="font-weight:600;">${v.title}</div>
          <div class="thin-tag" style="margin:4px 0;">${v.status} - ${Math.round(v.durationSec/60)} min - ${v.questionCount} questions${!v.hasTranscript?' - no transcript':''}${v.published?' - <span style="color:var(--green)">published</span>':''}</div>
          <div>${tagsHtml} <span style="color:var(--blue);font-size:11px;cursor:pointer;" onclick="regenerateTrainingTags('${v.id}',this)">regenerate</span></div>
          <div style="margin-top:6px;">
            <label class="thin-tag" style="margin-right:6px;">Assigned to</label>
            <select style="padding:4px 8px;border:1px solid var(--line);border-radius:5px;font-family:inherit;font-size:11.5px;" onchange="setTrainingVideoDept('${v.id}',this.value)">${deptOptions}</select>
          </div>
        </div>
        <button class="btn btn-ghost" onclick="goToTrainingAdmin('review','${v.id}')">Review</button>
      </div>`;
    }).join('');
  });

  return wrap;
}

function setTrainingVideoDept(videoId, department){
  api('trainingSetVideoDepartment', {videoId: videoId, department: department}).then(function(res){
    if(!res.ok){ alert('Could not update: '+(res.error||'Unknown error')); return; }
  });
}

function regenerateTrainingTags(videoId, linkEl){
  linkEl.textContent = 'working...';
  api('trainingRegenerateTags', {videoId: videoId}).then(function(res){
    if(!res.ok){ linkEl.textContent = 'failed'; return; }
    goToTrainingAdmin('list');
  });
}

function buildTrainingAdminNew(){
  var wrap = el('<div></div>');
  wrap.innerHTML = `<div class="section-title"><span style="cursor:pointer;color:var(--text-dim);" onclick="goToTrainingAdmin('list')">Training Admin</span> / Add Video</div>
  <div class="card">
    <div class="thin-tag" style="margin-bottom:10px;">Paste a YouTube URL. This fetches the title, thumbnail, duration, and (if available) captions for quiz generation - and auto-generates topic tags. No manual tagging needed.</div>
    <input type="url" id="trg_new_url" placeholder="https://www.youtube.com/watch?v=..." style="width:100%;padding:9px 12px;border:1px solid var(--line);border-radius:6px;font-family:inherit;margin-bottom:10px;">
    <div class="field"><label>Assign to</label>
      <select id="trg_new_dept" style="width:100%;padding:9px 12px;border:1px solid var(--line);border-radius:6px;font-family:inherit;">
        <option value="">Everyone</option>
        <option value="Engineering">Engineering only</option>
        <option value="Operations">Operations only</option>
        <option value="Growth">Growth only</option>
      </select>
    </div>
    <div id="trg_new_msg"></div>
    <button class="btn btn-primary" id="trg_new_btn" style="width:100%;justify-content:center;padding:10px;">Add Video</button>
  </div>`;

  wrap.querySelector('#trg_new_btn').addEventListener('click', function(){
    var url = document.getElementById('trg_new_url').value.trim();
    if(!url) return;
    var department = document.getElementById('trg_new_dept').value;
    var btn = document.getElementById('trg_new_btn');
    btn.disabled = true; btn.textContent = 'Fetching...';
    document.getElementById('trg_new_msg').innerHTML = '';

    api('trainingAddVideo', {url: url, department: department}).then(function(res){
      if(!res.ok){
        btn.disabled = false; btn.textContent = 'Add Video';
        document.getElementById('trg_new_msg').innerHTML = '<div class="thin-tag" style="color:var(--red);">'+(res.error||'Unknown error')+'</div>';
        return;
      }
      goToTrainingAdmin('list');
    });
  });

  return wrap;
}

var TRG_REVIEW_QUESTIONS = [];

function buildTrainingAdminReview(videoId){
  var wrap = el('<div></div>');
  wrap.innerHTML = `<div class="section-title"><span style="cursor:pointer;color:var(--text-dim);" onclick="goToTrainingAdmin('list')">Training Admin</span> / Review</div>
  <div class="card" id="trg_review_card"><div class="empty">Loading...</div></div>`;

  api('getQuizForReview', {videoId: videoId}).then(function(res){
    var card = document.getElementById('trg_review_card');
    if(!card) return;
    if(!res.ok){ card.innerHTML = '<div class="empty">Could not load: '+(res.error||'Unknown error')+'</div>'; return; }
    var review = res.review;
    card.innerHTML = `<h2 style="font-family:'Space Grotesk';font-size:16px;margin-bottom:12px;">${review.video ? review.video.title : ''}</h2>`;

    if(!review.quiz){
      card.innerHTML += `<div class="thin-tag" style="margin-bottom:10px;">No quiz generated yet.</div>
        <button class="btn btn-primary" id="trg_gen_btn">Generate Quiz</button>
        <div id="trg_review_msg"></div>`;
      wireTrainingGenerate(videoId);
      return;
    }

    TRG_REVIEW_QUESTIONS = review.questions || [];
    var perAttempt = Number(review.quiz.questionsPerAttempt) || 8;
    card.innerHTML += `<div class="thin-tag" style="margin-bottom:10px;">Pool of ${TRG_REVIEW_QUESTIONS.length} questions. Each attempt shows a random subset in a random order, so people who take it more than once (or compare notes) see a different mix each time.</div>
      <div class="field" style="max-width:220px;"><label>Questions shown per attempt</label><input type="number" id="trg_per_attempt" value="${perAttempt}" min="1" max="${TRG_REVIEW_QUESTIONS.length}"></div>
      <div id="trg_review_questions"></div>
      <div style="display:flex;gap:8px;margin-top:14px;flex-wrap:wrap;">
        <button class="btn btn-ghost" id="trg_more_btn">+ Generate More Questions</button>
        <button class="btn btn-ghost" id="trg_gen_btn">Regenerate from transcript (replaces all)</button>
        <button class="btn btn-ghost" id="trg_draft_btn">Save Draft</button>
        <button class="btn btn-primary" id="trg_publish_btn">Save & Publish</button>
      </div>
      <div id="trg_review_msg"></div>`;

    renderTrainingReviewQuestions();
    wireTrainingGenerate(videoId);
    wireTrainingGenerateMore(videoId);
    document.getElementById('trg_draft_btn').addEventListener('click', function(){ saveTrainingQuiz(videoId, false); });
    document.getElementById('trg_publish_btn').addEventListener('click', function(){ saveTrainingQuiz(videoId, true); });
  });

  return wrap;
}

function wireTrainingGenerate(videoId){
  var btn = document.getElementById('trg_gen_btn');
  if(!btn) return;
  btn.addEventListener('click', function(){
    if(!confirm('This replaces the ENTIRE question pool, including any edits you made. Continue?')) return;
    btn.disabled = true; btn.textContent = 'Generating... (may take ~30s)';
    api('trainingGenerateQuiz', {videoId: videoId}).then(function(res){
      if(!res.ok){
        btn.disabled = false; btn.textContent = 'Regenerate from transcript (replaces all)';
        document.getElementById('trg_review_msg').innerHTML = '<div class="thin-tag" style="color:var(--red);">'+(res.error||'Unknown error')+'</div>';
        return;
      }
      goToTrainingAdmin('review', videoId);
    });
  });
}

function wireTrainingGenerateMore(videoId){
  var btn = document.getElementById('trg_more_btn');
  if(!btn) return;
  btn.addEventListener('click', function(){
    btn.disabled = true; btn.textContent = 'Generating... (may take ~30s)';
    api('trainingGenerateMoreQuestions', {videoId: videoId}).then(function(res){
      if(!res.ok){
        btn.disabled = false; btn.textContent = '+ Generate More Questions';
        document.getElementById('trg_review_msg').innerHTML = '<div class="thin-tag" style="color:var(--red);">'+(res.error||'Unknown error')+'</div>';
        return;
      }
      goToTrainingAdmin('review', videoId);
    });
  });
}

function renderTrainingReviewQuestions(){
  var box = document.getElementById('trg_review_questions');
  if(!box) return;
  box.innerHTML = TRG_REVIEW_QUESTIONS.map(function(q, i){
    var choicesHtml = '';
    if(q.type === 'MCQ'){
      choicesHtml = (q.choices||[]).map(function(c, ci){
        return `<input value="${(c||'').replace(/"/g,'&quot;')}" style="margin-top:6px;width:100%;padding:6px 8px;border:1px solid var(--line);border-radius:5px;font-family:inherit;" onchange="TRG_REVIEW_QUESTIONS[${i}].choices[${ci}]=this.value">`;
      }).join('');
    }
    return `<div class="proposal">
      <textarea style="width:100%;margin-bottom:6px;" onchange="TRG_REVIEW_QUESTIONS[${i}].prompt=this.value">${q.prompt}</textarea>
      ${choicesHtml}
      <label class="thin-tag" style="display:block;margin-top:6px;">Correct answer</label>
      <input value="${String(q.correctAnswer||'').replace(/"/g,'&quot;')}" style="width:100%;padding:6px 8px;border:1px solid var(--line);border-radius:5px;font-family:inherit;" onchange="TRG_REVIEW_QUESTIONS[${i}].correctAnswer=this.value">
      <label class="thin-tag" style="display:block;margin-top:6px;">Explanation</label>
      <textarea style="width:100%;" onchange="TRG_REVIEW_QUESTIONS[${i}].explanation=this.value">${q.explanation||''}</textarea>
    </div>`;
  }).join('');
}

function saveTrainingQuiz(videoId, publish){
  document.getElementById('trg_review_msg').innerHTML = '<div class="thin-tag">Saving...</div>';
  var perAttemptEl = document.getElementById('trg_per_attempt');
  var perAttempt = perAttemptEl ? Number(perAttemptEl.value) : undefined;
  api('trainingSaveQuiz', {videoId: videoId, publish: publish, questions: TRG_REVIEW_QUESTIONS, questionsPerAttempt: perAttempt}).then(function(res){
    if(!res.ok){
      document.getElementById('trg_review_msg').innerHTML = '<div class="thin-tag" style="color:var(--red);">'+(res.error||'Unknown error')+'</div>';
      return;
    }
    goToTrainingAdmin('list');
  });
}

function buildTrainingAdminReports(){
  var wrap = el('<div></div>');
  wrap.innerHTML = `<div class="section-title"><span style="cursor:pointer;color:var(--text-dim);" onclick="goToTrainingAdmin('list')">Training Admin</span> / Reports</div>
  <div id="trg_reports_box"><div class="empty">Loading...</div></div>`;

  api('getTrainingReportsData', {}).then(function(res){
    var box = document.getElementById('trg_reports_box');
    if(!box) return;
    if(!res.ok){ box.innerHTML = '<div class="empty">Could not load: '+(res.error||'Unknown error')+'</div>'; return; }
    var data = res.data;
    var perVideoRows = (data.perVideo||[]).map(function(v){
      return `<tr><td>${v.title}</td><td>${v.count}</td><td>${v.avgScore}%</td><td>${v.passRate}%</td></tr>`;
    }).join('') || '<tr><td colspan="4" class="empty">No attempts yet.</td></tr>';
    var recentRows = (data.recent||[]).map(function(a){
      return `<tr><td>${a.userEmail}</td><td>${a.videoTitle}</td><td>${a.scorePercent}%</td><td>${a.passed?'Yes':'No'}</td><td>${Math.round(a.timeTakenSec/60)}m</td><td>${fmtDate(a.submittedAt)}</td></tr>`;
    }).join('') || '<tr><td colspan="6" class="empty">No attempts yet.</td></tr>';

    box.innerHTML = `<div class="card" style="padding:0;margin-bottom:16px;">
        <table><thead><tr><th>Video</th><th>Attempts</th><th>Avg Score</th><th>Pass Rate</th></tr></thead><tbody>${perVideoRows}</tbody></table>
      </div>
      <div class="section-title">Recent Attempts</div>
      <div class="card" style="padding:0;">
        <table><thead><tr><th>User</th><th>Video</th><th>Score</th><th>Passed</th><th>Time</th><th>Date</th></tr></thead><tbody>${recentRows}</tbody></table>
      </div>`;
  });

  return wrap;
}

function fileTypeLabel(mimeType){
  if(!mimeType) return 'File';
  if(mimeType.indexOf('folder')>-1) return 'Folder';
  if(mimeType.indexOf('spreadsheet')>-1) return 'Sheet';
  if(mimeType.indexOf('document')>-1) return 'Doc';
  if(mimeType.indexOf('presentation')>-1) return 'Slides';
  if(mimeType.indexOf('pdf')>-1) return 'PDF';
  if(mimeType.indexOf('image')>-1) return 'Image';
  return 'File';
}

function renderFileManager(){
  var wrap = el('<div></div>');
  if(STATE.fmFolderId){
    wrap.appendChild(buildFileManagerBrowseView(STATE.fmFolderId, STATE.fmFolderName, STATE.fmBreadcrumb || []));
  } else {
    wrap.appendChild(buildFileManagerRootView());
  }
  return wrap;
}

function buildFileManagerRootView(){
  var wrap = el('<div></div>');
  wrap.innerHTML = `<div class="section-title">Files</div>
  <div class="thin-tag" style="margin-bottom:14px;">Browse and open files here - uploading and organizing still happens in Google Drive. Everyone sees General plus their own team's folder; admins see every team's folder.</div>
  <div id="fm_grid" class="stat-grid" style="grid-template-columns:repeat(auto-fit,minmax(200px,1fr));"><div class="empty">Loading...</div></div>`;

  api('getFileManagerData', {}).then(function(res){
    var grid = document.getElementById('fm_grid');
    if(!grid) return;
    if(!res.ok){ grid.innerHTML = '<div class="empty">Could not load: '+(res.error||'Unknown error')+'</div>'; return; }
    var folders = res.folders || [];
    if(!folders.length){ grid.innerHTML = '<div class="empty">No folders yet.</div>'; return; }
    grid.innerHTML = folders.map(function(f){
      return `<div class="card" style="cursor:pointer;" onclick="openFileManagerFolder('${f.id}','${f.name.replace(/'/g,"\\'")}',[])">
        <div class="card-h">${f.name}</div>
        <div class="thin-tag">Open folder</div>
      </div>`;
    }).join('');
  });

  return wrap;
}

function openFileManagerFolder(folderId, folderName, breadcrumb){
  STATE.fmFolderId = folderId;
  STATE.fmFolderName = folderName;
  STATE.fmBreadcrumb = breadcrumb;
  render();
}

function closeFileManagerFolder(){
  STATE.fmFolderId = null;
  STATE.fmFolderName = null;
  STATE.fmBreadcrumb = [];
  render();
}

function buildFileManagerBrowseView(folderId, folderName, breadcrumb){
  var wrap = el('<div></div>');
  var crumbHtml = '<span style="cursor:pointer;color:var(--text-dim);" onclick="closeFileManagerFolder()">Files</span>' +
    breadcrumb.map(function(b){ return ' / <span style="cursor:pointer;color:var(--text-dim);" onclick=\'openFileManagerFolder("'+b.id+'","'+b.name.replace(/'/g,"\\'")+'",'+JSON.stringify(breadcrumb.slice(0,breadcrumb.indexOf(b)))+')\'>'+b.name+'</span>'; }).join('') +
    ' / '+folderName;

  wrap.innerHTML = `<div class="section-title">${crumbHtml}</div>
  <div id="fm_browse_box"><div class="empty">Loading...</div></div>`;

  api('listDriveFolderContents', {folderId: folderId}).then(function(res){
    var box = document.getElementById('fm_browse_box');
    if(!box) return;
    if(!res.ok){ box.innerHTML = '<div class="empty">Could not load: '+(res.error||'Unknown error')+'</div>'; return; }

    var newCrumb = breadcrumb.concat([{id: folderId, name: folderName}]);
    var subfolderCards = (res.subfolders||[]).map(function(sf){
      return `<div class="card" style="cursor:pointer;" onclick='openFileManagerFolder("${sf.id}","${sf.name.replace(/'/g,"\\'")}",${JSON.stringify(newCrumb)})'>
        <div class="card-h">${sf.name}</div>
        <div class="thin-tag">Folder</div>
      </div>`;
    }).join('');

    var fileRows = (res.files||[]).length ? res.files.map(function(f){
      return `<div class="thin-row"><a href="${f.url}" target="_blank" class="thin-title" style="color:var(--text);">${f.name}</a><span class="thin-tag">${fileTypeLabel(f.mimeType)}</span></div>`;
    }).join('') : '<div class="empty">No files in this folder yet.</div>';

    box.innerHTML =
      (subfolderCards ? '<div class="stat-grid" style="grid-template-columns:repeat(auto-fit,minmax(200px,1fr));margin-bottom:14px;">'+subfolderCards+'</div>' : '') +
      '<div class="card">'+fileRows+'</div>' +
      '<a href="'+res.folderUrl+'" target="_blank" class="btn btn-ghost" style="margin-top:12px;text-decoration:none;display:inline-flex;">Open this folder in Drive to upload</a>';
  });

  return wrap;
}

var TRIGGER_LABELS = {
  welcome:'Welcome', assigned:'New Ticket', blocked:'Blocked', review:'Review', uat_fail:'UAT Fail',
  lead_assigned:'CRM', lead_declined:'CRM', lead_won:'CRM', lead_reassigned:'CRM', lead_followup:'CRM Follow-up',
  content_assigned:'Content', content_scheduled:'Content', content_published:'Content', content_weekly_pool:'Content',
  payroll_paid:'Payroll', payroll_reminder:'Payroll', leave_request:'Leave', leave_decision:'Leave',
  meeting_invite:'Meetings', news_digest:'Industry News', test:'Test'
};
function notifChannelLabel(triggerType){ return TRIGGER_LABELS[triggerType] || 'Other'; }

function fetchMyNotifications(){
  return api('getMyNotifications', {}).then(function(res){
    if(!res.ok) return {notifications:[], grouped:{}};
    return res;
  });
}

function renderNotifications(){
  var wrap = el('<div></div>');
  wrap.innerHTML = `<div class="section-title">Notifications</div>
  <div class="card">
    <div class="thin-tag" style="margin-bottom:10px;">Private Slack DMs fire from Apps Script, grouped below by what triggered them (Payroll, Tickets, UAT, CRM, Content, Meetings, ...). Configure SLACK_BOT_TOKEN in Script Properties to activate - each person also needs their Slack Member ID saved in the Team tab.</div>
    <button class="btn btn-ghost" onclick="sendTestDM()">Send Test DM to Myself</button>
    <div id="notifLog" style="margin-top:14px;">Loading...</div>
  </div>`;
  var box = wrap.querySelector('#notifLog');
  fetchMyNotifications().then(function(res){
    var grouped = res.grouped || {};
    var keys = Object.keys(grouped);
    if(!keys.length){ box.innerHTML = '<div class="empty">No notifications yet.</div>'; return; }
    box.innerHTML = keys.map(function(k){
      return `<div class="dept-block"><div class="dept-h">${notifChannelLabel(k)}</div>` +
        grouped[k].map(function(n){ return `<div class="thin-row"><span class="thin-title">${n.message}</span><span class="thin-tag">${fmtDateTime(n.timestamp)}</span></div>`; }).join('') +
      '</div>';
    }).join('');
  });
  return wrap;
}

function toggleNotifBell(){
  var dd = document.getElementById('notifDropdown');
  var opening = !dd.classList.contains('open');
  if(!opening){ dd.classList.remove('open'); return; }
  dd.innerHTML = '<div class="search-result-item" style="color:var(--text-faint);">Loading...</div>';
  dd.classList.add('open');
  fetchMyNotifications().then(function(res){
    var mine = res.notifications || [];
    if(!mine.length){ dd.innerHTML = '<div class="search-result-item" style="color:var(--text-faint);">No notifications yet.</div>'; return; }
    var lastGroup = '';
    dd.innerHTML = mine.slice(0,15).map(function(n){
      var g = notifChannelLabel(n.trigger_type);
      var groupHtml = g !== lastGroup ? '<div class="search-result-group">'+g+'</div>' : '';
      lastGroup = g;
      return groupHtml + '<div class="search-result-item" style="display:block;"><div>'+n.message+'</div><div class="thin-tag">'+fmtDateTime(n.timestamp)+'</div></div>';
    }).join('');
  });
}

function refreshNotifBadge(){
  fetchMyNotifications().then(function(res){
    var count = (res.notifications||[]).length;
    var badge = document.getElementById('notifBadge');
    if(!badge) return;
    if(count>0){ badge.textContent = count>9 ? '9+' : String(count); badge.classList.remove('hidden'); }
    else badge.classList.add('hidden');
  });
}
document.addEventListener('click', function(e){
  if(!e.target.closest('.notif-bell-wrap')){ var dd=document.getElementById('notifDropdown'); if(dd) dd.classList.remove('open'); }
});

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
  document.getElementById('f_system').value='';
  document.getElementById('f_ai_hint').textContent='';
  populateSelects();
  if(document.getElementById('f_template')) document.getElementById('f_template').value='';
  toggleParentPicker();
  openModal('ticketModalBg');
}

function toggleParentPicker(){
  var type = document.getElementById('f_type').value;
  var system = document.getElementById('f_system').value;
  var wrap = document.getElementById('f_parent_wrap');
  var sel = document.getElementById('f_parent');
  var needsParent = (type==='Task' || type==='Bug');
  wrap.style.display = needsParent ? '' : 'none';
  if(!needsParent) return;
  var parents = DB.tickets.filter(function(t){ return (t.type==='Direction'||t.type==='Feature') && (!system || t.system===system); });
  sel.innerHTML = '<option value="">None</option>' + parents.map(function(p){return `<option value="${p.ticket_id}">${p.title}</option>`;}).join('');
}

// AI-driven feature: turns a rough free-text description into suggested
// type/system/priority/parent before the ticket is even created, so
// someone reporting a bug doesn't have to classify their own report.
function aiTriageFromDescription(){
  var desc = document.getElementById('f_desc').value;
  if(!desc.trim()){ alert('Describe the bug or task first.'); return; }
  var hint = document.getElementById('f_ai_hint');
  hint.textContent = 'Asking Claude...';
  api('aiTriageTicket', {description: desc}).then(function(res){
    if(!res.ok){ hint.textContent = 'Could not get a suggestion: ' + (res.error||'Unknown error'); return; }
    var s = res.suggestion || {};
    if(s.title) document.getElementById('f_title').value = s.title;
    if(s.type) document.getElementById('f_type').value = s.type;
    if(s.system) document.getElementById('f_system').value = s.system;
    if(s.priority) document.getElementById('f_prio').value = s.priority;
    toggleParentPicker();
    if(s.parent_ticket_id) document.getElementById('f_parent').value = s.parent_ticket_id;
    hint.textContent = s.rationale ? ('Claude: ' + s.rationale) : 'Suggestion applied - review before saving.';
  });
}

function saveTicket(){
  var type = document.getElementById('f_type').value;
  var payload = {
    title: document.getElementById('f_title').value || 'Untitled Ticket',
    description: document.getElementById('f_desc').value,
    type: type,
    department: document.getElementById('f_dept').value,
    system: document.getElementById('f_system') ? document.getElementById('f_system').value : '',
    parent_ticket_id: (document.getElementById('f_parent') && (type==='Task'||type==='Bug')) ? document.getElementById('f_parent').value : '',
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
          ${['Direction','Feature','Task','Bug','Idea','Incident','Customer Request','Growth','Documentation','Research','Deployment'].map(function(ty){return `<option ${ty===t.type?'selected':''}>${ty}</option>`;}).join('')}
        </select>
      </div>
      <div class="field"><label>Department</label>
        <select id="d_dept" onchange="changeTicketField('${id}','department',this.value)">
          ${['Engineering','Operations','Growth'].map(function(dp){return `<option ${dp===t.department?'selected':''}>${dp}</option>`;}).join('')}
        </select>
      </div>
    </div>
    <div class="row2">
      <div class="field"><label>System</label>
        <select id="d_system" onchange="changeTicketField('${id}','system',this.value)">
          ${['','Mobile App','PMD','OTG','Super Admin'].map(function(s){return `<option value="${s}" ${s===(t.system||'')?'selected':''}>${s||'-'}</option>`;}).join('')}
        </select>
      </div>
      <div class="field"><label>Tied to (Direction/Feature)</label>
        <select id="d_parent" onchange="changeTicketField('${id}','parent_ticket_id',this.value)">
          <option value="">None</option>
          ${DB.tickets.filter(function(p){return (p.type==='Direction'||p.type==='Feature') && p.ticket_id!==id;}).map(function(p){return `<option value="${p.ticket_id}" ${p.ticket_id===t.parent_ticket_id?'selected':''}>${p.title}</option>`;}).join('')}
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
    <div style="display:flex;gap:12px;font-size:12px;color:var(--text-dim);margin-top:4px;flex-wrap:wrap;">
      <span><b>Reporter:</b> ${t.reporter}</span>
      ${t.source==='UAT' ? '<span class="pill" style="background:var(--red-bg);color:var(--red);">From UAT fail</span>' : ''}
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
  refreshNotifBadge();
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
  ensureShell();
  restoreSidebarCollapse();
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
      DB.testCases = res.data.testCases || [];
      DB.leads = res.data.leads || [];
      DB.contentCalendar = res.data.contentCalendar || [];
      DB.payroll = res.data.payroll || [];
      DB.financeEntries = res.data.financeEntries || [];
      DB.leave = res.data.leave || [];
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
