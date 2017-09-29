import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import _ from 'lodash/fp';

import PTButton from '../../ui-elements/PTButton/PTButton';
import AllergiesDetailHeader from './header/AllergiesDetailHeader';

export default class AlergiesDetailPanel extends PureComponent {
  static propTypes = {
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    isOpen: PropTypes.bool.isRequired,
    children: PropTypes.element.isRequired,
    onShow: PropTypes.func.isRequired,
    onExpand: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onSaveSettings: PropTypes.func.isRequired,
    editedPanel: PropTypes.object,
  };

  render() {
    const { name, title, children, isOpen, onShow, onExpand, onEdit, editedPanel, onCancel, onSaveSettings, formValues } = this.props;

    return (
      <div className={classNames('panel panel-secondary', { open: isOpen })}>
        <AllergiesDetailHeader onExpand={onExpand} name={name} title={title} onShow={onShow}/>
        <div className="panel-body">
          {children}
        </div>
      </div>
    )
  }
}
