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
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '80vh',
      backgroundColor: 'transparent'
    }}>
      <div style={{
        background: 'rgba(255, 255, 255, 0.95)',
        padding: '50px 40px',
        borderRadius: '20px',
        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)',
        width: '100%',
        maxWidth: '420px',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.2)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{
            width: '80px',
            height: '80px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px',
            fontSize: '36px',
            boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)'
          }}>
            🔐
          </div>
          <h2 style={{
            fontSize: '32px',
            fontWeight: '700',
            color: '#2d3748',
            margin: '0',
            letterSpacing: '-0.5px'
          }}>Welcome Back</h2>
          <p style={{
            color: '#718096',
            fontSize: '16px',
            margin: '8px 0 0 0'
          }}>Please sign in to your account</p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '25px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontSize: '14px',
              fontWeight: '600',
              color: '#4a5568'
            }}>Email Address</label>
            <div style={{ position: 'relative' }}>
              <span style={{
                position: 'absolute',
                left: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                fontSize: '18px',
                color: '#a0aec0'
              }}>📧</span>
              <input
                type="email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '16px 16px 16px 50px',
                  border: '2px solid #e2e8f0',
                  borderRadius: '12px',
                  fontSize: '16px',
                  backgroundColor: '#ffffff',
                  color: '#2d3748',
                  outline: 'none',
                  boxSizing: 'border-box',
                  transition: 'all 0.3s ease'
                }}
                placeholder="Enter your email"
                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
              />
            </div>
          </div>
          
          <div style={{ marginBottom: '30px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontSize: '14px',
              fontWeight: '600',
              color: '#4a5568'
            }}>Password</label>
            <div style={{ position: 'relative' }}>
              <span style={{
                position: 'absolute',
                left: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                fontSize: '18px',
                color: '#a0aec0'
              }}>🔒</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '16px 16px 16px 50px',
                  border: '2px solid #e2e8f0',
                  borderRadius: '12px',
                  fontSize: '16px',
                  backgroundColor: '#ffffff',
                  color: '#2d3748',
                  outline: 'none',
                  boxSizing: 'border-box',
                  transition: 'all 0.3s ease'
                }}
                placeholder="Enter your password"
                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
              />
            </div>
          </div>
          
          <button 
            type="submit"
            style={{
              width: '100%',
              padding: '16px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              marginBottom: '20px',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.4)';
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.3)';
            }}
          >
            Sign In
          </button>
        </form>
        
        {message && (
          <div style={{
            padding: '15px',
            borderRadius: '10px',
            backgroundColor: message.includes('successful') ? '#f0fff4' : '#fed7d7',
            border: `1px solid ${message.includes('successful') ? '#9ae6b4' : '#feb2b2'}`,
            color: message.includes('successful') ? '#22543d' : '#742a2a',
            marginBottom: '20px',
            fontSize: '14px',
            textAlign: 'center',
            fontWeight: '500'
          }}>
            <span style={{ marginRight: '8px' }}>
              {message.includes('successful') ? '✅' : '❌'}
            </span>
            {message}
          </div>
        )}
        
        <div style={{ textAlign: 'center' }}>
          <button 
            onClick={onForgotPassword}
            style={{
              background: 'none',
              border: 'none',
              color: '#667eea',
              textDecoration: 'none',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              padding: '8px',
              borderRadius: '6px',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#edf2f7';
              e.target.style.color = '#553c9a';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.color = '#667eea';
            }}
          >
            Forgot your password?
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
