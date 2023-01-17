import './CreateProduct.css';
import Swal from 'sweetalert2';
import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
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
            unitePrice: parseFloat(unitePrice),
            status: status,
            idproduct: uniquid()
        }
        console.log(product)

        //
        axios.post('/api/product.model/createproduct', product)
            .then(res => {
                if (res.data.name === 'ValidationError') {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops....',
                        confirmButtonColor: '#264653',
                        text: 'Please complete all the fields',
                    })
                }
                else {
                    Swal.fire({
                        icon: 'success',
                        title: 'Product created successfully',
                        confirmButtonColor: '#264653',
                        text: name,
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.reload();
                        }
                    })
                }
            })
            .then(err => { console.log(err) })
    }



    return (
        <div>
            <div className='container'>
                <h2 className='createProduct__title title'>Create Product</h2>
                <div className="row">
                    <div className="col-sm-6 offset-3">
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input autoFocus type="text" className="form-control" value={name} onChange={(e) => { setName(e.target.value) }}></input>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="category" className="form-label">Category</label>
                            <select required name="category" className="form-select" value={category} onChange={(e) => { setCategory(e.target.value) }}>
                                <option value="">Select a Category</option>
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
                            <select name="status" defaultValue="Active" className="form-select" value={status} onChange={(e) => { setStatus(e.target.value) }}>
                                <option value="">Select a Status</option>
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                        </div>


                        <button onClick={addProduct} className="btn m-3 btn-primary">Create Product</button>

                        <Link to='/products' className="m-3 btn btn-secondary">Cancel</Link>

                    </div>
                </div>
            </div>



        </div>
    )
}


export default CreateProduct