import React from 'react';

// components
import BrowsersList from './BrowsersList';

function IE() {
  return (
    <section className="ie">
      <div className="ie__inner-wrapper">
        <h1 className="ie__title">
          Welcome, please use one of our preferred browsers
        </h1>
        <BrowsersList />
        <div className="ie__text">
          Those button link to the official browser webpages. You can choose platform and language there.
        </div>
      </div>
    </section>
  );
}

export default IE;
