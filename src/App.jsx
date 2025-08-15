import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './Login'
import Signup from './Signup'
import Dashboard from './Dashboard'
import ForgotPassword from './ForgotPassword'

function App() {
  const [count, setCount] = useState(0)
  const [showSignup, setShowSignup] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showForgotPassword, setShowForgotPassword] = useState(false)

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #667eea 100%)',
      padding: '20px'
    }}>
      <div style={{
        textAlign: 'center',
        marginBottom: '30px'
      }}>
        <h1 style={{
          fontSize: '48px',
          fontWeight: 'bold',
          color: 'white',
          textShadow: '0 4px 8px rgba(0,0,0,0.3)',
          marginBottom: '10px',
          letterSpacing: '2px'
        }}>
          💬 Real Time Chat Application
        </h1>
        <p style={{
          fontSize: '18px',
          color: 'rgba(255, 255, 255, 0.8)',
          margin: '0'
        }}>
          Connect with friends and chat in real-time
        </p>
      </div>

      {isLoggedIn ? (
        <Dashboard />
      ) : showForgotPassword ? (
        <ForgotPassword onBack={() => setShowForgotPassword(false)} />
      ) : showSignup ? (
        <div>
          <Signup />
          <div style={{
            textAlign: 'center',
            marginTop: '20px'
          }}>
            <p style={{
              color: 'white',
              fontSize: '16px',
              marginBottom: '15px'
            }}>
              Already have an account?
            </p>
            <button 
              onClick={() => setShowSignup(false)}
              style={{
                padding: '12px 24px',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                color: 'white',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '25px',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(10px)'
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              🔐 Back to Login
            </button>
          </div>
        </div>
      ) : (
        <div>
          <Login onLogin={() => setIsLoggedIn(true)} onForgotPassword={() => setShowForgotPassword(true)} />
          <div style={{
            textAlign: 'center',
            marginTop: '20px'
          }}>
            <p style={{
              color: 'white',
              fontSize: '16px',
              marginBottom: '15px'
            }}>
              New user? Join our community!
            </p>
            <button 
              onClick={() => setShowSignup(true)}
              style={{
                padding: '12px 24px',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                color: 'white',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '25px',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(10px)'
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              ✨ Create Account
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App
