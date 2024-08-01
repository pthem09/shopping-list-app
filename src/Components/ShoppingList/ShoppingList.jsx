import React from 'react';
import ShoppingItem from './ShoppingItem';

export default function ShoppingList({ items, deleteItem, updateItem }) {
    
    const ItemsJsx = items.map(listItem => 
        <ShoppingItem 
            key={listItem.id}
            id={listItem.id}
            itemName={listItem.item}
            quantity={listItem.quantity}
            deleteItem={deleteItem}
            updateItem={updateItem}
        />
    );

    return (
        <div className="shopping-list-container">
            <ul>{ItemsJsx}</ul>
        </div>
    ); 
}