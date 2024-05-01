import React from 'react';
// import 'antd/dist/antd.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/login'
import Register from './pages/register'
import { Toaster } from 'react-hot-toast'; 
// import { Button } from 'antd';

function App() {
  return (

    <BrowserRouter>
    <Toaster position="top-center" reverseOrder={false}/>
    <Routes>

      <Route path='/login' element ={<Login/>}/>
      <Route path='/register' element={<Register/>}/>

    </Routes>

    </BrowserRouter>
  );
}

export default App;
