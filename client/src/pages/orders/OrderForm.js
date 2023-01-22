import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrderForm = ({ onSubmit, order = null }) => {
    const [formOrder, setFormOrder] = useState({
        orderNumber: '',
        status: 'Pending',
        date: '',
        customer: '',
        orderItems: []
    });
    const [products, setProducts] = useState([]);

    useEffect(() => {
        if (!order) return;
        setFormOrder(order);
    }, [order]);

    useEffect(() => {
        axios
            .get('https://mern-trainee-fractal-backend.up.railway.app/api/product/getproducts')
            .then(res => setProducts(res.data))
            .catch(err => console.log(err));
    }, []);


    const handleChange = e => {
        setFormOrder({ ...formOrder, [e.target.name]: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        onSubmit(formOrder);
    };

    const handleAddItem = () => {
        setFormOrder({
            ...formOrder,
            orderItems: [...formOrder.orderItems, { product: '', quantity: 0 }]
        });
    };

    const handleItemChange = (e, index) => {
        const orderItems = [...formOrder.orderItems];
        orderItems[index][e.target.name] = e.target.value;
        setFormOrder({ ...formOrder, orderItems });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Order Number:
                <input
                    type="text"
                    name="orderNumber"
                    value={formOrder.orderNumber}
                    onChange={handleChange}
                    required
                />
            </label>
            <br />
            <label>
                Status:
                <select name="status" value={formOrder.status} onChange={handleChange}>
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                    <option value="Rejected">Rejected</option>
                </select>
            </label>
            <br />
            <label>
                Date:
                <input type="date" name="date" value={formOrder.date} onChange={handleChange} />
            </label>
            <br />
            <label>
                Customer:
                <input
                    type="text"
                    name="customer"
                    value={formOrder.customer}
                    onChange={handleChange}
                    required
                />
            </label>
            <br />
            <label>
                Total Taxes:
                <input
                    type="number"
                    name="totalTaxes"
                    value={formOrder.totalTaxes}
                    onChange={handleChange}
                    required
                />
            </label>
            <br />
            <label>
                Total Amount:
                <input
                    type="number"
                    name="totalAmount"
                    value={formOrder.totalAmount}
                    onChange={handleChange}
                    required
                />
            </label>
            <br />
            <h4>Order Items:</h4>
            {formOrder.orderItems.map((item, index) => (
                <div key={index}>
                    <label>
                        Product:
                        <select
                            name="product"
                            value={item.product}
                            onChange={e => handleItemChange(e, index)}
                        >
                            <option value="">Select a product</option>
                            {products.map(product => (
                                <option key={product._id} value={product._id}>
                                    {product.name}
                                </option>
                            ))}
                        </select>
                    </label>
                    <br />
                    <label>
                        Quantity:
                        <input

                            type="number"
                            name="quantity"
                            value={item.quantity}
                            onChange={e => handleItemChange(e, index)}
                            required
                        />
                    </label>
                    <br />
                </div>
            ))}
            <button type="button" onClick={handleAddItem}>
                Add Item
            </button>
            <br />
            <br />
            <button type="submit">Save</button>
        </form>
    );
};

export default OrderForm;