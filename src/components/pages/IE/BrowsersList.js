import React from 'react';

// icons
import chromeIcon from './images/chrome.png';
import firefoxIcon from './images/firefox.png';
import safariIcon from './images/safari.png';

const browsers = [
  {
    name: 'Chrome',
    link: 'https://www.google.com/chrome/',
    image: chromeIcon,
  },
  {
    name: 'Safari',
    link: 'https://support.apple.com/downloads/safari',
    image: safariIcon,
  },
  {
    name: 'Firefox',
    link: 'https://www.mozilla.org/en-US/firefox/new/',
    image: firefoxIcon,
  },
]

function BrowsersList() {
  const list = browsers.map((browser) => {
    return (
      <li key={browser.name} className="ie__browsers-item">
        <a href={browser.link} className="ie__browsers-link" target="_blank">
          <div className="ie__browsers-image-wrapper">
            <img src={browser.image} alt={browser.name} />
          </div>
          <div className="ie__browser-name">
            {browser.name}
          </div>
        </a>
      </li>
    )
  })

  return <div className="ie__browsers-wrapper">
    <ul className="ie__browsers-list">
      {list}
    </ul>
  </div>;
}

export default BrowsersList;
