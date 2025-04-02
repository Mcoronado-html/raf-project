import Button from "react-bootstrap/Button"; // Importamos los componentes de React Bootstrap para botones y tarjetas
import Card from "react-bootstrap/Card";
import React, { useState, useEffect } from "react"; // Importamos React y sus hooks useState y useEffect
import RAFCallers from "../services/RAFCallers"; // Importamos un servicio llamado RAFCallers que se encarga de hacer llamadas a la API
import { useNavigate } from "react-router-dom";// Importamos herramientas de navegación de React Router
import "../styles/ArtistPage.css";// Importamos los estilos específicos para esta página

const ArtistPage = () => {

  const [userInfo, setUserInfo] = useState([]);// Estado para almacenar la información de los usuarios
  const [userProducts, setUserProducts] = useState({});// Estado para almacenar los productos de cada usuario (un objeto con userId como clave)
  const navigate = useNavigate();  // Hook para navegar entre páginas sin recargar la aplicación

  useEffect(() => { // Hook useEffect que se ejecuta cuando el componente se monta
    async function fetchDataUsers() {

      const infoUser = await RAFCallers.getUsers("usersInfo"); // Llamado para obtener la información de los usuarios
      setUserInfo(infoUser); // Guardamos la información en el estado

      const productPromises = infoUser.map(async (user) => { // Creamos un array de promesas para obtener los productos de cada usuario
        const products = await getProdUsers(user.id); // Llamado para obtener los productos de un usuario específico
        return { [user.id]: products }; // Retornamos un objeto donde la clave es el id del usuario y el valor es la lista de productos
      });
      
      const productsArray = await Promise.all(productPromises); // Esperamos que todas las promesas se resuelvan y obtenemos un array con los productos
      const productsData = Object.assign({}, ...productsArray); // Convertimos el array en un objeto combinando todas las claves y valores    
      setUserProducts(productsData); // Guardamos los productos en el estado
    }

    fetchDataUsers(); // Llamamos a la función para obtener los datos cuando el componente se monte
  }, []); // El array de dependencias vacío indica que este efecto solo se ejecutará una vez

  
  async function getProdUsers(id) { // Función para obtener los productos de un usuario en específico
    const data = await RAFCallers.getUsers("products"); // Llamado para obtener todos los productos
    return data.filter((fil) => fil.userId === id); // Filtramos solo los productos que pertenecen al usuario con el id dado
  } 
  function getUserId(id) { // Función para almacenar el ID del usuario en localStorage y navegar a la página de perfil público
    localStorage.setItem("getUserid", id); // Guardamos el ID en el almacenamiento local
    navigate("/PublicProfile"); // Redirigimos a la página de perfil público
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
                      <Card.Text>Precio: {prodUser.price}</Card.Text>
                      <Card.Text>Tallas: {prodUser.size}</Card.Text>
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
// Exportamos el componente para que pueda ser utilizado en otras partes de la aplicación
export default ArtistPage;
