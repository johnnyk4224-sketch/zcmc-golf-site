# ZCMC Golf Website

Website for the Zenith City Men’s Club at Enger Park Golf Course.

## Included pages
- Home
- Rules
- Schedule
- Standings
- Special Events
- Registration
- Registration thank-you page
- 8-bit / realistic golf game

## GitHub setup
1. Create a new GitHub repository.
2. Add all files from this project to the repository root.
3. Make sure `index.html` is in the root.
4. Commit changes.

## Netlify setup
1. In Netlify, choose **Add new project**.
2. Import from GitHub.
3. Select your repo.
4. Use these settings:
   - Base directory: blank
   - Build command: blank
   - Publish directory: `/`

## Domain
Use your custom domain:
`ZCMCgolf.com`

## Registration form
The registration page uses Netlify Forms.
After your first Git-based deploy:
- Go to Netlify → Forms
- Confirm the form appears
- Add email notifications

## Optional Google Sheets sync
This project includes:
- `google-sheets-apps-script.js`
- `js/config.js`

To enable Google Sheets mirroring:
1. Create a Google Sheet.
2. Open Extensions → Apps Script.
3. Paste in `google-sheets-apps-script.js`.
4. Deploy as a Web App.
5. Copy the web app URL.
6. Paste it into `js/config.js` as `GOOGLE_SHEETS_WEBHOOK`.
