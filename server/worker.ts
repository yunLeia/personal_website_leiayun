import { handleCaseStudyClick, type AnalyticsEnv } from './case-study-click';

interface Env extends AnalyticsEnv {
  ASSETS: { fetch(request: Request): Promise<Response> };
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (new URL(request.url).pathname === '/api/case-study-click') {
      return handleCaseStudyClick(request, env);
    }
    return env.ASSETS.fetch(request);
  },
};
