import React, {PureComponent} from 'react';
import { testConstants, isDevMode } from '../../../config/for-test.constants';

export default class Footer extends PureComponent {
  static defaultProps = {
    isShowSupportedBy: true,
  };

  render() {
    const { copyright, isShowSupportedBy } = this.props;
    const imageLocation = '/images/ripple-foundation-logo-footer.png';
    const imageSource = isDevMode ? (testConstants.hostName + imageLocation) : imageLocation;
    return (
      <footer className="footer">
        <div className="container-fluid">
          {copyright ? <p className="footer-text">{ copyright }</p> : null}
          <div className="footer-povered">
            {isShowSupportedBy ? <span className="footer-povered-text">Supported by</span> : null}
            <a href="/" className="footer-logo">
              <img src={imageSource} alt="Ripple Icon" className="footer-logo-img" />
            </a>
          </div>
        </div>
      </footer>
    )
  }
}
