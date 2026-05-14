import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const ADMIN_EMAILS = ['hernan.baravalle@gmail.com', 'info@cvmoldtesting.com'];
const FROM_EMAIL = 'CV Mold Testing <noreply@notifications.cvmoldtesting.com>';

const PLAN_LABELS = {
  basic: 'Basic — 3 areas tested',
  standard: 'Standard — 6 areas tested',
  complete: 'Complete — 8 areas tested',
  custom: 'Custom — tailored to your space',
};

function buildConfirmationEmail(name, email, phone, zip, plan, message) {
  const planLabel = PLAN_LABELS[plan] || plan;
  const messageRow = message
    ? `<tr>
        <td style="padding:12px 0;font-size:14px;color:#475569;font-weight:600;width:120px;vertical-align:top;border-top:1px solid #e2e8f0"><strong>Notes:</strong></td>
        <td style="padding:12px 0;font-size:15px;color:#2c2f47;font-weight:500;border-top:1px solid #e2e8f0">${message}</td>
       </tr>`
    : '';

  return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:30px 0;background-color:#f1f5f9">
  <table style="width:100%;border-collapse:collapse;background-color:#f1f5f9" role="presentation">
    <tbody><tr><td align="center">
      <table style="max-width:600px;width:100%;background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 10px 25px rgba(0,0,0,0.08)" role="presentation">
        <tbody>

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#2c2f47 0%,#3d4163 100%);padding:48px 40px;text-align:center">
              <img src="https://cvmoldtesting.com/logo-white.png" alt="CV Mold Testing" width="150" style="height:auto;display:inline-block;margin-bottom:24px">
              <h1 style="color:#ffffff;font-size:28px;font-weight:700;margin:0 0 8px 0;letter-spacing:-0.02em;font-family:sans-serif">Thank you for your request!</h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:48px 40px;font-family:sans-serif">
              <p style="font-size:16px;color:#475569;line-height:1.6;margin:0 0 16px 0">Hi <strong style="color:#2c2f47">${name}</strong>,</p>
              <p style="font-size:16px;color:#475569;line-height:1.6;margin:0 0 16px 0">We've received your request for a mold inspection and we're ready to help protect your home.</p>
              <p style="font-size:16px;color:#475569;line-height:1.6;margin:0 0 32px 0">Our team will review your information and reach out within <strong style="color:#2c2f47">24 hours</strong> to confirm your appointment.</p>

              <!-- Your info -->
              <table style="width:100%;background-color:#f8fafc;border-radius:12px;padding:32px;margin-bottom:24px;border:1px solid #e2e8f0" role="presentation">
                <tbody><tr><td>
                  <h2 style="font-size:20px;font-weight:700;color:#2c2f47;margin:0 0 20px 0;font-family:sans-serif">Your Information</h2>
                  <table style="width:100%" role="presentation"><tbody>
                    <tr>
                      <td style="padding:12px 0;font-size:14px;color:#475569;font-weight:600;width:120px;vertical-align:top"><strong>Name:</strong></td>
                      <td style="padding:12px 0;font-size:15px;color:#2c2f47;font-weight:500">${name}</td>
                    </tr>
                    <tr>
                      <td style="padding:12px 0;font-size:14px;color:#475569;font-weight:600;border-top:1px solid #e2e8f0;vertical-align:top"><strong>Email:</strong></td>
                      <td style="padding:12px 0;font-size:15px;color:#2c2f47;font-weight:500;border-top:1px solid #e2e8f0">${email}</td>
                    </tr>
                    <tr>
                      <td style="padding:12px 0;font-size:14px;color:#475569;font-weight:600;border-top:1px solid #e2e8f0;vertical-align:top"><strong>Phone:</strong></td>
                      <td style="padding:12px 0;font-size:15px;color:#2c2f47;font-weight:500;border-top:1px solid #e2e8f0">${phone}</td>
                    </tr>
                    <tr>
                      <td style="padding:12px 0;font-size:14px;color:#475569;font-weight:600;border-top:1px solid #e2e8f0;vertical-align:top"><strong>Zip Code:</strong></td>
                      <td style="padding:12px 0;font-size:15px;color:#2c2f47;font-weight:500;border-top:1px solid #e2e8f0">${zip}</td>
                    </tr>
                    ${messageRow}
                  </tbody></table>
                </td></tr></tbody>
              </table>

              <!-- Selected plan -->
              <table style="width:100%;background:linear-gradient(135deg,#e8f5e9 0%,#f1f8f1 100%);border-left:4px solid #31a948;border-radius:12px;padding:24px;margin-bottom:24px" role="presentation">
                <tbody><tr><td>
                  <h3 style="font-size:18px;font-weight:700;color:#2c2f47;margin:0 0 8px 0;font-family:sans-serif">Selected Plan</h3>
                  <p style="font-size:15px;color:#1b5e20;font-weight:500;margin:0">${planLabel}</p>
                </td></tr></tbody>
              </table>

              <!-- What happens next -->
              <table style="width:100%;background:linear-gradient(135deg,#dcfce7 0%,#f0fdf4 100%);border-left:4px solid #31a948;border-radius:12px;padding:24px;margin-bottom:32px" role="presentation">
                <tbody><tr><td>
                  <h3 style="font-size:18px;font-weight:700;color:#2c2f47;margin:0 0 12px 0;font-family:sans-serif">What happens next?</h3>
                  <p style="font-size:15px;color:#065f46;margin:0 0 12px 0">One of our specialists will contact you to:</p>
                  <table style="width:100%" role="presentation"><tbody>
                    <tr><td style="padding:6px 0;font-size:15px;color:#065f46"><span style="color:#31a948"><strong>✓</strong></span> Confirm your inspection details</td></tr>
                    <tr><td style="padding:6px 0;font-size:15px;color:#065f46"><span style="color:#31a948"><strong>✓</strong></span> Schedule a convenient time for your visit</td></tr>
                    <tr><td style="padding:6px 0;font-size:15px;color:#065f46"><span style="color:#31a948"><strong>✓</strong></span> Answer any questions about the testing process</td></tr>
                  </tbody></table>
                </td></tr></tbody>
              </table>

              <hr style="border:none;border-top:1px solid #e2e8f0;margin:0 0 32px 0">

              <p style="font-size:16px;color:#475569;line-height:1.6;margin:0 0 16px 0">In the meantime, if you have any urgent questions feel free to reach us:</p>
              <table style="width:100%;background-color:#f8fafc;border-radius:8px;padding:20px;margin-bottom:32px" role="presentation">
                <tbody><tr><td style="font-size:15px;color:#2c2f47">
                  <p style="margin:0 0 10px 0">📞 <a href="tel:+13053974966" style="color:#2c2f47"><strong>+1 305 397 4966</strong></a></p>
                  <p style="margin:0">✉️ <a href="mailto:info@cvmoldtesting.com" style="color:#2c2f47"><strong>info@cvmoldtesting.com</strong></a></p>
                </td></tr></tbody>
              </table>

              <p style="font-size:15px;color:#475569;line-height:1.5;margin:0 0 16px 0">We look forward to helping you keep your home safe and healthy.</p>
              <p style="font-size:15px;font-weight:600;color:#2c2f47;margin:0"><strong>— The CV Mold Testing Team</strong></p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:linear-gradient(135deg,#f8fafc 0%,#f1f5f9 100%);padding:40px;text-align:center;border-top:1px solid #e2e8f0;font-family:sans-serif">
              <p style="margin:0 0 16px 0;font-size:14px;color:#64748b">
                <a href="https://cvmoldtesting.com" style="color:#2c2f47"><strong>Visit Our Website</strong></a>
                &nbsp;|&nbsp;
                <a href="mailto:info@cvmoldtesting.com" style="color:#2c2f47"><strong>Email Us</strong></a>
                &nbsp;|&nbsp;
                <a href="tel:+13053974966" style="color:#2c2f47"><strong>Call Us</strong></a>
              </p>
              <p style="font-size:13px;color:#64748b;margin:0 0 8px 0">You're receiving this email because you requested a mold test from CV Mold Testing.</p>
              <p style="font-size:12px;color:#94a3b8;margin:0">CV Mold Testing LLC · Florida, USA</p>
            </td>
          </tr>

        </tbody>
      </table>
    </td></tr></tbody>
  </table>
</body>
</html>`;
}

export const handler = async (event) => {
  try {
    const body = JSON.parse(event.body);
    console.log('Form submission received:', JSON.stringify(body));

    const { payload } = body;
    const { name, email, phone, zip, plan, message } = payload.data;

    console.log('Sending confirmation email to:', email);

    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      bcc: ADMIN_EMAILS,
      subject: 'We received your mold test request!',
      html: buildConfirmationEmail(name, email, phone, zip, plan, message),
    });

    console.log('Email result:', JSON.stringify(result));

    return { statusCode: 200 };
  } catch (error) {
    console.error('Error in submission-created function:', error);
    return { statusCode: 500, body: error.message };
  }
};
