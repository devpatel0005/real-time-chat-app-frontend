import React, { useState } from 'react';

function Login({ onLogin, onForgotPassword }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check credentials from localStorage
    const user = JSON.parse(localStorage.getItem('chatapp_user'));
    if (user && user.email === username && user.password === password && user.verified) {
      setMessage('Login successful!');
      onLogin();
    } else {
      setMessage('Invalid credentials or email not verified.');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
      <p>
        <button onClick={onForgotPassword}>Forgot Password?</button>
      </p>
    </div>
  );
}

export default Login;
