
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'


function Product({product, index}) {
    return (
        <tr>
            <th scope="row">{index+1}</th>
            <td>{product.name}</td>
            <td>{product.category}</td>
            <td>${product.unitePrice}</td>
            <td>{product.status}</td>
            <td>
                <Link to='/editproduct' className='btn btn-edit'><i class="fa-solid fa-pen-to-square"></i></Link>
                <button className='btn btn-delete'><i class="fa-solid fa-trash"></i></button>
            </td>
        </tr>
    )
}


export default Product