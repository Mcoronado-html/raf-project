import Carousel from "react-bootstrap/Carousel";// Importamos el componente Carousel de React Bootstrap para el carrusel de imágenes
import Button from "react-bootstrap/Button";// Importamos Button y Card de React Bootstrap para botones y tarjetas de productos
import Card from "react-bootstrap/Card";
import React, { useState, useEffect } from "react";// Importamos React y los hooks useState y useEffect
import UsersCallers from "../services/RAFCallers";// Importamos el servicio UsersCallers para hacer llamadas a la API
import { useNavigate } from "react-router-dom";// Importamos useNavigate de react-router-dom para manejar la navegación entre páginas
import "../styles/HomePublic.css";// Importamos los estilos específicos para esta página
import bannerImage from "../assets/img/128588.jpg";// Importamos la imagen que se usará en el carrusel


const HomePublic = () => {
 
  const [products, setProducts] = useState([]); // Estado para almacenar la lista de productos obtenidos de la API
  const [user, setUser] = useState([]); // Estado para almacenar la lista de usuarios obtenidos de la API
  const navigate = useNavigate(); // Hook de navegación para redireccionar a otra página

  
  useEffect(() => { // useEffect para cargar los datos de los productos y los usuarios al montar el componente
    async function fetchDataUsers() {     
      const userGet = await UsersCallers.getUsers("usersInfo") || []; // Obtenemos la lista de usuarios desde la API
      setUser(userGet); // Guardamos la lista en el estado
    }

    async function fetchProducts() {
      const productsGet = await UsersCallers.getUsers("products") || []; // Obtenemos la lista de productos desde la API
      setProducts(productsGet); // Guardamos la lista en el estado
    }
    fetchProducts();// Llamamos a ambas funciones para cargar los datos
    fetchDataUsers();
  }, []); // Se ejecuta solo una vez al montar el componente


  function getUserId(id) { // Función para guardar el ID del usuario y redirigir a su perfil público
    localStorage.setItem("getUserid", id); // Guardamos el ID en el localStorage
    navigate("/PublicProfile"); // Redirigimos a la página del perfil público
  }

  return (
    <>
      <Carousel>
        <Carousel.Item>
          <img src={bannerImage} alt="Banner" width={1400} height={300} />
          <Carousel.Caption>
            <h3>Bienvenido a Heavenly</h3>
            <p>Enseñando el talento costarricense</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img src={bannerImage} alt="Banner" width={1400} height={300} />
          <Carousel.Caption>
            <h3>Bienvenido a Heavenly</h3>
            <p>Enseñando el talento costarricense</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img src={bannerImage} alt="Banner" width={1400} height={300} />
          <Carousel.Caption>
            <h3>Bienvenido a Heavenly</h3>
            <p>Enseñando el talento costarricense</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <h2 className="public-h2">Productos destacados</h2>
      <div className="contCardsHome">
        {products.map((produc) => (
          <div className="public-container" key={produc.id}>
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src={produc.prodImg} width={40} height={40} />
              <Card.Body>
                <Card.Title>{produc.name}</Card.Title>
                <Card.Text>{produc.description}</Card.Text>
                <Button variant="primary" onClick={() => getUserId(produc.userId)}>
                  Comprar
                </Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </>
  );
};
export default HomePublic;
