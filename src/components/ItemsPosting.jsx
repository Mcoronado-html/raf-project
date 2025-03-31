import React, {useState, useEffect} from "react"
import UsersCallers from "../services/RAFCallers"
import "../styles/ItemsPosting.css"

const ItemsPosting = () => {

    const [prodImg, setProdImg] = useState(null)

    const uploadImg =(event)=>{

        const file = event.target.files[0]
        if (file) {
      const reader = new FileReader()
      reader.onloadend = ()=>{
        setProdImg(reader.result)
      }
      reader.readAsDataURL(file)
      }
    }
    const [prodName, SetProdName]=useState()
    const [prodPrice, SetProdPrice]=useState()
    const [prodDescription, SetProdDescription]=useState()
    const [prodSize, SetProdSize]=useState()

    function productsInfo(){
      
      let infoProducts = {
          "name": prodName,
          "price": prodPrice,
          "description": prodDescription,
          "size": prodSize,
          "userName": localStorage.getItem("userName"),
          "userLast": localStorage.getItem("userLast"),
          "prodImg": prodImg,
          "userId": localStorage.getItem("userId")

      }
      UsersCallers.postUsers(infoProducts, "products", localStorage.getItem("userId"))
  }
   
    return(
    <>
    <div className="items-container">
    <h2 className="items-h2">Añadi un nuevo articulo</h2>
    <p className="items-p">Nombre</p>
    <input type="text" onChange={(e) => SetProdName(e.target.value)} className="items-input"/>
    <p className="items-p">Precio</p>
    <input type="text" onChange={(e) => SetProdPrice(e.target.value)} className="items-input"/>
    <p className="items-p">Descripcion</p>
    <input type="text" onChange={(e) => SetProdDescription(e.target.value)} className="items-input"/>
    <p className="items-p">Tallas</p>
    <input type="text" onChange={(e) => SetProdSize(e.target.value)} className="items-input"/>
    <p className="items-p">Fotos</p>
    <input type="file" onChange={uploadImg} className="items-input"/>
    <button onClick={productsInfo} className="items-btn">Publicar</button>
        
    </div>
    </>
    )
}
export default ItemsPosting