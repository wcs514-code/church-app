# 恩景堂同工出席

恩景堂同工出席、假期及補假管理網站。正式版本獨立運行於 Cloudflare Workers，所有共用資料存於 Cloudflare D1，不需要 ChatGPT 網址或登入。

## 架構

- React 19 + TypeScript + vinext
- Cloudflare Workers：前端靜態資源及 API
- Cloudflare D1：`attendance`、`staff_members`、`leave_requests`、`comp_leave_claims`
- Drizzle ORM 及版本化 SQL migrations

R2／KV 現時不需要：網站沒有附件上載，Word 報表由瀏覽器即時產生。

## 本機驗證

需要 Node.js 22.13 或以上。

```bash
npm ci
npm run lint
npm test
npm run build:cloudflare
npm run validate:artifact
npm run deploy:cloudflare -- --dry-run
```

## Cloudflare 設定

正式設定在 `wrangler.cloudflare.jsonc`：

- Worker：`yan-king-attendance`
- D1 binding：`DB`
- D1 database：`yan-king-attendance-db`
- 靜態輸出：`dist/client`
- Worker entry：`dist/server/index.js`

首次建立空資料庫時才執行 migrations：

```bash
npx wrangler d1 migrations apply yan-king-attendance-db --remote --config wrangler.cloudflare.jsonc
```

已有正式資料庫不可重新匯入或清空。部署前先以 D1 Time Travel／export 備份，再執行：

```bash
npm run deploy:cloudflare
```

## 舊資料遷移（只供一次性使用）

`attendance-export.json` 及產生的 `cloudflare-d1-import.sql` 均被 `.gitignore` 排除，避免個人資料進入 GitHub。

```bash
npm run db:prepare-import
npm run db:import:cloudflare
```

## 環境變數

目前沒有必要的應用程式 secret。日後新增私密設定時，按 `.env.example` 命名，正式值以 `wrangler secret put NAME` 設定，不可提交到 GitHub。

## 資料安全

- migration 只改 schema，不刪除正式資料。
- 不把 D1 匯出、個人資料或 `.env` 提交到 GitHub。
- 目前按使用要求不設登入或角色權限：任何取得網址的人都可讀寫及刪除資料。
