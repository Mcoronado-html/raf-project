// Importa React y los hooks useState y useEffect
import React, { useState, useEffect } from "react";
// Importa el servicio para hacer llamadas a la API
import UsersCallers from "../services/RAFCallers";
 // Importa el archivo de estilos CSS
import "../styles/ItemsPosting.css";

// Componente funcional para la publicación de artículos
const ItemsPosting = () => {

    const [prodImg, setProdImg] = useState(null); // Estado para almacenar la imagen del producto

    // Función para manejar la subida de imágenes
    const uploadImg = (event) => {
        const file = event.target.files[0]; // Obtiene el primer archivo seleccionado
        if (file) {
            const reader = new FileReader(); // Crea un lector de archivos
            reader.onloadend = () => {
                setProdImg(reader.result); // Convierte la imagen a base64 y la guarda en el estado
            };
            reader.readAsDataURL(file); // Lee el archivo como una URL de datos
        }
    };

    // Estados para almacenar la información del producto
    const [prodName, SetProdName] = useState(""); // Nombre del producto
    const [prodPrice, SetProdPrice] = useState(""); // Precio del producto
    const [prodDescription, SetProdDescription] = useState(""); // Descripción del producto
    const [prodSize, SetProdSize] = useState(""); // Tamaño del producto

    // Función para crear el objeto del producto y enviarlo a la API
    function productsInfo() {
        let infoProducts = {
            "name": prodName,
            "price": prodPrice,
            "description": prodDescription,
            "size": prodSize,
            "userName": localStorage.getItem("userName"), // Obtiene el nombre del usuario del almacenamiento local
            "userLast": localStorage.getItem("userLast"), // Obtiene el apellido del usuario del almacenamiento local
            "prodImg": prodImg, // Imagen del producto
            "userId": localStorage.getItem("userId") // ID del usuario propietario del producto
        };
        UsersCallers.postUsers(infoProducts, "products", localStorage.getItem("userId")); // Envía los datos a la API
    }
    return (
        <>
            <div className="items-container">
                <h2 className="items-h2">Añadir un nuevo artículo</h2>              
                <p className="items-p">Nombre</p>
                <input type="text" onChange={(e) => SetProdName(e.target.value)} className="items-input" />                
                <p className="items-p">Precio</p>
                <input type="text" onChange={(e) => SetProdPrice(e.target.value)} className="items-input" />               
                <p className="items-p">Descripción</p>
                <input type="text" onChange={(e) => SetProdDescription(e.target.value)} className="items-input" />
                <p className="items-p">Tallas</p>
                <input type="text" onChange={(e) => SetProdSize(e.target.value)} className="items-input" />
                <p className="items-p">Fotos</p>
                <input type="file" onChange={uploadImg} className="items-input" />
                <button onClick={productsInfo} className="items-btn">Publicar</button>
            </div>
        </>
    );
};

export default ItemsPosting; 
