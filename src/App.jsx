import { BrowserRouter } from 'react-router-dom'
import './App.css'
import HomePage from './pages/homepage'
import LoginPage from './pages/login'
import SignUpPage from './pages/signUp'
import { Route, Routes } from 'react-router-dom'
import AdminPage from './pages/adminpage'


function App() {

  return (
    <BrowserRouter>
    
       <div>
        {/* <Header/> */}
        <Routes path="/*">
          <Route path="/" element={<HomePage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/signup" element={<SignUpPage/>}/>
          <Route path="/*" element={<h1>404 page not found</h1>}/>\
          <Route path="/admin/*" element={<AdminPage/>}/>
        
        </Routes>   
       </div>

    </BrowserRouter>
      
  )
}  

export default App
