import { GoogleLogin } from '@react-oauth/google';
import { useGoogleLogin } from "@react-oauth/google";
import sharedvideo from '../assets/sharedvideo.mp4';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png'
import { FcGoogle } from "react-icons/fc";
import axios from 'axios';
const Login = () => {
  const navigate = useNavigate()
  const login = useGoogleLogin({
    onSuccess: async codeResponse =>
    {
      try {
        const userData = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo",{
          headers: {
            "Authorization" : `Bearer ${codeResponse.access_token}`
          }
        })
        console.log("User data:", userData.data);
        localStorage.setItem('user', JSON.stringify(userData));
        const { sub, name } = userData.data;
        console.log("response is" , sub + " " , name);
        
        navigate('/home')
      }
      catch (err) {
        console.log(err);
      }
    }
  });
  

  return (
    <>
        <div className="flex justify-start items-center flex-col h-screen">

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
      <button                   className="bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none"
 onClick={() => login()}> <FcGoogle className="mr-4" /> Sign in with Google</button>
      </div>
      </div>
        </div>
        </div>
    </>
  )
}

export default Login
