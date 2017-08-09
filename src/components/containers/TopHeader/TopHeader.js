import React from 'react';
import MainLogo from '../MainLogo/MainLogo';
import NavSearch from '../NavSearch/NavSearch';
import UserAccountPanel from '../UserAccountPanel/UserAccountPanel';

const TopHeader = props => <div className="navbar">
  <MainLogo />
  <UserAccountPanel />
  <NavSearch />
</div>;

export default TopHeader;
