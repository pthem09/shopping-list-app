import React from "react";

function ShoppingItem({ id, itemName, quantity, deleteItem }) {
    function handleDelete(event) {
        event.preventDefault();
        deleteItem(id);
    }

    return (
        <li>
            {itemName} ({quantity}) 
            <button onClick={handleDelete}>Delete</button></li>
    );
}

export default function ShoppingList({ items, deleteItem }) {
    
    const ItemsJsx = items.map(listItem => 
        <ShoppingItem 
            key={listItem.id}
            id={listItem.id}
            itemName={listItem.item}
            quantity={listItem.quantity}
            deleteItem={deleteItem}
        />
    );

    return (
        <ul>{ItemsJsx}</ul>
    );
}