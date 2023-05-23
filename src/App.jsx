import { useState } from 'react'
import Navbar from './component/Navbar'
import Tipform from './component/Tipform'
import './App.css'
import { Button, Rating } from '@mui/material'

function App() {
  
  
  return (
      <div className='app-container'>
        <Navbar />
      <div className='form'>
        
        <Tipform />
        
      </div>
      
        
      
      </div>
    
  )
}

export default App
