import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { lifecycle } from 'recompose';

import PTButton from '../../ui-elements/PTButton/PTButton';
import userAccountSelector from './selectors';
import { unmountOnBlur } from '../../../utils/HOCs/unmount-on-blur.utils';
import userImage from '../../../assets/images/user.jpg'

@connect(userAccountSelector)
@lifecycle(unmountOnBlur)
export default class UserAccountPanel extends PureComponent {
  static propTypes = {
    user: PropTypes.shape().isRequired,
  };
  render() {
    const { user } = this.props;
    return (
      <div className="dropdown-user dropdown-menu-right dropdown-menu">
        <div className="user-profile-image">
          <div className="img">
            <img src={userImage} alt="" />
          </div>
        </div>
        <div className="user-profile-info">
          <div className="name">{user.given_name} {user.family_name}</div>
          <div className="specification">
            <div className="item"><em>{user.role}</em></div>
            <div className="item">{user.email}</div>
            <div className="item gray"><em>10/05/2099</em></div>
            <div className="item"><em>About Showcase Stack; PulseTile version 1.0.0/QEWD_Ripple version 1.0.0</em></div>
          </div>
          <PTButton className="btn btn-success btn-block btn-signout">
            <div>
              <span className="brn-text">Sign Out</span>
              <i className="btn-icon fa fa-sign-out" />
            </div>
          </PTButton>
        </div>
      </div>
    )
  }
}
