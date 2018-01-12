import React from 'react';

const Spinner = ({ ...restProps }) => {
  return (
    <div className="content-spinner" {...restProps}>
      <div className="content-spinner__inner">
        <div className="content-spinner__circle content-spinner__circle--1"></div>
        <div className="content-spinner__circle content-spinner__circle--2"></div>
        <div className="content-spinner__circle content-spinner__circle--3"></div>
        <div className="content-spinner__circle content-spinner__circle--4"></div>
        <div className="content-spinner__circle content-spinner__circle--5"></div>
        <div className="content-spinner__circle content-spinner__circle--6"></div>
        <div className="content-spinner__circle content-spinner__circle--7"></div>
        <div className="content-spinner__circle content-spinner__circle--8"></div>
        <div className="content-spinner__circle content-spinner__circle--9"></div>
        <div className="content-spinner__circle content-spinner__circle--10"></div>
        <div className="content-spinner__circle content-spinner__circle--11"></div>
        <div className="content-spinner__circle content-spinner__circle--12"></div>
      </div>
    </div>
  )
};

export default Spinner;
