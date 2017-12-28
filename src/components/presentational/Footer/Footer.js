import React from 'react';

import footerLogo from '../../../assets/images/ripple-foundation-logo-footer.png'

const Footer = props => <footer className="footer">
  <div className="container-fluid">
    <p className="footer-text">Transforming Usability</p>
    <div className="footer-povered">
      <span className="footer-povered-text">Supported by</span>
      <a href="/" className="footer-logo">
        <img src={footerLogo} alt="Ripple Icon" className="footer-logo-img" />
      </a>
    </div>
  </div>
</footer>

export default Footer;
