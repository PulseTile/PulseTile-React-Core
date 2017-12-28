import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { lifecycle } from 'recompose';

import PTButton from '../../ui-elements/PTButton/PTButton';
import userAccountSelector from './selectors';
import userImage from '../../../assets/images/user.jpg'
import { clientUrls } from '../../../config/client-urls.constants';
import { unmountOnBlur } from '../../../utils/HOCs/unmount-on-blur.utils';
import { logoutStart } from '../../../ducks/logout.duck';

const mapDispatchToProps = dispatch => ({ actions: bindActionCreators({ logoutStart }, dispatch) });

@connect(userAccountSelector, mapDispatchToProps)
@lifecycle(unmountOnBlur)
export default class UserAccountPanel extends PureComponent {
  static propTypes = {
    user: PropTypes.shape().isRequired,
    actions: PropTypes.objectOf(PropTypes.func).isRequired,
  };

  static contextTypes = {
    router: PropTypes.shape({
      history: PropTypes.object,
    }),
  };

  render() {
    const { user, actions, onClick } = this.props;
    return (
      <div className="dropdown-user dropdown-menu-right dropdown-menu">
        <div
          className="user-profile-image"
          onClick={() =>{
            this.context.router.history.push(clientUrls.USER_PROFILE);
            onClick('')
          }}
        >
          <div className="img">
            <img src={userImage} alt="" />
          </div>
        </div>
        <div className="user-profile-info">
          <div
            className="name"
            onClick={() =>{
              this.context.router.history.push(clientUrls.USER_PROFILE);
              onClick('')
            }}
          >{user.given_name} {user.family_name}</div>
          <div className="specification">
            <div className="item"><em>{user.role}</em></div>
            <div className="item">{user.email}</div>
            <div className="item gray"><em>10/05/2099</em></div>
            <div className="item"><em>About Showcase Stack; PulseTile version 1.0.0/QEWD_Ripple version 1.0.0</em></div>
          </div>
          <PTButton className="btn btn-success btn-block btn-signout">
            <div onClick={actions.logoutStart}>
              <span className="brn-text">Sign Out</span> <i className="btn-icon fa fa-sign-out" />
            </div>
          </PTButton>
        </div>
      </div>
    )
  }
}
