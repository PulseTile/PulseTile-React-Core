import React from 'react';
import Spinner from '../../../../../ui-elements/Spinner/Spinner';

const SpinnerBlock = () => {
  return (
    <div id="spinner" className="ui-section">
      <strong className="ui-title">Spinner</strong>
      <div className="ui-spinner-wrap">
        <Spinner />
      </div>
    </div>
  );
};

export default SpinnerBlock;
