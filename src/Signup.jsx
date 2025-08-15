import React, { useState } from 'react';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Store user data in localStorage
    const user = { email, password, verified: true };
    localStorage.setItem('chatapp_user', JSON.stringify(user));
    setMessage('Signup successful! You can now login.');
    setEmail('');
    setPassword('');
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
        background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
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
        }}>✨ Create Account</h2>
        
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
              placeholder="Enter your email"
            />
          </div>
          
          <div style={{ marginBottom: '25px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontSize: '14px',
              fontWeight: '500'
            }}>🔒 Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
              placeholder="Create a password"
            />
          </div>
          
          <button 
            type="submit"
            style={{
              width: '100%',
              padding: '14px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
              marginBottom: '15px',
              transition: 'background-color 0.3s ease'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
          >
            🎉 Create Account
          </button>
        </form>
        
        {message && (
          <p style={{
            textAlign: 'center',
            padding: '12px',
            borderRadius: '8px',
            backgroundColor: 'rgba(40, 167, 69, 0.2)',
            border: '1px solid #28a745',
            marginBottom: '15px',
            fontSize: '14px'
          }}>
            ✅ {message}
          </p>
        )}
        
        <div style={{
          textAlign: 'center',
          fontSize: '14px',
          opacity: 0.9
        }}>
          <p>Already have an account? Login above! 👆</p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
