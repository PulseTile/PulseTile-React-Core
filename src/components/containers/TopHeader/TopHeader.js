import React from 'react';
import MainLogo from '../MainLogo/MainLogo';
import PTButtonIcon from '../PTButtonIcon/PTButtonIcon';

const TopHeader = props => <div className="navbar">
  <MainLogo />
  <PTButtonIcon classButtonName="btn-notification" icon="fa-bell-o" />
  <PTButtonIcon classButtonName="btn-user" icon="fa-user" />
</div>;

export default TopHeader;
