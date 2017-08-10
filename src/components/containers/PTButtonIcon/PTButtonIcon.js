import React from 'react';

const PTButtonIcon = ({children, className, ...restProps}) => <button className={className} {...restProps}>{children}</button>;

export default PTButtonIcon;
