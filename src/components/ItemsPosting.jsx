import React from 'react'

const ItemsPosting = () => {

    const uploadImg =(event)=>{
        const file = event.target.files[0]
        if (file) {
      const reader = new FileReader()
      reader.onloadend = ()=>{
        setImg(reader.result)
      }
      reader.readAsDataURL(file)
      }
    }

   
    return(
    <>
    <h2>Añadi un nuevo articulo</h2>
    <div>
    <p>Nombre</p>
    <input type="text" />
    <p>Precio</p>
    <input type="text" />
    <p>Descripcion</p>
    <input type="text" />
    <p>Tallas</p>
    <input type="text"  />
    <p>Fotos</p>
    <input type="text" onChange={uploadImg} />
    <button>Publicar</button>
        
    </div>
    </>
    )
}
export default ItemsPosting