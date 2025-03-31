import React, { useState, useEffect } from "react"
import UsersCallers from "../services/RAFCallers"
import { Link } from "react-router-dom"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import "../styles/HomeProfile.css"

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

  async function deleteProd(id) {

    await UsersCallers.deleteUser("products", id)
    setReload(!reload)
  }


  return (
    <>
      <div className="profile-container2">
        <h4 className="profile-h4">{LoginAccess.brandName}</h4>
        <p className="profile-p">{LoginAccess.personalDescription}</p>
        <p className="profile-p">{LoginAccess.addressUser}</p>
        <Link to="/Items"><button className="profile-btn">Publicar Articulos</button></Link>
      </div>

      <div>
      <div className="cont-cards">
        {usersProducts.map((product) => {
          return (
            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src={product.prodImg} />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>
                  Descripcion: {product.description}
                </Card.Text>
                <Card.Text>
                  Precio: {product.price}
                </Card.Text>
                <Card.Text>
                  Tallas: {product.size}
                </Card.Text>
                <Button variant="primary" onClick={() => {

                  localStorage.setItem("prodId", product.id)

                }}>Editar</Button>
                <Button variant="primary"onClick={()=> deleteProd(product.id)}>Eliminar articulo</Button>
              </Card.Body>
            </Card>
          )
        })}
        </div>
        <div>
          <h4 className="profile-h4">Edita tus productos</h4>
          <input type="file" onChange={uploadImg} className="profile-input"/>
          <input type="text" onChange={(e) => SetEditName(e.target.value)} className="profile-input"/>
          <input type="text" onChange={(e) => SetEditDescription(e.target.value)} className="profile-input"/>
          <input type="text" onChange={(e) => SetEditPrice(e.target.value)} className="profile-input"/>
          <input type="text" onChange={(e) => SetEditSize(e.target.value)} className="profile-input"/>
          <button className="profile-btn" onClick={() => editProd(
            localStorage.getItem("prodId")
          )}>Confirmar cambios</button>
        </div>
      </div>

    </>
  )
}
export default HomeProfile