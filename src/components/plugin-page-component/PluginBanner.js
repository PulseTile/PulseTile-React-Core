import React, { PureComponent } from 'react';
import PropTypes from "prop-types";
import { themeConfigs } from '../../themes.config';

export default class PluginBanner extends PureComponent {
  static propTypes = {
    title: PropTypes.string.isRequired,
    subTitle: PropTypes.string.isRequired,
    img: PropTypes.any.isRequired,
  };

  static defaultProps = {
    toRight: false
  };

  render() {
    const { title, subTitle, img, toRight } = this.props;

    return (
      themeConfigs.isShowPluginsBigBanner ?
        <div className="page-banner">
          <div className={`page-banner__title ${toRight ? 'page-banner__title--right': ''}`}>{title}</div>
          <div className={`page-banner__subtitle ${toRight ? 'page-banner__subtitle--right': ''}`}>{subTitle}</div>
          <img className="page-banner__img" src={img} alt=""/>
        </div>
      : <div />
    )
  }
}
