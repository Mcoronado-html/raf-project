import React, {useState, useEffect} from "react"
import UsersCallers from "../services/RAFCallers"

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

    function name(event){
      SetProdName(event.target.value)
    }
    function price(event){

      SetProdPrice(event.target.value)
    }
    function description(event){

      SetProdDescription(event.target.value)
    }
    function size(event){

      SetProdSize(event.target.value)
    }

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
    <h2>Añadi un nuevo articulo</h2>
    <div>
    <p>Nombre</p>
    <input type="text" value={prodName} onChange={name}/>
    <p>Precio</p>
    <input type="text" value={prodPrice} onChange={price}/>
    <p>Descripcion</p>
    <input type="text" value={prodDescription} onChange={description}/>
    <p>Tallas</p>
    <input type="text" value={prodSize} onChange={size}/>
    <p>Fotos</p>
    <input type="file" onChange={uploadImg} />
    <button onClick={productsInfo}>Publicar</button>
        
    </div>
    </>
    )
}
export default ItemsPosting