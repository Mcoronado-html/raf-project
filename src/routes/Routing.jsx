import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from "../pages/Login"
import Register from "../pages/Register"
import Home from "../pages/Home"
import Profile from "../pages/Profile"
import Public from "../pages/Public"
import Items from "../pages/Items"
import PublicProfile from "../pages/PublicProfile"
import Artist from "../pages/Artist"


function Routing() {
  return (
    <div>
      <Router>
        <Routes>
        <Route path="/Login" element={<Login/>}/> 
        <Route path="/Public" element={<Public/>}/> 
        <Route path="/" element={<Register/>}/>   
        <Route path="/Profile" element={<Profile/>}/>
        <Route path="/Home" element={<Home/>}/>
        <Route path="/Items" element={<Items/>}/>   
        <Route path="/PublicProfile" element={<PublicProfile/>}/>   
        <Route path="/Artist" element={<Artist/>}/>
        </Routes>
      </Router>
    </div>
  );
}
export default Routing