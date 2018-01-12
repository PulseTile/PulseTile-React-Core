import React from 'react';

const PTButton = ({ children, className, ...restProps }) => <button className={className} {...restProps}>{children}</button>;

export default PTButton;
