import React from 'react';
import { DropdownItem } from 'reactstrap';

export default function PerPageMenuItem({ menuElement, clickFunc }) {

    return (
    <DropdownItem id={`${menuElement}-per`} onClick={() => clickFunc({menuElement})}>{menuElement}</DropdownItem>
  )
}
