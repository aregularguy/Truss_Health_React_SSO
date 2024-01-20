import { useState , useEffect } from "react";
import "./App.css";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

import Login from "./Components/Login";
import WebcamCapture from "./Components/WebcamCapture";
import { Routes, Route , useNavigate } from 'react-router-dom' 


function App() {
  
 const navigate = useNavigate()
  useEffect(() => {
    const User =
      localStorage.getItem('user') !== 'undefined'
        ? JSON.parse(localStorage.getItem('user'))
        : localStorage.clear();

    if (!User) navigate('/login');
  }, []);
  

  return (
    <>
    
      <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/*" element={<WebcamCapture />} />
      <Route path="/home" element={<WebcamCapture />} />
    </Routes>
    </>
  );
}

export default App;
