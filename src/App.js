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

  function calcSliceRangeAndBools(elemsPerPg, currPg) {
    let newCurr = parseInt(currPg);
    let lastPg = Math.ceil(shoppingList.length / elemsPerPg);

    if (newCurr > lastPg) {
      newCurr = 1;
    }

    let start = elemsPerPg * (newCurr  - 1);
    let end = start + parseInt(elemsPerPg);

    let suppPrev = false;
    let suppNext = false;
    let suppJump = false;

    if (start === 0 && newCurr >= lastPg) {
      suppPrev = true;
      suppNext = true;
      suppJump = true;
    } else if (start === 0) {
      suppPrev = true;
    } else if (newCurr >= lastPg) {
      suppNext = true;
    }

    return [newCurr, start, end, suppPrev, suppNext, suppJump];
  }

  function perPageFunction(clickedListValue) {
    let savedState = localStorage.getItem("userChoices");

    if (typeof savedState === "string") {
      let parsedSave = JSON.parse(savedState);
      let newVals = [];
      if (clickedListValue.menuElement === "All") {
        newVals = calcSliceRangeAndBools(shoppingList.length, 1);
        parsedSave[0].itemsPerPage = shoppingList.length;
      } else {
        newVals = calcSliceRangeAndBools(clickedListValue.menuElement, parsedSave[0].currentPage);
        parsedSave[0].itemsPerPage = clickedListValue.menuElement;
      }

      parsedSave[0].currentPage = newVals[0];
      parsedSave[0].sliceStart = newVals[1];
      parsedSave[0].sliceEnd = newVals[2];
      parsedSave[0].suppressPrevBtn = newVals[3];
      parsedSave[0].suppressNextBtn = newVals[4];
      parsedSave[0].suppressJumpToPg = newVals[5];

      localStorage.setItem("userChoices", JSON.stringify(parsedSave));
      window.location.reload();
    }

  }

  function goToNext() {
    let savedState = localStorage.getItem("userChoices");

    if (typeof savedState === "string") {
      let parsedSave = JSON.parse(savedState);
      let maxPage = Math.ceil(shoppingList.length / parsedSave[0].itemsPerPage);
      parsedSave[0].currentPage =
        Math.min(parsedSave[0].currentPage + 1, maxPage);

      let newVals = calcSliceRangeAndBools(parsedSave[0].itemsPerPage, parsedSave[0].currentPage);

      parsedSave[0].currentPage = newVals[0];
      parsedSave[0].sliceStart = newVals[1];
      parsedSave[0].sliceEnd = newVals[2];
      parsedSave[0].suppressPrevBtn = newVals[3];
      parsedSave[0].suppressNextBtn = newVals[4];
      parsedSave[0].suppressJumpToPg = newVals[5];

      localStorage.setItem("userChoices", JSON.stringify(parsedSave));
      window.location.reload();
    }   
  }

  function goToPrev() {
    let savedState = localStorage.getItem("userChoices");

    if (typeof savedState === "string") {
      let parsedSave = JSON.parse(savedState);
      parsedSave[0].currentPage = Math.max(parsedSave[0].currentPage - 1, 1);

      let newVals = calcSliceRangeAndBools(parsedSave[0].itemsPerPage, parsedSave[0].currentPage);

      parsedSave[0].currentPage = newVals[0];
      parsedSave[0].sliceStart = newVals[1];
      parsedSave[0].sliceEnd = newVals[2];
      parsedSave[0].suppressPrevBtn = newVals[3];
      parsedSave[0].suppressNextBtn = newVals[4];
      parsedSave[0].suppressJumpToPg = newVals[5];

      localStorage.setItem("userChoices", JSON.stringify(parsedSave));
      window.location.reload();
    } 
  }


  function pageJumpFunction(clickedPageJump) {
    let savedState = localStorage.getItem("userChoices");

    if (typeof savedState === "string") {
      let parsedSave = JSON.parse(savedState);
      parsedSave[0].currentPage = clickedPageJump.menuElement;

      let newVals = calcSliceRangeAndBools(parsedSave[0].itemsPerPage, parsedSave[0].currentPage);

      parsedSave[0].currentPage = newVals[0];
      parsedSave[0].sliceStart = newVals[1];
      parsedSave[0].sliceEnd = newVals[2];
      parsedSave[0].suppressPrevBtn = newVals[3];
      parsedSave[0].suppressNextBtn = newVals[4];
      parsedSave[0].suppressJumpToPg = newVals[5];

      localStorage.setItem("userChoices", JSON.stringify(parsedSave));
      window.location.reload();
      localStorage.setItem("userChoices", JSON.stringify(parsedSave));
    }
  }

  const setUserMenu = ({ numItems }) => {
    if (userDisplayChoices === '[]') {
      setUserDisplayChoices(() => [{
          currentPage: 1,
          itemsPerPage: 5,
          suppressPrevBtn: true,
          suppressNextBtn: Math.ceil(numItems / 5) === 1,
          suppressJumpToPg: Math.ceil(numItems / 5) === 1,
          sliceStart: 0,
          sliceEnd: 5
      }]);
    }
    else {
      const parsedUserChoices = JSON.parse(localStorage.getItem("userChoices"))[0]

      setUserDisplayChoices(() => [{
        currentPage: parsedUserChoices.currentPage,
        itemsPerPage: parsedUserChoices.itemsPerPage,
        suppressPrevBtn: parsedUserChoices.suppressPrevBtn,
        suppressNextBtn: parsedUserChoices.suppressNextBtn,
        suppressJumpToPg: parsedUserChoices.suppressJumpToPg,
        sliceStart: parsedUserChoices.sliceStart,
        sliceEnd: parsedUserChoices.sliceEnd
    }]);     

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
          perPageChoiceFunc={perPageFunction}
          pageJumpFunc={pageJumpFunction}
          prevFunc={goToPrev}
          nextFunc={goToNext}
        />
        <ShoppingList
          items={shoppingList.slice(
            JSON.parse(localStorage.getItem("userChoices"))[0].sliceStart,
            JSON.parse(localStorage.getItem("userChoices"))[0].sliceEnd
          )}
          deleteItem={deleteItem}
          updateItem={updateItem}  
        />
    </main>

    </div>
  );
}