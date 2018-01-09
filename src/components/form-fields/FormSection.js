import React, { PureComponent } from 'react';
// import PropTypes from 'prop-types';
import classNames from 'classnames';
// import _ from 'lodash/fp';

export default class FormSecrion extends PureComponent {
  // static propTypes = {
  //   label: PropTypes.string.isRequired,
  //   input: PropTypes.object.isRequired,
  //   meta: PropTypes.shape({
  //     active: PropTypes.bool,
  //     error: PropTypes.any,
  //   }).isRequired,
  //   id: PropTypes.string.isRequired,
  // };
  // getTheme() {
  //   const { isBordered, theme, children } = this.props;
  // }

  render() {
    const { title, isImportBtn, isAccordion, isBordered, theme, children } = this.props;

    // const theme = this.getTheme();

    return (
      <div className={classNames('form-group-section', { theme: theme }, { 'form-group-section-bordered': isBordered }, { 'accordion': isAccordion })}>
        <div className="form-group-section-body">
          {children}
        </div>
      </div>
    //   <div className="form-group-section form-group-section-bordered form-group-section-primary accordion" key={index}>
    //   <div className="form-group-section-heading">
    //   <div className="control-group without-side-indent right">
    //   {/*<button className="btn btn-primary" ng-click="importToCreate('medications', medicationItem)"><span className="btn-text">Import Data</span></button>*/}
    // <button className="btn btn-primary"><span className="btn-text">Import Data</span></button>
    // {/*<button className="btn btn-primary btn-inverse btn-square btn-form-group-section-toggle" ng-click="toggleSubAccordion()"><i className="btn-icon fa fa-chevron-up"></i></button>*/}
    // <button className="btn btn-primary btn-inverse btn-square btn-form-group-section-toggle"><i className="btn-icon fa fa-chevron-up"></i></button>
    // </div>
    // <h3 className="panel-title"></h3>
    // </div>
    // <div className="form-group-section-body">
    //
    // </div>
    )
  }
}

