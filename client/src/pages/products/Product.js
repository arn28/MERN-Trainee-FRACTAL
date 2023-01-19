
import React from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';


function Product({ product, index }) {


    const navegate = useNavigate()

    //Function to delete product
    function delProduct(idproduct) {
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
                axios.post('https://mern-trainee-fractal-backend.up.railway.app/api/product.model/delproduct', { idproduct: idproduct }).then(res => {
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

    return (
        <tr>
            <th scope="row">{index + 1}</th>
            <td>{product.name}</td>
            <td>{product.category}</td>
            <td>${product.unitePrice}</td>
            <td>{product.status}</td>
            <td>
                <Link to={`/editproduct/${product.idproduct}`} className='btn btn-edit'><i className="fa-solid fa-pen-to-square"></i></Link>
                <button onClick={() => { delProduct(product.idproduct) }} className='btn btn-delete fa-solid fa-trash'><i className=""></i></button>
            </td>
        </tr>
    )
}


export default Product