import { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateOrder = ({ match }) => {
    const [orderNumber, setOrderNumber] = useState('');
    const [status, setStatus] = useState('');
    const [orderItems, setOrderItems] = useState([]);

    const handleChange = (event) => {
        switch (event.target.name) {
            case 'orderNumber':
                setOrderNumber(event.target.value);
                break;
            case 'status':
                setStatus(event.target.value);
                break;
            case 'orderItems':
                setOrderItems(event.target.value);
                break;
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const orderNum = match.params.orderNumber;
            const response = await axios.put(`/updateOrder/${orderNum}`, { orderNumber, status, orderItems });
            console.log(response.data);
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="orderNumber" onChange={handleChange} placeholder="Order Number" />
            <select name="status" onChange={handleChange}>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
                <option value="Rejected">Rejected</option>
            </select>
            <input type="text" name="orderItems" onChange={handleChange} placeholder="Order Items" />
            <button type="submit">Update Order</button>
        </form>
    );
}

export default UpdateOrder;
