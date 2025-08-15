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
    <>
    <>
      <h1>Real Time Chat Application</h1>
      {isLoggedIn ? (
        <Dashboard />
      ) : showForgotPassword ? (
        <ForgotPassword onBack={() => setShowForgotPassword(false)} />
      ) : showSignup ? (
        <>
          <Signup />
          <p>
            Already have an account?{' '}
            <button onClick={() => setShowSignup(false)}>Login</button>
          </p>
        </>
      ) : (
        <>
          <Login onLogin={() => setIsLoggedIn(true)} onForgotPassword={() => setShowForgotPassword(true)} />
          <p>
            New user?{' '}
            <button onClick={() => setShowSignup(true)}>Signup</button>
          </p>
        </>
      )}
    </>
    </>
  );
}

export default App
