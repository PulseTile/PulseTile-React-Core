import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import _ from 'lodash/fp';

import PTButton from '../ui-elements/PTButton/PTButton';
import PluginDetailHeader from './PluginDetailHeader';

export default class PluginDetailPanel extends PureComponent {
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
    const { name, title, children, isOpen, onShow, onExpand, onEdit, editedPanel, onCancel, onSaveSettings, formValues, currentPanel, isCreatePanelVisible, isBtnShowPanel } = this.props;

    return (
      <div className={classNames('panel panel-secondary', { open: isOpen })}>
        <PluginDetailHeader onExpand={onExpand} name={name} title={title} onShow={onShow} currentPanel={currentPanel} isBtnShowPanel={isBtnShowPanel} />
        <div className="panel-body">
          {children}
          {(!isCreatePanelVisible && (_.isUndefined(editedPanel[name]) || !editedPanel[name])) ? <div className="panel-control ng-scope">
            <div className="wrap-control-group">
              <div className="control-group right">
                <PTButton className="btn btn-success btn-inverse btn-edit" onClick={() => onEdit(name)}>
                  <i className="fa fa-edit" /> Edit
                </PTButton>
              </div>
            </div>
          </div> : null }
          {(!isCreatePanelVisible && editedPanel[name]) ? <div className="panel-control ng-scope">
            <div className="wrap-control-group">
              <div className="control-group right">
                <PTButton className="btn btn-danger" onClick={() => onCancel(name)}>
                  <i className="fa fa-ban" /> Cancel
                </PTButton>
                <PTButton className="btn btn-success" onClick={() => onSaveSettings(formValues, name)}>
                  <i className="fa fa-check" /> Complete
                </PTButton>
              </div>
            </div>
          </div> : null }
        </div>
      </div>
    )
  }
}
