import './App.css';
import React, { useState, useEffect } from 'react';

import ShoppingForm from './Components/ShoppingForm/ShoppingForm';
import ShoppingList from './Components/ShoppingList/ShoppingList';

export default function App() {
  const [shoppingList, setShoppingList] = useState([]);

  const loadData = () => {
    fetch("https://hn7jn8-8080.csb.app/api/list")
      .then(x=> x.json())
      .then(response => {
        setShoppingList(response);
      });
  }

  return (
    <div className="App">
      <header>
        <h1>Shopping List App</h1>
      </header>

      <main>
        <ShoppingForm />
        <ShoppingList />
        <p>JSON.stringify(shoppingList)</p>
      </main>

    </div>
  );
}