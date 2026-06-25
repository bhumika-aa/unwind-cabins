const baseTemplate = (content) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e1e1e1; border-radius: 8px; }
    .header { text-align: center; margin-bottom: 30px; }
    .header h1 { color: #375344; margin: 0; }
    .content { margin-bottom: 30px; }
    .footer { text-align: center; font-size: 12px; color: #777; border-top: 1px solid #e1e1e1; padding-top: 20px; }
    .btn { display: inline-block; background-color: #e5a452; color: #fff !important; padding: 10px 20px; text-decoration: none; border-radius: 4px; font-weight: bold; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>UnwindCabins</h1>
    </div>
    <div class="content">
      ${content}
    </div>
    <div class="footer">
      <p>&copy; ${new Date().getFullYear()} UnwindCabins. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;

exports.welcomeEmail = (name) => baseTemplate(`
  <h2>Welcome to UnwindCabins, ${name}!</h2>
  <p>We're thrilled to have you join our community. Discover idyllic countryside cabins and start planning your perfect getaway today.</p>
  <p><a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/cabins" class="btn">Explore Cabins</a></p>
`);

exports.verifyEmail = (url) => baseTemplate(`
  <h2>Verify Your Email</h2>
  <p>Please click the button below to verify your email address and activate your account.</p>
  <p><a href="${url}" class="btn">Verify Email</a></p>
  <p>If you did not request this, please ignore this email.</p>
`);

exports.forgotPasswordEmail = (url) => baseTemplate(`
  <h2>Password Reset Request</h2>
  <p>We received a request to reset your password. Click the button below to choose a new one.</p>
  <p><a href="${url}" class="btn">Reset Password</a></p>
  <p>This link is valid for 10 minutes. If you did not request a password reset, please ignore this email.</p>
`);

exports.resetPasswordEmail = () => baseTemplate(`
  <h2>Password Reset Successful</h2>
  <p>Your password has been successfully reset. You can now log in with your new password.</p>
`);

exports.bookingConfirmationEmail = (name, cabinTitle, dates, price) => baseTemplate(`
  <h2>Booking Confirmation</h2>
  <p>Hi ${name}, your booking for <strong>${cabinTitle}</strong> has been confirmed!</p>
  <p><strong>Dates:</strong> ${dates}</p>
  <p><strong>Total Price:</strong> £${price}</p>
  <p>We look forward to hosting you!</p>
`);

exports.bookingCancellationEmail = (name, cabinTitle) => baseTemplate(`
  <h2>Booking Cancelled</h2>
  <p>Hi ${name}, your booking for <strong>${cabinTitle}</strong> has been cancelled.</p>
  <p>If you have any questions or wish to re-book, please contact our support team.</p>
`);

exports.contactFormConfirmationEmail = (name) => baseTemplate(`
  <h2>Message Received</h2>
  <p>Hi ${name}, thank you for reaching out to us.</p>
  <p>We have received your message and our team will get back to you within 24-48 hours.</p>
`);

exports.newsletterSubscriptionEmail = () => baseTemplate(`
  <h2>Welcome to our Newsletter!</h2>
  <p>Thank you for subscribing to the UnwindCabins newsletter.</p>
  <p>You'll now be the first to hear about our latest cabins, exclusive offers, and travel inspiration.</p>
`);
