import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'


function EditProduct() {

    const params = useParams()

    //Hooks
    const [name, setName] = useState('')
    const [category, setCategory] = useState('')
    const [unitePrice, setUnitePrice] = useState('')
    const [status, setStatus] = useState('')


    //use to go back to index
    const navegate = useNavigate()

    //get date from a product
    useEffect(() => {
        axios.post('https://mern-trainee-fractal-backend.up.railway.app/api/product.model/getproductdata', { idproduct: params.idproduct }).then(res => {
            console.log(res.data[0])
            const dataproduct = res.data[0]
            setName(dataproduct.name)
            setCategory(dataproduct.category)
            setUnitePrice(dataproduct.unitePrice)
            setStatus(dataproduct.status)
        })
    }, [])

    //update product
    function editProduct() {

        if (name === '' ||
            category === '' ||
            unitePrice === '' ||
            status === '') {
            Swal.fire({
                icon: 'error',
                title: 'Oops....',
                confirmButtonColor: '#264653',
                text: 'Please complete all the fields',
            })
        } else {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#264653",
                cancelButtonColor: "red",
                confirmButtonText: "Yes, update it!"
            }).then((result) => {
                if (result.isConfirmed) {

                    //New objet to update the product
                    var updateproduct = {
                        name: name,
                        category: category,
                        unitePrice: parseFloat(unitePrice),
                        status: status,
                        idproduct: params.idproduct
                    }

                    //Make request using axios
                    axios.post('https://mern-trainee-fractal-backend.up.railway.app/api/product.model/updateproduct', updateproduct).then(res => {
                        console.log(res.data)
                        Swal.fire({
                            icon: "success",
                            title: "Your product has been modified successfully.",
                            confirmButtonColor: "#264653",
                            text: ""
                        }).then((result) => {
                            if (result.isConfirmed) {
                                navegate('/products');
                            }
                        });
                    }).catch(err => { console.log(err) })
                }
            });
        }
    }

    return (
        <div className='container'>
            <h2 className='products__title title m-0 mt-4 mb-4'>Edit Product: {name}</h2>
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


                    <button onClick={editProduct} className="btn m-3 btn-primary">Save Product</button>

                    <Link to='/products' className="m-3 btn btn-secondary">Cancel</Link>

                </div>
            </div>
        </div>
    )
}


export default EditProduct