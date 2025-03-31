import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import React, { useState, useEffect } from "react";
import UsersCallers from "../services/RAFCallers";
import { useNavigate } from "react-router-dom";
import "../styles/HomePublic.css";
import bannerImage from "../assets/img/128588.jpg"; 

const HomePublic = () => {
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchDataUsers() {
      const userGet = await UsersCallers.getUsers("usersInfo") || [];
      setUser(userGet);
    }
    async function fetchProducts() {
      const productsGet = await UsersCallers.getUsers("products") || [];
      setProducts(productsGet);
    }
    fetchProducts();
    fetchDataUsers();
  }, []);

  function getUserId(id) {
    localStorage.setItem("getUserid", id);
    navigate("/PublicProfile");
  }

  return (
    <>
      <Carousel>
        <Carousel.Item>
          <img src={bannerImage} alt="" width={1400} height={300} />
          <Carousel.Caption>
            <h3>Bienvenido a Heavenly</h3>
            <p>Enseñando el talento costarricense</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img src={bannerImage} alt="" width={1400} height={300} />
          <Carousel.Caption>
            <h3>Bienvenido a Heavenly</h3>
            <p>Enseñando el talento costarricense</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img src={bannerImage} alt="" width={1400} height={300} />
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
