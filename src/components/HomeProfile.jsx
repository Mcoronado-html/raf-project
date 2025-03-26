import React, {useState, useEffect} from "react"    
import UsersCallers from "../services/RAFCallers"
import { Link } from "react-router-dom"



const HomeProfile = () => {

        const [LoginAccess, SetLoginInfo]=useState([])
        const [usersProducts, SetUsersProducts]=useState([])


        useEffect(() =>{
            async function fetchDataUsers() {
                const userLogin = await UsersCallers.getUsers("usersInfo",localStorage.getItem ("userId"))
                SetLoginInfo(userLogin)            
            };
            fetchDataUsers();
        
        async function fetchProductUsers() {
            const productsUsers = await UsersCallers.getUsers("products")
            const productFilter = productsUsers.filter (p=> p.userId === localStorage.getItem ("userId"))
            SetUsersProducts(productFilter)  
            
        };
        fetchProductUsers();
        

            
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

        {usersProducts.map((product)=> {
            return(
                <div className="card" style={{ width: "18rem" }}>
                <img className="card-img-top" src="..." alt="Card image cap" />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">
                    {product.description}
                  </p>
                  <p className="card-text">
                    {product.price}
                  </p>
                  <p className="card-text">
                    {product.size}
                  </p>
                  <a href="#" className="btn btn-primary">
                    Comprar
                  </a>
                </div>
              </div>
            )
        })}
       </div>


       
    </>
    )
}
export default HomeProfile