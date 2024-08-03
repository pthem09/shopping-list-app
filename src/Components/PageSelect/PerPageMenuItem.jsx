import React from 'react';

export default function PerPageMenuItem({ menuElement, clickFunc }) {

    return (
    <ul id={`${menuElement}-per`} onClick={() => clickFunc({menuElement})}>{menuElement}</ul>
  )
}
