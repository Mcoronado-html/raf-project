import React, { useState, useEffect } from "react"
import UsersCallers from "../services/RAFCallers"
import { Link } from "react-router-dom"

const HomeProfile = () => {

  const [LoginAccess, SetLoginInfo] = useState([])
  const [usersProducts, SetUsersProducts] = useState([])
  const [editName, SetEditName] = useState("")
  const [editDescription, SetEditDescription] = useState("")
  const [editPrice, SetEditPrice] = useState("")
  const [editSize, SetEditSize] = useState("")
  const [prodImg, setProdImg] = useState(null)
  const [reload, setReload] = useState(false)

  const uploadImg = (event) => {

    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProdImg(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  useEffect(() => {
    async function fetchDataUsers() {
      const userLogin = await UsersCallers.getUsers("usersInfo", localStorage.getItem("userId"))
      SetLoginInfo(userLogin)
    };
    fetchDataUsers();

    async function fetchProductUsers() {
      const productsUsers = await UsersCallers.getUsers("products")
      const productFilter = productsUsers.filter(p => p.userId === localStorage.getItem("userId"))
      SetUsersProducts(productFilter)

    };
    fetchProductUsers();
  }, [
    reload

  ]);



  async function editProd(id) {

    let editInfo = {
      "prodImg": prodImg,
      "name": editName,
      "description": editDescription,
      "price": editPrice,
      "size": editSize
    }

    await UsersCallers.updateUsers(editInfo, "products", id)
    setReload(!reload)
  }



  return (
    <>
      <div>
        <h4>{LoginAccess.brandName}</h4>
        <p>{LoginAccess.personalDescription}</p>
        <p>{LoginAccess.addressUser}</p>
      </div>

      <div>
        <Link to="/Items"><button>Publicar Articulos</button></Link>

        {usersProducts.map((product) => {
          return (
            <div className="card" style={{ width: "18rem" }} key={product.id}>
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
                <a href="#" className="btn btn-primary" onClick={() => {

                  localStorage.setItem("prodId", product.id)

                }}>
                  Editar
                </a>
                <a href="#" className="btn btn-primary">
                  Eliminar
                </a>
              </div>

            </div>
          )
        })}
        <div>
          <input type="file" onChange={uploadImg} />
          <input type="text" onChange={(e) => SetEditName(e.target.value)} />
          <input type="text" onChange={(e) => SetEditDescription(e.target.value)} />
          <input type="text" onChange={(e) => SetEditPrice(e.target.value)} />
          <input type="text" onChange={(e) => SetEditSize(e.target.value)} />
          <button onClick={() => editProd(
            localStorage.getItem("prodId")
          )}>Confirmar cambios</button>
        </div>
      </div>



    </>
  )
}
export default HomeProfile