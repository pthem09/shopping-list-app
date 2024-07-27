import './App.css';
import React, { useState, useEffect } from 'react';

import ShoppingForm from './Components/ShoppingForm/ShoppingForm';
import ShoppingList from './Components/ShoppingList/ShoppingList';

export default function App() {
  const [shoppingList, setShoppingList] = useState([]);

  const API_ROOT = "https://hn7jn8-8080.csb.app";

  const loadData = () => {
    fetch(`${API_ROOT}/api/list`)
      .then(x=> x.json())
      .then(response => {
        setShoppingList(response);
      });
  }

  useEffect(loadData, []);

  const addItem = (item, quantity) => {
    fetch(`${API_ROOT}/api/list/new`, {
      method: 'POST',
      body: JSON.stringify({
        item,
        quantity
      }),
      headers: {
        'Content-type': 'application/json; charset=utf-8'
      },
      mode: 'cors'
    })
      .then((x) => x.json())
      .then(loadData);
  };

  return (
    <div className="App">
      <header>
        <h1>Shopping List App</h1>
      </header>

      <main>
        <ShoppingForm addItem={addItem} />
        <ShoppingList items={shoppingList} />
      </main>

    </div>
  );
}