import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'


function EditOrder() {

    const params = useParams()

    //Hooks
    const [customer, setCustomer] = useState('')
    const [status, setStatus] = useState('')
    const [date, setDate] = useState('')
    const [items, setItems] = useState('')


    //use to go back to index
    const navegate = useNavigate()

    //get date from a product
    useEffect(() => {
        axios.post('https://mern-trainee-fractal-backend.up.railway.app/api/order/getproductdata', { orderNumber: params.orderNumber }).then(res => {
            console.log(res.data[0])
            const dataorder = res.data[0]
            setCustomer(dataorder.customer)
            setStatus(dataorder.status)
            setDate(dataorder.date)
            setItems(dataorder.items)
        })
    }, [])

    //update product
    function editOrder() {

        if (customer === '' ||
        status === '' ||
        items === '') {
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
                    var updateorder = {
                        customer: customer,
                        status: status,
                        date: date,
                        items: items,
                        orderNumber: params.orderNumber
                    }

                    //Make request using axios
                    axios.post('https://mern-trainee-fractal-backend.up.railway.app/api/order/updateorder', updateorder).then(res => {
                        console.log(res.data)
                        Swal.fire({
                            icon: "success",
                            title: "Your product has been modified successfully.",
                            confirmButtonColor: "#264653",
                            text: ""
                        }).then((result) => {
                            if (result.isConfirmed) {
                                navegate('/orders');
                            }
                        });
                    }).catch(err => { console.log(err) })
                }
            });
        }
    }

    return (
        // <div className='container'>
        //     <h2 className='products__title title m-0 mt-4 mb-4'>Edit Order N⁰: {params.orderNumber}</h2>
        //     <div className="row">
        //         <div className="col-sm-6 offset-3">
        //             <div className="mb-3">
        //                 <label htmlFor="name" className="form-label">Name</label>
        //                 <input autoFocus type="text" className="form-control" value={name} onChange={(e) => { setName(e.target.value) }}></input>
        //             </div>

        //             <div className="mb-3">
        //                 <label htmlFor="category" className="form-label">Category</label>
        //                 <select required name="category" className="form-select" value={category} onChange={(e) => { setCategory(e.target.value) }}>
        //                     <option value="">Select a Category</option>
        //                     <option value="Cookies">Cookies</option>
        //                     <option value="Candies">Candies</option>
        //                     <option value="Cakes">Cakes</option>
        //                     <option value="Desserts">Desserts</option>
        //                     <option value="Drinks">Drinks</option>
        //                 </select>
        //             </div>

        //             <div className="mb-3">
        //                 <label htmlFor="unitPrice" className="form-label">Price</label>
        //                 <input type="number" className="form-control" value={unitPrice} onChange={(e) => { setunitPrice(e.target.value) }}></input>
        //             </div>

        //             <div className="mb-3">
        //                 <label htmlFor="status" className="form-label">Status</label>
        //                 <select name="status" defaultValue="Active" className="form-select" value={status} onChange={(e) => { setStatus(e.target.value) }}>
        //                     <option value="">Select a Status</option>
        //                     <option value="Active">Active</option>
        //                     <option value="Inactive">Inactive</option>
        //                 </select>
        //             </div>


        //             <button onClick={editOrder} className="btn m-3 btn-primary">Save Product</button>

        //             <Link to='/products' className="m-3 btn btn-secondary">Cancel</Link>

        //         </div>
        //     </div>
        // </div>
        <h2>Edit order</h2>
    )
}


export default EditOrder