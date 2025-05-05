import React, { useState } from "react";
import ShoppingForm from "../ShoppingForm/ShoppingForm";
import "./ShoppingItem.css";
import "../Bootswatch-CSS/Superhero.css";

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
        <li className="card text-white bg-primary mb-3 shopping-item-li">
            { isEdit ? EditJsx : <div className="card-header"> {ReadOnlyJsx} </div> }
            {isEdit ? '' : <button className="btn btn-danger" onClick={handleDelete} >Delete</button>}
            <button className={isEdit? "btn btn-warning" : "btn btn-success"} onClick={handleEdit}>{ isEdit ? 'Cancel' : 'Edit' }</button>
        </li>
    );
}