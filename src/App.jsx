import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './Login'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <>
      <h1>Real Time Chat Application</h1>
      <Login />
    </>
    </>
  );
}

export default App
