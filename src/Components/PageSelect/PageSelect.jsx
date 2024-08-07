import React, { useState } from 'react';
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu
  } from 'reactstrap';
import PerPageMenuItem from './PerPageMenuItem';
import JumpToPageMenuItem from './JumpToPageMenuItem';
import 'bootstrap/dist/css/bootstrap.min.css';
import './PageSelect.css';

export default function PageSelect({
        totalItemCount,
        suppressPrevPgBtn,
        suppressNextPgBtn,
        suppressPageJump,
        pageNumberArray,
        perPageChoiceFunc,
        pageJumpFunc,
        nextFunc,
        prevFunc
    }) {

    const [dropdownOpenItems, setDropdownOpenItems] = useState(false);
    const toggleItems= () => setDropdownOpenItems((prevStateItems) => !prevStateItems);        

    const [dropdownOpenJump, setDropdownOpenJump] = useState(false);
    const toggleJump = () => setDropdownOpenJump((prevStateJump) => !prevStateJump);
    
    let itemsPerPage = [];
    let itemsPerPageStart;
    let itemsPerPageElement;
    if (totalItemCount > 5 && totalItemCount < 10) {
        itemsPerPage = ["5", "All"];
    } else if (totalItemCount > 10) {
        itemsPerPage = ["5", "10", "All"];
    }

    if (itemsPerPage.length > 0) {
        itemsPerPageStart = itemsPerPage.map(item => <PerPageMenuItem key={`${item}-per`} menuElement={item} clickFunc={perPageChoiceFunc}/>);
        itemsPerPageElement = (
            <div className="d-flex p-2">
                <Dropdown isOpen={dropdownOpenJump} toggle={toggleJump} direction="down">
                    <DropdownToggle caret>Items per Page:</DropdownToggle>
                    <DropdownMenu>
                        {itemsPerPageStart}
                    </DropdownMenu>
                </Dropdown>
            </div>
        );
    }

    const jumpToPageElement = createJump();

    function createJump() {
        if (!suppressPageJump) {
            let temp = pageNumberArray.map(item => <JumpToPageMenuItem key={`${item}-jump`} menuElement={item} clickFunc={pageJumpFunc}/>);
            return (
                <div className="d-flex p-2">
                    <Dropdown isOpen={dropdownOpenItems} toggle={toggleItems} direction="down">
                        <DropdownToggle caret>Jump to Page</DropdownToggle>
                        <DropdownMenu>
                            {temp}
                        </DropdownMenu>
                    </Dropdown>
                </div>
            );
        }
        return '';
    }

    return (
        <nav className="page-select-menu">
            {suppressPrevPgBtn ? '' : <button className="bg-warning prev-next-btn" key="prev" type="Submit" onClick={prevFunc}>Previous Page</button>}
            {suppressNextPgBtn ? '' : <button className="bg-info prev-next-btn" key="next" type="Submit" onClick={nextFunc}>Next Page</button>}
            {itemsPerPageElement}
            {jumpToPageElement}
        </nav>
    )
}