@import "tailwindcss";

:root {
  --navy: #16324f;
  --coral: #ff5e52;
  --mint: #42c7a1;
  --pale-mint: #e8f8f3;
  --canvas: #f7f6f2;
  --ink: #122f4f;
  --muted: #6c7684;
  --line: #e7e5df;
}

* { box-sizing: border-box; }
html { width: 100%; overflow-x: hidden; }
body { width: 100%; min-width: 0; margin: 0; overflow-x: hidden; background: var(--canvas); color: var(--ink); font-family: "Noto Sans TC", "PingFang TC", "Microsoft JhengHei", system-ui, sans-serif; }
button, textarea { font: inherit; }
button { cursor: pointer; }

.app-shell { min-height: 100vh; display: grid; grid-template-columns: 150px 1fr; }
.sidebar { position: sticky; top: 0; height: 100vh; background: linear-gradient(180deg, #0b2c50, #123b64); color: white; padding: 26px 12px; display: flex; flex-direction: column; }
.brand-mark { display: grid; place-items: center; gap: 8px; font-size: 20px; letter-spacing: 3px; }
.brand-mark span { display: grid; place-items: center; width: 54px; height: 54px; color: var(--coral); font-size: 46px; }
.sidebar nav { margin-top: 32px; display: grid; gap: 8px; }
.sidebar nav button { background: transparent; border: 0; color: #eef6ff; padding: 14px 12px; border-radius: 14px; display: flex; align-items: center; gap: 12px; font-weight: 700; font-size: 16px; }
.sidebar nav button span { width: 24px; font-size: 22px; }
.sidebar nav .nav-active { background: rgba(255,255,255,.16); box-shadow: inset 4px 0 var(--coral); }
.motto { margin-top: auto; text-align: center; color: #a9f0dc; line-height: 1.7; font-weight: 700; }

.workspace { padding: 24px 32px 44px; max-width: 1480px; width: 100%; margin: 0 auto; display: flex; flex-direction: column; }
.topbar { height: 76px; display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; gap: 20px; }
.topbar h1 { margin: 0; font-size: 30px; letter-spacing: 1px; }
.eyebrow { margin: 0 0 2px; font-size: 13px; color: var(--mint); font-weight: 800; letter-spacing: 2px; }
.range-button { border: 1px solid var(--line); background: white; color: var(--ink); padding: 14px 20px; border-radius: 16px; font-weight: 800; box-shadow: 0 3px 12px rgba(22,50,79,.06); }
.profile { justify-self: end; display: grid; place-items: center; width: 48px; height: 48px; border-radius: 50%; background: var(--mint); color: white; font-weight: 800; font-size: 20px; }
.range-nav { display: flex; align-items: center; gap: 8px; }
.range-nav > button { min-height: 44px; border: 1px solid var(--line); border-radius: 12px; background: white; color: var(--navy); padding: 8px 12px; font-weight: 800; }
.date-range-control { display: grid; grid-template-columns: auto 20px auto auto; align-items: center; gap: 6px; padding: 5px 9px; border: 1px solid var(--line); border-radius: 12px; background: white; box-shadow: 0 3px 12px rgba(22,50,79,.06); }
.range-nav label, .end-date { display: grid; gap: 2px; }
.range-nav label span, .end-date span { color: var(--muted); font-size: 9px; font-weight: 800; }
.range-nav input { border: 0; outline: 0; color: var(--navy); font-weight: 800; }
.end-date b { color: var(--navy); font-size: 13px; white-space: nowrap; }
.date-range-control i { color: var(--muted); font-size: 12px; font-style: normal; text-align: center; }
.date-range-control em { border-radius: 8px; padding: 5px 7px; background: var(--pale-mint); color: #167d63; font-size: 10px; font-style: normal; font-weight: 850; white-space: nowrap; }
.period-banner { display: flex; align-items: center; justify-content: space-between; gap: 18px; margin: 8px 0 18px; padding: 15px 18px; border: 1px solid var(--line); border-radius: 18px; background: white; box-shadow: 0 4px 16px rgba(22,50,79,.05); }
.period-banner > div:first-child { display: grid; gap: 4px; }
.period-banner > div:first-child b { font-size: 18px; }
.period-banner > div:first-child span { color: var(--muted); font-size: 12px; }
.period-banner > div:last-child { display: flex; gap: 8px; }
.word-button, .save-main { min-height: 44px; border-radius: 12px; padding: 9px 14px; font-weight: 850; }
.word-button { border: 1px solid #2b579a; background: #edf3fb; color: #2b579a; }
.save-main { border: 0; background: var(--coral); color: white; box-shadow: 0 5px 14px rgba(255,94,82,.2); }
.autosave-state { display: inline-flex; align-items: center; justify-content: center; min-height: 38px; border-radius: 10px; padding: 7px 10px; background: #eef0f2; color: var(--muted); font-size: 12px; font-weight: 850; }
.autosave-state.saving, .autosave-state.unsaved { background: #fff3d6; color: #9a6400; }
.autosave-state.saved { background: #dcf5ec; color: #168667; }
.autosave-state.error { background: #ffe2e7; color: #b83e54; }
.full { width: 100%; }
.day-editor { min-width: 0; display: grid; gap: 14px; }
.editor-date-strip { width: 100%; min-width: 0; display: grid; grid-template-columns: repeat(14, minmax(42px, 1fr)); gap: 5px; padding: 8px; border: 1px solid var(--line); border-radius: 15px; background: white; overflow-x: auto; }
.editor-date-strip button { min-width: 42px; min-height: 54px; display: grid; place-items: center; gap: 2px; border: 0; border-radius: 10px; background: #f4f5f4; color: var(--ink); }
.editor-date-strip button small { color: var(--muted); }
.editor-date-strip button b { font-size: 17px; }
.editor-date-strip .active { background: var(--navy); color: white; box-shadow: 0 3px 9px rgba(22,50,79,.22); }
.editor-date-strip .active small { color: #dce9f5; }

.dashboard { display: grid; grid-template-columns: minmax(0, 1fr) 330px; gap: 22px; align-items: start; }
.main-column, .summary-column { min-width: 0; display: grid; align-content: start; gap: 18px; }
.summary-column { position: static; }
.section-heading, .team-status, .fortnight, .goal-card, .activity-card { background: white; border: 1px solid var(--line); border-radius: 22px; box-shadow: 0 5px 18px rgba(22,50,79,.06); }
.section-heading { display: flex; align-items: center; justify-content: space-between; padding: 18px 20px; }
.section-heading > div { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
.section-heading h2, .section-title h2 { margin: 0; font-size: 21px; }
.section-heading small { color: var(--muted); margin-left: 4px; }
.heading-icon { display: grid; place-items: center; background: var(--mint); color: white; width: 38px; height: 38px; border-radius: 12px; font-weight: 900; }
.secondary { border: 1px solid var(--navy); background: white; color: var(--navy); border-radius: 12px; padding: 10px 15px; font-weight: 800; }

.slot-list { min-width: 0; display: grid; gap: 14px; }
.slot-card { width: 100%; min-width: 0; min-height: 148px; background: white; border: 1px solid var(--line); border-radius: 20px; display: grid; grid-template-columns: 138px minmax(0, 1fr) 130px; overflow: hidden; box-shadow: 0 4px 13px rgba(22,50,79,.07); }
.period { display: grid; place-items: center; align-content: center; gap: 4px; border-right: 1px solid var(--line); }
.period span { color: var(--mint); font-size: 30px; }
.period strong { font-size: 40px; }
.period-0 .period { background: #effbf7; }
.period-1 .period { background: #fff3ed; }
.period-1 .period span { color: var(--coral); }
.period-2 .period { background: #f0f2ff; }
.period-2 .period span { color: #665ce1; }
.slot-content { min-width: 0; padding: 20px 24px; align-self: center; border-left: 4px solid rgba(66,199,161,.35); }
.slot-content p { margin: 0; font-size: 17px; line-height: 1.8; font-weight: 650; }
.slot-content textarea { width: 100%; min-height: 62px; border: 1px solid #cad3dc; border-radius: 10px; padding: 10px; resize: vertical; }
.slot-actions { padding: 18px 16px; display: grid; align-content: center; gap: 14px; }
.slot-actions button { background: white; border: 1px solid var(--coral); color: var(--coral); padding: 10px; border-radius: 12px; font-weight: 800; }
.status { display: inline-flex; justify-content: center; border-radius: 10px; padding: 7px 11px; font-size: 14px; font-weight: 800; white-space: nowrap; }
.church { color: #168667; background: #dcf5ec; }
.outside { color: #1676c2; background: #e4f2ff; }
.leave { color: #d76b00; background: #fff0cb; }
.personal-leave { color: #a85b00; background: #ffe8c7; }
.comp-leave { color: #176b91; background: #dff4ff; }
.sick { color: #b83e54; background: #ffe2e7; }
.off { color: #7a4ec6; background: #eee7ff; }
.not-duty { color: #5e6874; background: #e9edf0; }
.empty { color: #707985; background: #eef0f2; }
.status-picker { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 9px; }
.status-picker button { border: 1px solid #d8dde3; background: white; padding: 7px 9px; border-radius: 9px; }
.status-picker .chosen { color: white; background: var(--navy); border-color: var(--navy); }
.counting-note { margin: 14px 0 0; color: var(--muted); font-size: 12px; line-height: 1.7; text-align: center; }

.team-status, .fortnight, .goal-card, .activity-card { padding: 20px; }
.section-title { display: flex; align-items: center; gap: 10px; margin-bottom: 16px; }
.section-title > span { color: var(--mint); font-size: 25px; }
.section-title.coral > span { color: var(--coral); }
.people { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
.people button { border: 1px solid transparent; background: white; border-radius: 15px; display: flex; align-items: center; gap: 10px; padding: 10px; text-align: left; }
.people button:hover, .people .selected-person { background: #f5fbf9; border-color: var(--mint); }
.people button > span:last-child { display: grid; gap: 5px; }
.avatar { flex: none; width: 42px; height: 42px; display: grid; place-items: center; border-radius: 50%; color: white; background: var(--mint); font-weight: 800; }
.avatar-1 { background: var(--navy); }
.avatar-2 { background: var(--coral); font-size: 12px; }

.calendar-heading { display: flex; justify-content: space-between; align-items: flex-start; gap: 16px; }
.calendar-heading .section-title small { display: block; margin-top: 3px; color: var(--muted); font-size: 12px; font-weight: 500; }
.calendar-actions { display: flex; gap: 8px; flex-wrap: wrap; justify-content: flex-end; }
.calendar-actions button { min-height: 40px; border: 1px solid #4285f4; background: #edf4ff; color: #1967d2; border-radius: 11px; padding: 8px 12px; font-size: 13px; font-weight: 800; }
.calendar-actions .export-button { border-color: var(--mint); background: var(--pale-mint); color: #167d63; }
.view-switch { display: inline-flex; gap: 4px; margin: 0 0 14px; padding: 4px; border-radius: 12px; background: #eef1f3; }
.view-switch button { min-height: 38px; border: 0; border-radius: 9px; padding: 7px 18px; background: transparent; color: var(--muted); font-weight: 800; }
.view-switch .active { background: var(--navy); color: white; box-shadow: 0 2px 8px rgba(22,50,79,.2); }
.week-label { display: none; }
.calendar-grid { display: grid; grid-template-columns: repeat(7, minmax(88px, 1fr)); gap: 8px; }
.calendar-grid article { min-width: 0; min-height: 142px; cursor: pointer; border: 1px solid var(--line); background: #fbfbfa; border-radius: 13px; padding: 9px; box-shadow: 0 2px 7px rgba(22,50,79,.04); }
.calendar-grid article:nth-child(n+8) { margin-top: 10px; }
.calendar-grid article header { display: flex; justify-content: space-between; align-items: center; padding-bottom: 7px; border-bottom: 1px solid #eceae5; font-size: 12px; }
.calendar-grid article header span { font-weight: 850; color: var(--ink); }
.calendar-grid article header b { color: var(--muted); font-size: 11px; }
.calendar-grid article > small { display: -webkit-box; margin-top: 7px; overflow: hidden; color: var(--muted); font-size: 10px; line-height: 1.35; -webkit-line-clamp: 2; -webkit-box-orient: vertical; }
.calendar-grid .calendar-today { border: 2px solid var(--navy); background: #f2f7fc; box-shadow: 0 4px 12px rgba(22,50,79,.12); }
.calendar-grid .calendar-today header span::after { content: " 今日"; color: var(--coral); }
.calendar-grid .calendar-sunday { background: #fff6f3; }
.day-slots { display: grid; gap: 4px; margin-top: 7px; }
.day-slots div { display: flex; align-items: center; gap: 4px; min-width: 0; border-radius: 6px; padding: 4px 5px; font-size: 10px; }
.day-slots div strong { flex: none; }
.day-slots div span { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.team-calendar-wrap { width: 100%; overflow-x: auto; border: 1px solid var(--line); border-radius: 14px; background: white; }
.team-calendar { --days: 14; min-width: 1030px; display: grid; grid-template-columns: 148px repeat(var(--days), minmax(61px, 1fr)); }
.team-corner, .team-date { position: sticky; top: 0; z-index: 3; min-height: 54px; display: grid; place-items: center; border-right: 1px solid var(--line); border-bottom: 1px solid var(--line); background: #f0f5f8; }
.team-corner { left: 0; z-index: 5; color: var(--navy); font-weight: 850; }
.team-date b { font-size: 11px; }
.team-date small { color: var(--muted); font-size: 10px; }
.team-date.is-today { background: #dfeaf5; color: var(--navy); box-shadow: inset 0 -3px var(--coral); }
.team-row { display: contents; }
.team-name { position: sticky; left: 0; z-index: 2; min-height: 105px; display: flex; align-items: center; gap: 8px; border: 0; border-right: 1px solid var(--line); border-bottom: 1px solid var(--line); background: white; padding: 8px; text-align: left; }
.team-name:hover { background: var(--pale-mint); }
.team-name .avatar { width: 34px; height: 34px; font-size: 12px; }
.team-name > span:last-child { display: grid; gap: 3px; }
.team-name b { font-size: 12px; }
.team-name small { color: var(--muted); font-size: 9px; }
.team-day { min-width: 0; min-height: 105px; display: grid; align-content: center; gap: 3px; border: 0; border-right: 1px solid var(--line); border-bottom: 1px solid var(--line); background: white; padding: 5px 3px; }
.team-day:hover { background: #f6faf9; }
.team-day.is-today { background: #f1f6fb; }
.team-day span { display: grid; grid-template-columns: 13px 1fr; align-items: center; gap: 1px; min-width: 0; border-radius: 5px; padding: 3px 2px; font-size: 8px; line-height: 1.15; }
.team-day span b { font-size: 8px; }
.legend i { display: block; width: 7px; height: 7px; border-radius: 50%; }
.church-dot { background: var(--mint); }
.outside-dot { background: #429ee8; }
.leave-dot { background: var(--coral); }
.legend { display: flex; gap: 20px; margin-top: 12px; color: var(--muted); font-size: 13px; }
.legend span { display: flex; align-items: center; gap: 6px; }

.progress-ring { --progress: 70%; width: 190px; height: 190px; margin: 8px auto 16px; border-radius: 50%; display: grid; place-items: center; background: conic-gradient(var(--mint) var(--progress), #e9eceb 0); position: relative; }
.progress-ring::after { content: ""; position: absolute; inset: 18px; background: white; border-radius: 50%; }
.progress-ring div { position: relative; z-index: 1; display: grid; text-align: center; }
.progress-ring strong { font-size: 34px; }
.progress-ring span { color: var(--muted); font-size: 17px; }
.progress-bar { height: 12px; border-radius: 99px; background: #dff3ed; overflow: hidden; }
.progress-bar i { display: block; height: 100%; background: linear-gradient(90deg, var(--mint), #65d5b5); border-radius: inherit; }
.goal-labels { display: flex; justify-content: space-between; margin-top: 8px; color: var(--muted); font-size: 13px; }
.goal-labels b { color: #1a9c7b; }
.week-stat-list { display: grid; gap: 10px; }
.week-stat { display: grid; grid-template-columns: 1fr auto; gap: 8px 12px; padding: 13px; border: 1px solid var(--line); border-radius: 14px; background: #fbfcfb; }
.week-stat > div { display: grid; gap: 3px; }
.week-stat > div span { color: var(--navy); font-weight: 850; }
.week-stat > div small, .week-stat > strong small { color: var(--muted); font-size: 11px; font-weight: 600; }
.week-stat > strong { font-size: 21px; text-align: right; }
.week-stat > b { align-self: center; font-size: 13px; }
.positive { color: #168667; }
.negative { color: #c44842; }
.even { color: var(--navy); }
.claim-button { grid-column: 1 / -1; min-height: 40px; border: 0; border-radius: 10px; background: var(--coral); color: white; font-weight: 850; }
.claim-button.claimed { border: 1px solid var(--mint); background: var(--pale-mint); color: #167d63; }
.claim-button:disabled { opacity: .6; }
.fortnight-balance, .claimed-total { display: flex; align-items: center; justify-content: space-between; margin-top: 12px; padding: 12px 13px; border-radius: 12px; }
.fortnight-balance { background: #f1f5f8; }
.claimed-total { background: linear-gradient(135deg, #e2f7f0, #edf9f5); color: #167d63; }
.fortnight-balance span, .claimed-total span { font-size: 13px; font-weight: 750; }
.fortnight-balance strong, .claimed-total strong { font-size: 18px; }
.claim-message { margin: 10px 0 0; color: var(--muted); font-size: 12px; text-align: center; }
.claim-message.error { color: #b83e54; }
.mini-stats { margin-top: 18px; padding-top: 14px; border-top: 1px solid var(--line); display: grid; grid-template-columns: repeat(3,1fr); }
.mini-stats div { display: grid; place-items: center; gap: 3px; border-right: 1px solid var(--line); }
.mini-stats div:last-child { border: 0; }
.mini-stats span { color: var(--coral); font-size: 20px; }
.mini-stats small { color: var(--muted); }
.mini-stats b { color: var(--coral); }
.activity-card { display: grid; gap: 12px; }
.activity { display: grid; grid-template-columns: 36px 1fr auto; align-items: center; gap: 10px; }
.activity .avatar { width: 36px; height: 36px; font-size: 12px; }
.activity p { margin: 0; font-size: 13px; line-height: 1.45; }
.activity time { color: #9a9fa7; font-size: 12px; }
.primary { margin-top: 8px; border: 0; background: linear-gradient(135deg, #ff6b5e, #f54d42); color: white; min-height: 50px; border-radius: 16px; font-size: 17px; font-weight: 800; box-shadow: 0 7px 18px rgba(255,94,82,.23); }
.summary-copy { margin: 0 0 14px; color: var(--muted); font-size: 14px; line-height: 1.7; }
.activity-card .full + .full { margin-top: 8px; }
.mobile-tabs { display: none; }
.staff-manager { margin: 0 0 18px; padding: 14px 16px; border: 1px solid var(--line); border-radius: 18px; background: white; box-shadow: 0 4px 16px rgba(22,50,79,.05); }
.staff-manager-toggle { width: 100%; display: flex; justify-content: space-between; gap: 12px; border: 0; background: transparent; color: var(--navy); text-align: left; }
.staff-manager-toggle span, .staff-manager-toggle b { font-size: 14px; }
.staff-manager > p { margin: 8px 0 0; color: var(--muted); font-size: 12px; line-height: 1.6; }
.staff-manager-body { display: grid; grid-template-columns: 1fr 320px; gap: 16px; margin-top: 14px; padding-top: 14px; border-top: 1px solid var(--line); }
.staff-member-list { display: grid; gap: 8px; align-content: start; }
.staff-member-list > div { display: grid; grid-template-columns: 1fr auto; gap: 8px; }
.staff-member-list > div > button:first-child { min-height: 48px; display: grid; gap: 2px; border: 1px solid var(--line); border-radius: 11px; background: #fbfcfb; padding: 8px 11px; color: var(--navy); text-align: left; }
.staff-member-list > div > button:first-child.selected { border-color: var(--mint); background: var(--pale-mint); }
.staff-member-list small { color: var(--muted); }
.remove-staff { border: 1px solid #f0b4b0; border-radius: 10px; background: #fff5f4; color: #b83e54; padding: 8px 12px; font-weight: 750; }
.remove-staff:disabled { opacity: .45; }
.add-staff-form { display: grid; gap: 8px; padding: 13px; border-radius: 13px; background: #f4f7f6; }
.add-staff-form h3 { margin: 0 0 2px; font-size: 15px; }
.add-staff-form input { width: 100%; min-height: 40px; border: 1px solid #cad3dc; border-radius: 9px; padding: 8px 10px; background: white; }
.add-staff-form label { display: grid; gap: 4px; color: var(--muted); font-size: 11px; font-weight: 750; }
.add-staff-form button { min-height: 42px; border: 0; border-radius: 10px; background: var(--navy); color: white; font-weight: 850; }
.add-staff-form small { color: #b83e54; }

.leave-panel { order: 2; margin: 18px 0 0; padding: 20px; border: 1px solid var(--line); border-radius: 20px; background: white; box-shadow: 0 4px 16px rgba(22,50,79,.05); }
.dashboard { order: 1; }
.leave-heading, .leave-heading > div { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
.leave-heading h2, .leave-heading p { margin: 0; }
.leave-heading h2 { font-size: 22px; }
.leave-heading small { color: var(--muted); }
.leave-heading select { min-width: 150px; min-height: 44px; border: 1px solid #cad3dc; border-radius: 11px; padding: 8px 12px; background: white; color: var(--navy); font-weight: 800; }
.leave-balance-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin: 16px 0; }
.leave-balance-grid article { display: grid; gap: 5px; min-width: 0; padding: 14px; border-radius: 14px; background: #f4f8f7; }
.leave-balance-grid small, .leave-balance-grid span { color: var(--muted); font-size: 11px; }
.leave-balance-grid strong { color: #168667; font-size: 21px; }
.leave-balance-grid label { display: flex; align-items: center; gap: 6px; color: var(--muted); font-size: 11px; }
.leave-balance-grid input { width: 72px; min-height: 30px; border: 1px solid #cad3dc; border-radius: 8px; padding: 4px 6px; }
.leave-download-panel { display: grid; grid-template-columns: 1fr 170px 170px auto; align-items: end; gap: 10px; margin: 0 0 16px; padding: 14px; border: 1px solid #bdd9e9; border-radius: 14px; background: #f2f8fc; }
.leave-download-panel h3, .leave-download-panel small { margin: 0; }
.leave-download-panel h3 { font-size: 16px; }
.leave-download-panel small { display: block; margin-top: 3px; color: var(--muted); }
.leave-download-panel label { display: grid; gap: 4px; color: var(--navy); font-size: 11px; font-weight: 750; }
.leave-download-panel input { width: 100%; min-height: 40px; border: 1px solid #b9cad7; border-radius: 9px; padding: 7px 8px; background: white; }
.leave-download-panel button { min-height: 42px; border: 1px solid var(--navy); border-radius: 10px; padding: 8px 13px; background: white; color: var(--navy); font-weight: 850; }
.leave-download-panel button:hover { background: var(--navy); color: white; }
.comp-credit-panel { margin: 0 0 16px; padding: 14px; border: 1px solid var(--line); border-radius: 14px; background: #fbfcfb; }
.comp-credit-panel h3, .comp-credit-panel p { margin: 0; }
.comp-credit-panel p { margin-top: 8px; color: var(--muted); font-size: 12px; }
.comp-credit-panel > div { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; margin-top: 10px; }
.comp-credit-panel article { display: grid; grid-template-columns: 1.25fr .7fr auto; align-items: center; gap: 10px; padding: 11px; border: 1px solid var(--line); border-radius: 11px; background: white; }
.comp-credit-panel article > span { display: grid; gap: 3px; }
.comp-credit-panel small { color: var(--muted); font-size: 10px; }
.comp-credit-panel em { padding: 5px 7px; border-radius: 99px; font-size: 10px; font-style: normal; font-weight: 800; }
.comp-credit-panel .valid em { background: var(--pale-mint); color: #168667; }
.comp-credit-panel .expired { opacity: .68; }
.comp-credit-panel .expired em { background: #ffe2e7; color: #b83e54; }
.leave-layout { display: grid; grid-template-columns: minmax(360px, .8fr) minmax(480px, 1.2fr); gap: 16px; }
.leave-form, .leave-history { min-width: 0; padding: 16px; border: 1px solid var(--line); border-radius: 16px; background: #fbfcfb; }
.leave-form { display: grid; gap: 12px; }
.leave-form h3, .leave-history h3 { margin: 0; font-size: 17px; }
.leave-form label { display: grid; gap: 5px; color: var(--navy); font-size: 12px; font-weight: 750; }
.leave-form input, .leave-form textarea { width: 100%; min-height: 42px; border: 1px solid #cad3dc; border-radius: 10px; padding: 9px 10px; background: white; }
.leave-form textarea { min-height: 62px; resize: vertical; }
.leave-types { display: grid; grid-template-columns: repeat(4, 1fr); gap: 7px; }
.leave-types button { min-height: 42px; border: 1px solid #cad3dc; border-radius: 10px; background: white; color: var(--navy); font-weight: 800; }
.leave-types button.chosen { border-color: var(--navy); background: var(--navy); color: white; }
.leave-date-fields { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.leave-slot-picker { display: grid; gap: 6px; max-height: 265px; overflow-y: auto; margin: 0; padding: 10px; border: 1px solid var(--line); border-radius: 12px; background: white; }
.leave-slot-picker legend { padding: 0 6px; color: var(--navy); font-size: 12px; font-weight: 800; }
.leave-slot-picker > div { display: grid; grid-template-columns: 1fr repeat(3, 44px); align-items: center; gap: 5px; }
.leave-slot-picker span { display: flex; gap: 6px; color: var(--muted); font-size: 11px; }
.leave-slot-picker button { min-height: 34px; border: 1px solid #cad3dc; border-radius: 8px; background: white; color: var(--navy); font-weight: 800; }
.leave-slot-picker button.selected { border-color: var(--mint); background: var(--pale-mint); color: #167d63; }
.leave-section-total { margin: 0; padding: 9px 11px; border-radius: 9px; background: var(--pale-mint); color: #167d63; text-align: center; }
.leave-submit { min-height: 48px; border: 0; border-radius: 12px; background: var(--coral); color: white; font-weight: 850; }
.leave-submit:disabled { opacity: .45; cursor: not-allowed; }
.leave-success { color: #168667; text-align: center; }.leave-error { color: #b83e54; text-align: center; }
.leave-history { display: grid; align-content: start; gap: 9px; max-height: 690px; overflow-y: auto; }
.leave-history article { padding: 13px; border: 1px solid var(--line); border-radius: 12px; background: white; }
.leave-history article header { display: flex; justify-content: space-between; gap: 10px; }
.leave-history article header > div { display: grid; gap: 3px; }
.leave-history article header small { color: var(--muted); }
.leave-history article p { margin: 7px 0 0; color: var(--muted); font-size: 12px; }
.leave-status { flex: none; align-self: start; padding: 5px 8px; border-radius: 99px; font-size: 11px; font-weight: 800; }
.leave-status.pending { background: #fff0cb; color: #86651a; }.leave-status.approved { background: var(--pale-mint); color: #168667; }.leave-status.rejected { background: #ffe2e7; color: #b83e54; }
.review-actions { display: flex; gap: 8px; margin-top: 10px; }
.review-actions button { min-height: 38px; border: 0; border-radius: 9px; padding: 7px 10px; background: var(--mint); color: white; font-weight: 800; }
.review-actions button:last-child { background: #eef0f2; color: #b83e54; }
.leave-record-actions { display: flex; align-items: flex-end; justify-content: space-between; gap: 8px; margin-top: 10px; }
.leave-record-actions .review-actions { flex: 1; margin-top: 0; }
.delete-leave { min-height: 38px; border: 1px solid #f0b4b0; border-radius: 9px; padding: 7px 10px; background: #fff5f4; color: #b83e54; font-weight: 800; }
.delete-leave:hover { background: #ffe8e5; }
.empty-leave { color: var(--muted); font-size: 13px; }
.leave-rules { display: flex; gap: 10px; margin-top: 14px; padding: 12px 14px; border-radius: 12px; background: #fff8e5; color: #705d27; font-size: 12px; line-height: 1.6; }

@media (max-width: 900px) {
  .app-shell { display: block; width: 100%; min-width: 0; }
  .sidebar { display: none; }
  .workspace { width: 100%; max-width: none; min-width: 0; padding: 16px 14px 96px; overflow: hidden; }
  .topbar { height: auto; grid-template-columns: 1fr auto; gap: 12px; }
  .topbar h1 { font-size: 26px; }
  .range-button { grid-row: 2; grid-column: 1 / -1; width: 100%; min-height: 48px; }
  .profile { width: 42px; height: 42px; }
  .range-nav { grid-row: 2; grid-column: 1 / -1; display: grid; grid-template-columns: auto 1fr auto; width: 100%; }
  .range-nav > button { min-height: 48px; padding: 7px 9px; font-size: 12px; }
  .date-range-control { min-width: 0; grid-template-columns: 1fr; gap: 5px; padding: 8px 10px; }
  .date-range-control i { display: none; }
  .date-range-control em { grid-column: 1; text-align: center; }
  .range-nav label, .end-date { min-width: 0; grid-template-columns: auto minmax(0, 1fr); align-items: center; gap: 7px; }
  .range-nav label span, .end-date span { font-size: 9px; white-space: nowrap; }
  .range-nav input { width: 100%; min-width: 0; font-size: 12px; text-align: right; }
  .end-date b { min-width: 0; overflow: hidden; font-size: 12px; text-align: right; text-overflow: ellipsis; white-space: nowrap; }
  .period-banner { display: grid; padding: 14px; }
  .period-banner > div:last-child { display: grid; grid-template-columns: 1fr 1fr; }
  .period-banner .autosave-state { grid-column: 1 / -1; }
  .period-banner .word-button, .period-banner .save-main { padding: 8px; font-size: 13px; }
  .mobile-tabs { display: flex; gap: 8px; overflow-x: auto; padding: 16px 0 12px; }
  .mobile-tabs button { flex: 1; min-width: 92px; min-height: 44px; border: 1px solid var(--line); background: white; border-radius: 12px; font-weight: 800; }
  .mobile-tabs .active { background: var(--navy); color: white; border-color: var(--navy); }
  .mobile-tabs .manage-staff-button { border-color: var(--mint); color: #167d63; background: var(--pale-mint); }
  .staff-manager { padding: 13px; }
  .staff-manager-body { grid-template-columns: 1fr; }
  .leave-panel { padding: 14px; }
  .leave-heading { align-items: flex-start; }
  .leave-heading > div { align-items: flex-start; }
  .leave-heading small { display: block; margin-top: 3px; }
  .leave-heading select { min-width: 105px; }
  .leave-balance-grid { grid-template-columns: 1fr 1fr; }
  .leave-download-panel { grid-template-columns: 1fr 1fr; }
  .leave-download-panel > div, .leave-download-panel button { grid-column: 1 / -1; }
  .leave-layout { grid-template-columns: 1fr; }
  .comp-credit-panel > div { grid-template-columns: 1fr; }
  .comp-credit-panel article { grid-template-columns: 1fr auto; }
  .comp-credit-panel article em { grid-column: 1 / -1; justify-self: start; }
  .leave-form, .leave-history { padding: 13px; }
  .leave-date-fields { grid-template-columns: 1fr; }
  .leave-slot-picker > div { grid-template-columns: 1fr repeat(3, 40px); }
  .leave-slot-picker span { display: grid; gap: 0; }
  .leave-history { max-height: none; }
  .leave-rules { display: grid; }
  .dashboard { display: flex; width: 100%; min-width: 0; flex-direction: column; }
  .main-column, .summary-column { width: 100%; min-width: 0; }
  .summary-column { order: -1; display: block; }
  .activity-card { display: none; }
  .goal-card { width: 100%; margin-bottom: 16px; }
  .progress-ring { width: 150px; height: 150px; }
  .progress-ring strong { font-size: 28px; }
  .slot-card { width: 100%; min-width: 0; grid-template-columns: 78px minmax(0, 1fr); min-height: 154px; }
  .period { grid-row: 1 / span 2; }
  .period strong { font-size: 31px; }
  .slot-content { padding: 16px; align-self: stretch; display: grid; align-items: center; }
  .slot-content p { font-size: 15px; }
  .slot-actions { display: flex; align-items: center; justify-content: space-between; padding: 0 14px 14px; }
  .slot-actions button { min-height: 44px; padding: 8px 14px; }
  .section-heading { padding: 14px; }
  .section-heading small { width: 100%; padding-left: 48px; }
  .people { grid-template-columns: 1fr; }
  .people button { min-height: 58px; }
  .team-status, .fortnight { width: 100%; min-width: 0; }
  .editor-date-strip { grid-template-columns: repeat(14, 48px); }
  .calendar-heading { display: block; }
  .calendar-actions { display: grid; grid-template-columns: 1fr 1fr; margin-bottom: 12px; }
  .calendar-actions button { min-height: 46px; padding: 7px; font-size: 12px; }
  .view-switch { display: grid; grid-template-columns: 1fr 1fr; width: 100%; }
  .view-switch button { min-height: 44px; padding: 7px; }
  .calendar-grid { grid-template-columns: repeat(7, minmax(0, 1fr)); gap: 4px; }
  .calendar-grid article { min-height: 125px; padding: 5px 4px; border-radius: 9px; }
  .calendar-grid article:nth-child(n+8) { margin-top: 8px; }
  .calendar-grid article header { display: grid; justify-content: center; gap: 1px; text-align: center; padding-bottom: 4px; }
  .calendar-grid article header span { font-size: 10px; }
  .calendar-grid article header b { font-size: 9px; }
  .calendar-grid article > small { display: none; }
  .day-slots { gap: 3px; margin-top: 5px; }
  .day-slots div { display: grid; justify-items: center; gap: 0; padding: 3px 1px; font-size: 9px; }
  .day-slots div span { max-width: 100%; }
  .team-calendar-wrap { margin: 0 -2px; width: calc(100% + 4px); }
  .team-calendar { min-width: 990px; grid-template-columns: 116px repeat(var(--days), 62px); }
  .team-corner, .team-date { min-height: 48px; }
  .team-name { min-height: 98px; padding: 6px; }
  .team-name .avatar { width: 30px; height: 30px; }
  .team-name b { font-size: 11px; }
  .team-day { min-height: 98px; }
  .primary { position: fixed; bottom: 14px; left: 14px; right: 14px; z-index: 10; }
}

@media (max-width: 420px) {
  .mini-stats { font-size: 13px; }
  .section-heading h2, .section-title h2 { font-size: 19px; }
  .secondary { padding: 9px 10px; }
}
