import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

import LandingPage from './components/views/LandingPage/LandingPage'
import LoginPage from './components/views/LoginPage/LoginPage'

function App() {
  return (
    
    <div>
    <h1>App</h1>
    <Router>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/LandingPage">LandingPage</Link>
        </li>
        <li>
          <Link to="/LoginPage">LoginPage</Link>
        </li>
      </ul>


      <hr/>

      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/LandingPage" element={<LandingPage />}></Route>
        <Route path="/LoginPage" element={<LoginPage />}></Route>
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

