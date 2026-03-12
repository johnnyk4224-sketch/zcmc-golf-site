function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Registrations') ||
                SpreadsheetApp.getActiveSpreadsheet().insertSheet('Registrations');

  const data = JSON.parse(e.postData.contents || '{}');
  const headers = Object.keys(data);

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
  }

  const existingHeaders = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  const row = existingHeaders.map(h => data[h] || '');
  sheet.appendRow(row);

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
