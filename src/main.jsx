import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom';

import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <Router>
   <GoogleOAuthProvider clientId="551800858439-2c8je0kt61kshrbvsj28k5oe5f075lv6.apps.googleusercontent.com">
    <App />
    </GoogleOAuthProvider>
   </Router>
    
   
  </React.StrictMode>,
)
