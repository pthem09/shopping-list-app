import React, { createElement } from 'react';
import PerPageMenuItem from './PerPageMenuItem';
import JumpToPageMenuItem from './JumpToPageMenuItem';

export default function PageSelect({ suppressPrevPgBtn, suppressNextPgBtn, suppressPageJump, currentPage, pageNumberArray }) {
    
    const itemsPerPage = ["5", "10", "All"];
    const itemsPerPageElement = itemsPerPage.map(item => <PerPageMenuItem key={item} menuElement={item}/>);
    const jumpToPageElement = createJump();

    function createJump() {
        if (!suppressPageJump) {
            return pageNumberArray.map(item => <JumpToPageMenuItem key={item} menuElement={item}/>);
        }
        return '';
    }

    function goToPrevious(event) {
        event.preventDefault();
        currentPage -= 1;
        currentPage = Math.max(1, currentPage);
        if (currentPage === 1) {
            suppressPrevPgBtn = true;
        } else {
            suppressPrevPgBtn = false;
        }
        console.log(currentPage + ' ' + suppressPrevPgBtn);
    }
  
    function goToNext(event) {
        event.preventDefault();
        currentPage += 1;
        console.log(currentPage);
    }

    return (
        <div>
            {suppressPrevPgBtn ? '' : <button key="prev" type="Submit" onClick={goToPrevious}>Previous Page</button>}
            {suppressNextPgBtn || suppressPageJump ? '' : <button key="next" type="Submit" onClick={goToNext}>Next Page</button>}
            Items per Page: {itemsPerPageElement}
           {jumpToPageElement}
        </div>
    )
}