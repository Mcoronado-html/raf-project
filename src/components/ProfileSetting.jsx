import { useState } from "react" // Importa el hook useState para manejar el estado del componente
import UsersCallers from "../services/RAFCallers" // Importa la función para interactuar con la API o base de datos
import "../styles/ProfileSetting.css" // Importa los estilos para el componente

const ProfileSetting = () => {

    const [img, setImg] = useState(null) // Define el estado para almacenar la imagen cargada

    const uploadImg = (event) => { // Función para manejar la carga de una imagen
        const file = event.target.files[0]
        if (file) {
            const reader = new FileReader() 
            reader.onloadend = () => { 
                setImg(reader.result) 
            }
            reader.readAsDataURL(file) 
        }
    }

    const [areaArt, SetAreaArt] = useState() // Define el estado para almacenar el área artística seleccionada
    const [brandName, SetBrandName] = useState() // Define el estado para almacenar el nombre de la marca
    const [personalDescription, SetPersonalDescription] = useState() // Define el estado para almacenar la descripción personal
    const [addressUser, SetAddressUser] = useState() // Define el estado para almacenar la dirección del usuario
  
    function settingsProfile() { // Función para enviar la información del perfil actualizado
        let profileSettings = { // Crea un objeto con los datos del perfil
            "area": areaArt,
            "brandName": brandName,
            "personalDescription": personalDescription,
            "addressUser": addressUser,
            "userName": localStorage.getItem("userName"), // Obtiene el nombre del usuario desde el localStorage
            "userLast": localStorage.getItem("userLast"), // Obtiene el apellido del usuario desde el localStorage
            "profilePfp": img // Incluye la imagen de perfil
        }
        UsersCallers.updateUsers(profileSettings, "usersInfo", localStorage.getItem("userId")) // Llama a la función para actualizar el perfil en la base de datos
    }

    return (
        <>  
        <div className="profilesetting-container"> 
            <h4 className="profilesetting-h4">Contanos tu area artistica</h4> 
            <select className="profilesetting-select" onChange={(e) => SetAreaArt(e.target.value)}> 
                <option defaultValue={""} disabled selected className="profilesetting-option">Seleccione area</option>
                <option value={"Fotografia"} className="profilesetting-option">Fotografia</option>
                <option value={"Marca de Ropa"} className="profilesetting-option">Marca de Ropa</option>
                <option value={"Stylish"} className="profilesetting-option">Stylish</option>
                <option value={"Otro"} className="profilesetting-option">Otro</option>
            </select>
            <h4 className="profilesetting-h4">Como se llama tu marca</h4>
            <input type="text" onChange={(e) => SetBrandName(e.target.value)} className="profilesetting-input"/> 
            <h4>Contanos mas sobre vos y que te inspira</h4>
            <input type="text" onChange={(e) => SetPersonalDescription(e.target.value)} className="profilesetting-input"/> 
            <h4 className="profilesetting-h4">De donde sos?</h4>
            <input type="text" placeholder="ejm. San Jose, Costa Rica" onChange={(e) => SetAddressUser(e.target.value)} className="profilesetting-input"/> {/* Input para la dirección */}
            <h4 className="profilesetting-h4">Foto de perfil</h4>
            <input type="file" onChange={uploadImg} className="profilesetting-input"/> 
            <button onClick={settingsProfile} className="profilesetting-btn">Enviar</button>
        </div>
        </>
    )
}
export default ProfileSetting
