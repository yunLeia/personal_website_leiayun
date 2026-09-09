# Case study click logging

Status: implemented and locally checked; not deployed or writing live events yet.

Target: https://docs.google.com/spreadsheets/d/1ph9HcOPDto2MrRv6Kdno9wL4UiMgPmgNNiXNw5DJjjM/edit

Script editor: https://script.google.com/u/0/home/projects/10rYR8qjoN7NVbLBwjcgCcf2Ge5njKvHstiElK9gnYijzu1P8PIRkBpVx/edit

The Planfit buttons open their password dialog immediately and POST their project slug to `/api/case-study-click`. The Worker validates the event and origin, limits clicks per IP, adds Cloudflare country/region, and sends the result to Apps Script. The script records UTC time, case study, country, region in `Case Study Clicks`; `Click Summary` counts total and per-study clicks. No passwords, emails, cookies, visitor IDs, or raw IPs are written to Sheets. IPs are used only transiently in Cloudflare rate limiting. Location may be unknown or inaccurate (for example with VPNs).

## Google setup

The script is already saved in the bound Apps Script project above; the local source is `scripts/google-click-log/Code.gs`.

1. In Project Settings > Script Properties, set `GOOGLE_LOG_SECRET` to a strong randomly generated secret (at least 32 random bytes). Keep it private and use exactly the same value in the Cloudflare secret below.
2. Run `setupClickLog` in the editor and authorize Google spreadsheet access. It creates two new tabs and preserves existing tabs. It refuses to overwrite existing logging tabs. Do not rerun after successful setup.
3. Deploy > New deployment > Web app. Execute as your account; access: Anyone. The script accepts writes only with the shared secret. Keep the spreadsheet private. Review Google's permissions before authorizing the script.
4. Copy the deployed web app `/exec` URL, not the editor URL or test `/dev` URL.

## Cloudflare Workers setup

Confirm the existing Worker name and deployment method before deploying. No current active Wrangler config was available in the local project; the `.wrangler/deploy` cache points to a missing generated file.

Merge `wrangler.analytics.example.json` into the existing Worker configuration, preserving its name, account, domains, and other bindings. If adding a new root config, replace the example name with the existing Worker name. Use a rate-limit namespace ID that is unused in this account. The Worker must run first for `/api/*`; SPA fallback must not swallow this endpoint.

Configure these server-only Worker secrets:

- `GOOGLE_LOG_WEB_APP_URL`: the Apps Script deployment URL ending in `/exec`.
- `GOOGLE_LOG_SECRET`: the same secret entered in Script Properties.

Never prefix these secrets with `VITE_` or put them in frontend code or git. Run `npm run build`, then deploy using the existing Worker deployment process with `server/worker.ts` as the entrypoint and `dist` as its assets. The live domain must be `leiayun.com` or `www.leiayun.com` to log clicks; local development is intentionally excluded.

## Verification

- `node --test tests/case-study-click.test.mjs`
- TypeScript frontend/server checks, targeted ESLint, and Vite production build passed.
- After deployment, click each Planfit read-case-study button once, verify the popup still opens, verify one row per click with the correct study, and verify summary counts. Test rows are real clicks; remove only explicitly identified test rows if desired.

These are best-effort click counts, not unique visitors or confirmed readers. Failed network requests, blockers, rate limiting, and Apps Script quotas may omit events. Requests are not retried to avoid accidental double counts. Origin validation and rate limiting reduce noise but do not prove that clicks came from humans. Cloudflare rate limits are approximate and local to each Cloudflare location.

References: https://developers.cloudflare.com/workers/runtime-apis/bindings/rate-limit/ and https://developers.google.com/apps-script/guides/web
