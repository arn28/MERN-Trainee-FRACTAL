import Swal from 'sweetalert2';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function OrderDetail() {

    const params = useParams()

    const navegate = useNavigate()

    //Hooks
    const [updateOrder, setUpdateOrder] = useState({});
    const [dataproducts, setdataproduct] = useState([])


    //get data from a order
    useEffect(() => {
        axios.post('https://mern-trainee-fractal-backend.up.railway.app/api/order/getorderdata', { orderNumber: params.orderNumber }).then(res => {

            const dataorder = res.data[0]
            setUpdateOrder(dataorder);
        })
    }, [])
    console.log(updateOrder)


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

    //chage status
    function completeOrder(){
        updateStatusOrder("Completed")

    }

    function rejectOrder() {
        updateStatusOrder("Rejected")
    }


    async function updateStatusOrder(newstatus) {

        Swal.fire({
            title: "Are you sure?",
            text: "Do you want to change the status to "+ newstatus+"?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#264653",
            cancelButtonColor: "red",
            confirmButtonText: "Yes, update it!"
        }).then((result) => {
            if (result.isConfirmed) {

                var orderupdate = updateOrder;
                orderupdate.status = newstatus;
                console.log(orderupdate)

                axios.post('https://mern-trainee-fractal-backend.up.railway.app/api/order/updateorder', orderupdate).then(res => {
                    console.log(res.data)
                    Swal.fire({
                        icon: "success",
                        title: "Your Order status has been modified successfully.",
                        confirmButtonColor: "#264653",
                        text: ""
                    }).then((result) => {
                        if (result.isConfirmed) {
                            navegate(0);
                        }
                    });
                }).catch(err => { console.log(err) })
            }
        });
    }

    const formatDate = (dateRaw) => {
        var date = new Date(dateRaw);
        var formattedDate = date.getUTCFullYear() + '-' + (date.getUTCMonth() + 1).toString().padStart(2, '0') + '-' + date.getUTCDate().toString().padStart(2, '0');
        return (formattedDate);
    }


    return (

        <div className='container'>
            <div className='text-end'>
                <h2 className='createProduct__title title'>Edit Order N⁰ {updateOrder.orderNumber} </h2>
                <Link to='/orders' className="ps-5 pe-5 btn btn-secondary">Back</Link>
            </div>
            <div className="mb-2 mt-4 row" id='create-order__container'>
                <div className="col-6 offset-auto">
                    <table className="table table-borderless">
                        <tbody>
                            <tr>
                                <th className='text-start' scope="col">Consumer</th>
                                <td className=' text-start '>{updateOrder.customer}</td>
                            </tr>
                            <tr>
                                <th className='text-start' scope="row">Status</th>
                                <td className='text-start  '>{updateOrder.status}</td>
                            </tr>
                            <tr>
                                <th className="text-start" scope="row">Date</th>
                                <td className=' text-start '>{formatDate(updateOrder.date)}</td>
                            </tr>
                        </tbody>
                    </table>

                </div>

                <div className='col-1'></div>
                <div className='col-5'>
                    <table className="table table-borderless">
                        <tbody>
                            <tr>
                                <th className='h5 text-start' scope="col">Subtotal</th>
                                <td className='fs-5 text-end'>${(updateOrder.totalAmount - updateOrder.totalTaxes).toFixed(2)}</td>
                            </tr>
                            <tr>
                                <th className="h5 text-start" scope="row">Taxes</th>
                                <td></td>

                            </tr>
                            <tr>
                                <th className='text-start ps-4' scope="row">Total City Tax</th>
                                <td className='text-end'>${updateOrder.cityTax ? (updateOrder.cityTax).toFixed(2) : ''}</td>
                            </tr>
                            <tr>
                                <th className='text-start ps-4' scope="row">Total County Tax</th>
                                <td className='text-end'>${updateOrder.cityTax ? (updateOrder.countyTax).toFixed(2) : ''}</td>
                            </tr>
                            <tr>
                                <th className='text-start ps-4' scope="row">Total State Tax</th>
                                <td className='text-end'>${updateOrder.cityTax ? (updateOrder.stateTax).toFixed(2) : ''}</td>
                            </tr>
                            <tr>
                                <th className='text-start ps-4' scope="row">Total Federal Tax</th>
                                <td className='text-end'>${updateOrder.cityTax ? (updateOrder.federalTax).toFixed(2) : ''}</td>
                            </tr>
                            <tr>
                                <th className="h5 text-start" scope="row">Total Taxes</th>
                                <td className='fs-5 text-end'>${updateOrder.cityTax ? (updateOrder.totalTaxes).toFixed(2) : ''}</td>
                            </tr>
                            <tr>
                                <th className="h5 text-start" scope="row">Total</th>
                                <td className='fs-5 text-end'>${updateOrder.cityTax ? (updateOrder.totalAmount).toFixed(2) : ''}</td>
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
                            <th scope="col">N⁰</th>
                            <th scope="col">Name</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Unit Price</th>
                            <th scope="col">Cost</th>
                        </tr>
                    </thead>
                    <tbody>
                        {updateOrder.orderItems ? updateOrder.orderItems.map((item, index) => (
                            <tr key={index} >
                                <td scope="col">{index + 1}</td>

                                <td className='w-50 text-start' >{dataproducts.find(i => i._id === item.product) ? `${dataproducts.find(i => i._id === item.product).name}` : ''}</td>
                                <td className='' >{item.quantity}</td>
                                <td className='w-25'>${dataproducts.find(i => i._id === item.product) ? `${dataproducts.find(i => i._id === item.product).unitPrice.toFixed(2)}` : ''}</td>
                                <td className='w-25'>${dataproducts.find(i => i._id === item.product) ? `${(dataproducts.find(i => i._id === item.product).unitPrice * item.quantity).toFixed(2)}` : ''}</td>

                            </tr>
                        )) : console.log('')}

                    </tbody>
                </table>
            </div>


            <div className='text-end'>
                <button onClick={completeOrder} className="btn m-3 btn-success">Complete Order</button>
                <button onClick={rejectOrder} className="btn m-3 btn-danger">Reject Order</button>
            </div>



        </div>



    )

}


export default OrderDetail