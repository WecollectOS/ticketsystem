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
        <select id="cf_platform"><option>LinkedIn</option><option>Instagram</option><option>Facebook</option><option>Twitter/X</option><option>Newsletter</option><option>Webinar</option><option>Blog</option></select>
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
      newLabel:(canEditMod('crm')?'+ New prospect':''), onNew:'openNewLead()', emptyMsg:'No prospects match these filters.',
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
      newLabel:(canEditMod('uat')?'+ New test case':''), onNew:'openNewTestCase()', emptyMsg:'No test cases match these filters.',
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
      extraButtons: isAdminUser() ? '<button class="btn btn-ghost" onclick="runContentPoolNowClick()">Run weekly pool now</button>' : '',
      stages: CONTENT_STAGES.map(function(s){ return {id:s, color:CONTENT_STAGE_COLOR[s]}; }),
      items:function(){ return DB.contentCalendar; },
      stageOf:function(c){ return c.stage; },
      filters:[
        {key:'platform', all:'All platforms', opts:function(){ return ['LinkedIn','Instagram','Facebook','Twitter/X','Newsletter','Webinar','Blog']; }, get:function(c){ return c.platform; }},
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
function renderCrm(){ return renderBoardPage('crm'); }

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


function visibleTickets(){
  return DB.tickets.filter(function(t){ return t.source !== 'OneOnOne'; });
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



// ── Finance (Admin only) ─────────────────────────────────────────────────

// ── Leave ────────────────────────────────────────────────────────────────

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


var NEW_PROJECT_DEPTS = [];







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

// ═══════════════════════════════════════════════════════════════════════
//  v2 FRONTEND — approved design (light sidebar, Space Grotesk / Work Sans,
//  indigo), shared helpers, navigation, stale-backend banner, dashboard.
//  Everything below overrides same-named earlier functions on purpose.
// ═══════════════════════════════════════════════════════════════════════
var EXPECTED_BACKEND = '2026.10.08-1';

var DESIGN_CSS = `
:root{--paper:#F7F8FC;--surface:#FFFFFF;--surface2:#F3F4FA;--line:#E3E5EE;--text:#14161F;--text-dim:#5B5F73;--text-faint:#9397AC;
  --brand:#4C50E3;--brand-hover:#3A3DC0;--brand-bg:#EEF0FD;--green:#1F9254;--green-bg:#E7F6ED;--amber:#B9770E;--amber-bg:#FBF0DE;--red:#D14343;--red-bg:#FBE8E8;
  --radius:14px;--shadow:0 1px 2px rgba(20,22,31,.05),0 4px 14px rgba(20,22,31,.05);}
body,input,select,textarea,button{font-family:'Work Sans',system-ui,sans-serif !important;}
h1,h2,h3,.disp,.page-title,.section-title,.card-h,.stat-num,.brand-name,.modal-h h2{font-family:'Space Grotesk',sans-serif !important;}
body{background:var(--paper);}
#sidebar{--on-ink:#14161F;--on-ink-dim:#5B5F73;--line2:#EEF0FD;background:#fff !important;border-right:1px solid var(--line);width:260px;color:var(--text);}
#sidebar.collapsed{width:72px;}
#sidebar .brand{height:auto;padding:16px 16px 14px;border-bottom:1px solid var(--line);gap:10px;}
#sidebar .brand-mark{width:36px;height:36px;border-radius:10px;background:var(--brand);color:#fff;font-family:'Space Grotesk';font-weight:700;font-size:15px;}
#sidebar .brand-name{font-size:14px;font-weight:600;color:var(--text);line-height:1.2;}
#sidebar .brand-sub{display:block;font-size:11px;color:var(--text-faint);letter-spacing:0;text-transform:none;margin:0;}
#sidebar .greet{display:none;}
#sidebar nav{padding:4px 0 10px;}
#sidebar .nav-label{padding:16px 20px 6px;font-size:10.5px;font-weight:600;letter-spacing:.08em;color:var(--text-faint);}
#sidebar .nav-item{border-radius:0;padding:9px 20px;font-size:13.5px;font-weight:500;color:var(--text-dim);gap:10px;}
#sidebar .nav-item:hover{background:#F6F7FD;color:var(--text);}
#sidebar .nav-item.active{background:var(--brand-bg);color:var(--brand);font-weight:600;border-right:2px solid var(--brand);}
#sidebar .nav-item.active::before{display:none;}
#sidebar .nav-ico{opacity:.8;display:inline-flex;}
#sidebar .nav-badge{margin-left:auto;background:var(--brand);color:#fff;border-radius:20px;font-size:10px;padding:1px 7px;font-weight:600;}
#sidebar.collapsed .nav-item{justify-content:center;padding:11px 0;}
#sidebar.collapsed .nav-badge{display:none;}
#sidebar .sidebar-foot{border-top:1px solid var(--line);padding:12px 16px;color:var(--text);}
#sidebar .avatar{width:30px;height:30px;background:var(--brand-bg);color:var(--brand);font-weight:600;font-size:12px;}
#footLabel{font-size:12.5px;font-weight:600;line-height:1.25;}
#footLabel small{display:block;font-weight:400;color:var(--text-faint);font-size:11px;}
#topbar{height:68px;padding:0 28px;background:#fff;}
#topbar .page-title{font-size:19px;font-weight:600;line-height:1.15;}
#topbar .page-sub{font-size:12px;color:var(--text-faint);font-weight:400;font-family:'Work Sans',sans-serif;margin-top:2px;}
.search-input{border-radius:10px;background:var(--surface2);}
#content{padding:26px 32px 70px;}
.card{border-radius:14px;box-shadow:none;}
.btn{border-radius:9px;padding:9px 16px;font-size:13px;font-weight:600;}
.btn-ghost{background:#fff;border:1px solid var(--line);}
.btn-sm{padding:5px 10px;font-size:12px;border-radius:7px;}
.btn-danger{background:var(--red-bg);color:var(--red);border:none;}
.btn-good{background:var(--green-bg);color:var(--green);border:none;}
.btn[disabled]{opacity:.55;cursor:not-allowed;}
.pill{border-radius:999px;font-weight:600;padding:3px 10px;font-size:11.5px;}
.pill.good{background:var(--green-bg);color:var(--green);} .pill.warn{background:var(--amber-bg);color:var(--amber);}
.pill.bad{background:var(--red-bg);color:var(--red);} .pill.info{background:var(--brand-bg);color:var(--brand);} .pill.mute{background:var(--surface2);color:var(--text-dim);}
.stat-card{border-radius:14px;padding:16px 18px;}
.stat-card .stat-lbl{order:-1;text-transform:uppercase;font-size:11.5px;font-weight:600;letter-spacing:.02em;color:var(--text-faint);margin:0 0 4px;}
.stat-card{display:flex;flex-direction:column;}
.stat-sub{font-size:12px;color:var(--text-faint);margin-top:2px;}
.stat-sub.good{color:var(--green);} .stat-sub.warn{color:var(--amber);} .stat-sub.bad{color:var(--red);}
.wc-head{display:flex;align-items:flex-start;gap:12px;flex-wrap:wrap;margin-bottom:18px;}
.wc-head h2{font-size:20px;font-weight:600;}
.wc-head .sub{font-size:12.5px;color:var(--text-dim);margin-top:3px;max-width:680px;}
.wc-head .actions{margin-left:auto;display:flex;gap:8px;flex-wrap:wrap;}
.wc-tabs{display:flex;gap:4px;border-bottom:1px solid var(--line);margin-bottom:16px;overflow-x:auto;}
.wc-tab{padding:9px 14px;font-size:13px;font-weight:600;color:var(--text-dim);cursor:pointer;border-bottom:2px solid transparent;white-space:nowrap;}
.wc-tab:hover{color:var(--text);} .wc-tab.on{color:var(--brand);border-bottom-color:var(--brand);}
.wc-tab .n{background:var(--surface2);border-radius:20px;padding:0 7px;font-size:10.5px;margin-left:4px;}
.wc-tab.on .n{background:var(--brand-bg);}
.wc-grid{display:grid;gap:14px;}
.g2{grid-template-columns:repeat(2,minmax(0,1fr));} .g3{grid-template-columns:repeat(3,minmax(0,1fr));} .g4{grid-template-columns:repeat(4,minmax(0,1fr));}
.wc-seg{display:inline-flex;border:1px solid var(--line);border-radius:10px;overflow:hidden;background:#fff;}
.wc-seg button{border:none;background:#fff;padding:8px 16px;font-size:13px;font-weight:600;color:var(--text-dim);cursor:pointer;}
.wc-seg button.on{background:var(--brand);color:#fff;}
.wc-table{width:100%;border-collapse:collapse;font-size:12.5px;}
.wc-table th{position:sticky;top:0;background:#fff;text-align:left;font-size:10.5px;text-transform:uppercase;letter-spacing:.05em;color:var(--text-faint);padding:9px 10px;border-bottom:1px solid var(--line);white-space:nowrap;}
.wc-table td{padding:9px 10px;border-bottom:1px solid #F0F1F7;vertical-align:top;}
.wc-table tr:hover td{background:#FAFAFE;}
.wc-scroll{overflow-x:auto;}
.wc-note{background:var(--brand-bg);border-radius:10px;padding:10px 14px;font-size:12.5px;color:var(--text-dim);}
.wc-note.warn{background:var(--amber-bg);color:#6b4a0a;} .wc-note.bad{background:var(--red-bg);color:#8a2b2b;} .wc-note.good{background:var(--green-bg);color:#14633a;}
.wc-bar{height:8px;background:var(--surface2);border-radius:20px;overflow:hidden;} .wc-bar>i{display:block;height:100%;background:var(--brand);border-radius:20px;}
.wc-bar.good>i{background:var(--green);} .wc-bar.bad>i{background:var(--red);}
.wc-check{width:18px;height:18px;border-radius:5px;border:1.5px solid #C9CCDC;display:inline-flex;align-items:center;justify-content:center;cursor:pointer;flex-shrink:0;background:#fff;color:#fff;font-size:12px;}
.wc-check.on{background:var(--brand);border-color:var(--brand);}
.wc-check.lock{opacity:.4;cursor:not-allowed;}
.wc-row{display:flex;align-items:center;gap:10px;padding:9px 0;border-bottom:1px solid #F1F2F7;font-size:13px;}
.wc-row:last-child{border-bottom:none;}
.wc-muted{color:var(--text-faint);font-size:12px;}
.wc-modal-bg{position:fixed;inset:0;background:rgba(20,22,31,.5);display:none;align-items:center;justify-content:center;z-index:60;padding:14px;}
.wc-modal-bg.open{display:flex;}
.wc-modal{background:#fff;border-radius:16px;width:640px;max-width:100%;max-height:92vh;overflow-y:auto;padding:22px 24px;}
.wc-modal.wide{width:960px;}
.wc-modal .mh{display:flex;align-items:center;margin-bottom:14px;gap:10px;} .wc-modal .mh h2{font-size:17px;}
.wc-modal .mh .x{margin-left:auto;border:none;background:none;font-size:22px;color:var(--text-faint);cursor:pointer;line-height:1;}
.wc-toast{position:fixed;left:50%;bottom:86px;transform:translateX(-50%);background:#14161F;color:#fff;padding:10px 16px;border-radius:10px;font-size:13px;z-index:200;max-width:92vw;box-shadow:0 8px 24px rgba(0,0,0,.25);}
.wc-toast.bad{background:var(--red);}
#wcBanner{background:#FFF4E5;border-bottom:1px solid #F3C98B;color:#6b4a0a;padding:12px 28px;font-size:13px;display:none;}
#wcBanner.show{display:block;} #wcBanner b{color:#4a3206;} #wcBanner ol{margin:6px 0 0 18px;} #wcBanner code{background:#fff;padding:1px 5px;border-radius:4px;}
.wc-input,.wc-sel,.wc-ta{width:100%;padding:8px 10px;border:1px solid var(--line);border-radius:8px;font-size:13px;outline:none;background:#fff;}
.wc-input:focus,.wc-sel:focus,.wc-ta:focus{border-color:var(--brand);}
.wc-ta{min-height:70px;resize:vertical;}
.wc-lbl{display:block;font-size:11px;font-weight:600;color:var(--text-dim);text-transform:uppercase;letter-spacing:.04em;margin:0 0 4px;}
.wc-f{margin-bottom:12px;}
.wc-help{font-size:11.5px;color:var(--text-faint);margin-top:3px;}
.wc-chip{display:inline-block;padding:4px 10px;border-radius:999px;font-size:12px;background:var(--surface2);cursor:pointer;user-select:none;margin:0 4px 4px 0;}
.wc-chip.on{background:var(--brand);color:#fff;}
.wc-kind{border:2px solid var(--line);border-radius:14px;padding:16px;cursor:pointer;flex:1 1 240px;background:#fff;}
.wc-kind.on{border-color:var(--brand);background:var(--brand-bg);} .wc-kind b{display:block;font-family:'Space Grotesk';font-size:15px;margin-bottom:4px;}
.wc-steps{counter-reset:s;} .wc-steps li{margin:6px 0;}
.wc-phase{border:1px solid var(--line);border-radius:14px;background:#fff;margin-bottom:12px;overflow:hidden;}
.wc-phase-h{display:flex;align-items:center;gap:10px;padding:12px 16px;cursor:pointer;background:#FBFBFE;}
.wc-phase-h b{font-family:'Space Grotesk';font-size:14px;}
.wc-phase.locked .wc-phase-h{opacity:.6;}
.wc-task{display:flex;align-items:center;gap:10px;padding:8px 16px;border-top:1px solid #F1F2F7;font-size:13px;}
.wc-task .t{flex:1;min-width:0;} .wc-task.done .t{text-decoration:line-through;color:var(--text-faint);}
.wc-task .who{font-size:11.5px;color:var(--text-dim);white-space:nowrap;}
.wc-task .due{font-size:11.5px;color:var(--text-faint);white-space:nowrap;}
.wc-task .due.late{color:var(--red);font-weight:600;}
.wc-subh{padding:6px 16px;background:#F7F8FC;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:var(--text-dim);border-top:1px solid #F1F2F7;}
.uat-case{border:1px solid var(--line);border-radius:14px;background:#fff;padding:18px 20px;}
.uat-case ol{margin:6px 0 0 18px;font-size:13px;line-height:1.6;}
.res-btn{padding:10px 18px;border-radius:10px;border:1.5px solid var(--line);background:#fff;font-weight:600;cursor:pointer;font-size:13.5px;}
.res-btn.pass:hover,.res-btn.pass.on{background:var(--green-bg);border-color:var(--green);color:var(--green);}
.res-btn.fail:hover,.res-btn.fail.on{background:var(--red-bg);border-color:var(--red);color:var(--red);}
.res-btn.block:hover,.res-btn.block.on{background:var(--amber-bg);border-color:var(--amber);color:var(--amber);}
.res-btn.skip:hover,.res-btn.skip.on{background:var(--surface2);border-color:var(--text-faint);}
#loginScreen{background:#F7F8FC !important;}
#loginScreen .login-title{color:var(--text) !important;} #loginScreen .login-sub,#loginScreen .login-loading{color:var(--text-dim) !important;}
#loginScreen .login-person{background:#fff !important;border:1px solid var(--line) !important;} #loginScreen .login-person-name{color:var(--text) !important;} #loginScreen .login-person-role{color:var(--text-faint) !important;}
#loginScreen .login-avatar{background:var(--brand-bg) !important;color:var(--brand) !important;}
#loginScreen .login-mark{background:var(--brand);}
.modal-bg,.wc-modal-bg{z-index:80;}
@media (max-width:900px){.g3,.g4{grid-template-columns:repeat(2,minmax(0,1fr));}}
@media (max-width:760px){
  #content{padding:16px 14px 90px !important;} #topbar{padding:0 14px !important;height:60px;}
  .g2,.g3,.g4{grid-template-columns:minmax(0,1fr);} .g4.keep2{grid-template-columns:repeat(2,minmax(0,1fr));}
  .wc-head .actions{margin-left:0;} .wc-modal{padding:18px 16px;border-radius:14px;} #wcBanner{padding:10px 14px;}
  #mobileNav{background:#fff !important;border-top:1px solid var(--line);} .mn-item{color:var(--text-faint) !important;} .mn-item.active{color:var(--brand) !important;font-weight:600;}
  #topbar .btn-primary{padding:7px 10px;font-size:12px;} #pageSub{display:none;} #topbar .page-title{font-size:16px;}
  .wc-task{flex-wrap:wrap;} .wc-seg button{padding:8px 10px;}
}
`;

function installDesign(){
  try {
    if(!document.getElementById('wcFonts')){
      var lk = document.createElement('link'); lk.id = 'wcFonts'; lk.rel = 'stylesheet';
      lk.href = 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Work+Sans:wght@400;500;600&display=swap';
      document.head.appendChild(lk);
    }
    var st = document.getElementById('wcDesignCss');
    if(!st){ st = document.createElement('style'); st.id = 'wcDesignCss'; document.head.appendChild(st); }
    st.textContent = DESIGN_CSS;                      // appended last so it wins over Index.html + SHELL_CSS
    var tc = document.querySelector('meta[name=theme-color]'); if(tc) tc.content = '#4C50E3';
    var bm = document.querySelector('#sidebar .brand-mark');
    if(bm && !bm.getAttribute('data-we')){ bm.setAttribute('data-we','1'); var im = bm.querySelector('img'); if(im){ im.onerror = null; } bm.textContent = 'we'; }
    var bn = document.querySelector('#sidebar .brand-name');
    if(bn){ bn.innerHTML = 'WeCollect OS<span class="brand-sub">Internal Operations</span>'; }
    var sub = document.querySelector('#sidebar .brand .brand-sub:not(.brand-name .brand-sub)'); if(sub && sub.parentNode.className==='brand') sub.remove();
    var main = document.getElementById('main');
    if(main && !document.getElementById('wcBanner')){
      var b = document.createElement('div'); b.id = 'wcBanner'; main.insertBefore(b, main.firstChild);
    }
    var tb = document.getElementById('topbar'), pt = document.getElementById('pageTitle');
    if(tb && pt && !document.getElementById('pageSub')){
      var box = document.createElement('div'); box.id = 'pageTitleBox'; pt.parentNode.insertBefore(box, pt); box.appendChild(pt);
      var ps = document.createElement('div'); ps.id = 'pageSub'; ps.className = 'page-sub'; box.appendChild(ps);
    }
  } catch(e){ if(window.console) console.error('installDesign', e); }
}

// ── generic helpers ─────────────────────────────────────────────────────
function esc(s){ return bpEsc(s); }
function isAdminUser(){ var a = DB.access; return a ? !!a.priv : (CURRENT_USER_ROLE === 'Admin' || CURRENT_USER_ROLE === 'Leadership'); }
function isCoreAdmin(){ var a = DB.access; return a ? !!a.core : CURRENT_USER_ROLE === 'Admin'; }
function canSee(id){ var a = DB.access; return !(a && a.denied && a.denied.indexOf(id) > -1); }
function today10(){ return new Date().toISOString().slice(0,10); }
function money(n, cur){
  var v = Number(n); if(isNaN(v)) v = 0;
  var sym = (cur||'NGN')==='NGN' ? '₦' : (cur==='USD' ? '$' : (cur==='GBP' ? '£' : (cur==='EUR' ? '€' : (cur||'')+' ')));
  return (v<0?'-':'') + sym + Math.abs(v).toLocaleString('en-US',{maximumFractionDigits:2});
}
function pill(text, tone){ return '<span class="pill '+(tone||'mute')+'">'+esc(text)+'</span>'; }
function parseJson(s, d){ try { var v = JSON.parse(s||''); return v==null ? d : v; } catch(e){ return d; } }
function teamNames(){ return DB.team.map(function(p){ return p.name; }); }
function optionsHtml(list, sel, blank){
  return (blank!==undefined ? '<option value="">'+esc(blank)+'</option>' : '') + list.map(function(v){
    var val = typeof v==='object' ? v.value : v, lab = typeof v==='object' ? v.label : v;
    return '<option value="'+esc(val)+'"'+(String(val)===String(sel)?' selected':'')+'>'+esc(lab)+'</option>';
  }).join('');
}
function fld(label, inner, help){ return '<div class="wc-f"><label class="wc-lbl">'+label+'</label>'+inner+(help?'<div class="wc-help">'+help+'</div>':'')+'</div>'; }
function inp(id, val, type, ph, extra){ return '<input class="wc-input" id="'+id+'" type="'+(type||'text')+'" value="'+esc(val==null?'':val)+'"'+(ph?' placeholder="'+esc(ph)+'"':'')+(extra||'')+'>'; }
function sel(id, list, val, blank, extra){ return '<select class="wc-sel" id="'+id+'"'+(extra||'')+'>'+optionsHtml(list, val, blank)+'</select>'; }
function ta(id, val, ph, rows){ return '<textarea class="wc-ta" id="'+id+'"'+(ph?' placeholder="'+esc(ph)+'"':'')+(rows?' style="min-height:'+rows*22+'px"':'')+'>'+esc(val||'')+'</textarea>'; }
function val(id){ var e = document.getElementById(id); return e ? e.value : ''; }
function wcHead(title, sub, actionsHtml){
  return '<div class="wc-head"><div><h2>'+title+'</h2>'+(sub?'<div class="sub">'+sub+'</div>':'')+'</div>'+(actionsHtml?'<div class="actions">'+actionsHtml+'</div>':'')+'</div>';
}
function wcPage(html){ var w = document.createElement('div'); w.innerHTML = html; return w; }

function wcModal(id, title, html, wide){
  var bg = document.getElementById('wcm_'+id);
  if(!bg){ bg = document.createElement('div'); bg.id = 'wcm_'+id; bg.className = 'wc-modal-bg'; document.body.appendChild(bg); }
  bg.innerHTML = '<div class="wc-modal'+(wide?' wide':'')+'"><div class="mh"><h2>'+title+'</h2><button class="x" onclick="wcClose(\''+id+'\')" aria-label="Close">×</button></div>'+html+'</div>';
  bg.classList.add('open');
  return bg;
}
function wcClose(id){ var bg = document.getElementById('wcm_'+id); if(bg) bg.classList.remove('open'); }
function wcToast(msg, bad){
  Array.prototype.slice.call(document.querySelectorAll('.wc-toast')).forEach(function(o){ o.parentNode.removeChild(o); });
  var t = document.createElement('div'); t.className = 'wc-toast'+(bad?' bad':''); t.textContent = msg; document.body.appendChild(t);
  setTimeout(function(){ if(t.parentNode) t.parentNode.removeChild(t); }, bad ? 6000 : 3200);
}
function wcFail(prefix, res){ wcToast(prefix + ': ' + ((res && res.error) || 'unknown error'), true); }

// Re-read everything from the backend (after multi-table actions) and repaint.
function applyAll(d){
  d = d || {};
  var keys = ['tickets','activities','meetings','decisions','projects','projectTasks','projectAgents','team','templates','oneOnOnes','testCases','uatRuns','uatRunItems','leads','clients','documents','contentMetrics','contentCalendar','opportunities','payroll','financeEntries','leave','timeOff','slackCategories'];
  keys.forEach(function(k){ DB[k] = d[k] || []; });
  DB.config = d.config || {};
  DB.access = d.access || null;
  DB.backend_version = d.backend_version || '';
  checkBackendVersion();
}
function refreshData(thenRender, fresh){
  if(!WORKSPACE_MODE){ if(thenRender!==false) render(); return Promise.resolve(); }
  return api('getAll', fresh?{fresh:true}:{}).then(function(res){ if(res.ok) applyAll(res.data); if(thenRender!==false) render(); });
}

// ── stale deployment detection ──────────────────────────────────────────
function showStaleBanner(detail){
  var b = document.getElementById('wcBanner'); if(!b) return;
  b.className = 'show';
  b.innerHTML = '<b>The backend (Code.gs) is older than this page.</b> '+esc(detail||'')+
    '<ol><li>Apps Script → paste the latest <code>apps-script.js</code> into Code.gs and the latest <code>appsscript.json</code> (View → Show manifest).</li>'+
    '<li><b>Deploy → Manage deployments → ✏️ Edit → Version: New version → Deploy</b> (saving the file alone does not update the live web app).</li>'+
    '<li>Reload this page with Ctrl+Shift+R. Admins: open Settings and press <b>Check setup</b>.</li></ol>';
}
function checkBackendVersion(){
  if(!WORKSPACE_MODE) return;
  var b = document.getElementById('wcBanner'); if(!b) return;
  if(DB.backend_version !== EXPECTED_BACKEND){
    showStaleBanner(DB.backend_version ? ('Live backend is "'+DB.backend_version+'", this page expects "'+EXPECTED_BACKEND+'".') : 'The live backend does not report a version, so it is a pre-update copy.');
  } else { b.className = ''; b.innerHTML = ''; }
}
var __apiRaw = api;
api = function(action, payload){
  return __apiRaw(action, payload).then(function(r){
    if(r && r.ok === false && /Unknown action/i.test(r.error||'')) showStaleBanner(r.error);
    return r;
  });
};

// ── navigation (design naming) ──────────────────────────────────────────
NAV_ICON.documents = 'file'; NAV_ICON.grants = 'award'; NAV_ICON.employees = 'users'; NAV_ICON.settings = 'sliders'; NAV_ICON.teamspaces = 'users';
MODULES = [
  {group:'', items:[{id:'dashboard',label:'Dashboard',sub:'greet'}]},
  {group:'Work', items:[
    {id:'tickets',label:'Ticket System'},{id:'board',label:'Engineering Board'},{id:'calendar',label:'Calendar'},
    {id:'projects',label:'Projects'},{id:'documents',label:'Documents'},{id:'filemanager',label:'Files'}]},
  {group:'Team', items:[
    {id:'teamspaces',label:'Team Directory'},{id:'meetings',label:'Meetings'},{id:'oneonones',label:'One-on-Ones',adminOnly:true},
    {id:'standup',label:'Stand-up Mode'},{id:'workload',label:'Workload'},{id:'feed',label:'Activity Feed'}]},
  {group:'Growth', items:[
    {id:'crm',label:'CRM Pipeline'},{id:'clients',label:'Clients'},{id:'grants',label:'Grants & Accelerators'},{id:'content',label:'Marketing'}]},
  {group:'Training & Quality', items:[
    {id:'training',label:'My Training'},{id:'trainingadmin',label:'Training Admin',adminOnly:true},{id:'uat',label:'UAT / QA Tracker'}]},
  {group:'Finance & HR', items:[
    {id:'payroll',label:'Payroll',adminOnly:true},{id:'finance',label:'Finance Dashboard',adminOnly:true},
    {id:'employees',label:'Employee Directory',adminOnly:true},{id:'leave',label:'Leave'}]},
  {group:'Intelligence', items:[
    {id:'command',label:'AI Command Center'},{id:'newsdigest',label:'Industry News',adminOnly:true},{id:'decisions',label:'Decision Register'},
    {id:'adminlog',label:'Admin Activity Log',adminOnly:true},{id:'notifications',label:'Notifications'},{id:'settings',label:'Settings',coreOnly:true}]}
];
var PAGE_SUB = {
  dashboard: function(){ return 'Good '+(new Date().getHours()<12?'morning':new Date().getHours()<18?'afternoon':'evening')+', '+CURRENT_USER+' — here\'s what\'s moving today'; },
  projects:'Team projects and client projects with the full SOP checklist', documents:'Invoices, quotes, briefs and proposals — numbered, stored in Drive, attached to clients', clients:'Fed by the CRM — managed by Product & Operations', content:'Content, results and the monthly newsletter and webinar', crm:'Prospects moving through the funnel', grants:'Open grants, accelerators and fellowships — verified, with closing dates',
  newsdigest:'Industry, competitor and customer news', payroll:'Salaries come from the Employee Directory', finance:'Income and expenditure, per project and company-wide',
  employees:'Contact, role, bank and salary details — the source for Payroll', leave:'Requests, approvals and everyone\'s time off', uat:'Guided test runs — a failed check becomes an engineering bug',
  command:'Ask Claude about your tickets, projects, leads and money', settings:'Slack channels, CRM links, triggers and connections', teamspaces:'Everyone at WeCollect'
};

function navBadge(id){
  var n = 0;
  if(id==='leave' && isAdminUser()) n = DB.leave.filter(function(l){ return l.status==='Pending' && l.team_member_name!==CURRENT_USER; }).length;
  if(id==='clients') n = (DB.clients||[]).filter(function(c){ return !c.account_manager && c.status!=='Past'; }).length;
  if(id==='crm') n = DB.leads.filter(function(l){ return (l.owner===CURRENT_USER) && l.next_follow_up_due && l.next_follow_up_due.slice(0,10) <= today10() && l.stage!=='Declined / Cold Leads'; }).length;
  if(id==='projects') n = (DB.projectTasks||[]).filter(function(t){ return t.assignee===CURRENT_USER && t.status!=='Done' && t.due_date && t.due_date <= today10(); }).length;
  return n ? '<span class="nav-badge">'+n+'</span>' : '';
}
function renderNav(){
  var html = '';
  MODULES.forEach(function(g){
    var items = g.items.filter(function(m){ return !(m.adminOnly && !isAdminUser()) && !(m.coreOnly && !isCoreAdmin()) && canSee(m.id); });
    if(!items.length) return;
    if(g.group) html += '<div class="nav-label">'+g.group+'</div>';
    items.forEach(function(m){
      html += '<div class="nav-item'+(STATE.module===m.id?' active':'')+'" title="'+esc(m.label)+'" onclick="goTo(\''+m.id+'\')"><span class="nav-ico">'+svgIco(NAV_ICON[m.id]||'grid')+'</span><span class="nav-label-text">'+m.label+'</span>'+navBadge(m.id)+'</div>';
    });
  });
  var nl = document.getElementById('navList'); if(nl) nl.innerHTML = html;
  document.querySelectorAll('#mobileNav .mn-item[data-id]').forEach(function(btn){ btn.classList.toggle('active', btn.getAttribute('data-id')===STATE.module); });
}
function goTo(id){
  STATE.module = id;
  renderNav();
  var titles = {}; MODULES.forEach(function(g){ g.items.forEach(function(m){ titles[m.id] = m.label; }); });
  document.getElementById('pageTitle').textContent = titles[id] || id;
  var s = PAGE_SUB[id]; var ps = document.getElementById('pageSub'); if(ps) ps.textContent = typeof s==='function' ? s() : (s||'');
  closeMobileDrawer();
  render();
  var c = document.getElementById('content'); if(c) c.scrollTop = 0;
}
function render(){
  var c = document.getElementById('content');
  var renderers = {
    dashboard: renderDashboard, tickets: renderTickets, board: renderBoard, calendar: renderCalendar, projects: renderProjects,
    meetings: renderMeetings, standup: renderStandup, feed: renderFeed, workload: renderWorkload, teamspaces: renderTeamSpaces,
    command: renderCommand, decisions: renderDecisions, adminlog: renderAdminLog, notifications: renderNotifications,
    oneonones: renderOneOnOnes, newsdigest: renderNewsDigest, training: renderTraining, trainingadmin: renderTrainingAdmin,
    filemanager: renderFileManager, uat: renderUat, crm: renderCrm, content: renderContent, payroll: renderPayroll,
    finance: renderFinance, leave: renderLeave, grants: renderGrants, employees: renderEmployees, settings: renderSettings, clients: renderClients, documents: renderDocuments
  };
  var fn = renderers[STATE.module] || renderDashboard;
  if(!canSee(STATE.module)) fn = function(){ return noAccess(); };
  c.innerHTML = '';
  try { c.appendChild(fn()); }
  catch(e){ c.innerHTML = '<div class="card"><div class="card-h">Something went wrong on this page</div><div class="wc-note bad">'+esc(e && e.message || e)+'</div></div>'; if(window.console) console.error(e); }
  try { populateSelects(); } catch(e){}
  renderNav();
}
// selectUser: set the sidebar footer in the design's two-line style
(function(){
  var _sel = selectUser;
  selectUser = function(name){
    _sel(name);
    var person = DB.team.filter(function(p){ return p.name===name; })[0];
    var fl = document.getElementById('footLabel');
    if(fl) fl.innerHTML = esc(name) + '<small>' + esc(person ? ((person.role||'') + (person.department?' · '+person.department:'')) : '') + '</small>';
    var ps = document.getElementById('pageSub'); var s = PAGE_SUB[STATE.module]; if(ps) ps.textContent = typeof s==='function' ? s() : (s||'');
    if(isAdminUser() && DB.projects.length===0 && WORKSPACE_MODE) { /* nothing */ }
  };
})();

// ── Dashboard ───────────────────────────────────────────────────────────
function uatStats(){
  var runs = (DB.uatRuns||[]).filter(function(r){ return r.status==='Finished' || r.status==='Complete' || r.status==='Completed'; });
  var last = runs[0];
  if(last && Number(last.total) > 0){
    var done = Number(last.passed)+Number(last.failed)+Number(last.blocked);
    return { rate: done ? Math.round(Number(last.passed)/done*100) : 0, failing: Number(last.failed), from: 'last run' };
  }
  var tc = DB.testCases||[], tested = tc.filter(function(t){ return t.result==='Pass' || t.result==='Fail'; });
  return { rate: tested.length ? Math.round(tested.filter(function(t){return t.result==='Pass';}).length/tested.length*100) : 0, failing: tc.filter(function(t){return t.result==='Fail';}).length, from: 'all cases' };
}
function nextPayrollInfo(){
  var now = new Date(), y = now.getFullYear(), m = now.getMonth();
  var day = Number((DB.config||{}).payroll_pay_day || 25);
  var due = new Date(y, m, day); if(due < new Date(y, m, now.getDate())) due = new Date(y, m+1, day);
  var days = Math.round((due - new Date(y, m, now.getDate()))/86400000);
  var team = DB.team.filter(function(p){ return Number(p.salary_amount) > 0; });
  return { days: days, due: due, withSalary: team.length, total: DB.team.length };
}
function renderDashboard(){
  var t = visibleTickets();
  var open = t.filter(function(x){ return x.status!=='Done'; });
  var activeProjects = DB.projects.filter(function(p){ return p.status!=='Closed' && p.status!=='Completed'; });
  var clientN = activeProjects.filter(function(p){ return p.kind==='Client'; }).length;
  var ut = uatStats();
  var td = today10();
  var myTickets = t.filter(function(x){ return x.owner===CURRENT_USER && x.status!=='Done'; }).slice(0,5);
  var myTasks = (DB.projectTasks||[]).filter(function(x){ return x.assignee===CURRENT_USER && x.status!=='Done' && x.due_date && x.due_date <= td; })
    .sort(function(a,b){ return (a.due_date+a.due_time).localeCompare(b.due_date+b.due_time); }).slice(0,6);
  var admin = isAdminUser();
  var pr = nextPayrollInfo();
  var fourth = admin
    ? '<div class="card stat-card"><div class="stat-lbl">Payroll</div><div class="stat-num">'+(pr.days===0?'Today':'Due in '+pr.days+'d')+'</div><div class="stat-sub '+(pr.withSalary<pr.total?'warn':'')+'">'+pr.withSalary+' of '+pr.total+' salaries set</div></div>'
    : '<div class="card stat-card"><div class="stat-lbl">My leave</div><div class="stat-num">'+DB.leave.filter(function(l){return l.team_member_name===CURRENT_USER&&l.status==='Pending';}).length+'</div><div class="stat-sub">pending requests</div></div>';
  var pendingLeave = admin ? DB.leave.filter(function(l){ return l.status==='Pending' && l.team_member_name!==CURRENT_USER; }) : [];
  var awaitingPay = admin ? DB.projects.filter(function(p){ return p.kind==='Client'; }).map(function(p){
    var ag = (DB.projectAgents||[]).filter(function(a){ return a.project_id===p.project_id; });
    var unpaid = ag.filter(function(a){ return Number(a.amount_due)>0 && String(a.paid).toLowerCase()!=='yes'; });
    return unpaid.length ? {p:p, n:unpaid.length} : null; }).filter(Boolean) : [];
  var meetings = DB.meetings.filter(function(m){ return m.date >= td; }).sort(function(a,b){ return (a.date+(a.time||'')).localeCompare(b.date+(b.time||'')); }).slice(0,4);
  var acts = DB.activities.slice().sort(function(a,b){ return String(b.timestamp).localeCompare(String(a.timestamp)); }).slice(0,5);
  var out = (DB.timeOff||[]).filter(function(l){ return l.start_date <= td && l.end_date >= td; });
  var opps = (DB.opportunities||[]).filter(function(o){ return o.kind==='Opportunity' && o.status!=='Expired' && o.status!=='Not a fit' && (!/^\d{4}/.test(o.end_date||'') || o.end_date >= td); });
  var newOpps = opps.filter(function(o){ return o.status==='New'; });
  var h = '';
  h += '<div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:20px"><button class="btn btn-primary" onclick="openNewTicket()">+ New Ticket</button><button class="btn btn-ghost" onclick="openScheduleMeetingModal()">Schedule Meeting</button>'+(admin?'<button class="btn btn-ghost" onclick="goTo(\'oneonones\')">Log 1:1</button>':'')+'<button class="btn btn-ghost" onclick="openRequestLeave()">Request Leave</button></div>';
  h += '<div class="wc-grid g4 keep2" style="margin-bottom:16px">'+
    '<div class="card stat-card"><div class="stat-lbl">Open tickets</div><div class="stat-num">'+open.length+'</div><div class="stat-sub">'+open.filter(function(x){return x.status==='Blocked';}).length+' blocked</div></div>'+
    '<div class="card stat-card"><div class="stat-lbl">Active projects</div><div class="stat-num">'+activeProjects.length+'</div><div class="stat-sub">'+clientN+' client, '+(activeProjects.length-clientN)+' team</div></div>'+
    '<div class="card stat-card"><div class="stat-lbl">UAT pass rate</div><div class="stat-num">'+ut.rate+'%</div><div class="stat-sub '+(ut.failing?'warn':'good')+'">'+ut.failing+' failing case'+(ut.failing===1?'':'s')+' open</div></div>'+fourth+'</div>';

  if(admin && (pendingLeave.length || awaitingPay.length)){
    h += '<div class="card" style="padding:16px 20px;margin-bottom:16px;border-color:#F3C98B;background:#FFFBF3"><div class="card-h" style="margin-bottom:8px">Needs your decision</div>';
    pendingLeave.slice(0,4).forEach(function(l){ h += '<div class="wc-row"><span class="t" style="flex:1"><b>'+esc(l.team_member_name)+'</b> asked for '+esc(l.type)+' · '+esc(leaveWhen(l))+'</span><button class="btn btn-good btn-sm" onclick="decideLeaveClick(\''+l.leave_id+'\',\'Approved\')">Approve</button><button class="btn btn-danger btn-sm" onclick="decideLeaveClick(\''+l.leave_id+'\',\'Declined\')">Decline</button></div>'; });
    if(pendingLeave.length>4) h += '<div class="wc-row"><a href="#" onclick="goTo(\'leave\');return false" style="color:var(--brand);font-weight:600">+'+(pendingLeave.length-4)+' more leave requests →</a></div>';
    awaitingPay.forEach(function(a){ h += '<div class="wc-row"><span style="flex:1">Agent payments waiting to be confirmed on <b>'+esc(a.p.name)+'</b> ('+a.n+' agents)</span><button class="btn btn-ghost btn-sm" onclick="openProject(\''+a.p.project_id+'\',\'agents\')">Open</button></div>'; });
    h += '</div>';
  }

  h += '<div style="display:flex;gap:16px;flex-wrap:wrap;margin-bottom:16px">';
  h += '<div class="card" style="flex:1 1 420px;padding:18px 20px"><div class="card-h">My tasks today</div>';
  if(!myTasks.length && !myTickets.length) h += '<div class="wc-muted" style="padding:10px 0">Nothing assigned to you that is due. 🎉</div>';
  myTasks.forEach(function(x){ var pj = DB.projects.filter(function(p){return p.project_id===x.project_id;})[0];
    h += '<div class="wc-row" style="cursor:pointer" onclick="openProject(\''+x.project_id+'\',\'tasks\')"><span class="wc-check'+(x.status==='Done'?' on':'')+'"></span><span style="flex:1">'+esc(x.title)+'<div class="wc-muted">'+esc(pj?pj.name:'')+(x.due_time?' · '+esc(x.due_time):'')+'</div></span>'+(x.due_date<td?pill('Overdue','bad'):pill('Due today','warn'))+'</div>'; });
  myTickets.forEach(function(x){ h += '<div class="wc-row" style="cursor:pointer" onclick="openTicketDetail(\''+x.ticket_id+'\')"><span class="wc-check"></span><span style="flex:1">'+esc(x.title)+'<div class="wc-muted">'+esc(x.ticket_id)+' · '+esc(x.status)+'</div></span>'+pill(x.priority||'Medium', x.priority==='Urgent'||x.priority==='High'?'bad':(x.priority==='Low'?'good':'warn'))+'</div>'; });
  h += '</div>';
  h += '<div class="card" style="flex:1 1 320px;padding:18px 20px"><div class="card-h">Team activity</div>'+
    (acts.length ? acts.map(function(a){ return '<div style="font-size:12.5px;color:var(--text-dim);margin-bottom:10px"><b style="color:var(--text)">'+esc(a.actor)+'</b> '+esc(String(a.action||'').toLowerCase())+(a.ticket_id?' on '+esc(a.ticket_id):'')+(a.new_value?' → '+esc(a.new_value):'')+'</div>'; }).join('') : '<div class="wc-muted">No activity yet.</div>')+'</div>';
  h += '</div>';

  h += '<div style="display:flex;gap:16px;flex-wrap:wrap">';
  h += '<div class="card" style="flex:1 1 420px;padding:18px 20px"><div class="card-h">Upcoming meetings</div>'+
    (meetings.length ? meetings.map(function(m){ return '<div style="display:flex;justify-content:space-between;font-size:13px;padding:5px 0"><span>'+esc(m.title)+'</span><span class="wc-muted">'+esc(fmtDate(m.date))+(m.time?' · '+esc(m.time):'')+'</span></div>'; }).join('') : '<div class="wc-muted">No meetings scheduled.</div>')+
    (out.length ? '<div class="card-h" style="margin-top:14px">Out today</div><div style="font-size:12.5px">'+out.map(function(o){ return esc(o.team_member_name); }).join(', ')+'</div>' : '')+'</div>';
  h += '<div class="card" style="flex:1 1 320px;padding:18px 20px;background:var(--brand-bg);border-color:transparent"><div class="card-h" style="margin-bottom:6px">Grants & accelerators</div>'+
    '<div style="font-size:12.5px;color:var(--text-dim)">'+opps.length+' open opportunit'+(opps.length===1?'y':'ies')+' on the board'+(newOpps.length?', '+newOpps.length+' new this week':'')+'. Expired ones are removed automatically.</div>'+
    '<a href="#" onclick="goTo(\'grants\');return false" style="display:inline-block;margin-top:10px;font-size:12.5px;font-weight:600;color:var(--brand)">Open the table →</a></div>';
  h += '</div>';
  return wcPage(h);
}

// ═══════════════════════════════════════════════════════════════════════
//  PROJECTS — Team project vs Client project (SOP workflow, one task per
//  activity, assigned by SOP role), agent tracker, per-project finance.
// ═══════════════════════════════════════════════════════════════════════
var SOP_ROLE_LIST = ['Operations Lead','Field Operations Manager','Application Operations Manager','Temp Community Manager','Mobile App Developer','Web App Developer'];
var PHASES = ['Kickoff','Pre-Fieldwork','Fieldwork','Close'];
var SOP_SYSTEMS = ['Mobile App','PMD','OTG','Super Admin'];
var NEW_PROJ = {kind:'Team', depts:[], members:[]};

function projectById(id){ return DB.projects.filter(function(p){ return p.project_id===id; })[0]; }
function projTasks(id){ return (DB.projectTasks||[]).filter(function(t){ return t.project_id===id; }).sort(function(a,b){ return Number(a.seq)-Number(b.seq); }); }
function projAgents(id){ return (DB.projectAgents||[]).filter(function(a){ return a.project_id===id; }); }
function projEntries(id){ return (DB.financeEntries||[]).filter(function(e){ return e.project_id===id; }); }
function projRoles(p){ var r = parseJson(p.roles_json, {}); return r || {}; }
function yes(v){ return String(v).toLowerCase()==='yes' || v===true; }
function projProgress(p){
  if(p.kind==='Client'){
    var t = projTasks(p.project_id); var d = t.filter(function(x){ return x.status==='Done'; }).length;
    return {done:d, total:t.length, label:d+'/'+t.length+' activities'};
  }
  var tix = DB.tickets.filter(function(x){ return x.project_id===p.project_id; });
  var dn = tix.filter(function(x){ return x.status==='Done'; }).length;
  return {done:dn, total:tix.length, label:dn+'/'+tix.length+' tickets done'};
}
function phaseTone(ph){ return ph==='Close' ? 'good' : (ph==='Fieldwork' ? 'warn' : 'info'); }

function renderProjects(){
  if(STATE.pv && STATE.pv.id && projectById(STATE.pv.id)) return renderProjectDetail();
  STATE.pv = null;
  var f = STATE.projFilter || (STATE.projFilter = {kind:'All', status:'Active'});
  var list = DB.projects.filter(function(p){
    if(f.kind!=='All' && (p.kind||'Team')!==f.kind) return false;
    var closed = p.status==='Completed' || p.status==='Closed';
    return f.status==='All' || (f.status==='Active' ? !closed : closed);
  });
  var h = wcHead('Projects', 'Pick <b>Team project</b> for internal work, or <b>Client project</b> to run the full SOP checklist with every activity assigned to the right person.',
    (canEditMod('projects')?'<button class="btn btn-primary" onclick="openNewProject()">+ New Project</button>':''));
  h += '<div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:16px"><div class="wc-seg">'+['All','Client','Team'].map(function(k){ return '<button class="'+(f.kind===k?'on':'')+'" onclick="setProjFilter(\'kind\',\''+k+'\')">'+k+'</button>'; }).join('')+'</div>'+
    '<div class="wc-seg">'+['Active','Completed','All'].map(function(k){ return '<button class="'+(f.status===k?'on':'')+'" onclick="setProjFilter(\'status\',\''+k+'\')">'+k+'</button>'; }).join('')+'</div></div>';
  h += '<div class="wc-grid g3">';
  h += list.map(function(p){
    var pr = projProgress(p), pct = pr.total ? Math.round(pr.done/pr.total*100) : 0, roles = projRoles(p);
    var lead = p.kind==='Client' ? roles['Operations Lead'] : roles.lead;
    return '<div class="card" style="cursor:pointer;padding:16px 18px" onclick="openProject(\''+p.project_id+'\')">'+
      '<div style="display:flex;gap:8px;align-items:center;margin-bottom:8px">'+pill(p.kind==='Client'?'Client project':'Team project', p.kind==='Client'?'info':'mute')+(p.kind==='Client'?pill(p.phase||'Kickoff', phaseTone(p.phase)):'')+
      (p.status==='Completed'?pill('Completed','good'):'')+'</div>'+
      '<div class="disp" style="font-size:16px;font-weight:600;margin-bottom:2px">'+esc(p.name)+'</div>'+
      '<div class="wc-muted" style="margin-bottom:10px">'+(p.kind==='Client' ? esc(p.client_name||'') : esc(String(p.departments||p.department||'').replace(/,/g,', ')))+'</div>'+
      '<div class="wc-bar"><i style="width:'+pct+'%"></i></div>'+
      '<div style="display:flex;justify-content:space-between;margin-top:6px;font-size:12px;color:var(--text-dim)"><span>'+esc(pr.label)+'</span><span>Target '+esc(fmtDate(p.target_date))+'</span></div>'+
      (lead?'<div class="wc-muted" style="margin-top:8px">Lead: '+esc(String(lead).split(',')[0])+'</div>':'')+'</div>';
  }).join('') || '<div class="empty" style="grid-column:1/-1">No projects here yet. Click “+ New Project”.</div>';
  h += '</div>';
  return wcPage(h);
}
function setProjFilter(k, v){ STATE.projFilter[k] = v; render(); }

// ── create ──────────────────────────────────────────────────────────────
function openNewProject(preClientId){
  NEW_PROJ = {kind:preClientId?'Client':'Team', depts:[], members:[], client_id:preClientId||''};
  drawNewProject();
}
function setNewProjKind(k){
  NEW_PROJ.kind = k;
  NEW_PROJ.name = val('np_name') || NEW_PROJ.name;
  drawNewProject();
}
function drawNewProject(){
  var k = NEW_PROJ.kind, team = teamNames();
  var h = '<div style="display:flex;gap:12px;flex-wrap:wrap;margin-bottom:16px">'+
    '<div class="wc-kind'+(k==='Team'?' on':'')+'" onclick="setNewProjKind(\'Team\')"><b>Team project</b><span class="wc-muted">Internal work: a lead, a few members, tickets linked to it. No SOP checklist.</span></div>'+
    '<div class="wc-kind'+(k==='Client'?' on':'')+'" onclick="setNewProjKind(\'Client\')"><b>Client project</b><span class="wc-muted">Follows the Project Tracker workflow: Kickoff → Pre-Fieldwork → Daily check-ins &amp; QA → Close. Every activity becomes a task for the SOP role.</span></div></div>';
  h += fld('Project name', inp('np_name', NEW_PROJ.name||'', 'text', k==='Client'?'e.g. Lagos Household Survey':'e.g. Dashboard revamp'));
  if(k==='Team'){
    h += '<div class="wc-f"><label class="wc-lbl">Departments</label>'+['Engineering','Operations','Growth','Leadership'].map(function(d){ return '<span class="wc-chip'+(NEW_PROJ.depts.indexOf(d)>-1?' on':'')+'" onclick="toggleNP(\'depts\',\''+d+'\')">'+d+'</span>'; }).join('')+'</div>';
    h += '<div class="wc-grid g2">'+fld('Project lead', sel('np_lead', team, NEW_PROJ.lead||CURRENT_USER, ''))+fld('Phase', inp('np_phase', NEW_PROJ.phase||'', 'text', 'e.g. Planning'))+'</div>';
    h += '<div class="wc-f"><label class="wc-lbl">Members</label>'+team.map(function(n){ return '<span class="wc-chip'+(NEW_PROJ.members.indexOf(n)>-1?' on':'')+'" onclick="toggleNP(\'members\',\''+esc(n)+'\')">'+esc(n)+'</span>'; }).join('')+'</div>';
    h += '<div class="wc-grid g3">'+fld('Start', inp('np_start','', 'date'))+fld('Target date', inp('np_target','', 'date'))+fld('Status', sel('np_status',['Active','On hold'],'Active'))+'</div>';
    var un = visibleTickets().filter(function(t){ return !t.project_id; });
    if(un.length) h += '<div class="wc-f"><label class="wc-lbl">Attach existing tickets (optional)</label><div style="max-height:130px;overflow:auto;border:1px solid var(--line);border-radius:8px;padding:6px 10px">'+un.slice(0,40).map(function(t){ return '<label style="display:flex;gap:8px;font-size:12.5px;padding:3px 0"><input type="checkbox" class="np-tix" value="'+esc(t.ticket_id)+'">'+esc(t.title)+'</label>'; }).join('')+'</div></div>';
  } else {
    h += '<div class="wc-grid g2">'+fld('Client', '<select class="wc-sel" id="np_clientsel" onchange="npClientPick(this.value)">'+optionsHtml((DB.clients||[]).map(function(c){ return {value:c.client_id, label:c.name+(c.products?' · '+c.products.replace(/,/g,'/'):'')}; }), NEW_PROJ.client_id||'', '＋ New client (type the name)')+'</select><input class="wc-input" id="np_client" style="margin-top:6px'+(NEW_PROJ.client_id?';display:none':'')+'" placeholder="New client name">', 'Pick a client from the board, or type a new one — it is added to the Client board automatically.')+fld('Contract value', '<div style="display:flex;gap:6px"><select class="wc-sel" id="np_cur" style="width:90px"><option>NGN</option><option>USD</option><option>GBP</option><option>EUR</option></select>'+inp('np_value','', 'number', '0')+'</div>', 'Booked in Finance as expected income straight away.')+'</div>';
    h += fld('Scope', ta('np_scope','', 'What are we collecting, from whom, and what does the client get?', 2));
    h += '<div class="wc-grid g3">'+fld('Locations', inp('np_loc','', 'text', 'e.g. Lagos, Ibadan'))+fld('Agent headcount', inp('np_head','', 'number'))+fld('Daily quota / agent', inp('np_quota','', 'number'))+'</div>';
    h += '<div class="wc-grid g3">'+fld('Start date', inp('np_start', today10(), 'date'))+fld('Fieldwork starts', inp('np_fw','', 'date'), 'Pre-Fieldwork is due the workday before.')+fld('Field days', inp('np_days','2','number'))+'</div>';
    h += '<div class="wc-grid g2">'+fld('Pay per approved record', inp('np_rate','', 'number'), 'Used for the agent payment summary.')+fld('Project Slack channel ID (optional)', inp('np_chan','', 'text', 'C0123ABCD'), 'Blank = the “Projects” channel from Settings.')+'</div>';
    h += '<div class="card-h" style="margin-top:6px">Who holds each SOP role on this project</div><div class="wc-help" style="margin:-6px 0 10px">Each checklist activity is assigned to the person in the matching role. Roles pre-fill from the Employee Directory.</div><div class="wc-grid g2">';
    SOP_ROLE_LIST.forEach(function(r, i){
      var def = (DB.team.filter(function(p){ return String(p.sop_role||'').split(',').map(function(x){return x.trim();}).indexOf(r)>-1; })[0]||{}).name || '';
      h += fld(esc(r), sel('np_role_'+i, team, (NEW_PROJ.roles||{})[r]||def, '— unassigned —'));
    });
    h += '</div>';
  }
  h += '<div style="display:flex;gap:10px;margin-top:8px"><button class="btn btn-primary" id="np_go" onclick="saveNewProject()">'+(k==='Client'?'Create client project':'Create team project')+'</button><button class="btn btn-ghost" onclick="wcClose(\'newproj\')">Cancel</button></div>';
  wcModal('newproj', 'New project', h, true);
}
function toggleNP(key, v){
  NEW_PROJ.name = val('np_name'); NEW_PROJ.lead = val('np_lead'); NEW_PROJ.phase = val('np_phase');
  var a = NEW_PROJ[key], i = a.indexOf(v); if(i>-1) a.splice(i,1); else a.push(v);
  drawNewProject();
}
function saveNewProject(){
  var name = val('np_name').trim();
  if(!name){ wcToast('Give the project a name.', true); return; }
  var k = NEW_PROJ.kind, payload = {name:name, kind:k, actor:CURRENT_USER};
  if(k==='Team'){
    payload.departments = NEW_PROJ.depts.join(','); payload.department = payload.departments;
    payload.lead = val('np_lead'); payload.members = NEW_PROJ.members; payload.phase = val('np_phase');
    payload.start_date = val('np_start'); payload.target_date = val('np_target'); payload.status = val('np_status');
    payload.link_ticket_ids = Array.prototype.slice.call(document.querySelectorAll('.np-tix:checked')).map(function(c){ return c.value; });
  } else {
    var cid = val('np_clientsel');
    if(!cid && !val('np_client').trim()){ wcToast('Pick a client or type the client name.', true); return; }
    payload.client_id = cid; payload.client_name = cid ? '' : val('np_client').trim(); payload.contract_value = val('np_value'); payload.currency = val('np_cur');
    payload.scope = val('np_scope'); payload.locations = val('np_loc'); payload.headcount = val('np_head'); payload.daily_quota = val('np_quota');
    payload.start_date = val('np_start'); payload.fieldwork_start = val('np_fw'); payload.field_days = val('np_days') || 2;
    payload.rate_per_record = val('np_rate'); payload.slack_channel_id = val('np_chan');
    payload.roles = {}; SOP_ROLE_LIST.forEach(function(r, i){ var v = val('np_role_'+i); if(v) payload.roles[r] = v; });
  }
  var b = document.getElementById('np_go'); if(b){ b.disabled = true; b.textContent = 'Creating…'; }
  var sendProject = function(){ api('createProject', payload).then(function(res){
    if(!res.ok){ if(b){ b.disabled = false; b.textContent = 'Create'; } wcFail('Could not create project', res); return; }
    wcClose('newproj');
    refreshData(false).then(function(){
      var msg = 'Project created.';
      if(k==='Client') msg = res.tasks_created+' tasks created and assigned'+(res.finance_linked?' · contract added to Finance':'')+(res.notified?' · '+res.notified+' people notified':'');
      wcToast(msg);
      STATE.module = 'x'; openProject(res.project.project_id, k==='Client' ? 'tasks' : 'overview');
    });
  }); };
  if(k==='Client' && !payload.client_id){
    api('createClient', {name:payload.client_name, actor:CURRENT_USER}).then(function(cr){
      var cc = cr && (cr.client || null);
      if(!cc){ if(b){ b.disabled = false; b.textContent = 'Create'; } return wcFail('Could not add the client', cr); }
      payload.client_id = cc.client_id; sendProject();
    });
  } else sendProject();
}

// ── detail ──────────────────────────────────────────────────────────────
function openProject(id, tab){
  var p = projectById(id); if(!p) return;
  STATE.pv = {id:id, tab:tab || (p.kind==='Client' ? 'tasks' : 'overview'), mine:false, openKeys:{}, showDone:true};
  if(STATE.module!=='projects') goTo('projects'); else render();
}
function setPvTab(t){ STATE.pv.tab = t; render(); }
function closeProjectView(){ STATE.pv = null; render(); }

function renderProjectDetail(){
  var p = projectById(STATE.pv.id), pv = STATE.pv, client = p.kind==='Client';
  var tabs = client ? [['tasks','Checklist'],['agents','Agent tracker'],['finance','Finance'],['overview','Overview'],['tickets','Tickets']] : [['overview','Overview'],['tickets','Tickets'],['finance','Finance']];
  if(!isAdminUser()) tabs = tabs.filter(function(t){ return t[0]!=='finance'; });
  if(canSee('documents')) tabs.push(['documents','Documents']);
  if(!tabs.some(function(t){ return t[0]===pv.tab; })) pv.tab = tabs[0][0];
  var pr = projProgress(p);
  var h = '<a href="#" onclick="closeProjectView();return false" style="font-size:12.5px;color:var(--brand);font-weight:600">← All projects</a>';
  h += wcHead(esc(p.name), (client ? esc(p.client_name||'')+' · ' : '')+'<span>'+esc(fmtDate(p.start_date))+' → '+esc(fmtDate(p.target_date))+'</span> · '+esc(pr.label),
    pill(client?'Client project':'Team project', client?'info':'mute')+' '+(client?pill(p.phase||'Kickoff', phaseTone(p.phase)):'')+' '+(p.status==='Completed'?pill('Completed','good'):''));
  if(client) h += phaseStepper(p);
  h += '<div class="wc-tabs">'+tabs.map(function(t){
    var n = t[0]==='documents' ? (DB.documents||[]).filter(function(d){ return d.project_id===p.project_id; }).length : t[0]==='agents' ? projAgents(p.project_id).length : (t[0]==='tickets' ? DB.tickets.filter(function(x){return x.project_id===p.project_id;}).length : 0);
    return '<div class="wc-tab'+(pv.tab===t[0]?' on':'')+'" onclick="setPvTab(\''+t[0]+'\')">'+t[1]+(n?'<span class="n">'+n+'</span>':'')+'</div>'; }).join('')+'</div>';
  h += ({tasks:pvTasks, agents:pvAgents, finance:pvFinance, overview:pvOverview, tickets:pvTickets, documents:function(p){ return '<div class="card" style="padding:18px 20px">'+docsFor('project', p.project_id)+'</div>'; }})[pv.tab](p);
  return wcPage(h);
}
function phaseStepper(p){
  var tasks = projTasks(p.project_id);
  return '<div style="display:flex;gap:8px;margin-bottom:16px;flex-wrap:wrap">'+PHASES.map(function(ph, i){
    var t = tasks.filter(function(x){ return x.phase===ph; }), d = t.filter(function(x){ return x.status==='Done'; }).length;
    var done = t.length && d===t.length, cur = p.phase===ph;
    return '<div style="flex:1 1 150px;border:1px solid '+(cur?'var(--brand)':'var(--line)')+';background:'+(cur?'var(--brand-bg)':'#fff')+';border-radius:12px;padding:10px 14px">'+
      '<div style="font-size:11px;font-weight:600;color:var(--text-faint)">STEP '+(i+1)+'</div><div class="disp" style="font-weight:600;font-size:13.5px">'+ph+(done?' ✓':'')+'</div><div class="wc-muted">'+d+'/'+t.length+' done</div></div>';
  }).join('')+'</div>';
}

function pvOverview(p){
  var client = p.kind==='Client', roles = projRoles(p), admin = isAdminUser();
  var h = '<div class="wc-grid g2" style="align-items:start"><div class="card" style="padding:18px 20px"><div class="card-h">Details</div>';
  var rows = client ? [['Client',p.client_name],['Scope',p.scope],['Locations',p.locations],['Agent headcount',p.headcount],['Daily quota / agent',p.daily_quota],['Field days',p.field_days],['Fieldwork starts',fmtDate(p.fieldwork_start)],['Pay per approved record',p.rate_per_record?money(p.rate_per_record,p.currency):''],['Contract value',admin&&p.contract_value?money(p.contract_value,p.currency):''],['Slack channel',p.slack_channel_id||'(default Projects channel)']]
    : [['Departments',String(p.departments||p.department||'').replace(/,/g,', ')],['Phase',p.phase],['Lead',roles.lead],['Members',(roles.members||[]).join(', ')]];
  rows.push(['Status',p.status],['Created by',p.created_by]);
  h += rows.filter(function(r){ return r[1]!==undefined && r[1]!==''; }).map(function(r){ return '<div class="wc-row"><span class="wc-muted" style="width:150px;flex-shrink:0">'+r[0]+'</span><span style="flex:1">'+esc(r[1])+'</span></div>'; }).join('');
  if(admin) h += '<div style="margin-top:12px;display:flex;gap:8px;flex-wrap:wrap"><button class="btn btn-ghost btn-sm" onclick="openEditProject(\''+p.project_id+'\')">Edit details</button>'+
    (p.status!=='Completed' ? '<button class="btn btn-good btn-sm" onclick="setProjectStatus(\''+p.project_id+'\',\'Completed\')">Mark completed</button>' : '<button class="btn btn-ghost btn-sm" onclick="setProjectStatus(\''+p.project_id+'\',\'Active\')">Reopen</button>')+'</div>';
  h += '</div>';
  if(client){
    h += '<div class="card" style="padding:18px 20px"><div class="card-h">SOP roles on this project</div>'+SOP_ROLE_LIST.map(function(r){ return '<div class="wc-row"><span style="flex:1;font-size:13px">'+esc(r)+'</span><b>'+esc(roles[r]||'—')+'</b></div>'; }).join('')+
      (admin||STATE.pv && roles['Operations Lead']===CURRENT_USER ? '<div style="margin-top:12px"><button class="btn btn-ghost btn-sm" onclick="openEditRoles(\''+p.project_id+'\')">Change who holds a role</button><div class="wc-help">Open tasks are re-assigned and the new person is notified on Slack.</div></div>' : '')+'</div>';
  }
  h += '</div>';
  return h;
}
function openEditRoles(id){
  var p = projectById(id), roles = projRoles(p), team = teamNames();
  var h = SOP_ROLE_LIST.map(function(r, i){ return fld(esc(r), sel('er_'+i, team, String(roles[r]||'').split(',')[0].trim(), '— unassigned —')); }).join('');
  h += '<button class="btn btn-primary" onclick="saveEditRoles(\''+id+'\')">Save roles</button>';
  wcModal('roles', 'SOP roles — '+esc(p.name), h);
}
function saveEditRoles(id){
  var roles = {}; SOP_ROLE_LIST.forEach(function(r, i){ var v = val('er_'+i); if(v) roles[r] = v; });
  api('updateProject', {project_id:id, roles:roles, actor:CURRENT_USER}).then(function(res){
    if(!res.ok) return wcFail('Could not save roles', res);
    wcClose('roles'); refreshData().then(function(){ wcToast(res.reassigned+' open tasks re-assigned.'); });
  });
}
function openEditProject(id){
  var p = projectById(id), c = p.kind==='Client';
  var h = '<div class="wc-grid g2">'+fld('Name', inp('ep_name', p.name))+(c?fld('Client', inp('ep_client', p.client_name)):fld('Phase', inp('ep_phase', p.phase)))+'</div>';
  h += '<div class="wc-grid g3">'+fld('Start', inp('ep_start', p.start_date, 'date'))+fld('Target', inp('ep_target', p.target_date, 'date'))+(c?fld('Contract value', inp('ep_value', p.contract_value, 'number')):fld('Status', sel('ep_status',['Active','On hold','Completed'],p.status)))+'</div>';
  if(c) h += '<div class="wc-grid g3">'+fld('Headcount', inp('ep_head', p.headcount, 'number'))+fld('Pay / approved record', inp('ep_rate', p.rate_per_record, 'number'))+fld('Slack channel ID', inp('ep_chan', p.slack_channel_id))+'</div>'+fld('Scope', ta('ep_scope', p.scope,'',2));
  h += '<button class="btn btn-primary" onclick="saveEditProject(\''+id+'\')">Save</button>';
  wcModal('editproj','Edit project', h);
}
function saveEditProject(id){
  var p = projectById(id), c = p.kind==='Client';
  var u = {project_id:id, actor:CURRENT_USER, name:val('ep_name'), start_date:val('ep_start'), target_date:val('ep_target')};
  if(c){ u.client_name = val('ep_client'); u.contract_value = val('ep_value'); u.headcount = val('ep_head'); u.rate_per_record = val('ep_rate'); u.slack_channel_id = val('ep_chan'); u.scope = val('ep_scope'); }
  else { u.phase = val('ep_phase'); u.status = val('ep_status'); }
  api('updateProject', u).then(function(res){ if(!res.ok) return wcFail('Could not save', res); wcClose('editproj'); refreshData().then(function(){ wcToast('Project updated.'); }); });
}
function setProjectStatus(id, status){
  api('updateProject', {project_id:id, status:status, actor:CURRENT_USER}).then(function(res){ if(!res.ok) return wcFail('Could not update', res); refreshData().then(function(){ wcToast('Project '+status.toLowerCase()+'.'); }); });
}

function pvTickets(p){
  var linked = DB.tickets.filter(function(t){ return t.project_id===p.project_id; });
  var un = visibleTickets().filter(function(t){ return !t.project_id; });
  var h = '<div class="card" style="padding:6px 16px 10px">'+(linked.length ? linked.map(function(t){ return '<div class="wc-row" style="cursor:pointer" onclick="openTicketDetail(\''+t.ticket_id+'\')"><span class="wc-muted" style="width:70px">'+esc(t.ticket_id)+'</span><span style="flex:1">'+esc(t.title)+'</span>'+pill(t.status, t.status==='Done'?'good':(t.status==='Blocked'?'bad':'mute'))+'<span class="wc-muted" style="width:80px;text-align:right">'+esc(t.owner||'')+'</span></div>'; }).join('') : '<div class="empty">No tickets linked yet.</div>')+'</div>';
  if(un.length) h += '<div class="card" style="padding:14px 16px;margin-top:14px"><div class="card-h">Attach an unassigned ticket</div><div style="display:flex;gap:8px"><select class="wc-sel" id="pv_attach">'+optionsHtml(un.map(function(t){ return {value:t.ticket_id,label:t.ticket_id+' — '+t.title}; }))+'</select><button class="btn btn-primary" onclick="attachTicketToProject(\''+p.project_id+'\')">Attach</button></div></div>';
  return h;
}
function attachTicketToProject(projectId){
  var id = val('pv_attach'); if(!id) return;
  api('updateTicket', {ticket_id:id, project_id:projectId, actor:CURRENT_USER}).then(function(res){
    if(!res.ok) return wcFail('Could not attach', res);
    var t = DB.tickets.filter(function(x){ return x.ticket_id===id; })[0]; if(t) t.project_id = projectId; render();
  });
}

// ── checklist ───────────────────────────────────────────────────────────
function pvTasks(p){
  var pv = STATE.pv, tasks = projTasks(p.project_id), td = today10();
  if(!tasks.length) return '<div class="empty">No checklist tasks on this project.</div>';
  var h = '<div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap;margin-bottom:12px"><div class="wc-seg"><button class="'+(!pv.mine?'on':'')+'" onclick="setPvMine(false)">Everyone</button><button class="'+(pv.mine?'on':'')+'" onclick="setPvMine(true)">Only mine</button></div>'+
    '<span class="wc-muted">A later phase unlocks when the earlier one is fully done (SOP). Items marked <b>auto</b> tick themselves from the Agent tracker.</span></div>';
  var firstOpenPhase = null;
  PHASES.forEach(function(ph){
    var t = tasks.filter(function(x){ return x.phase===ph; }); if(!t.length) return;
    var done = t.filter(function(x){ return x.status==='Done'; }).length;
    var earlier = tasks.filter(function(x){ return PHASES.indexOf(x.phase) < PHASES.indexOf(ph) && x.status!=='Done'; });
    var locked = earlier.length > 0;
    if(!firstOpenPhase && done < t.length) firstOpenPhase = ph;
    var key = 'ph_'+ph, open = pv.openKeys[key]!==undefined ? pv.openKeys[key] : (ph===(p.phase||'Kickoff') || ph===firstOpenPhase);
    h += '<div class="wc-phase'+(locked?' locked':'')+'"><div class="wc-phase-h" onclick="togglePv(\''+key+'\','+(open?'false':'true')+')"><b>'+ph+'</b>'+(done===t.length?pill('Complete','good'):(locked?pill('Locked','mute'):pill('In progress','info')))+
      '<span class="wc-muted">'+done+'/'+t.length+'</span><div class="wc-bar" style="flex:1;max-width:220px"><i style="width:'+Math.round(done/t.length*100)+'%"></i></div><span style="margin-left:auto">'+(open?'▾':'▸')+'</span></div>';
    if(open){
      var groups = []; t.forEach(function(x){ var g = x.group+(x.day?' · Day '+x.day:''); if(groups.indexOf(g)===-1) groups.push(g); });
      var gname = function(x){ return x.group+(x.day?' · Day '+x.day:''); };
      var firstOpenG = groups.filter(function(q){ return t.some(function(x){ return gname(x)===q && x.status!=='Done'; }); })[0];
      groups.forEach(function(g){
        var gt = t.filter(function(x){ return gname(x)===g; });
        var gd = gt.filter(function(x){ return x.status==='Done'; }).length;
        var gk = 'g_'+ph+'_'+g, gopen = pv.openKeys[gk]!==undefined ? pv.openKeys[gk] : (groups.length<=2 || g===firstOpenG);
        if(groups.length>1) h += '<div class="wc-subh" style="cursor:pointer" onclick="togglePv(\''+esc(gk).replace(/'/g,"\\'")+'\','+(gopen?'false':'true')+')">'+(gopen?'▾':'▸')+' '+esc(g)+' <span style="font-weight:400">· '+gd+'/'+gt.length+'</span></div>';
        if(groups.length>1 && !gopen) return;
        gt.filter(function(x){ return !pv.mine || x.assignee===CURRENT_USER || x.co_assignee===CURRENT_USER; }).forEach(function(x){ h += taskRowHtml(x, locked, td); });
      });
    }
    h += '</div>';
  });
  return h;
}
function taskRowHtml(x, locked, td){
  var done = x.status==='Done', late = !done && x.due_date && x.due_date < td, canEdit = isAdminUser() || x.assignee===CURRENT_USER || x.co_assignee===CURRENT_USER;
  var who = esc(x.assignee||'unassigned')+(x.co_assignee?' + '+esc(x.co_assignee):'');
  return '<div class="wc-task'+(done?' done':'')+'"><span class="wc-check'+(done?' on':'')+((locked&&!isAdminUser())||(!canEdit)?' lock':'')+'" title="'+(canEdit?(locked?'Earlier phase still open':'Tick when done'):'Only the assignee or an admin can tick this')+'" onclick="toggleTask(\''+x.task_id+'\')">'+(done?'✓':'')+'</span>'+
    '<div class="t">'+esc(x.title)+(x.auto_key?' <span class="pill info" style="font-size:10px">auto</span>':'')+(x.status==='Blocked'?' '+pill('Blocked','bad'):'')+'<div class="wc-muted">'+esc(x.role)+(x.co_role?' + '+esc(x.co_role):'')+(done&&x.done_by?' · done by '+esc(x.done_by):'')+(x.notes?' · '+esc(x.notes):'')+'</div></div>'+
    '<span class="who" title="Assigned via SOP role">'+who+'</span><span class="due'+(late?' late':'')+'">'+esc(fmtDate(x.due_date))+(x.due_time?' '+esc(x.due_time):'')+'</span>'+
    (canEdit&&!done?'<button class="btn btn-ghost btn-sm" title="Reassign, flag blocked, add a note" onclick="openTaskMenu(\''+x.task_id+'\')">⋯</button>':'')+'</div>';
}
function setPvMine(v){ STATE.pv.mine = v; render(); }
function togglePv(k, v){ STATE.pv.openKeys[k] = v; render(); }
function taskById(id){ return (DB.projectTasks||[]).filter(function(t){ return t.task_id===id; })[0]; }
function toggleTask(id){
  var x = taskById(id); if(!x) return;
  var to = x.status==='Done' ? 'Todo' : 'Done';
  var p = {task_id:id, status:to, actor:CURRENT_USER};
  api('updateProjectTask', p).then(function(res){
    if(!res.ok){
      if(res.gated && isAdminUser() && confirm(res.error+'\n\nAs admin you can override the SOP order. Override?')){
        p.override = true; return api('updateProjectTask', p).then(function(r2){ if(!r2.ok) return wcFail('Could not update', r2); refreshData(); });
      }
      return wcFail('Not yet', res);
    }
    if(res.phase_changed) wcToast('Phase moved on to '+res.phase+'.');
    refreshData();
  });
}
function openTaskMenu(id){
  var x = taskById(id); if(!x) return;
  var h = '<div class="wc-muted" style="margin-bottom:10px">'+esc(x.title)+'</div>'+
    '<div class="wc-grid g2">'+fld('Assigned to', sel('tm_who', teamNames(), x.assignee, '— unassigned —'))+fld('Status', sel('tm_status',['Todo','In progress','Blocked','Done'], x.status))+'</div>'+
    '<div class="wc-grid g2">'+fld('Due date', inp('tm_due', x.due_date, 'date'))+fld('Due time', inp('tm_time', x.due_time, 'time'))+'</div>'+
    fld('Note (visible on the task; goes to the Ops Lead if blocked)', inp('tm_note', x.notes))+
    '<button class="btn btn-primary" onclick="saveTaskMenu(\''+id+'\')">Save</button>';
  wcModal('task','Task', h);
}
function saveTaskMenu(id){
  var p = {task_id:id, actor:CURRENT_USER, assignee:val('tm_who'), status:val('tm_status'), due_date:val('tm_due'), due_time:val('tm_time'), notes:val('tm_note')};
  api('updateProjectTask', p).then(function(res){ if(!res.ok) return wcFail('Could not save', res); wcClose('task'); refreshData(); });
}

// ── agent tracker ───────────────────────────────────────────────────────
var AG_FLAGS = [['consent','Consent'],['briefed','Briefed'],['in_group','In group'],['accepted','Accepted'],['sample_done','Sample'],['cleared','Cleared']];
function pvAgents(p){
  var ag = projAgents(p.project_id), admin = isAdminUser();
  var active = ag.filter(function(a){ return ['Active','On watch'].indexOf(a.status)>-1; }), wait = ag.filter(function(a){ return a.status==='Waitlist'; });
  var head = Number(p.headcount)||0, rate = Number(p.rate_per_record)||0;
  var due = ag.reduce(function(s,a){ return s+(Number(a.amount_due)||0); },0), unpaid = ag.filter(function(a){ return Number(a.amount_due)>0 && !yes(a.paid); });
  var unpaidSum = unpaid.reduce(function(s,a){ return s+Number(a.amount_due); },0);
  var h = '<div class="wc-grid g4 keep2" style="margin-bottom:14px">'+
    '<div class="card stat-card"><div class="stat-lbl">Active agents</div><div class="stat-num">'+active.length+(head?' / '+head:'')+'</div><div class="stat-sub">target headcount</div></div>'+
    '<div class="card stat-card"><div class="stat-lbl">Waitlist</div><div class="stat-num">'+wait.length+'</div><div class="stat-sub">'+(head?'aim for '+Math.ceil(head*0.2)+'–'+Math.ceil(head*0.3):'20–30% extra')+'</div></div>'+
    '<div class="card stat-card"><div class="stat-lbl">Approved records</div><div class="stat-num">'+ag.reduce(function(s,a){return s+(Number(a.approved)||0);},0)+'</div><div class="stat-sub">'+ag.reduce(function(s,a){return s+(Number(a.declined)||0);},0)+' declined</div></div>'+
    '<div class="card stat-card"><div class="stat-lbl">Agent pay due</div><div class="stat-num">'+money(unpaidSum,p.currency)+'</div><div class="stat-sub '+(rate?'':'warn')+'">'+(rate?money(rate,p.currency)+' per approved record':'Set pay per record (Edit details)')+'</div></div></div>';
  h += '<div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px"><button class="btn btn-primary btn-sm" onclick="openAgentImport(\''+p.project_id+'\')">Import agents (paste from sheet)</button><button class="btn btn-ghost btn-sm" onclick="openAddAgent(\''+p.project_id+'\')">+ Add agent</button>'+
    '<button class="btn btn-ghost btn-sm" onclick="bulkAgents(\''+p.project_id+'\',\'consent\')">Everyone consented</button><button class="btn btn-ghost btn-sm" onclick="bulkAgents(\''+p.project_id+'\',\'briefed\')">Everyone briefed</button><button class="btn btn-ghost btn-sm" onclick="bulkAgents(\''+p.project_id+'\',\'in_group\')">Everyone in group</button>'+
    '<span style="margin-left:auto"></span>'+(unpaid.length?'<button class="btn btn-ghost btn-sm" onclick="doSendPaymentRequest(\''+p.project_id+'\')">Send payment request to Ops Lead</button>':'')+
    (admin||roleHolder(p,'Operations Lead')===CURRENT_USER ? (unpaid.length?'<button class="btn btn-good btn-sm" onclick="doConfirmPayment(\''+p.project_id+'\')">Confirm payment made ('+money(unpaidSum,p.currency)+')</button>':'') : '')+'</div>';
  h += '<div class="card wc-scroll" style="padding:0"><table class="wc-table"><thead><tr><th>Agent</th><th>Phone</th><th>Location</th>'+AG_FLAGS.map(function(f){ return '<th style="text-align:center">'+f[1]+'</th>'; }).join('')+'<th>Approved</th><th>Declined</th><th>Status</th><th>Due</th><th>Paid</th><th></th></tr></thead><tbody>'+
    (ag.map(function(a){
      var tot = (Number(a.approved)||0)+(Number(a.declined)||0), dr = tot ? Math.round((Number(a.declined)||0)/tot*100) : 0;
      return '<tr><td style="white-space:nowrap"><b>'+esc(a.name)+'</b></td><td style="white-space:nowrap">'+esc(a.phone)+'</td><td>'+esc(a.location)+'</td>'+
        AG_FLAGS.map(function(f){ return '<td style="text-align:center"><span class="wc-check'+(yes(a[f[0]])?' on':'')+'" onclick="toggleAgentFlag(\''+a.agent_id+'\',\''+f[0]+'\')">'+(yes(a[f[0]])?'✓':'')+'</span></td>'; }).join('')+
        '<td><input class="wc-input" style="width:64px;padding:4px 6px" type="number" min="0" value="'+(Number(a.approved)||0)+'" onchange="setAgentNum(\''+a.agent_id+'\',\'approved\',this.value)"></td>'+
        '<td><input class="wc-input" style="width:64px;padding:4px 6px" type="number" min="0" value="'+(Number(a.declined)||0)+'" onchange="setAgentNum(\''+a.agent_id+'\',\'declined\',this.value)">'+(tot>=4?'<div class="wc-muted">'+dr+'%</div>':'')+'</td>'+
        '<td><select class="wc-sel" style="padding:4px 6px;width:100px" onchange="setAgentField(\''+a.agent_id+'\',\'status\',this.value)">'+optionsHtml(['Active','On watch','Suspended','Waitlist','Removed'], a.status)+'</select></td>'+
        '<td>'+(Number(a.amount_due)?money(a.amount_due,p.currency):'—')+'</td>'+
        '<td>'+(Number(a.amount_due)>0?'<span class="wc-check'+(yes(a.paid)?' on':'')+'" onclick="toggleAgentFlag(\''+a.agent_id+'\',\'paid\')">'+(yes(a.paid)?'✓':'')+'</span>':'')+'</td>'+
        '<td><button class="btn btn-ghost btn-sm" title="Remove" onclick="removeAgent(\''+a.agent_id+'\')">✕</button></td></tr>';
    }).join('') || '<tr><td colspan="16" class="empty">No agents yet. Import them from your recruitment sheet — name, phone, location.</td></tr>')+'</tbody></table></div>'+
    '<div class="wc-note" style="margin-top:12px">Decline rate above <b>15%</b> puts an agent <b>on watch</b>, above <b>25%</b> <b>suspends</b> them (needs 4+ reviewed records) and Field Ops is notified. Ticking everything here ticks the matching Pre-Fieldwork checklist items automatically.</div>';
  return h;
}
function roleHolder(p, role){ return String(projRoles(p)[role]||'').split(',')[0].trim(); }
function agentById(id){ return (DB.projectAgents||[]).filter(function(a){ return a.agent_id===id; })[0]; }
function afterAgent(res){ if(!res.ok) return wcFail('Could not save', res); if(res.auto_ticked) wcToast(res.auto_ticked+' checklist item(s) ticked automatically.'); refreshData(); }
function toggleAgentFlag(id, f){ var a = agentById(id); var p = {agent_id:id, actor:CURRENT_USER}; p[f] = yes(a[f]) ? 'no' : 'yes'; api('updateProjectAgent', p).then(afterAgent); }
function setAgentNum(id, f, v){ var p = {agent_id:id, actor:CURRENT_USER}; p[f] = Number(v)||0; api('updateProjectAgent', p).then(afterAgent); }
function setAgentField(id, f, v){ var p = {agent_id:id, actor:CURRENT_USER}; p[f] = v; api('updateProjectAgent', p).then(afterAgent); }
function bulkAgents(pid, f){ var fields = {}; fields[f] = 'yes'; api('bulkUpdateProjectAgents', {project_id:pid, fields:fields, actor:CURRENT_USER}).then(afterAgent); }
function removeAgent(id){ var a = agentById(id); if(!confirm('Remove '+a.name+' from this project?')) return; api('deleteProjectAgent', {agent_id:id, actor:CURRENT_USER}).then(afterAgent); }
function openAddAgent(pid){
  var h = '<div class="wc-grid g2">'+fld('Name', inp('aa_name'))+fld('Phone', inp('aa_phone'))+'</div><div class="wc-grid g2">'+fld('Location', inp('aa_loc'))+fld('Start as', sel('aa_status',['Active','Waitlist'],'Active'))+'</div><button class="btn btn-primary" onclick="saveAddAgent(\''+pid+'\')">Add agent</button>';
  wcModal('agent','Add agent', h);
}
function saveAddAgent(pid){
  if(!val('aa_name').trim()) return wcToast('Name is required.', true);
  api('importProjectAgents', {project_id:pid, mode:'append', rows:[{name:val('aa_name'), phone:val('aa_phone'), location:val('aa_loc'), status:val('aa_status')}], actor:CURRENT_USER}).then(function(res){ if(res.ok) wcClose('agent'); afterAgent(res); });
}
function openAgentImport(pid){
  var h = '<div class="wc-note" style="margin-bottom:10px">Copy rows straight from your recruitment sheet (Name, Phone, Location — one agent per line, tab- or comma-separated). Optional 4th column: <b>Waitlist</b>.</div>'+
    ta('ai_text','', 'Amina Yusuf\t0803 000 0000\tLagos\nChinedu Obi\t0805 000 0000\tIbadan\tWaitlist', 8)+
    '<div style="display:flex;gap:8px;margin-top:10px;align-items:center"><select class="wc-sel" id="ai_mode" style="width:auto"><option value="append">Add to existing agents</option><option value="replace">Replace all agents</option></select><button class="btn btn-primary" onclick="saveAgentImport(\''+pid+'\')">Import</button></div><div class="wc-help">Duplicates (same phone or name) are skipped.</div>';
  wcModal('agentimp','Import agents', h);
}
function saveAgentImport(pid){
  var rows = val('ai_text').split(/\r?\n/).map(function(l){ return l.split(/\t|,/).map(function(c){ return c.trim(); }); }).filter(function(c){ return c[0]; })
    .filter(function(c){ return !/^name$/i.test(c[0]); }).map(function(c){ return {name:c[0], phone:c[1]||'', location:c[2]||'', status:/wait/i.test(c[3]||'')?'Waitlist':'Active'}; });
  if(!rows.length) return wcToast('Paste at least one agent.', true);
  api('importProjectAgents', {project_id:pid, mode:val('ai_mode'), rows:rows, actor:CURRENT_USER}).then(function(res){ if(res.ok){ wcClose('agentimp'); wcToast(res.created+' added'+(res.skipped?', '+res.skipped+' skipped (duplicates/blank)':'')); } afterAgent(res); });
}
function doSendPaymentRequest(pid){
  api('sendPaymentRequest', {project_id:pid, actor:CURRENT_USER}).then(function(res){ if(!res.ok) return wcFail('Could not send', res); wcToast('Payment request for '+money(res.total)+' sent to '+res.sent_to+'.'); refreshData(); });
}
function doConfirmPayment(pid){
  var p = projectById(pid);
  if(!confirm('Confirm that all outstanding agent payments for “'+p.name+'” have actually been paid out? This records the expense in Finance and ticks the “Payment confirmed” step.')) return;
  api('confirmProjectPayment', {project_id:pid, actor:CURRENT_USER}).then(function(res){ if(!res.ok) return wcFail('Could not confirm', res); wcToast(res.agents+' agents marked paid ('+money(res.total)+') — expense recorded in Finance.'); refreshData(); });
}

// ── project finance (income / expenditure with dates) ───────────────────
function sumEntries(list, type, onlyDone){
  return list.filter(function(e){ return e.type===type && (!onlyDone || ['Received','Paid'].indexOf(e.status)>-1); }).reduce(function(s,e){ return s+(Number(e.amount)||0); },0);
}
function pvFinance(p){
  var list = projEntries(p.project_id).sort(function(a,b){ return String(b.entry_date).localeCompare(String(a.entry_date)); });
  var inc = sumEntries(list,'Income',true), incAll = sumEntries(list,'Income'), exp = sumEntries(list,'Expense',true), expAll = sumEntries(list,'Expense');
  var h = '<div class="wc-grid g4 keep2" style="margin-bottom:14px">'+
    '<div class="card stat-card"><div class="stat-lbl">Income received</div><div class="stat-num" style="color:var(--green)">'+money(inc,p.currency)+'</div><div class="stat-sub">'+money(incAll,p.currency)+' incl. expected</div></div>'+
    '<div class="card stat-card"><div class="stat-lbl">Spent</div><div class="stat-num" style="color:var(--red)">'+money(exp,p.currency)+'</div><div class="stat-sub">'+money(expAll,p.currency)+' incl. planned</div></div>'+
    '<div class="card stat-card"><div class="stat-lbl">Net so far</div><div class="stat-num">'+money(inc-exp,p.currency)+'</div><div class="stat-sub">received − spent</div></div>'+
    '<div class="card stat-card"><div class="stat-lbl">Projected margin</div><div class="stat-num">'+(incAll?Math.round((incAll-expAll)/incAll*100):0)+'%</div><div class="stat-sub">if everything lands</div></div></div>';
  h += '<div style="display:flex;gap:8px;margin-bottom:12px"><button class="btn btn-primary btn-sm" onclick="openFinanceEntry(\''+p.project_id+'\',\'Income\')">+ Income</button><button class="btn btn-ghost btn-sm" onclick="openFinanceEntry(\''+p.project_id+'\',\'Expense\')">+ Expenditure</button></div>';
  h += financeTable(list, false);
  return h;
}

// ═══════════════════════════════════════════════════════════════════════
//  FINANCE · PAYROLL (fed by the Employee Directory) · EMPLOYEES · LEAVE
// ═══════════════════════════════════════════════════════════════════════
var INCOME_CATS = ['Client contract','Client payment','Grant','Prize / competition','Other income'];
var EXPENSE_CATS = ['Agent payments','Data & airtime','Transport','Software & tools','Salaries','Marketing','Equipment','Rent & utilities','Professional fees','Other expense'];
var INCOME_STATUS = ['Expected','Invoiced','Received'], EXPENSE_STATUS = ['Planned','Paid'];

function entryProjectName(e){ var p = projectById(e.project_id); return p ? p.name : '— company —'; }
function financeTable(list, showProject){
  if(!list.length) return '<div class="card"><div class="empty">No entries yet.</div></div>';
  return '<div class="card wc-scroll" style="padding:0"><table class="wc-table"><thead><tr><th>Date</th><th>Type</th>'+(showProject?'<th>Project</th>':'')+'<th>Category</th><th>Description</th><th>Counterparty</th><th style="text-align:right">Amount</th><th>Status</th><th>Invoice</th><th></th></tr></thead><tbody>'+
    list.map(function(e){
      var inc = e.type==='Income', done = ['Received','Paid'].indexOf(e.status)>-1;
      return '<tr><td style="white-space:nowrap">'+esc(fmtDate(e.entry_date))+'</td><td>'+pill(e.type, inc?'good':'bad')+'</td>'+(showProject?'<td>'+esc(entryProjectName(e))+'</td>':'')+
        '<td>'+esc(e.category||'—')+'</td><td>'+esc(e.description||'')+'</td><td>'+esc(e.counterparty||'')+'</td><td style="text-align:right;white-space:nowrap;font-weight:600;color:'+(inc?'var(--green)':'var(--red)')+'">'+(inc?'+':'−')+money(e.amount,e.currency).replace('-','')+'</td>'+
        '<td>'+pill(e.status||(inc?'Received':'Paid'), done?'good':'warn')+'</td><td>'+(e.invoice_url?'<a href="'+esc(e.invoice_url)+'" target="_blank" rel="noopener" style="color:var(--brand)">View</a>':'<span class="wc-muted">—</span>')+'</td>'+
        '<td style="white-space:nowrap"><button class="btn btn-ghost btn-sm" onclick="openFinanceEntry(\'\',\'\',\''+e.entry_id+'\')">Edit</button> <button class="btn btn-ghost btn-sm" onclick="deleteFinanceEntryClick(\''+e.entry_id+'\')">✕</button></td></tr>';
    }).join('')+'</tbody></table></div>';
}
var FIN_DRAFT = null;
function openFinanceEntry(projectId, type, entryId){
  var e = entryId ? DB.financeEntries.filter(function(x){ return x.entry_id===entryId; })[0] : null;
  FIN_DRAFT = e ? Object.assign({}, e) : {entry_id:'', project_id:projectId||'', type:type||'Expense', category:'', amount:'', currency:'NGN', entry_date:today10(), status:(type==='Income'?'Expected':'Paid'), counterparty:'', description:''};
  drawFinanceEntry();
}
function drawFinanceEntry(){
  var d = FIN_DRAFT, inc = d.type==='Income';
  var cats = inc ? INCOME_CATS : EXPENSE_CATS;
  var h = '<div class="wc-seg" style="margin-bottom:14px"><button class="'+(inc?'on':'')+'" onclick="setFinType(\'Income\')">Income</button><button class="'+(!inc?'on':'')+'" onclick="setFinType(\'Expense\')">Expenditure</button></div>'+
    '<div class="wc-grid g2">'+fld('Project', sel('fe_proj', DB.projects.map(function(p){ return {value:p.project_id,label:p.name+(p.kind==='Client'?' (client)':'')}; }), d.project_id, '— company-wide (no project) —'))+
    fld('Date', inp('fe_date', d.entry_date, 'date'))+'</div>'+
    '<div class="wc-grid g2">'+fld('Category', sel('fe_cat', cats.concat(cats.indexOf(d.category)===-1&&d.category?[d.category]:[]), d.category, 'Choose…'))+fld('Status', sel('fe_status', inc?INCOME_STATUS:EXPENSE_STATUS, d.status))+'</div>'+
    '<div class="wc-grid g2">'+fld('Amount', inp('fe_amt', d.amount, 'number', '0', ' step="0.01" min="0"'))+fld('Currency', sel('fe_cur', ['NGN','USD','GBP','EUR'], d.currency||'NGN'))+'</div>'+
    fld(inc?'Paid by':'Paid to', inp('fe_cp', d.counterparty, 'text', inc?'Client / funder':'Vendor / person'))+fld('Description', inp('fe_desc', d.description))+
    fld('Invoice / receipt (optional)', '<input type="file" id="fe_file" class="wc-input" accept=".pdf,.png,.jpg,.jpeg,.webp">'+(d.invoice_url?'<div class="wc-help">Current: <a href="'+esc(d.invoice_url)+'" target="_blank" rel="noopener">view</a> — choosing a new file replaces it.</div>':''), 'Saved to your Drive.')+
    '<button class="btn btn-primary" id="fe_go" onclick="saveFinanceEntry()">'+(d.entry_id?'Save changes':'Add entry')+'</button>';
  wcModal('fin', d.entry_id?'Edit entry':'New entry', h);
}
function readFinDraft(){
  var d = FIN_DRAFT; d.project_id = val('fe_proj'); d.entry_date = val('fe_date'); d.category = val('fe_cat'); d.status = val('fe_status');
  d.amount = val('fe_amt'); d.currency = val('fe_cur'); d.counterparty = val('fe_cp'); d.description = val('fe_desc');
}
function setFinType(t){ readFinDraft(); FIN_DRAFT.type = t; FIN_DRAFT.category = ''; FIN_DRAFT.status = t==='Income'?'Expected':'Paid'; drawFinanceEntry(); }
function saveFinanceEntry(){
  var fileEl = document.getElementById('fe_file'), file = fileEl && fileEl.files && fileEl.files[0];
  readFinDraft(); var d = FIN_DRAFT;
  if(!(Number(d.amount) > 0)) return wcToast('Enter an amount greater than zero.', true);
  if(!d.entry_date) return wcToast('Pick the date.', true);
  if(file && file.size > 6*1024*1024) return wcToast('That file is over 6 MB — please attach a smaller one.', true);
  var b = document.getElementById('fe_go'); b.disabled = true; b.textContent = 'Saving…';
  var payload = {project_id:d.project_id, type:d.type, category:d.category, amount:Number(d.amount), currency:d.currency, entry_date:d.entry_date, status:d.status, counterparty:d.counterparty, description:d.description, actor:CURRENT_USER};
  var p = d.entry_id ? api('updateFinanceEntry', Object.assign({entry_id:d.entry_id}, payload)) : api('createFinanceEntry', payload);
  p.then(function(res){
    if(!res.ok){ b.disabled = false; b.textContent = 'Save'; return wcFail('Could not save', res); }
    var id = d.entry_id || (res.entry && res.entry.entry_id);
    var done = function(){ wcClose('fin'); refreshData().then(function(){ wcToast('Saved.'); }); };
    if(!file) return done();
    var rd = new FileReader();
    rd.onload = function(){
      api('uploadFinanceInvoice', {entry_id:id, file_name:file.name, mime_type:file.type||'application/octet-stream', data_base64:String(rd.result).split(',')[1]||''}).then(function(r2){
        if(!r2.ok) wcFail('Saved, but the invoice upload failed', r2);
        done();
      });
    };
    rd.readAsDataURL(file);
  });
}
function deleteFinanceEntryClick(id){
  if(!confirm('Delete this finance entry?')) return;
  api('deleteFinanceEntry', {entry_id:id}).then(function(res){
    if(!res.ok) return wcFail('Could not delete', res);
    DB.financeEntries = DB.financeEntries.filter(function(e){ return e.entry_id!==id; }); render();
  });
}

function renderFinance(){
  if(!isAdminUser()) return wcPage('<div class="empty">Finance is restricted to Admins.</div>');
  var f = STATE.fin || (STATE.fin = {period:'All', type:'All', project:'', q:''});
  var all = DB.financeEntries.slice();
  var months = all.map(function(e){ return String(e.entry_date).slice(0,7); }).filter(function(m,i,a){ return m && a.indexOf(m)===i; }).sort().reverse();
  var list = all.filter(function(e){
    if(f.period!=='All' && String(e.entry_date).slice(0,7)!==f.period) return false;
    if(f.type!=='All' && e.type!==f.type) return false;
    if(f.project==='__none' && e.project_id) return false;
    if(f.project && f.project!=='__none' && e.project_id!==f.project) return false;
    if(f.q && [e.description,e.category,e.counterparty,entryProjectName(e)].join(' ').toLowerCase().indexOf(f.q.toLowerCase())===-1) return false;
    return true;
  }).sort(function(a,b){ return String(b.entry_date).localeCompare(String(a.entry_date)); });
  var cur = 'NGN', main = list.filter(function(e){ return (e.currency||'NGN')===cur; });
  var other = list.filter(function(e){ return (e.currency||'NGN')!==cur; });
  var inc = sumEntries(main,'Income',true), exp = sumEntries(main,'Expense',true), recv = sumEntries(main,'Income') - inc, planned = sumEntries(main,'Expense') - exp;
  var h = wcHead('Finance Dashboard', 'Every project lands here when it is created. Record income and expenditure against it, with dates and invoices.',
    '<button class="btn btn-primary" onclick="openFinanceEntry(\'\',\'Income\')">+ Income</button><button class="btn btn-ghost" onclick="openFinanceEntry(\'\',\'Expense\')">+ Expenditure</button>');
  h += '<div class="wc-grid g4 keep2" style="margin-bottom:16px">'+
    '<div class="card stat-card"><div class="stat-lbl">Income received</div><div class="stat-num" style="color:var(--green)">'+money(inc)+'</div><div class="stat-sub">'+money(recv)+' still expected</div></div>'+
    '<div class="card stat-card"><div class="stat-lbl">Spent</div><div class="stat-num" style="color:var(--red)">'+money(exp)+'</div><div class="stat-sub">'+money(planned)+' planned</div></div>'+
    '<div class="card stat-card"><div class="stat-lbl">Net cash</div><div class="stat-num">'+money(inc-exp)+'</div><div class="stat-sub '+(inc-exp<0?'bad':'good')+'">'+(inc-exp<0?'spending ahead of income':'in the green')+'</div></div>'+
    '<div class="card stat-card"><div class="stat-lbl">Entries</div><div class="stat-num">'+list.length+'</div><div class="stat-sub">'+(other.length?other.length+' in other currencies (listed, not summed)':'in this view')+'</div></div></div>';

  // per-project summary
  var byProj = {};
  main.forEach(function(e){ var k = e.project_id||'__none'; if(!byProj[k]) byProj[k] = {inc:0,exp:0,incAll:0,expAll:0}; var r = byProj[k], a = Number(e.amount)||0, done = ['Received','Paid'].indexOf(e.status)>-1;
    if(e.type==='Income'){ r.incAll += a; if(done) r.inc += a; } else { r.expAll += a; if(done) r.exp += a; } });
  var projRows = DB.projects.map(function(p){ return {p:p, r:byProj[p.project_id]||{inc:0,exp:0,incAll:0,expAll:0}}; });
  h += '<div class="card" style="padding:16px 18px;margin-bottom:16px"><div class="card-h">By project</div><div class="wc-scroll"><table class="wc-table"><thead><tr><th>Project</th><th>Type</th><th style="text-align:right">Income (received / expected)</th><th style="text-align:right">Spent (paid / planned)</th><th style="text-align:right">Net</th><th></th></tr></thead><tbody>'+
    (projRows.map(function(x){ return '<tr><td><b>'+esc(x.p.name)+'</b></td><td>'+pill(x.p.kind==='Client'?'Client':'Team', x.p.kind==='Client'?'info':'mute')+'</td><td style="text-align:right">'+money(x.r.inc)+' / '+money(x.r.incAll)+'</td><td style="text-align:right">'+money(x.r.exp)+' / '+money(x.r.expAll)+'</td><td style="text-align:right;font-weight:600">'+money(x.r.inc-x.r.exp)+'</td><td><button class="btn btn-ghost btn-sm" onclick="openProject(\''+x.p.project_id+'\',\'finance\')">Open</button></td></tr>'; }).join('') || '<tr><td colspan="6" class="empty">No projects yet — create one and it appears here.</td></tr>')+
    (byProj.__none ? '<tr><td><i>Company-wide (no project)</i></td><td></td><td style="text-align:right">'+money(byProj.__none.inc)+' / '+money(byProj.__none.incAll)+'</td><td style="text-align:right">'+money(byProj.__none.exp)+' / '+money(byProj.__none.expAll)+'</td><td style="text-align:right;font-weight:600">'+money(byProj.__none.inc-byProj.__none.exp)+'</td><td></td></tr>' : '')+'</tbody></table></div></div>';

  // monthly bars
  var mm = {}; main.forEach(function(e){ if(['Received','Paid'].indexOf(e.status)===-1) return; var m = String(e.entry_date).slice(0,7); if(!mm[m]) mm[m] = {i:0,e:0}; if(e.type==='Income') mm[m].i += Number(e.amount)||0; else mm[m].e += Number(e.amount)||0; });
  var mk = Object.keys(mm).sort().slice(-6), mx = Math.max.apply(null, [1].concat(mk.map(function(k){ return Math.max(mm[k].i, mm[k].e); })));
  if(mk.length) h += '<div class="card" style="padding:16px 18px;margin-bottom:16px"><div class="card-h">Cash by month <span class="wc-muted" style="font-weight:400">green income · red spend</span></div><div style="display:flex;gap:18px;align-items:flex-end;height:120px">'+
    mk.map(function(k){ return '<div style="flex:1;text-align:center"><div style="display:flex;gap:4px;align-items:flex-end;height:96px;justify-content:center"><div title="Income '+money(mm[k].i)+'" style="width:40%;max-width:34px;background:var(--green);border-radius:5px 5px 0 0;height:'+Math.max(2,Math.round(mm[k].i/mx*96))+'px"></div><div title="Spend '+money(mm[k].e)+'" style="width:40%;max-width:34px;background:var(--red);border-radius:5px 5px 0 0;height:'+Math.max(2,Math.round(mm[k].e/mx*96))+'px"></div></div><div class="wc-muted" style="margin-top:4px">'+k+'</div></div>'; }).join('')+'</div></div>';

  h += '<div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px"><select class="wc-sel" style="width:auto" onchange="setFin(\'period\',this.value)">'+optionsHtml(['All'].concat(months), f.period)+'</select>'+
    '<select class="wc-sel" style="width:auto" onchange="setFin(\'type\',this.value)">'+optionsHtml([{value:'All',label:'Income & expenditure'},{value:'Income',label:'Income only'},{value:'Expense',label:'Expenditure only'}], f.type)+'</select>'+
    '<select class="wc-sel" style="width:auto" onchange="setFin(\'project\',this.value)"><option value="">All projects</option><option value="__none"'+(f.project==='__none'?' selected':'')+'>Company-wide</option>'+DB.projects.map(function(p){ return '<option value="'+p.project_id+'"'+(f.project===p.project_id?' selected':'')+'>'+esc(p.name)+'</option>'; }).join('')+'</select>'+
    '<input class="wc-input" style="width:200px" placeholder="Search…" value="'+esc(f.q)+'" onchange="setFin(\'q\',this.value)"></div>';
  h += financeTable(list, true);
  return wcPage(h);
}
function setFin(k, v){ STATE.fin[k] = v; render(); }

// ── Payroll — pulls salary + bank details from the Employee Directory ───
function curMonth(){ return new Date().toISOString().slice(0,7); }
function renderPayroll(){
  if(!isAdminUser()) return wcPage('<div class="empty">Payroll is restricted to Admins.</div>');
  if(!STATE.payrollMonth) STATE.payrollMonth = curMonth();
  var m = STATE.payrollMonth;
  var months = DB.payroll.map(function(p){ return p.month; }).filter(function(x,i,a){ return x && a.indexOf(x)===i; });
  if(months.indexOf(curMonth())===-1) months.push(curMonth()); if(months.indexOf(m)===-1) months.push(m);
  months.sort().reverse();
  var items = DB.payroll.filter(function(p){ return p.month===m; });
  var total = items.reduce(function(s,p){ return s+(Number(p.salary_amount)||0); },0);
  var missingSalary = DB.team.filter(function(p){ return !(Number(p.salary_amount)>0); });
  var missingBank = DB.team.filter(function(p){ return Number(p.salary_amount)>0 && !(p.account_number && p.bank_code); });
  var inSync = items.filter(function(p){ var t = DB.team.filter(function(x){ return x.name===p.team_member_name; })[0]; return t && p.status!=='Paid' && (String(t.salary_amount)!==String(p.salary_amount) || String(t.account_number)!==String(p.account_number)); });
  var h = wcHead('Payroll', 'This app <b>never moves money</b>. It prepares the run, verifies bank accounts with Paystack and gives you a bulk-payment file (Bank Code, Account Number, Amount, Narration) to upload on the platform you pay from.',
    '<button class="btn btn-ghost" onclick="goTo(\'employees\')">Edit salaries in Employee Directory</button>');
  h += '<div class="wc-note" style="margin-bottom:14px"><b>Where the data comes from:</b> each person’s salary and bank details are entered once in <a href="#" onclick="goTo(\'employees\');return false" style="color:var(--brand);font-weight:600">Employee Directory</a>. “Pull from directory” copies them into the month’s run; “Re-sync” refreshes unpaid rows after you edit the directory.</div>';
  if(missingSalary.length) h += '<div class="wc-note warn" style="margin-bottom:14px"><b>No salary set yet for:</b> '+missingSalary.map(function(p){ return esc(p.name); }).join(', ')+' — they will be skipped until you add it in the Employee Directory.</div>';
  if(missingBank.length) h += '<div class="wc-note warn" style="margin-bottom:14px"><b>Salary but no bank details:</b> '+missingBank.map(function(p){ return esc(p.name); }).join(', ')+'.</div>';
  h += '<div class="wc-grid g4 keep2" style="margin-bottom:16px">'+
    '<div class="card stat-card"><div class="stat-lbl">Month total</div><div class="stat-num">'+money(total)+'</div><div class="stat-sub">'+items.length+' people</div></div>'+
    '<div class="card stat-card"><div class="stat-lbl">Accounts verified</div><div class="stat-num">'+items.filter(function(p){ return p.account_verified==='yes'; }).length+' / '+items.length+'</div><div class="stat-sub '+(items.some(function(p){return p.account_verified!=='yes';})?'warn':'good')+'">needed before export</div></div>'+
    '<div class="card stat-card"><div class="stat-lbl">Paid</div><div class="stat-num">'+items.filter(function(p){ return p.status==='Paid'; }).length+' / '+items.length+'</div><div class="stat-sub">marked after you transfer</div></div>'+
    '<div class="card stat-card"><div class="stat-lbl">Next pay day</div><div class="stat-num">'+nextPayrollInfo().days+'d</div><div class="stat-sub">'+esc(fmtDate(nextPayrollInfo().due))+'</div></div></div>';
  h += '<div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-bottom:12px"><select class="wc-sel" style="width:auto" onchange="setPayrollMonth(this.value)">'+optionsHtml(months, m)+'</select>'+
    '<button class="btn btn-primary" onclick="pullPayroll()">Pull from directory</button>'+
    '<button class="btn btn-ghost" onclick="syncPayroll()">Re-sync'+(inSync.length?' ('+inSync.length+' changed)':'')+'</button>'+
    '<button class="btn btn-ghost" onclick="verifyAllPayroll()">Verify all accounts</button>'+
    '<button class="btn btn-ghost" onclick="exportPayrollCsvClick()">Export bulk payment file</button></div>';
  h += '<div class="card wc-scroll" style="padding:0"><table class="wc-table"><thead><tr><th>Team member</th><th>Bank</th><th>Account</th><th>Verified as</th><th style="text-align:right">Salary</th><th>Status</th><th></th></tr></thead><tbody>'+
    (items.map(function(p){ return '<tr><td><b>'+esc(p.team_member_name)+'</b></td><td>'+esc(p.bank_name||'—')+'</td><td>'+esc(p.account_number||'—')+'</td><td>'+(p.account_verified==='yes'?pill(p.account_name||'Verified','good'):pill('Not verified','warn'))+'</td>'+
      '<td style="text-align:right">'+(p.status==='Paid'?money(p.salary_amount):'<input class="wc-input" type="number" style="width:120px;text-align:right;padding:4px 8px" value="'+(Number(p.salary_amount)||0)+'" onchange="savePayrollField(\''+p.payroll_id+'\',\'salary_amount\',this.value)">')+'</td>'+
      '<td>'+pill(p.status, p.status==='Paid'?'good':'mute')+'</td><td style="white-space:nowrap">'+(p.status!=='Paid'?'<button class="btn btn-ghost btn-sm" onclick="verifyPayrollAcct(\''+p.payroll_id+'\')">Verify</button> <button class="btn btn-good btn-sm" onclick="markPayrollPaidClick(\''+p.payroll_id+'\')">Mark paid</button>':'')+'</td></tr>'; }).join('') ||
      '<tr><td colspan="7" class="empty">No run for '+esc(m)+' yet. Press <b>Pull from directory</b> to create it from everyone’s salary details.</td></tr>')+'</tbody></table></div>';
  return wcPage(h);
}
function setPayrollMonth(m){ STATE.payrollMonth = m; render(); }
function pullPayroll(){
  var m = STATE.payrollMonth;
  api('generateMonthlyPayrollBatch', {month:m, actor:CURRENT_USER}).then(function(res){
    if(!res.ok) return wcFail('Could not pull payroll', res);
    refreshData().then(function(){
      var sk = res.skipped_no_salary; var skn = Array.isArray(sk) ? sk.length : (sk||0);
      wcToast(res.created+' entries created for '+m+(skn?' · '+skn+' skipped (no salary in directory)':'')+(res.created===0&&!skn?' · already pulled':''));
    });
  });
}
function syncPayroll(){
  api('syncPayrollFromTeam', {month:STATE.payrollMonth, actor:CURRENT_USER}).then(function(res){ if(!res.ok) return wcFail('Could not re-sync', res); refreshData().then(function(){ wcToast(res.updated+' unpaid rows refreshed from the directory.'); }); });
}
function verifyPayrollAcct(id){
  var p = DB.payroll.filter(function(x){ return x.payroll_id===id; })[0];
  if(!p.account_number || !p.bank_code) return wcToast('Add this person’s bank and account number in the Employee Directory first.', true);
  api('verifyPayrollAccount', {payroll_id:id, account_number:p.account_number, bank_code:p.bank_code}).then(function(res){
    if(!res.ok) return wcFail('Verification failed', res);
    p.account_verified = 'yes'; p.account_name = res.account_name; render(); wcToast('Verified: '+res.account_name);
  });
}
function verifyAllPayroll(){
  var todo = DB.payroll.filter(function(p){ return p.month===STATE.payrollMonth && p.status!=='Paid' && p.account_verified!=='yes' && p.account_number && p.bank_code; });
  if(!todo.length) return wcToast('Nothing left to verify.');
  var n = 0, bad = [];
  (function next(i){
    if(i>=todo.length){ refreshData().then(function(){ wcToast(n+' verified'+(bad.length?' · failed: '+bad.join(', '):''), bad.length>0); }); return; }
    api('verifyPayrollAccount', {payroll_id:todo[i].payroll_id, account_number:todo[i].account_number, bank_code:todo[i].bank_code}).then(function(r){ if(r.ok) n++; else bad.push(todo[i].team_member_name); next(i+1); });
  })(0);
}
function savePayrollField(id, field, value){
  var payload = {payroll_id:id}; payload[field] = field==='salary_amount' ? Number(value)||0 : value;
  api('updatePayrollEntry', payload).then(function(res){ if(!res.ok) return wcFail('Could not save', res); var p = DB.payroll.filter(function(x){ return x.payroll_id===id; })[0]; if(p) p[field] = payload[field]; render(); });
}
function markPayrollPaidClick(id){
  if(!confirm('Mark this as paid? Only do this after you have actually paid the salary on your payment platform.')) return;
  api('markPayrollPaid', {payroll_id:id, actor:CURRENT_USER}).then(function(res){ if(!res.ok) return wcFail('Could not update', res); refreshData(); });
}
function exportPayrollCsvClick(){
  api('exportPayrollCsv', {month:STATE.payrollMonth}).then(function(res){
    if(!res.ok) return wcFail('Could not export', res);
    var blob, ext;
    if(res.xlsx_base64){
      var bin = atob(res.xlsx_base64), arr = new Uint8Array(bin.length); for(var i=0;i<bin.length;i++) arr[i] = bin.charCodeAt(i);
      blob = new Blob([arr], {type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'}); ext = 'xlsx';
    } else { blob = new Blob([res.csv], {type:'text/csv'}); ext = 'csv'; }
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob); a.download = (res.filename||('bulk-transactions-'+STATE.payrollMonth))+'.'+ext; document.body.appendChild(a); a.click(); a.remove();
    wcToast('Bulk file for '+res.count+' people downloaded ('+ext.toUpperCase()+') — upload it on your payment platform.'+(ext==='csv'?' (Excel copy unavailable, CSV used.)':''));
  });
}

// ── Employee Directory (admin) — the single source for salary/bank/SOP role ─
var BANKS = null, EMP_DRAFT = null;
function renderEmployees(){
  if(!isAdminUser()) return wcPage('<div class="empty">The Employee Directory is restricted to Admins.</div>');
  var q = (STATE.empQ||'').toLowerCase();
  var list = DB.team.filter(function(p){ return !q || [p.name,p.email,p.department,p.role,p.sop_role].join(' ').toLowerCase().indexOf(q)>-1; });
  var h = wcHead('Employee Directory', 'Salary, bank and SOP-role details live here. Payroll reads salary and bank from this page; project roles read the SOP role.',
    '<button class="btn btn-primary" onclick="openEmployee(\'\')">+ Add team member</button>');
  h += '<div style="margin-bottom:12px"><input class="wc-input" style="max-width:320px" placeholder="Search people…" value="'+esc(STATE.empQ||'')+'" onchange="STATE.empQ=this.value;render()"></div>';
  h += '<div class="card wc-scroll" style="padding:0"><table class="wc-table"><thead><tr><th>Name</th><th>Role · Dept</th><th>SOP role(s)</th><th>Systems</th><th>Phone</th><th style="text-align:right">Salary / month</th><th>Bank</th><th></th></tr></thead><tbody>'+
    list.map(function(p){
      var sal = Number(p.salary_amount)>0, bank = p.account_number && p.bank_code;
      return '<tr><td><b>'+esc(p.name)+'</b><div class="wc-muted">'+esc(p.email)+'</div></td><td>'+esc(p.role||'')+'<div class="wc-muted">'+esc(p.department||'')+'</div></td><td>'+esc(String(p.sop_role||'—'))+'</td><td>'+esc(String(p.systems||'—'))+'</td><td>'+esc(p.phone||'—')+'</td>'+
        '<td style="text-align:right">'+(sal?money(p.salary_amount):pill('Not set','warn'))+'</td><td>'+(bank?esc(p.bank_name||p.bank_code)+'<div class="wc-muted">'+esc(p.account_number)+'</div>':pill('Not set','warn'))+'</td>'+
        '<td><button class="btn btn-ghost btn-sm" onclick="openEmployee(\''+esc(p.email)+'\')">Edit</button></td></tr>'; }).join('')+'</tbody></table></div>';
  return wcPage(h);
}
function chipList(id, all, selected){ return all.map(function(v){ return '<span class="wc-chip'+(selected.indexOf(v)>-1?' on':'')+'" data-v="'+esc(v)+'" onclick="this.classList.toggle(\'on\')">'+esc(v)+'</span>'; }).join(''); }
function chipVals(id){ return Array.prototype.slice.call(document.querySelectorAll('#'+id+' .wc-chip.on')).map(function(c){ return c.getAttribute('data-v'); }); }
function openEmployee(email){
  var p = email ? DB.team.filter(function(x){ return x.email===email; })[0] : {name:'',email:'',role:'Staff',department:'Operations'};
  EMP_DRAFT = p;
  var csv = function(v){ return String(v||'').split(',').map(function(x){ return x.trim(); }).filter(Boolean); };
  var h = '<div class="wc-grid g2">'+fld('Full name', inp('em_name', p.name))+fld('Work email (their Google account)', inp('em_email', p.email, 'email', '', email?' readonly':''))+'</div>'+
    '<div class="wc-grid g3">'+fld('Department', sel('em_dept',['Growth','Product & Operations','Engineering','Marketing','Leadership'], /^operations?$/i.test(p.department||'')?'Product & Operations':p.department))+fld('Access role', sel('em_role',['Staff','Leadership','Admin'], p.role||'Staff', undefined, isCoreAdmin()?'':' disabled'), 'Admin: everything. Leadership: everything except core settings. Only an Admin can change this.')+fld('Slack Member ID', inp('em_slack', p.slack_handle, 'text', 'U01ABCDEF'), 'Profile → ⋯ → Copy member ID.')+'</div>'+
    '<div class="wc-grid g3">'+fld('Marketing contributor', sel('em_mkt',['No','Yes'], String(p.marketing_contributor||'').toLowerCase()==='yes'?'Yes':'No'), 'Lets an intern or colleague enter social numbers and work on content without joining the Marketing team.')+'</div>'+
    '<div class="wc-f"><label class="wc-lbl">SOP role(s) on client projects</label><div id="em_sop">'+chipList('em_sop', SOP_ROLE_LIST, csv(p.sop_role))+'</div><div class="wc-help">Pre-fills the role pickers when you create a client project.</div></div>'+
    '<div class="wc-f"><label class="wc-lbl">Systems they own (bugs from UAT route to them)</label><div id="em_sys">'+chipList('em_sys', SOP_SYSTEMS, csv(p.systems))+'</div></div>'+
    '<div class="wc-grid g3">'+fld('Phone', inp('em_phone', p.phone))+fld('Birthday', inp('em_bday', p.birthday, 'date'))+fld('Start date', inp('em_start', p.start_date, 'date'))+'</div>'+
    '<div class="card-h" style="margin-top:6px">Pay</div><div class="wc-grid g2">'+fld('Monthly salary (₦)', inp('em_sal', p.salary_amount, 'number', '0'))+fld('Emergency contact', inp('em_emerg', p.emergency_contact))+'</div>'+
    '<div class="wc-grid g3">'+fld('Bank', '<select class="wc-sel" id="em_bank" onchange="pickBank(this)"><option value="">'+(p.bank_name?esc(p.bank_name):'Choose bank…')+'</option></select>')+fld('Bank code', inp('em_bcode', p.bank_code, 'text', '058'))+fld('Account number', inp('em_acct', p.account_number))+'</div>'+
    '<div class="wc-help" id="em_bankhelp" style="margin:-6px 0 10px"></div>'+
    '<div style="display:flex;gap:8px"><button class="btn btn-primary" id="em_go" onclick="saveEmployee('+(email?'true':'false')+')">'+(email?'Save':'Add & send welcome')+'</button><button class="btn btn-ghost" onclick="wcClose(\'emp\')">Cancel</button></div>';
  wcModal('emp', email?esc(p.name):'Add team member', h, true);
  loadBanks(p.bank_code);
}
function loadBanks(cur){
  var s = document.getElementById('em_bank'); if(!s) return;
  var fill = function(){ s.innerHTML = '<option value="">Choose bank…</option>'+BANKS.map(function(b){ return '<option value="'+esc(b.code)+'" data-n="'+esc(b.name)+'"'+(String(b.code)===String(cur)?' selected':'')+'>'+esc(b.name)+'</option>'; }).join(''); };
  if(BANKS) return fill();
  api('listPaystackBanks', {}).then(function(res){
    if(res.ok && res.banks){ BANKS = res.banks; fill(); }
    else { var hp = document.getElementById('em_bankhelp'); if(hp) hp.textContent = 'Bank list unavailable ('+((res&&res.error)||'no Paystack key')+') — type the bank name and Paystack bank code by hand.'; var f = document.getElementById('em_bank'); if(f) f.outerHTML = inp('em_bname', (EMP_DRAFT||{}).bank_name, 'text', 'Bank name'); }
  });
}
function pickBank(s){ var o = s.options[s.selectedIndex]; document.getElementById('em_bcode').value = o.value; }
function saveEmployee(isEdit){
  var payload = {name:val('em_name').trim(), email:val('em_email').trim(), department:val('em_dept'), role:val('em_role'), marketing_contributor:val('em_mkt')==='Yes'?'yes':'', slack_handle:val('em_slack').trim(),
    sop_role:chipVals('em_sop').join(', '), systems:chipVals('em_sys').join(', '), phone:val('em_phone'), birthday:val('em_bday'), start_date:val('em_start'),
    salary_amount:Number(val('em_sal'))||'', emergency_contact:val('em_emerg'), bank_code:val('em_bcode'), account_number:val('em_acct'), actor:CURRENT_USER};
  var bs = document.getElementById('em_bank'); var bname = bs ? (bs.selectedIndex>0 ? bs.options[bs.selectedIndex].getAttribute('data-n') : (EMP_DRAFT||{}).bank_name) : val('em_bname');
  payload.bank_name = bname || '';
  var old = EMP_DRAFT||{}; if(String(old.account_number||'')!==String(payload.account_number) || String(old.bank_code||'')!==String(payload.bank_code)) payload.account_name = '';
  if(!payload.name || !payload.email) return wcToast('Name and email are required.', true);
  if(isEdit) payload.quiet = true;
  var b = document.getElementById('em_go'); b.disabled = true;
  api(isEdit?'updateTeamMember':'createTeamMember', payload).then(function(res){
    b.disabled = false;
    if(!res.ok) return wcFail('Could not save', res);
    wcClose('emp'); refreshData().then(function(){
      var m = '';
      if(!isEdit) m = ' · welcome email '+(res.email_status&&res.email_status.ok?'sent':'not sent')+', Slack DM '+(res.slack_status&&res.slack_status.ok?'sent':'not sent'+(res.slack_status&&res.slack_status.error?' ('+res.slack_status.error+')':''));
      wcToast(payload.name+(isEdit?' updated.':' added')+m, !isEdit && !(res.slack_status&&res.slack_status.ok) && false);
    });
  });
}

// ── Team Directory (everyone) + my own profile ──────────────────────────
function renderTeamSpaces(){
  var q = (STATE.teamQ||'').toLowerCase();
  var list = DB.team.filter(function(p){ return !q || [p.name,p.department,p.role,p.sop_role,p.systems].join(' ').toLowerCase().indexOf(q)>-1; });
  var h = wcHead('Team Directory', 'Everyone at WeCollect. Book a meeting with anyone, and keep your own details up to date.',
    '<button class="btn btn-ghost" onclick="openMyProfile()">My profile</button>'+(isAdminUser()?'<button class="btn btn-primary" onclick="openEmployee(\'\')">+ Add team member</button>':''));
  h += '<div style="margin-bottom:12px"><input class="wc-input" style="max-width:320px" placeholder="Search people, roles, systems…" value="'+esc(STATE.teamQ||'')+'" onchange="STATE.teamQ=this.value;render()"></div><div class="wc-grid g3">';
  h += list.map(function(p){
    var open = DB.tickets.filter(function(t){ return t.owner===p.name && t.status!=='Done'; }).length, td = today10();
    var out = (DB.timeOff||[]).some(function(l){ return l.team_member_name===p.name && l.start_date<=td && l.end_date>=td; });
    return '<div class="card" style="padding:16px 18px"><div style="display:flex;gap:12px;align-items:center;margin-bottom:10px"><div class="avatar" style="width:40px;height:40px;font-size:14px;background:var(--brand-bg);color:var(--brand)">'+esc(initials(p.name))+'</div><div style="min-width:0"><div class="disp" style="font-weight:600;font-size:15px">'+esc(p.name)+'</div><div class="wc-muted">'+esc(p.role||'')+(p.department?' · '+esc(p.department):'')+'</div></div>'+(out?'<span style="margin-left:auto">'+pill('Out today','warn')+'</span>':'')+'</div>'+
      (p.sop_role?'<div style="font-size:12.5px;margin-bottom:4px"><span class="wc-muted">SOP:</span> '+esc(p.sop_role)+'</div>':'')+(p.systems?'<div style="font-size:12.5px;margin-bottom:4px"><span class="wc-muted">Systems:</span> '+esc(p.systems)+'</div>':'')+
      '<div style="font-size:12.5px;margin-bottom:10px" class="wc-muted">'+open+' open ticket'+(open===1?'':'s')+(p.phone?' · '+esc(p.phone):'')+'</div>'+
      '<button class="btn btn-ghost btn-sm" onclick="scheduleMeetingWith(\''+esc(p.name)+'\')">Book a meeting</button></div>';
  }).join('')+'</div>';
  return wcPage(h);
}
function openMyProfile(){
  var p = DB.team.filter(function(x){ return x.name===CURRENT_USER; })[0] || {};
  var h = '<div class="wc-note" style="margin-bottom:12px">You can keep your contact, birthday and bank details current. Your salary, role and department are set by an admin.</div>'+
    '<div class="wc-grid g2">'+fld('Phone', inp('mp_phone', p.phone))+fld('Birthday', inp('mp_bday', p.birthday, 'date'))+'</div>'+fld('Hobbies', inp('mp_hob', p.hobbies))+fld('Emergency contact', inp('mp_emerg', p.emergency_contact))+fld('Slack Member ID', inp('mp_slack', p.slack_handle))+
    '<div class="card-h">Bank details (for payroll)</div><div class="wc-grid g3">'+fld('Bank', '<select class="wc-sel" id="em_bank" onchange="pickBankMine(this)"><option value="">'+(p.bank_name?esc(p.bank_name):'Choose bank…')+'</option></select>')+fld('Bank code', inp('mp_bcode', p.bank_code))+fld('Account number', inp('mp_acct', p.account_number))+'</div><div class="wc-help" id="em_bankhelp"></div>'+
    '<button class="btn btn-primary" onclick="saveMyProfileClick()">Save</button>';
  wcModal('myprof','My profile', h);
  EMP_DRAFT = p; loadBanks(p.bank_code);
}
function pickBankMine(s){ var o = s.options[s.selectedIndex]; document.getElementById('mp_bcode').value = o.value; STATE._myBank = o.getAttribute('data-n')||''; }
function saveMyProfileClick(){
  var p = DB.team.filter(function(x){ return x.name===CURRENT_USER; })[0] || {};
  var payload = {phone:val('mp_phone'), birthday:val('mp_bday'), hobbies:val('mp_hob'), emergency_contact:val('mp_emerg'), slack_handle:val('mp_slack'), bank_code:val('mp_bcode'), account_number:val('mp_acct'), bank_name:STATE._myBank || p.bank_name || '', actor:CURRENT_USER};
  if(String(p.account_number||'')!==String(payload.account_number) || String(p.bank_code||'')!==String(payload.bank_code)) payload.account_name = '';
  api('saveMyProfile', payload).then(function(res){ if(!res.ok) return wcFail('Could not save', res); wcClose('myprof'); STATE._myBank = ''; refreshData().then(function(){ wcToast('Profile saved.'); }); });
}

// ── Leave: requests, approvals (requester notified), time-off summary ───
function leaveWhen(l){
  if(l.unit==='hours') return l.start_date+' '+(l.start_time||'')+'–'+(l.end_time||'')+(l.hours?' ('+l.hours+'h)':'');
  return l.start_date + (l.end_date && l.end_date!==l.start_date ? ' → '+l.end_date : '');
}
function leaveDays(l){
  if(l.unit==='hours') return Number(l.hours)||0;   // hours, reported separately
  var a = new Date(l.start_date), b = new Date(l.end_date||l.start_date), n = 0;
  for(var d = new Date(a); d <= b; d.setDate(d.getDate()+1)){ var w = d.getDay(); if(w!==0 && w!==6) n++; }
  return n;
}
function leaveTone(s){ return s==='Approved'?'good':(s==='Declined'?'bad':(s==='Cancelled'?'mute':'warn')); }
function renderLeave(){
  var admin = isAdminUser(), tab = STATE.leaveTab || (admin ? 'approvals' : 'mine');
  if(!admin && (tab==='approvals' || tab==='summary')) tab = STATE.leaveTab = 'mine';
  var pending = DB.leave.filter(function(l){ return l.status==='Pending' && l.team_member_name!==CURRENT_USER; });
  var tabs = (admin ? [['approvals','Approvals',pending.length],['summary','Time-off summary',0]] : []).concat([['mine','My requests',0],['out','Who\'s out',0]]);
  var h = wcHead('Leave', admin?'See what the team has asked for, approve or decline — they are notified on Slack straight away.':'Request time off and see who else is away.', '<button class="btn btn-primary" onclick="openRequestLeave()">Request time off</button>');
  h += '<div class="wc-tabs">'+tabs.map(function(t){ return '<div class="wc-tab'+(tab===t[0]?' on':'')+'" onclick="STATE.leaveTab=\''+t[0]+'\';render()">'+t[1]+(t[2]?'<span class="n">'+t[2]+'</span>':'')+'</div>'; }).join('')+'</div>';
  if(tab==='approvals') h += leaveApprovals();
  else if(tab==='summary') h += leaveSummary();
  else if(tab==='out') h += leaveOut();
  else h += leaveMine();
  return wcPage(h);
}
function leaveApprovals(){
  var f = STATE.leaveFilter || 'Pending';
  var list = DB.leave.filter(function(l){ return f==='All' || l.status===f; }).sort(function(a,b){ return String(b.created_at).localeCompare(String(a.created_at)); });
  var h = '<div class="wc-seg" style="margin-bottom:12px">'+['Pending','Approved','Declined','All'].map(function(s){ return '<button class="'+(f===s?'on':'')+'" onclick="STATE.leaveFilter=\''+s+'\';render()">'+s+'</button>'; }).join('')+'</div>';
  h += '<div class="card wc-scroll" style="padding:0"><table class="wc-table"><thead><tr><th>Team member</th><th>Type</th><th>When</th><th>Length</th><th>Reason</th><th>Status</th><th></th></tr></thead><tbody>'+
    (list.map(function(l){
      var mine = l.team_member_name===CURRENT_USER;
      return '<tr><td><b>'+esc(l.team_member_name)+'</b></td><td>'+esc(l.type)+'</td><td>'+esc(leaveWhen(l))+'</td><td>'+(l.unit==='hours'?(l.hours||'')+' h':leaveDays(l)+' day'+(leaveDays(l)===1?'':'s'))+'</td><td style="max-width:240px">'+esc(l.reason||'—')+'</td>'+
        '<td>'+pill(l.status, leaveTone(l.status))+(l.approved_by&&l.status!=='Pending'?'<div class="wc-muted">by '+esc(l.approved_by)+'</div>':'')+(l.decision_note?'<div class="wc-muted">“'+esc(l.decision_note)+'”</div>':'')+'</td>'+
        '<td style="white-space:nowrap">'+(l.status==='Pending'&&!mine?'<button class="btn btn-good btn-sm" onclick="decideLeaveClick(\''+l.leave_id+'\',\'Approved\')">Approve</button> <button class="btn btn-danger btn-sm" onclick="decideLeaveClick(\''+l.leave_id+'\',\'Declined\')">Decline</button>':(l.status==='Pending'?'<span class="wc-muted">your own request</span>':''))+'</td></tr>'; }).join('') ||
      '<tr><td colspan="7" class="empty">Nothing '+(f==='All'?'':f.toLowerCase()+' ')+'right now.</td></tr>')+'</tbody></table></div>';
  return h;
}
function decideLeaveClick(id, status){
  var note = '';
  if(status==='Declined'){ note = prompt('Optional note to send with the decline (why / alternative dates):', ''); if(note===null) return; }
  api('decideLeave', {leave_id:id, status:status, decision_note:note, actor:CURRENT_USER}).then(function(res){
    if(!res.ok) return wcFail('Could not update', res);
    var l = DB.leave.filter(function(x){ return x.leave_id===id; })[0]; if(l){ l.status = status; l.approved_by = CURRENT_USER; l.decision_note = note; }
    refreshData().then(function(){ wcToast(status+' — '+(l?l.team_member_name:'they')+' has been notified on Slack.'); });
  });
}
function leaveMine(){
  var mine = DB.leave.filter(function(l){ return l.team_member_name===CURRENT_USER; }).sort(function(a,b){ return String(b.created_at).localeCompare(String(a.created_at)); });
  var yr = String(new Date().getFullYear()), allow = Number((DB.config||{}).leave_annual_days || 20);
  var used = mine.filter(function(l){ return l.status==='Approved' && l.unit!=='hours' && String(l.start_date).slice(0,4)===yr && /annual/i.test(l.type); }).reduce(function(s,l){ return s+leaveDays(l); },0);
  var h = '<div class="wc-grid g3" style="margin-bottom:14px"><div class="card stat-card"><div class="stat-lbl">Annual leave used</div><div class="stat-num">'+used+' / '+allow+'</div><div class="stat-sub">working days in '+yr+'</div></div>'+
    '<div class="card stat-card"><div class="stat-lbl">Pending</div><div class="stat-num">'+mine.filter(function(l){return l.status==='Pending';}).length+'</div><div class="stat-sub">awaiting a decision</div></div>'+
    '<div class="card stat-card"><div class="stat-lbl">Approved</div><div class="stat-num">'+mine.filter(function(l){return l.status==='Approved';}).length+'</div><div class="stat-sub">this year and upcoming</div></div></div>';
  h += '<div class="card wc-scroll" style="padding:0"><table class="wc-table"><thead><tr><th>Type</th><th>When</th><th>Reason</th><th>Status</th><th></th></tr></thead><tbody>'+
    (mine.map(function(l){ return '<tr><td>'+esc(l.type)+'</td><td>'+esc(leaveWhen(l))+'</td><td>'+esc(l.reason||'—')+'</td><td>'+pill(l.status, leaveTone(l.status))+(l.decision_note?'<div class="wc-muted">“'+esc(l.decision_note)+'”</div>':'')+'</td><td>'+(l.status==='Pending'||(l.status==='Approved'&&l.end_date>=today10())?'<button class="btn btn-ghost btn-sm" onclick="cancelLeaveClick(\''+l.leave_id+'\')">Cancel</button>':'')+'</td></tr>'; }).join('') || '<tr><td colspan="5" class="empty">You have not requested any time off yet.</td></tr>')+'</tbody></table></div>';
  return h;
}
function cancelLeaveClick(id){
  if(!confirm('Cancel this request?')) return;
  api('cancelLeave', {leave_id:id, actor:CURRENT_USER}).then(function(res){ if(!res.ok) return wcFail('Could not cancel', res); refreshData(); });
}
function leaveOut(){
  var td = today10(), list = (DB.timeOff||[]).filter(function(l){ return l.end_date >= td; }).sort(function(a,b){ return a.start_date.localeCompare(b.start_date); });
  return '<div class="card" style="padding:6px 18px">'+(list.map(function(l){ var now = l.start_date<=td; return '<div class="wc-row"><b style="width:140px">'+esc(l.team_member_name)+'</b><span style="flex:1">'+esc(leaveWhen(l))+'</span>'+(now?pill('Out now','warn'):pill('Upcoming','info'))+'</div>'; }).join('') || '<div class="empty">Nobody has approved time off coming up.</div>')+'</div>';
}
// per-employee summary: days taken, by type, upcoming, pending
function leaveSummary(){
  var yr = STATE.leaveYear || String(new Date().getFullYear()), td = today10();
  var years = [String(new Date().getFullYear()-1), String(new Date().getFullYear()), String(new Date().getFullYear()+1)];
  var allow = Number((DB.config||{}).leave_annual_days || 20);
  var types = DB.leave.map(function(l){ return l.type; }).filter(function(x,i,a){ return x && a.indexOf(x)===i; });
  var rows = DB.team.map(function(p){
    var ls = DB.leave.filter(function(l){ return l.team_member_name===p.name && String(l.start_date).slice(0,4)===yr; });
    var appr = ls.filter(function(l){ return l.status==='Approved'; });
    var byType = {}; appr.forEach(function(l){ var k = l.type; byType[k] = (byType[k]||{d:0,h:0}); if(l.unit==='hours') byType[k].h += leaveDays(l); else byType[k].d += leaveDays(l); });
    var days = appr.filter(function(l){ return l.unit!=='hours'; }).reduce(function(s,l){ return s+leaveDays(l); },0), hrs = appr.filter(function(l){ return l.unit==='hours'; }).reduce(function(s,l){ return s+leaveDays(l); },0);
    var annual = (byType['Annual leave']||{d:0}).d;
    var next = DB.leave.filter(function(l){ return l.team_member_name===p.name && l.status==='Approved' && l.end_date>=td; }).sort(function(a,b){ return a.start_date.localeCompare(b.start_date); })[0];
    return {p:p, byType:byType, days:days, hrs:hrs, annual:annual, pending:ls.filter(function(l){return l.status==='Pending';}).length, declined:ls.filter(function(l){return l.status==='Declined';}).length, next:next};
  });
  var h = '<div style="display:flex;gap:10px;align-items:center;margin-bottom:12px"><div class="wc-seg">'+years.map(function(y){ return '<button class="'+(yr===y?'on':'')+'" onclick="STATE.leaveYear=\''+y+'\';render()">'+y+'</button>'; }).join('')+'</div><span class="wc-muted">Approved time off per person · annual allowance '+allow+' days (change in Settings → Leave)</span></div>';
  h += '<div class="card wc-scroll" style="padding:0"><table class="wc-table"><thead><tr><th>Employee</th><th style="text-align:right">Days taken</th><th style="text-align:right">Hours</th>'+types.map(function(t){ return '<th style="text-align:right">'+esc(t)+'</th>'; }).join('')+'<th>Annual leave used</th><th>Pending</th><th>Next time off</th></tr></thead><tbody>'+
    rows.map(function(r){ var pct = Math.min(100, Math.round(r.annual/allow*100));
      return '<tr><td><b>'+esc(r.p.name)+'</b><div class="wc-muted">'+esc(r.p.department||'')+'</div></td><td style="text-align:right;font-weight:600">'+r.days+'</td><td style="text-align:right">'+(r.hrs||'—')+'</td>'+types.map(function(t){ var b = r.byType[t]; return '<td style="text-align:right">'+(b?(b.d?b.d+'d':'')+(b.h?(b.d?' + ':'')+b.h+'h':''):'—')+'</td>'; }).join('')+
        '<td style="min-width:150px"><div class="wc-bar'+(pct>=100?' bad':'')+'"><i style="width:'+pct+'%"></i></div><div class="wc-muted">'+r.annual+' / '+allow+' days</div></td><td>'+(r.pending?pill(r.pending+' pending','warn'):'—')+'</td><td>'+(r.next?esc(leaveWhen(r.next))+'<div class="wc-muted">'+esc(r.next.type)+'</div>':'—')+'</td></tr>'; }).join('')+'</tbody></table></div>';
  return h;
}
function openRequestLeave(){
  var h = fld('Type', sel('lv_type', ['Annual leave','Sick leave','Personal / permission','Maternity / paternity','Study leave','Unpaid leave'], 'Annual leave'))+
    '<div class="wc-seg" style="margin-bottom:12px"><button id="lv_u_d" class="on" onclick="setLeaveUnit(\'days\')">Full days</button><button id="lv_u_h" onclick="setLeaveUnit(\'hours\')">A few hours</button></div>'+
    '<div class="wc-grid g2">'+fld('From', inp('lv_start', today10(), 'date'))+'<div id="lv_endwrap">'+fld('To', inp('lv_end', today10(), 'date'))+'</div></div>'+
    '<div class="wc-grid g2 hidden" id="lv_times">'+fld('Start time', inp('lv_st','09:00','time'))+fld('End time', inp('lv_et','13:00','time'))+'</div>'+
    fld('Reason', ta('lv_reason','', 'Optional — only admins see this', 2))+'<button class="btn btn-primary" id="lv_go" onclick="saveLeaveRequest()">Send request</button>';
  wcModal('leave','Request time off', h); STATE._lvUnit = 'days';
}
function setLeaveUnit(u){
  STATE._lvUnit = u;
  document.getElementById('lv_u_d').classList.toggle('on', u==='days'); document.getElementById('lv_u_h').classList.toggle('on', u==='hours');
  document.getElementById('lv_endwrap').classList.toggle('hidden', u==='hours'); document.getElementById('lv_times').classList.toggle('hidden', u!=='hours');
}
function saveLeaveRequest(){
  var u = STATE._lvUnit || 'days';
  var payload = {type:val('lv_type'), unit:u, start_date:val('lv_start'), end_date:u==='days'?val('lv_end'):val('lv_start'), reason:val('lv_reason'), actor:CURRENT_USER};
  if(u==='hours'){ payload.start_time = val('lv_st'); payload.end_time = val('lv_et'); }
  var b = document.getElementById('lv_go'); b.disabled = true;
  api('requestLeave', payload).then(function(res){
    b.disabled = false;
    if(!res.ok) return wcFail('Could not send', res);
    wcClose('leave'); STATE.leaveTab = isAdminUser() ? 'mine' : 'mine';
    refreshData().then(function(){ wcToast('Request sent — admins have been notified.'); if(STATE.module!=='leave') goTo('leave'); });
  });
}

// ═══════════════════════════════════════════════════════════════════════
//  UAT — guided runs: walk every check; a Fail becomes an engineering bug
// ═══════════════════════════════════════════════════════════════════════
var UAT = {run:null, idx:0};
function uatRunItems(runId){ return (DB.uatRunItems||[]).filter(function(i){ return i.run_id===runId; }).sort(function(a,b){ return Number(a.seq)-Number(b.seq); }); }
function uatActiveRun(){ return (DB.uatRuns||[]).filter(function(r){ return r.status==='In progress'; })[0]; }
function uatModules(){ return bpUniq(DB.testCases.map(function(t){ return t.module; })); }
function resTone(r){ return r==='Pass'?'good':(r==='Fail'?'bad':(r==='Blocked'?'warn':'mute')); }

function renderUat(){
  var tab = STATE.uatTab || 'run';
  if(UAT.run && tab==='run' && (DB.uatRuns||[]).some(function(r){ return r.run_id===UAT.run; })) return wcPage(uatRunnerHtml());
  var h = wcHead('UAT / QA Tracker', 'Walk through the checks one by one. If something does not work, say what happened — it becomes a bug on the Engineering Board, assigned to the owner of that system.');
  h += '<div class="wc-tabs">'+[['run','Run checks'],['history','Run history'],['library','Test library ('+DB.testCases.length+')']].map(function(t){ return '<div class="wc-tab'+(tab===t[0]?' on':'')+'" onclick="STATE.uatTab=\''+t[0]+'\';render()">'+t[1]+'</div>'; }).join('')+'</div>';
  h += tab==='history' ? uatHistoryHtml() : (tab==='library' ? uatLibraryHtml() : uatStartHtml());
  return wcPage(h);
}
function uatStartHtml(){
  var active = uatActiveRun(), mods = uatModules(), ut = uatStats();
  var h = '';
  if(active){
    var its = uatRunItems(active.run_id), done = its.filter(function(i){ return i.result; }).length;
    h += '<div class="card" style="padding:16px 20px;margin-bottom:16px;border-color:var(--brand)"><div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap"><div style="flex:1;min-width:220px"><div class="disp" style="font-weight:600">'+esc(active.title)+'</div><div class="wc-muted">Started by '+esc(active.tester)+' · '+done+' of '+its.length+' checked</div><div class="wc-bar" style="margin-top:8px"><i style="width:'+(its.length?Math.round(done/its.length*100):0)+'%"></i></div></div><button class="btn btn-primary" onclick="resumeUat(\''+active.run_id+'\')">Resume run</button></div></div>';
  }
  if(!DB.testCases.length){
    return h+'<div class="card" style="padding:24px;text-align:center"><div class="disp" style="font-size:16px;font-weight:600;margin-bottom:6px">The UAT library is empty</div><div class="wc-muted" style="margin-bottom:14px">Load the WeCollect UAT tracker checks (Mobile App, PMD, OTG and Super Admin flows) to start testing.</div><button class="btn btn-primary" onclick="seedUat()">Load the WeCollect UAT checks</button></div>';
  }
  var failed = DB.testCases.filter(function(t){ return t.result==='Fail'; }).length, untested = DB.testCases.filter(function(t){ return !t.result; }).length;
  h += '<div class="wc-grid g3" style="margin-bottom:16px"><div class="card stat-card"><div class="stat-lbl">Pass rate</div><div class="stat-num">'+ut.rate+'%</div><div class="stat-sub">'+ut.from+'</div></div><div class="card stat-card"><div class="stat-lbl">Failing now</div><div class="stat-num" style="color:'+(failed?'var(--red)':'inherit')+'">'+failed+'</div><div class="stat-sub">bugs open on the board</div></div><div class="card stat-card"><div class="stat-lbl">Never tested</div><div class="stat-num">'+untested+'</div><div class="stat-sub">of '+DB.testCases.length+' checks</div></div></div>';
  h += '<div class="card" style="padding:18px 20px"><div class="card-h">Start a new run</div><div class="wc-grid g3">'+
    fld('Module / system', sel('ur_mod', mods, 'All', 'All modules'))+fld('Which checks', sel('ur_only',[{value:'',label:'All checks in the module'},{value:'untested',label:'Only never-tested'},{value:'failed',label:'Only previously failed (re-test)'}],''))+fld('Run name', inp('ur_title','', 'text', 'e.g. Release 2.4 smoke test'))+'</div>'+
    '<button class="btn btn-primary" onclick="startUat()">Start guided run</button></div>';
  return h;
}
function seedUat(){
  api('seedUatLibrary', {actor:CURRENT_USER}).then(function(res){ if(!res.ok) return wcFail('Could not load', res); refreshData().then(function(){ wcToast((res.added!==undefined?res.added:'')+' checks loaded.'); }); });
}
function startUat(){
  var mod = val('ur_mod') || 'All';
  api('startUatRun', {module:mod, only:val('ur_only'), title:val('ur_title'), actor:CURRENT_USER}).then(function(res){
    if(!res.ok) return wcFail('Could not start', res);
    refreshData(false).then(function(){ UAT.run = res.run.run_id; UAT.idx = 0; render(); });
  });
}
function resumeUat(id){ UAT.run = id; var its = uatRunItems(id); var n = its.findIndex(function(i){ return !i.result; }); UAT.idx = n<0 ? 0 : n; render(); }
function leaveUat(){ UAT.run = null; render(); }
function uatRunnerHtml(){
  var run = DB.uatRuns.filter(function(r){ return r.run_id===UAT.run; })[0], its = uatRunItems(run.run_id);
  if(run.status!=='In progress') return uatSummaryHtml(run, its);
  if(UAT.idx >= its.length) UAT.idx = its.length-1; if(UAT.idx < 0) UAT.idx = 0;
  var it = its[UAT.idx], done = its.filter(function(i){ return i.result; }).length, hasRes = !!it.result;
  var steps = String(it.steps||'').split(/\r?\n/).map(function(s){ return s.replace(/^\s*\d+[\.\)]\s*/,'').trim(); }).filter(Boolean);
  var h = '<a href="#" onclick="leaveUat();return false" style="font-size:12.5px;color:var(--brand);font-weight:600">← Leave run (progress is saved)</a>';
  h += wcHead(esc(run.title), 'Check '+(UAT.idx+1)+' of '+its.length+' · '+done+' recorded', '<button class="btn btn-ghost" onclick="finishUatClick(\''+run.run_id+'\')">Finish run</button>');
  h += '<div class="wc-bar" style="margin-bottom:16px"><i style="width:'+Math.round(done/its.length*100)+'%"></i></div>';
  h += '<div class="wc-grid" style="grid-template-columns:minmax(0,1fr) 230px;align-items:start" id="uatGrid"><div>';
  h += '<div class="uat-case"><div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:8px">'+pill(it.module,'info')+(it.flow?pill(it.flow,'mute'):'')+pill((it.priority||'Medium')+' priority', it.priority==='High'||it.priority==='Urgent'?'bad':'warn')+(it.result?pill('Recorded: '+it.result, resTone(it.result)):'')+'</div>'+
    '<div class="disp" style="font-size:18px;font-weight:600;margin-bottom:12px">'+esc(it.test_case||it.flow)+'</div>'+
    '<div class="wc-lbl">Do this</div>'+(steps.length?'<ol>'+steps.map(function(s){ return '<li>'+esc(s)+'</li>'; }).join('')+'</ol>':'<div class="wc-muted">No steps listed.</div>')+
    '<div class="wc-lbl" style="margin-top:14px">You should see</div><div class="wc-note good">'+esc(it.expected_result||'—')+'</div>'+
    '<div class="wc-lbl" style="margin-top:16px">Result</div><div style="display:flex;gap:8px;flex-wrap:wrap" id="uatBtns">'+
    [['Pass','pass','✓ Works'],['Fail','fail','✕ Doesn’t work'],['Blocked','block','⛔ Blocked'],['Skipped','skip','Skip']].map(function(b){ return '<button class="res-btn '+b[1]+(it.result===b[0]?' on':'')+'" onclick="uatPick(\''+b[0]+'\')">'+b[2]+'</button>'; }).join('')+'</div>'+
    '<div id="uatFail" class="hidden" style="margin-top:14px"><div class="wc-note bad" style="margin-bottom:10px" id="uatFailHint"></div>'+fld('What actually happened? <span style="color:var(--red)">*</span>', ta('uat_notes', it.actual_notes, 'Describe exactly what you saw, what you tapped, and any error text.', 3))+fld('Screenshot / recording link (optional)', inp('uat_ev', it.evidence_url, 'url', 'https://…'))+
    '<button class="btn btn-primary" id="uatSave" onclick="uatSave()">Record &amp; create bug</button></div>'+
    (it.ticket_id?'<div class="wc-note" style="margin-top:12px">Bug <b>'+esc(it.ticket_id)+'</b> is on the Engineering Board'+(hasRes?'':'')+'. <a href="#" onclick="openTicketDetail(\''+esc(it.ticket_id)+'\');return false" style="color:var(--brand);font-weight:600">Open it</a></div>':'')+
    '<div style="display:flex;justify-content:space-between;margin-top:18px"><button class="btn btn-ghost" '+(UAT.idx===0?'disabled':'')+' onclick="uatGo(-1)">← Previous</button><button class="btn btn-ghost" '+(UAT.idx>=its.length-1?'disabled':'')+' onclick="uatGo(1)">Next →</button></div></div></div>';
  h += '<div class="card" style="padding:12px 14px;max-height:520px;overflow:auto"><div class="wc-lbl">All checks</div><div style="display:flex;flex-wrap:wrap;gap:5px">'+its.map(function(i, n){
    var c = i.result==='Pass'?'var(--green)':(i.result==='Fail'?'var(--red)':(i.result==='Blocked'?'var(--amber)':(i.result==='Skipped'?'var(--text-faint)':'#fff')));
    return '<span title="'+esc(i.test_case)+'" onclick="UAT.idx='+n+';render()" style="width:30px;height:30px;border-radius:8px;border:1.5px solid '+(n===UAT.idx?'var(--brand)':'var(--line)')+';display:inline-flex;align-items:center;justify-content:center;font-size:11px;font-weight:600;cursor:pointer;background:'+c+';color:'+(i.result?'#fff':'var(--text-dim)')+'">'+(n+1)+'</span>'; }).join('')+'</div></div>';
  h += '</div>';
  return h;
}
function uatGo(d){ UAT.idx += d; render(); }
function uatPick(result){
  var run = DB.uatRuns.filter(function(r){ return r.run_id===UAT.run; })[0], it = uatRunItems(run.run_id)[UAT.idx];
  if(result==='Pass' || result==='Skipped') return uatRecord(it, result, '', '');
  var box = document.getElementById('uatFail'); box.classList.remove('hidden');
  document.getElementById('uatFail').setAttribute('data-result', result);
  document.getElementById('uatFailHint').textContent = result==='Fail' ? 'This will be recorded as a failure and a Bug ticket is created automatically for the engineer who owns “'+it.module+'”.' : 'Say what is stopping you from running this check — it is logged on the run and the owner is told.';
  document.getElementById('uatSave').textContent = result==='Fail' ? 'Record failure & create bug' : 'Record as blocked';
  document.querySelectorAll('#uatBtns .res-btn').forEach(function(b){ b.classList.remove('on'); });
  document.getElementById('uat_notes').focus();
}
function uatSave(){
  var run = DB.uatRuns.filter(function(r){ return r.run_id===UAT.run; })[0], it = uatRunItems(run.run_id)[UAT.idx];
  var result = document.getElementById('uatFail').getAttribute('data-result') || 'Fail';
  var notes = val('uat_notes').trim();
  if(!notes) return wcToast(result==='Fail' ? 'Describe what actually happened so engineering can fix it.' : 'Say what is blocking this check.', true);
  uatRecord(it, result, notes, val('uat_ev'));
}
function uatRecord(it, result, notes, ev){
  api('recordUatRunItem', {item_id:it.item_id, result:result, actual_notes:notes, evidence_url:ev, actor:CURRENT_USER}).then(function(res){
    if(!res.ok) return wcFail('Could not record', res);
    refreshData(false).then(function(){
      if(res.bug_created) wcToast('Bug '+res.ticket_id+' created'+(res.assigned_to?' and assigned to '+res.assigned_to:' (no owner set for this system yet — set “Systems” in the Employee Directory)')+'.');
      var its = uatRunItems(UAT.run), n = its.findIndex(function(i, k){ return k>UAT.idx && !i.result; });
      if(n>-1) UAT.idx = n; else if(UAT.idx < its.length-1) UAT.idx++;
      render();
    });
  });
}
function finishUatClick(runId, force){
  var its = uatRunItems(runId), left = its.filter(function(i){ return !i.result; }).length;
  if(left && !force && !confirm(left+' check(s) have no result. Finish anyway and mark them skipped?')) return;
  api('finishUatRun', {run_id:runId, force:!!(left||force), actor:CURRENT_USER}).then(function(res){
    if(!res.ok) return wcFail('Could not finish', res);
    refreshData().then(function(){ wcToast('Run finished — summary posted to Slack.'); });
  });
}
function uatSummaryHtml(run, its){
  var c = {Pass:0,Fail:0,Blocked:0,Skipped:0}; its.forEach(function(i){ if(c[i.result]!==undefined) c[i.result]++; });
  var tested = c.Pass+c.Fail+c.Blocked, rate = tested ? Math.round(c.Pass/tested*100) : 0, bugs = its.filter(function(i){ return i.ticket_id; });
  var h = '<a href="#" onclick="leaveUat();return false" style="font-size:12.5px;color:var(--brand);font-weight:600">← Back to UAT</a>'+wcHead(esc(run.title), 'Finished '+esc(fmtDateTime(run.finished_at))+' · tested by '+esc(run.tester));
  h += '<div class="wc-grid g4 keep2" style="margin-bottom:16px"><div class="card stat-card"><div class="stat-lbl">Pass rate</div><div class="stat-num">'+rate+'%</div></div><div class="card stat-card"><div class="stat-lbl">Passed</div><div class="stat-num" style="color:var(--green)">'+c.Pass+'</div></div><div class="card stat-card"><div class="stat-lbl">Failed</div><div class="stat-num" style="color:var(--red)">'+c.Fail+'</div></div><div class="card stat-card"><div class="stat-lbl">Blocked / skipped</div><div class="stat-num">'+c.Blocked+' / '+c.Skipped+'</div></div></div>';
  h += '<div class="card" style="padding:16px 20px;margin-bottom:16px"><div class="card-h">Bugs created from this run ('+bugs.length+')</div>'+(bugs.length ? bugs.map(function(i){ var t = DB.tickets.filter(function(x){ return x.ticket_id===i.ticket_id; })[0]; return '<div class="wc-row" style="cursor:pointer" onclick="openTicketDetail(\''+esc(i.ticket_id)+'\')"><span class="wc-muted" style="width:70px">'+esc(i.ticket_id)+'</span><span style="flex:1"><b>'+esc(i.test_case)+'</b><div class="wc-muted">'+esc(i.actual_notes)+'</div></span>'+(t?pill(t.owner||'Unassigned','info')+pill(t.status,'mute'):'')+'</div>'; }).join('') : '<div class="wc-muted">No failures — nice.</div>')+
    (bugs.length?'<div style="margin-top:10px"><button class="btn btn-ghost btn-sm" onclick="goTo(\'board\')">Open Engineering Board</button></div>':'')+'</div>';
  h += '<div class="card wc-scroll" style="padding:0"><table class="wc-table"><thead><tr><th>#</th><th>Module</th><th>Check</th><th>Result</th><th>Notes</th></tr></thead><tbody>'+its.map(function(i){ return '<tr><td>'+i.seq+'</td><td>'+esc(i.module)+'</td><td>'+esc(i.test_case)+'</td><td>'+pill(i.result||'—', resTone(i.result))+'</td><td>'+esc(i.actual_notes||'')+'</td></tr>'; }).join('')+'</tbody></table></div>';
  return h;
}
function uatHistoryHtml(){
  var runs = (DB.uatRuns||[]).slice();
  return '<div class="card wc-scroll" style="padding:0"><table class="wc-table"><thead><tr><th>Run</th><th>Tester</th><th>Started</th><th>Status</th><th>Passed</th><th>Failed</th><th>Blocked</th><th></th></tr></thead><tbody>'+
    (runs.map(function(r){ return '<tr><td><b>'+esc(r.title)+'</b></td><td>'+esc(r.tester)+'</td><td>'+esc(fmtDateTime(r.started_at))+'</td><td>'+pill(r.status, r.status==='In progress'?'warn':'good')+'</td><td>'+r.passed+'</td><td>'+(Number(r.failed)?'<b style="color:var(--red)">'+r.failed+'</b>':0)+'</td><td>'+r.blocked+'</td><td><button class="btn btn-ghost btn-sm" onclick="'+(r.status==='In progress'?'resumeUat':'viewUatRun')+'(\''+r.run_id+'\')">'+(r.status==='In progress'?'Resume':'View')+'</button></td></tr>'; }).join('') || '<tr><td colspan="8" class="empty">No runs yet.</td></tr>')+'</tbody></table></div>';
}
function viewUatRun(id){ UAT.run = id; render(); }
function uatLibraryHtml(){
  var f = STATE.uatLib || (STATE.uatLib = {mod:'All', q:''});
  var list = DB.testCases.filter(function(t){ return (f.mod==='All'||t.module===f.mod) && (!f.q || [t.test_case,t.flow,t.steps].join(' ').toLowerCase().indexOf(f.q.toLowerCase())>-1); });
  return '<div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px"><select class="wc-sel" style="width:auto" onchange="STATE.uatLib.mod=this.value;render()">'+optionsHtml(['All'].concat(uatModules()), f.mod)+'</select><input class="wc-input" style="width:220px" placeholder="Search checks…" value="'+esc(f.q)+'" onchange="STATE.uatLib.q=this.value;render()"><button class="btn btn-ghost" onclick="openNewTestCase()">+ Add check</button><button class="btn btn-ghost" onclick="seedUat()">Load missing WeCollect checks</button></div>'+
    '<div class="card wc-scroll" style="padding:0"><table class="wc-table"><thead><tr><th>Module</th><th>Flow</th><th>Check</th><th>Priority</th><th>Last result</th><th>Bug</th></tr></thead><tbody>'+
    (list.map(function(t){ return '<tr style="cursor:pointer" onclick="openTestCaseDetail(\''+t.test_id+'\')"><td>'+esc(t.module)+'</td><td>'+esc(t.flow)+'</td><td>'+esc(t.test_case)+'</td><td>'+esc(t.priority)+'</td><td>'+pill(t.result||'Not run', resTone(t.result))+'</td><td>'+esc(t.linked_ticket_id||'')+'</td></tr>'; }).join('') || '<tr><td colspan="6" class="empty">No checks.</td></tr>')+'</tbody></table></div>';
}

// ═══════════════════════════════════════════════════════════════════════
//  CRM — in-app version of the old Google Form: pick an outcome and the
//  same actions fire. Plus follow-up tracking and a richer lead card.
// ═══════════════════════════════════════════════════════════════════════
var CRM_OUTCOME_INFO = {
  'Entry': {t:'Just logging a new prospect', d:'Added to the Prospecting Pool. Nothing is sent.', acts:['Prospect added to “Prospecting Pool”']},
  'Requested Brochure': {t:'They asked for the brochure', d:'We email the brochure now and schedule one 48-hour follow-up.', acts:['Brochure emailed to the prospect (link for the chosen offering)','One follow-up email scheduled for 48 hours later','Stage → Requested More Info']},
  'Agreed to a Meeting': {t:'They agreed to a meeting', d:'A 1-hour Discovery Call invite goes to the prospect, you and the team CC.', acts:['Google Calendar invite (1 hour) with Meet link','Invite sent to prospect + you + team CC list','Meeting added to Meetings','Stage → Agreed to Meeting']},
  'Declined': {t:'They declined', d:'Moved to Declined / Cold Leads and put on the newsletter-nurture list.', acts:['Stage → Declined / Cold Leads','Reason recorded','Added to newsletter-nurture to re-engage later']}
};
var CRM_DECLINES = ['Price','Timing','Using a competitor','No current need','Not the decision maker','No response','Other'];
var INTAKE = {outcome:'Entry'};
function openNewLead(){ INTAKE = {outcome:'Entry'}; drawIntake(); }
function drawIntake(){
  var o = INTAKE.outcome, info = CRM_OUTCOME_INFO[o], me = CURRENT_USER;
  var h = '<div class="wc-note" style="margin-bottom:14px">Same as the old prospect form: choose what happened and the right actions run automatically.</div>'+
    '<div class="wc-grid g2">'+fld('Prospect name <span style="color:var(--red)">*</span>', inp('in_name', INTAKE.name))+fld('Organization', inp('in_org', INTAKE.org))+'</div>'+
    '<div class="wc-grid g2">'+fld('Position', inp('in_pos', INTAKE.pos))+fld('Offering', sel('in_off', ['Data Collection/ Research','Field Operation'], INTAKE.off||'', 'Choose…'))+'</div>'+
    '<div class="wc-grid g2">'+fld('Email'+(o==='Requested Brochure'||o==='Agreed to a Meeting'?' <span style="color:var(--red)">*</span>':''), inp('in_email', INTAKE.email, 'email'))+fld('Phone', inp('in_phone', INTAKE.phone))+'</div>'+
    '<div class="wc-grid g2">'+fld('LinkedIn', inp('in_li', INTAKE.li, 'url'))+fld('Owner', sel('in_owner', teamNames(), INTAKE.owner||me))+'</div>'+
    '<div class="wc-lbl" style="margin-top:4px">Interaction outcome</div><div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:12px">'+Object.keys(CRM_OUTCOME_INFO).map(function(k){ return '<div class="wc-kind'+(o===k?' on':'')+'" style="flex:1 1 180px;padding:12px 14px" onclick="setIntakeOutcome(\''+k+'\')"><b style="font-size:13.5px">'+k+'</b><span class="wc-muted">'+CRM_OUTCOME_INFO[k].t+'</span></div>'; }).join('')+'</div>';
  if(o==='Agreed to a Meeting') h += '<div class="wc-grid g2">'+fld('Discovery call date <span style="color:var(--red)">*</span>', inp('in_mdate', INTAKE.mdate, 'date'))+fld('Time <span style="color:var(--red)">*</span>', inp('in_mtime', INTAKE.mtime||'10:00', 'time'))+'</div>'+fld('Also invite (CC)', ccPickerHtml('intake', INTAKE.cc));
  if(o==='Declined') h += '<div class="wc-grid g2">'+fld('Reason', sel('in_dec', CRM_DECLINES, INTAKE.dec||'', 'Choose…'))+fld('Competitor (if any)', inp('in_comp', INTAKE.comp))+'</div>';
  h += fld('Comments', ta('in_comments', INTAKE.comments, 'Anything worth remembering from the conversation', 2));
  h += '<div class="wc-note good" style="margin-bottom:14px"><b>What will happen when you save</b><ul style="margin:6px 0 0 18px">'+info.acts.map(function(a){ return '<li>'+a+'</li>'; }).join('')+'</ul></div>';
  h += '<div style="display:flex;gap:8px"><button class="btn btn-primary" id="in_go" onclick="saveIntake()">Save prospect</button><button class="btn btn-ghost" onclick="wcClose(\'intake\')">Cancel</button></div>';
  wcModal('intake', 'New prospect', h, true);
}
function readIntake(){ INTAKE.name = val('in_name'); INTAKE.org = val('in_org'); INTAKE.pos = val('in_pos'); INTAKE.off = val('in_off'); INTAKE.email = val('in_email'); INTAKE.phone = val('in_phone'); INTAKE.li = val('in_li'); INTAKE.owner = val('in_owner'); INTAKE.comments = val('in_comments'); INTAKE.mdate = val('in_mdate')||INTAKE.mdate; INTAKE.mtime = val('in_mtime')||INTAKE.mtime; INTAKE.dec = val('in_dec')||INTAKE.dec; INTAKE.comp = val('in_comp')||INTAKE.comp; }
function setIntakeOutcome(o){ readIntake(); INTAKE.outcome = o; drawIntake(); }
function saveIntake(){
  readIntake(); var o = INTAKE.outcome;
  if(!INTAKE.name.trim()) return wcToast('Prospect name is required.', true);
  if((o==='Requested Brochure'||o==='Agreed to a Meeting') && !INTAKE.email.trim()) return wcToast('An email address is needed for this outcome.', true);
  if(o==='Agreed to a Meeting' && (!INTAKE.mdate || !INTAKE.mtime)) return wcToast('Pick the discovery call date and time.', true);
  var b = document.getElementById('in_go'); b.disabled = true; b.textContent = 'Saving…';
  api('submitProspectIntake', {name:INTAKE.name.trim(), organization:INTAKE.org, position:INTAKE.pos, offering:INTAKE.off, email:INTAKE.email.trim(), phone:INTAKE.phone, linkedin_url:INTAKE.li, owner:INTAKE.owner, outcome:o, meeting_date:INTAKE.mdate||'', meeting_time:INTAKE.mtime||'', decline_category:INTAKE.dec||'', competitor:INTAKE.comp||'', comments:INTAKE.comments, cc_names:(INTAKE.outcome==='Agreed to a Meeting'?(INTAKE.cc||[]):[]), cc_emails:(INTAKE.outcome==='Agreed to a Meeting'?ccEmailsVal('intake'):''), actor:CURRENT_USER}).then(function(res){
    if(!res.ok){ b.disabled = false; b.textContent = 'Save prospect'; return wcFail('Could not save', res); }
    refreshData().then(function(){
      var h = '<div class="wc-note good" style="margin-bottom:12px"><b>'+esc(res.lead.name)+'</b> saved. Here is what happened:</div>'+(res.actions||[]).map(function(a){ return '<div class="wc-row"><span>'+(a.ok?'✅':'⚠️')+'</span><span style="flex:1">'+esc(a.label)+'</span></div>'; }).join('')+
        '<div style="display:flex;gap:8px;margin-top:14px"><button class="btn btn-primary" onclick="wcClose(\'intake\');openLeadDetail(\''+res.lead.lead_id+'\')">Open prospect</button><button class="btn btn-ghost" onclick="openNewLead()">Add another</button></div>';
      wcModal('intake','Prospect saved', h);
    });
  });
}
function saveNewLead(){ saveIntake(); }

function crmDue(){
  var now = new Date().toISOString(), admin = isAdminUser();
  return DB.leads.filter(function(l){
    if(l.stage==='Declined / Cold Leads' || l.stage==='Onboarding') return false;
    if(!admin && l.owner!==CURRENT_USER) return false;
    var a = l.next_follow_up_due && l.next_follow_up_due <= now, b = l.followup_due_at && l.followup_due_at <= now && !l.follow_up_sent;
    return a || b;
  });
}
(function(){
  var _crm = renderCrm;
  renderCrm = function(){
    var w = _crm(), due = crmDue();
    var strip = document.createElement('div');
    strip.innerHTML = '<div class="wc-note'+(due.length?' warn':'')+'" style="margin-bottom:14px;display:flex;gap:10px;align-items:center;flex-wrap:wrap"><b>'+(due.length?due.length+' prospect'+(due.length===1?'':'s')+' need a follow-up':'No follow-ups due')+'</b>'+
      due.slice(0,6).map(function(l){ return '<span class="wc-chip" style="margin:0" onclick="openLeadDetail(\''+l.lead_id+'\')">'+esc(l.name)+(l.follow_up_count?' · '+l.follow_up_count+'/5':'')+'</span>'; }).join('')+
      '<span class="wc-muted" style="margin-left:auto">Rule: follow up every 3 days, up to 5 times over 15 days, then mark cold.</span></div>';
    w.insertBefore(strip.firstChild, w.firstChild);
    return w;
  };
})();
function healthTone(h){ return h==='Hot'?'good':(h==='Warm'?'warn':(h==='Cold'?'bad':'mute')); }
function openLeadDetail(id){
  var l = DB.leads.filter(function(x){ return x.lead_id===id; })[0]; if(!l) return;
  var notes = parseJson(l.meeting_notes_json, []), fc = Number(l.follow_up_count)||0;
  var showDisc = ['Agreed to Meeting','Intro Call','Requested More Info','Prospecting Pool'].indexOf(l.stage)>-1 && l.meeting_booked!=='yes';
  var showDemo = (l.stage==='Demo Session'||l.stage==='Follow Up'||l.stage==='Intro Call') && l.demo_meeting_booked!=='yes';
  var h = '<div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px">'+pill(l.stage,'info')+(l.health?pill(l.health, healthTone(l.health)):'')+(l.nurture?pill('Newsletter nurture','mute'):'')+(l.offering?pill(l.offering,'mute'):'')+'</div>'+
    '<div class="wc-grid g2" style="margin-bottom:10px"><div><div class="wc-muted">Organization</div>'+esc(l.organization||'—')+(l.position?' · '+esc(l.position):'')+'</div><div><div class="wc-muted">Owner</div>'+sel('ld_owner', teamNames(), l.owner, '', ' onchange="reassignLead(\''+id+'\',this.value)"')+'</div>'+
    '<div><div class="wc-muted">Email</div>'+(l.email?'<a href="mailto:'+esc(l.email)+'" style="color:var(--brand)">'+esc(l.email)+'</a>':'—')+'</div><div><div class="wc-muted">Phone / LinkedIn</div>'+esc(l.phone||'—')+(l.linkedin_url?' · <a href="'+esc(l.linkedin_url)+'" target="_blank" rel="noopener" style="color:var(--brand)">profile</a>':'')+'</div></div>';
  h += '<div class="card" style="padding:12px 14px;margin-bottom:12px"><div class="wc-lbl">Move to stage</div>'+CRM_STAGES.map(function(s){ return '<span class="wc-chip'+(l.stage===s?' on':'')+'" onclick="setLeadStage(\''+id+'\',\''+s+'\')">'+s+'</span>'; }).join('')+'</div>';
  if(l.drive_folder_id) h += '<div class="wc-note" style="margin-bottom:8px">📁 <a href="https://drive.google.com/drive/folders/'+encodeURIComponent(l.drive_folder_id)+'" target="_blank" rel="noopener" style="color:var(--brand)">Open the Drive folder</a>'+(l.channel?' · via '+esc(l.channel):'')+'</div>';
  if(l.meeting_booked==='yes') h += '<div class="wc-note" style="margin-bottom:8px">📅 Discovery call: '+esc(l.meeting_date)+'</div>';
  if(l.demo_meeting_booked==='yes') h += '<div class="wc-note" style="margin-bottom:8px">🖥 Demo: '+esc(l.demo_date)+'</div>';
  if(showDisc||showDemo){
    var kind = showDemo && !showDisc ? 'demo' : 'discovery';
    h += '<div class="card" style="padding:12px 14px;margin-bottom:12px"><div class="wc-lbl">Schedule a meeting</div><div style="display:flex;gap:8px;flex-wrap:wrap;align-items:end"><div>'+sel('ld_kind',[{value:'discovery',label:'Discovery call'},{value:'demo',label:'Demo session'}], kind)+'</div><div>'+inp('ld_date','','date')+'</div><div>'+inp('ld_time','10:00','time')+'</div><button class="btn btn-primary btn-sm" onclick="bookLeadMeeting(\''+id+'\')">Send invite</button></div><div class="wc-lbl" style="margin-top:10px">Also invite (CC)</div>'+ccPickerHtml('ldcc')+'<div class="wc-help">Invite goes to the prospect, you, the default CC list from Settings and anyone you pick here, with a Meet link.</div></div>';
  }
  if(l.stage==='Declined / Cold Leads') h += '<div class="card" style="padding:12px 14px;margin-bottom:12px"><div class="wc-lbl">Why they declined</div><div style="display:flex;gap:8px;flex-wrap:wrap">'+sel('ld_dec', CRM_DECLINES, l.decline_category, 'Choose…')+inp('ld_comp', l.competitor, 'text', 'Competitor (if any)')+'<button class="btn btn-ghost btn-sm" onclick="saveDeclineReason(\''+id+'\')">Save</button></div></div>';
  if(l.stage!=='Declined / Cold Leads' && l.stage!=='Onboarding'){
    h += '<div class="card" style="padding:12px 14px;margin-bottom:12px"><div style="display:flex;align-items:center;gap:10px;margin-bottom:8px"><div class="wc-lbl" style="margin:0">Follow-ups</div><div class="wc-bar" style="flex:1;max-width:160px"><i style="width:'+fc*20+'%"></i></div><span class="wc-muted">'+fc+' of 5'+(l.next_follow_up_due?' · next due '+esc(fmtDate(l.next_follow_up_due)):'')+'</span></div>'+
      '<div style="display:flex;gap:8px;flex-wrap:wrap">'+sel('fu_ch',['Email','Call','WhatsApp','LinkedIn','In person'],'Email')+inp('fu_note','', 'text', 'What did you say / hear?')+'</div>'+
      '<div style="display:flex;gap:8px;margin-top:8px"><button class="btn btn-ghost btn-sm" onclick="logFollowUp(\''+id+'\',false)">Log follow-up (no reply yet)</button><button class="btn btn-good btn-sm" onclick="logFollowUp(\''+id+'\',true)">They replied</button></div></div>';
  }
  h += '<div class="card-h">Notes & history</div>'+(notes.length ? notes.map(function(n,ni){ return {n:n,ni:ni}; }).reverse().map(function(x){ return leadNoteHtml(id, x.n, x.ni); }).join('') : '<div class="wc-muted">No notes yet.</div>')+
    '<div style="display:flex;gap:8px;margin-top:10px"><input class="wc-input" id="ld_note_text" placeholder="Add a note…"><button class="btn btn-ghost btn-sm" onclick="addLeadNote(\''+id+'\')">Save note</button></div>'+
    '<div class="card-h" style="margin-top:16px">AI lead health <button class="btn btn-ghost btn-sm" onclick="runAiLeadHealth(\''+id+'\')">Ask Claude</button></div><div id="ld_health" class="ai-box" style="display:none"></div>';
  wcModal('lead', esc(l.name), h, true);
}
function safeUrl(u){ u = String(u||''); return /^https?:\/\//i.test(u) ? u : ''; }
function leadNoteHtml(id, n, ni){
  var h = '<div class="wc-row" style="align-items:flex-start"><span class="wc-muted" style="width:92px;flex-shrink:0">'+esc(fmtDate(n.at))+'<br>'+esc(n.by||'')+'</span><span style="flex:1">'+(n.type==='follow_up'?pill((n.responded?'Reply':'Follow-up')+(n.channel?' · '+n.channel:''), n.responded?'good':'mute')+' ':'')+esc(n.text||'');
  if(n.fileUrl && safeUrl(n.fileUrl)) h += '<div style="margin-top:4px">📎 <a href="'+esc(safeUrl(n.fileUrl))+'" target="_blank" rel="noopener" style="color:var(--brand)">'+esc(n.fileName||'Attachment')+'</a></div>';
  (n.nextSteps||[]).forEach(function(st, si){ h += '<div style="margin-top:4px;display:flex;gap:8px;align-items:center"><span class="wc-check'+(st.done?' on':'')+'" onclick="toggleLeadStep(\''+id+'\','+ni+','+si+')"></span><span'+(st.done?' style="text-decoration:line-through;opacity:.6"':'')+'>'+esc(st.text)+'</span></div>'; });
  return h+'</span></div>';
}
function toggleLeadStep(id, ni, si){
  var l = DB.leads.filter(function(x){ return x.lead_id===id; })[0]; if(!l) return;
  var notes = parseJson(l.meeting_notes_json, []), st = notes[ni] && notes[ni].nextSteps && notes[ni].nextSteps[si]; if(!st) return;
  st.done = !st.done; st.doneAt = st.done ? new Date().toISOString() : '';
  api('updateLeadStage', {lead_id:id, stage:l.stage, meeting_notes_json:JSON.stringify(notes), actor:CURRENT_USER}).then(function(res){ if(!res.ok) return wcFail('Could not save', res); refreshLead(id); });
}
function refreshLead(id){ refreshData().then(function(){ openLeadDetail(id); }); }
function setLeadStage(id, stage){ api('updateLeadStage', {lead_id:id, stage:stage, actor:CURRENT_USER}).then(function(res){ if(!res.ok) return wcFail('Could not update stage', res); if(stage==='Onboarding') setTimeout(function(){ wcToast('Moved to Onboarding — added to the Client board and handed to Product & Operations.'); }, 400); refreshLead(id); }); }
function reassignLead(id, newOwner){ api('reassignLead', {lead_id:id, new_owner:newOwner, actor:CURRENT_USER}).then(function(res){ if(!res.ok) return wcFail('Could not reassign', res); refreshData(false); wcToast('Reassigned to '+newOwner+'.'); }); }
function bookLeadMeeting(id){
  var kind = val('ld_kind'), date = val('ld_date'), time = val('ld_time');
  if(!date) return wcToast('Pick a date.', true);
  api('bookLeadDemo', {lead_id:id, kind:kind, date:date, time:time, invitees:[CURRENT_USER], cc_names:ccPicked('ldcc'), cc_emails:ccEmailsVal('ldcc'), actor:CURRENT_USER}).then(function(res){ if(!res.ok) return wcFail('Could not book', res); var sk = (res.calendar_status && res.calendar_status.skipped) || []; wcToast(sk.length ? 'Invite sent, but these emails were not valid and were skipped: '+sk.join(', ') : 'Invite sent.', !!sk.length); refreshLead(id); });
}
function logFollowUp(id, responded){
  api('logLeadFollowUp', {lead_id:id, channel:val('fu_ch'), note:val('fu_note'), responded:!!responded, actor:CURRENT_USER}).then(function(res){ if(!res.ok) return wcFail('Could not log', res); wcToast(res.message || 'Logged.'); refreshLead(id); });
}
function addLeadNote(id){
  var text = val('ld_note_text').trim(); if(!text) return wcToast('Write a note first.', true);
  var l = DB.leads.filter(function(x){ return x.lead_id===id; })[0], notes = parseJson(l.meeting_notes_json, []);
  notes.push({text:text, by:CURRENT_USER, at:new Date().toISOString(), type:'note'});
  api('updateLeadStage', {lead_id:id, stage:l.stage, meeting_notes_json:JSON.stringify(notes), actor:CURRENT_USER}).then(function(res){ if(!res.ok) return wcFail('Could not save', res); refreshLead(id); });
}
function saveDeclineReason(id){
  api('updateLeadStage', {lead_id:id, stage:'Declined / Cold Leads', decline_category:val('ld_dec'), competitor:val('ld_comp'), actor:CURRENT_USER}).then(function(res){ if(!res.ok) return wcFail('Could not save', res); refreshLead(id); });
}
function runAiLeadHealth(id){
  var box = document.getElementById('ld_health'); box.style.display = 'block'; box.innerHTML = '<div class="ai-box-h">Claude</div>Thinking…';
  api('aiLeadHealthSummary', {lead_id:id}).then(function(res){
    if(!res.ok){ box.innerHTML = '<div class="ai-box-h">Claude</div>Could not get a summary: '+esc(res.error||'unknown error'); return; }
    var h = res.health || {}; box.innerHTML = '<div class="ai-box-h">Claude · Risk: '+esc(h.risk_level||'Unknown')+'</div>'+esc(h.summary||'')+'<div style="margin-top:8px"><b>Next:</b> '+esc(h.suggested_next_action||'—')+'</div>';
  });
}

// ═══════════════════════════════════════════════════════════════════════
//  GRANTS & ACCELERATORS / INDUSTRY NEWS — verified tables with end dates.
//  Anything whose end date has passed is hidden (and expired server-side).
// ═══════════════════════════════════════════════════════════════════════
var OPP_STATUS = ['New','Reviewing','Applied','Won','Not a fit'];
function isYmd(s){ return /^\d{4}-\d{2}-\d{2}/.test(String(s||'')); }
function oppExpired(o){ return o.status==='Expired' || (isYmd(o.end_date) && String(o.end_date).slice(0,10) < today10()); }
function daysLeft(end){ return Math.round((new Date(String(end).slice(0,10)+'T12:00:00') - new Date(today10()+'T12:00:00'))/86400000); }
function endCell(o){
  if(!o.end_date) return pill('Not stated','warn');
  if(/rolling/i.test(o.end_date)) return pill('Rolling','info');
  var d = daysLeft(o.end_date), tone = d<0?'bad':(d<=7?'bad':(d<=21?'warn':'good'));
  return '<b>'+esc(fmtDate(o.end_date))+'</b> '+(d<0?pill('Closed','bad'):'<span class="pill '+tone+'" style="font-size:10.5px">'+(d===0?'today':d+'d left')+'</span>');
}
function oppFilterState(kind){ STATE.opp = STATE.opp || {}; return STATE.opp[kind] || (STATE.opp[kind] = {q:'', status:'Open', cat:'', sort:'end', expired:false}); }
function renderGrants(){ return oppPage('Opportunity'); }
function renderNewsDigest(){ return oppPage('News'); }
function oppPage(kind){
  var news = kind==='News', f = oppFilterState(kind), td = today10();
  var all = (DB.opportunities||[]).filter(function(o){ return o.kind===kind; });
  var hidden = all.filter(oppExpired).length;
  var list = all.filter(function(o){
    if(!f.expired && oppExpired(o)) return false;
    if(f.status==='Open' && ['Not a fit'].indexOf(o.status)>-1) return false;
    if(f.status!=='Open' && f.status!=='All' && o.status!==f.status) return false;
    if(f.cat && o.category!==f.cat) return false;
    if(f.q && [o.title,o.organization,o.summary,o.category,o.region].join(' ').toLowerCase().indexOf(f.q.toLowerCase())===-1) return false;
    return true;
  }).sort(function(a,b){
    if(f.sort==='fit') return (Number(b.fit_score)||0)-(Number(a.fit_score)||0);
    if(f.sort==='found') return String(b.found_at).localeCompare(String(a.found_at));
    var ka = isYmd(a.end_date)?String(a.end_date).slice(0,10):(a.end_date?'9998':'9999'), kb = isYmd(b.end_date)?String(b.end_date).slice(0,10):(b.end_date?'9998':'9999');
    return ka.localeCompare(kb);
  });
  var cats = bpUniq(all.map(function(o){ return o.category; }));
  var h = wcHead(news?'Industry News':'Grants & Accelerators', news?'Industry, competitor and customer news. Claude searches the web, opens each source and records the published / end date.':'Grants, accelerators, fellowships and competitions. Claude opens each official page, reads the deadline, then re-checks it in a second pass. Anything whose end date has passed is removed.',
    (news?'':'<button class="btn btn-ghost" onclick="openOppPost()">+ From a LinkedIn post</button>')+'<button class="btn btn-ghost" onclick="openAddOpp(\''+kind+'\')">+ Add manually</button><button class="btn btn-primary" id="oppScanBtn" onclick="scanOpps(\''+(news?'news':'grants')+'\')">'+(news?'Refresh news':'Scan the web now')+'</button>');
  var openN = all.filter(function(o){ return !oppExpired(o) && ['Not a fit'].indexOf(o.status)===-1; }).length;
  h += '<div class="wc-grid g4 keep2" style="margin-bottom:14px"><div class="card stat-card"><div class="stat-lbl">'+(news?'Items':'Open now')+'</div><div class="stat-num">'+openN+'</div></div>'+
    (news?'':'<div class="card stat-card"><div class="stat-lbl">Closing in 14 days</div><div class="stat-num" style="color:var(--amber)">'+all.filter(function(o){ return !oppExpired(o) && isYmd(o.end_date) && daysLeft(o.end_date)<=14; }).length+'</div></div><div class="card stat-card"><div class="stat-lbl">Reviewing / applied</div><div class="stat-num">'+all.filter(function(o){ return ['Reviewing','Applied'].indexOf(o.status)>-1; }).length+'</div></div>')+
    '<div class="card stat-card"><div class="stat-lbl">Auto-removed (ended)</div><div class="stat-num">'+hidden+'</div><div class="stat-sub">end date already passed</div></div></div>';
  h += '<div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px"><input class="wc-input" style="width:220px" placeholder="Search…" value="'+esc(f.q)+'" onchange="oppFilterState(\''+kind+'\').q=this.value;render()">'+
    '<select class="wc-sel" style="width:auto" onchange="oppFilterState(\''+kind+'\').status=this.value;render()">'+optionsHtml(['Open','All'].concat(OPP_STATUS), f.status)+'</select>'+
    '<select class="wc-sel" style="width:auto" onchange="oppFilterState(\''+kind+'\').cat=this.value;render()"><option value="">All types</option>'+cats.map(function(c){ return '<option'+(f.cat===c?' selected':'')+'>'+esc(c)+'</option>'; }).join('')+'</select>'+
    '<select class="wc-sel" style="width:auto" onchange="oppFilterState(\''+kind+'\').sort=this.value;render()">'+optionsHtml([{value:'end',label:'Sort: closing soonest'}].concat(news?[]:[{value:'fit',label:'Sort: best fit'}]).concat([{value:'found',label:'Sort: newest found'}]), f.sort)+'</select>'+
    '<label style="display:flex;gap:6px;align-items:center;font-size:12.5px"><input type="checkbox" '+(f.expired?'checked':'')+' onchange="oppFilterState(\''+kind+'\').expired=this.checked;render()"> show ended</label></div>';
  h += '<div id="oppScanMsg"></div><div class="card wc-scroll" style="padding:0"><table class="wc-table"><thead><tr><th>'+(news?'Headline':'Programme')+'</th><th>'+(news?'Source':'Organisation')+'</th><th>Type</th>'+(news?'<th>Published</th>':'<th>Opens</th>')+'<th>End date</th>'+(news?'':'<th>Amount</th><th>Fit for us</th>')+'<th>Status</th><th></th></tr></thead><tbody>'+
    (list.map(function(o){
      var ver = o.verified==='yes' || o.verified===true || o.verified==='true';
      return '<tr><td style="min-width:240px"><b>'+(o.url?'<a href="'+esc(o.url)+'" target="_blank" rel="noopener" style="color:var(--brand)">'+esc(o.title)+'</a>':esc(o.title))+'</b>'+(ver?' <span title="'+esc(o.verified_note||'Deadline re-checked on the official page')+'" style="color:var(--green)">✓</span>':'')+'<div class="wc-muted" style="max-width:420px">'+esc(o.summary||'')+'</div>'+(o.eligibility?'<div class="wc-muted">Eligibility: '+esc(o.eligibility)+'</div>':'')+'</td>'+
        '<td>'+esc(o.organization||o.source_name||'')+(o.region?'<div class="wc-muted">'+esc(o.region)+'</div>':'')+'</td><td>'+(o.category?pill(o.category,'mute'):'')+'</td><td style="white-space:nowrap">'+esc(isYmd(o.start_date)?fmtDate(o.start_date):'—')+'</td><td style="white-space:nowrap">'+endCell(o)+'</td>'+
        (news?'':'<td>'+esc(o.amount||'—')+'</td><td style="min-width:150px">'+(o.fit_score!==''&&o.fit_score!==undefined?'<div style="display:flex;gap:6px;align-items:center"><div class="wc-bar'+(Number(o.fit_score)>=70?' good':(Number(o.fit_score)<40?' bad':''))+'" style="width:54px"><i style="width:'+Number(o.fit_score)+'%"></i></div><b>'+Number(o.fit_score)+'</b></div><div class="wc-muted">'+esc(o.fit_reason||'')+'</div>':'<span class="wc-muted">not rated</span>')+'</td>')+
        '<td><select class="wc-sel" style="padding:4px 6px;width:108px" onchange="setOppStatus(\''+o.opp_id+'\',this.value)">'+optionsHtml(OPP_STATUS.concat(oppExpired(o)?['Expired']:[]), o.status)+'</select></td>'+
        '<td style="white-space:nowrap">'+(news?'':'<button class="btn btn-ghost btn-sm" title="Ask Claude how well this fits WeCollect" onclick="evalOpp(\''+o.opp_id+'\')">Evaluate</button> ')+'<button class="btn btn-ghost btn-sm" onclick="openOppNotes(\''+o.opp_id+'\')">Notes</button></td></tr>'; }).join('') ||
      '<tr><td colspan="9" class="empty">'+(all.length?'Nothing matches these filters.':'Nothing here yet. Press <b>'+(news?'Refresh news':'Scan the web now')+'</b> — it takes about a minute.')+'</td></tr>')+'</tbody></table></div>';
  h += '<div class="wc-note" style="margin-top:12px">✓ = the closing date was confirmed a second time by re-reading the official page. “Not stated” means the page showed no date — check before relying on it. This list also refreshes itself every week (Slack channel “Grants & industry news”).</div>';
  return wcPage(h);
}
function scanOpps(kind){
  var b = document.getElementById('oppScanBtn'); if(b){ b.disabled = true; b.textContent = 'Reading sources… (≈1 min)'; }
  var m = document.getElementById('oppScanMsg'); if(m) m.innerHTML = '<div class="wc-note" style="margin-bottom:12px">Claude is reading your directory sources (vc4a and others set in Settings), checking LinkedIn posts, opening each official page and verifying closing dates. This can take 2–4 minutes — keep this tab open.</div>';
  api('runOpportunitiesScan', {kind:kind, actor:CURRENT_USER}).then(function(res){
    if(!res.ok){ if(b){ b.disabled = false; b.textContent = 'Scan the web now'; } return wcFail('Scan failed', res); }
    var s = res.stats||{};
    refreshData().then(function(){ wcToast((s.source_pages?'Read '+s.source_pages+' directory page(s)'+(s.source_found?' ('+s.source_found+' programmes)':'')+' · ':'')+(s.linkedin_found?s.linkedin_found+' LinkedIn leads · ':'')+'Found '+s.found+' · added '+s.added+' · dropped '+((s.dropped_expired||0)+(s.dropped_closed||0))+' already closed'+(s.duplicates?' · '+s.duplicates+' duplicates':'')); });
  });
}
function setOppStatus(id, st){ api('updateOpportunity', {opp_id:id, status:st, actor:CURRENT_USER}).then(function(res){ if(!res.ok) return wcFail('Could not update', res); var o = DB.opportunities.filter(function(x){ return x.opp_id===id; })[0]; if(o) o.status = st; render(); }); }
function evalOpp(id){
  wcToast('Asking Claude to read the page and judge fit…');
  api('evaluateOpportunity', {opp_id:id, actor:CURRENT_USER}).then(function(res){
    if(!res.ok) return wcFail('Could not evaluate', res);
    refreshData().then(function(){ openOppNotes(id); });
  });
}
function openOppNotes(id){
  var o = DB.opportunities.filter(function(x){ return x.opp_id===id; })[0]; if(!o) return;
  var h = '<div class="wc-muted" style="margin-bottom:8px">'+esc(o.organization||'')+' · closes '+(o.end_date?esc(/rolling/i.test(o.end_date)?'Rolling':fmtDate(o.end_date)):'not stated')+'</div>'+
    (o.fit_reason?'<div class="ai-box" style="margin:0 0 12px"><div class="ai-box-h">Claude · fit '+esc(o.fit_score)+'/100</div>'+esc(o.fit_reason)+'</div>':'')+
    (o.verified_note?'<div class="wc-note" style="margin-bottom:12px">'+esc(o.verified_note)+'</div>':'')+
    fld('Our notes', ta('on_notes', o.notes, 'Who is applying, what we need, links…', 4))+
    '<div class="wc-grid g2">'+fld('End date (correct it if the page says otherwise)', inp('on_end', isYmd(o.end_date)?String(o.end_date).slice(0,10):'', 'date'))+fld('Status', sel('on_status', OPP_STATUS, o.status))+'</div>'+
    '<button class="btn btn-primary" onclick="saveOppNotes(\''+id+'\')">Save</button>';
  wcModal('opp', esc(o.title), h);
}
function saveOppNotes(id){
  var u = {opp_id:id, notes:val('on_notes'), status:val('on_status'), actor:CURRENT_USER}; var e = val('on_end'); if(e) u.end_date = e;
  api('updateOpportunity', u).then(function(res){ if(!res.ok) return wcFail('Could not save', res); wcClose('opp'); refreshData(); });
}
function openOppPost(){
  wcModal('opppost','Add from a post or link', '<div class="wc-muted" style="margin-bottom:10px">Paste the text of a LinkedIn post (or any announcement), and/or a link to the programme page. Claude reads it and fills in the programme, deadline and fit. Posts that have already closed are not added.</div>'+fld('Post text', ta('op_text','', 'Paste the post here…', 6))+fld('Link (optional)', inp('op_url','', 'url', 'https://…'))+'<button class="btn btn-primary" id="op_go" onclick="saveOppPost()">Add to the table</button>');
}
function saveOppPost(){
  if(!val('op_text').trim() && !val('op_url').trim()) return wcToast('Paste the post text or a link.', true);
  var b = document.getElementById('op_go'); b.disabled = true; b.textContent = 'Claude is reading it…';
  api('addOpportunityFromPost', {text:val('op_text'), url:val('op_url'), actor:CURRENT_USER}).then(function(res){
    if(!res.ok){ b.disabled = false; b.textContent = 'Add to the table'; return wcFail('Could not add', res); }
    wcClose('opppost'); refreshData().then(function(){ wcToast(res.message || (res.added?'Added.':'Not added.'), !res.added); });
  });
}
function openAddOpp(kind){
  var news = kind==='News';
  var h = fld('Title', inp('ao_title'))+'<div class="wc-grid g2">'+fld('Organisation / source', inp('ao_org'))+fld('Link', inp('ao_url','', 'url', 'https://…'))+'</div>'+
    '<div class="wc-grid g3">'+fld('Type', inp('ao_type','', 'text', news?'Industry / Competitor / Customer':'Grant / Accelerator / Fellowship'))+fld(news?'Published':'Opens', inp('ao_start','', 'date'))+fld('End date', inp('ao_end','', 'date'))+'</div>'+
    (news?'':'<div class="wc-grid g2">'+fld('Amount', inp('ao_amt'))+fld('Region', inp('ao_reg'))+'</div>')+fld('Summary', ta('ao_sum','', '',2))+'<button class="btn btn-primary" onclick="saveAddOpp(\''+kind+'\')">Add</button>';
  wcModal('addopp','Add '+(news?'news item':'opportunity'), h);
}
function saveAddOpp(kind){
  if(!val('ao_title').trim()) return wcToast('Title is required.', true);
  api('createOpportunity', {kind:kind, title:val('ao_title'), organization:val('ao_org'), url:val('ao_url'), type:val('ao_type'), start_date:val('ao_start'), end_date:val('ao_end'), amount:val('ao_amt'), region:val('ao_reg'), summary:val('ao_sum'), actor:CURRENT_USER}).then(function(res){
    if(!res.ok) return wcFail('Could not add', res); wcClose('addopp'); refreshData().then(function(){ wcToast(res.result==='duplicate'?'Already in the list.':'Added.'); });
  });
}

// ═══════════════════════════════════════════════════════════════════════
//  AI COMMAND CENTER — Claude only
// ═══════════════════════════════════════════════════════════════════════
var CMD_EXAMPLES = ['Which tickets are blocked or overdue?','What is delaying our client projects?','Which prospects need a follow-up this week?','Which grants close in the next 3 weeks?','Who is out of office this week?','Summarise Engineering’s open bugs by system'];
function renderCommand(){
  var admin = isAdminUser(), cfg = DB.config||{};
  var h = wcHead('AI Command Center', 'Powered by <b>Claude</b> (Anthropic). Ask in plain language — answers come only from your own workspace data.');
  h += '<div class="card" style="padding:18px 20px;margin-bottom:16px"><div style="display:flex;gap:8px"><input class="wc-input" id="cmdInput" placeholder="Ask a question…" onkeydown="if(event.key===\'Enter\')runCommand()"><button class="btn btn-primary" id="cmdBtn" onclick="runCommand()">Ask</button></div>'+
    '<div style="margin-top:10px">'+CMD_EXAMPLES.map(function(q){ return '<span class="wc-chip" onclick="document.getElementById(\'cmdInput\').value=this.textContent;runCommand()">'+esc(q)+'</span>'; }).join('')+'</div><div id="cmdResult" style="margin-top:14px"></div></div>';
  if(admin){
    h += '<div class="wc-grid g2"><div class="card" style="padding:18px 20px"><div class="card-h">Weekly leadership report</div><div class="wc-muted" style="margin-bottom:10px">A Google Doc summarising tickets, projects, UAT, CRM, finance and people — also sent every Thursday to Leadership.</div>'+
      (cfg.last_leadership_report_url?'<div class="wc-note" style="margin-bottom:10px">Last: <a href="'+esc(cfg.last_leadership_report_url)+'" target="_blank" rel="noopener" style="color:var(--brand);font-weight:600">open report</a> · '+esc(fmtDateTime(cfg.last_leadership_report_at))+'<br>'+esc(cfg.last_leadership_report_headline||'')+'</div>':'')+
      '<button class="btn btn-primary btn-sm" id="repBtn" onclick="makeReport()">Generate now</button><div id="repOut" style="margin-top:10px"></div></div>'+
      '<div class="card" style="padding:18px 20px"><div class="card-h">Weekly content pool</div><div class="wc-muted" style="margin-bottom:10px">Claude drafts this week’s content ideas into the Content Calendar. It also runs by itself every Friday morning.</div><button class="btn btn-primary btn-sm" id="poolBtn" onclick="makePool()">Generate this week’s pool</button><div id="poolOut" style="margin-top:10px"></div></div></div>';
  }
  return wcPage(h);
}
function runCommand(){
  var q = val('cmdInput').trim(); if(!q) return;
  var out = document.getElementById('cmdResult'); out.innerHTML = '<div class="wc-muted">Claude is thinking…</div>';
  api('commandQuery', {query:q}).then(function(res){
    if(!res.ok){ out.innerHTML = '<div class="wc-note bad">'+esc(res.error||'Something went wrong')+'</div>'; return; }
    out.innerHTML = '<div class="ai-box" style="margin:0 0 12px"><div class="ai-box-h">Claude</div><div style="white-space:pre-wrap">'+esc(res.explanation||'')+'</div></div>'+(res.results&&res.results.length?'<div class="wc-lbl">Matching tickets</div>'+res.results.map(ticketCardHtml).join(''):'');
  });
}
function makeReport(){
  var b = document.getElementById('repBtn'); b.disabled = true; b.textContent = 'Writing…';
  api('generateLeadershipReport', {actor:CURRENT_USER}).then(function(res){
    b.disabled = false; b.textContent = 'Generate now';
    if(!res.ok) return wcFail('Could not generate', res);
    document.getElementById('repOut').innerHTML = '<div class="wc-note good"><b>'+esc((res.narrative||{}).headline||'Report ready')+'</b>'+(res.url?'<br><a href="'+esc(res.url)+'" target="_blank" rel="noopener" style="color:var(--brand);font-weight:600">Open the Google Doc</a>':'')+'<br>Sent to admins on Slack.</div>';
    refreshData(false);
  });
}
function makePool(){
  var b = document.getElementById('poolBtn'); b.disabled = true; b.textContent = 'Drafting…';
  api('runContentPoolNow', {actor:CURRENT_USER}).then(function(res){
    b.disabled = false; b.textContent = 'Generate this week’s pool';
    if(!res.ok) return wcFail('Could not generate content pool', res);
    document.getElementById('poolOut').innerHTML = '<div class="wc-note good">'+res.created+' ideas added to the Content Calendar.</div>'; refreshData(false);
  });
}

// ═══════════════════════════════════════════════════════════════════════
//  SETTINGS (admin) — Slack channels per update type, CRM links, triggers
// ═══════════════════════════════════════════════════════════════════════
var SETTINGS = null;
function renderSettings(){
  if(!isCoreAdmin()) return wcPage('<div class="empty">Settings are restricted to Admins (core settings).</div>');
  var w = wcPage('<div class="empty">Loading settings…</div>');
  api('getSettings', {}).then(function(res){
    if(!res.ok){ w.innerHTML = '<div class="wc-note bad">'+esc(res.error||'Could not load settings')+'</div>'; return; }
    SETTINGS = res; w.innerHTML = settingsHtml(res);
  });
  return w;
}
function sdot(ok){ return '<span style="display:inline-block;width:9px;height:9px;border-radius:50%;background:'+(ok?'var(--green)':'var(--red)')+';margin-right:8px"></span>'; }
function settingsHtml(s){
  var c = s.config||{}, st = s.status||{}, cats = s.categories||[];
  var missing = (st.expected_triggers||[]).filter(function(t){ return (st.triggers||[]).indexOf(t)===-1; });
  var h = wcHead('Settings', 'Everything that was previously hard-coded or in Script Properties-by-hand. API keys are never shown here — they stay in Script Properties.', '<button class="btn btn-primary" onclick="saveAllSettings()">Save all settings</button>');
  h += '<div class="card" style="padding:18px 20px;margin-bottom:16px"><div class="card-h">Connections <button class="btn btn-ghost btn-sm" onclick="renderSettingsRefresh()">Check setup</button></div>'+
    [['Claude (Anthropic) API key', st.anthropic_key, 'ANTHROPIC_API_KEY'],['Slack bot token', st.slack_token, 'SLACK_BOT_TOKEN'],['Paystack secret key (account verification only)', st.paystack_key, 'PAYSTACK_SECRET_KEY'],['YouTube API key (training videos)', st.youtube_key, 'YOUTUBE_API_KEY'],['Calendar advanced service', st.calendar_service, 'Services → Google Calendar API']].map(function(r){ return '<div class="wc-row">'+sdot(r[1])+'<span style="flex:1">'+r[0]+'</span><span class="wc-muted">'+(r[1]?'connected':'missing — '+r[2])+'</span></div>'; }).join('')+
    '<div class="wc-row"><span style="flex:1">AI provider</span><b>'+esc(st.ai_provider||'Claude')+'</b><span class="wc-muted">'+esc(st.ai_model||'')+' · fast: '+esc(st.ai_fast_model||'')+'</span></div>'+
    '<div class="wc-row"><span style="flex:1">Backend version</span><b>'+esc(s.backend_version||'')+'</b>'+(s.backend_version===EXPECTED_BACKEND?pill('matches this page','good'):pill('page expects '+EXPECTED_BACKEND,'warn'))+'</div>'+
    '<div style="margin-top:10px;display:flex;gap:8px;flex-wrap:wrap"><button class="btn btn-ghost btn-sm" onclick="testClaudeClick()">Test Claude</button><button class="btn btn-ghost btn-sm" onclick="testSlackDmClick()">Send myself a test Slack DM</button></div><div id="sTestOut" style="margin-top:8px"></div></div>';

  h += '<div class="card" style="padding:18px 20px;margin-bottom:16px"><div class="card-h">Slack channels — one per kind of update</div><div class="wc-muted" style="margin-bottom:12px">Paste the channel ID (open the channel → ⋯ → Copy link → the part starting with C). Invite the bot to each channel. People still get their own DMs for things assigned to them. Leave blank to skip posting for that category (it falls back to General).</div>'+
    cats.map(function(k){ return '<div class="wc-row" style="align-items:flex-start;flex-wrap:wrap"><div style="width:230px"><b style="font-size:13px">'+esc(k.label)+'</b><div class="wc-muted">'+esc(k.hint)+'</div></div><input class="wc-input sv" data-k="slack_channel_'+esc(k.key)+'" style="flex:1;min-width:180px" placeholder="C0123ABCD" value="'+esc(c['slack_channel_'+k.key]||'')+'"><button class="btn btn-ghost btn-sm" onclick="testChannel(\''+esc(k.key)+'\')">Send test</button><span id="tc_'+esc(k.key)+'" class="wc-muted" style="width:100%;padding-left:230px"></span></div>'; }).join('')+
    '<div class="wc-help" style="margin-top:8px">Each client project can also have its own channel ID when you create it.</div></div>';

  h += '<div class="wc-grid g2" style="margin-bottom:16px"><div class="card" style="padding:18px 20px"><div class="card-h">CRM</div>'+
    fld('Brochure link — Data Collection / Research', '<input class="wc-input sv" data-k="crm_brochure_url_data" value="'+esc(c.crm_brochure_url_data||'')+'" placeholder="https://drive.google.com/…">')+fld('Brochure link — Field Operation', '<input class="wc-input sv" data-k="crm_brochure_url_field" value="'+esc(c.crm_brochure_url_field||'')+'" placeholder="https://…">')+fld('Fallback brochure link', '<input class="wc-input sv" data-k="crm_brochure_url" value="'+esc(c.crm_brochure_url||'')+'">')+
    fld('Booking / calendar link (added to follow-up emails)', '<input class="wc-input sv" data-k="crm_calendar_link" value="'+esc(c.crm_calendar_link||'')+'">')+fld('Sender name', '<input class="wc-input sv" data-k="crm_sender_name" value="'+esc(c.crm_sender_name||'')+'" placeholder="WeCollect">')+fld('Reply-to (sales email)', '<input class="wc-input sv" data-k="crm_sales_email" value="'+esc(c.crm_sales_email||'')+'">')+fld('Team CC on discovery calls & brochures', '<input class="wc-input sv" data-k="crm_team_cc" value="'+esc(c.crm_team_cc||'')+'" placeholder="a@wecollect.co, b@wecollect.co">')+'</div>'+
    '<div class="card" style="padding:18px 20px"><div class="card-h">Company, leave & payroll</div>'+
    fld('Company name', '<input class="wc-input sv" data-k="company_name" value="'+esc(c.company_name||'WeCollect')+'">')+fld('Company profile (used by Claude to judge grant fit)', '<textarea class="wc-ta sv" data-k="company_profile" style="min-height:110px" placeholder="Stage, country, what we do, team size, sectors, what funding we are looking for…">'+esc(c.company_profile||'')+'</textarea>')+
    '<div class="wc-grid g2">'+fld('Annual leave (days)', '<input class="wc-input sv" type="number" data-k="leave_annual_days" value="'+esc(c.leave_annual_days||20)+'">')+fld('Pay day of month', '<input class="wc-input sv" type="number" data-k="payroll_pay_day" value="'+esc(c.payroll_pay_day||25)+'">')+'</div>'+fld('Opportunities to surface per week', '<input class="wc-input sv" type="number" data-k="opp_weekly_target" value="'+esc(c.opp_weekly_target||'')+'">')+'</div></div>';

  h += '<div class="card" style="padding:18px 20px;margin-bottom:16px"><div class="card-h">Grants &amp; accelerators — where to look</div><div class="wc-muted" style="margin-bottom:10px">The weekly scan reads these directory pages directly and opens each programme’s own page for the real deadline. One link per line (or comma separated). It also reads <code>/page/2/</code>, <code>/page/3/</code>… of each, up to the number below. Use direct programme directories rather than blogs.</div>'+
    fld('Directory pages', '<textarea class="wc-input sv" rows="3" data-k="opp_sources" placeholder="https://vc4a.com/programs/">'+esc(c.opp_sources||'https://vc4a.com/programs/')+'</textarea>')+fld('Pages to read per directory (1–5)', '<input class="wc-input sv" type="number" min="1" max="5" data-k="opp_source_pages" value="'+esc(c.opp_source_pages||2)+'">')+'</div>';
  h += '<div class="card" style="padding:18px 20px;margin-bottom:16px"><div class="card-h">Marketing — monthly newsletter &amp; webinar</div><div class="wc-muted" style="margin-bottom:10px">A card with a checklist is created every month. Pick which weekday and which week.</div><div class="wc-grid g3">'+
    fld('Newsletter — week of month', '<select class="wc-sel sv" data-k="marketing_newsletter_nth">'+optionsHtml([{value:'1',label:'1st'},{value:'2',label:'2nd'},{value:'3',label:'3rd'},{value:'4',label:'4th'}], c.marketing_newsletter_nth||'1')+'</select>')+
    fld('Newsletter — weekday', '<select class="wc-sel sv" data-k="marketing_newsletter_weekday">'+optionsHtml([{value:'1',label:'Monday'},{value:'2',label:'Tuesday'},{value:'3',label:'Wednesday'},{value:'4',label:'Thursday'},{value:'5',label:'Friday'}], c.marketing_newsletter_weekday||'2')+'</select>')+
    fld('Owner (gets the monthly cards)', '<select class="wc-sel sv" data-k="marketing_owner">'+optionsHtml(teamNames(), c.marketing_owner||'', 'Unassigned')+'</select>')+
    fld('Webinar — week of month', '<select class="wc-sel sv" data-k="marketing_webinar_nth">'+optionsHtml([{value:'1',label:'1st'},{value:'2',label:'2nd'},{value:'3',label:'3rd'},{value:'4',label:'4th'}], c.marketing_webinar_nth||'3')+'</select>')+
    fld('Webinar — weekday', '<select class="wc-sel sv" data-k="marketing_webinar_weekday">'+optionsHtml([{value:'1',label:'Monday'},{value:'2',label:'Tuesday'},{value:'3',label:'Wednesday'},{value:'4',label:'Thursday'},{value:'5',label:'Friday'}], c.marketing_webinar_weekday||'4')+'</select>')+'</div></div>';
  h += docsSettingsHtml(s);
  h += accessMatrixHtml(s);
  h += accessCheckHtml();
  h += speedHtml();
  h += legacyImportHtml();
  h += '<div class="card" style="padding:18px 20px"><div class="card-h">Automations</div><div class="wc-muted" style="margin-bottom:10px">Time-based jobs: Friday content pool, Thursday leadership report, weekly grants scan, daily project and follow-up reminders, payroll reminders.</div>'+
    ((st.triggers===null)?'<div class="wc-note warn">Could not read triggers — re-authorise the script (new permission needed).</div>':(missing.length?'<div class="wc-note warn" style="margin-bottom:10px">Missing: '+missing.map(esc).join(', ')+'</div>':'<div class="wc-note good" style="margin-bottom:10px">All '+(st.expected_triggers||[]).length+' automations are installed.</div>'))+
    '<button class="btn btn-primary btn-sm" onclick="installTriggers()">'+(missing.length?'Install missing automations':'Re-check automations')+'</button> <span class="wc-muted">Safe to press repeatedly — it never creates duplicates.</span><div id="trOut" style="margin-top:8px"></div></div>';
  return h;
}
function renderSettingsRefresh(){ render(); }
function saveAllSettings(){
  var values = {}; document.querySelectorAll('.sv').forEach(function(e){ values[e.getAttribute('data-k')] = e.value; });
  api('saveSettings', {values:values, actor:CURRENT_USER}).then(function(res){ if(!res.ok) return wcFail('Could not save', res); DB.config = res.config || DB.config; wcToast(res.saved+' settings saved.'); });
}
function testChannel(key){
  var inpEl = document.querySelector('.sv[data-k="slack_channel_'+key+'"]'), out = document.getElementById('tc_'+key);
  out.textContent = 'Sending…';
  api('testSlackChannel', {category:key, channel_id:inpEl.value.trim(), actor:CURRENT_USER}).then(function(res){ out.innerHTML = res.ok ? '<span style="color:var(--green)">✓ Test message posted — check the channel.</span>' : '<span style="color:var(--red)">'+esc(res.error||'Failed')+'</span>'; });
}
function testClaudeClick(){
  var o = document.getElementById('sTestOut'); o.innerHTML = '<span class="wc-muted">Calling Claude…</span>';
  api('testClaude', {}).then(function(res){ o.innerHTML = res.ok ? '<div class="wc-note good">Claude is connected — '+esc(res.provider||'Anthropic Claude')+', model '+esc(res.model||'')+' (fast: '+esc(res.fast_model||'')+').</div>' : '<div class="wc-note bad">'+esc(res.error||'Failed')+'</div>'; });
}
function testSlackDmClick(){
  var o = document.getElementById('sTestOut'); o.innerHTML = '<span class="wc-muted">Sending…</span>';
  api('testSlackDM', {}).then(function(res){ o.innerHTML = res.ok ? '<div class="wc-note good">Test DM sent to you on Slack.</div>' : '<div class="wc-note bad">'+esc(res.error||'Failed')+'</div>'; });
}
function installTriggers(){
  var o = document.getElementById('trOut'); o.innerHTML = '<span class="wc-muted">Installing…</span>';
  api('setupTriggersFromApp', {}).then(function(res){
    if(!res.ok){ o.innerHTML = '<div class="wc-note bad">'+esc(res.error||'Failed — you may need to re-authorise the script from the Apps Script editor once.')+'</div>'; return; }
    o.innerHTML = '<div class="wc-note good">Installed '+esc(res.created)+' automations'+(res.replaced?' (replaced '+esc(res.replaced)+' old ones)':'')+': '+(res.triggers||[]).map(function(t){ return esc(t.fn)+' — '+esc(t.when); }).join('; ')+'</div>'; setTimeout(render, 900);
  });
}

// ═══════════════════════════════════════════════════════════════════════
//  OFFLINE PREVIEW BACKEND (used only when the page is opened outside Apps
//  Script, e.g. from a local file). Mirrors the real actions closely so the
//  whole UI can be walked through without touching your spreadsheet.
// ═══════════════════════════════════════════════════════════════════════
var MOCK_SOP = (function(){
  function uid(){ return 'm'+Math.random().toString(36).slice(2,10); }
  function nowIso(){ return new Date().toISOString(); }
  var SOP_ROLES = ['Operations Lead','Field Operations Manager','Application Operations Manager','Temp Community Manager','Mobile App Developer','Web App Developer'];
var R_OPS = 'Operations Lead';
var R_FIELD = 'Field Operations Manager';
var R_APP = 'Application Operations Manager';
var R_CM = 'Temp Community Manager';
var PHASE_ORDER = ['Kickoff', 'Pre-Fieldwork', 'Fieldwork', 'Close'];

// [title, role, co-role, auto_key, time]   (auto_key = ticked automatically
// from the Agent Tracker table; time = HH:MM on the day)
var SOP_KICKOFF = [
  ['Scope of work drafted and signed off by the Operations Lead', R_OPS, '', '', ''],
  ['Briefing call scheduled with full internal team', R_OPS, '', '', ''],
  ['Questionnaire drafting assigned to Project Operations', R_APP, '', '', ''],
  ['Risk assessment completed and approved', R_OPS, '', '', ''],
  ['Recruitment plan agreed (headcount, locations, waitlist target)', R_FIELD, '', '', '']
];
var SOP_PRE = [
  ['Project Tracker Workbook created and shared with the Field Operations Manager', R_APP, '', '', ''],
  ['Agent recruitment completed - target headcount confirmed', R_FIELD, '', 'headcount', ''],
  ['Waitlist of 20-30% additional agents maintained', R_FIELD, R_CM, 'waitlist', ''],
  ['All agents individually briefed, understanding confirmed and consent recorded', R_FIELD, R_CM, 'briefed', ''],
  ['All consented agents added to the project group', R_FIELD, '', 'grouped', ''],
  ['Questionnaire fully tested and client-approved', R_APP, '', '', ''],
  ['Operations Lead written go-ahead received for form publication', R_OPS, R_APP, '', ''],
  ['Form published and assigned to confirmed agents only', R_APP, '', '', ''],
  ['Virtual general briefing completed - attendance log saved', R_FIELD, R_APP, '', ''],
  ['Project assigned to all agents - acceptance confirmed and logged', R_APP, R_FIELD, 'accepted', ''],
  ['Sample submissions received from all agents', R_FIELD, '', 'samples', ''],
  ['Sample submissions reviewed and deleted immediately', R_APP, '', '', ''],
  ['Confirmation roll call done - all agents cleared for deployment', R_FIELD, '', 'cleared', ''],
  ['Device and connectivity checks completed', R_CM, '', '', ''],
  ['Offline mode tested by all agents', R_CM, '', '', ''],
  ['All steps completed within 1 working day (or Operations Lead informed)', R_FIELD, R_APP, '', '']
];
var SOP_DAILY = [
  ['Morning activation message sent in project group', R_FIELD, '', '', '07:00'],
  ['Morning roll call conducted by 07:15 - all agents confirmed active', R_CM, '', '', '07:15'],
  ['07:30 - all agents confirmed deployed', R_CM, '', '', '07:30'],
  ['10:30 - 3-hour roll call completed; submission counts logged', R_CM, '', '', '10:30'],
  ['10:30 - QA review of first-wave data commenced', R_APP, '', '', '10:30'],
  ['Any inactivity incidents flagged to the Field Operations Manager immediately', R_CM, R_FIELD, '', '10:30'],
  ['13:30 - second roll call completed; mid-day status sent', R_CM, R_FIELD, '', '13:30'],
  ['14:00 - mid-day report posted to Slack', R_FIELD, '', '', '14:00'],
  ['16:30 - third roll call; final push alert sent to lagging agents', R_CM, '', '', '16:30'],
  ['17:30 - field close confirmed; all agents syncing data', R_FIELD, '', '', '17:30'],
  ['18:00 - QA final review in progress', R_APP, '', '', '18:00'],
  ['Spot checks documented (min. 2 per zone)', R_APP, '', '', '18:00'],
  ['All inactivity and incident logs updated', R_CM, '', '', '18:00'],
  ['18:30 - daily report posted to the project Slack channel', R_FIELD, '', '', '18:30'],
  ['Next day briefing notes prepared', R_FIELD, '', '', '18:30']
];
var SOP_QA = [
  ['GPS coordinates verified for each batch of submissions', R_APP, '', '', '18:00'],
  ['Photo/audio evidence reviewed and consistent with stated context', R_APP, '', '', '18:00'],
  ['Duplicate detection run - suspected duplicates resolved', R_APP, '', '', '18:00'],
  ['Response pattern analysis completed (suspicious uniformity checked)', R_APP, '', '', '18:00'],
  ['Duration check completed (minimum interview time validated)', R_APP, '', '', '18:00'],
  ['Contradictory response logic check applied', R_APP, '', '', '18:00'],
  ['Agent-level acceptance rates tracked and anomalies flagged (>15% declined = on watch, >25% = suspend)', R_APP, R_FIELD, '', '18:00'],
  ['All declines logged with agent name, time, and reason', R_APP, '', '', '18:00'],
  ['Sample/test data confirmed deleted - nothing in archive', R_APP, '', '', '18:00'],
  ['Approval/decline actions completed before noon deadline (next day)', R_APP, '', '', '12:00+1'],
  ['Zero pending records confirmed at deadline', R_APP, '', '', '12:00+1'],
  ['QA summary prepared for inclusion in daily report', R_APP, '', '', '18:30']
];
var SOP_CLOSE = [
  ['All submissions reviewed - zero pending on platform', R_APP, '', '', '', 1],
  ['QA Review Checklist fully completed and saved in tracker', R_APP, '', '', '', 1],
  ['Payment summary prepared by the Application Operations Manager', R_APP, '', 'payment_summary', '', 1],
  ['Payment request sent to the Operations Lead', R_APP, R_OPS, 'payment_request', '', 1],
  ['Payment confirmed and logged in tracker', R_OPS, R_APP, 'paid', '', 2],
  ['Approved dataset exported from platform', R_APP, '', '', '', 2],
  ['Dataset reviewed - no test or sample data included', R_APP, '', '', '', 2],
  ['CSV delivered to client', R_APP, '', '', '', 2],
  ['Client delivery confirmed in Slack', R_APP, '', '', '', 2],
  ['Project Tracker Workbook finalised and saved to project folder', R_FIELD, R_APP, '', '', 3],
  ['Internal debrief completed (what worked, what to change)', R_OPS, '', '', '', 3],
  ['Top-performing agents noted for future projects', R_FIELD, '', '', '', 3],
  ['Project declared closed in Slack project channel', R_FIELD, R_APP, '', '', 3]
];

// ── date helpers (plain yyyy-mm-dd strings, weekends skipped for field days)
function ymdParse_(s) {
  var m = String(s || '').match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!m) return null;
  return new Date(Date.UTC(Number(m[1]), Number(m[2]) - 1, Number(m[3]), 12, 0, 0));
}
function ymdFmt_(d) { return d.toISOString().slice(0, 10); }
function ymdToday_() { return new Date().toISOString().slice(0, 10); }
function isWorkday_(d) { var w = d.getUTCDay(); return w !== 0 && w !== 6; }
function addWorkdays_(d, n) {
  var x = new Date(d.getTime());
  var step = n >= 0 ? 1 : -1;
  var left = Math.abs(n);
  while (left > 0) { x.setUTCDate(x.getUTCDate() + step); if (isWorkday_(x)) left--; }
  return x;
}
function nextWorkdayOnOrAfter_(d) { var x = new Date(d.getTime()); while (!isWorkday_(x)) x.setUTCDate(x.getUTCDate() + 1); return x; }

function rolesMap_(payloadRoles, team) {
  var map = {};
  SOP_ROLES.forEach(function(role) {
    var chosen = payloadRoles && payloadRoles[role];
    if (Array.isArray(chosen)) chosen = chosen.filter(Boolean).join(', ');
    if (!chosen) {
      var match = team.filter(function(p) { return String(p.sop_role || '').split(',').map(function(x) { return x.trim(); }).indexOf(role) > -1; })[0];
      chosen = match ? match.name : '';
    }
    map[role] = chosen || '';
  });
  return map;
}
function firstName_(csv) { return String(csv || '').split(',')[0].trim(); }

function buildSopTasks_(project, roles) {
  var tasks = [];
  var seq = 0;
  function add(phase, group, day, row, due, time) {
    seq++;
    tasks.push({
      task_id: uid(), project_id: project.project_id, phase: phase, group: group, day: day || '',
      seq: seq, title: row[0], role: row[1], co_role: row[2] || '',
      assignee: firstName_(roles[row[1]]), co_assignee: row[2] ? firstName_(roles[row[2]]) : '',
      status: 'Todo', due_date: due, due_time: time || '', done_at: '', done_by: '', notes: '',
      auto_key: row[3] || '', reminded_at: '', overdue_notified_at: ''
    });
  }
  var start = ymdParse_(project.start_date) || ymdParse_(ymdToday_());
  var fwStart = nextWorkdayOnOrAfter_(ymdParse_(project.fieldwork_start) || start);
  var preDue = addWorkdays_(fwStart, -1);
  if (preDue < start) preDue = start;
  var days = Math.max(1, Number(project.field_days) || 2);

  SOP_KICKOFF.forEach(function(r) { add('Kickoff', 'Kickoff Checklist', '', r, ymdFmt_(start), ''); });
  SOP_PRE.forEach(function(r) { add('Pre-Fieldwork', 'Pre-Fieldwork Checklist', '', r, ymdFmt_(preDue), ''); });

  var d = new Date(fwStart.getTime());
  var lastDay = d;
  for (var i = 1; i <= days; i++) {
    lastDay = new Date(d.getTime());
    var dayStr = ymdFmt_(d);
    SOP_DAILY.forEach(function(r) { add('Fieldwork', 'Daily Check-in', i, r, dayStr, r[4]); });
    SOP_QA.forEach(function(r) {
      var t = r[4], due = dayStr;
      if (t.indexOf('+1') > -1) { due = ymdFmt_(addWorkdays_(d, 1)); t = t.replace('+1', ''); }
      add('Fieldwork', 'QA Review', i, r, due, t);
    });
    d = addWorkdays_(d, 1);
  }
  SOP_CLOSE.forEach(function(r) { add('Close', 'Project Close', '', r, ymdFmt_(addWorkdays_(lastDay, r[5])), ''); });
  return tasks;
}


  return {build: buildSopTasks_, rolesMap: rolesMap_, roles: SOP_ROLES, firstName: firstName_, phases: PHASE_ORDER};
})();

(function(){
  var seq = 1;
  function mid(p){ return p + (Date.now().toString(36)) + (seq++); }
  function nowIso(){ return new Date().toISOString(); }
  function team(n){ return DB.team.filter(function(p){ return p.name===n; })[0]; }
  function ok(o){ return Object.assign({ok:true}, o||{}); }
  function err(m){ return {ok:false, error:m}; }
  function slackLog(msg){ (DB._slack = DB._slack || []).push(msg); }
  function createBug(item, who){
    var owner = (DB.team.filter(function(p){ return String(p.systems||'').indexOf(item.module)>-1; })[0]||{}).name || '';
    var r = __mockOld('createTicket', {title:'[UAT] '+(item.test_case||item.flow), description:'Failed during UAT run.\n\nSteps:\n'+(item.steps||'')+'\n\nExpected: '+(item.expected_result||'')+'\n\nActual: '+(item.actual_notes||''), type:'Bug', department:'Engineering', system:item.module, priority:item.priority==='High'?'High':'Medium', owner:owner, reporter:who, source:'UAT', status:owner?'Assigned':'New'});
    return {ticket:r.ticket, owner:owner};
  }
  function recomputeAgent(a, p, u){
    var m = Object.assign({}, a, u), ap = Number(m.approved)||0, dc = Number(m.declined)||0, rate = Number(p && p.rate_per_record)||0, out = Object.assign({}, u);
    out.amount_due = (m.status==='Removed'||m.status==='Waitlist') ? 0 : ap*rate;
    var tot = ap+dc, dr = tot ? dc/tot : 0;
    if(['Removed','Waitlist'].indexOf(m.status)===-1 && tot>=4){
      if(dr>0.25 && m.status!=='Suspended') out.status = 'Suspended';
      else if(dr>0.15 && dr<=0.25 && m.status==='Active') out.status = 'On watch';
      else if(dr<=0.15 && m.status==='On watch') out.status = 'Active';
    }
    return out;
  }
  function syncPhase(pid){
    var p = DB.projects.filter(function(x){ return x.project_id===pid; })[0], ts = DB.projectTasks.filter(function(t){ return t.project_id===pid; });
    var ph = MOCK_SOP.phases.filter(function(x){ return ts.some(function(t){ return t.phase===x && t.status!=='Done'; }); })[0];
    var changed = false;
    if(!ph){ ph = 'Close'; if(p.status!=='Completed'){ p.status = 'Completed'; changed = true; } }
    if(p.phase!==ph){ p.phase = ph; changed = true; }
    return {phase:ph, changed:changed};
  }
  function autoCheck(pid){
    var p = DB.projects.filter(function(x){ return x.project_id===pid; })[0]; if(!p || p.kind!=='Client') return 0;
    var ag = DB.projectAgents.filter(function(a){ return a.project_id===pid; });
    var act = ag.filter(function(a){ return ['Active','On watch'].indexOf(a.status)>-1; }), wl = ag.filter(function(a){ return a.status==='Waitlist'; });
    var hc = Number(p.headcount)||0, all = function(f){ return act.length>0 && act.every(function(a){ return String(a[f]).toLowerCase()==='yes'; }); };
    var pay = ag.filter(function(a){ return Number(a.amount_due)>0; });
    var cond = {headcount: hc ? act.length>=hc : act.length>0, waitlist: hc ? wl.length>=Math.ceil(hc*0.2) : wl.length>0, briefed: act.length>0 && act.every(function(a){ return a.briefed==='yes' && a.consent==='yes'; }), grouped: all('in_group'), accepted: all('accepted'), samples: all('sample_done'), cleared: all('cleared'), paid: pay.length>0 && pay.every(function(a){ return a.paid==='yes'; })};
    var n = 0;
    DB.projectTasks.filter(function(t){ return t.project_id===pid && t.auto_key && t.status!=='Done'; }).forEach(function(t){ if(cond[t.auto_key]){ t.status = 'Done'; t.done_at = nowIso(); t.done_by = 'Agent Tracker (auto)'; n++; } });
    if(n) syncPhase(pid);
    return n;
  }
  function addFinance(e){
    var row = Object.assign({entry_id:mid('f'), project_id:'', type:'Expense', category:'', amount:0, currency:'NGN', description:'', invoice_url:'', entry_date:new Date().toISOString().slice(0,10), created_by:CURRENT_USER, created_at:nowIso(), status:'', counterparty:''}, e);
    if(!row.status) row.status = row.type==='Income' ? 'Received' : 'Paid';
    DB.financeEntries.push(row); return row;
  }
  var UAT_EXTRA = [
    {module:'Mobile App',flow:'Login',test_case:'Wrong password shows an error',type:'Functional',priority:'High',steps:'1. Open the app\n2. Enter a valid email and a wrong password\n3. Tap Log in',expected_result:'A clear “incorrect password” message appears and no session starts.'},
    {module:'Mobile App',flow:'Survey',test_case:'Submit a completed survey',type:'Functional',priority:'High',steps:'1. Open an assigned survey\n2. Answer every question\n3. Tap Submit',expected_result:'The record shows as Submitted and appears in Super Admin.'},
    {module:'Super Admin',flow:'Review',test_case:'Approve a submission',type:'Functional',priority:'High',steps:'1. Open Submissions\n2. Open a pending record\n3. Tap Approve',expected_result:'Status changes to Approved and the agent count updates.'},
    {module:'OTG',flow:'Login',test_case:'Empty form is validated',type:'Functional',priority:'Medium',steps:'1. Open OTG login\n2. Tap Log in with empty fields',expected_result:'Inline validation messages appear.'}
  ];

  var API2 = {
    // ── settings / infra ──
    getSettings: function(){ return ok({backend_version:EXPECTED_BACKEND, config:DB.config, categories:DB.slackCategories, routes:{}, status:{anthropic_key:true, slack_token:true, paystack_key:false, youtube_key:true, calendar_service:true, ai_provider:'Claude (Anthropic)', ai_model:'claude-sonnet-5', ai_fast_model:'claude-haiku-4-5-20251001', time_zone:'Africa/Lagos', triggers:['dailyCheck'], expected_triggers:['dailyCheck','weeklyContentCalendar','weeklyLeadershipReport','weeklyOpportunities']}}); },
    saveSettings: function(p){ var n = 0; Object.keys(p.values||{}).forEach(function(k){ DB.config[k] = p.values[k]; n++; }); return ok({saved:n, config:DB.config}); },
    testSlackChannel: function(p){ return p.channel_id ? ok() : err('Enter a channel ID first.'); },
    testClaude: function(){ return ok({provider:'Anthropic Claude', model:'claude-sonnet-5', fast_model:'claude-haiku-4-5-20251001'}); },
    setupTriggersFromApp: function(){ return ok({created:4, replaced:0, triggers:[{fn:'dailyCheck',when:'hourly'},{fn:'weeklyContentCalendar',when:'Fridays 07:00'}]}); },
    // ── team ──
    createTeamMember: function(p){
      var ex = DB.team.filter(function(x){ return x.email===p.email; })[0], isNew = !ex;
      if(isNew){ ex = {role:'Staff'}; DB.team.push(ex); }
      Object.keys(p).forEach(function(k){ if(['actor','quiet','kind'].indexOf(k)===-1) ex[k] = p[k]; });
      return ok({member:ex, isNew:isNew, slack_status:{ok:true}, email_status:{ok:true}});
    },
    updateTeamMember: function(p){ return API2.createTeamMember(p); },
    saveMyProfile: function(p){ var me = team(CURRENT_USER); if(!me) return err('Your Team row was not found.'); ['phone','birthday','hobbies','emergency_contact','bank_name','bank_code','account_number','account_name','slack_handle'].forEach(function(k){ if(p.hasOwnProperty(k)) me[k] = p[k]; }); return ok(); },
    // ── projects ──
    createProject: function(p){
      if(!p.name) return err('Give the project a name.');
      var kind = p.kind==='Client' ? 'Client' : 'Team';
      if(kind==='Client' && !p.client_name) return err('Client projects need a client name.');
      var today = new Date().toISOString().slice(0,10);
      var roles = kind==='Client' ? MOCK_SOP.rolesMap(p.roles, DB.team) : {};
      var pr = {project_id:mid('p'), name:p.name, department:p.department||p.departments||'', departments:p.departments||p.department||'', phase:kind==='Client'?'Kickoff':(p.phase||''), start_date:p.start_date||(kind==='Client'?today:''), target_date:p.target_date||'', status:p.status||'Active', kind:kind, client_name:p.client_name||'', contract_value:p.contract_value||'', currency:p.currency||'NGN', roles_json:JSON.stringify(kind==='Client'?roles:{lead:p.lead||'',members:p.members||[]}), scope:p.scope||'', locations:p.locations||'', headcount:p.headcount||'', daily_quota:p.daily_quota||'', field_days:p.field_days||(kind==='Client'?2:''), fieldwork_start:p.fieldwork_start||'', rate_per_record:p.rate_per_record||'', slack_channel_id:p.slack_channel_id||'', created_by:CURRENT_USER, created_at:nowIso(), closed_at:''};
      var tasks = [];
      if(kind==='Client'){ tasks = MOCK_SOP.build(pr, roles); if(!pr.target_date) pr.target_date = tasks.reduce(function(m,t){ return t.due_date>m?t.due_date:m; }, ''); }
      DB.projects.push(pr); tasks.forEach(function(t){ DB.projectTasks.push(t); });
      var fl = false;
      if(kind==='Client' && Number(pr.contract_value)>0){ addFinance({project_id:pr.project_id, type:'Income', category:'Client contract', amount:Number(pr.contract_value), currency:pr.currency, description:'Contract value - '+pr.client_name+' ('+pr.name+')', entry_date:pr.start_date||today, status:'Expected', counterparty:pr.client_name}); fl = true; }
      (p.link_ticket_ids||[]).forEach(function(id){ var t = DB.tickets.filter(function(x){ return x.ticket_id===id; })[0]; if(t) t.project_id = pr.project_id; });
      var who = {}; tasks.forEach(function(t){ if(t.assignee) who[t.assignee] = 1; if(t.co_assignee) who[t.co_assignee] = 1; });
      return ok({project:pr, tasks_created:tasks.length, finance_linked:fl, notified:Object.keys(who).length});
    },
    updateProject: function(p){
      var pr = DB.projects.filter(function(x){ return x.project_id===p.project_id; })[0]; if(!pr) return err('Project not found.');
      ['name','status','start_date','target_date','scope','locations','headcount','daily_quota','rate_per_record','slack_channel_id','client_name','contract_value','department','departments','phase','field_days','fieldwork_start'].forEach(function(k){ if(p.hasOwnProperty(k)) pr[k] = p[k]; });
      var re = 0;
      if(p.roles && pr.kind==='Client'){ var nr = MOCK_SOP.rolesMap(p.roles, DB.team); pr.roles_json = JSON.stringify(nr);
        DB.projectTasks.filter(function(t){ return t.project_id===pr.project_id && t.status!=='Done'; }).forEach(function(t){ var a = MOCK_SOP.firstName(nr[t.role]); if(a!==t.assignee){ t.assignee = a; re++; } }); }
      return ok({reassigned:re});
    },
    updateProjectTask: function(p){
      var t = DB.projectTasks.filter(function(x){ return x.task_id===p.task_id; })[0]; if(!t) return err('Task not found.');
      var ns = p.status || t.status;
      if(ns==='Done' && t.status!=='Done'){
        var my = MOCK_SOP.phases.indexOf(t.phase), open = DB.projectTasks.filter(function(x){ return x.project_id===t.project_id && MOCK_SOP.phases.indexOf(x.phase)<my && x.status!=='Done'; });
        if(open.length && !(p.override && CURRENT_USER_ROLE==='Admin')) return {ok:false, gated:true, error:'Finish the '+open[0].phase+' checklist first ('+open.length+' item'+(open.length===1?'':'s')+' still open). The SOP does not allow a later phase to be ticked early.'};
        t.done_at = nowIso(); t.done_by = CURRENT_USER;
      }
      if(ns==='Todo'){ t.done_at = ''; t.done_by = ''; }
      t.status = ns; ['notes','assignee','due_date','due_time'].forEach(function(k){ if(p.hasOwnProperty(k)) t[k] = p[k]; });
      var s = syncPhase(t.project_id); return ok({phase:s.phase, phase_changed:s.changed});
    },
    importProjectAgents: function(p){
      if(!(p.rows||[]).length) return err('No rows to import.');
      if(p.mode==='replace') DB.projectAgents = DB.projectAgents.filter(function(a){ return a.project_id!==p.project_id; });
      var seen = {}; DB.projectAgents.filter(function(a){ return a.project_id===p.project_id; }).forEach(function(a){ seen[String(a.phone).replace(/\D/g,'')||a.name.toLowerCase()] = 1; });
      var c = 0, s = 0;
      p.rows.forEach(function(r){ var nm = String(r.name||'').trim(); if(!nm){ s++; return; } var k = String(r.phone||'').replace(/\D/g,'')||nm.toLowerCase(); if(seen[k]){ s++; return; } seen[k] = 1;
        DB.projectAgents.push({agent_id:mid('a'), project_id:p.project_id, name:nm, phone:r.phone||'', location:r.location||'', consent:'no', briefed:'no', in_group:'no', accepted:'no', sample_done:'no', cleared:'no', status:r.status==='Waitlist'?'Waitlist':'Active', approved:0, declined:0, amount_due:0, paid:'no', notes:'', created_at:nowIso()}); c++; });
      return ok({created:c, skipped:s, auto_ticked:autoCheck(p.project_id)});
    },
    updateProjectAgent: function(p){
      var a = DB.projectAgents.filter(function(x){ return x.agent_id===p.agent_id; })[0]; if(!a) return err('Agent not found.');
      var pr = DB.projects.filter(function(x){ return x.project_id===a.project_id; })[0], u = {};
      ['name','phone','location','consent','briefed','in_group','accepted','sample_done','cleared','status','approved','declined','paid','notes'].forEach(function(k){ if(p.hasOwnProperty(k)) u[k] = p[k]; });
      Object.assign(a, recomputeAgent(a, pr, u)); return ok({status:a.status, auto_ticked:autoCheck(a.project_id)});
    },
    bulkUpdateProjectAgents: function(p){ var n = 0; DB.projectAgents.filter(function(a){ return a.project_id===p.project_id && (!p.agent_ids || p.agent_ids.indexOf(a.agent_id)>-1); }).forEach(function(a){ Object.assign(a, p.fields||{}); n++; }); return ok({updated:n, auto_ticked:autoCheck(p.project_id)}); },
    deleteProjectAgent: function(p){ var b = DB.projectAgents.length; DB.projectAgents = DB.projectAgents.filter(function(a){ return a.agent_id!==p.agent_id; }); return ok({deleted:b!==DB.projectAgents.length}); },
    sendPaymentRequest: function(p){
      var ag = DB.projectAgents.filter(function(a){ return a.project_id===p.project_id && Number(a.amount_due)>0; });
      if(!ag.length) return err('No agent has an amount due yet. Enter approved submissions and the per-record rate first.');
      var total = ag.reduce(function(s,a){ return s+Number(a.amount_due); },0), pr = DB.projects.filter(function(x){ return x.project_id===p.project_id; })[0];
      DB.projectTasks.filter(function(t){ return t.project_id===p.project_id && t.auto_key==='payment_summary' || t.auto_key==='payment_request'; }).forEach(function(t){ if(t.project_id===p.project_id){ t.status = 'Done'; t.done_at = nowIso(); t.done_by = 'Payment request (auto)'; } });
      slackLog('Payment request '+total); syncPhase(p.project_id);
      return ok({total:total, sent_to:MOCK_SOP.firstName(JSON.parse(pr.roles_json||'{}')['Operations Lead'])||'(no Operations Lead on this project)', slack:{ok:true}});
    },
    confirmProjectPayment: function(p){
      var ag = DB.projectAgents.filter(function(a){ return a.project_id===p.project_id && Number(a.amount_due)>0 && a.paid!=='yes'; });
      if(!ag.length) return err('All agents are already marked paid.');
      var total = ag.reduce(function(s,a){ return s+Number(a.amount_due); },0), pr = DB.projects.filter(function(x){ return x.project_id===p.project_id; })[0];
      ag.forEach(function(a){ a.paid = 'yes'; });
      addFinance({project_id:p.project_id, type:'Expense', category:'Agent payments', amount:total, currency:pr.currency, description:'Agent payments - '+ag.length+' agents', status:'Paid'});
      autoCheck(p.project_id); return ok({total:total, agents:ag.length});
    },
    // ── finance ──
    createFinanceEntry: function(p){ return ok({entry:addFinance({project_id:p.project_id||'', type:p.type==='Income'?'Income':'Expense', category:p.category||'', amount:Number(p.amount)||0, currency:p.currency||'NGN', description:p.description||'', entry_date:p.entry_date||undefined, status:p.status||'', counterparty:p.counterparty||''})}); },
    updateFinanceEntry: function(p){ var e = DB.financeEntries.filter(function(x){ return x.entry_id===p.entry_id; })[0]; if(!e) return err('Entry not found.'); ['project_id','type','category','amount','currency','description','invoice_url','entry_date','status','counterparty'].forEach(function(k){ if(p.hasOwnProperty(k)) e[k] = p[k]; }); return ok(); },
    uploadFinanceInvoice: function(p){ var e = DB.financeEntries.filter(function(x){ return x.entry_id===p.entry_id; })[0]; if(!e) return err('Entry not found.'); e.invoice_url = 'https://drive.google.com/mock/'+encodeURIComponent(p.file_name); return ok({url:e.invoice_url, name:p.file_name}); },
    // ── payroll ──
    generateMonthlyPayrollBatch: function(p){
      var created = [], skipped = [];
      DB.team.forEach(function(m){
        if(!(Number(m.salary_amount)>0)){ skipped.push(m.name); return; }
        if(DB.payroll.some(function(x){ return x.team_member_name===m.name && x.month===p.month; })) return;
        var prior = DB.payroll.filter(function(x){ return x.team_member_name===m.name && x.account_verified==='yes' && x.account_number===m.account_number && x.bank_code===m.bank_code; })[0];
        var e = {payroll_id:mid('pr'), team_member_name:m.name, email:m.email, month:p.month, bank_name:m.bank_name||'', bank_code:m.bank_code||'', account_number:m.account_number||'', account_name:m.account_name||'', account_verified:prior?'yes':'no', salary_amount:m.salary_amount, status:'Pending', created_at:nowIso()};
        if(prior) e.account_name = prior.account_name; DB.payroll.push(e); created.push(e);
      });
      return ok({created:created.length, entries:created, skipped_no_salary:skipped});
    },
    syncPayrollFromTeam: function(p){
      var n = 0;
      DB.payroll.filter(function(x){ return (!p.month || x.month===p.month) && x.status!=='Paid'; }).forEach(function(x){ var m = team(x.team_member_name); if(!m) return; if(String(m.account_number)!==String(x.account_number)||String(m.bank_code)!==String(x.bank_code)) x.account_verified = 'no'; Object.assign(x, {salary_amount:m.salary_amount||x.salary_amount, bank_name:m.bank_name||'', bank_code:m.bank_code||'', account_number:m.account_number||''}); n++; });
      return ok({updated:n});
    },
    // ── leave ──
    requestLeave: function(p){
      var unit = p.unit==='hours' ? 'hours' : 'days'; if(!p.start_date) return err('Choose a start date.');
      var end = p.end_date||p.start_date; if(end<p.start_date) return err('The end date is before the start date.');
      var hours = '';
      if(unit==='hours'){ if(!p.start_time||!p.end_time) return err('Enter the start and end time for hour-based time off.'); var a = p.start_time.split(':'), b = p.end_time.split(':'); hours = Math.round(((b[0]*60+ +b[1])-(a[0]*60+ +a[1]))/6)/10; if(hours<=0) return err('The end time must be after the start time.'); end = p.start_date; }
      var l = {leave_id:mid('lv'), team_member_name:CURRENT_USER, type:p.type||'Annual leave', start_date:p.start_date, end_date:end, reason:p.reason||'', status:'Pending', approved_by:'', created_at:nowIso(), unit:unit, start_time:unit==='hours'?p.start_time:'', end_time:unit==='hours'?p.end_time:'', hours:hours, decision_note:'', decided_at:''};
      DB.leave.push(l); slackLog('leave request'); return ok({leave:l});
    },
    decideLeave: function(p){
      var l = DB.leave.filter(function(x){ return x.leave_id===p.leave_id; })[0]; if(!l) return err('Leave request not found.');
      if(l.team_member_name===CURRENT_USER && CURRENT_USER_ROLE!=='Admin') return err('You cannot decide your own request.');
      l.status = p.status; l.approved_by = CURRENT_USER; l.decision_note = p.decision_note||''; l.decided_at = nowIso();
      if(p.status==='Approved'){ DB.timeOff.push({team_member_name:l.team_member_name, start_date:l.start_date, end_date:l.end_date, start_time:l.start_time, end_time:l.end_time}); }
      (DB.notifications_log = DB.notifications_log||[]).push({log_id:mid('n'), timestamp:nowIso(), trigger_type:'leave_decision', recipient:l.team_member_name, message:'Your '+l.type+' request was '+p.status, status:'sent'});
      return ok();
    },
    cancelLeave: function(p){ var l = DB.leave.filter(function(x){ return x.leave_id===p.leave_id; })[0]; if(!l) return err('Leave request not found.'); if(l.team_member_name!==CURRENT_USER) return err('Only the requester can cancel this.'); l.status = 'Cancelled'; DB.timeOff = DB.timeOff.filter(function(t){ return !(t.team_member_name===l.team_member_name && t.start_date===l.start_date && t.end_date===l.end_date); }); return ok(); },
    // ── UAT ──
    seedUatLibrary: function(){ var added = 0; UAT_EXTRA.forEach(function(c){ if(!DB.testCases.some(function(t){ return t.test_case===c.test_case; })){ DB.testCases.push(Object.assign({test_id:mid('tc'), result:'', actual_notes:'', tester:'', tested_at:'', linked_ticket_id:''}, c)); added++; } }); return ok({added:added, total:DB.testCases.length}); },
    startUatRun: function(p){
      var cs = DB.testCases.slice();
      if(p.module && p.module!=='All') cs = cs.filter(function(c){ return c.module===p.module; });
      if(p.only==='failed') cs = cs.filter(function(c){ return c.result==='Fail'; }); if(p.only==='untested') cs = cs.filter(function(c){ return !c.result; });
      if(!cs.length) return err('No checks match. Load the UAT library first, or pick a different module.');
      var run = {run_id:mid('run'), title:p.title||('UAT run '+new Date().toISOString().slice(0,10)+(p.module&&p.module!=='All'?' - '+p.module:'')), module:p.module||'All', tester:CURRENT_USER, status:'In progress', started_at:nowIso(), finished_at:'', total:cs.length, passed:0, failed:0, blocked:0, skipped:0};
      DB.uatRuns.unshift(run);
      var items = cs.map(function(c, i){ var it = {item_id:mid('it'), run_id:run.run_id, seq:i+1, test_id:c.test_id, module:c.module, flow:c.flow, test_case:c.test_case, steps:c.steps, expected_result:c.expected_result, priority:c.priority, result:'', actual_notes:'', ticket_id:'', evidence_url:'', tested_at:''}; DB.uatRunItems.push(it); return it; });
      return ok({run:run, items:items});
    },
    recordUatRunItem: function(p){
      var it = DB.uatRunItems.filter(function(x){ return x.item_id===p.item_id; })[0]; if(!it) return err('Run item not found.');
      if(['Pass','Fail','Blocked','Skipped'].indexOf(p.result)===-1) return err('Result must be Pass, Fail, Blocked or Skipped.');
      if((p.result==='Fail'||p.result==='Blocked') && !String(p.actual_notes||'').trim()) return err(p.result==='Fail'?'Describe what actually happened so the bug can be fixed.':'Say what is blocking this check.');
      var tc = DB.testCases.filter(function(c){ return c.test_id===it.test_id; })[0], bug = false, owner = '', tid = it.ticket_id;
      if(p.result==='Fail' && !tid){ var b = createBug(Object.assign({}, it, {actual_notes:p.actual_notes}), CURRENT_USER); tid = b.ticket.ticket_id; owner = b.owner; bug = true; }
      if(tc){ tc.result = p.result==='Skipped'?'':p.result; tc.actual_notes = p.actual_notes||''; if(tid) tc.linked_ticket_id = tid; }
      Object.assign(it, {result:p.result, actual_notes:p.actual_notes||'', ticket_id:tid, evidence_url:p.evidence_url||'', tested_at:nowIso()});
      var run = DB.uatRuns.filter(function(r){ return r.run_id===it.run_id; })[0], its = DB.uatRunItems.filter(function(x){ return x.run_id===it.run_id; });
      run.passed = its.filter(function(x){ return x.result==='Pass'; }).length; run.failed = its.filter(function(x){ return x.result==='Fail'; }).length; run.blocked = its.filter(function(x){ return x.result==='Blocked'; }).length; run.skipped = its.filter(function(x){ return x.result==='Skipped'; }).length;
      return ok({ticket_id:tid, bug_created:bug, assigned_to:owner, counts:{passed:run.passed, failed:run.failed, blocked:run.blocked}});
    },
    finishUatRun: function(p){
      var run = DB.uatRuns.filter(function(r){ return r.run_id===p.run_id; })[0]; if(!run) return err('Run not found.');
      var its = DB.uatRunItems.filter(function(x){ return x.run_id===p.run_id; }), un = its.filter(function(x){ return !x.result; });
      if(un.length && !p.force) return {ok:false, unfinished:un.length, error:un.length+' check(s) have no result yet.'};
      un.forEach(function(x){ x.result = 'Skipped'; }); run.skipped = its.filter(function(x){ return x.result==='Skipped'; }).length; run.status = 'Completed'; run.finished_at = nowIso();
      return ok({counts:{passed:run.passed, failed:run.failed, blocked:run.blocked, skipped:run.skipped}});
    },
    // ── CRM ──
    submitProspectIntake: function(p){
      var nm = String(p.name||'').trim(); if(!nm) return err('Prospect name is required.');
      if(['Entry','Requested Brochure','Agreed to a Meeting','Declined'].indexOf(p.outcome)===-1) return err('Choose an interaction outcome.');
      if((p.outcome==='Requested Brochure'||p.outcome==='Agreed to a Meeting') && !p.email) return err('An email address is needed for this outcome.');
      if(p.outcome==='Agreed to a Meeting' && (!p.meeting_date||!p.meeting_time)) return err('Pick the discovery call date and time.');
      var stageFor = {'Entry':'Prospecting Pool','Requested Brochure':'Requested More Info','Agreed to a Meeting':'Agreed to Meeting','Declined':'Declined / Cold Leads'};
      var l = {lead_id:mid('l'), name:nm, organization:p.organization||'', position:p.position||'', email:p.email||'', phone:p.phone||'', linkedin_url:p.linkedin_url||'', offering:p.offering||'', stage:stageFor[p.outcome], owner:p.owner||CURRENT_USER, source:'Intake form', created_at:nowIso(), updated_at:nowIso(), stage_history_json:'[]', meeting_notes_json:p.comments?JSON.stringify([{at:nowIso(),by:CURRENT_USER,type:'note',text:p.comments}]):'[]', follow_up_count:0, next_follow_up_due:'', decline_category:p.outcome==='Declined'?(p.decline_category||''):'', competitor:p.competitor||'', outcome:p.outcome, health:'', nurture:''};
      var acts = [{label:'Prospect logged in "'+l.stage+'"', ok:true}];
      if(p.outcome==='Declined'){ l.nurture = 'Newsletter-Nurture'; l.health = 'Cold'; acts.push({label:'Added to the newsletter-nurture list (re-engage later)', ok:true}); }
      if(p.outcome==='Requested Brochure'){ var url = (DB.config.crm_brochure_url_data||DB.config.crm_brochure_url||''); if(!url) acts.push({label:'Brochure email NOT sent - no brochure link is set (Settings → CRM)', ok:false}); else { l.health = 'Warm'; l.followup_due_at = new Date(Date.now()+48*3600*1000).toISOString(); acts.push({label:'Brochure emailed to '+l.email, ok:true}); acts.push({label:'One follow-up email scheduled for 48 hours from now', ok:true}); } }
      if(p.outcome==='Agreed to a Meeting'){ l.health = 'Hot'; l.meeting_date = p.meeting_date+' '+p.meeting_time; l.meeting_booked = 'yes'; DB.meetings.push({meeting_id:mid('m'), title:'Discovery Call: '+nm, date:p.meeting_date, time:p.meeting_time, participants:CURRENT_USER, project_id:'', raw_notes:''}); acts.push({label:'1-hour Discovery Call invite sent to 3 people (prospect, you, team CC) - Meet link attached', ok:true}); }
      if(['Prospecting Pool','Requested More Info','Agreed to Meeting','Intro Call','Follow Up','Demo Session','Follow up & Feedback'].indexOf(l.stage)>-1) l.next_follow_up_due = new Date(Date.now()+3*86400000).toISOString();
      DB.leads.push(l); return ok({lead:l, actions:acts});
    },
    logLeadFollowUp: function(p){
      var l = DB.leads.filter(function(x){ return x.lead_id===p.lead_id; })[0]; if(!l) return err('Lead not found.');
      var notes = []; try{ notes = JSON.parse(l.meeting_notes_json||'[]'); }catch(e){}
      notes.push({at:nowIso(), by:CURRENT_USER, type:'follow_up', channel:p.channel||'Email', text:p.note||'', responded:!!p.responded}); l.meeting_notes_json = JSON.stringify(notes);
      if(p.responded){ l.follow_up_count = 0; l.health = 'Hot'; l.next_follow_up_due = new Date(Date.now()+3*86400000).toISOString(); return ok({count:0, health:'Hot', message:'Reply logged - follow-up cycle reset.'}); }
      var c = (Number(l.follow_up_count)||0)+1; l.follow_up_count = c; l.next_follow_up_due = new Date(Date.now()+3*86400000).toISOString(); if(c>=3) l.health = 'Warm';
      return ok({count:c, health:l.health, message:'Follow-up '+c+' of 5 logged. Next reminder in 3 days.'});
    },
    // ── grants / news ──
    runOpportunitiesScan: function(p){
      var today = new Date().toISOString().slice(0,10), plus = function(d){ return new Date(Date.now()+d*86400000).toISOString().slice(0,10); };
      var items = p.kind==='news'
        ? [{title:'Nigeria approves national data-collection framework',category:'Industry',organization:'TechCabal',summary:'New framework affects how field survey firms store personal data.',url:'https://example.com/n1',start_date:today,end_date:''}]
        : [{title:'Africa Data Futures Accelerator',category:'Accelerator',organization:'Example Foundation',summary:'12-week programme with $50k equity-free grant.',url:'https://example.com/g1',start_date:today,end_date:plus(30),amount:'$50,000',eligibility:'Africa-based, pre-Series A',region:'Africa',fit_score:82,fit_reason:'Strong match: field data company, Nigeria.',verified:'yes',verified_note:'Deadline re-read on the official page.'},
           {title:'Old Innovation Challenge 2025',category:'Competition',organization:'Legacy Org',summary:'Closed.',url:'https://example.com/g0',end_date:plus(-20),amount:'$10,000',fit_score:60}];
      var st = {found:items.length, added:0, duplicates:0, dropped_expired:0, dropped_closed:0, unverified:0};
      items.forEach(function(i){
        if(isYmd(i.end_date) && i.end_date<today){ st.dropped_expired++; return; }
        if(DB.opportunities.some(function(o){ return o.title===i.title; })){ st.duplicates++; return; }
        DB.opportunities.push(Object.assign({opp_id:mid('o'), kind:p.kind==='news'?'News':'Opportunity', status:'New', found_at:nowIso(), source_name:i.organization, notes:'', eligibility:'', region:'', amount:'', fit_score:'', fit_reason:'', verified:'', verified_note:''}, i)); st.added++;
      });
      return ok({kind:p.kind, stats:st});
    },
    createOpportunity: function(p){ if(!p.title) return err('Title is required.'); if(DB.opportunities.some(function(o){ return o.title===p.title; })) return ok({result:'duplicate'}); DB.opportunities.push({opp_id:mid('o'), kind:p.kind==='News'?'News':'Opportunity', category:p.type||'', title:p.title, organization:p.organization||'', summary:p.summary||'', url:p.url||'', start_date:p.start_date||'', end_date:p.end_date||'', amount:p.amount||'', eligibility:'', region:p.region||'', fit_score:'', fit_reason:'', status:'New', verified:'', found_at:nowIso(), notes:''}); return ok({result:'added'}); },
    updateOpportunity: function(p){ var o = DB.opportunities.filter(function(x){ return x.opp_id===p.opp_id; })[0]; if(!o) return err('Item not found.'); ['status','notes','end_date','amount','fit_score','fit_reason','title','organization'].forEach(function(k){ if(p.hasOwnProperty(k)) o[k] = p[k]; }); return ok(); },
    evaluateOpportunity: function(p){ var o = DB.opportunities.filter(function(x){ return x.opp_id===p.opp_id; })[0]; if(!o) return err('Item not found.'); o.fit_score = 74; o.fit_reason = 'Good thematic match; check the eligibility criteria on stage and legal entity.'; return ok({evaluation:{fit_score:74}}); },
    getFileManagerData: function(){ return err('Not available in the offline preview.'); }, getTrainingDashboardData: function(){ return err('Not available in the offline preview.'); }, getAdminVideoList: function(){ return err('Not available in the offline preview.'); },
    // ── AI ──
    commandQuery: function(p){ var b = DB.tickets.filter(function(t){ return t.status==='Blocked' || t.priority==='High'; }).slice(0,3); return ok({explanation:'(preview) Claude would answer “'+p.query+'” from your workspace. These tickets look most relevant.', results:b, provider:'Claude'}); },
    generateLeadershipReport: function(){ DB.config.last_leadership_report_url = 'https://docs.google.com/document/d/mock'; DB.config.last_leadership_report_at = nowIso(); DB.config.last_leadership_report_headline = 'Steady week: bugs down, one client project in fieldwork.'; return ok({url:DB.config.last_leadership_report_url, narrative:{headline:DB.config.last_leadership_report_headline}}); },
    runContentPoolNow: function(){ for(var i=0;i<3;i++) DB.contentCalendar.push({content_id:mid('c'), title:'AI idea '+(i+1), type:'Post', platform:'LinkedIn', stage:'Idea', owner:'', notes:'', scheduled_date:'', source:'AI'}); return ok({created:3, items:[]}); }
  };
  mockApi = (function(old){
    __mockOld = old;
    return function(action, payload){ return API2[action] ? API2[action](payload||{}) : old(action, payload); };
  })(mockApi);
})();
var __mockOld;

// ── preview seed data + DB defaults ─────────────────────────────────────
['projectTasks','projectAgents','uatRuns','uatRunItems','opportunities','timeOff','slackCategories'].forEach(function(k){ if(!DB[k]) DB[k] = []; });
if(!DB.config) DB.config = {leave_annual_days:20, payroll_pay_day:25, company_name:'WeCollect'};
DB.backend_version = EXPECTED_BACKEND;
if(!WORKSPACE_MODE){
  DB.slackCategories = [
    {key:'general',label:'General updates',hint:'Welcome messages and anything uncategorised'},{key:'engineering',label:'Engineering',hint:'Ticket assigned / blocked / review'},
    {key:'bugs',label:'Bugs & UAT',hint:'UAT failures and run summaries'},{key:'projects',label:'Projects (default)',hint:'Used when a project has no channel of its own'},
    {key:'ops_daily',label:'Daily ops reminders',hint:'Roll-calls, daily report and QA reminders'},{key:'crm',label:'CRM & Growth',hint:'New prospects, follow-ups, demos'},
    {key:'marketing',label:'Marketing & content',hint:'Weekly content pool'},{key:'finance',label:'Finance & payroll',hint:'Payroll reminders and agent payment requests'},
    {key:'hr',label:'HR & leave',hint:'Leave requests and decisions'},{key:'leadership',label:'Leadership',hint:'Thursday leadership report'},{key:'opportunities',label:'Grants & industry news',hint:'Weekly grants, accelerators and news'}];
  var T = {Oreoluwa:{salary_amount:450000,sop_role:'Operations Lead',systems:'',phone:'0801 000 0001',bank_name:'GTBank',bank_code:'058',account_number:'0123456789'},
           Chidi:{salary_amount:380000,sop_role:'Application Operations Manager, Web App Developer',systems:'Super Admin, PMD',phone:'0801 000 0002',bank_name:'GTBank',bank_code:'058',account_number:'0123456780'},
           Sarah:{salary_amount:300000,sop_role:'Field Operations Manager',systems:'',phone:'0801 000 0003',bank_name:'Access Bank',bank_code:'044',account_number:'0987654321'},
           Tunde:{sop_role:'Temp Community Manager, Mobile App Developer',systems:'Mobile App, OTG',phone:'0801 000 0004'}};
  DB.team.forEach(function(p){ Object.assign(p, T[p.name]||{}); });
  var td = new Date(), ymd = function(d){ return d.toISOString().slice(0,10); }, plus = function(n){ return ymd(new Date(td.getTime()+n*86400000)); };
  DB.opportunities = [
    {opp_id:'o1',kind:'Opportunity',category:'Accelerator',title:'Google for Startups Africa Accelerator',organization:'Google',summary:'Equity-free support for Africa-based startups using AI.',url:'https://example.com/google',start_date:plus(-10),end_date:plus(12),amount:'Up to $100k credits',eligibility:'Seed stage, Africa-based',region:'Africa',fit_score:78,fit_reason:'Strong fit — AI-assisted field data.',status:'New',verified:'yes',verified_note:'Deadline confirmed on the official page.',found_at:new Date().toISOString(),notes:''},
    {opp_id:'o2',kind:'Opportunity',category:'Grant',title:'Gates Foundation Data for Development Call',organization:'Gates Foundation',summary:'Funding for data systems that support public health decisions.',url:'https://example.com/gates',start_date:plus(-30),end_date:'Rolling',amount:'$250k',eligibility:'Registered NGO or company',region:'Global',fit_score:55,fit_reason:'Needs a public-health angle.',status:'Reviewing',verified:'yes',found_at:new Date().toISOString(),notes:''},
    {opp_id:'o3',kind:'Opportunity',category:'Fellowship',title:'Tony Elumelu Entrepreneurship Programme',organization:'TEF',summary:'Seed capital and mentoring.',url:'https://example.com/tef',start_date:plus(-60),end_date:plus(-3),amount:'$5,000',fit_score:40,status:'New',found_at:new Date().toISOString(),notes:''},
    {opp_id:'o4',kind:'Opportunity',category:'Competition',title:'Innovation Prize (no date on page)',organization:'Example Org',summary:'The page lists no deadline.',url:'https://example.com/x',start_date:'',end_date:'',amount:'',fit_score:'',status:'New',found_at:new Date().toISOString(),notes:''},
    {opp_id:'n1',kind:'News',category:'Competitor',title:'Competitor X raises $4M to expand field data in West Africa',organization:'TechCabal',summary:'Seed round led by regional VCs; plans Ghana and Kenya expansion.',url:'https://example.com/news1',start_date:plus(-2),end_date:'',status:'New',found_at:new Date().toISOString(),notes:''},
    {opp_id:'n2',kind:'News',category:'Industry',title:'Nigeria publishes new data protection guidance for survey firms',organization:'Techpoint',summary:'Consent and storage rules affect agent onboarding.',url:'https://example.com/news2',start_date:plus(-5),end_date:'',status:'New',found_at:new Date().toISOString(),notes:''}
  ];
  // one Team project + one Client project with its generated SOP tasks, agents and finance
  var tp = {project_id:'p1',name:'Guinness Study',department:'Operations',departments:'Operations',phase:'QA',start_date:'2026-06-01',target_date:'2026-09-01',status:'Active',kind:'Team',roles_json:JSON.stringify({lead:'Chidi',members:['Tunde']})};
  DB.projects.forEach(function(p){ if(!p.kind) p.kind = 'Team'; if(!p.roles_json) p.roles_json = JSON.stringify({lead:'Chidi',members:[]}); });
  var made = mockApi('createProject', {kind:'Client', name:'Lagos Household Survey', client_name:'Sahel Analytics', contract_value:4500000, currency:'NGN', scope:'1,200 household interviews across Lagos', locations:'Lagos', headcount:6, daily_quota:20, start_date:ymd(td), fieldwork_start:plus(3), field_days:2, rate_per_record:800,
    roles:{'Operations Lead':'Oreoluwa','Field Operations Manager':'Sarah','Application Operations Manager':'Chidi','Temp Community Manager':'Tunde'}});
  var pid = made.project.project_id;
  mockApi('importProjectAgents', {project_id:pid, rows:[{name:'Amina Yusuf',phone:'0803 111 0001',location:'Ikeja'},{name:'Chinedu Obi',phone:'0803 111 0002',location:'Yaba'},{name:'Funke Ade',phone:'0803 111 0003',location:'Lekki'},{name:'Ibrahim Musa',phone:'0803 111 0004',location:'Surulere'},{name:'Ngozi Eze',phone:'0803 111 0005',location:'Ajah',status:'Waitlist'}]});
  DB.projectTasks.filter(function(t){ return t.project_id===pid && t.phase==='Kickoff'; }).slice(0,2).forEach(function(t){ t.status = 'Done'; t.done_by = 'Oreoluwa'; });
  mockApi('createFinanceEntry', {project_id:pid, type:'Income', category:'Client payment', amount:1800000, description:'40% mobilisation payment', status:'Received', counterparty:'Sahel Analytics', entry_date:plus(-1)});
  mockApi('createFinanceEntry', {project_id:pid, type:'Expense', category:'Data & airtime', amount:120000, description:'Agent data bundles', status:'Planned', entry_date:plus(2)});
  DB.leave = [
    {leave_id:'lv1',team_member_name:'Sarah',type:'Annual leave',start_date:plus(10),end_date:plus(14),reason:'Family trip',status:'Pending',approved_by:'',created_at:new Date().toISOString(),unit:'days'},
    {leave_id:'lv2',team_member_name:'Tunde',type:'Sick leave',start_date:plus(-20),end_date:plus(-19),reason:'Flu',status:'Approved',approved_by:'Oreoluwa',created_at:new Date().toISOString(),unit:'days'},
    {leave_id:'lv3',team_member_name:'Chidi',type:'Personal / permission',start_date:plus(1),end_date:plus(1),reason:'Bank appointment',status:'Pending',approved_by:'',created_at:new Date().toISOString(),unit:'hours',start_time:'10:00',end_time:'12:30',hours:2.5}
  ];
  DB.timeOff = [{team_member_name:'Tunde',start_date:plus(-20),end_date:plus(-19)}];
  DB.leads.forEach(function(l){ if(l.owner===CURRENT_USER) l.next_follow_up_due = new Date(Date.now()-86400000).toISOString(); });
}

// ── wire-up: design install + boot hook ─────────────────────────────────
var __boot0 = boot;
boot = function(){ installDesign(); __boot0(); };
installDesign();

// ── fe7: team access helpers, Clients board, Marketing (content + results + monthly), Access check ──
['clients','contentMetrics'].forEach(function(k){ if(!DB[k]) DB[k] = []; });

function canEditMod(m){ var a = DB.access; return !a || a.priv || !a.levels || a.levels[m]==='edit'; }
function canManageClients(){ return canEditMod('clients_manage'); }
function canAddClients(){ return canEditMod('clients'); }
function canWriteMarketing(){ return canEditMod('content'); }
function noAccess(what){ return wcPage('<div class="empty">'+esc(what||'Your team does not have access to this page.')+' If you think that is a mistake, ask an Admin to check your team in the Employee Directory.</div>'); }

// ═══ CLIENTS ═══════════════════════════════════════════════════════════
var CLIENT_STATUS_TONE = {Onboarding:'warn', Active:'good', Paused:'mute', Past:'mute'};
function clientProjects(id){ return (DB.projects||[]).filter(function(p){ return p.client_id===id; }); }
function clientMoney(id){
  var ids = {}; clientProjects(id).forEach(function(p){ ids[p.project_id] = true; });
  var rec = 0, exp = 0;
  (DB.financeEntries||[]).forEach(function(e){ if(!ids[e.project_id] || (e.currency||'NGN')!=='NGN') return; var a = Number(e.amount)||0;
    if(e.type==='Income' && e.status==='Received') rec += a; if(e.type==='Expense' && e.status==='Paid') exp += a; });
  return {rec:rec, exp:exp};
}
function productPills(v){ return String(v||'').split(',').filter(Boolean).map(function(x){ return pill(x, x==='PMD'?'info':'good'); }).join(' ') || '<span class="wc-muted">—</span>'; }
function renderClients(){
  if(!canSee('clients')) return noAccess('The Client board is not available to your team.');
  var f = STATE.cl || (STATE.cl = {status:'All', product:'All', source:'All', q:''});
  var all = DB.clients||[];
  var list = all.filter(function(c){
    if(f.status!=='All' && c.status!==f.status) return false;
    if(f.product!=='All' && String(c.products||'').split(',').indexOf(f.product)===-1) return false;
    if(f.source!=='All' && c.source!==f.source) return false;
    if(f.q && [c.name,c.contact_name,c.email,c.sector,c.account_manager,c.acquired_by].join(' ').toLowerCase().indexOf(f.q.toLowerCase())===-1) return false;
    return true;
  }).sort(function(a,b){ return String(b.created_at).localeCompare(String(a.created_at)); });
  var haveLead = {}; all.forEach(function(c){ if(c.lead_id) haveLead[c.lead_id] = true; });
  var pending = (DB.leads||[]).filter(function(l){ return l.stage==='Onboarding' && !haveLead[l.lead_id]; }).length;
  var acts = (canAddClients() ? '<button class="btn btn-primary" onclick="openAddClient()">+ Add client</button>' : '')+(pending && canAddClients() ? '<button class="btn btn-ghost" onclick="syncClients()">Import '+pending+' from CRM</button>' : '');
  var h = wcHead('Clients', 'Prospects that reach <b>Onboarding</b> in the CRM land here automatically. You can also add clients who never went through acquisition.', acts);
  var cnt = function(s){ return all.filter(function(c){ return c.status===s; }).length; };
  h += '<div class="wc-grid g4 keep2" style="margin-bottom:16px">'+
    '<div class="card stat-card"><div class="stat-lbl">Clients</div><div class="stat-num">'+all.length+'</div><div class="stat-sub">'+all.filter(function(c){ return c.source==='CRM'; }).length+' from CRM · '+all.filter(function(c){ return c.source==='Direct'; }).length+' direct</div></div>'+
    '<div class="card stat-card"><div class="stat-lbl">Onboarding</div><div class="stat-num" style="color:var(--amber)">'+cnt('Onboarding')+'</div><div class="stat-sub">being set up</div></div>'+
    '<div class="card stat-card"><div class="stat-lbl">Active</div><div class="stat-num" style="color:var(--green)">'+cnt('Active')+'</div><div class="stat-sub">PMD '+all.filter(function(c){ return /PMD/.test(c.products||'') && c.status==='Active'; }).length+' · OTG '+all.filter(function(c){ return /OTG/.test(c.products||'') && c.status==='Active'; }).length+'</div></div>'+
    '<div class="card stat-card"><div class="stat-lbl">No account manager</div><div class="stat-num" style="color:'+(all.filter(function(c){ return !c.account_manager && c.status!=='Past'; }).length?'var(--red)':'inherit')+'">'+all.filter(function(c){ return !c.account_manager && c.status!=='Past'; }).length+'</div><div class="stat-sub">need an owner in Product &amp; Ops</div></div></div>';
  h += '<div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px"><input class="wc-input" style="max-width:240px" placeholder="Search clients…" value="'+esc(f.q)+'" oninput="setCl(\'q\',this.value)">'+
    '<select class="wc-sel" style="width:auto" onchange="setCl(\'status\',this.value)">'+optionsHtml(['All','Onboarding','Active','Paused','Past'], f.status)+'</select>'+
    '<select class="wc-sel" style="width:auto" onchange="setCl(\'product\',this.value)">'+optionsHtml([{value:'All',label:'All products'},'PMD','OTG'], f.product)+'</select>'+
    '<select class="wc-sel" style="width:auto" onchange="setCl(\'source\',this.value)">'+optionsHtml([{value:'All',label:'CRM + direct'},{value:'CRM',label:'From CRM'},{value:'Direct',label:'Added directly'}], f.source)+'</select></div>';
  var money_ = isAdminUser();
  h += '<div class="card" style="padding:4px 0"><div class="wc-scroll"><table class="wc-table"><thead><tr><th>Client</th><th>Product</th><th>Source</th><th>Account manager</th><th>Status</th><th>Projects</th>'+(money_?'<th style="text-align:right">Received</th>':'')+'</tr></thead><tbody>'+
    (list.length ? list.map(function(c){
      var ps = clientProjects(c.client_id), m = money_ ? clientMoney(c.client_id) : null;
      return '<tr style="cursor:pointer" onclick="openClient(\''+c.client_id+'\')"><td><b>'+esc(c.name)+'</b><div class="wc-muted">'+esc([c.contact_name,c.sector].filter(Boolean).join(' · '))+'</div></td><td>'+productPills(c.products)+'</td>'+
        '<td>'+pill(c.source==='CRM'?'From CRM':'Direct', c.source==='CRM'?'info':'mute')+(c.acquired_by?'<div class="wc-muted">won by '+esc(c.acquired_by)+'</div>':'')+'</td>'+
        '<td>'+(c.account_manager?esc(c.account_manager):pill('Unassigned','warn'))+'</td><td>'+pill(c.status, CLIENT_STATUS_TONE[c.status]||'mute')+'</td><td>'+(ps.length||'—')+'</td>'+(money_?'<td style="text-align:right">'+(m.rec?money(m.rec):'—')+'</td>':'')+'</tr>';
    }).join('') : '<tr><td colspan="'+(money_?7:6)+'"><div class="empty">No clients here yet.</div></td></tr>')+'</tbody></table></div></div>';
  return wcPage(h);
}
function setCl(k, v){ STATE.cl[k] = v; if(k==='q'){ var pos = document.activeElement && document.activeElement.selectionStart; render(); var i = document.querySelector('#content input.wc-input'); if(i){ i.focus(); try{ i.setSelectionRange(pos,pos); }catch(e){} } } else render(); }
function syncClients(){ api('syncClientsFromCrm', {actor:CURRENT_USER}).then(function(res){ if(!res.ok) return wcFail('Could not import', res); refreshData().then(function(){ wcToast(res.created+' client'+(res.created===1?'':'s')+' added from the CRM.'); }); }); }
function clientForm(c, ro){
  var dis = ro ? ' disabled' : '';
  return '<div class="wc-grid g2">'+fld('Client / organisation', inp('cl_name', c.name, 'text', '', dis))+fld('Sector', inp('cl_sector', c.sector, 'text', 'e.g. NGO, Fintech, FMCG', dis))+'</div>'+
    '<div class="wc-grid g3">'+fld('Contact person', inp('cl_contact', c.contact_name, 'text', '', dis))+fld('Email', inp('cl_email', c.email, 'email', '', dis))+fld('Phone', inp('cl_phone', c.phone, 'text', '', dis))+'</div>'+
    '<div class="wc-grid g3">'+fld('Country', inp('cl_country', c.country, 'text', '', dis))+fld('Account manager (Product & Ops)', sel('cl_mgr', teamNames(), c.account_manager||'', 'Unassigned', dis))+fld('Status', sel('cl_status', ['Onboarding','Active','Paused','Past'], c.status||'Onboarding', undefined, dis))+'</div>'+
    '<div class="wc-f"><label class="wc-lbl">Product</label><div id="cl_prod">'+chipList('cl_prod', ['PMD','OTG'], String(c.products||'').split(','))+'</div></div>'+
    fld('Client Slack channel ID (optional)', inp('cl_chan', c.slack_channel_id, 'text', 'C0123ABCD', dis))+fld('Notes', ta('cl_notes', c.notes, 'Contract context, preferences, key dates…', 3).replace('<textarea','<textarea'+dis));
}
function clientPayload(){ return {name:val('cl_name').trim(), sector:val('cl_sector'), contact_name:val('cl_contact'), email:val('cl_email'), phone:val('cl_phone'), country:val('cl_country'), account_manager:val('cl_mgr'), status:val('cl_status'), products:chipVals('cl_prod').join(','), slack_channel_id:val('cl_chan'), notes:val('cl_notes'), actor:CURRENT_USER}; }
function openAddClient(){
  wcModal('client', 'Add client', '<div class="wc-note" style="margin-bottom:12px">For clients that did not come through the CRM. Prospects that reach <b>Onboarding</b> are added automatically.</div>'+clientForm({status:'Onboarding'}, false)+
    '<div style="display:flex;gap:8px"><button class="btn btn-primary" id="cl_go" onclick="saveNewClient()">Add client</button><button class="btn btn-ghost" onclick="wcClose(\'client\')">Cancel</button></div>', true);
}
function saveNewClient(){
  var p = clientPayload(); if(!p.name) return wcToast('Give the client a name.', true);
  var b = document.getElementById('cl_go'); b.disabled = true;
  api('createClient', p).then(function(res){ b.disabled = false; if(!res.ok) return wcFail('Could not add client', res); wcClose('client'); refreshData().then(function(){ wcToast('Client added'+(p.account_manager?' · '+p.account_manager+' was told':'')+'.'); }); });
}
function openClient(id){
  var c = (DB.clients||[]).filter(function(x){ return x.client_id===id; })[0]; if(!c) return;
  var ro = !canManageClients(), ps = clientProjects(id), money_ = isAdminUser(), m = money_ ? clientMoney(id) : null;
  var lead = c.lead_id ? (DB.leads||[]).filter(function(l){ return l.lead_id===c.lead_id; })[0] : null;
  var h = '<div class="wc-muted" style="margin-bottom:12px">'+pill(c.source==='CRM'?'From CRM':'Added directly', c.source==='CRM'?'info':'mute')+' &nbsp;'+(c.acquired_by?'Won by <b>'+esc(c.acquired_by)+'</b> (Growth) · ':'')+'added '+esc(fmtDate(c.created_at))+
    (lead?' &nbsp;<a href="#" onclick="wcClose(\'client\');openLeadDetail(\''+lead.lead_id+'\');return false">Open CRM lead</a>':'')+'</div>'+clientForm(c, ro);
  h += '<div class="card-h" style="margin-top:6px">Projects'+(ps.length?' ('+ps.length+')':'')+'</div>'+
    (ps.length ? ps.map(function(p){ return '<div class="wc-row"><div style="flex:1"><b>'+esc(p.name)+'</b><div class="wc-muted">'+esc(p.kind)+' · '+esc(p.phase||p.status||'')+'</div></div>'+pill(p.status||'Active', p.status==='Completed'?'mute':'good')+'<button class="btn btn-ghost btn-sm" onclick="wcClose(\'client\');openProject(\''+p.project_id+'\')">Open</button></div>'; }).join('') : '<div class="wc-muted" style="margin-bottom:8px">No projects yet.</div>')+
    (canManageClients() ? '<div style="margin:8px 0 12px"><button class="btn btn-ghost btn-sm" onclick="wcClose(\'client\');openNewProject(\''+id+'\')">+ New project for this client</button></div>' : '');
  h += docsFor('client', id);
  if(money_) h += '<div class="wc-note" style="margin-bottom:12px">Income received across this client’s projects: <b>'+money(m.rec)+'</b> · expenses paid: <b>'+money(m.exp)+'</b> (NGN entries; per-project detail is in Finance).</div>';
  h += '<div style="display:flex;gap:8px;flex-wrap:wrap">'+(ro?'':'<button class="btn btn-primary" id="cl_go" onclick="saveClient(\''+id+'\')">Save</button>')+(isAdminUser() && !ps.length ? '<button class="btn btn-danger btn-sm" onclick="deleteClientClick(\''+id+'\')">Delete</button>' : '')+'<button class="btn btn-ghost" onclick="wcClose(\'client\')">Close</button></div>';
  wcModal('client', esc(c.name), h, true);
}
function saveClient(id){
  var p = clientPayload(); p.client_id = id; if(!p.name) return wcToast('A client needs a name.', true);
  var b = document.getElementById('cl_go'); b.disabled = true;
  api('updateClient', p).then(function(res){ b.disabled = false; if(!res.ok) return wcFail('Could not save', res); wcClose('client'); refreshData().then(function(){ wcToast('Client saved.'); }); });
}
function deleteClientClick(id){ if(!confirm('Delete this client? This cannot be undone.')) return; api('deleteClient', {client_id:id, actor:CURRENT_USER}).then(function(res){ if(!res.ok) return wcFail('Could not delete', res); wcClose('client'); refreshData(); }); }
function npClientPick(v){ var i = document.getElementById('np_client'); if(i) i.style.display = v ? 'none' : ''; }

// ═══ MARKETING ═════════════════════════════════════════════════════════
var MK_PLATFORMS = ['LinkedIn','Instagram','Facebook','Twitter/X'];
function mkState(){ return STATE.mk || (STATE.mk = {tab:'overview', days:30}); }
function mkItem(id){ return (DB.contentCalendar||[]).filter(function(c){ return c.content_id===id; })[0]; }
function mkNum(v){ return Number(v)||0; }
function fmtN(n){ return Number(n||0).toLocaleString('en-US'); }
// Numbers typed for a post are totals-to-date: the latest entry per post replaces earlier ones.
function mkSnapshots(from, to){
  var by = {};
  (DB.contentMetrics||[]).forEach(function(r){
    var d = String(r.recorded_on).slice(0,10); if(from && d<from) return; if(to && d>to) return;
    var k = r.content_id || ('acct:'+r.metric_id);
    if(!by[k] || d > String(by[k].recorded_on).slice(0,10) || (d===String(by[k].recorded_on).slice(0,10) && String(r.entered_at)>String(by[k].entered_at))) by[k] = r;
  });
  return Object.keys(by).map(function(k){ return by[k]; });
}
function daysAgo(n){ return new Date(Date.now()-n*86400000).toISOString().slice(0,10); }
function sumF(rows, f){ return rows.reduce(function(a,r){ return a + mkNum(r[f]); }, 0); }
function eng(rows){ return sumF(rows,'likes')+sumF(rows,'comments')+sumF(rows,'shares'); }
function deltaPill(cur, prev){ if(!prev) return ''; var d = Math.round((cur-prev)/prev*100); return '<span class="'+(d>=0?'good':'bad')+'" style="font-weight:600">'+(d>=0?'▲ ':'▼ ')+Math.abs(d)+'%</span> vs previous period'; }

function renderContent(){
  if(!canSee('content')) return noAccess('Marketing is not available to your team.');
  var mk = mkState();
  if(!STATE.mkEnsured && WORKSPACE_MODE && canWriteMarketing()){
    STATE.mkEnsured = true;
    api('ensureMarketingCycle', {actor:CURRENT_USER}).then(function(res){ if(res && res.ok && res.created) refreshData(); });
  }
  var acts = (canWriteMarketing() ? '<button class="btn btn-primary" onclick="openNewContent()">+ New content</button>' : '')+(isAdminUser() ? '<button class="btn btn-ghost" onclick="runContentPoolNowClick()">Run weekly pool now</button>' : '');
  var tabs = [['overview','Overview'],['board','Content board'],['results','Results'],['monthly','Monthly webinar & newsletter']];
  var h = wcHead('Marketing', 'LinkedIn · Instagram · Facebook · Twitter/X, plus the monthly newsletter and webinar. Claude proposes a fresh content pool every Friday morning.', acts);
  h += '<div class="wc-tabs">'+tabs.map(function(t){ return '<div class="wc-tab'+(mk.tab===t[0]?' on':'')+'" onclick="setMkTab(\''+t[0]+'\')">'+t[1]+'</div>'; }).join('')+'</div>';
  var w = wcPage(h);
  var body = document.createElement('div');
  if(mk.tab==='board'){ body.appendChild(renderBoardPage('content')); }
  else body.innerHTML = mk.tab==='results' ? mkResultsHtml() : mk.tab==='monthly' ? mkMonthlyHtml() : mkOverviewHtml();
  w.appendChild(body);
  return w;
}
function setMkTab(t){ mkState().tab = t; render(); }
function setMkDays(n){ mkState().days = Number(n); render(); }
function mkOverviewHtml(){
  var days = mkState().days, from = daysAgo(days), prevFrom = daysAgo(days*2), prevTo = daysAgo(days+1);
  var cur = mkSnapshots(from), prev = mkSnapshots(prevFrom, prevTo);
  var h = '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;flex-wrap:wrap;gap:8px"><div class="wc-muted">Totals use the latest numbers entered for each post in the period.</div><select class="wc-sel" style="width:auto" onchange="setMkDays(this.value)">'+optionsHtml([{value:7,label:'Last 7 days'},{value:30,label:'Last 30 days'},{value:90,label:'Last 90 days'}], days)+'</select></div>';
  var card = function(l, f, fn){ var c = fn?fn(cur):sumF(cur,f), p = fn?fn(prev):sumF(prev,f); return '<div class="card stat-card"><div class="stat-lbl">'+l+'</div><div class="stat-num">'+fmtN(c)+'</div><div class="stat-sub">'+(deltaPill(c,p)||'&nbsp;')+'</div></div>'; };
  h += '<div class="wc-grid g4 keep2" style="margin-bottom:16px">'+card('Impressions','impressions')+card('Engagements','',eng)+card('Link clicks','clicks')+card('Followers gained','followers_gained')+'</div>';
  // needs numbers
  var have = {}; (DB.contentMetrics||[]).forEach(function(r){ if(r.content_id) have[r.content_id] = true; });
  var need = (DB.contentCalendar||[]).filter(function(c){ return c.stage==='Published' && !have[c.content_id] && MK_PLATFORMS.concat(['Newsletter','Webinar']).indexOf(c.platform)>-1; });
  if(need.length) h += '<div class="card" style="padding:14px 18px;margin-bottom:16px"><div class="card-h">Needs numbers <span class="wc-muted" style="font-weight:400">published, nothing entered yet</span></div>'+
    need.slice(0,8).map(function(c){ return '<div class="wc-row"><div style="flex:1"><b>'+esc(c.title)+'</b><div class="wc-muted">'+esc(c.platform)+(c.scheduled_date?' · '+esc(fmtDate(c.scheduled_date)):'')+'</div></div>'+(canWriteMarketing()?'<button class="btn btn-primary btn-sm" onclick="mkEnter(\''+c.content_id+'\')">Enter numbers</button>':'')+'</div>'; }).join('')+(need.length>8?'<div class="wc-muted" style="margin-top:6px">+ '+(need.length-8)+' more</div>':'')+'</div>';
  // per platform
  var rows = MK_PLATFORMS.concat(['Newsletter','Webinar']).map(function(pl){
    var s = cur.filter(function(r){ return r.platform===pl; }), posts = s.filter(function(r){ return r.content_id; }).length;
    return {pl:pl, posts:posts, imp:sumF(s,'impressions'), eng:eng(s), clk:sumF(s,'clicks'), fol:sumF(s,'followers_gained'), reg:sumF(s,'registrations'), att:sumF(s,'attendees'), opn:sumF(s,'opens')};
  });
  h += '<div class="card" style="padding:4px 0;margin-bottom:16px"><div class="card-h" style="padding:14px 18px 4px">By platform</div><div class="wc-scroll"><table class="wc-table"><thead><tr><th>Platform</th><th style="text-align:right">Posts with numbers</th><th style="text-align:right">Impressions</th><th style="text-align:right">Engagements</th><th style="text-align:right">Clicks</th><th style="text-align:right">Followers +</th></tr></thead><tbody>'+
    rows.slice(0,4).map(function(r){ return '<tr><td><b>'+esc(r.pl)+'</b></td><td style="text-align:right">'+r.posts+'</td><td style="text-align:right">'+fmtN(r.imp)+'</td><td style="text-align:right">'+fmtN(r.eng)+'</td><td style="text-align:right">'+fmtN(r.clk)+'</td><td style="text-align:right">'+fmtN(r.fol)+'</td></tr>'; }).join('')+
    rows.slice(4).map(function(r){ return '<tr><td><b>'+esc(r.pl)+'</b></td><td style="text-align:right">'+r.posts+'</td><td colspan="4" class="wc-muted">'+(r.pl==='Newsletter'?fmtN(r.opn)+' opens · '+fmtN(r.clk)+' clicks':fmtN(r.reg)+' registrations · '+fmtN(r.att)+' attended')+'</td></tr>'; }).join('')+'</tbody></table></div></div>';
  // weekly trend
  var weeks = []; for(var i=7;i>=0;i--){ var a = daysAgo(i*7+6), b = daysAgo(i*7); weeks.push({a:a, b:b, v:sumF(mkSnapshots(a,b),'impressions')}); }
  var mx = Math.max.apply(null,[1].concat(weeks.map(function(w){ return w.v; })));
  h += '<div class="wc-grid g2" style="margin-bottom:16px"><div class="card" style="padding:16px 18px"><div class="card-h">Impressions by week</div><div style="display:flex;gap:8px;align-items:flex-end;height:120px">'+
    weeks.map(function(w){ return '<div style="flex:1;text-align:center" title="'+fmtN(w.v)+' · week ending '+w.b+'"><div style="background:var(--brand);border-radius:5px 5px 0 0;height:'+Math.max(2,Math.round(w.v/mx*96))+'px"></div><div class="wc-muted" style="font-size:10px;margin-top:4px">'+w.b.slice(5)+'</div></div>'; }).join('')+'</div></div>';
  var top = cur.filter(function(r){ return r.content_id; }).sort(function(a,b){ return mkNum(b.impressions)-mkNum(a.impressions); }).slice(0,5);
  h += '<div class="card" style="padding:16px 18px"><div class="card-h">Top posts</div>'+(top.length ? top.map(function(r,i){ var it = mkItem(r.content_id); return '<div class="wc-row"><span class="wc-muted" style="width:18px">'+(i+1)+'</span><div style="flex:1"><b>'+esc(it?it.title:'(removed)')+'</b><div class="wc-muted">'+esc(r.platform)+'</div></div><b>'+fmtN(r.impressions)+'</b></div>'; }).join('') : '<div class="wc-muted">Numbers appear here once the intern has entered some.</div>')+'</div></div>';
  return h;
}
function mkFieldSet(item){
  var monthly = item && (item.type==='Webinar' || item.type==='Newsletter');
  var f = [['impressions','Impressions'],['reach','Reach'],['likes','Likes / reactions'],['comments','Comments'],['shares','Shares / reposts'],['clicks','Link clicks'],['followers_gained','Followers gained']];
  if(item && item.type==='Webinar') f = [['registrations','Registrations'],['attendees','Attendees'],['clicks','Link clicks'],['comments','Questions / comments'],['followers_gained','Followers gained']];
  if(item && item.type==='Newsletter') f = [['opens','Opens'],['clicks','Link clicks'],['shares','Forwards / shares'],['followers_gained','New subscribers']];
  return f;
}
function mkResultsHtml(){
  var mk = mkState(), pre = mk.pre || '';
  var items = (DB.contentCalendar||[]).filter(function(c){ return MK_PLATFORMS.concat(['Newsletter','Webinar']).indexOf(c.platform)>-1 && (c.stage==='Published'||c.stage==='Scheduled'||c.cycle_key); }).sort(function(a,b){ return String(b.scheduled_date||b.created_at).localeCompare(String(a.scheduled_date||a.created_at)); });
  var h = '';
  if(canWriteMarketing()){
    var it = pre ? mkItem(pre) : null;
    h += '<div class="card" style="padding:16px 18px;margin-bottom:16px"><div class="card-h">Enter numbers</div><div class="wc-muted" style="margin-bottom:10px">Copy the figures from the platform’s analytics. Enter the <b>totals to date</b> — a later entry for the same post replaces the earlier one in the dashboard, so you can update a post after a day and again after a week.</div>'+
      '<div class="wc-grid g3">'+fld('Post', sel('mk_post', items.map(function(c){ return {value:c.content_id, label:c.title+' · '+c.platform}; }), pre, 'Account-level numbers (no post)', ' onchange="mkPostChanged()"'))+
      '<div id="mk_platwrap" style="'+(pre?'display:none':'')+'">'+fld('Platform', sel('mk_plat', MK_PLATFORMS, 'LinkedIn'))+'</div>'+fld('Numbers as of', inp('mk_date', today10(), 'date'))+'</div>'+
      '<div class="wc-grid g4 keep2" id="mk_fields">'+mkFieldSet(it).map(function(x){ return fld(x[1], inp('mk_'+x[0], '', 'text', '0', ' inputmode="numeric"')); }).join('')+'</div>'+
      fld('Note (optional)', inp('mk_note', '', 'text', 'e.g. boosted for 3 days'))+
      '<button class="btn btn-primary" id="mk_go" onclick="saveMetrics()">Save numbers</button></div>';
  }
  var log = (DB.contentMetrics||[]).slice().sort(function(a,b){ return String(b.recorded_on).localeCompare(String(a.recorded_on)) || String(b.entered_at).localeCompare(String(a.entered_at)); }).slice(0,60);
  h += '<div class="card" style="padding:4px 0"><div class="card-h" style="padding:14px 18px 4px">Entries</div><div class="wc-scroll"><table class="wc-table"><thead><tr><th>Date</th><th>Post</th><th>Platform</th><th style="text-align:right">Impr.</th><th style="text-align:right">Eng.</th><th style="text-align:right">Clicks</th><th>Other</th><th>By</th><th></th></tr></thead><tbody>'+
    (log.length ? log.map(function(r){ var it = r.content_id ? mkItem(r.content_id) : null;
      var other = [r.reach?fmtN(r.reach)+' reach':'', r.followers_gained?'+'+fmtN(r.followers_gained)+' followers':'', r.registrations?fmtN(r.registrations)+' reg.':'', r.attendees?fmtN(r.attendees)+' attended':'', r.opens?fmtN(r.opens)+' opens':''].filter(Boolean).join(' · ');
      return '<tr><td>'+esc(fmtDate(r.recorded_on))+'</td><td>'+(it?esc(it.title):'<i class="wc-muted">Account-level</i>')+'</td><td>'+esc(r.platform)+'</td><td style="text-align:right">'+(r.impressions!==''?fmtN(r.impressions):'—')+'</td><td style="text-align:right">'+((r.likes===''&&r.comments===''&&r.shares==='')?'—':fmtN(mkNum(r.likes)+mkNum(r.comments)+mkNum(r.shares)))+'</td><td style="text-align:right">'+(r.clicks!==''?fmtN(r.clicks):'—')+'</td><td class="wc-muted">'+esc(other)+'</td><td>'+esc(r.entered_by||'')+'</td><td>'+((r.entered_by===CURRENT_USER||isAdminUser())?'<button class="btn btn-ghost btn-sm" onclick="deleteMetric(\''+r.metric_id+'\')">Remove</button>':'')+'</td></tr>'; }).join('') : '<tr><td colspan="9"><div class="empty">No numbers entered yet.</div></td></tr>')+'</tbody></table></div></div>';
  return h;
}
function mkEnter(id){ var mk = mkState(); mk.tab = 'results'; mk.pre = id || ''; render(); var e = document.getElementById('mk_impressions') || document.getElementById('mk_opens') || document.getElementById('mk_registrations'); if(e) e.focus(); }
function mkPostChanged(){
  var id = val('mk_post'), it = id ? mkItem(id) : null, w = document.getElementById('mk_platwrap');
  if(w) w.style.display = id ? 'none' : '';
  var box = document.getElementById('mk_fields');
  if(box) box.innerHTML = mkFieldSet(it).map(function(x){ return fld(x[1], inp('mk_'+x[0], '', 'text', '0', ' inputmode="numeric"')); }).join('');
}
function saveMetrics(){
  var id = val('mk_post'), p = {content_id:id, platform:id?'':val('mk_plat'), recorded_on:val('mk_date'), note:val('mk_note'), actor:CURRENT_USER}, any = false;
  ['impressions','reach','likes','comments','shares','clicks','followers_gained','registrations','attendees','opens'].forEach(function(f){ var e = document.getElementById('mk_'+f); if(e && e.value!==''){ p[f] = e.value; any = true; } });
  if(!any) return wcToast('Enter at least one number.', true);
  var b = document.getElementById('mk_go'); b.disabled = true;
  api('recordContentMetrics', p).then(function(res){ b.disabled = false; if(!res.ok) return wcFail('Could not save', res); mkState().pre = ''; refreshData().then(function(){ wcToast('Numbers saved.'); }); });
}
function deleteMetric(id){ if(!confirm('Remove this entry?')) return; api('deleteContentMetric', {metric_id:id, actor:CURRENT_USER}).then(function(res){ if(!res.ok) return wcFail('Could not remove', res); refreshData(); }); }
function mkMonthlyHtml(){
  var items = (DB.contentCalendar||[]).filter(function(c){ return c.cycle_key; }).sort(function(a,b){ return String(b.scheduled_date).localeCompare(String(a.scheduled_date)); }).slice(0,8);
  var h = '<div class="wc-note" style="margin-bottom:14px">A <b>newsletter</b> (default first Tuesday) and a <b>webinar</b> (default third Thursday) are created every month with their checklist. Dates, and the owner, are set in Settings → Marketing.</div>';
  if(!items.length) return h+'<div class="empty">No monthly items yet. They are created automatically when this page is opened by the marketing team.</div>';
  h += '<div class="wc-grid g2">'+items.map(function(c){
    var list = parseJson(c.checklist_json, []), done = list.filter(function(x){ return x.done; }).length;
    var dl = c.scheduled_date ? Math.round((new Date(c.scheduled_date+'T12:00:00')-new Date())/86400000) : null;
    var rows = list.map(function(x,i){ return '<div class="wc-task'+(x.done?' done':'')+'"><span class="wc-check'+(x.done?' on':'')+(canWriteMarketing()?'':' lock')+'" onclick="'+(canWriteMarketing()?'mkTick(\''+c.content_id+'\','+i+','+(x.done?'false':'true')+')':'')+'">'+(x.done?'✓':'')+'</span><div style="flex:1">'+esc(x.text)+'</div></div>'; }).join('');
    return '<div class="card" style="padding:16px 18px"><div style="display:flex;gap:8px;align-items:center;margin-bottom:6px"><div style="flex:1"><b style="font-size:15px">'+esc(c.title)+'</b><div class="wc-muted">'+esc(c.type)+' · '+(c.scheduled_date?esc(fmtDate(c.scheduled_date)):'no date')+'</div></div>'+
      pill(c.stage==='Published'?'Done':(dl!==null&&dl<0?'Overdue':(dl!==null?'in '+dl+' day'+(dl===1?'':'s'):'')), c.stage==='Published'?'good':(dl!==null&&dl<0?'bad':'info'))+'</div>'+
      '<div class="wc-muted" style="margin-bottom:8px">'+done+' of '+list.length+' steps done · owner: '+(c.owner?esc(c.owner):'unassigned')+'</div>'+rows+
      '<div style="margin-top:10px;display:flex;gap:8px">'+(canWriteMarketing()?'<button class="btn btn-ghost btn-sm" onclick="mkEnter(\''+c.content_id+'\')">Enter results</button>':'')+'</div></div>';
  }).join('')+'</div>';
  return h;
}
function mkTick(id, i, done){ api('updateContentChecklist', {content_id:id, index:i, done:done, actor:CURRENT_USER}).then(function(res){ if(!res.ok) return wcFail('Could not update', res); refreshData(); }); }


// ═══ CC PICKER (discovery calls and demos) ═════════════════════════════
function ccPickerHtml(scope, selected){
  selected = selected || [];
  var names = teamNames().filter(function(n){ return n!==CURRENT_USER; });
  return '<div id="cc_'+scope+'" style="max-height:110px;overflow:auto">'+names.map(function(n){ return '<span class="wc-chip cc-chip'+(selected.indexOf(n)>-1?' on':'')+'" data-n="'+esc(n)+'" onclick="ccToggle(this,\''+scope+'\')">'+esc(n)+'</span>'; }).join('')+'</div>'+ccEmailBox(scope, scope==='intake'?INTAKE.ccx:'');
}
function ccEmailBox(scope, val){ return '<input class="wc-input" id="ccx_'+scope+'" style="margin-top:6px" placeholder="Any other emails to CC (comma separated) — anyone, not only the team" value="'+esc(val||'')+'"'+(scope==='intake'?' oninput="INTAKE.ccx=this.value"':'')+'>'; }
function ccEmailsVal(scope){ var e = document.getElementById('ccx_'+scope); return e ? e.value : ''; }
function ccPicked(scope){ var box = document.getElementById('cc_'+scope); if(!box) return []; return Array.prototype.map.call(box.querySelectorAll('.cc-chip.on'), function(e){ return e.getAttribute('data-n'); }); }
function ccToggle(el, scope){ el.classList.toggle('on'); if(scope==='intake') INTAKE.cc = ccPicked('intake'); }

// ═══ TEAM ACCESS (Settings, Admin only) ════════════════════════════════
var AX_LEVELS = {none:'No access', view:'View only', edit:'View & edit'};
function accessMatrixHtml(s){
  var ax = s.access; if(!ax) return '';
  var rows = Object.keys(ax.labels.modules), simple = {projects_all:['none','view'], clients_manage:['none','edit']};
  var h = '<div class="card" style="padding:18px 20px;margin-bottom:16px"><div class="card-h">Team access <span><button class="btn btn-ghost btn-sm" onclick="resetAccessMatrix()">Reset to defaults</button> <button class="btn btn-primary btn-sm" onclick="saveAccessMatrix()">Save access</button></span></div>'+
    '<div class="wc-muted" style="margin-bottom:10px">Choose what each team can open and change. Admin has everything; Leadership has everything except core settings. Payroll, finance, salaries and the Employee Directory always stay Admin and Leadership only. Changes apply the next time each person loads the app.</div>'+
    '<div class="wc-scroll"><table class="wc-table"><thead><tr><th>Area</th>'+ax.teams.map(function(t){ return '<th>'+esc(ax.labels.teams[t])+'</th>'; }).join('')+'</tr></thead><tbody>'+
    rows.map(function(m){ var lv = simple[m] || ['none','view','edit'];
      return '<tr><td><b>'+esc(ax.labels.modules[m])+'</b></td>'+ax.teams.map(function(t){
        return '<td><select class="wc-sel ax" data-m="'+m+'" data-t="'+t+'">'+lv.map(function(l){ var lab = simple[m] ? (l==='none'?'No':(m==='clients_manage'?'Yes':'Yes')) : AX_LEVELS[l]; return '<option value="'+l+'"'+(ax.matrix[m][t]===l?' selected':'')+'>'+lab+'</option>'; }).join('')+'</select></td>'; }).join('')+'</tr>'; }).join('')+'</tbody></table></div>'+
    '<div class="wc-help" style="margin-top:8px">Marketing contributors (flagged in the Employee Directory) use the Marketing column. Press <b>Run access check</b> below afterwards to see the result per person.</div></div>';
  return h;
}
function saveAccessMatrix(){
  var m = {}; document.querySelectorAll('select.ax').forEach(function(e){ var k = e.getAttribute('data-m'); (m[k] = m[k] || {})[e.getAttribute('data-t')] = e.value; });
  api('saveSettings', {values:{access_matrix:JSON.stringify(m)}, actor:CURRENT_USER}).then(function(res){ if(!res.ok) return wcFail('Could not save access', res); wcToast('Access saved.'); refreshData(false); });
}
function resetAccessMatrix(){
  if(!confirm('Reset every team to the default access?')) return;
  api('saveSettings', {values:{access_matrix:''}, actor:CURRENT_USER}).then(function(res){ if(!res.ok) return wcFail('Could not reset', res); wcToast('Defaults restored.'); renderSettingsRefresh(); });
}

// ═══ SPEED CHECK (Settings) ════════════════════════════════════════════
var SPEED = null, SPEED_T0 = 0;
(function(){
  var _refresh = refreshData, _apply = applyAll;
  refreshData = function(thenRender){ SPEED_T0 = Date.now(); return _refresh(thenRender); };
  applyAll = function(d){ if(d && d.perf) SPEED = {client_ms: SPEED_T0 ? Date.now()-SPEED_T0 : 0, server_ms: d.perf.server_ms, tabs: d.perf.tabs}; return _apply(d); };
})();
function speedHtml(){
  var h = '<div class="card" style="padding:18px 20px;margin-bottom:16px"><div class="card-h">Speed check <button class="btn btn-ghost btn-sm" onclick="refreshData(false,true).then(function(){ renderSettingsRefresh(); })">Measure a fresh load</button></div>';
  if(!SPEED) return h+'<div class="wc-muted">Press “Measure a fresh load” to see how long loading the whole app takes and which sheet tabs are slowest.</div></div>';
  var names = Object.keys(SPEED.tabs).sort(function(a,b){ return SPEED.tabs[b].ms-SPEED.tabs[a].ms; });
  var tot = SPEED.client_ms, srv = SPEED.server_ms;
  h += '<div class="wc-grid g2" style="margin-bottom:10px"><div><div class="wc-muted">Whole load, as you feel it</div><b style="font-size:20px">'+(tot/1000).toFixed(1)+' s</b></div><div><div class="wc-muted">Of which spent reading the spreadsheet</div><b style="font-size:20px">'+(srv/1000).toFixed(1)+' s</b>'+(tot?' <span class="wc-muted">('+Math.round(srv/tot*100)+'%)</span>':'')+'</div></div>'+
    '<div class="wc-scroll"><table class="wc-table"><thead><tr><th>Tab</th><th>Rows</th><th>Read time</th></tr></thead><tbody>'+names.slice(0,8).map(function(n){ var t = SPEED.tabs[n]; return '<tr><td>'+esc(n)+'</td><td>'+t.rows+'</td><td>'+t.ms+' ms</td></tr>'; }).join('')+'</tbody></table></div>'+
    '<div class="wc-help" style="margin-top:8px">Normal loads reuse each tab for up to a minute (a save refreshes only the tab it changed), so the app no longer re-reads the whole spreadsheet after every click; this button forces a full re-read. If the spreadsheet share is small and the whole load is still slow, the delay is Google starting the script (a cold start) rather than your data.</div>';
  return h+'</div>';
}

// ═══ ACCESS CHECK (Settings) ═══════════════════════════════════════════
function accessCheckHtml(){
  return '<div class="card" style="padding:18px 20px;margin-bottom:16px"><div class="card-h">Who can see what <button class="btn btn-ghost btn-sm" onclick="runAccessCheck()">Run access check</button></div>'+
    '<div class="wc-muted">Admin: everything. Leadership: everything except these core settings. Growth: CRM and clients. Product &amp; Operations: projects, clients and UAT. Engineering: tickets, UAT and clients. Marketing contributors: the Marketing page only. Payroll, finance and salaries are visible to Admin and Leadership only — enforced on the server.</div><div id="acOut" style="margin-top:10px"></div></div>';
}
function runAccessCheck(){
  var o = document.getElementById('acOut'); o.innerHTML = '<span class="wc-muted">Checking…</span>';
  api('accessReport', {}).then(function(res){
    if(!res.ok){ o.innerHTML = '<div class="wc-note bad">'+esc(res.error||'Failed')+'</div>'; return; }
    var h = res.warnings.length ? '<div class="wc-note warn" style="margin-bottom:10px"><b>Fix these:</b><br>'+res.warnings.map(esc).join('<br>')+'</div>' : '<div class="wc-note good" style="margin-bottom:10px">Every person’s department matches a team.</div>';
    h += '<div class="wc-scroll"><table class="wc-table"><thead><tr><th>Person</th><th>Team</th><th>Level</th><th>Money &amp; payroll</th><th>Pages hidden from them</th></tr></thead><tbody>'+res.members.map(function(m){
      return '<tr><td><b>'+esc(m.name)+'</b><div class="wc-muted">'+esc(m.department||'no department')+(m.marketing?' · marketing contributor':'')+'</div></td><td>'+esc(m.team)+'</td><td>'+esc(m.level)+'</td><td>'+(m.sees_money?pill('Can see','warn'):pill('Hidden','good'))+'</td><td class="wc-muted">'+(m.hidden_pages.length?esc(m.hidden_pages.join(', ')):'none')+'</td></tr>'; }).join('')+'</tbody></table></div>';
    o.innerHTML = h;
  });
}


// ═══ LEGACY CRM IMPORT (Settings) ══════════════════════════════════════
var LEGACY_PREVIEW = null;
function legacyImportHtml(){
  return '<div class="card" style="padding:18px 20px;margin-bottom:16px"><div class="card-h">Import old CRM data <button class="btn btn-ghost btn-sm" onclick="previewLegacy()">Preview import</button></div>'+
    '<div class="wc-muted">Paste your old CRM table (header row included) into a tab named <b>Legacy CRM</b> in this spreadsheet, then press Preview. Nothing is written until you press Import, and importing twice never duplicates a prospect.</div><div id="lgOut" style="margin-top:10px"></div></div>';
}
function previewLegacy(){
  var o = document.getElementById('lgOut'); o.innerHTML = '<span class="wc-muted">Reading the Legacy CRM tab…</span>';
  api('previewLegacyCrm', {}).then(function(res){
    if(!res.ok){ o.innerHTML = '<div class="wc-note bad">'+esc(res.error||'Failed')+'</div>'; return; }
    LEGACY_PREVIEW = res;
    var h = '<div class="wc-grid g2" style="margin-bottom:10px"><div><b>'+res.total+'</b> prospects found'+(res.already_imported?' · <b>'+res.already_imported+'</b> already imported (will be skipped)':'')+'</div><div class="wc-muted">'+res.with_notes+' with notes · '+res.with_files+' file links · '+res.open_next_steps+' open next steps'+(res.unreadable_dates?' · '+res.unreadable_dates+' unreadable dates (will use today)':'')+'</div></div>';
    h += '<div class="wc-lbl">Old stage → new stage</div>'+Object.keys(res.stages).map(function(k){ var st = res.stages[k];
      return '<div class="wc-row"><span style="flex:1">'+esc(k)+' <span class="wc-muted">('+st.count+')</span></span><select class="wc-sel lg-stage" data-k="'+esc(k)+'">'+optionsHtml(res.crm_stages, st.suggested, 'Choose…')+'</select></div>'; }).join('');
    h += '<div class="wc-lbl" style="margin-top:12px">Owners</div>'+Object.keys(res.owners).map(function(k){ var ow = res.owners[k];
      return '<div class="wc-row"><span style="flex:1">'+esc(k)+' <span class="wc-muted">('+ow.count+')</span></span>'+(ow.matched?pill('matches '+ow.matched,'good'):pill('no match → default owner','warn'))+'</div>'; }).join('');
    h += '<div style="display:flex;gap:10px;flex-wrap:wrap;align-items:center;margin-top:12px"><span class="wc-muted">Default owner</span><select class="wc-sel" id="lg_owner">'+optionsHtml(res.team, '', 'Leave unassigned')+'</select>'+
      '<label style="display:flex;gap:6px;align-items:center"><input type="checkbox" id="lg_clients" checked> Create clients for Onboarding prospects</label>'+
      '<button class="btn btn-primary btn-sm" onclick="runLegacyImport()">Import '+(res.total-res.already_imported)+' prospects</button></div>';
    o.innerHTML = h;
  });
}
function runLegacyImport(){
  var map = {}; document.querySelectorAll('.lg-stage').forEach(function(s){ if(s.value) map[s.getAttribute('data-k')] = s.value; });
  var o = document.getElementById('lgOut'), blank = 0;
  document.querySelectorAll('.lg-stage').forEach(function(x){ x.style.outline = x.value ? '' : '2px solid #e5484d'; if(!x.value) blank++; });
  if(blank) return wcToast('Choose a new stage for the '+blank+' stage(s) outlined in red, then press Import.', true);
  api('importLegacyCrm', {stage_map:map, default_owner:val('lg_owner'), create_clients:!!(document.getElementById('lg_clients')||{}).checked, actor:CURRENT_USER}).then(function(res){
    if(!res.ok) return wcFail('Could not import', res);
    refreshData(false);
    o.innerHTML = '<div class="wc-note good"><b>Imported '+res.imported+' prospects.</b>'+(res.skipped_already_imported?' '+res.skipped_already_imported+' were already there.':'')+(res.clients_created?' '+res.clients_created+' client(s) created.':'')+(res.without_owner?' '+res.without_owner+' have no owner — reassign them from the CRM board.':'')+'</div>';
    wcToast('Imported '+res.imported+' prospects.');
  });
}

// ═══ OFFLINE PREVIEW SUPPORT ═══════════════════════════════════════════
(function(){
  if(WORKSPACE_MODE) return;
  function ok(o){ return Object.assign({ok:true}, o||{}); }
  function err(m){ return {ok:false, error:m}; }
  function id(p){ return p+Math.random().toString(36).slice(2,9); }
  function ymd(n){ return new Date(Date.now()+n*86400000).toISOString().slice(0,10); }
  var cleanP = function(v){ var a = Array.isArray(v)?v:String(v||'').split(','), o = []; a.forEach(function(x){ x = String(x).trim().toUpperCase(); if((x==='PMD'||x==='OTG') && o.indexOf(x)===-1) o.push(x); }); return o.join(','); };
  function mkClient(p){ var c = {client_id:id('cl'), name:p.name, sector:p.sector||'', contact_name:p.contact_name||'', email:p.email||'', phone:p.phone||'', country:p.country||'', products:cleanP(p.products), source:p.lead_id?'CRM':'Direct', lead_id:p.lead_id||'', acquired_by:p.acquired_by||CURRENT_USER, account_manager:p.account_manager||'', status:p.status||'Onboarding', notes:p.notes||'', slack_channel_id:'', created_at:new Date().toISOString(), created_by:CURRENT_USER, updated_at:new Date().toISOString()}; DB.clients.push(c); return c; }
  function monthlyItems(){
    var made = [], today = new Date(), steps = {Newsletter:['Choose topics and stories to feature','Draft the newsletter','Design and proofread','Review and approval','Send to subscribers and the newsletter-nurture list','Enter opens and clicks in Results'], Webinar:['Confirm topic and speaker','Create the registration page','Promote on LinkedIn, Instagram, Facebook and X','Dry run and tech check','Run the webinar and record it','Send the recording and a thank-you follow-up','Enter registrations and attendance in Results']};
    [0,1].forEach(function(off){ var y = today.getFullYear(), m = today.getMonth()+off; ['Newsletter','Webinar'].forEach(function(k){
      var key = k.toLowerCase()+'-'+new Date(Date.UTC(y,m,1)).toISOString().slice(0,7); if(DB.contentCalendar.some(function(c){ return c.cycle_key===key; })) return;
      var wd = k==='Newsletter'?2:4, nth = k==='Newsletter'?1:3, d = new Date(Date.UTC(y,m,1)); d = new Date(Date.UTC(y,m,1+((wd-d.getUTCDay()+7)%7)+(nth-1)*7));
      var it = {content_id:id('c'), title:d.toLocaleString('en-US',{month:'long',year:'numeric',timeZone:'UTC'})+' '+k, type:k, platform:k, stage:'Drafting', owner:'', notes:'', scheduled_date:d.toISOString().slice(0,10), created_at:new Date().toISOString(), source:'Monthly cycle', cycle_key:key, checklist_json:JSON.stringify(steps[k].map(function(t){ return {text:t, done:false}; }))};
      DB.contentCalendar.push(it); made.push(it); }); });
    return made;
  }
  var API3 = {
    createClient: function(p){ if(!String(p.name||'').trim()) return err('Give the client a name.'); var d = DB.clients.filter(function(c){ return c.name.toLowerCase()===String(p.name).trim().toLowerCase() || (p.lead_id && c.lead_id===p.lead_id); })[0]; if(d) return p.lead_id ? ok({created:false, client:d}) : {ok:false, error:'A client called "'+d.name+'" already exists.', client:d}; return ok({created:true, client:mkClient(p)}); },
    updateClient: function(p){ var c = DB.clients.filter(function(x){ return x.client_id===p.client_id; })[0]; if(!c) return err('Client not found.'); ['name','sector','contact_name','email','phone','country','status','notes','slack_channel_id','account_manager','acquired_by'].forEach(function(k){ if(p.hasOwnProperty(k)) c[k] = p[k]; }); if(p.hasOwnProperty('products')) c.products = cleanP(p.products); DB.projects.forEach(function(x){ if(x.client_id===c.client_id) x.client_name = c.name; }); return ok(); },
    deleteClient: function(p){ if(DB.projects.some(function(x){ return x.client_id===p.client_id; })) return err('This client has projects. Set the client to Past instead of deleting it.'); DB.clients = DB.clients.filter(function(c){ return c.client_id!==p.client_id; }); return ok(); },
    syncClientsFromCrm: function(){ var n = 0; DB.leads.filter(function(l){ return l.stage==='Onboarding' && !DB.clients.some(function(c){ return c.lead_id===l.lead_id; }); }).forEach(function(l){ mkClient({lead_id:l.lead_id, name:l.organization||l.name, contact_name:l.name, email:l.email, phone:l.phone, acquired_by:l.owner}); n++; }); return ok({created:n}); },
    recordContentMetrics: function(p){ var it = p.content_id ? DB.contentCalendar.filter(function(c){ return c.content_id===p.content_id; })[0] : null; var plat = (it&&it.platform)||p.platform; if(!plat) return err('Choose the platform these numbers are from.'); var r = {metric_id:id('m'), content_id:p.content_id||'', platform:plat, recorded_on:p.recorded_on||ymd(0), note:p.note||'', entered_by:CURRENT_USER, entered_at:new Date().toISOString()}, any = false, bad = false;
      ['impressions','reach','likes','comments','shares','clicks','followers_gained','registrations','attendees','opens'].forEach(function(f){ var v = p[f]; if(v===undefined||v===''||v===null){ r[f] = ''; return; } var n = Number(String(v).replace(/,/g,'')); if(isNaN(n)||n<0){ bad = f; return; } r[f] = n; any = true; });
      if(bad) return err('Enter '+bad+' as a number (0 or more).'); if(!any) return err('Enter at least one number.'); DB.contentMetrics.push(r); return ok({metric:r}); },
    deleteContentMetric: function(p){ DB.contentMetrics = DB.contentMetrics.filter(function(m){ return m.metric_id!==p.metric_id; }); return ok(); },
    updateContentChecklist: function(p){ var c = DB.contentCalendar.filter(function(x){ return x.content_id===p.content_id; })[0]; if(!c) return err('Content item not found.'); var l = parseJson(c.checklist_json, []); if(!l[p.index]) return err('Checklist step not found.'); l[p.index].done = !!p.done; c.checklist_json = JSON.stringify(l); if(l.every(function(x){ return x.done; })) c.stage = 'Published'; else if(c.stage==='Published' && c.cycle_key) c.stage = 'Drafting'; return ok({checklist:l, stage:c.stage}); },
    ensureMarketingCycle: function(){ var m = monthlyItems(); return ok({created:m.length}); },
    accessReport: function(){ return ok({members:DB.team.map(function(p){ var admin = p.role==='Admin'; return {name:p.name, role:p.role||'Staff', department:p.department||'', team:p.department||'(no team)', marketing:false, level:admin?'Admin (everything)':(p.role==='Leadership'?'Leadership (everything except core settings)':'Team access'), hidden_pages:admin?[]:['payroll','finance','employees','settings'], sees_money:admin||p.role==='Leadership', warning:''}; }), warnings:[], rules:{}}); }
  };
  var prev = mockApi;
  mockApi = function(action, payload){
    if(API3[action]) return API3[action](payload||{});
    if(action==='createProject' && payload && payload.client_id){ var c = DB.clients.filter(function(x){ return x.client_id===payload.client_id; })[0]; if(c){ payload = Object.assign({}, payload, {client_name:c.name}); } }
    var res = prev(action, payload);
    if(action==='createProject' && res && res.ok && payload && payload.client_id && res.project){ res.project.client_id = payload.client_id; }
    if(action==='updateLeadStage' && res && res.ok && payload && payload.stage==='Onboarding'){ var l = DB.leads.filter(function(x){ return x.lead_id===payload.lead_id; })[0]; if(l && !DB.clients.some(function(c){ return c.lead_id===l.lead_id; })) mkClient({lead_id:l.lead_id, name:l.organization||l.name, contact_name:l.name, email:l.email, phone:l.phone, acquired_by:l.owner}); }
    return res;
  };
  // preview data
  mkClient({name:'Sahel Analytics', sector:'Research', contact_name:'Aisha Bello', email:'aisha@sahel.example', products:'PMD', account_manager:'Chidi', status:'Active', acquired_by:'Oreoluwa', lead_id:'seedlead1'});
  mkClient({name:'Hope Foundation', sector:'NGO', contact_name:'Dr. Obi', email:'obi@hope.example', products:'OTG,PMD', status:'Onboarding', acquired_by:'Sarah', lead_id:'seedlead2'});
  var d = mkClient({name:'Kola Agro (direct)', sector:'Agri', contact_name:'Kola A.', products:'OTG', account_manager:'Sarah', status:'Active'}); d.source = 'Direct'; d.lead_id = ''; d.acquired_by = '';
  DB.projects.forEach(function(p){ if(p.kind==='Client' && p.client_name==='Sahel Analytics') p.client_id = DB.clients[0].client_id; });
  monthlyItems();
  var posts = [['LinkedIn','Why field data needs GPS proof',-12,5400,210,48,31],['Instagram','Meet our agents in Lagos',-9,3100,320,22,64],['Facebook','Hiring: field agents',-6,2200,95,60,12],['Twitter/X','World Statistics Day thread',-3,1800,70,9,8]];
  posts.forEach(function(x){ var c = {content_id:id('c'), title:x[1], type:'Post', platform:x[0], stage:'Published', owner:'Sarah', notes:'', scheduled_date:ymd(x[2]), created_at:new Date().toISOString(), source:'Manual'}; DB.contentCalendar.push(c);
    DB.contentMetrics.push({metric_id:id('m'), content_id:c.content_id, platform:x[0], recorded_on:ymd(x[2]+7>0?-1:x[2]+7), impressions:x[3], reach:Math.round(x[3]*0.7), likes:x[4], comments:Math.round(x[4]/8), shares:Math.round(x[4]/10), clicks:x[5], followers_gained:x[6], registrations:'', attendees:'', opens:'', note:'', entered_by:'Tunde', entered_at:new Date().toISOString()}); });
  DB.contentCalendar.push({content_id:id('c'), title:'Case study: Lagos survey', type:'Post', platform:'LinkedIn', stage:'Published', owner:'Sarah', notes:'', scheduled_date:ymd(-1), created_at:new Date().toISOString(), source:'Manual'});
})();

// ── fe8: Documents (invoices, quotes, briefs, proposals) ──
if(!DB.documents) DB.documents = [];
var DOC_TYPES = ['Invoice','Quote','Brief','Proposal','Contract','Receipt','Other'];
var DOC_STATUSES = ['Draft','Sent','Paid','Void'];
var DOC_MONEY = ['Invoice','Quote','Receipt'];
function docState(){ return STATE.dc || (STATE.dc = {type:'', status:'', q:''}); }
function docTone(s){ return s==='Paid'?'good':(s==='Sent'?'info':(s==='Void'?'bad':'mute')); }
function docRow(d, withClient){
  var priv = isAdminUser();
  return '<tr><td style="white-space:nowrap"><b>'+esc(d.number||'—')+'</b></td><td>'+pill(d.type,'mute')+'</td><td style="min-width:200px">'+(d.drive_url && safeUrl(d.drive_url)?'<a href="'+esc(safeUrl(d.drive_url))+'" target="_blank" rel="noopener" style="color:var(--brand);font-weight:600">'+esc(d.title||d.file_name||'Open')+'</a>':esc(d.title||'(no file yet)')+(d.drive_file_id?'':' <span class="wc-muted">· number reserved, no file</span>'))+'</td>'+
    (withClient?'<td>'+esc(d.client_name||'—')+(d.project_name?'<div class="wc-muted">'+esc(d.project_name)+'</div>':'')+'</td>':'')+
    '<td style="white-space:nowrap">'+(d.amount!==''&&d.amount!==undefined&&d.amount!==null&&priv?money(d.amount, d.currency):'—')+'</td><td>'+(priv||DOC_MONEY.indexOf(d.type)===-1?'<select class="wc-sel" style="padding:4px 6px;width:92px" onchange="setDocStatus(\''+d.doc_id+'\',this.value)">'+optionsHtml(DOC_STATUSES, d.status)+'</select>':pill(d.status,docTone(d.status)))+'</td>'+
    '<td class="wc-muted" style="white-space:nowrap">'+esc(fmtDate(d.created_at))+'</td><td style="white-space:nowrap"><button class="btn btn-ghost btn-sm" onclick="openDocDetail(\''+d.doc_id+'\')">Details</button></td></tr>';
}
function renderDocuments(){
  var f = docState(), priv = isAdminUser(), canEdit = canEditMod('documents');
  var list = (DB.documents||[]).filter(function(d){
    if(f.type && d.type!==f.type) return false; if(f.status && d.status!==f.status) return false;
    if(f.q && [d.number,d.title,d.client_name,d.project_name,d.file_name].join(' ').toLowerCase().indexOf(f.q.toLowerCase())===-1) return false; return true;
  }).sort(function(a,b){ return String(b.created_at).localeCompare(String(a.created_at)); });
  var acts = (canEdit?'<button class="btn btn-primary" onclick="openGenerator()">✨ Generate document</button><button class="btn btn-ghost" onclick="openUploadDoc()">+ Upload document</button>':'')+(priv?'<button class="btn btn-ghost" onclick="reserveInvoiceClick()">Reserve invoice number</button>':'');
  var h = wcHead('Documents', 'Invoices, quotes, briefs and proposals — numbered, stored in Drive and attached to a client or project.', acts);
  var all = DB.documents||[], unpaid = all.filter(function(d){ return d.type==='Invoice' && (d.status==='Sent'||d.status==='Draft') && d.drive_file_id; }).length;
  h += '<div class="wc-grid g4 keep2" style="margin-bottom:14px"><div class="card stat-card"><div class="stat-lbl">Documents</div><div class="stat-num">'+all.length+'</div></div>'+
    (priv?'<div class="card stat-card"><div class="stat-lbl">Invoices not yet paid</div><div class="stat-num" style="color:var(--amber)">'+unpaid+'</div></div>':'')+
    '<div class="card stat-card"><div class="stat-lbl">Briefs &amp; proposals</div><div class="stat-num">'+all.filter(function(d){ return d.type==='Brief'||d.type==='Proposal'; }).length+'</div></div></div>';
  h += '<div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px"><input class="wc-input" style="width:220px" placeholder="Search number, client, title…" value="'+esc(f.q)+'" onchange="docState().q=this.value;render()">'+
    '<select class="wc-sel" style="width:auto" onchange="docState().type=this.value;render()"><option value="">All types</option>'+DOC_TYPES.map(function(t){ return '<option'+(f.type===t?' selected':'')+'>'+t+'</option>'; }).join('')+'</select>'+
    '<select class="wc-sel" style="width:auto" onchange="docState().status=this.value;render()"><option value="">All statuses</option>'+DOC_STATUSES.map(function(t){ return '<option'+(f.status===t?' selected':'')+'>'+t+'</option>'; }).join('')+'</select></div>';
  h += '<div class="card wc-scroll" style="padding:0"><table class="wc-table"><thead><tr><th>Number</th><th>Type</th><th>Document</th><th>Client / project</th><th>Amount</th><th>Status</th><th>Created</th><th></th></tr></thead><tbody>'+
    (list.map(function(d){ return docRow(d, true); }).join('') || '<tr><td colspan="8" class="empty">'+(all.length?'Nothing matches these filters.':'No documents yet. Generate one, or upload an existing file.')+'</td></tr>')+'</tbody></table></div>';
  if(!priv) h += '<div class="wc-note" style="margin-top:12px">Invoices, quotes and receipts are visible to Admin and Leadership only.</div>';
  return wcPage(h);
}
function setDocStatus(id, st){ api('updateDocument', {doc_id:id, status:st, actor:CURRENT_USER}).then(function(res){ if(!res.ok) return wcFail('Could not update', res); refreshData(false); wcToast('Marked '+st+'.'); }); }
function reserveInvoiceClick(){
  api('reserveInvoiceNumber', {actor:CURRENT_USER}).then(function(res){
    if(!res.ok) return wcFail('Could not reserve', res);
    refreshData().then(function(){ wcModal('resnum','Invoice number reserved','<div style="text-align:center;padding:10px 0"><div class="disp" style="font-size:34px;font-weight:700">'+esc(res.number)+'</div><div class="wc-muted" style="margin:8px 0 14px">Use this number on the invoice. It will not be given to anyone else.</div><button class="btn btn-primary" onclick="wcClose(\'resnum\')">Done</button></div>'); });
  });
}
var DOC_FILE = null;
function docClientOpts(){ return [{value:'',label:'No client'}].concat((DB.clients||[]).map(function(c){ return {value:c.client_id, label:c.name}; })); }
function docProjectOpts(){ return [{value:'',label:'No project'}].concat((DB.projects||[]).map(function(p){ return {value:p.project_id, label:p.name}; })); }
function openUploadDoc(pre){
  pre = pre || {}; DOC_FILE = null;
  var types = isAdminUser() ? DOC_TYPES : DOC_TYPES.filter(function(t){ return DOC_MONEY.indexOf(t)===-1; });
  var h = '<div class="wc-grid g2">'+fld('Type', sel('ud_type', types, pre.type||types[0]))+fld('Title', inp('ud_title','', 'text', 'e.g. Retail audit — Zuri'))+'</div>'+
    '<div class="wc-grid g2">'+fld('Client', sel('ud_client', docClientOpts(), pre.client_id||''))+fld('Project', sel('ud_project', docProjectOpts(), pre.project_id||''))+'</div>'+
    (isAdminUser()?'<div class="wc-grid g3">'+fld('Number', inp('ud_number','', 'text', 'WC13090 — blank = next number for invoices'))+fld('Amount', inp('ud_amount','', 'text', '0', ' inputmode="numeric"'))+fld('Status', sel('ud_status', DOC_STATUSES, 'Draft'))+'</div>':'')+
    fld('File (PDF or Word, up to 8 MB)', '<input type="file" id="ud_file" class="wc-input" accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg" onchange="docPickFile(this)">')+
    fld('Notes', ta('ud_notes','', '', 2))+'<button class="btn btn-primary" id="ud_go" onclick="saveUploadDoc()">Save to Drive</button>';
  wcModal('upload','Upload document', h);
}
function docPickFile(inputEl){
  var f = inputEl.files && inputEl.files[0]; DOC_FILE = null; if(!f) return;
  if(f.size > 8*1024*1024){ inputEl.value = ''; return wcToast('That file is over 8 MB.', true); }
  var r = new FileReader(); r.onload = function(){ DOC_FILE = {name:f.name, mime:f.type, data:String(r.result).split(',')[1]||''}; if(!val('ud_title')){ var t = document.getElementById('ud_title'); if(t) t.value = f.name.replace(/\.[^.]+$/,''); } };
  r.readAsDataURL(f);
}
function saveUploadDoc(){
  if(!DOC_FILE) return wcToast('Choose a file first.', true);
  var b = document.getElementById('ud_go'); b.disabled = true; b.textContent = 'Saving…';
  api('saveDocument', {type:val('ud_type'), title:val('ud_title'), client_id:val('ud_client'), project_id:val('ud_project'), number:val('ud_number'), amount:String(val('ud_amount')||'').replace(/[^0-9.]/g,''), status:val('ud_status')||'Draft', notes:val('ud_notes'), file_name:DOC_FILE.name, mime:DOC_FILE.mime, file_base64:DOC_FILE.data, actor:CURRENT_USER}).then(function(res){
    if(!res.ok){ b.disabled = false; b.textContent = 'Save to Drive'; return wcFail('Could not save', res); }
    wcClose('upload'); refreshData().then(function(){ wcToast('Saved'+(res.doc.number?' as '+res.doc.number:'')+'.'); });
  });
}
function openDocDetail(id){
  var d = (DB.documents||[]).filter(function(x){ return x.doc_id===id; })[0]; if(!d) return;
  var canEdit = canEditMod('documents') && (isAdminUser() || DOC_MONEY.indexOf(d.type)===-1);
  var h = '<div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px">'+pill(d.type,'mute')+pill(d.status,docTone(d.status))+(d.number?pill(d.number,'info'):'')+(d.source?pill(d.source,'mute'):'')+'</div>'+
    (d.drive_url && safeUrl(d.drive_url)?'<div style="margin-bottom:12px"><a class="btn btn-primary btn-sm" href="'+esc(safeUrl(d.drive_url))+'" target="_blank" rel="noopener">Open in Drive</a> <span class="wc-muted">'+esc(d.file_name||'')+'</span></div>':'<div class="wc-note warn" style="margin-bottom:12px">No file saved yet — this number is reserved.</div>')+
    '<div class="wc-grid g2">'+fld('Title', inp('dd_title', d.title))+fld('Amount', isAdminUser()?inp('dd_amount', d.amount, 'text', '', ' inputmode="numeric"'):'<div class="wc-muted">Hidden</div>')+'</div>'+
    '<div class="wc-grid g2">'+fld('Client', sel('dd_client', docClientOpts(), d.client_id||''))+fld('Project', sel('dd_project', docProjectOpts(), d.project_id||''))+'</div>'+
    fld('Finance entry ID (optional)', inp('dd_fin', d.finance_id))+fld('Notes', ta('dd_notes', d.notes, '', 2))+
    '<div style="display:flex;gap:8px">'+(canEdit?'<button class="btn btn-primary" onclick="saveDocDetail(\''+id+'\')">Save</button>':'')+(isAdminUser()?'<button class="btn btn-ghost" style="color:var(--red)" onclick="deleteDocClick(\''+id+'\')">Delete</button>':'')+'</div>';
  wcModal('docd', esc(d.number||d.title||'Document'), h);
}
function saveDocDetail(id){
  var u = {doc_id:id, title:val('dd_title'), client_id:val('dd_client'), project_id:val('dd_project'), finance_id:val('dd_fin'), notes:val('dd_notes'), actor:CURRENT_USER};
  if(isAdminUser()) u.amount = String(val('dd_amount')||'').replace(/[^0-9.]/g,'');
  api('updateDocument', u).then(function(res){ if(!res.ok) return wcFail('Could not save', res); wcClose('docd'); refreshData().then(function(){ wcToast('Saved.'); }); });
}
function deleteDocClick(id){ if(!confirm('Delete this document and move its Drive file to the bin?')) return; api('deleteDocument', {doc_id:id, actor:CURRENT_USER}).then(function(res){ if(!res.ok) return wcFail('Could not delete', res); wcClose('docd'); refreshData().then(function(){ wcToast('Deleted.'); }); }); }
// Attached-documents block for client and project screens
function docsFor(kind, id){
  var key = kind==='client'?'client_id':'project_id';
  var list = (DB.documents||[]).filter(function(d){ return d[key]===id; }).sort(function(a,b){ return String(b.created_at).localeCompare(String(a.created_at)); });
  if(!list.length && !canEditMod('documents') && !canSee('documents')) return '';
  var h = '<div class="card-h" style="margin-top:10px">Documents'+(list.length?' ('+list.length+')':'')+(canEditMod('documents')?' <button class="btn btn-ghost btn-sm" onclick="openUploadDoc({'+key+':\''+id+'\'})">+ Attach</button>':'')+'</div>';
  h += list.length ? list.map(function(d){ return '<div class="wc-row"><div style="flex:1">'+(d.drive_url&&safeUrl(d.drive_url)?'<a href="'+esc(safeUrl(d.drive_url))+'" target="_blank" rel="noopener" style="color:var(--brand);font-weight:600">'+esc(d.title||d.file_name)+'</a>':'<b>'+esc(d.title||'(reserved)')+'</b>')+'<div class="wc-muted">'+esc(d.type)+(d.number?' · '+esc(d.number):'')+' · '+esc(fmtDate(d.created_at))+'</div></div>'+pill(d.status,docTone(d.status))+'</div>'; }).join('') : '<div class="wc-muted">Nothing attached yet.</div>';
  return h;
}
// Settings card
function bankLinesFromJson(j){ var a=[]; try{ a=JSON.parse(j||'[]'); }catch(e){} return (Array.isArray(a)?a:[]).map(function(b){ return [b.bank||'', b.acctNumber||'', b.acctName||''].join(' | '); }).join('\n'); }
function bankLinesSync(){
  var rows = document.getElementById('bankLines').value.split('\n').map(function(l){ var p=l.split('|').map(function(x){ return x.trim(); }); return {bank:p[0]||'', acctNumber:p[1]||'', acctName:p[2]||'WeCollect Data Gathering LTD'}; }).filter(function(b){ return b.bank||b.acctNumber; });
  document.getElementById('bankJson').value = rows.length ? JSON.stringify(rows) : '';
}
function docsSettingsHtml(s){
  var c = s.config||{}, st = s.status||{};
  return '<div class="card" style="padding:18px 20px;margin-bottom:16px"><div class="card-h">Documents &amp; invoice numbers</div>'+
    '<div class="wc-grid g2">'+fld('Invoice prefix', '<input class="wc-input sv" data-k="docs_invoice_prefix" value="'+esc(c.docs_invoice_prefix||'WC')+'">')+fld('Next invoice number', '<input class="wc-input sv" data-k="docs_invoice_next" inputmode="numeric" value="'+esc(c.docs_invoice_next||'')+'" placeholder="e.g. 13081">', 'Numbers never repeat: the app also checks every number already stored.')+'</div>'+
    fld('Bank accounts printed on invoices', '<textarea class="wc-input" id="bankLines" rows="3" placeholder="GTBank | 0123456789 | WeCollect Data Gathering LTD" oninput="bankLinesSync()">'+esc(bankLinesFromJson(c.docs_bank_accounts))+'</textarea><input type="hidden" class="sv" id="bankJson" data-k="docs_bank_accounts" value="'+esc(c.docs_bank_accounts||'')+'">', 'One per line: bank | account number | account name. The generator fills these into every invoice.')+
    '<div class="wc-row"><span style="flex:1">Outside-tool key (DOCS_API_KEY, optional)</span>'+(st.docs_api_key?pill('set','good'):pill('not set — fine unless an outside tool posts files in','mute'))+'</div>'+
    '<div class="wc-help" style="margin-top:8px">Files are stored in Drive under “WeCollect OS Documents / client / type”. The document generator is built in (Documents → Generate document), so no separate key or deployment is needed for it. DOCS_API_KEY is only for an outside tool that posts files in.</div></div>';
}


// ── Document generator, built in: briefs, quotes, invoices and proposals made from notes ──
var GEN_HTML = "<!DOCTYPE html>\n<html lang=\"en\"><head><meta charset=\"UTF-8\"><meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"><title>WeCollect Document Generator<\/title>\n<script src=\"https://unpkg.com/docx@8.5.0/build/index.umd.js\"><\/script>\n<script src=\"https://cdnjs.cloudflare.com/ajax/libs/mammoth/1.4.2/mammoth.browser.min.js\"><\/script>\n<style>\n  :root{\n    --purple:#4B3FCF; --purple-dark:#372E9E; --purple-light:#EFEDFC;\n    --ink:#1B1730; --gray:#6B6880; --line:#E4E2F1; --paper:#FFFFFF; --canvas:#F5F4FB; --red:#D64545;\n  }\n  *{box-sizing:border-box;}\n  body{margin:0;font-family:'Segoe UI',-apple-system,BlinkMacSystemFont,Helvetica,Arial,sans-serif;background:var(--canvas);color:var(--ink);}\n  .brand{display:flex;align-items:baseline;gap:6px;}\n  .brand .we{font-weight:400;color:var(--ink);font-size:24px;}\n  .brand .collect{font-weight:800;color:var(--purple);font-size:24px;font-style:italic;}\n\n  /* ============ SCREEN: SELECT ============ */\n  .screen-center{min-height:100vh;display:flex;flex-direction:column;align-items:center;padding:56px 24px;}\n  .select-head{text-align:center;max-width:640px;margin-bottom:40px;}\n  .select-head .brand{justify-content:center;margin-bottom:10px;}\n  .select-head h1{font-size:22px;margin:0 0 8px;}\n  .select-head p{color:var(--gray);font-size:14px;line-height:1.6;margin:0;}\n  .card-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:18px;max-width:820px;width:100%;}\n  .tpl-card{\n    background:#fff;border:1.5px solid var(--line);border-radius:14px;padding:22px;cursor:pointer;\n    transition:.15s; text-align:left;\n  }\n  .tpl-card:hover{border-color:var(--purple);box-shadow:0 6px 20px rgba(75,63,207,.12);transform:translateY(-2px);}\n  .tpl-card .swatch{width:36px;height:36px;border-radius:9px;background:var(--purple);display:flex;align-items:center;justify-content:center;color:#fff;font-size:18px;margin-bottom:14px;}\n  .tpl-card h3{margin:0 0 6px;font-size:15.5px;}\n  .tpl-card p{margin:0 0 10px;font-size:12.5px;color:var(--gray);line-height:1.55;}\n  .tpl-card .examples{font-size:11px;color:var(--purple-dark);font-weight:600;}\n\n  /* ============ SCREEN: INPUT ============ */\n  .input-box{max-width:640px;width:100%;background:#fff;border:1px solid var(--line);border-radius:14px;padding:28px;}\n  .back-link{align-self:flex-start;max-width:640px;width:100%;margin-bottom:14px;}\n  .back-link a{color:var(--purple-dark);font-size:13px;text-decoration:none;font-weight:600;cursor:pointer;}\n  .input-box h2{margin:0 0 4px;font-size:17px;}\n  .input-box .sub{color:var(--gray);font-size:13px;margin:0 0 18px;}\n  .tab-toggle{display:flex;background:var(--purple-light);border-radius:999px;padding:4px;margin-bottom:16px;width:fit-content;}\n  .tab-toggle button{border:none;background:transparent;padding:8px 16px;border-radius:999px;font-size:12.5px;font-weight:600;color:var(--purple-dark);cursor:pointer;}\n  .tab-toggle button.active{background:var(--purple);color:#fff;}\n  textarea#pasteText{width:100%;min-height:180px;border:1px solid var(--line);border-radius:10px;padding:14px;font-size:13.5px;font-family:inherit;resize:vertical;}\n  textarea#pasteText:focus{outline:none;border-color:var(--purple);box-shadow:0 0 0 3px var(--purple-light);}\n  .drop-zone{border:2px dashed var(--line);border-radius:10px;padding:30px;text-align:center;color:var(--gray);font-size:13px;}\n  .drop-zone.hasfile{border-color:var(--purple);color:var(--purple-dark);background:var(--purple-light);}\n  .drop-zone input[type=file]{margin-top:10px;}\n  .gen-btn{width:100%;background:var(--purple);color:#fff;border:none;padding:13px;border-radius:9px;font-size:14.5px;font-weight:700;cursor:pointer;margin-top:18px;}\n  .gen-btn:hover{background:var(--purple-dark);}\n  .gen-btn:disabled{opacity:.6;cursor:not-allowed;}\n  .skip-link{display:block;text-align:center;margin-top:14px;font-size:12.5px;color:var(--gray);}\n  .skip-link a{color:var(--purple-dark);font-weight:600;cursor:pointer;text-decoration:none;}\n  .ai-status{display:none;align-items:center;gap:10px;margin-top:14px;font-size:13px;color:var(--purple-dark);font-weight:600;}\n  .spinner{width:16px;height:16px;border:2px solid var(--purple-light);border-top-color:var(--purple);border-radius:50%;animation:spin .7s linear infinite;}\n  @keyframes spin{to{transform:rotate(360deg);}}\n  .ai-error{display:none;margin-top:12px;background:#FDEDED;border:1px solid #F5C6C6;color:#8a2b2b;padding:10px 12px;border-radius:8px;font-size:12.5px;line-height:1.5;}\n\n  /* ============ SCREEN: EDIT (form + preview) ============ */\n  .app{display:grid;grid-template-columns:400px 1fr;min-height:100vh;}\n  .sidebar{background:var(--paper);border-right:1px solid var(--line);padding:22px;overflow-y:auto;max-height:100vh;}\n  .sidebar-top{display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;}\n  .tpl-badge{font-size:11px;font-weight:700;color:var(--purple-dark);background:var(--purple-light);padding:4px 9px;border-radius:999px;}\n  .change-link{font-size:11.5px;color:var(--gray);cursor:pointer;text-decoration:underline;}\n  .brand-sub{font-size:11.5px;color:var(--gray);margin:2px 0 18px;}\n\n  .section-label{font-size:11px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--purple-dark);margin:20px 0 10px;display:flex;align-items:center;gap:8px;}\n  .section-label:first-of-type{margin-top:0;}\n  .section-label::after{content:\"\";flex:1;height:1px;background:var(--line);}\n  label{display:block;font-size:12.5px;font-weight:600;color:var(--ink);margin:12px 0 5px;}\n  input[type=text],input[type=number],textarea,select{width:100%;border:1px solid var(--line);border-radius:8px;padding:9px 10px;font-size:13.5px;font-family:inherit;color:var(--ink);background:#fff;resize:vertical;}\n  input:focus,textarea:focus{outline:none;border-color:var(--purple);box-shadow:0 0 0 3px var(--purple-light);}\n  textarea{min-height:56px;}\n  .two-col{display:grid;grid-template-columns:1fr 1fr;gap:8px;}\n  .three-col{display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;}\n  .check-row{display:flex;align-items:center;gap:8px;margin:12px 0 4px;}\n  .check-row input[type=checkbox]{width:16px;height:16px;}\n  .check-row label{margin:0;}\n  .row-list .row-item{display:flex;gap:6px;margin-bottom:6px;align-items:flex-start;}\n  .row-item textarea,.row-item input{flex:1;}\n  .icon-btn{border:1px solid var(--line);background:#fff;border-radius:8px;width:32px;height:32px;min-width:32px;cursor:pointer;font-size:15px;color:var(--gray);display:flex;align-items:center;justify-content:center;line-height:1;}\n  .icon-btn:hover{border-color:var(--red);color:var(--red);}\n  .add-btn{margin-top:4px;border:1px dashed var(--purple);background:var(--purple-light);color:var(--purple-dark);border-radius:8px;padding:7px 12px;font-size:12.5px;font-weight:600;cursor:pointer;width:100%;}\n  .add-btn:hover{background:#e2ddfa;}\n  .obj-row{border:1px solid var(--line);border-radius:8px;padding:8px;margin-bottom:8px;background:#FAFAFE;}\n  .obj-row-top{display:flex;gap:6px;margin-bottom:6px;}\n  .obj-row-top input{flex:1;}\n\n  .actions{position:sticky;bottom:0;background:var(--paper);padding-top:16px;margin-top:24px;border-top:1px solid var(--line);}\n  .btn-primary{width:100%;background:var(--purple);color:#fff;border:none;padding:12px;border-radius:8px;font-size:14px;font-weight:700;cursor:pointer;margin-bottom:8px;}\n  .btn-primary:hover{background:var(--purple-dark);}\n  .btn-secondary{width:100%;background:#fff;color:var(--purple-dark);border:1.5px solid var(--purple);padding:11px;border-radius:8px;font-size:14px;font-weight:700;cursor:pointer;}\n  .btn-secondary:hover{background:var(--purple-light);}\n  .hint{font-size:11px;color:var(--gray);margin-top:8px;line-height:1.5;}\n\n  .preview-wrap{padding:32px;overflow-y:auto;max-height:100vh;display:flex;justify-content:center;}\n  .page{background:#fff;width:794px;min-height:1123px;box-shadow:0 4px 24px rgba(27,23,48,.12);padding:0 0 40px 0;}\n\n  .p-header{background:linear-gradient(135deg,var(--purple),var(--purple-dark));color:#fff;padding:34px 44px 26px;}\n  .p-header h1{margin:0 0 8px;font-size:26px;}\n  .p-header .org{font-size:12px;opacity:.85;margin-bottom:6px;}\n  .p-header p{margin:0;font-size:13.5px;opacity:.92;line-height:1.5;max-width:640px;}\n  .p-header .geo{margin-top:14px;font-size:12.5px;font-weight:600;}\n  .p-body{padding:26px 44px;}\n  .p-body h2{color:var(--purple-dark);font-size:16px;margin:22px 0 10px;}\n  .p-body h2:first-child{margin-top:0;}\n  .cols{display:grid;grid-template-columns:1fr 1fr;gap:0 34px;}\n  .p-body p,.p-body li{font-size:12.5px;line-height:1.6;color:var(--ink);}\n  .p-body ul,.p-body ol{margin:6px 0;padding-left:18px;}\n  .p-body table{width:100%;border-collapse:collapse;margin:8px 0;font-size:12px;}\n  .p-body th{background:var(--purple);color:#fff;text-align:left;padding:8px;font-size:11.5px;}\n  .p-body td{padding:8px;border-bottom:1px solid var(--line);vertical-align:top;}\n  .p-body tr:nth-child(even) td{background:#FAFAFE;}\n  .total-row td{font-weight:700;background:var(--purple-light) !important;}\n  .p-footer{display:flex;justify-content:space-between;align-items:center;padding:16px 44px 0;margin-top:20px;border-top:1px solid var(--line);}\n  .p-footer .logo{font-size:14px;}\n  .p-footer .logo .we{color:var(--ink);}\n  .p-footer .logo .collect{color:var(--purple);font-weight:800;font-style:italic;}\n  .p-footer .addr{font-size:10.5px;color:var(--gray);text-align:right;}\n  .disclaimer{color:var(--red);font-size:11px;font-style:italic;margin-top:6px;}\n  .obj-block{margin-bottom:12px;}\n  .obj-block .t{font-weight:700;font-size:13px;color:var(--ink);margin-bottom:2px;}\n  .phase-block{border-left:3px solid var(--purple);padding:4px 0 4px 14px;margin-bottom:14px;}\n  .phase-block .plabel{font-size:10.5px;font-weight:700;color:var(--purple-dark);text-transform:uppercase;letter-spacing:.05em;}\n  .phase-block .ptitle{font-weight:700;font-size:13.5px;margin:2px 0 4px;}\n\n  /* Invoice layout */\n  .inv-page{padding:40px 48px;}\n  .inv-top{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:26px;}\n  .inv-top .logo{font-size:20px;}\n  .inv-top .logo .we{color:var(--ink);}\n  .inv-top .logo .collect{color:var(--purple);font-weight:800;font-style:italic;}\n  .inv-top .tagline{font-size:11px;color:var(--gray);margin-top:2px;}\n  .inv-meta{text-align:right;font-size:12.5px;}\n  .inv-meta .inv-no{font-size:15px;font-weight:800;color:var(--purple-dark);}\n  .inv-meta div{margin-top:3px;}\n  .inv-billto{margin-bottom:18px;}\n  .inv-billto .lbl{font-size:11px;font-weight:700;color:var(--gray);text-transform:uppercase;letter-spacing:.05em;}\n  .inv-billto .name{font-size:14px;font-weight:700;margin-top:4px;}\n  .inv-billto .co{font-size:13px;color:var(--gray);}\n  .inv-desc{margin-bottom:18px;font-size:12.5px;line-height:1.6;}\n  .inv-desc .lbl{font-size:11px;font-weight:700;color:var(--gray);text-transform:uppercase;letter-spacing:.05em;margin-bottom:4px;}\n  .inv-table{width:100%;border-collapse:collapse;margin-bottom:6px;}\n  .inv-table th{background:var(--purple);color:#fff;text-align:left;padding:9px 10px;font-size:11.5px;}\n  .inv-table th.num,.inv-table td.num{text-align:right;}\n  .inv-table td{padding:9px 10px;border-bottom:1px solid var(--line);font-size:12.5px;}\n  .inv-totals{width:280px;margin-left:auto;margin-top:6px;}\n  .inv-totals div{display:flex;justify-content:space-between;padding:6px 10px;font-size:12.5px;}\n  .inv-totals .grand{font-weight:800;background:var(--purple-light);border-radius:6px;font-size:13.5px;}\n  .inv-vat-note{font-size:11px;color:var(--gray);font-style:italic;margin-top:8px;text-align:right;}\n  .inv-payment{margin-top:26px;border-top:1px solid var(--line);padding-top:16px;}\n  .inv-payment .lbl{font-size:11px;font-weight:700;color:var(--gray);text-transform:uppercase;letter-spacing:.05em;margin-bottom:8px;}\n  .inv-payment .opt{font-size:12.5px;line-height:1.7;margin-bottom:10px;}\n  .inv-payment .opt b{color:var(--purple-dark);}\n  .inv-notes{font-size:11.5px;color:var(--gray);margin-top:10px;line-height:1.6;white-space:pre-line;}\n  .inv-thanks{text-align:center;font-size:16px;font-weight:800;color:var(--purple-dark);letter-spacing:.08em;margin:30px 0 18px;}\n  .inv-footer{text-align:center;font-size:10.5px;color:var(--gray);border-top:1px solid var(--line);padding-top:12px;}\n\n  @media print{\n    .sidebar,.back-link{display:none;}\n    .app{display:block;}\n    .preview-wrap{padding:0;max-height:none;overflow:visible;}\n    .page{box-shadow:none;width:100%;}\n    body{background:#fff;}\n  }\n  @media (max-width:900px){\n    .app{grid-template-columns:1fr;}\n    .sidebar{max-height:none;border-right:none;border-bottom:1px solid var(--line);}\n    .preview-wrap{max-height:none;padding:20px;}\n    .page{width:100%;}\n    .card-grid{grid-template-columns:1fr;}\n  }\n  .ai-error.ok{background:#EAF7EE;border-color:#BFE3C9;color:#1d6b3a;}\n  .change-link{cursor:pointer;}\n<\/style>\n<!-- ================= SCREEN 1: TEMPLATE SELECT ================= -->\n<div class=\"screen-center\" id=\"screenSelect\">\n  <div class=\"select-head\"><div style=\"text-align:right\"><a class=\"change-link\" onclick=\"closeGen()\">\u2715 Close<\/a><\/div>\n    <div class=\"brand\"><span class=\"we\">we<\/span><span class=\"collect\">collect<\/span><\/div>\n    <h1 style=\"margin-top:14px\">Document Generator<\/h1>\n    <p>Pick the type of document you need. On the next step, paste your notes or a brief paragraph \u2014 or upload a file \u2014 and AI will structure it into the right format for you to review and download.<\/p>\n  <\/div>\n  <div class=\"card-grid\">\n    <div class=\"tpl-card\" data-mode=\"brief\" onclick=\"selectTemplate('brief')\">\n      <div class=\"swatch\">\ud83d\udcc4<\/div>\n      <h3>Project Brief<\/h3>\n      <p>A quick 1-page overview for early client conversations: objectives, target respondents, methodology, and an indicative cost range.<\/p>\n      <div class=\"examples\">e.g. Brand Awareness Survey, Gen Z Taste Study<\/div>\n    <\/div>\n    <div class=\"tpl-card\" data-mode=\"quote\" onclick=\"selectTemplate('quote')\">\n      <div class=\"swatch\">\ud83d\udcb0<\/div>\n      <h3>Detailed Quote<\/h3>\n      <p>A costed proposal with a full line-item budget table, subtotal/tax/total, and an implementation timeline \u2014 for when a project is ready to move to commercial agreement.<\/p>\n      <div class=\"examples\">e.g. Retail Audit Panel, Digital Ticketing Mapping<\/div>\n    <\/div>\n    <div class=\"tpl-card\" data-mode=\"invoice\" onclick=\"selectTemplate('invoice')\">\n      <div class=\"swatch\">\ud83e\uddfe<\/div>\n      <h3>Client Invoice<\/h3>\n      <p>A billing document with invoice number, line items, tax, optional deposit split, and your bank payment details.<\/p>\n      <div class=\"examples\">e.g. WC13066, WC13075<\/div>\n    <\/div>\n    <div class=\"tpl-card\" data-mode=\"proposal\" onclick=\"selectTemplate('proposal')\">\n      <div class=\"swatch\">\ud83d\udcd8<\/div>\n      <h3>Full Proposal Deck<\/h3>\n      <p>A long-form multi-section proposal for large institutional clients: executive summary, objectives, scope, methodology, technology, phased implementation plan, and deliverables.<\/p>\n      <div class=\"examples\">e.g. NDDC Street Light Mapping, Development Gap Analysis<\/div>\n    <\/div>\n  <\/div>\n<\/div>\n\n<!-- ================= SCREEN 2: INPUT ================= -->\n<div class=\"screen-center\" id=\"screenInput\" style=\"display:none\">\n  <div class=\"back-link\"><a onclick=\"goTo('select')\">&larr; Back to templates<\/a><\/div>\n  <div class=\"input-box\">\n    <h2 id=\"inputTitle\">Describe the project<\/h2>\n    <p class=\"sub\" id=\"inputSub\">Paste an email thread, call notes, or a rough paragraph. AI will pull out the details and structure them into the template.<\/p>\n\n    <div class=\"tab-toggle\">\n      <button id=\"tabPaste\" class=\"active\" onclick=\"setInputTab('paste')\">Paste text<\/button>\n      <button id=\"tabUpload\" onclick=\"setInputTab('upload')\">Upload file<\/button>\n    <\/div>\n\n    <div id=\"pasteTab\">\n      <textarea id=\"pasteText\" placeholder=\"e.g. Client is UAC Foods, wants a retail audit panel for Zuri Seasoning across Lagos, 400 outlets, 4 waves a year, need pricing for setup, fieldwork, QC and reporting...\"><\/textarea>\n    <\/div>\n    <div id=\"uploadTab\" style=\"display:none\">\n      <div class=\"drop-zone\" id=\"dropZone\">\n        \ud83d\udcce Upload a .txt or .docx file (notes, a past brief, an RFP)\n        <br><input type=\"file\" id=\"fileInput\" accept=\".txt,.docx\" onchange=\"handleFile(this.files[0])\">\n      <\/div>\n    <\/div>\n\n    <div class=\"check-row\" id=\"estRow\" style=\"display:none\"><input type=\"checkbox\" id=\"estimateBox\"><label for=\"estimateBox\" style=\"font-weight:500\">Suggest estimated prices where the notes give none (web search; each is marked <b>[AI ESTIMATE \u2014 VERIFY]<\/b>)<\/label><\/div>\n    <button class=\"gen-btn\" onclick=\"generateWithAI()\">\u2728 Generate with AI<\/button>\n    <div class=\"ai-status\" id=\"aiStatus\"><div class=\"spinner\"><\/div><span>Reading and structuring your input\u2026<\/span><\/div>\n    <div class=\"ai-error\" id=\"aiError\"><\/div>\n    <span class=\"skip-link\">or <a onclick=\"skipAI()\">start with a blank template instead<\/a><\/span>\n  <\/div>\n<\/div>\n\n<!-- ================= SCREEN 3: EDIT ================= -->\n<div class=\"app\" id=\"screenEdit\" style=\"display:none\">\n  <div class=\"sidebar\">\n    <div class=\"sidebar-top\">\n      <div class=\"brand\"><span class=\"we\">we<\/span><span class=\"collect\">collect<\/span><\/div>\n      <span class=\"tpl-badge\" id=\"tplBadge\">Brief<\/span>\n    <\/div>\n    <div class=\"brand-sub\">\n      <a class=\"change-link\" onclick=\"goTo('select')\">Change template<\/a> \u00b7\n      <a class=\"change-link\" onclick=\"goTo('input')\">Re-run AI<\/a>\n    <\/div>\n\n    <!-- ---------- BRIEF FIELDS ---------- -->\n    <div id=\"fieldsBrief\" style=\"display:none\">\n      <div class=\"section-label\">Client &amp; Project<\/div>\n      <label>Project title<\/label>\n      <input type=\"text\" id=\"brief_title\" oninput=\"setField('brief','title',this.value)\">\n      <label>One-line project summary<\/label>\n      <textarea id=\"brief_tagline\" oninput=\"setField('brief','tagline',this.value)\"><\/textarea>\n      <label>Geographic coverage<\/label>\n      <input type=\"text\" id=\"brief_geo\" oninput=\"setField('brief','geo',this.value)\">\n\n      <div class=\"section-label\">Project Objectives<\/div>\n      <div class=\"row-list\" id=\"brief_objectivesList\"><\/div>\n      <button class=\"add-btn\" onclick=\"addStrRow('brief','objectives')\">+ Add objective<\/button>\n\n      <div class=\"section-label\">Target Respondents<\/div>\n      <textarea id=\"brief_respondents\" style=\"min-height:80px\" oninput=\"setField('brief','respondents',this.value)\"><\/textarea>\n\n      <div class=\"section-label\">Methodology &amp; Quality Control<\/div>\n      <div class=\"row-list\" id=\"brief_methodList\"><\/div>\n      <button class=\"add-btn\" onclick=\"addStrRow('brief','method')\">+ Add methodology point<\/button>\n\n      <div class=\"section-label\">Indicative Cost Range<\/div>\n      <textarea id=\"brief_costRangeText\" oninput=\"setField('brief','costRangeText',this.value)\"><\/textarea>\n\n      <div class=\"section-label\">Deliverables<\/div>\n      <div class=\"row-list\" id=\"brief_deliverList\"><\/div>\n      <button class=\"add-btn\" onclick=\"addStrRow('brief','deliver')\">+ Add deliverable<\/button>\n\n      <div class=\"section-label\">Next Steps<\/div>\n      <div class=\"row-list\" id=\"brief_nextStepsList\"><\/div>\n      <button class=\"add-btn\" onclick=\"addStrRow('brief','nextSteps')\">+ Add next step<\/button>\n    <\/div>\n\n    <!-- ---------- QUOTE FIELDS ---------- -->\n    <div id=\"fieldsQuote\" style=\"display:none\">\n      <div class=\"section-label\">Client &amp; Project<\/div>\n      <label>Project title<\/label>\n      <input type=\"text\" id=\"quote_title\" oninput=\"setField('quote','title',this.value)\">\n      <label>One-line project summary<\/label>\n      <textarea id=\"quote_tagline\" oninput=\"setField('quote','tagline',this.value)\"><\/textarea>\n      <label>Geographic coverage<\/label>\n      <input type=\"text\" id=\"quote_geo\" oninput=\"setField('quote','geo',this.value)\">\n\n      <div class=\"section-label\">Specific Objectives<\/div>\n      <div class=\"row-list\" id=\"quote_objectivesList\"><\/div>\n      <button class=\"add-btn\" onclick=\"addStrRow('quote','objectives')\">+ Add objective<\/button>\n\n      <div class=\"section-label\">Cost Summary<\/div>\n      <div id=\"quote_costItemsList\"><\/div>\n      <button class=\"add-btn\" onclick=\"addObjRow('quote','costItems')\">+ Add line item<\/button>\n      <label style=\"margin-top:10px\">Tax rate (%)<\/label>\n      <input type=\"number\" id=\"quote_taxRate\" step=\"0.1\" oninput=\"setField('quote','taxRate',parseFloat(this.value)||0)\">\n\n      <div class=\"section-label\">Implementation Timeline<\/div>\n      <div id=\"quote_milestonesList\"><\/div>\n      <button class=\"add-btn\" onclick=\"addObjRow('quote','milestones')\">+ Add milestone<\/button>\n\n      <div class=\"section-label\">Next Steps<\/div>\n      <div class=\"row-list\" id=\"quote_nextStepsList\"><\/div>\n      <button class=\"add-btn\" onclick=\"addStrRow('quote','nextSteps')\">+ Add next step<\/button>\n    <\/div>\n\n    <!-- ---------- INVOICE FIELDS ---------- -->\n    <div id=\"fieldsInvoice\" style=\"display:none\">\n      <div class=\"section-label\">Invoice Details<\/div>\n      <div class=\"two-col\">\n        <div><label>Invoice No.<\/label><input type=\"text\" id=\"invoice_invNo\" placeholder=\"WC13081\" oninput=\"setField('invoice','invNo',this.value)\"><\/div>\n        <div><label>Date<\/label><input type=\"text\" id=\"invoice_invDate\" placeholder=\"12.08.2026\" oninput=\"setField('invoice','invDate',this.value)\"><\/div>\n      <\/div>\n\n      <div class=\"section-label\">Billed To<\/div>\n      <label>Contact name<\/label>\n      <input type=\"text\" id=\"invoice_billName\" oninput=\"setField('invoice','billName',this.value)\">\n      <label>Company / Organization<\/label>\n      <input type=\"text\" id=\"invoice_billCompany\" oninput=\"setField('invoice','billCompany',this.value)\">\n\n      <div class=\"section-label\">Project Description<\/div>\n      <textarea id=\"invoice_invDesc\" style=\"min-height:70px\" oninput=\"setField('invoice','invDesc',this.value)\"><\/textarea>\n\n      <div class=\"section-label\">Line Items<\/div>\n      <div id=\"invoice_itemsList\"><\/div>\n      <button class=\"add-btn\" onclick=\"addObjRow('invoice','items')\">+ Add line item<\/button>\n\n      <div class=\"section-label\">Tax &amp; Deposit<\/div>\n      <div class=\"two-col\">\n        <div><label>Tax rate (%)<\/label><input type=\"number\" id=\"invoice_taxRate\" step=\"0.1\" oninput=\"setField('invoice','taxRate',parseFloat(this.value)||0)\"><\/div>\n        <div><label>&nbsp;<\/label>\n          <div class=\"check-row\" style=\"margin-top:9px\">\n            <input type=\"checkbox\" id=\"invoice_vatExempt\" onchange=\"setField('invoice','vatExempt',this.checked)\">\n            <label for=\"invoice_vatExempt\" style=\"font-weight:500\">VAT-exempt<\/label>\n          <\/div>\n        <\/div>\n      <\/div>\n      <input type=\"text\" id=\"invoice_vatExemptNote\" placeholder=\"e.g. NB: IITA is exempted from VAT\" oninput=\"setField('invoice','vatExemptNote',this.value)\" style=\"margin-top:6px\">\n\n      <div class=\"check-row\">\n        <input type=\"checkbox\" id=\"invoice_depositEnabled\" onchange=\"setField('invoice','depositEnabled',this.checked); toggleDepositUI();\">\n        <label for=\"invoice_depositEnabled\">Require a deposit<\/label>\n      <\/div>\n      <div id=\"depositFields\" style=\"display:none\">\n        <label>Deposit (% of total)<\/label>\n        <input type=\"number\" id=\"invoice_depositPercent\" oninput=\"setField('invoice','depositPercent',parseFloat(this.value)||0)\">\n      <\/div>\n\n      <div class=\"section-label\">Payment Details<\/div>\n      <div id=\"invoice_paymentsList\"><\/div>\n      <button class=\"add-btn\" onclick=\"addObjRow('invoice','payments')\">+ Add payment option<\/button>\n\n      <label style=\"margin-top:14px\">Additional notes (optional)<\/label>\n      <textarea id=\"invoice_notes\" oninput=\"setField('invoice','notes',this.value)\"><\/textarea>\n    <\/div>\n\n    <!-- ---------- PROPOSAL FIELDS ---------- -->\n    <div id=\"fieldsProposal\" style=\"display:none\">\n      <div class=\"section-label\">Cover<\/div>\n      <label>Project title<\/label>\n      <input type=\"text\" id=\"proposal_title\" oninput=\"setField('proposal','title',this.value)\">\n      <label>Prepared for (org)<\/label>\n      <input type=\"text\" id=\"proposal_org\" oninput=\"setField('proposal','org',this.value)\">\n      <label>Subtitle (optional)<\/label>\n      <input type=\"text\" id=\"proposal_subtitle\" oninput=\"setField('proposal','subtitle',this.value)\">\n\n      <div class=\"section-label\">Executive Summary<\/div>\n      <textarea id=\"proposal_execSummary\" style=\"min-height:100px\" oninput=\"setField('proposal','execSummary',this.value)\"><\/textarea>\n\n      <div class=\"section-label\">Project Objectives<\/div>\n      <div id=\"proposal_objectivesList\"><\/div>\n      <button class=\"add-btn\" onclick=\"addObjRow('proposal','objectives')\">+ Add objective<\/button>\n\n      <div class=\"section-label\">Project Scope<\/div>\n      <textarea id=\"proposal_scope\" style=\"min-height:90px\" oninput=\"setField('proposal','scope',this.value)\"><\/textarea>\n\n      <div class=\"section-label\">Methodology<\/div>\n      <div id=\"proposal_methodologyList\"><\/div>\n      <button class=\"add-btn\" onclick=\"addObjRow('proposal','methodology')\">+ Add methodology component<\/button>\n\n      <div class=\"section-label\">Technology<\/div>\n      <div id=\"proposal_technologyList\"><\/div>\n      <button class=\"add-btn\" onclick=\"addObjRow('proposal','technology')\">+ Add technology component<\/button>\n\n      <div class=\"section-label\">Implementation Plan<\/div>\n      <div id=\"proposal_phasesList\"><\/div>\n      <button class=\"add-btn\" onclick=\"addObjRow('proposal','phases')\">+ Add phase<\/button>\n\n      <div class=\"section-label\">Deliverables<\/div>\n      <div id=\"proposal_deliverablesList\"><\/div>\n      <button class=\"add-btn\" onclick=\"addObjRow('proposal','deliverables')\">+ Add deliverable category<\/button>\n\n      <div class=\"section-label\">Next Steps<\/div>\n      <div class=\"row-list\" id=\"proposal_nextStepsList\"><\/div>\n      <button class=\"add-btn\" onclick=\"addStrRow('proposal','nextSteps')\">+ Add next step<\/button>\n    <\/div>\n\n    <div class=\"section-label\">Save to WeCollect OS<\/div>\n    <label>Client<\/label>\n    <input type=\"text\" id=\"saveClient\" list=\"dlClients\" placeholder=\"Pick or type a client\" oninput=\"saveCtx.client=this.value;syncProjects()\">\n    <datalist id=\"dlClients\"><\/datalist>\n    <label>Project (optional)<\/label>\n    <input type=\"text\" id=\"saveProject\" list=\"dlProjects\" placeholder=\"Pick or type a project\" oninput=\"saveCtx.project=this.value\">\n    <datalist id=\"dlProjects\"><\/datalist>\n    <div class=\"two-col\">\n      <div><label>Status<\/label><select id=\"saveStatus\"><option>Draft<\/option><option>Sent<\/option><\/select><\/div>\n      <div><label>Notes<\/label><input type=\"text\" id=\"saveNotes\" placeholder=\"optional\"><\/div>\n    <\/div>\n    <div class=\"hint\">Saving files the Word document under the client in Drive, adds it to Documents and attaches it to the client and project. Invoices use the next WC number automatically.<\/div>\n\n    <div class=\"actions\">\n      <div class=\"ai-error\" id=\"saveMsg\" style=\"margin:0 0 8px\"><\/div>\n      <button class=\"btn-primary\" id=\"saveBtn\" onclick=\"saveToOS()\">\ud83d\udcbe Save to WeCollect OS<\/button>\n      <div class=\"two-col\">\n        <button class=\"btn-secondary\" onclick=\"downloadWord()\">\u2b07 Word<\/button>\n        <button class=\"btn-secondary\" onclick=\"printDoc()\">\ud83d\udda8 PDF / Print<\/button>\n      <\/div>\n    <\/div>\n  <\/div>\n\n  <div class=\"preview-wrap\">\n    <div class=\"page\" id=\"previewPage\"><\/div>\n  <\/div>\n<\/div>\n\n\n<script>\n/* =========================================================\n   STATE\n========================================================= */\nlet currentMode = 'brief';\nlet inputTab = 'paste';\nlet uploadedFileText = \"\";\n\nconst TPL_NAMES = { brief:\"Project Brief\", quote:\"Detailed Quote\", invoice:\"Client Invoice\", proposal:\"Full Proposal Deck\" };\n\nlet INIT = { modes:['brief','quote','invoice','proposal'], next_number:'', payments:[{bank:'',acctNumber:'',acctName:'WeCollect Data Gathering LTD'}], clients:[], projects:[] };\nlet saveCtx = { client:'', project:'' };\nfunction payDefault(){ return JSON.parse(JSON.stringify((INIT.payments && INIT.payments.length) ? INIT.payments : [{bank:'',acctNumber:'',acctName:'WeCollect Data Gathering LTD'}])); }\nfunction todayStr(){ const d=new Date(); const p=n=>('0'+n).slice(-2); return p(d.getDate())+'.'+p(d.getMonth()+1)+'.'+d.getFullYear(); }\nfunction freshState(){\n  return {\n    brief: { title:\"\", tagline:\"\", geo:\"\", objectives:[\"\"], respondents:\"\", method:[\"\"], costRangeText:\"\", deliver:[\"\"], nextSteps:[\"\"] },\n    quote: { title:\"\", tagline:\"\", geo:\"\", objectives:[\"\"], costItems:[{activity:\"\",budget:\"\",desc:\"\"}], taxRate:7.5, milestones:[{phase:\"\",duration:\"\",desc:\"\"}], nextSteps:[\"\"] },\n    invoice: { invNo:\"\", invDate:\"\", billName:\"\", billCompany:\"\", invDesc:\"\", items:[{item:\"\",units:\"1\",cost:\"\"}], taxRate:7.5, vatExempt:false, vatExemptNote:\"\", depositEnabled:false, depositPercent:50, payments:payDefault(), notes:\"\" },\n    proposal: { title:\"\", org:\"\", subtitle:\"\", execSummary:\"\", objectives:[{title:\"\",desc:\"\"}], scope:\"\", methodology:[{title:\"\",desc:\"\"}], technology:[{title:\"\",desc:\"\"}], phases:[{phase:\"Phase 1\",title:\"\",desc:\"\"}], deliverables:[{category:\"\",desc:\"\"}], nextSteps:[\"\"] }\n  };\n}\nlet state = freshState();\n\n/* config for object-array (multi-field) row lists: mode.key -> field defs */\nconst OBJ_CONFIG = {\n  'quote.costItems':   [{k:'activity',ph:'Activity / Cost category',type:'input'},{k:'budget',ph:'Budget e.g. \u20a6500,000',type:'input'},{k:'desc',ph:'Description',type:'textarea'}],\n  'quote.milestones':  [{k:'phase',ph:'Phase e.g. Field Mapping',type:'input'},{k:'duration',ph:'Duration e.g. Week 3-4',type:'input'},{k:'desc',ph:'Key activity description',type:'textarea'}],\n  'invoice.items':     [{k:'item',ph:'Item / description',type:'textarea'},{k:'units',ph:'Units',type:'input'},{k:'cost',ph:'Cost/unit \u20a6',type:'input'}],\n  'invoice.payments':  [{k:'bank',ph:'Bank name',type:'input'},{k:'acctNumber',ph:'Account number',type:'input'},{k:'acctName',ph:'Account name',type:'input'}],\n  'proposal.objectives':   [{k:'title',ph:'Objective title',type:'input'},{k:'desc',ph:'Description',type:'textarea'}],\n  'proposal.methodology':  [{k:'title',ph:'Component title',type:'input'},{k:'desc',ph:'Description',type:'textarea'}],\n  'proposal.technology':   [{k:'title',ph:'Technology component',type:'input'},{k:'desc',ph:'Description',type:'textarea'}],\n  'proposal.phases':       [{k:'phase',ph:'Phase label e.g. Phase 1',type:'input'},{k:'title',ph:'Phase title',type:'input'},{k:'desc',ph:'Key activities',type:'textarea'}],\n  'proposal.deliverables': [{k:'category',ph:'Category e.g. Databases',type:'input'},{k:'desc',ph:'Description',type:'textarea'}]\n};\nconst ROW_LIST_EL = {\n  'quote.costItems':'quote_costItemsList', 'quote.milestones':'quote_milestonesList',\n  'invoice.items':'invoice_itemsList', 'invoice.payments':'invoice_paymentsList',\n  'proposal.objectives':'proposal_objectivesList', 'proposal.methodology':'proposal_methodologyList',\n  'proposal.technology':'proposal_technologyList', 'proposal.phases':'proposal_phasesList',\n  'proposal.deliverables':'proposal_deliverablesList'\n};\nconst STR_LIST_EL = {\n  'brief.objectives':'brief_objectivesList', 'brief.method':'brief_methodList', 'brief.deliver':'brief_deliverList', 'brief.nextSteps':'brief_nextStepsList',\n  'quote.objectives':'quote_objectivesList', 'quote.nextSteps':'quote_nextStepsList',\n  'proposal.nextSteps':'proposal_nextStepsList'\n};\n\n/* =========================================================\n   GENERIC HELPERS\n========================================================= */\nfunction escapeHtml(str){ return (str||\"\").toString().replace(/&/g,\"&amp;\").replace(/<\/g,\"&lt;\").replace(/>/g,\"&gt;\"); }\nfunction escapeAttr(str){ return escapeHtml(str).replace(/\"/g,\"&quot;\"); }\nfunction setField(mode, field, value){ state[mode][field] = value; render(); }\n\nfunction addStrRow(mode, key){ state[mode][key].push(\"\"); renderStrList(mode,key); render(); }\nfunction removeStrRow(mode, key, idx){ state[mode][key].splice(idx,1); renderStrList(mode,key); render(); }\nfunction updateStrRow(mode, key, idx, val){ state[mode][key][idx] = val; render(); }\nfunction renderStrList(mode, key){\n  const el = document.getElementById(STR_LIST_EL[mode+'.'+key]);\n  if(!el) return;\n  el.innerHTML = \"\";\n  state[mode][key].forEach((val, idx)=>{\n    const row = document.createElement('div');\n    row.className = 'row-item';\n    row.innerHTML = `<textarea rows=\"2\" oninput=\"updateStrRow('${mode}','${key}',${idx},this.value)\">${escapeHtml(val)}<\/textarea>\n      <button class=\"icon-btn\" onclick=\"removeStrRow('${mode}','${key}',${idx})\">\u2715<\/button>`;\n    el.appendChild(row);\n  });\n}\n\nfunction addObjRow(mode, key){\n  const template = {};\n  OBJ_CONFIG[mode+'.'+key].forEach(f=> template[f.k] = (f.k==='acctName' ? 'WeCollect Data Gathering LTD' : ''));\n  state[mode][key].push(template);\n  renderObjList(mode,key); render();\n}\nfunction removeObjRow(mode, key, idx){ state[mode][key].splice(idx,1); renderObjList(mode,key); render(); }\nfunction updateObjRow(mode, key, idx, field, val){ state[mode][key][idx][field] = val; render(); }\nfunction renderObjList(mode, key){\n  const el = document.getElementById(ROW_LIST_EL[mode+'.'+key]);\n  if(!el) return;\n  const cfg = OBJ_CONFIG[mode+'.'+key];\n  el.innerHTML = \"\";\n  state[mode][key].forEach((row, idx)=>{\n    const div = document.createElement('div');\n    div.className = 'obj-row';\n    const inputFields = cfg.filter(f=>f.type==='input');\n    const textFields = cfg.filter(f=>f.type==='textarea');\n    let topHtml = '<div class=\"obj-row-top\">';\n    inputFields.forEach(f=>{\n      topHtml += `<input type=\"text\" placeholder=\"${escapeAttr(f.ph)}\" value=\"${escapeAttr(row[f.k])}\" oninput=\"updateObjRow('${mode}','${key}',${idx},'${f.k}',this.value)\">`;\n    });\n    topHtml += `<button class=\"icon-btn\" onclick=\"removeObjRow('${mode}','${key}',${idx})\">\u2715<\/button><\/div>`;\n    let taHtml = '';\n    textFields.forEach(f=>{\n      taHtml += `<textarea rows=\"2\" placeholder=\"${escapeAttr(f.ph)}\" oninput=\"updateObjRow('${mode}','${key}',${idx},'${f.k}',this.value)\">${escapeHtml(row[f.k])}<\/textarea>`;\n    });\n    div.innerHTML = topHtml + taHtml;\n    el.appendChild(div);\n  });\n}\n\nfunction toggleDepositUI(){\n  document.getElementById('depositFields').style.display = state.invoice.depositEnabled ? 'block' : 'none';\n  render();\n}\n\nfunction parseMoney(str){ const n = parseFloat((str||\"\").toString().replace(/[^\\d.]/g,\"\")); return isNaN(n)?0:n; }\nfunction formatMoney(n){ return \"\u20a6\" + n.toLocaleString('en-NG',{maximumFractionDigits:2}); }\n\n/* =========================================================\n   SCREEN NAVIGATION\n========================================================= */\nfunction goTo(screen){\n  document.getElementById('screenSelect').style.display = screen==='select' ? 'flex' : 'none';\n  document.getElementById('screenInput').style.display = screen==='input' ? 'flex' : 'none';\n  document.getElementById('screenEdit').style.display = screen==='edit' ? 'grid' : 'none';\n  window.scrollTo(0,0);\n}\n\nfunction selectTemplate(mode){\n  currentMode = mode;\n  document.getElementById('inputTitle').textContent = \"Describe the project \u2014 \" + TPL_NAMES[mode];\n  document.getElementById('aiError').style.display = 'none';\n  document.getElementById('pasteText').value = \"\";\n  uploadedFileText = \"\";\n  document.getElementById('dropZone').classList.remove('hasfile');\n  document.getElementById('dropZone').innerHTML = `\ud83d\udcce Upload a .txt or .docx file (notes, a past brief, an RFP)<br><input type=\"file\" id=\"fileInput\" accept=\".txt,.docx\" onchange=\"handleFile(this.files[0])\">`;\n  document.getElementById('estRow').style.display = (mode==='quote'||mode==='invoice') ? 'flex' : 'none';\n  document.getElementById('estimateBox').checked = false;\n  setInputTab('paste');\n  goTo('input');\n}\n\nfunction setInputTab(tab){\n  inputTab = tab;\n  document.getElementById('tabPaste').classList.toggle('active', tab==='paste');\n  document.getElementById('tabUpload').classList.toggle('active', tab==='upload');\n  document.getElementById('pasteTab').style.display = tab==='paste' ? 'block' : 'none';\n  document.getElementById('uploadTab').style.display = tab==='upload' ? 'block' : 'none';\n}\n\nasync function handleFile(file){\n  if(!file) return;\n  const zone = document.getElementById('dropZone');\n  try{\n    if(file.name.toLowerCase().endsWith('.docx')){\n      const arrayBuffer = await file.arrayBuffer();\n      const result = await mammoth.extractRawText({arrayBuffer});\n      uploadedFileText = result.value || \"\";\n    } else {\n      uploadedFileText = await file.text();\n    }\n    zone.classList.add('hasfile');\n    zone.innerHTML = `\u2705 Loaded \"${escapeHtml(file.name)}\" (${uploadedFileText.length.toLocaleString()} characters)<br><input type=\"file\" id=\"fileInput\" accept=\".txt,.docx\" onchange=\"handleFile(this.files[0])\">`;\n  }catch(err){\n    zone.innerHTML = `\u26a0\ufe0f Couldn't read that file. Try a .txt file, or paste the text instead.<br><input type=\"file\" id=\"fileInput\" accept=\".txt,.docx\" onchange=\"handleFile(this.files[0])\">`;\n  }\n}\n\nfunction skipAI(){\n  state[currentMode] = freshState()[currentMode];\n  if(currentMode==='invoice'){ state.invoice.invNo = INIT.next_number||''; state.invoice.invDate = todayStr(); }\n  enterEditScreen();\n}\n\n/* =========================================================\n   AI GENERATION\n========================================================= */\nconst SCHEMA_INSTRUCTIONS = {\n  brief: `Return ONLY a JSON object with exactly these keys:\n{\n \"title\": string (project title),\n \"tagline\": string (one sentence summarizing the project's aim),\n \"geo\": string (geographic coverage, comma separated, empty string if not mentioned),\n \"objectives\": string[] (3-6 objectives, each \"Bold Label: one sentence explanation\" style),\n \"respondents\": string (description of target respondent groups, sample sizes if stated),\n \"method\": string[] (3-5 methodology / quality-control bullet points, mention geo-tagging, timestamping, real-time quality assurance and the WeCollect app where relevant),\n \"costRangeText\": string (indicative cost per interview/respondent ONLY if a figure is explicitly given in the source text; otherwise empty string \u2014 never invent a number),\n \"deliver\": string[] (1-3 deliverables, e.g. cleaned dataset),\n \"nextSteps\": string[] (3-5 next steps, typical WeCollect next steps are: review and sign ToR, review and finalize questionnaire, approve timeline and budget, commence field deployment)\n}`,\n  quote: `Return ONLY a JSON object with exactly these keys:\n{\n \"title\": string (project title),\n \"tagline\": string (one sentence summarizing the project's aim),\n \"geo\": string (geographic coverage, empty string if not mentioned),\n \"objectives\": string[] (3-6 specific objectives),\n \"costItems\": [{\"activity\": string (cost category e.g. \"Field Enumeration & Profiling\"), \"budget\": string (a Naira figure like \"\u20a6500,000\" ONLY if explicitly stated in the source text, otherwise empty string \u2014 never invent a number), \"desc\": string (short description of what this covers)}] (list every distinct cost category mentioned, otherwise a reasonable set of standard categories: Baseline Mapping, Field Enumeration & Profiling, Project Management & Supervision, Data Visualization & Reporting, Contingency, each with empty budget if not stated),\n \"taxRate\": number (default 7.5 unless stated otherwise),\n \"milestones\": [{\"phase\": string (e.g. \"Set up and Mobilization\"), \"duration\": string (e.g. \"Week 1-2\", empty string if not stated), \"desc\": string (key activities in this phase)}] (3-5 phases),\n \"nextSteps\": string[] (3-5 next steps)\n}`,\n  invoice: `Return ONLY a JSON object with exactly these keys:\n{\n \"invDate\": string (date if mentioned, else empty string),\n \"billName\": string (contact person name),\n \"billCompany\": string (company/organization name),\n \"invDesc\": string (one to two sentence project description),\n \"items\": [{\"item\": string (line item description), \"units\": string (quantity, e.g. \"1\" or \"5000\"), \"cost\": string (cost PER UNIT in Naira, ONLY if explicitly stated or calculable from a stated total \u00f7 units; otherwise empty string \u2014 never invent a figure)}],\n \"vatExempt\": boolean (true only if source text explicitly says the client is VAT exempt),\n \"vatExemptNote\": string (e.g. \"NB: [Org] is exempted from VAT\" if vatExempt is true, else empty string),\n \"depositPercent\": number|null (percentage if a deposit/upfront payment is explicitly mentioned, else null),\n \"notes\": string (any special payment instructions mentioned, else empty string)\n}`,\n  proposal: `Return ONLY a JSON object with exactly these keys:\n{\n \"title\": string (proposal title),\n \"org\": string (the client organization this is prepared for),\n \"subtitle\": string (a case-study qualifier if relevant, e.g. \"A Bayelsa and Delta States Case Study\", else empty string),\n \"execSummary\": string (2-4 sentence executive summary paragraph),\n \"objectives\": [{\"title\": string (short objective name), \"desc\": string (1-2 sentence explanation)}] (3-6 objectives),\n \"scope\": string (1-3 sentence paragraph describing what the project covers geographically and thematically),\n \"methodology\": [{\"title\": string (methodology component name), \"desc\": string (1-2 sentences)}] (3-5 components),\n \"technology\": [{\"title\": string (technology/tool component name), \"desc\": string (1-2 sentences)}] (2-4 components, mention mobile data collection, GIS/geospatial tools, dashboards where relevant),\n \"phases\": [{\"phase\": string (e.g. \"Phase 1\"), \"title\": string (phase name e.g. \"Planning and System Design\"), \"desc\": string (1-2 sentence description of key activities)}] (4-6 phases),\n \"deliverables\": [{\"category\": string (e.g. \"Databases\", \"Reports\", \"Maps\", \"Dashboard\"), \"desc\": string (1-2 sentences on what's included)}] (3-5 categories),\n \"nextSteps\": string[] (4-7 next steps)\n}`\n};\n\nfunction buildPrompt(mode, sourceText){\n  return `You are a data-extraction assistant for WeCollect, a Nigerian data-gathering infrastructure company (field data collection, geo-verification, quality control for research and market studies).\n\nA WeCollect team member has pasted raw notes describing a project. Extract and structure the relevant details into the JSON schema below for a \"${TPL_NAMES[mode]}\" document.\n\nCRITICAL RULES:\n- Respond with ONLY the JSON object. No markdown code fences, no explanation before or after.\n- Only include specific numbers (costs, budgets, sample sizes, percentages, dates) if they are explicitly stated or directly calculable from the source text. If a number is not stated, use an empty string (\"\") or null \u2014 never invent, estimate, or guess a figure.\n- Keep each text field concise (1-2 sentences) since output length is limited.\n- If the source text is sparse, still produce a complete, well-structured JSON using sensible generic WeCollect-style section content for fields with no source information, but leave all numeric/monetary fields empty rather than fabricated.\n\n${SCHEMA_INSTRUCTIONS[mode]}\n\nSOURCE TEXT:\n\"\"\"\n${sourceText.slice(0, 6000)}\n\"\"\"`;\n}\n\nfunction stripCodeFences(text){\n  let t = text.trim();\n  t = t.replace(/^```(?:json)?\\s*/i, '').replace(/```\\s*$/,'');\n  return t.trim();\n}\nfunction asArray(x){ return Array.isArray(x) ? x : []; }\nfunction asStr(x){ return (typeof x === 'string') ? x : (x==null ? \"\" : String(x)); }\nfunction asNum(x, fallback){ const n = Number(x); return isNaN(n) ? fallback : n; }\nfunction asBool(x){ return x === true; }\n\nfunction normalize(mode, obj){\n  const f = freshState()[mode];\n  if(mode==='brief'){\n    return {\n      title: asStr(obj.title)||f.title, tagline: asStr(obj.tagline), geo: asStr(obj.geo),\n      objectives: asArray(obj.objectives).map(asStr).filter(Boolean).length ? asArray(obj.objectives).map(asStr) : f.objectives,\n      respondents: asStr(obj.respondents), method: asArray(obj.method).map(asStr).filter(Boolean).length ? asArray(obj.method).map(asStr) : f.method,\n      costRangeText: asStr(obj.costRangeText),\n      deliver: asArray(obj.deliver).map(asStr).filter(Boolean).length ? asArray(obj.deliver).map(asStr) : f.deliver,\n      nextSteps: asArray(obj.nextSteps).map(asStr).filter(Boolean).length ? asArray(obj.nextSteps).map(asStr) : f.nextSteps\n    };\n  }\n  if(mode==='quote'){\n    return {\n      title: asStr(obj.title)||f.title, tagline: asStr(obj.tagline), geo: asStr(obj.geo),\n      objectives: asArray(obj.objectives).map(asStr).filter(Boolean).length ? asArray(obj.objectives).map(asStr) : f.objectives,\n      costItems: asArray(obj.costItems).map(r=>({activity:asStr(r.activity),budget:asStr(r.budget),desc:asStr(r.desc)})),\n      taxRate: asNum(obj.taxRate, 7.5),\n      milestones: asArray(obj.milestones).map(r=>({phase:asStr(r.phase),duration:asStr(r.duration),desc:asStr(r.desc)})),\n      nextSteps: asArray(obj.nextSteps).map(asStr).filter(Boolean).length ? asArray(obj.nextSteps).map(asStr) : f.nextSteps\n    };\n  }\n  if(mode==='invoice'){\n    return {\n      invNo: INIT.next_number||\"\", invDate: asStr(obj.invDate)||todayStr(), billName: asStr(obj.billName), billCompany: asStr(obj.billCompany),\n      invDesc: asStr(obj.invDesc),\n      items: asArray(obj.items).map(r=>({item:asStr(r.item),units:asStr(r.units)||\"1\",cost:asStr(r.cost)})),\n      taxRate: 7.5, vatExempt: asBool(obj.vatExempt), vatExemptNote: asStr(obj.vatExemptNote),\n      depositEnabled: obj.depositPercent!=null && obj.depositPercent!==\"\", depositPercent: asNum(obj.depositPercent, 50),\n      payments: payDefault(), notes: asStr(obj.notes)\n    };\n  }\n  if(mode==='proposal'){\n    return {\n      title: asStr(obj.title)||f.title, org: asStr(obj.org), subtitle: asStr(obj.subtitle),\n      execSummary: asStr(obj.execSummary),\n      objectives: asArray(obj.objectives).map(r=>({title:asStr(r.title),desc:asStr(r.desc)})),\n      scope: asStr(obj.scope),\n      methodology: asArray(obj.methodology).map(r=>({title:asStr(r.title),desc:asStr(r.desc)})),\n      technology: asArray(obj.technology).map(r=>({title:asStr(r.title),desc:asStr(r.desc)})),\n      phases: asArray(obj.phases).map(r=>({phase:asStr(r.phase),title:asStr(r.title),desc:asStr(r.desc)})),\n      deliverables: asArray(obj.deliverables).map(r=>({category:asStr(r.category),desc:asStr(r.desc)})),\n      nextSteps: asArray(obj.nextSteps).map(asStr).filter(Boolean).length ? asArray(obj.nextSteps).map(asStr) : f.nextSteps\n    };\n  }\n}\n\n/* ---- bridge to WeCollect OS (the parent page does the AI call and the Drive save) ---- */\nconst pending = {}; let seq = 0;\nwindow.addEventListener('message', e => {\n  if(e.source !== parent) return;\n  const m = e.data || {};\n  if(m.wcgen === 'reply' && pending[m.id]){ pending[m.id](m.res); delete pending[m.id]; }\n  if(m.wcgen === 'init'){ INIT = Object.assign(INIT, m.init||{}); applyInit(); }\n});\nfunction bridge(op, payload){ return new Promise(resolve => { const id = ++seq; pending[id] = resolve; parent.postMessage({wcgen:'call', id, op, payload}, '*'); setTimeout(()=>{ if(pending[id]){ delete pending[id]; resolve({ok:false,error:'The system did not answer in time. Try again.'}); } }, 170000); }); }\nfunction closeGen(){ parent.postMessage({wcgen:'close'}, '*'); }\nfunction applyInit(){\n  document.querySelectorAll('.tpl-card').forEach(c => { c.style.display = INIT.modes.indexOf(c.dataset.mode) > -1 ? '' : 'none'; });\n  const dc = document.getElementById('dlClients'); dc.innerHTML = (INIT.clients||[]).map(c=>'<option value=\"'+escapeAttr(c.name)+'\">').join('');\n  syncProjects();\n}\nfunction syncProjects(){\n  const cl = (INIT.clients||[]).filter(c => c.name.toLowerCase() === (saveCtx.client||'').trim().toLowerCase())[0];\n  const list = (INIT.projects||[]).filter(p => !cl || !p.client_id || p.client_id === cl.client_id);\n  document.getElementById('dlProjects').innerHTML = list.map(p=>'<option value=\"'+escapeAttr(p.name)+'\">').join('');\n}\nasync function generateWithAI(){\n  const sourceText = inputTab === 'paste' ? document.getElementById('pasteText').value.trim() : uploadedFileText.trim();\n  if(!sourceText){ showAiError(\"Please paste some text or upload a file first.\"); return; }\n  document.getElementById('aiError').style.display = 'none';\n  document.getElementById('aiStatus').style.display = 'flex';\n  const btn = document.querySelector('.gen-btn'); btn.disabled = true;\n  try{\n    const est = document.getElementById('estimateBox').checked;\n    const res = await bridge('generateDocumentDraft', { mode: currentMode, text: sourceText, estimate: est });\n    if(!res || !res.ok) throw new Error((res && res.error) || 'No answer');\n    if(res.payments && res.payments.length) INIT.payments = res.payments;\n    if(res.next_number) INIT.next_number = res.next_number;\n    state[currentMode] = normalize(currentMode, res.data || {});\n    enterEditScreen();\n  }catch(err){\n    showAiError(\"Something went wrong reading that input (\" + err.message + \"). You can try again, or start with a blank template and fill it in manually.\");\n  }finally{\n    document.getElementById('aiStatus').style.display = 'none';\n    btn.disabled = false;\n  }\n}\nfunction showAiError(msg){\n  const el = document.getElementById('aiError');\n  el.textContent = msg;\n  el.style.display = 'block';\n}\n\n/* =========================================================\n   ENTER EDIT SCREEN \u2014 populate form fields from state\n========================================================= */\nfunction enterEditScreen(){\n  document.getElementById('tplBadge').textContent = TPL_NAMES[currentMode];\n  ['fieldsBrief','fieldsQuote','fieldsInvoice','fieldsProposal'].forEach(id=> document.getElementById(id).style.display='none');\n  const map = {brief:'fieldsBrief', quote:'fieldsQuote', invoice:'fieldsInvoice', proposal:'fieldsProposal'};\n  document.getElementById(map[currentMode]).style.display = 'block';\n\n  if(currentMode==='brief'){\n    document.getElementById('brief_title').value = state.brief.title;\n    document.getElementById('brief_tagline').value = state.brief.tagline;\n    document.getElementById('brief_geo').value = state.brief.geo;\n    document.getElementById('brief_respondents').value = state.brief.respondents;\n    document.getElementById('brief_costRangeText').value = state.brief.costRangeText;\n    renderStrList('brief','objectives'); renderStrList('brief','method'); renderStrList('brief','deliver'); renderStrList('brief','nextSteps');\n  }\n  if(currentMode==='quote'){\n    document.getElementById('quote_title').value = state.quote.title;\n    document.getElementById('quote_tagline').value = state.quote.tagline;\n    document.getElementById('quote_geo').value = state.quote.geo;\n    document.getElementById('quote_taxRate').value = state.quote.taxRate;\n    renderStrList('quote','objectives'); renderStrList('quote','nextSteps');\n    renderObjList('quote','costItems'); renderObjList('quote','milestones');\n  }\n  if(currentMode==='invoice'){\n    document.getElementById('invoice_invNo').value = state.invoice.invNo;\n    document.getElementById('invoice_invDate').value = state.invoice.invDate;\n    document.getElementById('invoice_billName').value = state.invoice.billName;\n    document.getElementById('invoice_billCompany').value = state.invoice.billCompany;\n    document.getElementById('invoice_invDesc').value = state.invoice.invDesc;\n    document.getElementById('invoice_taxRate').value = state.invoice.taxRate;\n    document.getElementById('invoice_vatExempt').checked = state.invoice.vatExempt;\n    document.getElementById('invoice_vatExemptNote').value = state.invoice.vatExemptNote;\n    document.getElementById('invoice_depositEnabled').checked = state.invoice.depositEnabled;\n    document.getElementById('invoice_depositPercent').value = state.invoice.depositPercent;\n    toggleDepositUI();\n    renderObjList('invoice','items'); renderObjList('invoice','payments');\n  }\n  if(currentMode==='proposal'){\n    document.getElementById('proposal_title').value = state.proposal.title;\n    document.getElementById('proposal_org').value = state.proposal.org;\n    document.getElementById('proposal_subtitle').value = state.proposal.subtitle;\n    document.getElementById('proposal_execSummary').value = state.proposal.execSummary;\n    document.getElementById('proposal_scope').value = state.proposal.scope;\n    renderStrList('proposal','nextSteps');\n    renderObjList('proposal','objectives'); renderObjList('proposal','methodology');\n    renderObjList('proposal','technology'); renderObjList('proposal','phases'); renderObjList('proposal','deliverables');\n  }\n\n  document.getElementById('saveMsg').style.display='none'; document.getElementById('saveBtn').disabled=false;\n  goTo('edit');\n  render();\n}\n\n/* =========================================================\n   PREVIEW RENDER\n========================================================= */\nfunction render(){\n  if(currentMode==='brief') renderBrief();\n  else if(currentMode==='quote') renderQuote();\n  else if(currentMode==='invoice') renderInvoice();\n  else if(currentMode==='proposal') renderProposal();\n}\n\nfunction renderBrief(){\n  const s = state.brief;\n  const html = `\n    <div class=\"p-header\">\n      <h1>${escapeHtml(s.title||\"Untitled Project\")}<\/h1>\n      <p>${escapeHtml(s.tagline||\"Add a one-line summary of what this project aims to achieve.\")}<\/p>\n      ${s.geo ? `<div class=\"geo\">\ud83d\udccd Geographic Coverage: ${escapeHtml(s.geo)}<\/div>` : \"\"}\n    <\/div>\n    <div class=\"p-body\">\n      <div class=\"cols\">\n        <div>\n          <h2>Project Objectives<\/h2>\n          <ol>${s.objectives.map(o=>`<li>${escapeHtml(o)}<\/li>`).join(\"\")}<\/ol>\n          <h2>Methodology &amp; Quality Control<\/h2>\n          <ul>${s.method.map(m=>`<li>${escapeHtml(m)}<\/li>`).join(\"\")}<\/ul>\n        <\/div>\n        <div>\n          ${s.respondents.trim() ? `<h2>Target Respondents<\/h2><p style=\"white-space:pre-line\">${escapeHtml(s.respondents)}<\/p>` : \"\"}\n          ${s.costRangeText.trim() ? `<h2>Indicative Cost Range<\/h2><p style=\"white-space:pre-line\">${escapeHtml(s.costRangeText)}<\/p>\n          <div class=\"disclaimer\">Final pricing will be confirmed after questionnaire review and specific location deployment planning.<\/div>` : \"\"}\n        <\/div>\n      <\/div>\n      <h2>Deliverables<\/h2>\n      <ul>${s.deliver.map(d=>`<li>${escapeHtml(d)}<\/li>`).join(\"\")}<\/ul>\n      <h2>Next Steps<\/h2>\n      <ol>${s.nextSteps.map(n=>`<li>${escapeHtml(n)}<\/li>`).join(\"\")}<\/ol>\n    <\/div>\n    <div class=\"p-footer\">\n      <div class=\"logo\"><span class=\"we\">we<\/span><span class=\"collect\">collect<\/span><\/div>\n      <div class=\"addr\">www.wecollect.tech<br>D207 &amp; D208 Ikota Complex, Lekki VGC<\/div>\n    <\/div>`;\n  document.getElementById('previewPage').innerHTML = html;\n}\n\nfunction computeQuoteTotals(){\n  const subtotal = state.quote.costItems.reduce((sum,r)=> sum + parseMoney(r.budget), 0);\n  const tax = subtotal * (state.quote.taxRate/100);\n  return { subtotal, tax, total: subtotal+tax };\n}\nfunction renderQuote(){\n  const s = state.quote; const t = computeQuoteTotals();\n  const html = `\n    <div class=\"p-header\">\n      <h1>${escapeHtml(s.title||\"Untitled Project\")}<\/h1>\n      <p>${escapeHtml(s.tagline||\"Add a one-line summary of what this project aims to achieve.\")}<\/p>\n      ${s.geo ? `<div class=\"geo\">\ud83d\udccd Geographic Coverage: ${escapeHtml(s.geo)}<\/div>` : \"\"}\n    <\/div>\n    <div class=\"p-body\">\n      <h2>Specific Objectives<\/h2>\n      <ul>${s.objectives.map(o=>`<li>${escapeHtml(o)}<\/li>`).join(\"\")}<\/ul>\n\n      <h2>Cost Summary<\/h2>\n      <table>\n        <tr><th>Activity / Cost Category<\/th><th>Budget<\/th><th>Description<\/th><\/tr>\n        ${s.costItems.map(r=>`<tr><td>${escapeHtml(r.activity)}<\/td><td>${escapeHtml(r.budget)}<\/td><td>${escapeHtml(r.desc)}<\/td><\/tr>`).join(\"\")}\n        <tr><td>Sub-Total<\/td><td>${formatMoney(t.subtotal)}<\/td><td><\/td><\/tr>\n        <tr><td>Tax (${s.taxRate}%)<\/td><td>${formatMoney(t.tax)}<\/td><td><\/td><\/tr>\n        <tr class=\"total-row\"><td>Total<\/td><td>${formatMoney(t.total)}<\/td><td><\/td><\/tr>\n      <\/table>\n      <div class=\"disclaimer\">Final pricing will be confirmed after questionnaire review and specific location deployment planning.<\/div>\n\n      <h2>Implementation Timeline<\/h2>\n      <table>\n        <tr><th>Phase<\/th><th>Duration<\/th><th>Key Activities<\/th><\/tr>\n        ${s.milestones.map(r=>`<tr><td>${escapeHtml(r.phase)}<\/td><td>${escapeHtml(r.duration)}<\/td><td>${escapeHtml(r.desc)}<\/td><\/tr>`).join(\"\")}\n      <\/table>\n\n      <h2>Next Steps<\/h2>\n      <ol>${s.nextSteps.map(n=>`<li>${escapeHtml(n)}<\/li>`).join(\"\")}<\/ol>\n    <\/div>\n    <div class=\"p-footer\">\n      <div class=\"logo\"><span class=\"we\">we<\/span><span class=\"collect\">collect<\/span><\/div>\n      <div class=\"addr\">www.wecollect.tech<br>D207 &amp; D208 Ikota Complex, Lekki VGC<\/div>\n    <\/div>`;\n  document.getElementById('previewPage').innerHTML = html;\n}\n\nfunction computeInvoiceTotals(){\n  const s = state.invoice;\n  const lineTotals = s.items.map(r=> parseMoney(r.units) * parseMoney(r.cost));\n  const subtotal = lineTotals.reduce((a,b)=>a+b,0);\n  const taxRate = s.vatExempt ? 0 : s.taxRate;\n  const tax = subtotal * (taxRate/100);\n  const total = subtotal + tax;\n  const deposit = s.depositEnabled ? total * (s.depositPercent/100) : 0;\n  const balance = total - deposit;\n  return { lineTotals, subtotal, taxRate, tax, total, deposit, balance };\n}\nfunction renderInvoice(){\n  const s = state.invoice; const t = computeInvoiceTotals();\n  let itemsHtml = \"\";\n  s.items.forEach((row, idx)=>{\n    itemsHtml += `<tr><td>${idx+1}<\/td><td>${escapeHtml(row.item)}<\/td><td class=\"num\">${escapeHtml(row.units)}<\/td><td class=\"num\">${escapeHtml(row.cost)}<\/td><td class=\"num\">${formatMoney(t.lineTotals[idx])}<\/td><\/tr>`;\n  });\n  let paymentHtml = \"\";\n  s.payments.forEach(p=>{ paymentHtml += `<div class=\"opt\"><b>${escapeHtml(p.bank)}<\/b><br>${escapeHtml(p.acctName)}<br>${escapeHtml(p.acctNumber)}<\/div>`; });\n\n  const html = `\n    <div class=\"inv-page\">\n      <div class=\"inv-top\">\n        <div>\n          <div class=\"logo\"><span class=\"we\">we<\/span><span class=\"collect\">collect<\/span><\/div>\n          <div class=\"tagline\">Insight generation, made easy<\/div>\n        <\/div>\n        <div class=\"inv-meta\">\n          <div class=\"inv-no\">Invoice No: ${escapeHtml(s.invNo || 'WC00000')}<\/div>\n          <div>Date: ${escapeHtml(s.invDate)}<\/div>\n        <\/div>\n      <\/div>\n      <div class=\"inv-billto\">\n        <div class=\"lbl\">Billed to<\/div>\n        <div class=\"name\">${escapeHtml(s.billName)}<\/div>\n        <div class=\"co\">${escapeHtml(s.billCompany)}<\/div>\n      <\/div>\n      ${s.invDesc ? `<div class=\"inv-desc\"><div class=\"lbl\">Project Description<\/div>${escapeHtml(s.invDesc)}<\/div>` : \"\"}\n      <table class=\"inv-table\">\n        <tr><th>No<\/th><th>Item<\/th><th class=\"num\">Units<\/th><th class=\"num\">Cost<\/th><th class=\"num\">Total<\/th><\/tr>\n        ${itemsHtml}\n      <\/table>\n      <div class=\"inv-totals\">\n        <div><span>Sub-Total<\/span><span>${formatMoney(t.subtotal)}<\/span><\/div>\n        <div><span>Tax (${t.taxRate}%)<\/span><span>${formatMoney(t.tax)}<\/span><\/div>\n        <div class=\"grand\"><span>Total<\/span><span>${formatMoney(t.total)}<\/span><\/div>\n        ${s.depositEnabled ? `<div><span>Deposit Due (${s.depositPercent}%)<\/span><span>${formatMoney(t.deposit)}<\/span><\/div>\n        <div><span>Balance Due<\/span><span>${formatMoney(t.balance)}<\/span><\/div>` : \"\"}\n      <\/div>\n      ${s.vatExempt && s.vatExemptNote ? `<div class=\"inv-vat-note\">${escapeHtml(s.vatExemptNote)}<\/div>` : \"\"}\n      <div class=\"inv-payment\">\n        <div class=\"lbl\">Payment to<\/div>\n        ${paymentHtml}\n        ${s.notes ? `<div class=\"inv-notes\">${escapeHtml(s.notes)}<\/div>` : \"\"}\n      <\/div>\n      <div class=\"inv-thanks\">THANK YOU<\/div>\n      <div class=\"inv-footer\">www.wecollect.tech &nbsp;|&nbsp; D207 &amp; D208 Ikota Complex, Lekki VGC<\/div>\n    <\/div>`;\n  document.getElementById('previewPage').innerHTML = html;\n}\n\nfunction renderProposal(){\n  const s = state.proposal;\n  const html = `\n    <div class=\"p-header\">\n      <div class=\"org\">${escapeHtml(s.org ? \"Proposal for \"+s.org : \"\")}<\/div>\n      <h1>${escapeHtml(s.title||\"Untitled Proposal\")}<\/h1>\n      ${s.subtitle ? `<p>${escapeHtml(s.subtitle)}<\/p>` : \"\"}\n    <\/div>\n    <div class=\"p-body\">\n      <h2>Executive Summary<\/h2>\n      <p style=\"white-space:pre-line\">${escapeHtml(s.execSummary)}<\/p>\n\n      <h2>Project Objectives<\/h2>\n      ${s.objectives.map((o,i)=>`<div class=\"obj-block\"><div class=\"t\">${i+1}. ${escapeHtml(o.title)}<\/div><p>${escapeHtml(o.desc)}<\/p><\/div>`).join(\"\")}\n\n      <h2>Project Scope<\/h2>\n      <p style=\"white-space:pre-line\">${escapeHtml(s.scope)}<\/p>\n\n      <h2>Methodology<\/h2>\n      ${s.methodology.map(m=>`<div class=\"obj-block\"><div class=\"t\">${escapeHtml(m.title)}<\/div><p>${escapeHtml(m.desc)}<\/p><\/div>`).join(\"\")}\n\n      <h2>Technology<\/h2>\n      ${s.technology.map(m=>`<div class=\"obj-block\"><div class=\"t\">${escapeHtml(m.title)}<\/div><p>${escapeHtml(m.desc)}<\/p><\/div>`).join(\"\")}\n\n      <h2>Implementation Plan<\/h2>\n      ${s.phases.map(p=>`<div class=\"phase-block\"><div class=\"plabel\">${escapeHtml(p.phase)}<\/div><div class=\"ptitle\">${escapeHtml(p.title)}<\/div><p>${escapeHtml(p.desc)}<\/p><\/div>`).join(\"\")}\n\n      <h2>Deliverables<\/h2>\n      ${s.deliverables.map(d=>`<div class=\"obj-block\"><div class=\"t\">${escapeHtml(d.category)}<\/div><p>${escapeHtml(d.desc)}<\/p><\/div>`).join(\"\")}\n\n      <h2>Next Steps<\/h2>\n      <ol>${s.nextSteps.map(n=>`<li>${escapeHtml(n)}<\/li>`).join(\"\")}<\/ol>\n    <\/div>\n    <div class=\"p-footer\">\n      <div class=\"logo\"><span class=\"we\">we<\/span><span class=\"collect\">collect<\/span><\/div>\n      <div class=\"addr\">www.wecollect.tech<br>D207 &amp; D208 Ikota Complex, Lekki VGC<\/div>\n    <\/div>`;\n  document.getElementById('previewPage').innerHTML = html;\n}\n\n/* =========================================================\n   WORD (.docx) EXPORT\n========================================================= */\nasync function buildDocBlob(){\n  if(!window.docx){ throw new Error(\"The Word export library is still loading. Please wait a second and try again.\"); }\n  const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType, ShadingType, AlignmentType } = window.docx;\n  const PURPLE=\"4B3FCF\", PURPLE_DARK=\"372E9E\", LIGHT=\"EFEDFC\", RED=\"D64545\", GRAY=\"6B6880\";\n\n  function heading(text){ return new Paragraph({ children:[new TextRun({text,bold:true,size:26,color:PURPLE_DARK})], spacing:{before:200,after:100} }); }\n  function subheading(text){ return new Paragraph({ children:[new TextRun({text,bold:true,size:21,color:\"1B1730\"})], spacing:{before:120,after:40} }); }\n  function bodyText(text){ return new Paragraph({ text:text||\"\", spacing:{after:100} }); }\n  function bullet(text){ return new Paragraph({ text, bullet:{level:0}, spacing:{after:60} }); }\n  function numbered(text, ref){ return new Paragraph({ text, numbering:{reference:ref, level:0}, spacing:{after:60} }); }\n  function cell(text, opts={}){\n    return new TableCell({\n      children:[ new Paragraph({ alignment: opts.right?AlignmentType.RIGHT:AlignmentType.LEFT, children:[ new TextRun({text:text||\"\", bold:!!opts.bold, color:opts.color||\"000000\"}) ] }) ],\n      shading: opts.fill ? {type:ShadingType.CLEAR, fill:opts.fill} : undefined,\n      width:{ size: opts.width||20, type:WidthType.PERCENTAGE }\n    });\n  }\n  function headerBlock(title, tagline, geo){\n    const arr = [ new Paragraph({ children:[new TextRun({text:title,bold:true,size:44,color:\"FFFFFF\"})], shading:{type:ShadingType.CLEAR,fill:PURPLE}, spacing:{after:100,before:100} }) ];\n    if(tagline) arr.push(new Paragraph({ children:[new TextRun({text:tagline,size:22,color:\"FFFFFF\"})], shading:{type:ShadingType.CLEAR,fill:PURPLE}, spacing:{after:100} }));\n    if(geo) arr.push(new Paragraph({ children:[new TextRun({text:\"Geographic Coverage: \"+geo,bold:true,size:20,color:\"FFFFFF\"})], shading:{type:ShadingType.CLEAR,fill:PURPLE}, spacing:{after:200} }));\n    arr.push(new Paragraph({text:\"\",spacing:{after:100}}));\n    return arr;\n  }\n  function footerBlock(){\n    return [ new Paragraph({text:\"\",spacing:{before:300}}),\n      new Paragraph({ children:[ new TextRun({text:\"wecollect\",bold:true,italics:true,color:PURPLE}), new TextRun({text:\"   www.wecollect.tech   |   D207 & D208 Ikota Complex, Lekki VGC\",size:16,color:GRAY}) ] }) ];\n  }\n\n  const children = [];\n  const docConfig = {\n    numbering:{ config:[\n      {reference:\"num-a\", levels:[{level:0,format:\"decimal\",text:\"%1.\",alignment:AlignmentType.START}]},\n      {reference:\"num-b\", levels:[{level:0,format:\"decimal\",text:\"%1.\",alignment:AlignmentType.START}]}\n    ]},\n    sections:[]\n  };\n\n  if(currentMode==='brief'){\n    const s = state.brief;\n    children.push(...headerBlock(s.title||\"Untitled Project\", s.tagline, s.geo));\n    children.push(heading(\"Project Objectives\"));\n    s.objectives.forEach(o=>children.push(numbered(o,\"num-a\")));\n    if(s.respondents.trim()){ children.push(heading(\"Target Respondents\")); children.push(bodyText(s.respondents)); }\n    children.push(heading(\"Methodology & Quality Control\"));\n    s.method.forEach(m=>children.push(bullet(m)));\n    if(s.costRangeText.trim()){\n      children.push(heading(\"Indicative Cost Range\"));\n      children.push(bodyText(s.costRangeText));\n      children.push(new Paragraph({children:[new TextRun({text:\"Final pricing will be confirmed after questionnaire review and specific location deployment planning.\",italics:true,color:RED,size:18})],spacing:{after:150}}));\n    }\n    children.push(heading(\"Deliverables\"));\n    s.deliver.forEach(d=>children.push(bullet(d)));\n    children.push(heading(\"Next Steps\"));\n    s.nextSteps.forEach(n=>children.push(numbered(n,\"num-b\")));\n    children.push(...footerBlock());\n  }\n\n  else if(currentMode==='quote'){\n    const s = state.quote; const t = computeQuoteTotals();\n    children.push(...headerBlock(s.title||\"Untitled Project\", s.tagline, s.geo));\n    children.push(heading(\"Specific Objectives\"));\n    s.objectives.forEach(o=>children.push(bullet(o)));\n    children.push(heading(\"Cost Summary\"));\n    const costRows=[ new TableRow({children:[cell(\"Activity / Cost Category\",{bold:true,color:\"FFFFFF\",fill:PURPLE,width:40}),cell(\"Budget\",{bold:true,color:\"FFFFFF\",fill:PURPLE,width:20}),cell(\"Description\",{bold:true,color:\"FFFFFF\",fill:PURPLE,width:40})]}) ];\n    s.costItems.forEach(r=>costRows.push(new TableRow({children:[cell(r.activity,{width:40}),cell(r.budget,{width:20}),cell(r.desc,{width:40})]})));\n    costRows.push(new TableRow({children:[cell(\"Sub-Total\",{bold:true,width:40}),cell(formatMoney(t.subtotal),{bold:true,width:20}),cell(\"\",{width:40})]}));\n    costRows.push(new TableRow({children:[cell(`Tax (${s.taxRate}%)`,{bold:true,width:40}),cell(formatMoney(t.tax),{bold:true,width:20}),cell(\"\",{width:40})]}));\n    costRows.push(new TableRow({children:[cell(\"Total\",{bold:true,fill:LIGHT,width:40}),cell(formatMoney(t.total),{bold:true,fill:LIGHT,width:20}),cell(\"\",{fill:LIGHT,width:40})]}));\n    children.push(new Table({rows:costRows,width:{size:100,type:WidthType.PERCENTAGE}}));\n    children.push(new Paragraph({children:[new TextRun({text:\"Final pricing will be confirmed after questionnaire review and specific location deployment planning.\",italics:true,color:RED,size:18})],spacing:{before:100,after:200}}));\n    children.push(heading(\"Implementation Timeline\"));\n    const msRows=[ new TableRow({children:[cell(\"Phase\",{bold:true,color:\"FFFFFF\",fill:PURPLE,width:25}),cell(\"Duration\",{bold:true,color:\"FFFFFF\",fill:PURPLE,width:20}),cell(\"Key Activities\",{bold:true,color:\"FFFFFF\",fill:PURPLE,width:55})]}) ];\n    s.milestones.forEach(r=>msRows.push(new TableRow({children:[cell(r.phase,{width:25}),cell(r.duration,{width:20}),cell(r.desc,{width:55})]})));\n    children.push(new Table({rows:msRows,width:{size:100,type:WidthType.PERCENTAGE}}));\n    children.push(heading(\"Next Steps\"));\n    s.nextSteps.forEach(n=>children.push(numbered(n,\"num-b\")));\n    children.push(...footerBlock());\n  }\n\n  else if(currentMode==='invoice'){\n    const s = state.invoice; const t = computeInvoiceTotals();\n    const topTable = new Table({\n      width:{size:100,type:WidthType.PERCENTAGE},\n      borders:{top:{style:\"none\"},bottom:{style:\"none\"},left:{style:\"none\"},right:{style:\"none\"},insideHorizontal:{style:\"none\"},insideVertical:{style:\"none\"}},\n      rows:[ new TableRow({children:[\n        new TableCell({width:{size:60,type:WidthType.PERCENTAGE},children:[\n          new Paragraph({children:[new TextRun({text:\"we\",size:32,color:\"1B1730\"}),new TextRun({text:\"collect\",size:32,bold:true,italics:true,color:PURPLE})]}),\n          new Paragraph({children:[new TextRun({text:\"Insight generation, made easy\",size:16,color:GRAY})]})\n        ]}),\n        new TableCell({width:{size:40,type:WidthType.PERCENTAGE},children:[\n          new Paragraph({alignment:AlignmentType.RIGHT,children:[new TextRun({text:\"Invoice No: \"+(s.invNo||\"WC00000\"),bold:true,size:22,color:PURPLE_DARK})]}),\n          new Paragraph({alignment:AlignmentType.RIGHT,children:[new TextRun({text:\"Date: \"+s.invDate,size:18})]})\n        ]})\n      ]}) ]\n    });\n    children.push(topTable);\n    children.push(new Paragraph({text:\"\",spacing:{after:150}}));\n    children.push(new Paragraph({children:[new TextRun({text:\"BILLED TO\",bold:true,size:16,color:GRAY})]}));\n    children.push(new Paragraph({children:[new TextRun({text:s.billName,bold:true,size:22})],spacing:{after:20}}));\n    children.push(new Paragraph({children:[new TextRun({text:s.billCompany,size:20,color:GRAY})],spacing:{after:150}}));\n    if(s.invDesc){\n      children.push(new Paragraph({children:[new TextRun({text:\"PROJECT DESCRIPTION\",bold:true,size:16,color:GRAY})],spacing:{after:40}}));\n      children.push(bodyText(s.invDesc));\n    }\n    const itemRows=[ new TableRow({children:[cell(\"No\",{bold:true,color:\"FFFFFF\",fill:PURPLE,width:6}),cell(\"Item\",{bold:true,color:\"FFFFFF\",fill:PURPLE,width:44}),cell(\"Units\",{bold:true,color:\"FFFFFF\",fill:PURPLE,width:12,right:true}),cell(\"Cost\",{bold:true,color:\"FFFFFF\",fill:PURPLE,width:18,right:true}),cell(\"Total\",{bold:true,color:\"FFFFFF\",fill:PURPLE,width:20,right:true})]}) ];\n    s.items.forEach((r,idx)=>itemRows.push(new TableRow({children:[cell(String(idx+1),{width:6}),cell(r.item,{width:44}),cell(r.units,{width:12,right:true}),cell(r.cost,{width:18,right:true}),cell(formatMoney(t.lineTotals[idx]),{width:20,right:true})]})));\n    children.push(new Table({rows:itemRows,width:{size:100,type:WidthType.PERCENTAGE}}));\n    children.push(new Paragraph({text:\"\",spacing:{after:120}}));\n    function totalLine(label,amount,opts={}){\n      return new Paragraph({alignment:AlignmentType.RIGHT,children:[new TextRun({text:label+\":  \",bold:!!opts.bold,size:opts.bold?22:18}),new TextRun({text:formatMoney(amount),bold:!!opts.bold,size:opts.bold?22:18})],spacing:{after:40}});\n    }\n    children.push(totalLine(\"Sub-Total\",t.subtotal));\n    children.push(totalLine(`Tax (${t.taxRate}%)`,t.tax));\n    children.push(totalLine(\"Total\",t.total,{bold:true}));\n    if(s.depositEnabled){ children.push(totalLine(`Deposit Due (${s.depositPercent}%)`,t.deposit)); children.push(totalLine(\"Balance Due\",t.balance)); }\n    if(s.vatExempt && s.vatExemptNote) children.push(new Paragraph({alignment:AlignmentType.RIGHT,children:[new TextRun({text:s.vatExemptNote,italics:true,size:16,color:GRAY})],spacing:{before:60,after:100}}));\n    children.push(new Paragraph({text:\"\",spacing:{before:200}}));\n    children.push(new Paragraph({children:[new TextRun({text:\"PAYMENT TO\",bold:true,size:16,color:GRAY})],spacing:{after:60}}));\n    s.payments.forEach(p=>{\n      children.push(new Paragraph({children:[new TextRun({text:p.bank,bold:true,size:20,color:PURPLE_DARK})]}));\n      children.push(new Paragraph({children:[new TextRun({text:p.acctName,size:18})]}));\n      children.push(new Paragraph({children:[new TextRun({text:p.acctNumber,size:18})],spacing:{after:120}}));\n    });\n    if(s.notes) children.push(new Paragraph({children:[new TextRun({text:s.notes,italics:true,size:16,color:GRAY})],spacing:{after:150}}));\n    children.push(new Paragraph({alignment:AlignmentType.CENTER,children:[new TextRun({text:\"THANK YOU\",bold:true,size:26,color:PURPLE_DARK})],spacing:{before:200,after:150}}));\n    children.push(new Paragraph({alignment:AlignmentType.CENTER,children:[new TextRun({text:\"www.wecollect.tech  |  D207 & D208 Ikota Complex, Lekki VGC\",size:16,color:GRAY})]}));\n  }\n\n  else if(currentMode==='proposal'){\n    const s = state.proposal;\n    children.push(new Paragraph({children:[new TextRun({text:s.org?(\"Proposal for \"+s.org):\"\",size:18,color:\"FFFFFF\"})],shading:{type:ShadingType.CLEAR,fill:PURPLE},spacing:{before:100}}));\n    children.push(new Paragraph({children:[new TextRun({text:s.title||\"Untitled Proposal\",bold:true,size:40,color:\"FFFFFF\"})],shading:{type:ShadingType.CLEAR,fill:PURPLE},spacing:{after: s.subtitle?60:150}}));\n    if(s.subtitle) children.push(new Paragraph({children:[new TextRun({text:s.subtitle,size:20,color:\"FFFFFF\"})],shading:{type:ShadingType.CLEAR,fill:PURPLE},spacing:{after:150}}));\n    children.push(new Paragraph({text:\"\",spacing:{after:100}}));\n\n    children.push(heading(\"Executive Summary\"));\n    children.push(bodyText(s.execSummary));\n\n    children.push(heading(\"Project Objectives\"));\n    s.objectives.forEach((o,i)=>{ children.push(subheading((i+1)+\". \"+o.title)); children.push(bodyText(o.desc)); });\n\n    children.push(heading(\"Project Scope\"));\n    children.push(bodyText(s.scope));\n\n    children.push(heading(\"Methodology\"));\n    s.methodology.forEach(m=>{ children.push(subheading(m.title)); children.push(bodyText(m.desc)); });\n\n    children.push(heading(\"Technology\"));\n    s.technology.forEach(m=>{ children.push(subheading(m.title)); children.push(bodyText(m.desc)); });\n\n    children.push(heading(\"Implementation Plan\"));\n    s.phases.forEach(p=>{ children.push(subheading(p.phase+\": \"+p.title)); children.push(bodyText(p.desc)); });\n\n    children.push(heading(\"Deliverables\"));\n    s.deliverables.forEach(d=>{ children.push(subheading(d.category)); children.push(bodyText(d.desc)); });\n\n    children.push(heading(\"Next Steps\"));\n    s.nextSteps.forEach(n=>children.push(numbered(n,\"num-a\")));\n\n    children.push(...footerBlock());\n  }\n\n  docConfig.sections.push({children});\n  const doc = new Document(docConfig);\n  const blob = await Packer.toBlob(doc);\n  const titleField = currentMode==='invoice' ? (state.invoice.invNo||'WeCollect_Invoice') : (state[currentMode].title || ('WeCollect_'+TPL_NAMES[currentMode]));\n  const suffix = {brief:'_Brief',quote:'_Quote',invoice:'_Invoice',proposal:'_Proposal'}[currentMode];\n  const filename = titleField.replace(/[^a-z0-9]+/gi,\"_\") + suffix + \".docx\";\n  return { blob, filename };\n}\nfunction saveBlobAs(blob, filename){\n  const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = filename; document.body.appendChild(a); a.click();\n  setTimeout(()=>{ URL.revokeObjectURL(a.href); a.remove(); }, 1500);\n}\nasync function downloadWord(){\n  try{ const r = await buildDocBlob(); saveBlobAs(r.blob, r.filename); }catch(e){ alert(e.message); }\n}\nfunction printDoc(){ try{ window.focus(); window.print(); }catch(e){ alert('Printing is blocked here. Download the Word file and save it as PDF from Word.'); } }\nfunction blobToBase64(blob){ return new Promise((res,rej)=>{ const r=new FileReader(); r.onload=()=>res(String(r.result).split(',')[1]||''); r.onerror=()=>rej(new Error('Could not read the file')); r.readAsDataURL(blob); }); }\nfunction docMeta(){\n  const TYPE = {brief:'Brief',quote:'Quote',invoice:'Invoice',proposal:'Proposal'}[currentMode];\n  if(currentMode==='invoice'){ const t=computeInvoiceTotals(), s=state.invoice; return { type:TYPE, number:(s.invNo||'').trim(), title:'Invoice '+(s.invNo||'')+(s.billCompany?' \u2013 '+s.billCompany:''), amount:Math.round(t.total*100)/100 }; }\n  if(currentMode==='quote'){ const t=computeQuoteTotals(), s=state.quote; return { type:TYPE, number:'', title:'Quote \u2013 '+(s.title||'Untitled'), amount:Math.round(t.total*100)/100 }; }\n  const s = state[currentMode]; return { type:TYPE, number:'', title:(currentMode==='proposal'?'Proposal \u2013 ':'Brief \u2013 ')+(s.title||'Untitled'), amount:'' };\n}\nasync function saveToOS(){\n  const msg = document.getElementById('saveMsg'), btn = document.getElementById('saveBtn');\n  const show = (t, ok) => { msg.textContent = t; msg.className = 'ai-error' + (ok?' ok':''); msg.style.display = 'block'; };\n  const meta = docMeta();\n  if(currentMode==='invoice' && !meta.number){ show('Enter an invoice number first.'); return; }\n  const estLeft = JSON.stringify(state[currentMode]).indexOf('AI ESTIMATE') > -1;\n  if(estLeft && !confirm('This document still contains \u201c[AI ESTIMATE \u2014 VERIFY]\u201d figures. Save it anyway?')) return;\n  btn.disabled = true; show('Saving\u2026', true);\n  try{\n    const r = await buildDocBlob();\n    const b64 = await blobToBase64(r.blob);\n    const res = await bridge('saveDocument', Object.assign({}, meta, { file_name:r.filename, mime:'application/vnd.openxmlformats-officedocument.wordprocessingml.document', file_base64:b64, client_name:saveCtx.client.trim(), project_name:saveCtx.project.trim(), status:document.getElementById('saveStatus').value, notes:document.getElementById('saveNotes').value, source:'Generated' }));\n    if(!res || !res.ok){ show((res && res.error) || 'Could not save.'); btn.disabled = false; return; }\n    show('Saved' + (res.doc && res.doc.number ? ' as ' + res.doc.number : '') + '. It is now in Documents' + (res.doc && res.doc.client_name ? ' under ' + res.doc.client_name : '') + '.', true);\n    if(currentMode==='invoice'){ INIT.next_number = ''; const nx = await bridge('generatorInit', {}); if(nx && nx.next_number) INIT.next_number = nx.next_number; }\n    parent.postMessage({wcgen:'saved', doc:res.doc}, '*');\n  }catch(e){ show(e.message || String(e)); btn.disabled = false; }\n}\n\n<\/script>\n<\/body><\/html>\n";
var GEN_WIN_ = null;
function openGenerator(){
  if(!WORKSPACE_MODE){ wcToast('The generator needs the live system (it saves to Drive).', true); return; }
  if(document.getElementById('wcGenOverlay')) return;
  var ov = document.createElement('div'); ov.id = 'wcGenOverlay';
  ov.style.cssText = 'position:fixed;inset:0;z-index:9999;background:#F5F4FB;display:flex;flex-direction:column';
  ov.innerHTML = '<iframe id="wcGenFrame" title="Document generator" style="flex:1;border:0;width:100%;background:#F5F4FB"></iframe>';
  document.body.appendChild(ov);
  var fr = document.getElementById('wcGenFrame');
  GEN_WIN_ = fr.contentWindow;
  window.addEventListener('message', genOnMessage_);
  fr.onload = function(){
    api('generatorInit', {}).then(function(res){
      if(!res.ok){ wcToast((res.error||'Could not start the generator'), true); closeGenerator(); return; }
      var init = { modes: res.modes, next_number: res.next_number, payments: res.payments,
        clients: (DB.clients||[]).map(function(c){ return {client_id:c.client_id, name:c.name}; }),
        projects: (DB.projects||[]).map(function(p){ return {project_id:p.project_id, name:p.name, client_id:p.client_id||''}; }) };
      fr.contentWindow.postMessage({wcgen:'init', init:init}, '*');
    });
  };
  fr.srcdoc = GEN_HTML;
}
function closeGenerator(){
  var ov = document.getElementById('wcGenOverlay'); if(ov) ov.parentNode.removeChild(ov);
  window.removeEventListener('message', genOnMessage_); GEN_WIN_ = null;
}
var GEN_OPS_ = ['generateDocumentDraft','saveDocument','generatorInit'];
function genOnMessage_(e){
  var fr = document.getElementById('wcGenFrame'); if(!fr || e.source !== fr.contentWindow) return;
  var m = e.data || {};
  if(m.wcgen === 'close'){ closeGenerator(); refreshData(true); return; }
  if(m.wcgen === 'saved'){ refreshData(false); return; }
  if(m.wcgen === 'call'){
    var reply = function(res){ if(fr.contentWindow) fr.contentWindow.postMessage({wcgen:'reply', id:m.id, res:res}, '*'); };
    if(GEN_OPS_.indexOf(m.op) === -1){ reply({ok:false, error:'Not allowed.'}); return; }
    var p = m.payload || {};
    p.actor = CURRENT_USER;
    api(m.op, p).then(reply);
  }
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
      applyAll(res.data);
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
