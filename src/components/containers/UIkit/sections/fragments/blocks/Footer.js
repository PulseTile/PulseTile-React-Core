import React from 'react';
import footerLogo from '../../../../../../assets/images/ripple-foundation-logo-footer.png';

/**
 * This component returns content of Footer section in Blocks
 */
const Footer = () => {
  return (
    <div id="footer" className="ui-section">
      <strong className="ui-title">Footer</strong>
      <div className="ui-sub-section ui-footer">
        <div className="ui-content-backset">
          <footer className="footer">
            <div className="container-fluid">
              <p className="footer-text">Transforming Usability</p>
              <div className="footer-povered">
                <span className="footer-povered-text">Supported by</span>
                <a href="#" className="footer-logo"><img src={footerLogo} alt="Ripple Icon" className="footer-logo-img" /></a>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Footer;
