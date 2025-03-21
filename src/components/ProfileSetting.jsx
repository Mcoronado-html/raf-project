import { useState } from "react"
import UserCallers from "../services/RAFCallers"

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
  
      function area(event){
        SetAreaArt(event.target.value)
      }
      function brand(event){
  
        SetBrandName(event.target.value)
      }
      function description(event){
  
        SetPersonalDescription(event.target.value)
      }
      function address(event){
  
        SetAddressUser(event.target.value)
      }

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
        UserCallers.updateUsers(profileSettings, "usersInfo", localStorage.getItem("userId"))
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
        <input type="text" value={brandName} onChange={brand}/>
        <h4>Contanos mas sobre vos y que te inspira</h4>
        <input type="text" value={personalDescription} onChange={description}/>
        <h4>De donde sos?</h4>
        <input type="text" placeholder="ejm. San Jose, Costa Rica" value={addressUser} onChange={address} />
        <h4>Foto de perfil</h4>
        <input type="file" onChange={uploadImg} />
        <button onClick={settingsProfile}>Enviar</button>
    </div>
    </>
    )
}
export default ProfileSetting