# 胡志成牧師網站及教會 Apps 發布中心

此專案用作胡志成牧師網站與教會 Apps 的標準化發布入口。

## 新增 App

新 App 完成並取得 Cloudflare 正式網址後，只需在 `apps.json` 加入：

- `name`：App 名稱
- `description`：簡介
- `icon`：入口圖示
- `url`：正式網址

網站會自動顯示新的 App 入口。需要表格、點名、統計或多人共用資料的 App，須另行配置 Cloudflare D1 資料庫。

## Cloudflare Pages

- Framework preset：None
- Build command：留空
- Build output directory：`/`
