import React from 'react';

const PTButtonIcon = props => <a className={`btn-header ${ props.classButtonName }`}>
  <i className={`fa ${ props.icon }`}/>
</a>;

export default PTButtonIcon;
