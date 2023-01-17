// import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Product from './Product'
// import UsuarioIndividual from './UsuarioIndividual'

function ProductsList() {

    // const [datausuarios, setdatausuario] = useState([])

    // useEffect(() => {
    //     axios.get('api/usuario/obtenerusuarios').then(res => {
    //         console.log(res.data)
    //         setdatausuario(res.data)
    //     }).catch(err => {
    //         console.log(err)
    //     })

    // }, [])

    //Mapping productslist in object product
    // const listausuarios = datausuarios.map(usuario => {
    //     return (
    //         <div>
    //             <UsuarioIndividual usuario={usuario} />
    //         </div>
    //     )
    // })


    return (
        <div>
            <h2 className='products__title'>Products</h2>
            <Product/>
            {/* {productlist} */}
        </div>
    )
}

export default ProductsList