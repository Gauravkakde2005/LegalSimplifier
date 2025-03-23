import { useState } from 'react'
import './App.css'
import Home from './components/Home/Home'
import About from './components/About/About'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Code from './components/Code'

function App() {
 

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/code" element={<Code />} />
          
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
