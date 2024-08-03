import React from 'react';

export default function JumpToPageMenuItem({ menuElement, clickFunc }) {

    return (
    <ul id={menuElement} onClick={() => clickFunc({menuElement})}>Jump to Page: {menuElement}</ul>
  )
}
