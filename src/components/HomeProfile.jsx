import React, { useState, useEffect } from "react"; // Importamos React y los hooks useState y useEffect
import UsersCallers from "../services/RAFCallers"; // Importamos el servicio UsersCallers para hacer llamadas a la API
import { Link } from "react-router-dom"; // Importamos Link de react-router-dom para manejar la navegación interna sin recargar la página
import Button from 'react-bootstrap/Button'; // Importamos los componentes de React Bootstrap para botones y tarjetas
import Card from 'react-bootstrap/Card';
import "../styles/HomeProfile.css";

const HomeProfile = () => {
  
  const [LoginAccess, SetLoginInfo] = useState([]); // Estado para almacenar la información del usuario que ha iniciado sesión
  const [usersProducts, SetUsersProducts] = useState([]); // Estado para almacenar los productos publicados por el usuario
  const [editName, SetEditName] = useState(""); // Estados para manejar la edición de los productos
  const [editDescription, SetEditDescription] = useState("");
  const [editPrice, SetEditPrice] = useState("");
  const [editSize, SetEditSize] = useState("");
  const [prodImg, setProdImg] = useState(null); // Estado para almacenar la imagen del producto a editar
  const [reload, setReload] = useState(false);// Estado para forzar la recarga de datos cuando se editen o eliminen productos

  const uploadImg = (event) => { // Función para manejar la carga de imágenes desde un input tipo file
    const file = event.target.files[0]; 
    if (file) {
      const reader = new FileReader(); 
      reader.onloadend = () => {
        setProdImg(reader.result);
      };
      reader.readAsDataURL(file); 
    }
  };

  useEffect(() => { // useEffect para obtener la información del usuario y sus productos cuando se monta el componente
    async function fetchDataUsers() {
      const userLogin = await UsersCallers.getUsers("usersInfo", localStorage.getItem("userId")); // Llamado para obtener la información del usuario que ha iniciado sesión
      SetLoginInfo(userLogin); // Guardamos la información en el estado
    }
    fetchDataUsers(); // Ejecutamos la función

    async function fetchProductUsers() {
      const productsUsers = await UsersCallers.getUsers("products");// Llamado para obtener todos los productos
      const productFilter = productsUsers.filter(p => p.userId === localStorage.getItem("userId"));// Filtramos solo los productos del usuario que ha iniciado sesión
      SetUsersProducts(productFilter);// Guardamos los productos en el estado
    }
    fetchProductUsers(); // Ejecutamos la función
  }, [reload]); // Se ejecuta cuando cambia reload
  
  async function editProd(id) { // Función para editar un producto
    let editInfo = { // Creamos un objeto con los datos editados
      "prodImg": prodImg,
      "name": editName,
      "description": editDescription,
      "price": editPrice,
      "size": editSize
    };
    
    await UsersCallers.updateUsers(editInfo, "products", id); // Llamado para actualizar el producto
    setReload(!reload);
  }

  async function deleteProd(id) { // Función para eliminar un producto 
    await UsersCallers.deleteUser("products", id); // Llamado para eliminar el producto
    setReload(!reload);
  }

  return (
    <>
      <div className="profile-container2">
        <h4 className="profile-h4">{LoginAccess.brandName}</h4>
        <p className="profile-p">{LoginAccess.personalDescription}</p>
        <p className="profile-p">{LoginAccess.addressUser}</p>
        <Link to="/Items">
          <button className="profile-btn">Publicar Articulos</button>
        </Link>
      </div>

      <div>
        <div className="contCardsHome">
          {usersProducts.map((product) => {
            return (
              <Card style={{ width: '18rem' }} key={product.id}>
                <Card.Img variant="top" src={product.prodImg} />
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>Descripcion: {product.description}</Card.Text>
                  <Card.Text>Precio: {product.price}</Card.Text>
                  <Card.Text>Tallas: {product.size}</Card.Text>
                  <Button variant="primary" onClick={() => {
                    localStorage.setItem("prodId", product.id);
                  }}>
                    Editar
                  </Button>
                  <Button variant="primary" onClick={() => deleteProd(product.id)}>
                    Eliminar articulo
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </div>
        <div>
          <h4 className="profile-h4">Edita tus productos</h4>
          <input type="file" onChange={uploadImg} className="profile-input"/>
          <input type="text" onChange={(e) => SetEditName(e.target.value)} className="profile-input"/>
          <input type="text" onChange={(e) => SetEditDescription(e.target.value)} className="profile-input"/>
          <input type="text" onChange={(e) => SetEditPrice(e.target.value)} className="profile-input"/>
          <input type="text" onChange={(e) => SetEditSize(e.target.value)} className="profile-input"/>
          <button className="profile-btn" onClick={() => editProd(localStorage.getItem("prodId"))}>
            Confirmar cambios
          </button>
        </div>
      </div>
    </>
  );
};

// Exportamos el componente para que pueda ser utilizado en otras partes de la aplicación
export default HomeProfile;
