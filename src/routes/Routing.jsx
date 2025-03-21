import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from "../pages/Login"
import Register from "../pages/Register"
import Home from "../pages/Home"
import Profile from "../pages/Profile"
import Public from "../pages/Public"






function Routing() {
  return (
    <div>
      <Router>
        <Routes>
<Route path="/Login" element={<Login/>}/> 
<Route path="/" element={<Public/>}/> 
<Route path="/Register" element={<Register/>}/>   
<Route path="/Profile" element={<Profile/>}/>
<Route path="/Home" element={<Home/>}/>     

        </Routes>
      </Router>
    </div>
  );
}
export default Routing