import './App.css';
import React, { useState, useEffect } from 'react';

import ShoppingForm from './Components/ShoppingForm/ShoppingForm';
import ShoppingList from './Components/ShoppingList/ShoppingList';
import PageSelect from './Components/PageSelect/PageSelect';

export default function App() {
  const [shoppingList, setShoppingList] = useState([]);

  let [userDisplayChoices, setUserDisplayChoices] = useState(getInitialState());

  useEffect(saveUserChoices, [userDisplayChoices]);

  function saveUserChoices() {
    localStorage.setItem("userChoices", JSON.stringify(userDisplayChoices));
  }

  function getInitialState() {
    let savedState = localStorage.getItem("userChoices");
    if (typeof savedState === "string") {
      return JSON.parse(savedState);
    }
    return [];
  }

  const API_ROOT = "https://hn7jn8-8080.csb.app";

  const loadData = () => {
    fetch(`${API_ROOT}/api/list`)
      .then(x => x.json())
      .then(response => {
        setShoppingList(response);
        setUserMenu(response.length);
      } 
    )
  }

  const setUserMenu = ({ numItems }) => {
    if (userDisplayChoices === '[]') {
      setUserDisplayChoices(() => [{
          currentPage: 1,
          itemsPerPage: 5,
          suppressPrevBtn: true,
          suppressNextBtn: Math.ceil(numItems / 5) === 1,
          suppressJumpToPg: Math.ceil(numItems / 5) === 1,
      }]);
    }
    else {
      const perPageChoice = JSON.parse(localStorage.getItem("userChoices"))[0].itemsPerPage;
      JSON.parse(localStorage.getItem("userChoices"))[0].suppressNextBtn = Math.ceil(numItems / perPageChoice) === 1;
      JSON.parse(localStorage.getItem("userChoices"))[0].suppressJumpToPg = Math.ceil(numItems / perPageChoice) === 1;
    }
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
    const pgNums = Math.ceil(
        shoppingList.length / 
        JSON.parse(localStorage.getItem("userChoices"))[0].itemsPerPage        
      );
    let pgBtns = [];
    for (let i  = 1; i <= pgNums; i ++) {
      pgBtns.push(i);
    }
    console.log('paginator ' + pgBtns.length);
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
          suppressPrevPgBtn={JSON.parse(localStorage.getItem("userChoices"))[0].suppressPrevBtn}
          suppressNextPgBtn={JSON.parse(localStorage.getItem("userChoices"))[0].suppressNextBtn}
          currentPage={JSON.parse(localStorage.getItem("userChoices"))[0].currentPage}
          pageNumberArray={paginator()}
          suppressPageJump={paginator().length === 1}
        />
        <ShoppingList
          items={shoppingList.slice(
            JSON.parse(localStorage.getItem("userChoices"))[0].itemsPerPage * (JSON.parse(localStorage.getItem("userChoices"))[0].currentPage - 1),
            (JSON.parse(localStorage.getItem("userChoices"))[0].itemsPerPage * JSON.parse(localStorage.getItem("userChoices"))[0].currentPage) - 1
          )}
          deleteItem={deleteItem}
          updateItem={updateItem}  
        />
    </main>

    </div>
  );
}