// Bound to the supplied spreadsheet through Extensions > Apps Script.
// Set GOOGLE_LOG_SECRET in Script Properties before running setupClickLog.
const SPREADSHEET_ID = '1ph9HcOPDto2MrRv6Kdno9wL4UiMgPmgNNiXNw5DJjjM';
const LOG_TAB = 'Case Study Clicks';
const SUMMARY_TAB = 'Click Summary';
const HEADERS = ['Time (UTC)', 'Case study', 'Country', 'Region'];
const CASE_STUDIES = [
  'Planfit — Community Club',
  'Planfit — Onboarding & Paywall',
  'Planfit — AI Stretching Recommendation',
];

function setupClickLog() {
  if (!PropertiesService.getScriptProperties().getProperty('GOOGLE_LOG_SECRET')) {
    throw new Error('Set GOOGLE_LOG_SECRET in Script Properties first.');
  }
  const book = SpreadsheetApp.openById(SPREADSHEET_ID);
  // Preserve all existing tabs. Refuse to overwrite tabs with these names.
  if (book.getSheetByName(LOG_TAB) || book.getSheetByName(SUMMARY_TAB)) {
    throw new Error('Logging tabs already exist. Inspect them before rerunning setup.');
  }
  const log = book.insertSheet(LOG_TAB);
  log.getRange(1, 1, 1, 4).setValues([HEADERS]).setFontWeight('bold').setBackground('#eeeeee');
  log.setFrozenRows(1);
  log.setColumnWidth(1, 190);
  log.setColumnWidth(2, 340);
  log.setColumnWidths(3, 2, 160);
  log.getRange(1, 1, log.getMaxRows(), 4).createFilter();
  const summary = book.insertSheet(SUMMARY_TAB);
  summary.getRange('A1:B1').setValues([['Case study', 'Clicks']]).setFontWeight('bold').setBackground('#eeeeee');
  summary.getRange('A2:A5').setValues([['Total clicks'], ...CASE_STUDIES.map(name => [name])]);
  summary.getRange('B2').setFormula('=COUNTA(\'Case Study Clicks\'!A2:A)');
  summary.getRange('B3:B5').setFormulas(CASE_STUDIES.map((_, i) => ["=COUNTIF('Case Study Clicks'!B2:B,A" + (i + 3) + ')']));
  summary.setColumnWidth(1, 340);
  summary.setColumnWidth(2, 110);
}

function doPost(e) {
  const json = value => ContentService.createTextOutput(JSON.stringify(value)).setMimeType(ContentService.MimeType.JSON);
  let data;
  try { data = JSON.parse(e.postData.contents); } catch (_) { return json({ ok: false }); }
  const secret = PropertiesService.getScriptProperties().getProperty('GOOGLE_LOG_SECRET');
  if (!secret || !data || data.secret !== secret || !CASE_STUDIES.includes(data.caseStudy)) return json({ ok: false });
  const safeText = value => {
    const text = typeof value === 'string' ? value.slice(0, 100) : 'Unknown';
    return /^[=+@\-\s]/.test(text) ? "'" + text : text;
  };
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(5000)) return json({ ok: false });
  try {
    const log = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(LOG_TAB);
    if (!log || log.getRange(1, 1, 1, 4).getValues()[0].join('|') !== HEADERS.join('|')) return json({ ok: false });
    log.appendRow([
      Utilities.formatDate(new Date(), 'UTC', 'yyyy-MM-dd HH:mm:ss'),
      data.caseStudy, safeText(data.country), safeText(data.region),
    ]);
    return json({ ok: true });
  } finally { lock.releaseLock(); }
}
