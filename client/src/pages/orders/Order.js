import React from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';


function Order({ order, index }) {


    const navegate = useNavigate()

    //Function to delete order
    function delOrder(orderNumber) {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#264653",
            cancelButtonColor: "red",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.post('https://mern-trainee-fractal-backend.up.railway.app/api/order/delorder', { orderNumber: orderNumber }).then(res => {
                    console.log(res.data)
                    // alert(res.data)
                    Swal.fire({
                        icon: "success",
                        title: "Deleted!",
                        confirmButtonColor: "#264653",
                        text: "Your product has been deleted."
                    }).then((result) => {
                        if (result.isConfirmed) {
                            navegate(0);
                        }
                    });
                }).catch(err => {
                    console.log(err)
                })

            }
        });


    }

    function formatDate(dateRaw) {
        var date = new Date(dateRaw);
        var formattedDate = date.getUTCDate().toString().padStart(2, '0')  + '-' + (date.getUTCMonth() + 1).toString().padStart(2, '0')  + '-' + date.getUTCFullYear();
        return (formattedDate);
    }
    // console.log(formatDate(order.date));

    return (
        <tr>
            <th scope="row">{index + 1}</th>
            <td>{order.customer}</td>
            <td>{order.status}</td>
            <td>{formatDate(order.date)}</td>
            <td>{order.totalAmount ? `$${order.totalAmount.toFixed(2)}` : ''}</td>
            <td>
                <Link to={`/productdetail/${order.orderNumber}`} className='btn btn-edit'><i class="fa-solid fa-circle-info"></i></Link>
                <Link to={`/editproduct/${order.orderNumber}`} className='btn btn-edit'><i className="fa-solid fa-pen-to-square"></i></Link>
                <button onClick={() => { delOrder(order.orderNumber) }} className='btn btn-delete fa-solid fa-trash'><i className=""></i></button>
            </td>
        </tr>
    )
}


export default Order