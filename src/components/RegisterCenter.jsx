import React, { useState, useEffect} from "react"
import UsersCallers from "../services/RAFCallers"
import { Link } from "react-router-dom"
import Swal from 'sweetalert2'

import "../styles/RegisterCenter.css"

const RegisterCenter = () => {

    const [nameUser, SetNameUser]=useState()
    const [lastUser, SetLastUser]=useState()
    const [emailUser, SetEmailUser]=useState()
    const [passUser, SetPassUser]=useState()
    const [existingUsers, setExistingUsers] = useState([]);
    const [reload, setReload] = useState(false)
    

    useEffect(() => {
        async function fetchDataUsers() {
            const users = await UsersCallers.getUsers("usersInfo");
            setExistingUsers(users);
        }
        fetchDataUsers();
      }, []);


    async function registerInfo(){

        if (!nameUser || !lastUser || !emailUser || !passUser) {
            Swal.fire({
              title: "Por favor rellena todos los campos!",
              text: "Intentalo de nuevo!",
              icon: "error",
            });
            return;
        }
        
        if (passUser.length < 6) {
            Swal.fire({
              title: "La contraseña debe tener mas de 6 caracteres!",
              text: "Intentalo de nuevo!",
              icon: "error",
            });
            return;
        }

        const duplicatedUser = existingUsers.find(
            (user) => user.userEmail === emailUser
          );
          if (duplicatedUser) {
            Swal.fire({
              title: "Usuario o contraseña en uso!",
              text: "Intentalo de nuevo!",
              icon: "error",
            });
            return;
        }       

        let users = {
            "userName": nameUser,
            "userLast": lastUser,
            "userEmail": emailUser,
            "userPass": passUser
        }
        UsersCallers.postUsers(users, "usersInfo")

        Swal.fire({
            title: "Cuenta creada!",
            text: "Intentalo de nuevo!",
            icon: "success",
        });
        setReload(!reload);

    }

    return(
    <>
    <div className="register-Container">
        <div className="register-Info">
            <h3 className="register-h3">Register</h3>
            <input  onChange={(e) => SetNameUser(e.target.value)}  type="text" placeholder="Nombre" className="register-input"/>
            <input  onChange={(e) => SetLastUser(e.target.value)} type="text" placeholder="Apellido"className="register-input"/>
            <input  onChange={(e) => SetEmailUser(e.target.value)} type="text" placeholder="Correo"className="register-input"/>
            <input  onChange={(e) => SetPassUser(e.target.value)} type="password" placeholder="Contraseña"className="register-input"/>
            <button onClick={registerInfo} className="register-Btn">Register</button>      
            <p className="">Ya tenes una cuenta? <Link to= "/Login"> Login</Link></p>     
        </div>
    </div>
    </>
    )
}
export default RegisterCenter