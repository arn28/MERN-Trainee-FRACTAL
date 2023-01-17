import './CreateProduct.css';

import React, { useState } from 'react';
import uniquid from 'uniqid';
import axios from 'axios';


function CreateProduct() {

    //Hooks
    const [name, setName] = useState('')
    const [category, setCategory] = useState('')
    const [unitePrice, setUnitePrice] = useState('')
    const [status, setStatus] = useState('')

    function addProduct() {
        var product = {
            name: name,
            category: category,
            unitePrice:  parseFloat(unitePrice),
            status: status,
            idproduct: uniquid()
        }
        console.log(product)

        //
        axios.post('/api/product.model/createproduct', product)
            .then(res => {
                alert(res.data)
                // Swal.fire('Felicidades', 'El product se creó con éxito')
            })
            .then(err => { console.log(err) })
    }

    return (
        <div>
            <div>
                <h2 className='createProduct__title'>Create Product</h2>
            </div>

            <div className="row">
                <div className="col-sm-6 offset-3">
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" value={name} onChange={(e) => { setName(e.target.value) }}></input>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="category" className="form-label">Category</label>
                        <select name="category" className="form-select" value={category} onChange={(e) => { setCategory(e.target.value) }}>
                            <option selected>Select a category</option>
                            <option value="Cookies">Cookies</option>
                            <option value="Candies">Candies</option>
                            <option value="Cakes">Cakes</option>
                            <option value="Desserts">Desserts</option>
                            <option value="Drinks">Drinks</option>
                        </select>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="unitePrice" className="form-label">Price</label>
                        <input type="number" className="form-control" value={unitePrice} onChange={(e) => { setUnitePrice(e.target.value) }}></input>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="status" className="form-label">Status</label>
                        <select name="status" className="form-select" value={status} onChange={(e) => { setStatus(e.target.value) }}>
                            <option selected>Select its status</option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                    </div>

                    {/* <div className="mb-3">
                        <label htmlFor="telefono" className="form-label">Teléfono</label>
                        <input type="text" className="form-control" value={telefono} onChange={(e) => { setTelefono(e.target.value) }}></input>
                    </div> */}

                    <button onClick={addProduct} className="btn btn-primary">Create Product</button>

                    <button onClick={addProduct} className="btn btn-secondary">Cancel</button>

                </div>
            </div>

        </div>
    )
}


export default CreateProduct