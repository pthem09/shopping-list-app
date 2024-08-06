import './App.css';
import React, { useState, useEffect } from 'react';

import PageSelect from './Components/PageSelect/PageSelect';
import ShoppingForm from './Components/ShoppingForm/ShoppingForm';
import ShoppingList from './Components/ShoppingList/ShoppingList';

export default function App() {
  const [shoppingList, setShoppingList] = useState([]);

  let [userDisplayChoices, setUserDisplayChoices] = useState(getInitialState());
  useEffect(saveUserChoices, [userDisplayChoices]);

  function saveUserChoices() {
    localStorage.setItem("userChoices", JSON.stringify(userDisplayChoices));
  }

  function getInitialState() {
    let savedState = localStorage.getItem("userChoices");
    if (typeof savedState === "string" && savedState !== '[]') {
      return JSON.parse(savedState);
    }
    localStorage.setItem("userChoices", JSON.stringify([{
      currentPage: 1,
      itemsPerPage: 5,
      suppressPrevBtn: true,
      suppressNextBtn: true,
      suppressJumpToPg: true,
      sliceStart: 0,
      sliceEnd: 5,
      allItemsPerPage: false,
      totalElements: 5,
      defaultLoad: true
    }]));
  }

  const API_ROOT = "https://hn7jn8-8080.csb.app";

  const loadData = (askRefresh = false) => {
    let refresh = false;
    if (refresh || JSON.parse(localStorage.getItem("userChoices"))[0].defaultLoad) {
      refresh = true;
    }
    fetch(`${API_ROOT}/api/list`)
      .then(x => x.json())
      .then(response => {
        setShoppingList(response);
        setUserMenu(response.length, refresh);
      } 
    )
  }

  useEffect(loadData, []);

  function calcSliceRangeAndBools(elemsPerPg, currPg, totElems, allElemsPerPg, refreshNeeded) {
    let newCurr = parseInt(currPg);
    let lastPg = Math.ceil(totElems / elemsPerPg);

    let newElemsPerPg = parseInt(elemsPerPg);
    if (allElemsPerPg) {
      newElemsPerPg = totElems;
    }

    if (newCurr > lastPg) {
      newCurr = 1;
    }

    let start = newElemsPerPg * (newCurr  - 1);
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

    setUserDisplayChoices(() => [{
      currentPage: newCurr,
      itemsPerPage: newElemsPerPg,
      sliceStart: start,
      sliceEnd: end,
      suppressPrevBtn: suppPrev,
      suppressNextBtn: suppNext,
      suppressJumpToPg: suppJump,
      allItemsPerPage: allElemsPerPg,
      totalElements: totElems,
      defaultLoad: false
    }]);

    if (refreshNeeded) {
      window.location.reload();
    }
  }

  function perPageFunction(clickedListValue) {
    if (clickedListValue.menuElement === "All") {
      calcSliceRangeAndBools(shoppingList.length, 1, shoppingList.length, true, true);
    } else {
      userDisplayChoices[0].allItemsPerPage = false;
      calcSliceRangeAndBools(clickedListValue.menuElement, userDisplayChoices[0].currentPage, shoppingList.length, false, true);
    }
  }

  function goToNext() {
    let maxPage = Math.ceil(shoppingList.length / userDisplayChoices[0].itemsPerPage);
    userDisplayChoices[0].currentPage =
      Math.min(userDisplayChoices[0].currentPage + 1, maxPage);
    calcSliceRangeAndBools(
      userDisplayChoices[0].itemsPerPage,
      userDisplayChoices[0].currentPage,
      shoppingList.length,
      userDisplayChoices[0].allElemsPerPg,
      true
    ); 
  }

  function goToPrev() {
    userDisplayChoices[0].currentPage = Math.max(userDisplayChoices[0].currentPage - 1, 1);

    calcSliceRangeAndBools(
      userDisplayChoices[0].itemsPerPage,
      userDisplayChoices[0].currentPage,
      shoppingList.length,
      userDisplayChoices[0].allElemsPerPg,
      true
    );
  }

  function pageJumpFunction(clickedPageJump) {
    userDisplayChoices[0].currentPage = clickedPageJump.menuElement;

    calcSliceRangeAndBools(
      userDisplayChoices[0].itemsPerPage,
      userDisplayChoices[0].currentPage,
      shoppingList.length,
      userDisplayChoices[0].allElemsPerPg,
      true
    );
  }

  const setUserMenu = (numItems, refreshAfter) => {
      let newItems =  userDisplayChoices[0].itemsPerPage;
      if ( userDisplayChoices[0].allItemsPerPage && newItems !== numItems) {
        newItems = numItems;
      }

      let changePage = 0;
      if (numItems >  userDisplayChoices[0].totalElements && !userDisplayChoices[0].defaultLoad) {
        changePage = 1;
      } else if (
          numItems <  userDisplayChoices[0].totalElements
          && numItems < userDisplayChoices[0].sliceStart
          && userDisplayChoices[0].sliceStart > 0
        ) {
        changePage = -1;
      }

      calcSliceRangeAndBools(
        newItems, 
        userDisplayChoices[0].currentPage + changePage,
        numItems, 
        userDisplayChoices[0].allElemsPerPg,
        refreshAfter
      );

  }

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
      .then(loadData(true));
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
      .then(loadData(true));
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
        <h1>Enter your shopping wish list!</h1>
        <h2>Entries are public, so make it fun and safe for work :) </h2>
      </header>

      <main>
        <ShoppingForm submitItem={addItem} />
        <PageSelect 
          suppressPrevPgBtn={JSON.parse(localStorage.getItem("userChoices"))[0].suppressPrevBtn}
          suppressNextPgBtn={JSON.parse(localStorage.getItem("userChoices"))[0].suppressNextBtn}
          pageNumberArray={paginator()}
          suppressPageJump={JSON.parse(localStorage.getItem("userChoices"))[0].suppressJumpToPg}
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