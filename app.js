async function loadApps() {
  const list = document.querySelector("#app-list");
  try {
    const response = await fetch("./apps.json", { cache: "no-store" });
    if (!response.ok) throw new Error("Unable to load apps");
    const apps = await response.json();
    if (!apps.length) {
      list.innerHTML = '<p class="empty-apps">新 Apps 發布後會顯示在這裡。</p>';
      return;
    }
    list.innerHTML = apps.map(app => `
      <a class="app-link" href="${app.url}" target="_blank" rel="noopener">
        <span class="app-icon" aria-hidden="true">${app.icon || "▦"}</span>
        <span class="app-copy"><strong>${app.name}</strong><small>${app.description || ""}</small></span>
        <span class="arrow" aria-hidden="true">→</span>
      </a>`).join("");
  } catch {
    list.innerHTML = '<p>Apps 入口稍後更新。</p>';
  }
}
loadApps();
