import { useEffect, useState } from "react";
import RAFCallers from "../services/RAFCallers";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import MainNav from "../components/MainNav";
import FooterHighFashion from "../components/FooterPage";

function PublicProfile() {
  const [userGet, setUserGet] = useState([]);
  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    async function fetchDataUsers() {
      const infoUser = await RAFCallers.getUsers("usersInfo", localStorage.getItem("getUserid"));
      setUserInfo(infoUser);
    }
    fetchDataUsers();

    async function getProdUsers() {
      const data = await RAFCallers.getUsers("products");
      const filter = data.filter(fil => fil.userId == localStorage.getItem("getUserid"));
      setUserGet(filter);
    }
    getProdUsers();
  }, []);

  return (
    <>
    <nav>
        <MainNav/>   
    </nav>

    <div className="profile-container2">
        <h4 className="profile-h4">{userInfo.brandName}</h4>
        <p className="profile-p">{userInfo.personalDescription}</p>
        <p className="profile-p">{userInfo.addressUser}</p>
    </div>

    <div>
      {userGet.map(produc => (
        <div key={produc.id}>
          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src={produc.prodImg} />
            <Card.Body>
              <Card.Title>{produc.name}</Card.Title>
              <Card.Text>{produc.description}</Card.Text>
              <Button variant="primary">Comprar</Button>
            </Card.Body>
          </Card>
        </div>
      ))}
    </div>
    <footer>
    <FooterHighFashion/>   
    </footer>
    </>
  );
}

export default PublicProfile;
