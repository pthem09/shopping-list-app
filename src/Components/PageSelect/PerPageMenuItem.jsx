import React from 'react';

export default function PerPageMenuItem({ menuElement }) {
    function logResult() {
      let t;
      if (menuElement === 'All') {
        t = 5060;
      }
      else {
        t = parseInt(menuElement);
      }
      console.log(t);
    }
  
    return (
    <ul onClick={logResult}>{menuElement}</ul>
  )
}
