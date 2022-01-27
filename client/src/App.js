import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

import LandingPage from './components/views/LandingPage/LandingPage'
import LoginPage from './components/views/LoginPage/LoginPage'
import RegisterPage from './components/views/RegisterPage/RegisterPage'
import Auth from './hoc/auth'


function App() {
    const AuthLandingPage = Auth(LandingPage,null);
    const Authlogin = Auth(LoginPage,false);
    const AuthRegisterPage = Auth(RegisterPage,false);

    



  return (
    
    <div>
    <h1>App</h1>
    <Router>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
    
        <li>
          <Link to="/loginPage">LoginPage</Link>
        </li>
        <li>
          <Link to="/RegisterPage">RegisterPage</Link>
        </li>
      </ul>


      <hr/>

      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/LandingPage" element={<AuthLandingPage />}></Route>
        <Route path="/loginPage" element={<Authlogin />}></Route>
        <Route path="/RegisterPage" element={<AuthRegisterPage />}></Route>
      </Routes>
    </Router>
  </div>
  );
}



export default App;


function Home(){
  return (
    <div>
      <h2>Home 안녕하세요</h2>
    </div>
  );
}

