import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Order from './Order'

function OrdersList() {

    const [dataorders, setdataorders] = useState([])

    useEffect(() => {
        axios.get('https://mern-trainee-fractal-backend.up.railway.app/api/order/getorders').then(res => {
            // console.log(res.data)
            setdataorders(res.data)

        }).catch(err => {
            console.log(err)
        })

    }, [])

    // Mapping orderslist in object order
    const ordertlist = dataorders.map((order, index) => {
        return (


            <Order key={index.toString()} order={order} index={index} />

        )
    })

    return (
        <div>
            <div className="container">
                <h2 className='products__title title m-0 mt-4'>Orders</h2>
                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                    <Link to='/createorder' className="btn m-4 btn-primary ">Create an order</Link>
                </div>
            </div>
            <div className="container">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">N°</th>
                            <th scope="col">Consumer</th>
                            <th scope="col">Status</th>
                            <th scope="col">Date</th>
                            <th scope="col">Total</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ordertlist}
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default OrdersList