import React from 'react';
import PerPageMenuItem from './PerPageMenuItem';
import JumpToPageMenuItem from './JumpToPageMenuItem';

export default function PageSelect({
        suppressPrevPgBtn,
        suppressNextPgBtn,
        suppressPageJump,
        currentPage,
        pageNumberArray,
        perPageChoiceFunc,
        pageJumpFunc,
        nextFunc,
        prevFunc    
    }) {
    
    const itemsPerPage = ["5", "10", "All"];
    const itemsPerPageElement = itemsPerPage.map(item => <PerPageMenuItem key={`${item}-per`} menuElement={item} clickFunc={perPageChoiceFunc}/>);
    const jumpToPageElement = createJump();

    function createJump() {
        if (!suppressPageJump) {
            return pageNumberArray.map(item => <JumpToPageMenuItem key={`${item}-jump`} menuElement={item} clickFunc={pageJumpFunc}/>);
        }
        return '';
    }

    return (
        <div>
            {suppressPrevPgBtn ? '' : <button key="prev" type="Submit" onClick={prevFunc}>Previous Page</button>}
            {suppressNextPgBtn ? '' : <button key="next" type="Submit" onClick={nextFunc}>Next Page</button>}
            Items per Page: {itemsPerPageElement}
           {jumpToPageElement}
        </div>
    )
}