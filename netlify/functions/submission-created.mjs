import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const ADMIN_EMAILS = ['hernan.baravalle@gmail.com', 'info@cvmoldtesting.com'];
const FROM_EMAIL = 'noreply@notifications.cvmoldtesting.com';

export const handler = async (event) => {
  try {
    const body = JSON.parse(event.body);
    console.log('Form submission received:', JSON.stringify(body));

    const { payload } = body;
    const { name, email, phone, zip, plan, message } = payload.data;

    console.log('Sending emails to admins and user:', email);

    const [adminResult, userResult] = await Promise.all([
      resend.emails.send({
        from: FROM_EMAIL,
        to: ADMIN_EMAILS,
        subject: `New mold test request from ${name}`,
        html: `
          <h2>New Test Request</h2>
          <table>
            <tr><td><strong>Name:</strong></td><td>${name}</td></tr>
            <tr><td><strong>Email:</strong></td><td>${email}</td></tr>
            <tr><td><strong>Phone:</strong></td><td>${phone}</td></tr>
            <tr><td><strong>Zip Code:</strong></td><td>${zip}</td></tr>
            <tr><td><strong>Plan:</strong></td><td>${plan}</td></tr>
            <tr><td><strong>Message:</strong></td><td>${message || '—'}</td></tr>
          </table>
        `,
      }),

      resend.emails.send({
        from: FROM_EMAIL,
        to: email,
        subject: 'We received your mold test request',
        html: `
          <h2>Hi ${name},</h2>
          <p>Thank you for reaching out to CV Mold Testing. We've received your request and will get back to you within 24 hours to confirm your inspection appointment.</p>
          <h3>Your request details:</h3>
          <table>
            <tr><td><strong>Plan:</strong></td><td>${plan}</td></tr>
            <tr><td><strong>Zip Code:</strong></td><td>${zip}</td></tr>
            ${message ? `<tr><td><strong>Notes:</strong></td><td>${message}</td></tr>` : ''}
          </table>
          <p>If you have any questions in the meantime, feel free to reply to this email or call us at +1 305 397 4966.</p>
          <p>— CV Mold Testing Team</p>
        `,
      }),
    ]);

    console.log('Admin email result:', JSON.stringify(adminResult));
    console.log('User email result:', JSON.stringify(userResult));

    return { statusCode: 200 };
  } catch (error) {
    console.error('Error in submission-created function:', error);
    return { statusCode: 500, body: error.message };
  }
};
