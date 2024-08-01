import React, { useState } from "react";
import "./ShoppingForm.css";

export default function ShoppingForm({
        submitItem,
        defaultItemName = '',
        defaultQuantity = '',
        submitButtonText = 'Add'
}) {
    const [item, setItem] = useState(defaultItemName);
    const [quantity, setQuantity] = useState(defaultQuantity);

    function handleSubmit(event) {
        event.preventDefault();
        submitItem(item, quantity);
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
            <input className="shopping-list-field"
                type="text"
                required
                id="item"
                name="item"
                value={item}
                onChange={handleItemChange}/>
            <label htmlFor="quantity">Quantity</label>
            <input className="shopping-list-field"
                type="number"
                required
                id="quantity"
                name="quantity"
                value={quantity}
                min="0"
                onChange={handleQuantityChange}/>
            <button type="Submit">{submitButtonText}</button>
        </form>
    );
}