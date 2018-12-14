import React, {PureComponent} from 'react';
import { image } from './FooterImage';
import { get } from 'lodash';

import { themeConfigs } from '../../../themes.config';

export default class Footer extends PureComponent {
  static defaultProps = {
    isShowSupportedBy: true,
  };

  state = {
    enabledHighContrast: false,
  };

  toggleHighContrast = () => {
    let bodyTag = document.getElementsByTagName("body")[0];

    //TODO: Should we remember this in a cookie?
    if( bodyTag.classList.contains("high-contrast") ){
      bodyTag.classList.remove("high-contrast");
      this.setState({
        enabledHighContrast: false
      });
    } else {
      bodyTag.classList.add("high-contrast")
      this.setState({
        enabledHighContrast: true
      });
    }
  };

  render() {
    const { copyright, isShowSupportedBy } = this.props;
    const imageLocation = '/images/ripple-foundation-logo-footer.png';
    const isHighContrast = get(themeConfigs, 'footerShowHighContrast', true);
    const { enabledHighContrast } = this.state;

    return (
      <footer className="footer">
        <div className="container-fluid">
          <p className="footer-text">
            {copyright ? <span>{ copyright }</span> : null}
            &nbsp;&nbsp;
            {isHighContrast ? <span className="toggle-high-contrast">
              <a onClick={ this.toggleHighContrast } accessKey="H">
                { !this.state.enabledHighContrast ? 'Enable High Contrast Mode' : 'Disable High Contrast Mode' }
              </a>
            </span> : null}
          </p>

          <div className="footer-povered">
            {isShowSupportedBy ? <span className="footer-povered-text">Supported by</span> : null}
            <a href="/" className="footer-logo">
              <img src={image} alt="Ripple Icon" className="footer-logo-img" />
            </a>
          </div>
        </div>
      </footer>
    )
  }
}
