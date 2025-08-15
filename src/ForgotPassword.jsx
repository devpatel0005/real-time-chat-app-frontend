import React, { useState } from 'react';

function ForgotPassword({ onBack }) {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if user exists in localStorage
    const user = JSON.parse(localStorage.getItem('chatapp_user'));
    if (user && user.email === email) {
      // Update password in localStorage
      user.password = newPassword;
      localStorage.setItem('chatapp_user', JSON.stringify(user));
      setMessage('Password reset successful! You can now login with your new password.');
    } else {
      setMessage('Email not found. Please check your email address.');
    }
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>New Password:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Reset Password</button>
      </form>
      {message && <p>{message}</p>}
      <p>
        <button onClick={onBack}>Back to Login</button>
      </p>
    </div>
  );
}

export default ForgotPassword;
