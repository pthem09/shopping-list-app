import React from 'react';

export default function JumpToPageMenuItem({ menuElement }) {
    function GoToPage() {
        console.log(menuElement);
    }
  
    return (
    <ul id={menuElement} onClick={GoToPage}>Jump to Page: {menuElement}</ul>
  )
}
