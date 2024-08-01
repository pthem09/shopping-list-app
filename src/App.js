import './App.css';
import React, { useState, useEffect } from 'react';

import ShoppingForm from './Components/ShoppingForm/ShoppingForm';
import ShoppingList from './Components/ShoppingList/ShoppingList';
import PageSelect from './Components/PageSelect/PageSelect';

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

  const deleteItem = (id) => {
    fetch(`${API_ROOT}/api/list/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json; charset=utf-8'
      },
      mode: 'cors'
    })
      .then((x) => x.json())
      .then(loadData);
  };

  const updateItem = (id, itemName, quantity) => {
    fetch(`${API_ROOT}/api/list/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json; charset=utf-8'
      },
      mode: 'cors',
      body: JSON.stringify({
        item: itemName,
        quantity,
      }),
    })
      .then((x) => x.json())
      .then(loadData);
  };

  const paginator = () => {
    const pgNums = Math.ceil(shoppingList.length / 1)
    let pgBtns = [];
    for (let i  = 1; i <= pgNums; i ++) {
      pgBtns.push(i);
    }
    return pgBtns;
  };

  return (
    <div className="App">
      <header>
        <h1>Shopping List App</h1>
      </header>

      <main>
        <ShoppingForm submitItem={addItem} />
        <PageSelect 
          prevPageFlag={false}
          nextPageFlag={false}
          currentPage={1}
          pageNumberArray={paginator()}
        />
        <ShoppingList
          items={shoppingList.slice(0, 4)}
          deleteItem={deleteItem}
          updateItem={updateItem}  
        />
    </main>

    </div>
  );
}