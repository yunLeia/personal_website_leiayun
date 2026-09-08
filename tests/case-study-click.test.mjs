import { test, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import ts from 'typescript';

const source = readFileSync(new URL('../server/case-study-click.ts', import.meta.url), 'utf8');
const { outputText } = ts.transpileModule(source, { compilerOptions: { target: ts.ScriptTarget.ES2023, module: ts.ModuleKind.ESNext } });
const { handleCaseStudyClick } = await import('data:text/javascript;base64,' + Buffer.from(outputText).toString('base64'));
const originalFetch = globalThis.fetch;
afterEach(() => { globalThis.fetch = originalFetch; });
const env = {
  GOOGLE_LOG_WEB_APP_URL: 'https://script.google.com/macros/s/test/exec',
  GOOGLE_LOG_SECRET: 'test-only-secret',
  CLICK_RATE_LIMITER: { limit: async () => ({ success: true }) },
};
function request(body = { caseStudy: 'community-club' }, origin = 'https://www.leiayun.com') {
  const request = new Request(origin + '/api/case-study-click', {
    method: 'POST', headers: { Origin: origin, 'Content-Type': 'application/json', 'CF-Connecting-IP': '192.0.2.1' }, body: JSON.stringify(body),
  });
  request.cf = { country: 'US', region: 'New York' };
  return request;
}

test('sends only the selected study and server-provided coarse location', async () => {
  let sent;
  globalThis.fetch = async (_, options) => { sent = JSON.parse(options.body); return Response.json({ ok: true }); };
  const response = await handleCaseStudyClick(request({ caseStudy: 'community-club', country: 'forged', email: 'ignored', password: 'ignored' }), env);
  assert.equal(response.status, 204);
  assert.deepEqual(sent, { secret: 'test-only-secret', caseStudy: 'Planfit — Community Club', country: 'US', region: 'New York' });
});
test('rejects cross-origin and invalid study events without writing', async () => {
  globalThis.fetch = async () => { assert.fail('Unexpected write'); };
  assert.equal((await handleCaseStudyClick(request(undefined, 'https://example.com'), env)).status, 403);
  for (const caseStudy of ['__proto__', 'constructor', '=IMPORTXML()', 'unknown']) {
    assert.equal((await handleCaseStudyClick(request({ caseStudy }), env)).status, 400);
  }
  assert.equal((await handleCaseStudyClick(request(null), env)).status, 400);
  assert.equal((await handleCaseStudyClick(request({ caseStudy: 'x'.repeat(600) }), env)).status, 400);
});
test('fails closed without secrets or rate limit binding and respects throttling', async () => {
  globalThis.fetch = async () => { assert.fail('Unexpected write'); };
  assert.equal((await handleCaseStudyClick(request(), {})).status, 503);
  assert.equal((await handleCaseStudyClick(request(), { ...env, CLICK_RATE_LIMITER: undefined })).status, 503);
  assert.equal((await handleCaseStudyClick(request(), { ...env, CLICK_RATE_LIMITER: { limit: async () => ({ success: false }) } })).status, 429);
});
test('reports missing location and upstream failure without retrying', async () => {
  let calls = 0;
  globalThis.fetch = async (_, options) => {
    calls++;
    assert.equal(JSON.parse(options.body).country, 'Unknown');
    return Response.json({ ok: false });
  };
  const input = request(); delete input.cf;
  assert.equal((await handleCaseStudyClick(input, env)).status, 502);
  assert.equal(calls, 1);
  globalThis.fetch = async () => { throw new Error('network failure'); };
  assert.equal((await handleCaseStudyClick(request(), env)).status, 502);
});
