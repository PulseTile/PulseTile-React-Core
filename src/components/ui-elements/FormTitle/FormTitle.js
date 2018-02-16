import React from 'react';

const FormTitle = ({ className, text, ...restProps }) => <div className={`form-title-block ${className}`} {...restProps}><div className="form-title">{text}</div></div>;

export default FormTitle;
