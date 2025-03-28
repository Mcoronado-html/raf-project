import React, { useState} from "react"
import UsersCallers from "../services/RAFCallers"
import { Link } from "react-router-dom"

import "../styles/RegisterCenter.css"

const RegisterCenter = () => {

    const [nameUser, SetNameUser]=useState()
    const [lastUser, SetLastUser]=useState()
    const [emailUser, SetEmailUser]=useState()
    const [passUser, SetPassUser]=useState()

    function registerInfo(){
        
        let users = {
            "userName": nameUser,
            "userLast": lastUser,
            "userEmail": emailUser,
            "userPass": passUser
        }
        UsersCallers.postUsers(users, "usersInfo")
    }

    return(
    <>
    <div className="register-Container">
        <div className="register-Info">
            <h3>Register</h3>
            <input  onChange={(e) => SetNameUser(e.target.value)}  type="text" placeholder="First Name"/>
            <input  onChange={(e) => SetLastUser(e.target.value)} type="text" placeholder="Last Name"/>
            <input  onChange={(e) => SetEmailUser(e.target.value)} type="text" placeholder="Email"/>
            <input  onChange={(e) => SetEditName(e.target.value)} type="text" placeholder="Password"/>
            <button onClick={registerInfo} className="register-Btn">Register</button>      
            <p>Have an account already? <Link to= "/Login"> Log In</Link></p>     
        </div>
    </div>
    </>
    )
}
export default RegisterCenter