// import axios from 'axios'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Product from './Product'

function ProductsList() {

    const [dataproducts, setdataproduct] = useState([]);

    useEffect(() => {

        // axios.get('/api/product.model/getproducts').then(res => {
        //     setdataproduct(res.data)
        // }).catch(err => {
        //     console.log(err)
        // })

        async function fetchProducts() {
            try {
                const response = await axios.get('/api/product.model/getproducts');
                setdataproduct(response.data);
            }
            catch (error) {
                console.log(error)
            }
        }
        fetchProducts();

    }, []);

    // Mapping productslist in object product
    // const productlist = dataproducts.map((product, index) => {
    //     return (
    //         <Product key={index.toString()} product={product} index={index} />
    //     )
    // })

    // dataproducts.map((product, index) => (
    //     <Product key={index.toString()} product={product} index={index} />
    // ))





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
                        {dataproducts.map((product, index) => (
                            <Product key={product.idproduct} product={product} index={index} />
                        ))
                        }
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default ProductsList