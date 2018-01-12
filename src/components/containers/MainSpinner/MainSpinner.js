import React from 'react';

const MainSpinner = (props) => {
  return (
    <div className="main-spinner">
      <div className="lds-css ng-scope">
        <div className="lds-dual-ring">
          <div></div>
          <div></div>
        </div>
      </div>
    </div>)
};

export default MainSpinner;
