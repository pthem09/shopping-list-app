import React from 'react';
import { DropdownItem } from 'reactstrap';

export default function JumpToPageMenuItem({ menuElement, clickFunc }) {

    return (
      <DropdownItem id={menuElement} onClick={() => clickFunc({menuElement})}>{menuElement}</DropdownItem>
  )
}
