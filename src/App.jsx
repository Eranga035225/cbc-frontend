import { BrowserRouter } from 'react-router-dom'
import './App.css'
import HomePage from './pages/homepage'
import LoginPage from './pages/login'
import SignUpPage from './pages/signUp'
import { Route, Routes } from 'react-router-dom'
import AdminPage from './pages/adminpage'
import TestPage from './pages/testPage'
import { Toaster } from 'react-hot-toast'


function App() {
 

  return (
    <BrowserRouter>
    
       <div>
        <Toaster position="top-left"/>
        {/* <Header/> */}
        <Routes path="/*">
          <Route path="/" element={<HomePage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/signup" element={<SignUpPage/>}/>
          <Route path="/*" element={<h1>404 page not found</h1>}/>\
          <Route path="/admin/*" element={<AdminPage/>}/>
          <Route path="/testing" element={<TestPage/>}/>
        
        </Routes>   
       </div>

    </BrowserRouter>
      
  )
}  

export default App
