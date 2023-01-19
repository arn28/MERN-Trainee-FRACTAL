// import axios from 'axios'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Product from './Product'

function ProductsList() {

    const [dataproducts, setdataproduct] = useState([])

    useEffect(() => {
        axios.get('/api/product.model/getproducts').then(res => {
            // console.log(res.data)
            setdataproduct(res.data)
            console.log('test data useeffect');
            console.log(res.data);
            console.log('end');
        }).catch(err => {
            console.log(err)
        })

    }, [])

    // Mapping productslist in object product
    // const productlist = dataproducts.map((product, index) => {
    //     return (


    //         <Product key={index.toString()} product={product} index={index} />

    //     )
    // })

    // console.log('here');
    // console.log(productlist);
    // console.log('end');


    return (
        <div>
            <div className="container">
                <h2 className='products__title title m-0 mt-4'>Products</h2>
                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                    <Link to='/createproduct' className="btn m-4 btn-primary ">Create a product</Link>
                </div>
            </div>
            <div className="container">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">N°</th>
                            <th scope="col">Name</th>
                            <th scope="col">Category</th>
                            <th scope="col">Price</th>
                            <th scope="col">Status</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {productlist} */}
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default ProductsList