import './App.css';
import React, { useState, useEffect } from 'react';

import ShoppingForm from './Components/ShoppingForm/ShoppingForm';
import ShoppingList from './Components/ShoppingList/ShoppingList';

export default function App() {
  const [shoppingList, setShoppingList] = useState([]);

  const loadData = () => {
    fetch("https://node-shopping-list-o90d.onrender.com/api/list")
      .then(x=> x.json())
      .then(response => {
        setShoppingList(response);
      });
  }

  useEffect(loadData, []);

  return (
    <div className="App">
      <header>
        <h1>Shopping List App</h1>
      </header>

      <main>
        <ShoppingForm />
        <ShoppingList />
        <p>{JSON.stringify(shoppingList)}</p>
      </main>

    </div>
  );
}