import { BrowserRouter } from 'react-router-dom'
import './App.css'
import HomePage from './pages/homepage'
import LoginPage from './pages/login'
import { Route, Routes } from 'react-router-dom'
import AdminPage from './pages/adminpage'
import TestPage from './pages/testPage'
import { Toaster } from 'react-hot-toast'
import RegisterPage from './pages/register'
import { GoogleOAuthProvider } from '@react-oauth/google';
import ForgetPasswordPage from './pages/forgetPassword'


//https://omfainenyhrufrqtiyap.supabase.co
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9tZmFpbmVueWhydWZycXRpeWFwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYxNTI0MTIsImV4cCI6MjA4MTcyODQxMn0.QW_GztE8ZXQKxN_5WMunZ41dPW16LrnQ-UnaLF_1b6Q


function App() {
 

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <BrowserRouter>
    
       <div>
        <Toaster position="top-left"/>
        {/* <Header/> */}
        <Routes path="/*">
          <Route path="/*" element={<HomePage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/forget" element={<ForgetPasswordPage/>}/>
          <Route path="/signup" element={<RegisterPage/>}/>
          <Route path="/admin/*" element={<AdminPage/>}/>
          <Route path="/testing" element={<TestPage/>}/>
        
        </Routes>   
       </div>

    </BrowserRouter>
    </GoogleOAuthProvider>
      
  )
}  

export default App
