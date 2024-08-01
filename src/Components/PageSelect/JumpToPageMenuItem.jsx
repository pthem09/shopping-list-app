import React from 'react';

export default function JumpToPageMenuItem({ menuElement }) {
    function GoToPage() {
        console.log(menuElement);
    }
  
    return (
    <ul onClick={GoToPage}>{menuElement}</ul>
  )
}
