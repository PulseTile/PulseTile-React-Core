import React from 'react';

const UserPanelItem = ({ children, className, ...restProps }) => <li className={className} {...restProps}>{children}</li>;

export default UserPanelItem;
