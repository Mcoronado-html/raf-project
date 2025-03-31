import React, {useState, useEffect} from "react"
import UsersCallers from "../services/RAFCallers"
import { useNavigate } from "react-router-dom"
import "../styles/LoginCenter.css"
import Swal from 'sweetalert2'

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
            navigate("/Public")
            localStorage.setItem("userId", FindUser.id)
            localStorage.setItem("userName", FindUser.userName)
            localStorage.setItem("userLast", FindUser.userLast)
       }else{
        Swal.fire({
            title: "Credenciales incorrectas!",
            text: "Intentalo de nuevo!",
            icon: "error"
          });
       }
        
    }
    return(
    <>
    <div className="login-Container">
        <div className="login-Info">
        <h3 className="login-h3">Bienvenido de vuelta!</h3>
        <input  onChange={(e) =>  SetEmailUser(e.target.value)} type="text" placeholder="Correo" className="login-input"/>
        <input  onChange={(e) => SetPassUser(e.target.value)} type="password" placeholder="Contraseña"className="login-input"/>
        <button onClick={loginInfo} className="login-button">Login</button>
        </div>
    </div>
    </>
    )
}
export default LoginCenter