import './CreateOrder.css';
import Swal from 'sweetalert2';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import uniquid from 'uniqid';
import axios from 'axios';

function CreateOrder() {

    const navegate = useNavigate()

    // Having the current date as default
    var dateRaw = new Date();
    var formattedDate = dateRaw.getUTCFullYear() + '-' + (dateRaw.getUTCMonth() + 1).toString().padStart(2, '0') + '-' + dateRaw.getUTCDate().toString().padStart(2, '0');

    //Hooks
    const [formOrder, setFormOrder] = useState({
        orderNumber: uniquid(),
        status: 'Pending',
        date: formattedDate,
        customer: '',
        orderItems: []
    });

    const [dataproducts, setdataproduct] = useState([])
    const [subtotal, setSubtotal] = useState()

    const [taxes, setTaxes] = useState({
        cityTax: 0,
        countyTax: 0,
        stateTax: 0,
        federalTax: 0,
        totalTaxes: 0
    });

    //Get active products to add the order
    useEffect(() => {
        axios
            .get('https://mern-trainee-fractal-backend.up.railway.app/api/product/getproducts')
            .then(res => {
                setdataproduct(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    //pre create
    const preCreateOrder = e => {
        setFormOrder({ ...formOrder, [e.target.name]: e.target.value });
        // console.log(formOrder)
    }

    //Create Order
    function addOrder() {

        axios.post('https://mern-trainee-fractal-backend.up.railway.app/api/order/createorder', formOrder)
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
                        text: 'order N⁰: ' + formOrder.orderNumber,
                    }).then((result) => {
                        if (result.isConfirmed) {
                            navegate('/orders');
                        }
                    })
                }
            })
            .then(err => { console.log(err) })
    }

    //pre Add Item
    const preAddItem = (e, index) => {

        const orderItems = [...formOrder.orderItems];
        orderItems[index][e.target.name] = e.target.value;
        setFormOrder({ ...formOrder, orderItems });
        getSubtotal()
    }

    //Add Item
    const AddItem = () => {
        setFormOrder({
            ...formOrder,
            orderItems: [...formOrder.orderItems, { product: '', quantity: 0 }]
        });
    }

    //Delete and order
    function removeItem(index) {
        formOrder.orderItems.splice(index, 1);
        setFormOrder({ ...formOrder });
    }

    //getting subtotal
    const getSubtotal = () => {
        let subtotalSum = 0;
        let cityTax = 0;
        let countyTax = 0;
        let stateTax = 0;
        let federalTax = 0;
        let totalTaxes = 0;

        formOrder.orderItems.map((item, index) => {
            if (item.product) {
                let productPrice = dataproducts.find(i => i._id === formOrder.orderItems[index].product).unitPrice * item.quantity;
                subtotalSum = subtotalSum + productPrice;
            }
            return subtotalSum;
        })

        cityTax = subtotalSum * 0.10;
        countyTax = (subtotalSum + cityTax) * 0.05;
        stateTax = (subtotalSum + cityTax + countyTax) * 0.08;
        federalTax = (subtotalSum + cityTax + countyTax + stateTax) * 0.02;
        totalTaxes = cityTax + countyTax + stateTax + federalTax;

        setSubtotal(subtotalSum);
        setTaxes({
            cityTax: cityTax,
            countyTax: countyTax,
            stateTax: stateTax,
            federalTax: federalTax,
            totalTaxes: totalTaxes
        });
    }


    return (

        <div className='container'>
            <h2 className='createProduct__title title'>Create Order </h2>
            <div className="mt-5 mb-2 row" id='create-order__container'>
                <div className="col-6 offset-auto">
                    <div className="mb-3">
                        <label htmlFor="customer" className="form-label" >Consumer</label>
                        <input autoFocus id='customer' type="text" className="form-control" name='customer' value={formOrder.customer} onChange={preCreateOrder}></input>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="date" className="form-label">Date</label>
                        <input id='date' type="date" className="form-control" name='date' value={formOrder.date} onChange={preCreateOrder}></input>
                    </div>

                </div>

                <div className='col-1'></div>
                <div className='col-5'>
                    <table className="table table-borderless">
                        <tbody>
                            <tr>
                                <th className='h5 text-start' scope="col">Subtotal</th>
                                <td className='fs-5 text-end'>${subtotal ? `${subtotal.toFixed(2)}` : ''}</td>
                            </tr>
                            <tr>
                                <th className="h5 text-start" scope="row">Taxes</th>
                                <td></td>

                            </tr>
                            <tr>
                                <th className='text-start ps-4' scope="row">Total City Tax</th>
                                <td className='text-end'>${subtotal ? `${(taxes.cityTax).toFixed(2)}` : ''}</td>
                            </tr>
                            <tr>
                                <th className='text-start ps-4' scope="row">Total County Tax</th>
                                <td className='text-end'>${subtotal ? `${(taxes.countyTax).toFixed(2)}` : ''}</td>
                            </tr>
                            <tr>
                                <th className='text-start ps-4' scope="row">Total State Tax</th>
                                <td className='text-end'>${subtotal ? `${(taxes.stateTax).toFixed(2)}` : ''}</td>
                            </tr>
                            <tr>
                                <th className='text-start ps-4' scope="row">Total Federal Tax</th>
                                <td className='text-end'>${subtotal ? `${(taxes.federalTax).toFixed(2)}` : ''}</td>
                            </tr>
                            <tr>
                                <th className="h5 text-start" scope="row">Total Taxes</th>
                                <td className='fs-5 text-end'>${subtotal ? `${(taxes.totalTaxes).toFixed(2)}` : ''}</td>
                            </tr>
                            <tr>
                                <th className="h5 text-start" scope="row">Total</th>
                                <td className='fs-5 text-end'>${subtotal ? `${(taxes.totalTaxes + subtotal).toFixed(2)}` : ''}</td>
                            </tr>
                        </tbody>

                    </table>

                </div>
            </div>
            {/* Active products list */}
            <hr></hr>
            <h3 className='text-start mt-5'>Products:</h3>
            <div className="container mt-3 mb-5">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Unit Price</th>
                            <th scope="col">Cost</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {formOrder.orderItems.map((item, index) => (
                            <tr key={index} >
                                <td className='w-50' >
                                    <select className="form-select" name="product" value={item.product} onChange={e => preAddItem(e, index)}>
                                        <option value="">Select a product</option>

                                        {dataproducts.map(product => {
                                            if (product.status === 'Active') {
                                                return (
                                                    <option key={product._id} value={product._id}>
                                                        {product.name}
                                                    </option>
                                                )
                                            }
                                            return product._id
                                        })}
                                    </select>
                                </td>
                                <td className='' >
                                    <input type="number"
                                        min={1}
                                        name="quantity"
                                        className="form-control col-7"
                                        value={item.quantity}
                                        onChange={e => preAddItem(e, index)}
                                        required>
                                    </input>
                                </td>
                                <td className='w-25'>{formOrder.orderItems[index].product ?
                                    `$${(dataproducts.find(i => i._id === formOrder.orderItems[index].product).unitPrice).toFixed(2)}`
                                    : ''}
                                </td>
                                <td className='w-25'>{formOrder.orderItems[index].product ?
                                    `$${(dataproducts.find(i => i._id === formOrder.orderItems[index].product).unitPrice * item.quantity).toFixed(2)}`
                                    : ''}</td>
                                <td className=''>
                                    <button onClick={() => removeItem(index)} className='btn btn-delete fa-solid fa-trash'><i className=""></i></button>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>

            <div className='text-end'>
                <button className='btn btn-success m-3' onClick={AddItem}>Add item</button>
            </div>
            <div className='text-end'>
                <button onClick={addOrder} className="btn m-3 btn-primary">Generate Order</button>
                <Link to='/orders' className="m-3 btn btn-secondary">Cancel</Link>
            </div>



        </div>

    )
}


export default CreateOrder