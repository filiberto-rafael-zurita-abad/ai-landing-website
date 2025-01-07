import { NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';

// Initialize SendGrid with your API key
// You'll need to add your SendGrid API key to your .env.local file
sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function POST(request: Request) {
  try {
    const { recipientEmail, subject, templateMessage } = await request.json();

    const msg = {
      to: recipientEmail,
      from: process.env.SENDGRID_FROM_EMAIL!, // Your verified sender email
      subject: subject,
      html: templateMessage,
    };

    await sgMail.send(msg);

    return NextResponse.json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
