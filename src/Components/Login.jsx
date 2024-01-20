import React from 'react'
import { GoogleLogin } from '@react-oauth/google';
import { useGoogleLogin } from "@react-oauth/google";
import sharedvideo from '../assets/sharedvideo.mp4';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png'
const Login = () => {
  const navigate = useNavigate()
  const login = useGoogleLogin({
    onSuccess: async codeResponse =>
    {
      try {
        const data = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo",{
          headers: {
            "Authorization" : `Bearer ${codeResponse.access_token}`
          }
        })
        console.log("data is " , data.data.name);
        localStorage.setItem('user', JSON.stringify(codeResponse.profileObj));
        const { name, googleId, imageUrl } = codeResponse.profileObj;
        const doc = {
          _id: googleId,
          _type: 'user',
          userName: name,
          image: imageUrl,
        };
       
        navigate('/home')
      }
      catch (err) {
        console.log(err);
      }
    }
  });
  

  return (
    <>
    <div className=" relative w-full h-full">
        <video
          src={sharedvideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />  
        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0    bg-blackOverlay">
          <div className="p-5">
            <img src={logo} alt="logo" width="130px" />
          </div>
          <div className="shadow-2xl">
      <button onClick={() => login()}>Sign in with Google 🚀</button>
      </div>
      </div>
        </div>
    </>
  )
}

export default Login
