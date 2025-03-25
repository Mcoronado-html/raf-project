import React, {useState, useEffect} from "react"    
import UsersCallers from "../services/RAFCallers"
import { Link } from "react-router-dom"



const HomeProfile = () => {

        const [LoginAccess, SetLoginInfo]=useState([])

        useEffect(() =>{
            async function fetchDataUsers() {
                const userLogin = await UsersCallers.getUsers("usersInfo",localStorage.getItem ("userId"))
                SetLoginInfo(userLogin)            
            };
            fetchDataUsers();
            console.log(LoginAccess);
            
        },[]);

    return(
    <>  
       <div>
        <h4>{LoginAccess.brandName}</h4>
        <p>{LoginAccess.personalDescription}</p>
        <p>{LoginAccess.addressUser}</p>
       </div>

       <div>
       <Link to= "/Items"><button>Publicar Articulos</button></Link>
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
        <div>6</div>
       </div>
       
    </>
    )
}
export default HomeProfile