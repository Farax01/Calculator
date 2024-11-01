import { useState } from 'react'
import './App.css'
import Dashboard from './components/Dashboard'
import Home  from './components/Home'
import History from './components/History'
import { Routes, Route } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path='/home-page' element={<Home/>}/>
        <Route  path="/history-page" element={<History />} />
      </Routes>
    </>
  )
}

export default App
