import React, { useState } from "react";

export default function ShoppingForm({ addItem }) {
    const [item, setItem] = useState('');
    const [quantity, setQuantity] = useState('');

    function handleSubmit(event) {
        event.preventDefault();
        addItem(item, quantity);
        setItem('');
        setQuantity('');
    }

    function handleItemChange(event) {
        setItem(event.target.value);
    }

    function handleQuantityChange(event) {
        setQuantity(event.target.value);
    }

    return (
        <form action="#" method="POST" onSubmit={handleSubmit}>
            <label htmlFor="item">Item</label>
            <input
                type="text"
                required
                id="item"
                name="item"
                value={item}
                onChange={handleItemChange}/>
            <label htmlFor="quantity">Quantity</label>
            <input
                type="number"
                required
                id="quantity"
                name="quantity"
                value={quantity}
                min="0"
                onChange={handleQuantityChange}/>
            <button type="Submit">Add</button>
        </form>
    );
}