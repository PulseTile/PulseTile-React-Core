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
    onShow: PropTypes.func,
    onExpand: PropTypes.func.isRequired,
    onEdit: PropTypes.func,
    onCancel: PropTypes.func,
    onSaveSettings: PropTypes.func,
    editedPanel: PropTypes.object,
    isShowControlPanel: PropTypes.bool,
    isEditButton: PropTypes.bool,
  };

  static defaultProps = {
    isShowControlPanel: true,
    isEditButton: true,
  };

  render() {
    const { name, title, children, isOpen, onShow, onExpand, onEdit, editedPanel, onCancel, onSaveSettings, formValues, currentPanel, isCreatePanelVisible, isBtnShowPanel, isShowControlPanel, isEditButton } = this.props;
    return (
      <div className={classNames('panel panel-secondary', { open: isOpen })}>
        <PluginDetailHeader onExpand={onExpand} name={name} title={title} onShow={onShow} currentPanel={currentPanel} isBtnShowPanel={isBtnShowPanel} />
        <div className="panel-body">
          {children}
          {(isShowControlPanel && !isCreatePanelVisible && (_.isUndefined(editedPanel[name]) || !editedPanel[name])) && isEditButton ? <div className="panel-control">
            <div className="wrap-control-group">
              <div className="control-group right">
                <PTButton className="btn btn-success btn-inverse btn-edit" onClick={() => onEdit(name)}>
                  <span className="btn-text"> Edit</span>
                  <i className="btn-icon fa fa-edit" />
                  
                </PTButton>
              </div>
            </div>
          </div> : null }
          {(isShowControlPanel && !isCreatePanelVisible && editedPanel[name]) ? <div className="panel-control">
            <div className="wrap-control-group">
              <div className="control-group right">
                <PTButton className="btn btn-success btn-finished" onClick={() => onCancel(name)}>
                  <span className="btn-text"> Finished</span> 
                  <i className="btn-icon fa fa-check" />
                </PTButton>
                <PTButton className="btn btn-danger btn-cancel" onClick={() => onSaveSettings(formValues, name)}>
                  <span className="btn-text"> Cancel</span>
                </PTButton>
              </div>
            </div>
          </div> : null }
        </div>
      </div>
    )
  }
}
