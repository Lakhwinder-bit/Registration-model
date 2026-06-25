export const getResetPasswordHtml = (username, resetLink) => {
  return `
  <html>
  <body>

      <h2>Hello, ${username} 👋</h2>

      <p>You requested a password reset.</p>

      <p>
        Click the button below to reset your password:
      </p>

      <a href="${resetLink}">
        Reset Password
      </a>

      <p>
        This link will expire in 10 minutes.
      </p>

  </body>
  </html>
  `;
};