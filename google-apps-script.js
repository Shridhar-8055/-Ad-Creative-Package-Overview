const SHEET_ID = '1rknFcQq9KL_w98FmIzu2bRFYghUiWValOMITBghxEEE';
const MEETING_LINK = 'https://meet.google.com/xgf-qhdu-muo';
const SHEET_TAB = 'Registrations';

function doGet(e) {
  try {
    if (!e.parameter.email) {
      return ContentService
        .createTextOutput(JSON.stringify({ status: 'ok' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    var first_name = e.parameter.first_name;
    var email = e.parameter.email;
    var phone = e.parameter.phone;
    var experience = e.parameter.experience;

    var sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_TAB);
    sheet.appendRow([new Date(), first_name, email, phone, experience || 'Not specified', 'Registered']);

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

function buildEmailHtml(firstName) {
  var m = MEETING_LINK;
  var h = "";
  h += "<html><body style='margin:0;padding:0;background:#0a0a0a;font-family:Arial,sans-serif;'>";
  h += "<table width='100%' style='background:#0a0a0a;padding:32px 0;'><tr><td align='center'>";
  h += "<table width='600' style='background:#111;border-radius:12px;border:1px solid #222;'>";

  // Header
  h += "<tr><td style='background:linear-gradient(135deg,#6c2bd9,#00d4ff);padding:32px 40px;text-align:center;'>";
  h += "<h1 style='margin:0;color:#fff;font-size:22px;'>QUANTUM ALGO</h1>";
  h += "<p style='margin:6px 0 0;color:rgba(255,255,255,0.85);font-size:13px;'>AI-Powered Algo Trading Education</p>";
  h += "</td></tr>";

  // Body
  h += "<tr><td style='padding:36px 40px;color:#e0e0e0;font-size:15px;line-height:1.7;'>";
  h += "<p style='margin:0 0 18px;'>Hi " + firstName + ",</p>";
  h += "<p style='margin:0 0 18px;'>Your spot for the <strong style='color:#00d4ff;'>FREE Live Training</strong> is confirmed!</p>";

  // Details box
  h += "<table width='100%' style='background:#1a1a2e;border:1px solid #333;border-radius:8px;margin:24px 0;'>";
  h += "<tr><td style='padding:24px;color:#ccc;font-size:14px;line-height:2;'>";
  h += "<strong style='color:#fff;font-size:15px;'>Webinar Details:</strong><br>";
  h += "Date: Wednesday, Feb 26, 2026<br>";
  h += "Time: 8:00 PM IST<br>";
  h += "Duration: ~90 minutes + Q&amp;A<br>";
  h += "Cost: 100% FREE";
  h += "</td></tr></table>";

  // Meeting link button
  h += "<table width='100%' style='margin:28px 0;'><tr><td align='center'>";
  h += "<a href='" + m + "' target='_blank' ";
  h += "style='display:inline-block;background:#6c2bd9;";
  h += "color:#fff;text-decoration:none;padding:16px 48px;";
  h += "border-radius:8px;font-size:16px;font-weight:bold;'>";
  h += "JOIN THE WEBINAR</a>";
  h += "</td></tr>";
  h += "<tr><td align='center' style='padding-top:10px;color:#888;font-size:12px;'>";
  h += "Save this link - you will need it to join the live session";
  h += "</td></tr></table>";

  // What you will learn
  h += "<p style='margin:24px 0 12px;color:#fff;font-weight:bold;'>What You Will Discover:</p>";
  h += "<table style='color:#ccc;font-size:14px;line-height:1.8;'>";
  h += "<tr><td>&#10003; The 7-word prompt that generates perfect trading algo code</td></tr>";
  h += "<tr><td>&#10003; Live build: Watch an EA get created in under 20 minutes</td></tr>";
  h += "<tr><td>&#10003; The No-Code method to build Expert Advisors using AI</td></tr>";
  h += "<tr><td>&#10003; How students are earning 15K-50K/month passive income</td></tr>";
  h += "</table>";

  // Reminder
  h += "<table width='100%' style='background:#1a1a2e;border-left:3px solid #6c2bd9;margin:28px 0;'>";
  h += "<tr><td style='padding:16px 20px;color:#ccc;font-size:13px;line-height:1.6;'>";
  h += "<strong style='color:#fff;'>Reminder:</strong> ";
  h += "The session starts at <strong>8:00 PM IST sharp</strong>. ";
  h += "Join 5 minutes early for the best experience.";
  h += "</td></tr></table>";

  // Sign off
  h += "<p style='margin:24px 0 0;color:#aaa;'>See you on the training!<br>";
  h += "<strong style='color:#fff;'>Shamique Hussain</strong><br>";
  h += "<span style='color:#888;font-size:13px;'>Founder, Quantum Algo</span></p>";
  h += "</td></tr>";

  // Footer
  h += "<tr><td style='background:#0d0d0d;padding:24px 40px;text-align:center;border-top:1px solid #222;'>";
  h += "<p style='margin:0 0 8px;color:#666;font-size:12px;'>2026 Quantum Algo - Quantum Algo</p>";
  h += "<p style='margin:0;color:#555;font-size:11px;'>You received this email because you registered for our free webinar.</p>";
  h += "</td></tr>";

  h += "</table></td></tr></table></body></html>";
  return h;
}
