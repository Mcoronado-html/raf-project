import React, {useState, useEffect} from "react" // Importa React y los hooks useState y useEffect
import UsersCallers from "../services/RAFCallers" // Importa un servicio para manejar llamadas a usuarios
import { useNavigate } from "react-router-dom" // Importa useNavigate para la navegación entre páginas
import "../styles/LoginCenter.css" // Importa los estilos CSS
import Swal from 'sweetalert2' // Importa la librería SweetAlert2 para mostrar alertas

const LoginCenter = () => {

    const [emailUser, SetEmailUser]=useState("") // Estado para almacenar el correo del usuario
    const [passUser, SetPassUser]=useState("") // Estado para almacenar la contraseña del usuario
    const [LoginAccess, SetLoginInfo]=useState([]) // Estado para almacenar la lista de usuarios
    const navigate = useNavigate() // Hook de React Router para la navegación
     
    useEffect(() =>{
        async function fetchDataUsers() {
            const userLogin = await UsersCallers.getUsers("usersInfo") // Obtiene la lista de usuarios desde el servicio
            SetLoginInfo(userLogin) // Guarda la lista de usuarios en el estado
        };
        fetchDataUsers(); // Llama a la función para obtener los usuarios al cargar el componente
    },[]);

    function loginInfo() {
       const FindUser = LoginAccess.find(users => users.userEmail == emailUser && users.userPass == passUser) // Busca un usuario que coincida con el correo y la contraseña ingresados
        
       if (FindUser) { // Si encuentra el usuario, procede con el inicio de sesión
            navigate("/Public") // Redirige al usuario a la página principal
            localStorage.setItem("userId", FindUser.id) // Guarda el ID del usuario en el almacenamiento local
            localStorage.setItem("userName", FindUser.userName) // Guarda el nombre del usuario en el almacenamiento local
            localStorage.setItem("userLast", FindUser.userLast) // Guarda el apellido del usuario en el almacenamiento local
       }else{ // Si no encuentra el usuario, muestra una alerta de error
        Swal.fire({
            title: "Credenciales incorrectas!", // Título de la alerta
            text: "Intentalo de nuevo!", // Mensaje de la alerta
            icon: "error" // Icono de error
          });
       }
        
    }
    return(
    <>
    <div className="login-Container">
        <div className="login-Info">
        <h3 className="login-h3">Bienvenido de vuelta!</h3>
        <input  onChange={(e) =>  SetEmailUser(e.target.value)} type="text" placeholder="Correo" className="login-input"/> {/* Campo de entrada para el correo */}
        <input  onChange={(e) => SetPassUser(e.target.value)} type="password" placeholder="Contraseña" className="login-input"/> {/* Campo de entrada para la contraseña */}
        <button onClick={loginInfo} className="login-button">Login</button>
        </div>
    </div>
    </>
    )
}
export default LoginCenter 