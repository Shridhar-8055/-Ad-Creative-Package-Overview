/**
 * ============================================================
 *  Quantum Algo — Webinar Registration Backend
 *  (Google Apps Script — deploy as Web App)
 * ============================================================
 *
 *  SETUP INSTRUCTIONS:
 *
 *  1. Go to https://script.google.com → New Project
 *  2. Delete any existing code and paste this entire file
 *  3. Create a Google Sheet and copy its ID from the URL:
 *     https://docs.google.com/spreadsheets/d/  ←SHEET_ID→  /edit
 *  4. Replace SHEET_ID below with your Google Sheet ID
 *  5. Replace MEETING_LINK with your actual webinar meeting link
 *  6. In the Sheet, create a tab named "Registrations" with headers:
 *     Timestamp | Name | Email | WhatsApp | Experience | Status
 *  7. Deploy → New Deployment → Web App
 *       - Execute as: Me
 *       - Who has access: Anyone
 *  8. Copy the Web App URL → paste into webinar.html as SCRIPT_URL
 *  9. Test by submitting the form — check Sheet + email
 *
 * ============================================================
 */

const SHEET_ID     = 'YOUR_GOOGLE_SHEET_ID';       // ← Replace
const MEETING_LINK = 'https://your-meeting-link';   // ← Replace
const SHEET_TAB    = 'Registrations';

// ── POST handler (form submissions) ──────────────────────────
function doPost(e) {
  try {
    const first_name  = e.parameter.first_name;
    const email       = e.parameter.email;
    const phone       = e.parameter.phone;
    const experience  = e.parameter.experience;

    // 1. Append row to Google Sheet
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_TAB);
    sheet.appendRow([
      new Date(),
      first_name,
      email,
      phone,
      experience || 'Not specified',
      'Registered'
    ]);

    // 2. Send confirmation email
    MailApp.sendEmail({
      to: email,
      subject: "Your FREE Webinar Spot is Confirmed!",
      htmlBody: buildEmailHtml(first_name)
    });

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ── GET handler (health check) ───────────────────────────────
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok' }))
    .setMimeType(ContentService.MimeType.JSON);
}

// ── Confirmation Email Template ──────────────────────────────
function buildEmailHtml(firstName) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0; padding:0; background:#0a0a0a; font-family:Arial, Helvetica, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a; padding:32px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#111113; border-radius:12px; overflow:hidden; border:1px solid #222;">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#6c2bd9,#00d4ff); padding:32px 40px; text-align:center;">
              <h1 style="margin:0; color:#fff; font-size:22px; letter-spacing:1px;">QUANTUM ALGO</h1>
              <p style="margin:6px 0 0; color:rgba(255,255,255,0.85); font-size:13px;">AI-Powered Algo Trading Education</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:36px 40px; color:#e0e0e0; font-size:15px; line-height:1.7;">

              <p style="margin:0 0 18px;">Hi ${firstName},</p>

              <p style="margin:0 0 18px;">
                Your spot for the <strong style="color:#00d4ff;">FREE Live Training</strong> is confirmed!
              </p>

              <!-- Webinar Details Box -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#1a1a2e; border:1px solid #333; border-radius:8px; margin:24px 0;">
                <tr>
                  <td style="padding:24px 28px; color:#ccc; font-size:14px; line-height:2;">
                    <strong style="color:#fff; font-size:15px; display:block; margin-bottom:8px;">Webinar Details:</strong>
                    &#128197; <strong>Date:</strong> Wednesday, Feb 26, 2026<br>
                    &#128336; <strong>Time:</strong> 8:00 PM IST<br>
                    &#9201; <strong>Duration:</strong> ~90 minutes + Q&A<br>
                    &#128176; <strong>Cost:</strong> 100% FREE
                  </td>
                </tr>
              </table>

              <!-- CTA Button -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin:28px 0;">
                <tr>
                  <td align="center">
                    <a href="${MEETING_LINK}" target="_blank"
                       style="display:inline-block; background:linear-gradient(135deg,#6c2bd9,#00d4ff); color:#fff; text-decoration:none; padding:16px 48px; border-radius:8px; font-size:16px; font-weight:bold; letter-spacing:0.5px;">
                      JOIN THE WEBINAR &rarr;
                    </a>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding-top:10px; color:#888; font-size:12px;">
                    Save this link — you'll need it to join the live session
                  </td>
                </tr>
              </table>

              <!-- What You'll Learn -->
              <p style="margin:24px 0 12px; color:#fff; font-weight:bold; font-size:15px;">What You'll Discover:</p>
              <table cellpadding="0" cellspacing="0" style="color:#ccc; font-size:14px; line-height:1.8;">
                <tr><td style="padding:4px 0;">&#10003;&nbsp; The 7-word prompt that generates perfect trading algo code</td></tr>
                <tr><td style="padding:4px 0;">&#10003;&nbsp; Live build: Watch an EA get created in under 20 minutes</td></tr>
                <tr><td style="padding:4px 0;">&#10003;&nbsp; The "No-Code" method to build Expert Advisors using AI</td></tr>
                <tr><td style="padding:4px 0;">&#10003;&nbsp; How students are earning &#8377;15K-50K/month passive income</td></tr>
              </table>

              <!-- Reminder -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#1a1a2e; border-left:3px solid #6c2bd9; border-radius:4px; margin:28px 0;">
                <tr>
                  <td style="padding:16px 20px; color:#ccc; font-size:13px; line-height:1.6;">
                    &#128276; <strong style="color:#fff;">Reminder:</strong> Add this to your calendar so you don't miss it!
                    The session starts at <strong>8:00 PM IST sharp</strong> and spots are limited.
                    Join 5 minutes early for the best experience.
                  </td>
                </tr>
              </table>

              <p style="margin:24px 0 0; color:#aaa;">
                See you on the training!<br>
                <strong style="color:#fff;">Shamiq Ahmed</strong><br>
                <span style="color:#888; font-size:13px;">Founder, Quantum Algo</span>
              </p>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#0d0d0d; padding:24px 40px; text-align:center; border-top:1px solid #222;">
              <p style="margin:0 0 8px; color:#666; font-size:12px;">
                &copy; 2026 Inner Circle Academy &bull; Quantum Algo
              </p>
              <p style="margin:0; color:#555; font-size:11px;">
                You received this email because you registered for our free webinar.<br>
                If you did not register, please ignore this email.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
