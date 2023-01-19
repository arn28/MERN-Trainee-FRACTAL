// import './CreateProduct.css';
import Swal from 'sweetalert2';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import uniquid from 'uniqid';
import axios from 'axios';
import ProductsList from '../products/ProductsList';

function CreateOrder() {

    const navegate = useNavigate()

    //Hooks
    const [customer, setCustomer] = useState('')
    const [date, setDate] = useState('')
    const [items, setItems] = useState('')

    //Having the current date as default
    useEffect(() => {
        var dateRaw = new Date();
        var formattedDate = dateRaw.getUTCFullYear() + '-' + (dateRaw.getUTCMonth() + 1).toString().padStart(2, '0') + '-' + dateRaw.getUTCDate().toString().padStart(2, '0');
        setDate(formattedDate)
    }, [])
    
    function addProduct() {
        var order = {
            customer: customer,
            date: date,
            items: items,
            orderNumber: uniquid()
        }
        console.log(order)

        //
        axios.post('/api/order/createorder', order)
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
                        text: 'order N⁰: ' + order.orderNumber,
                    }).then((result) => {
                        if (result.isConfirmed) {
                            navegate('/orders');
                        }
                    })
                }
            })
            .then(err => { console.log(err) })
    }
    



    return (
        <div>
            <div className='container'>
                <h2 className='createProduct__title title'>Create Order </h2>
                <div className="row">
                    <div className="col-sm-6 offset-3">
                        <div className="mb-3">
                            <label htmlFor="customer" className="form-label" >Consumer</label>
                            <input autoFocus id='customer' type="text" className="form-control" value={customer} onChange={(e) => { setCustomer(e.target.value) }}></input>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="date" className="form-label">Date</label>
                            <input id='date' type="date" className="form-control" value={date} onChange={(e) => { setDate(e.target.value) }}></input>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="items" className="form-label">Items</label>
                            <input id='items' type="number" className="form-control" value={items} onChange={(e) => { setItems(e.target.value) }}></input>
                        </div>


                        <button onClick={addProduct} className="btn m-3 btn-primary">Generate Order</button>

                        <Link to='/orders' className="m-3 btn btn-secondary">Cancel</Link>

                    </div>
                </div>
            </div>
        </div>
    )
}


export default CreateOrder