import React from 'react';
import MainLogo from '../MainLogo/MainLogo';
import NavSearch from '../NavSearch/NavSearch';
import PTButtonIcon from '../PTButtonIcon/PTButtonIcon';

const TopHeader = props => <div className="navbar">
  <MainLogo />
  <NavSearch />
  <PTButtonIcon classButtonName="btn-notification" icon="fa-bell-o" />
  <PTButtonIcon classButtonName="btn-user" icon="fa-user" />
</div>;

export default TopHeader;
