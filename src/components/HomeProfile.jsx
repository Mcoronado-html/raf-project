import React, { useState, useEffect } from "react"
import UsersCallers from "../services/RAFCallers"
import { Link } from "react-router-dom"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

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
      <div>
        <h4>{LoginAccess.brandName}</h4>
        <p>{LoginAccess.personalDescription}</p>
        <p>{LoginAccess.addressUser}</p>
      </div>

      <div>
        <Link to="/Items"><button>Publicar Articulos</button></Link>

        {usersProducts.map((product) => {
          return (
            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src="holder.js/100px180" />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>
                  {product.description}
                </Card.Text>
                <Card.Text>
                  {product.price}
                </Card.Text>
                <Card.Text>
                  {product.size}
                </Card.Text>
                <Button variant="primary" onClick={() => {

                  localStorage.setItem("prodId", product.id)

                }}>Editar</Button>
                <Button variant="primary"onClick={()=> deleteProd(product.id)}>Eliminar articulo</Button>
              </Card.Body>
            </Card>
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