import React from 'react';

export const Tag = ({ children, style, ...restProps }) => <span className={`label label-${style}`} {...restProps}>{children}</span>;

export const TagList = ({ children }) => <div className="control-group">{children}</div>;
