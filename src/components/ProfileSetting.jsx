import { useState } from "react"
import UsersCallers from "../services/RAFCallers"

const ProfileSetting = () => {

    const [img, setImg] = useState(null)


    const uploadImg =(event)=>{
        const file = event.target.files[0]
        if (file) {
      const reader = new FileReader()
      reader.onloadend = ()=>{
        setImg(reader.result)
      }
      reader.readAsDataURL(file)
      }
      }


      const [areaArt, SetAreaArt]=useState()
      const [brandName, SetBrandName]=useState()
      const [personalDescription, SetPersonalDescription]=useState()
      const [addressUser, SetAddressUser]=useState()
  
      function settingsProfile(){
        
        let profileSettings = {
            "area": areaArt,
            "brandName": brandName,
            "personalDescription": personalDescription,
            "addressUser": addressUser,
            "userName": localStorage.getItem("userName"),
            "userLast": localStorage.getItem("userLast"),
            "profilePfp": img

        }
        UsersCallers.updateUsers(profileSettings, "usersInfo", localStorage.getItem("userId"))
    }

    return(
    <>  
    <div>
        <h4>Contanos tu area artistica</h4>
        <select onChange={(e)=> SetAreaArt(e.target.value)}>
            <option defaultValue={""} disabled selected>Seleccione area</option>
            <option value={"Fotografia"}>Fotografia</option>
            <option value={"Marca de Ropa"}>Marca de Ropa</option>
            <option value={"Stylish"}>Stylish</option>
            <option value={"Otro"}>Otro</option>
        </select>
        <h4>Como se llama tu marca</h4>
        <input type="text" onChange={(e) => SetBrandName(e.target.value)} />
        <h4>Contanos mas sobre vos y que te inspira</h4>
        <input type="text"  onChange={(e) => SetPersonalDescription(e.target.value)} />
        <h4>De donde sos?</h4>
        <input type="text" placeholder="ejm. San Jose, Costa Rica"  onChange={(e) => SetAddressUser(e.target.value)}  />
        <h4>Foto de perfil</h4>
        <input type="file" onChange={uploadImg} />
        <button onClick={settingsProfile}>Enviar</button>
    </div>
    </>
    )
}
export default ProfileSetting