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
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '80vh',
      backgroundColor: '#f8f9fa'
    }}>
      <div style={{
        background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)',
        padding: '40px',
        borderRadius: '15px',
        boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '400px',
        color: 'white'
      }}>
        <h2 style={{
          textAlign: 'center',
          marginBottom: '30px',
          fontSize: '28px',
          fontWeight: 'bold'
        }}>🔓 Reset Password</h2>
        
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontSize: '14px',
              fontWeight: '500'
            }}>📧 Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px 16px',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                color: '#333',
                outline: 'none',
                boxSizing: 'border-box'
              }}
              placeholder="Enter your email address"
            />
          </div>
          
          <div style={{ marginBottom: '25px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontSize: '14px',
              fontWeight: '500'
            }}>🆕 New Password:</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px 16px',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                color: '#333',
                outline: 'none',
                boxSizing: 'border-box'
              }}
              placeholder="Enter your new password"
            />
          </div>
          
          <button 
            type="submit"
            style={{
              width: '100%',
              padding: '14px',
              backgroundColor: '#ffc107',
              color: '#212529',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
              marginBottom: '15px',
              transition: 'background-color 0.3s ease'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#e0a800'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#ffc107'}
          >
            🔄 Reset Password
          </button>
        </form>
        
        {message && (
          <p style={{
            textAlign: 'center',
            padding: '12px',
            borderRadius: '8px',
            backgroundColor: message.includes('successful') 
              ? 'rgba(40, 167, 69, 0.2)' 
              : 'rgba(220, 53, 69, 0.2)',
            border: `1px solid ${message.includes('successful') ? '#28a745' : '#dc3545'}`,
            marginBottom: '15px',
            fontSize: '14px'
          }}>
            {message.includes('successful') ? '✅' : '❌'} {message}
          </p>
        )}
        
        <div style={{ textAlign: 'center' }}>
          <button 
            onClick={onBack}
            style={{
              background: 'none',
              border: 'none',
              color: 'rgba(255, 255, 255, 0.8)',
              textDecoration: 'underline',
              cursor: 'pointer',
              fontSize: '14px',
              padding: '5px'
            }}
            onMouseOver={(e) => e.target.style.color = 'white'}
            onMouseOut={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.8)'}
          >
            ← Back to Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
