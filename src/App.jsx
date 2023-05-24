import { useState } from 'react'

import Tipform from './component/Tipform'
import { Routes, Route } from 'react-router-dom';
import './App.css'
import { Button, Rating } from '@mui/material'
import Layout from './component/Layout';
import HomePage from './component/HomePage';

function App() {
  
  
  return (
     <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<HomePage />} ></Route>
        <Route path='tipForm' element={<Tipform />} ></Route>

      </Route>
     </Routes>
      
        
      
     
    
  )
}

export default App
