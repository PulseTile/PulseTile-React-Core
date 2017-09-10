import React from 'react';
import MainLogo from '../MainLogo/MainLogo';
import NavSearch from '../../containers/NavSearch/NavSearch';
import UserPanel from '../../containers/UserPanel/UserPanel';

const TopHeader = props => <div className="navbar">
  <MainLogo />
  <UserPanel />
  <NavSearch />
</div>;

export default TopHeader;
