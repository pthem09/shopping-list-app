import React, { useState } from "react";
import ShoppingForm from "../ShoppingForm/ShoppingForm";
import "./ShoppingItem.css";

export default function ShoppingItem({ id, itemName, quantity, deleteItem, updateItem }) {
    
    const [isEdit, setEdit] = useState(false);

    function handleDelete(event) {
        event.preventDefault();
        deleteItem(id);
    }

    function handleEdit(event) {
        event.preventDefault();
        setEdit(oldEditBoolean => !oldEditBoolean);
    }

    function handleUpdate(itemName, quantity) {
        updateItem(id, itemName, quantity);
        setEdit(false);
    }

    const ReadOnlyJsx = <span>{itemName} ({quantity}) </span>
    const EditJsx = (
        <ShoppingForm
            defaultItemName={itemName}
            defaultQuantity={quantity}
            submitItem={handleUpdate}
            submitButtonText='Update'/>
    )

    return (
        <li className="shopping-item-li">
            { isEdit ? EditJsx : ReadOnlyJsx }
            {isEdit ? '' : <button className="shopping-delete" onClick={handleDelete} >Delete</button>}
            <button className={isEdit? "shopping-cancel" : "shopping-edit"} onClick={handleEdit}>{ isEdit ? 'Cancel' : 'Edit' }</button>
        </li>
    );
}