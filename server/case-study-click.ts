export interface AnalyticsEnv {
  GOOGLE_LOG_WEB_APP_URL?: string;
  GOOGLE_LOG_SECRET?: string;
  CLICK_RATE_LIMITER?: { limit(options: { key: string }): Promise<{ success: boolean }> };
}

type GeoRequest = Request & { cf?: { country?: string; region?: string } };

const CASE_STUDIES: Record<string, string> = {
  'community-club': 'Planfit — Community Club',
  'onboarding-paywall': 'Planfit — Onboarding & Paywall',
  'ai-stretching': 'Planfit — AI Stretching Recommendation',
};
const ORIGINS = new Set(['https://leiayun.com', 'https://www.leiayun.com']);

function response(status: number) {
  return new Response(null, { status, headers: { 'Cache-Control': 'no-store' } });
}

// Read a bounded body even when Content-Length is missing or untrusted.
async function readBody(request: Request): Promise<string> {
  const reader = request.body?.getReader();
  if (!reader) return '';
  let size = 0;
  let text = '';
  const decoder = new TextDecoder();
  while (true) {
    const { done, value } = await reader.read();
    if (done) return text + decoder.decode();
    size += value.byteLength;
    if (size > 512) {
      await reader.cancel();
      throw new Error('Body too large');
    }
    text += decoder.decode(value, { stream: true });
  }
}

export async function handleCaseStudyClick(request: GeoRequest, env: AnalyticsEnv): Promise<Response> {
  if (request.method !== 'POST') return response(405);
  if (!ORIGINS.has(request.headers.get('Origin') ?? '')) return response(403);
  if (request.headers.get('Content-Type')?.split(';')[0].trim() !== 'application/json') return response(415);

  let body: unknown;
  try { body = JSON.parse(await readBody(request)); } catch { return response(400); }
  const slug = body && typeof body === 'object' && 'caseStudy' in body ? body.caseStudy : null;
  if (typeof slug !== 'string' || !Object.hasOwn(CASE_STUDIES, slug)) return response(400);
  if (!env.GOOGLE_LOG_SECRET || !env.GOOGLE_LOG_WEB_APP_URL || !env.CLICK_RATE_LIMITER) return response(503);
  if (!/^https:\/\/script\.google\.com\/macros\/s\/[A-Za-z0-9_-]+\/exec$/.test(env.GOOGLE_LOG_WEB_APP_URL)) return response(503);

  try {
    // IP is used transiently at Cloudflare for abuse control; never sent to Sheets.
    const ip = request.headers.get('CF-Connecting-IP');
    if (!ip) return response(400);
    const limit = await env.CLICK_RATE_LIMITER.limit({ key: ip });
    if (!limit.success) return response(429);
    const result = await fetch(env.GOOGLE_LOG_WEB_APP_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        secret: env.GOOGLE_LOG_SECRET,
        caseStudy: CASE_STUDIES[slug],
        country: request.cf?.country || 'Unknown',
        region: request.cf?.region || 'Unknown',
      }),
      signal: AbortSignal.timeout(8000),
      redirect: 'follow',
    });
    if (!result.ok) return response(502);
    const receipt = await result.json() as { ok?: boolean };
    return response(receipt.ok === true ? 204 : 502);
  } catch {
    // Do not log request bodies, IPs, secrets, or upstream response text.
    return response(502);
  }
}
