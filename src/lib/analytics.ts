/** Best-effort click counts, without cookies or persistent visitor identifiers. */
export function trackCaseStudyClick(caseStudy: string) {
  if (import.meta.env.DEV) return;
  void fetch('/api/case-study-click', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ caseStudy }),
    credentials: 'omit',
    keepalive: true,
  }).catch(() => {
    // Analytics must never prevent opening the case study dialog.
  });
}
