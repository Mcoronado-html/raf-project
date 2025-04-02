import React, { useState, useEffect } from "react" // Importa React y los hooks useState y useEffect
import UsersCallers from "../services/RAFCallers" // Importa la función para interactuar con la API o base de datos
import { Link } from "react-router-dom" // Importa Link para la navegación entre páginas
import Swal from 'sweetalert2' // Importa SweetAlert2 para mostrar mensajes emergentes

import "../styles/RegisterCenter.css" // Importa los estilos del componente

const RegisterCenter = () => {

    const [nameUser, SetNameUser] = useState() // Define el estado para el nombre del usuario
    const [lastUser, SetLastUser] = useState() // Define el estado para el apellido del usuario
    const [emailUser, SetEmailUser] = useState() // Define el estado para el correo electrónico del usuario
    const [passUser, SetPassUser] = useState() // Define el estado para la contraseña del usuario
    const [existingUsers, setExistingUsers] = useState([]); // Define el estado para almacenar los usuarios existentes
    const [reload, setReload] = useState(false) // Define el estado para controlar la recarga de la lista de usuarios
    

    useEffect(() => { // Hook para ejecutar una función cuando el componente se monta
        async function fetchDataUsers() { // Función para obtener los usuarios existentes
            const users = await UsersCallers.getUsers("usersInfo"); // Llama a la función que obtiene los usuarios
            setExistingUsers(users); // Actualiza el estado con los usuarios obtenidos
        }
        fetchDataUsers(); // Ejecuta la función
    }, []); // El array vacío asegura que se ejecute solo una vez cuando el componente se monte


    async function registerInfo() { // Función para manejar el registro de un nuevo usuario

        if (!nameUser || !lastUser || !emailUser || !passUser) { // Verifica que todos los campos estén llenos
            Swal.fire({
              title: "Por favor rellena todos los campos!", // Muestra un mensaje de error
              text: "Intentalo de nuevo!",
              icon: "error",
            });
            return;
        }
        
        if (passUser.length < 6) { // Verifica que la contraseña tenga al menos 6 caracteres
            Swal.fire({
              title: "La contraseña debe tener mas de 6 caracteres!", 
              text: "Intentalo de nuevo!",
              icon: "error",
            });
            return;
        }

        const duplicatedUser = existingUsers.find( // Verifica si el correo electrónico ya está registrado
            (user) => user.userEmail === emailUser
        );
        if (duplicatedUser) { // Si el correo ya está registrado muestra error
            Swal.fire({
              title: "Usuario o contraseña en uso!", 
              text: "Intentalo de nuevo!",
              icon: "error",
            });
            return;
        }       

        let users = { // Crea un objeto con los datos del nuevo usuario
            "userName": nameUser,
            "userLast": lastUser,
            "userEmail": emailUser,
            "userPass": passUser
        }
        UsersCallers.postUsers(users, "usersInfo") // Llamado para ingresar el usuario

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
            <input  onChange={(e) => SetLastUser(e.target.value)} type="text" placeholder="Apellido" className="register-input"/> 
            <input  onChange={(e) => SetEmailUser(e.target.value)} type="text" placeholder="Correo" className="register-input"/>
            <input  onChange={(e) => SetPassUser(e.target.value)} type="password" placeholder="Contraseña" className="register-input"/>
            <button onClick={registerInfo} className="register-Btn">Register</button> 
            <p className="">Ya tenes una cuenta? <Link to= "/Login"> Login</Link></p> 
        </div>
    </div>
    </>
    )
}
export default RegisterCenter
