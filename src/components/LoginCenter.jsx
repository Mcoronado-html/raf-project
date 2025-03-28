import React, {useState, useEffect} from "react"
import UsersCallers from "../services/RAFCallers"
import { useNavigate } from "react-router-dom"
import "../styles/LoginCenter.css"

const LoginCenter = () => {

    const [emailUser, SetEmailUser]=useState("")
    const [passUser, SetPassUser]=useState("")
    const [LoginAccess, SetLoginInfo]=useState([])
    const navigate = useNavigate()
     
    useEffect(() =>{
        async function fetchDataUsers() {
            const userLogin = await UsersCallers.getUsers("usersInfo")
            SetLoginInfo(userLogin)            
        };
        fetchDataUsers();
    },[]);

    function loginInfo() {
       const FindUser = LoginAccess.find(users => users.userEmail == emailUser && users.userPass == passUser)
        console.log(FindUser);
        
       if (FindUser) {
            navigate("/")
            localStorage.setItem("userId", FindUser.id)
            localStorage.setItem("userName", FindUser.userName)
            localStorage.setItem("userLast", FindUser.userLast)
       }
        
    }
    return(
    <>
    <div className="login-Container">
        <div className="login-Info">
        <h3>Glad to see you again!</h3>
        <input  onChange={(e) =>  SetEmailUser(e.target.value)} type="text" placeholder="Email"/>
        <input  onChange={(e) => SetPassUser(e.target.value)} type="text" placeholder="Password"/>
        <button onClick={loginInfo}>Login</button>
        <p>Forgot password?</p>
        </div>
    </div>
    </>
    )
}
export default LoginCenter