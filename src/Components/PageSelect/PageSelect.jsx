import React from 'react';
import PerPageMenuItem from './PerPageMenuItem';
import JumpToPageMenuItem from './JumpToPageMenuItem';

export default function PageSelect({ prevPageFlag, nextPageFlag, currentPage, pageNumberArray }) {
    
    const itemsPerPage = ["5", "10", "All"];
    const itemsPerPageElement = itemsPerPage.map(item => <PerPageMenuItem menuElement={item}/>);
    const jumpToPageElement = pageNumberArray.map(item => <JumpToPageMenuItem menuElement={item}/>);

    function goToPrevious(event) {
        event.preventDefault();
        currentPage -= 1;
        currentPage = Math.max(1, currentPage);
        if (currentPage === 1) {
            prevPageFlag = true;
        } else {
            prevPageFlag = false;
        }
        console.log(currentPage + ' ' + prevPageFlag);
    }
  
    function goToNext(event) {
        event.preventDefault();
        currentPage += 1;
        console.log(currentPage);
    }

    return (
        <div>
            <button type="Submit" onClick={goToPrevious} disabled={prevPageFlag}>Previous Page</button>
            <button type="Submit" onClick={goToNext} disabled={nextPageFlag}>Next Page</button>
            Items per Page: {itemsPerPageElement}    
            Jump to Page: {jumpToPageElement}
        </div>
    )
}