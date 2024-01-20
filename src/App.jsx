import { useState , useEffect } from "react";
import "./App.css";
import Login from "./Components/Login";
import WebcamCapture from "./Components/WebcamCapture";
import { GoogleLogin } from "@react-oauth/google";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Routes, Route, Link , useNavigate } from 'react-router-dom' 


function App() {
  const [count, setCount] = useState(0);
  
  const navigate = useNavigate();

  useEffect(() => {
    const User =
      localStorage.getItem('user') !== 'undefined'
        ? JSON.parse(localStorage.getItem('user'))
        : localStorage.clear();

    // if (!User) navigate('/login');
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
