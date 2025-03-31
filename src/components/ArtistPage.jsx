import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import React, { useState, useEffect } from "react";
import RAFCallers from "../services/RAFCallers";
import { Link, useNavigate } from "react-router-dom";
import "../styles/ArtistPage.css"

const ArtistPage = () => {
  const [userInfo, setUserInfo] = useState([]);
  const [userProducts, setUserProducts] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchDataUsers() {
      const infoUser = await RAFCallers.getUsers("usersInfo");
      setUserInfo(infoUser);

      const productPromises = infoUser.map(async (user) => {
        const products = await getProdUsers(user.id);
        return { [user.id]: products };
      });

      const productsArray = await Promise.all(productPromises);
      const productsData = Object.assign({}, ...productsArray);

      setUserProducts(productsData);
    }
    fetchDataUsers();
  }, []);

  async function getProdUsers(id) {
    const data = await RAFCallers.getUsers("products");
    return data.filter((fil) => fil.userId === id);
  }

  function getUserId(id) {
    localStorage.setItem("getUserid", id);
    navigate("/PublicProfile");
  }

  return (
    <>
      <div className="artist-container1">
        <h4 className="artist-h4">Estos son nuestros artistas</h4>
      <div className="cont-cards">
        <ul className="artist-ul">
          {userInfo.map((info) => (
            <div key={info.id} className="artist-container2">
              <h3 className="artist-h3">{info.brandName}</h3>
              {userProducts[info.id]?.map((prodUser) => (
                <Card style={{ width: "18rem" }} key={prodUser.id}>
                  <Card.Img variant="top" src={prodUser.prodImg} width={40} height={40} />
                  <Card.Body>
                    <Card.Title>{prodUser.name}</Card.Title>
                    <Card.Text>{prodUser.description}</Card.Text>
                    <Button variant="primary" onClick={() => getUserId(prodUser.userId)}>
                      Comprar
                    </Button>
                  </Card.Body>
                </Card>
              ))}
            </div>
          ))}
        </ul>
      </div>
      </div>
    </>
  );
};

export default ArtistPage;