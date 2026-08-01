"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Status = "C" | "O" | "AL" | "PL" | "CL" | "SL" | "OFF" | "N" | "";
type Period = "早" | "午" | "晚";
type Slot = { period: Period; status: Status; note: string };
type Staff = { id: string; name: string; role: string; weeklyTarget: number; annualLeaveEntitlement?: number };
type Records = Record<string, Record<string, Slot[]>>;
type LeaveType = "AL" | "PL" | "CL" | "SL";
type LeaveRequest = { id: string; staffId: string; staffName: string; leaveType: LeaveType; startDate: string; endDate: string; slotsJson: string; sections: number; reason: string; destination: string; workArrangement: string; compSource: string; status: "pending" | "approved" | "rejected"; reviewNote: string; createdAt: string };
type CompCredit = { id: number; appliedDate: string; earnedWeek: string; expiryDate: string; earnedDays: number; remainingDays: number; expired: boolean };
type LeaveSummary = { staffId: string; annualEntitlement: number; annualUsed: number; annualRemaining: number; compEarned: number; compUsed: number; compRemaining: number; compExpired: number; compCredits: CompCredit[]; pendingDays: number };

const initialStaff: Staff[] = [
  { id: "wu", name: "胡牧師", role: "堂主任 · 全職", weeklyTarget: 11 },
  { id: "joy", name: "JOY", role: "行政幹事 · 半職", weeklyTarget: 6 },
  { id: "cleaner", name: "清潔事務員", role: "清潔同工 · 半職", weeklyTarget: 6 },
];

const statusMeta: Record<Status, { label: string; short: string; className: string }> = {
  C: { label: "教會 C", short: "教會", className: "church" },
  O: { label: "外出 O", short: "外出", className: "outside" },
  AL: { label: "年假", short: "年假", className: "leave" },
  PL: { label: "事假", short: "事假", className: "personal-leave" },
  CL: { label: "補假", short: "補假", className: "comp-leave" },
  SL: { label: "病假", short: "病假", className: "sick" },
  OFF: { label: "例假", short: "例假", className: "off" },
  N: { label: "非值班", short: "－", className: "not-duty" },
  "": { label: "未填寫", short: "未填", className: "empty" },
};

const periods: Period[] = ["早", "午", "晚"];
const countedStatuses: Status[] = ["C", "O", "AL", "PL", "CL", "SL"];

function countsTowardSections(status: Status) {
  return countedStatuses.includes(status);
}

function iso(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function addDays(value: string, amount: number) {
  const date = new Date(`${value}T12:00:00`);
  date.setDate(date.getDate() + amount);
  return iso(date);
}

function sundayOnOrBefore(value: string) {
  const date = new Date(`${value}T12:00:00`);
  date.setDate(date.getDate() - date.getDay());
  return iso(date);
}

function formatDate(value: string, withYear = false) {
  const date = new Date(`${value}T12:00:00`);
  return `${withYear ? `${date.getFullYear()}年` : ""}${date.getMonth() + 1}月${date.getDate()}日`;
}

function dayName(value: string) {
  return ["日", "一", "二", "三", "四", "五", "六"][new Date(`${value}T12:00:00`).getDay()];
}

function leaveDaysFromSections(sections: number) {
  return Math.round((sections / 3) * 100) / 100;
}

function formatLeaveDays(days: number) {
  const rounded = Math.round(days * 100) / 100;
  return `${rounded.toLocaleString("zh-HK", { maximumFractionDigits: 2 })} 日`;
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[character] ?? character));
}

function defaultSlots(person: Staff, dateValue: string): Slot[] {
  void person;
  void dateValue;
  return periods.map((period) => ({ period, status: "", note: "" }));
}

export default function Home() {
  const [staff, setStaff] = useState<Staff[]>(initialStaff);
  const [rangeStart, setRangeStart] = useState("2026-07-26");
  const rangeDates = useMemo(() => Array.from({ length: 14 }, (_, i) => addDays(rangeStart, i)), [rangeStart]);
  const rangeEnd = rangeDates[13];
  const [records, setRecords] = useState<Records>({});
  const [selectedId, setSelectedId] = useState("wu");
  const [selectedDate, setSelectedDate] = useState("2026-07-26");
  const [calendarView, setCalendarView] = useState<"team" | "personal">("team");
  const [loading, setLoading] = useState(false);
  const [saveState, setSaveState] = useState<"idle" | "unsaved" | "saving" | "saved" | "error">("idle");
  const [claims, setClaims] = useState<Record<string, number>>({});
  const [claimedTotal, setClaimedTotal] = useState(0);
  const [claimState, setClaimState] = useState<"idle" | "loading" | "saving" | "error">("idle");
  const [showStaffManager, setShowStaffManager] = useState(false);
  const [staffForm, setStaffForm] = useState({ name: "", role: "同工", weeklyTarget: "6" });
  const [staffState, setStaffState] = useState<"idle" | "saving" | "error">("idle");
  const [activeNav, setActiveNav] = useState<"schedule" | "history" | "leave" | "staff">("schedule");
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);
  const [leaveSummaries, setLeaveSummaries] = useState<LeaveSummary[]>([]);
  const [leaveState, setLeaveState] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [leaveError, setLeaveError] = useState("");
  const [leaveForm, setLeaveForm] = useState({ leaveType: "AL" as LeaveType, startDate: rangeStart, endDate: rangeStart, slots: [] as string[], reason: "", destination: "", workArrangement: "", compSource: "" });
  const [leaveDownloadRange, setLeaveDownloadRange] = useState({ start: rangeStart, end: rangeEnd });
  const dirtyRef = useRef(false);
  const editRevisionRef = useRef(0);
  const saveQueueRef = useRef<Promise<boolean>>(Promise.resolve(true));
  const selected = staff.find((person) => person.id === selectedId) ?? staff[0] ?? initialStaff[0];

  useEffect(() => {
    fetch("/api/staff")
      .then(async (response) => {
        if (!response.ok) throw new Error("staff load failed");
        return response.json();
      })
      .then((data) => {
        const next = (data.staff ?? []).map((person: Staff) => ({
          id: person.id,
          name: person.name,
          role: person.role,
          weeklyTarget: Number(person.weeklyTarget),
          annualLeaveEntitlement: Number(person.annualLeaveEntitlement ?? 0),
        }));
        if (next.length) {
          setStaff(next);
          if (!next.some((person: Staff) => person.id === selectedId)) setSelectedId(next[0].id);
        }
      })
      .catch(() => setStaffState("error"));
  }, []);

  async function loadLeaveRequests() {
    try {
      const response = await fetch("/api/leave-requests");
      if (!response.ok) throw new Error("leave load failed");
      const data = await response.json();
      setLeaveRequests(data.requests ?? []);
      setLeaveSummaries(data.summaries ?? []);
    } catch {
      setLeaveState("error");
    }
  }

  useEffect(() => { void loadLeaveRequests(); }, []);

  const leaveDates = useMemo(() => {
    if (!leaveForm.startDate || !leaveForm.endDate || leaveForm.endDate < leaveForm.startDate) return [];
    const values: string[] = [];
    for (let value = leaveForm.startDate; value <= leaveForm.endDate && values.length < 62; value = addDays(value, 1)) values.push(value);
    return values;
  }, [leaveForm.startDate, leaveForm.endDate]);
  const selectedLeaveSummary = leaveSummaries.find((item) => item.staffId === selectedId);
  const leaveTypeLabels: Record<LeaveType, string> = { AL: "年假", PL: "事假", CL: "補假", SL: "病假" };

  function toggleLeaveSlot(date: string, period: Period) {
    const key = `${date}|${period}`;
    setLeaveForm((current) => ({ ...current, slots: current.slots.includes(key) ? current.slots.filter((item) => item !== key) : [...current.slots, key] }));
  }

  async function submitLeaveRequest(event: React.FormEvent) {
    event.preventDefault();
    setLeaveState("saving");
    setLeaveError("");
    const response = await fetch("/api/leave-requests", {
      method: "POST", headers: { "content-type": "application/json" },
      body: JSON.stringify({
        staffId: selected.id, staffName: selected.name, leaveType: leaveForm.leaveType,
        startDate: leaveForm.startDate, endDate: leaveForm.endDate,
        slots: leaveForm.slots.map((value) => { const [date, period] = value.split("|"); return { date, period }; }),
        reason: leaveForm.reason, destination: leaveForm.destination,
        workArrangement: leaveForm.workArrangement, compSource: leaveForm.compSource,
      }),
    });
    if (!response.ok) { const data = await response.json().catch(() => ({})); setLeaveError(data.error ?? "未能處理，請再試。"); setLeaveState("error"); return; }
    setLeaveForm((current) => ({ ...current, slots: [], reason: "", destination: "", workArrangement: "", compSource: "" }));
    setLeaveState("saved");
    await loadLeaveRequests();
  }

  async function reviewLeaveRequest(id: string, status: "approved" | "rejected") {
    if (!window.confirm(status === "approved" ? "批准後會自動寫入出席表，確定批准？" : "確定拒絕這項申請？")) return;
    setLeaveState("saving");
    const response = await fetch("/api/leave-requests", { method: "PATCH", headers: { "content-type": "application/json" }, body: JSON.stringify({ id, status }) });
    if (!response.ok) { const data = await response.json().catch(() => ({})); setLeaveError(data.error ?? "未能處理，請再試。"); setLeaveState("error"); return; }
    setLeaveState("saved");
    await loadLeaveRequests();
  }

  async function deleteLeaveRequest(item: LeaveRequest) {
    const approvedNote = item.status === "approved" ? "，相關假期亦會從出席表移除" : "";
    if (!window.confirm(`確定刪除「${item.staffName} · ${leaveTypeLabels[item.leaveType]}」申請${approvedNote}？此操作不能復原。`)) return;
    setLeaveState("saving");
    const response = await fetch(`/api/leave-requests?id=${encodeURIComponent(item.id)}`, { method: "DELETE" });
    if (!response.ok) { setLeaveState("error"); return; }
    setLeaveState("saved");
    await loadLeaveRequests();
  }

  async function updateAnnualEntitlement(value: number) {
    const response = await fetch("/api/staff", { method: "PATCH", headers: { "content-type": "application/json" }, body: JSON.stringify({ id: selected.id, annualLeaveEntitlement: value }) });
    if (!response.ok) { setLeaveState("error"); return; }
    setStaff((current) => current.map((person) => person.id === selected.id ? { ...person, annualLeaveEntitlement: value } : person));
    await loadLeaveRequests();
  }

  function downloadLeaveWord() {
    const selectedRequests = leaveRequests.filter((item) => item.startDate <= leaveDownloadRange.end && item.endDate >= leaveDownloadRange.start);
    if (!selectedRequests.length) { window.alert("所選時段沒有假期申請記錄。"); return; }
    const statusLabels = { pending: "待批核", approved: "已批准", rejected: "已拒絕" } as const;
    const rows = selectedRequests.map((item, index) => `<tr><td>${index + 1}</td><td>${escapeHtml(item.staffName)}</td><td>${leaveTypeLabels[item.leaveType]}</td><td>${formatDate(item.startDate, true)} 至 ${formatDate(item.endDate, true)}</td><td>${formatLeaveDays(leaveDaysFromSections(item.sections))}</td><td>${formatDate(item.createdAt.slice(0, 10), true)}</td><td>${escapeHtml(item.reason || "—")}</td><td>${escapeHtml(item.workArrangement || "—")}</td><td>${escapeHtml(item.compSource || "—")}</td><td>${escapeHtml(item.destination || "—")}</td><td>${statusLabels[item.status]}</td></tr>`).join("");
    const html = `<!doctype html><html><head><meta charset="utf-8"><style>@page{size:A4 landscape;margin:1cm}body{font-family:"Microsoft JhengHei",Arial,sans-serif;color:#16324f}h1{text-align:center;font-size:18pt;margin:0 0 6px}p{text-align:center;margin:0 0 14px;color:#556575}table{width:100%;border-collapse:collapse;table-layout:fixed;font-size:8.5pt}th,td{border:1px solid #7b8791;padding:6px 4px;vertical-align:top;word-wrap:break-word}th{background:#dff3ed;text-align:center}td:nth-child(1),td:nth-child(3),td:nth-child(5),td:nth-child(6),td:nth-child(11){text-align:center}.note{margin-top:10px;text-align:left;font-size:8pt;color:#6c7684}</style></head><body><h1>協基會恩景堂同工假期申請記錄</h1><p>下載時段：${formatDate(leaveDownloadRange.start, true)} 至 ${formatDate(leaveDownloadRange.end, true)}</p><table><thead><tr><th>序</th><th>同工</th><th>假別</th><th>放假日期</th><th>日數</th><th>申請日期</th><th>原因</th><th>工作安排</th><th>補假來源</th><th>離港地點</th><th>狀態</th></tr></thead><tbody>${rows}</tbody></table><p class="note">註：假期以日計算；早、午、晚各為三分一日。補假由申請日起三個月內有效。</p></body></html>`;
    const url = URL.createObjectURL(new Blob(["\ufeff", html], { type: "application/msword;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = `恩景堂假期申請_${leaveDownloadRange.start}_${leaveDownloadRange.end}.doc`;
    link.click();
    URL.revokeObjectURL(url);
  }

  function buildDefaults(): Records {
    const next: Records = {};
    for (const person of staff) {
      next[person.id] = {};
      for (const date of rangeDates) next[person.id][date] = defaultSlots(person, date);
    }
    return next;
  }

  useEffect(() => {
    let active = true;
    setLoading(true);
    fetch(`/api/attendance?start=${rangeStart}&end=${rangeEnd}`)
      .then((response) => response.ok ? response.json() : { rows: [] })
      .then((data) => {
        if (!active) return;
        const next = buildDefaults();
        for (const row of data.rows ?? []) {
          if (!next[row.staffId]?.[row.workDate]) continue;
          const slot = next[row.staffId][row.workDate].find((item) => item.period === row.period);
          if (slot) Object.assign(slot, { status: row.status, note: row.note });
        }
        setRecords(next);
        dirtyRef.current = false;
        setSaveState("saved");
        if (!rangeDates.includes(selectedDate)) setSelectedDate(rangeStart);
      })
      .catch(() => active && setRecords(buildDefaults()))
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, [rangeStart, rangeEnd, staff]);

  const selectedSlots = records[selectedId]?.[selectedDate] ?? defaultSlots(selected, selectedDate);
  const weekCounts = useMemo(() => [0, 1].map((weekIndex) =>
    rangeDates.slice(weekIndex * 7, weekIndex * 7 + 7)
      .flatMap((date) => records[selectedId]?.[date] ?? [])
      .filter((slot) => countsTowardSections(slot.status)).length
  ), [records, selectedId, rangeDates]);
  const weekDifferences = weekCounts.map((count) => count - selected.weeklyTarget);
  const fortnightDifference = weekCounts[0] + weekCounts[1] - selected.weeklyTarget * 2;
  const weekStarts = [rangeStart, rangeDates[7]];

  useEffect(() => {
    let active = true;
    setClaimState("loading");
    fetch(`/api/comp-leave?staffId=${encodeURIComponent(selectedId)}&week1=${weekStarts[0]}&week2=${weekStarts[1]}`)
      .then(async (response) => {
        if (!response.ok) throw new Error("claim load failed");
        return response.json();
      })
      .then((data) => {
        if (!active) return;
        const next: Record<string, number> = {};
        for (const claim of data.claims ?? []) next[claim.weekStart] = Number(claim.sections);
        setClaims(next);
        setClaimedTotal(Number(data.total ?? 0));
        setClaimState("idle");
      })
      .catch(() => active && setClaimState("error"));
    return () => { active = false; };
  }, [selectedId, rangeStart]);

  function updateSlot(period: Period, patch: Partial<Slot>) {
    setRecords((current) => {
      const next = structuredClone(current);
      next[selectedId] ??= {};
      next[selectedId][selectedDate] ??= defaultSlots(selected, selectedDate);
      const slot = next[selectedId][selectedDate].find((item) => item.period === period);
      if (slot) Object.assign(slot, patch);
      return next;
    });
    dirtyRef.current = true;
    editRevisionRef.current += 1;
    setSaveState("unsaved");
  }

  function openDay(personId: string, dateValue: string) {
    setSelectedId(personId);
    setSelectedDate(dateValue);
    window.setTimeout(() => document.getElementById("day-editor")?.scrollIntoView({ behavior: "smooth", block: "start" }), 30);
  }

  function persistRange(snapshot: Records, start: string, end: string, dates: string[]) {
    const rows = staff.flatMap((person) => dates.flatMap((date) =>
      (snapshot[person.id]?.[date] ?? defaultSlots(person, date)).map((slot) => ({
        staffId: person.id,
        staffName: person.name,
        role: person.role,
        period: slot.period,
        status: slot.status,
        note: slot.note,
        workDate: date,
      })),
    ));
    const revision = editRevisionRef.current;
    const queuedSave = saveQueueRef.current.then(async () => {
      setSaveState("saving");
      try {
        const response = await fetch("/api/attendance", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ start, end, rows }),
        });
        if (!response.ok) throw new Error("save failed");
        if (revision === editRevisionRef.current) {
          dirtyRef.current = false;
          setSaveState("saved");
        } else {
          setSaveState("unsaved");
        }
        return true;
      } catch {
        setSaveState("error");
        return false;
      }
    });
    saveQueueRef.current = queuedSave;
    return queuedSave;
  }

  async function saveRange() {
    return persistRange(records, rangeStart, rangeEnd, rangeDates);
  }

  useEffect(() => {
    if (!dirtyRef.current || loading) return;
    const timer = window.setTimeout(() => {
      void persistRange(records, rangeStart, rangeEnd, rangeDates);
    }, 700);
    return () => window.clearTimeout(timer);
  }, [records, loading, rangeStart, rangeEnd, rangeDates]);

  function downloadWord() {
    const rows = staff.map((person) => {
      const cells = rangeDates.map((date) => {
        const lines = (records[person.id]?.[date] ?? defaultSlots(person, date))
          .map((slot) => `<div class="${statusMeta[slot.status].className}"><b>${slot.period}</b> ${statusMeta[slot.status].short}</div>`).join("");
        return `<td>${lines}</td>`;
      }).join("");
      return `<tr><th>${person.name}<br><small>${person.role}</small></th>${cells}</tr>`;
    }).join("");
    const headers = rangeDates.map((date) => `<th>${formatDate(date)}<br>星期${dayName(date)}</th>`).join("");
    const html = `<!doctype html><html><head><meta charset="utf-8"><style>
      @page{size:A4 landscape;margin:0.55cm}body{font-family:"Microsoft JhengHei",sans-serif;color:#16324f}h1{text-align:center;margin:0 0 5px;font-size:16pt}
      p{margin:3px 0 8px;text-align:center;font-size:9pt}.legend{text-align:center;margin-bottom:8px;font-size:8pt}
      table{border-collapse:collapse;width:100%;table-layout:fixed;font-size:7.5pt}th,td{border:1px solid #7b8791;padding:3px 2px;vertical-align:top;text-align:center}
      th{background:#dff3ed}th:first-child{width:8%}td div{margin-bottom:3px;padding:2px;border-radius:3px;white-space:nowrap}
      .church{background:#dcf5ec}.outside{background:#e4f2ff}.leave{background:#fff0cb}.personal-leave{background:#ffe8c7}.comp-leave{background:#dff4ff}.sick{background:#ffe2e7}.off{background:#eee7ff}.not-duty{background:#e9edf0}
    </style></head><body><h1>恩景堂同工兩週出席總覽</h1>
      <p>日期：${formatDate(rangeStart, true)} 至 ${formatDate(rangeEnd, true)}</p>
      <div class="legend">計入節數：教會 C・外出 O・年假・事假・補假・病假　｜　不計：例假・非值班</div>
      <table><tr><th>同工</th>${headers}</tr>${rows}</table></body></html>`;
    const url = URL.createObjectURL(new Blob(["\ufeff", html], { type: "application/msword;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = `恩景堂同工出席_${rangeStart}_${rangeEnd}.doc`;
    link.click();
    URL.revokeObjectURL(url);
  }

  async function switchRange(next: string) {
    if (dirtyRef.current) {
      const ok = await saveRange();
      if (!ok) return;
    }
    const sunday = sundayOnOrBefore(next);
    setRangeStart(sunday);
    setSelectedDate(sunday);
  }

  function changeRange(amount: number) {
    const next = addDays(rangeStart, amount);
    void switchRange(next);
  }

  async function toggleCompLeaveClaim(weekIndex: number) {
    const weekStart = weekStarts[weekIndex];
    const currentClaim = claims[weekStart] ?? 0;
    const applied = currentClaim <= 0;
    const sections = Math.max(0, weekDifferences[weekIndex]);
    if (applied && sections <= 0) return;

    setClaimState("saving");
    try {
      const response = await fetch("/api/comp-leave", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          staffId: selected.id,
          staffName: selected.name,
          weekStart,
          weekEnd: addDays(weekStart, 6),
          sections,
          applied,
        }),
      });
      if (!response.ok) throw new Error("claim update failed");
      setClaims((current) => {
        const next = { ...current };
        if (applied) next[weekStart] = sections;
        else delete next[weekStart];
        return next;
      });
      setClaimedTotal((total) => Math.max(0, total - currentClaim + (applied ? sections : 0)));
      setClaimState("idle");
    } catch {
      setClaimState("error");
    }
  }

  function differenceText(value: number) {
    if (value > 0) return `多 ${value} 節`;
    if (value < 0) return `少 ${Math.abs(value)} 節`;
    return "剛好達標";
  }

  async function addStaffMember(event: React.FormEvent) {
    event.preventDefault();
    setStaffState("saving");
    try {
      const response = await fetch("/api/staff", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: staffForm.name,
          role: staffForm.role,
          weeklyTarget: Number(staffForm.weeklyTarget),
        }),
      });
      if (!response.ok) throw new Error("staff add failed");
      const data = await response.json();
      const person = { ...data.staff, weeklyTarget: Number(data.staff.weeklyTarget) } as Staff;
      setStaff((current) => [...current, person]);
      setSelectedId(person.id);
      setStaffForm({ name: "", role: "同工", weeklyTarget: "6" });
      setStaffState("idle");
    } catch {
      setStaffState("error");
    }
  }

  async function removeStaffMember(person: Staff) {
    if (staff.length <= 1 || !window.confirm(`確定移除「${person.name}」？舊出席記錄會保留。`)) return;
    setStaffState("saving");
    try {
      const response = await fetch(`/api/staff?id=${encodeURIComponent(person.id)}`, { method: "DELETE" });
      if (!response.ok) throw new Error("staff remove failed");
      const next = staff.filter((item) => item.id !== person.id);
      setStaff(next);
      if (selectedId === person.id) setSelectedId(next[0].id);
      setStaffState("idle");
    } catch {
      setStaffState("error");
    }
  }

  function navigateTo(section: "schedule" | "history" | "leave" | "staff") {
    setActiveNav(section);
    if (section === "staff") setShowStaffManager(true);
    if (section === "history") setCalendarView("team");
    const targetId = section === "schedule" ? "day-editor" : section === "history" ? "fortnight-overview" : section === "leave" ? "leave-requests" : "staff-manager";
    window.setTimeout(() => {
      document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 30);
  }

  const saveLabel = saveState === "saving" ? "儲存中…" : saveState === "saved" ? "✓ 已自動儲存" : saveState === "error" ? "⚠ 儲存失敗，請再按" : saveState === "unsaved" ? "等待自動儲存…" : "自動儲存";

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand-mark"><span>✦</span><b>恩景堂</b></div>
        <nav>
          <button className={activeNav === "schedule" ? "nav-active" : ""} aria-current={activeNav === "schedule" ? "page" : undefined} onClick={() => navigateTo("schedule")}><span>⌂</span>出席編排</button>
          <button className={activeNav === "history" ? "nav-active" : ""} aria-current={activeNav === "history" ? "page" : undefined} onClick={() => navigateTo("history")}><span>▦</span>歷史記錄</button>
          <button className={activeNav === "leave" ? "nav-active" : ""} aria-current={activeNav === "leave" ? "page" : undefined} onClick={() => navigateTo("leave")}><span>□</span>假期申請</button>
          <button className={activeNav === "staff" ? "nav-active" : ""} aria-current={activeNav === "staff" ? "page" : undefined} onClick={() => navigateTo("staff")}><span>♙</span>同工</button>
        </nav>
        <p className="motto">♥<br />彼此建立<br />榮耀主名</p>
      </aside>

      <div className="workspace">
        <header className="topbar">
          <div><p className="eyebrow">協基會恩景堂</p><h1>同工出席</h1></div>
          <div className="range-nav">
            <button onClick={() => changeRange(-14)}>‹ 上兩週</button>
            <div className="date-range-control">
              <label><span>開始日期</span><input type="date" value={rangeStart} onChange={(e) => void switchRange(e.target.value)} /></label>
              <i>至</i>
              <div className="end-date"><span>結束日期</span><b>{formatDate(rangeEnd, true)}</b></div>
              <em>共14天</em>
            </div>
            <button onClick={() => changeRange(14)}>下兩週 ›</button>
          </div>
          <div className="profile">胡</div>
        </header>

        <div className="period-banner">
          <div><b>{formatDate(rangeStart, true)} — {formatDate(rangeEnd, true)}（共14天）</b><span>{loading ? "載入記錄中…" : "星期日至第二個星期六，共14天；可編排未來，亦可返回修改過去記錄"}</span></div>
          <div><span className={`autosave-state ${saveState}`}>{saveLabel}</span><button className="word-button" onClick={downloadWord}>▣ 下載簡潔 Word</button><button className="save-main" onClick={() => void saveRange()}>立即儲存</button></div>
        </div>

        <div className="mobile-tabs">
          {staff.map((person) => <button key={person.id} className={selectedId === person.id ? "active" : ""} onClick={() => setSelectedId(person.id)}>{person.name}</button>)}
          <button className="manage-staff-button" onClick={() => setShowStaffManager((value) => !value)}>＋ 同工</button>
        </div>

        <section className="staff-manager" id="staff-manager">
          <button className="staff-manager-toggle" onClick={() => setShowStaffManager((value) => !value)}>
            <span>♙ 同工自行填寫</span><b>{showStaffManager ? "收起名單" : "管理同工名單"}</b>
          </button>
          <p>每位同工先選自己的姓名，再填寫早、午、晚；沒有填寫的時段會顯示「未填寫」。</p>
          {showStaffManager && (
            <div className="staff-manager-body">
              <div className="staff-member-list">
                {staff.map((person) => (
                  <div key={person.id}>
                    <button className={selectedId === person.id ? "selected" : ""} onClick={() => setSelectedId(person.id)}>
                      <b>{person.name}</b><small>{person.role} · {person.weeklyTarget}節／週</small>
                    </button>
                    <button className="remove-staff" disabled={staff.length <= 1 || staffState === "saving"} onClick={() => void removeStaffMember(person)}>移除</button>
                  </div>
                ))}
              </div>
              <form className="add-staff-form" onSubmit={(event) => void addStaffMember(event)}>
                <h3>新增同工</h3>
                <input required placeholder="姓名" value={staffForm.name} onChange={(event) => setStaffForm({ ...staffForm, name: event.target.value })} />
                <input required placeholder="職位／全職或半職" value={staffForm.role} onChange={(event) => setStaffForm({ ...staffForm, role: event.target.value })} />
                <label>每週目標節數<input required type="number" min="0.5" step="0.5" value={staffForm.weeklyTarget} onChange={(event) => setStaffForm({ ...staffForm, weeklyTarget: event.target.value })} /></label>
                <button type="submit" disabled={staffState === "saving"}>{staffState === "saving" ? "處理中…" : "＋ 新增同工"}</button>
                {staffState === "error" && <small>未能更新同工名單，請再試。</small>}
              </form>
            </div>
          )}
        </section>

        <section className="leave-panel" id="leave-requests">
          <div className="leave-heading">
            <div><span className="heading-icon">□</span><div><h2>假期申請</h2><small>假期以日計算；早、午、晚各為三分一日</small></div></div>
            <select value={selectedId} onChange={(event) => setSelectedId(event.target.value)} aria-label="申請同工">
              {staff.map((person) => <option key={person.id} value={person.id}>{person.name}</option>)}
            </select>
          </div>
          <div className="leave-balance-grid">
            <article><small>年假總額（上限30日）</small><strong>{formatLeaveDays(selectedLeaveSummary?.annualEntitlement ?? Math.min(30, selected.annualLeaveEntitlement ?? 0))}</strong><label>設定（日）<input type="number" min="0" max="30" step="0.5" value={Math.min(30, selected.annualLeaveEntitlement ?? 0)} onChange={(event) => void updateAnnualEntitlement(Math.min(30, Number(event.target.value)))} /></label></article>
            <article><small>年假尚餘</small><strong>{formatLeaveDays(selectedLeaveSummary?.annualRemaining ?? 0)}</strong><span>只計已批准申請</span></article>
            <article><small>有效補假尚餘</small><strong>{formatLeaveDays(selectedLeaveSummary?.compRemaining ?? 0)}</strong><span>累積 {formatLeaveDays(selectedLeaveSummary?.compEarned ?? 0)} · 已用 {formatLeaveDays(selectedLeaveSummary?.compUsed ?? 0)} · 逾期 {formatLeaveDays(selectedLeaveSummary?.compExpired ?? 0)}</span></article>
            <article><small>待批核</small><strong>{formatLeaveDays(selectedLeaveSummary?.pendingDays ?? 0)}</strong><span>未批核暫不扣假</span></article>
          </div>
          <div className="leave-download-panel"><div><h3>下載假期申請 Word</h3><small>選擇日期範圍，只下載該時段內的申請記錄。</small></div><label>開始日期<input type="date" value={leaveDownloadRange.start} onChange={(event) => setLeaveDownloadRange((current) => ({ ...current, start: event.target.value, end: event.target.value > current.end ? event.target.value : current.end }))} /></label><label>結束日期<input type="date" min={leaveDownloadRange.start} value={leaveDownloadRange.end} onChange={(event) => setLeaveDownloadRange((current) => ({ ...current, end: event.target.value }))} /></label><button onClick={downloadLeaveWord}>▣ 下載 Word</button></div>
          <div className="comp-credit-panel"><h3>補假申請日期及累積記錄</h3>{!selectedLeaveSummary?.compCredits?.length ? <p>暫時沒有補假累積。</p> : <div>{selectedLeaveSummary.compCredits.map((credit) => <article key={credit.id} className={credit.expired ? "expired" : "valid"}><span><b>申請：{formatDate(credit.appliedDate, true)}</b><small>超時工作週：{formatDate(credit.earnedWeek)}</small></span><span><b>{formatLeaveDays(credit.earnedDays)}</b><small>尚餘 {formatLeaveDays(credit.remainingDays)}</small></span><em>{credit.expired ? "已逾期" : `有效至 ${formatDate(credit.expiryDate, true)}`}</em></article>)}</div>}</div>
          <div className="leave-layout">
            <form className="leave-form" onSubmit={(event) => void submitLeaveRequest(event)}>
              <h3>新增申請</h3>
              <div className="leave-types">{(["AL", "PL", "CL", "SL"] as LeaveType[]).map((type) => <button type="button" key={type} className={leaveForm.leaveType === type ? "chosen" : ""} onClick={() => setLeaveForm({ ...leaveForm, leaveType: type })}>{leaveTypeLabels[type]}</button>)}</div>
              <div className="leave-date-fields"><label>開始日期<input type="date" required value={leaveForm.startDate} onChange={(event) => setLeaveForm({ ...leaveForm, startDate: event.target.value, endDate: event.target.value > leaveForm.endDate ? event.target.value : leaveForm.endDate, slots: [] })} /></label><label>結束日期<input type="date" required min={leaveForm.startDate} value={leaveForm.endDate} onChange={(event) => setLeaveForm({ ...leaveForm, endDate: event.target.value, slots: [] })} /></label></div>
              <fieldset className="leave-slot-picker"><legend>選擇放假的時段</legend>{leaveDates.map((date) => <div key={date}><span><b>{formatDate(date)}</b> 星期{dayName(date)}</span>{periods.map((period) => <button type="button" key={period} className={leaveForm.slots.includes(`${date}|${period}`) ? "selected" : ""} onClick={() => toggleLeaveSlot(date, period)}>{period}</button>)}</div>)}</fieldset>
              <p className="leave-section-total">已選：<b>{formatLeaveDays(leaveDaysFromSections(leaveForm.slots.length))}</b><small>（{leaveForm.slots.length}個時段）</small></p>
              <label>簡短原因（可選）<textarea value={leaveForm.reason} onChange={(event) => setLeaveForm({ ...leaveForm, reason: event.target.value })} placeholder="例如：家庭安排" /></label>
              <label>工作安排（可選）<textarea value={leaveForm.workArrangement} onChange={(event) => setLeaveForm({ ...leaveForm, workArrangement: event.target.value })} placeholder="需要交代的工作或代班安排" /></label>
              {leaveForm.leaveType === "CL" && <label>補假來源（必填）<input required value={leaveForm.compSource} onChange={(event) => setLeaveForm({ ...leaveForm, compSource: event.target.value })} placeholder="例如：7月26日活動超時工作" /></label>}
              <label>離港地點（如適用）<input value={leaveForm.destination} onChange={(event) => setLeaveForm({ ...leaveForm, destination: event.target.value })} placeholder="例如：深圳" /></label>
              <button className="leave-submit" disabled={!leaveForm.slots.length || leaveState === "saving"}>{leaveState === "saving" ? "處理中…" : `遞交 ${formatLeaveDays(leaveDaysFromSections(leaveForm.slots.length))}申請`}</button>
              {leaveState === "saved" && <small className="leave-success">✓ 已遞交申請</small>}{leaveState === "error" && <small className="leave-error">{leaveError || "未能處理，請再試。"}</small>}
            </form>
            <div className="leave-history"><h3>申請及批核記錄</h3>{leaveRequests.length === 0 ? <p className="empty-leave">暫時沒有申請。</p> : leaveRequests.map((item) => <article key={item.id}><header><div><b>{item.staffName} · {leaveTypeLabels[item.leaveType]}</b><small>{formatDate(item.startDate)} 至 {formatDate(item.endDate)} · {formatLeaveDays(leaveDaysFromSections(item.sections))}</small></div><span className={`leave-status ${item.status}`}>{item.status === "pending" ? "待批核" : item.status === "approved" ? "已批准" : "已拒絕"}</span></header>{item.reason && <p>原因：{item.reason}</p>}{item.workArrangement && <p>工作安排：{item.workArrangement}</p>}{item.compSource && <p>補假來源：{item.compSource}</p>}{item.destination && <p>離港地點：{item.destination}</p>}<div className="leave-record-actions">{item.status === "pending" && <div className="review-actions"><button onClick={() => void reviewLeaveRequest(item.id, "approved")}>批准並加入出席表</button><button onClick={() => void reviewLeaveRequest(item.id, "rejected")}>拒絕</button></div>}<button className="delete-leave" onClick={() => void deleteLeaveRequest(item)}>刪除記錄</button></div></article>)}</div>
          </div>
          <div className="leave-rules"><b>簡化申請提示</b><span>每年累積年假上限為30日；年假宜預早一個月申請；補假宜提前兩日，並註明相關超時工作；補假由申請日起三個月內取用，逾期自動失效，並按最早到期的補假先扣除；離港請填地點。</span></div>
        </section>

        <section className="dashboard">
          <div className="main-column">
            <section className="day-editor" id="day-editor">
              <div className="section-heading">
                <div><span className="heading-icon">✎</span><h2>編輯出席</h2><small>{selected.name} · {formatDate(selectedDate, true)} 星期{dayName(selectedDate)}</small></div>
              </div>
              <div className="editor-date-strip">
                {rangeDates.map((date) => <button key={date} className={selectedDate === date ? "active" : ""} onClick={() => setSelectedDate(date)}><small>{dayName(date)}</small><b>{new Date(`${date}T12:00:00`).getDate()}</b></button>)}
              </div>
              <div className="slot-list">
                {selectedSlots.map((slot, index) => (
                  <article className={`slot-card period-${index}`} key={slot.period}>
                    <div className="period"><span>{index === 0 ? "☀" : index === 1 ? "◒" : "☾"}</span><strong>{slot.period}</strong></div>
                    <div className="slot-content">
                      <div className="status-picker">{(["C", "O", "AL", "PL", "CL", "SL", "OFF", "N", ""] as Status[]).map((status) => <button key={status || "empty"} className={slot.status === status ? "chosen" : ""} onClick={() => updateSlot(slot.period, { status, ...(status === "" ? { note: "" } : {}) })}>{statusMeta[status].label}</button>)}</div>
                      <textarea value={slot.note} onChange={(e) => updateSlot(slot.period, { note: e.target.value })} placeholder="簡短工作內容" aria-label={`${slot.period}工作內容`} />
                    </div>
                    <div className="slot-actions"><span className={`status ${statusMeta[slot.status].className}`}>{statusMeta[slot.status].label}</span></div>
                  </article>
                ))}
              </div>
            </section>

            <section className="fortnight" id="fortnight-overview">
              <div className="calendar-heading">
                <div className="section-title"><span>▦</span><div><h2>兩星期總覽</h2><small>{formatDate(rangeStart)}至{formatDate(rangeEnd)} · 每格可按入修改</small></div></div>
                <div className="view-switch"><button className={calendarView === "team" ? "active" : ""} onClick={() => setCalendarView("team")}>全體同工</button><button className={calendarView === "personal" ? "active" : ""} onClick={() => setCalendarView("personal")}>個人詳細</button></div>
              </div>
              {calendarView === "team" ? (
                <div className="team-calendar-wrap">
                  <div className="team-calendar" style={{ "--days": 14 } as React.CSSProperties}>
                    <div className="team-corner">同工</div>
                    {rangeDates.map((date) => <div key={date} className={`team-date ${date === selectedDate ? "is-today" : ""}`}><b>{new Date(`${date}T12:00:00`).getMonth() + 1}/{new Date(`${date}T12:00:00`).getDate()}</b><small>{dayName(date)}</small></div>)}
                    {staff.map((person, personIndex) => <div className="team-row" key={person.id}>
                      <button className="team-name" onClick={() => { setSelectedId(person.id); setCalendarView("personal"); }}><span className={`avatar avatar-${personIndex}`}>{person.name === "JOY" ? "J" : person.name[0]}</span><span><b>{person.name}</b><small>{person.weeklyTarget}節／週</small></span></button>
                      {rangeDates.map((date) => <button key={`${person.id}-${date}`} className={`team-day ${date === selectedDate ? "is-today" : ""}`} onClick={() => openDay(person.id, date)}>
                        {(records[person.id]?.[date] ?? defaultSlots(person, date)).map((slot) => <span key={slot.period} className={statusMeta[slot.status].className}><b>{slot.period}</b>{statusMeta[slot.status].short}</span>)}
                      </button>)}
                    </div>)}
                  </div>
                </div>
              ) : (
                <div className="calendar-grid">
                  {rangeDates.map((date) => <article key={date} className={date === selectedDate ? "calendar-today" : ""} onClick={() => openDay(selectedId, date)}>
                    <header><span>{formatDate(date)}</span><b>星期{dayName(date)}</b></header>
                    <div className="day-slots">{(records[selectedId]?.[date] ?? defaultSlots(selected, date)).map((slot) => <div key={slot.period} className={statusMeta[slot.status].className}><strong>{slot.period}</strong><span>{statusMeta[slot.status].label}</span></div>)}</div>
                  </article>)}
                </div>
              )}
            </section>
          </div>

          <aside className="summary-column">
            <section className="goal-card">
              <div className="section-title coral"><span>◎</span><div><h2>兩週節數統計</h2><small>{selected.name} · 每週目標 {selected.weeklyTarget} 節</small></div></div>
              <div className="week-stat-list">
                {[0, 1].map((weekIndex) => {
                  const weekStart = weekStarts[weekIndex];
                  const claimed = claims[weekStart] ?? 0;
                  const difference = weekDifferences[weekIndex];
                  return (
                    <article className="week-stat" key={weekStart}>
                      <div><span>第{weekIndex === 0 ? "一" : "二"}週</span><small>{formatDate(weekStart)}–{formatDate(addDays(weekStart, 6))}</small></div>
                      <strong>{weekCounts[weekIndex]}<small> / {selected.weeklyTarget}節</small></strong>
                      <b className={difference > 0 ? "positive" : difference < 0 ? "negative" : "even"}>{differenceText(difference)}</b>
                      {(difference > 0 || claimed > 0) && (
                        <button className={claimed > 0 ? "claim-button claimed" : "claim-button"} disabled={claimState === "saving"} onClick={() => void toggleCompLeaveClaim(weekIndex)}>
                          {claimed > 0 ? `✓ 已申請 ${claimed} 節（取消）` : `申請補假 ${difference} 節`}
                        </button>
                      )}
                    </article>
                  );
                })}
              </div>
              <div className="fortnight-balance">
                <span>兩週總差額</span>
                <strong className={fortnightDifference > 0 ? "positive" : fortnightDifference < 0 ? "negative" : "even"}>{differenceText(fortnightDifference)}</strong>
              </div>
              <div className="claimed-total"><span>累積已申請補假</span><strong>{claimedTotal} 節</strong></div>
              {claimState === "loading" && <p className="claim-message">載入補假記錄中…</p>}
              {claimState === "error" && <p className="claim-message error">補假申請未能儲存，請再試。</p>}
              <p className="counting-note">計入：教會、外出、年假、事假、補假、病假<br />不計：例假、非值班</p>
            </section>
            <section className="activity-card">
              <div className="section-title coral"><span>✓</span><h2>本期狀態</h2></div>
              <p className="summary-copy">已選擇 <b>{formatDate(rangeStart)}</b> 至 <b>{formatDate(rangeEnd)}</b>。每次修改約一秒後自動儲存。</p>
              <div className={`autosave-state full ${saveState}`}>{saveLabel}</div>
              <button className="word-button full" onClick={downloadWord}>▣ 下載簡潔 Word</button>
              <button className="save-main full" onClick={() => void saveRange()}>立即儲存</button>
            </section>
          </aside>
        </section>
      </div>
    </main>
  );
}
