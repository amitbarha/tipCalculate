import { useState, useContext } from 'react'
import { Context } from "./Context.jsx";
import Tipform from './component/Tipform'
import { Routes, Route } from 'react-router-dom';
import './App.css'
import { Button, Rating } from '@mui/material'
import Layout from './component/Layout';
import HomePage from './component/HomePage';
import FixMistake from './component/FixMistake.jsx';

function App() {
  const price = useContext(Context);
  const [photoPrice, setPhotoPrice] = useState()

  return (
    <Context.Provider value={{setPhotoPrice , photoPrice}}>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<HomePage />} ></Route>
          <Route path='tipForm' element={<Tipform />} ></Route>
          <Route path='fix' element={<FixMistake />}></Route>

        </Route>
      </Routes>
    </Context.Provider>





  )
}

export default App
