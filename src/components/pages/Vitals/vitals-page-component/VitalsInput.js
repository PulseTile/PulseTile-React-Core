import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import _ from 'lodash/fp';

import VitalsPopover from './VitalsPopover'

export default class VitalsInput extends PureComponent {
  static propTypes = {
    label: PropTypes.string.isRequired,
    labelCheckbox: PropTypes.string,
    placeholder: PropTypes.string,
    input: PropTypes.object.isRequired,
    meta: PropTypes.shape({
      active: PropTypes.bool,
      error: PropTypes.any,
    }).isRequired,
  };

  state = {
    isChanged: false,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.meta.dirty) {
      this.setState({ isChanged: true })
    }
  }

  render() {
    const { addonName, label, placeholder, input, type, meta: { error, touched }, id, disabled, isSubmit, isNotValidate, getHighlighterClass, popoverLabels, vitalStatuses, detail, isInput, withoutPopover } = this.props;
    const { isChanged } = this.state;
    const showError = ((touched || isChanged || isSubmit) && error);
    return (
      <div className={classNames('vitals-group highlighter-wrapper', { 'has-error': showError && !isNotValidate }, { 'has-success': isChanged && !error && !isNotValidate })}>
        <span className={`${getHighlighterClass(input.name)}`} />
        <label className="vitals-label">{label}</label>
        {!withoutPopover ? <VitalsPopover
          title={label}
          popoverLabels={(!_.isEmpty(popoverLabels[input.name])) ? popoverLabels[input.name] : []}
          vitalStatusesType={(!_.isEmpty(vitalStatuses[input.name])) ? vitalStatuses[input.name].type : ''}
          detailValue={detail[input.name]}
          vitalsAddon={addonName}
          isInput={isInput}
          placeholder={placeholder}
          id={id}
          type={type}
          disabled={disabled}
          input={input}
        /> :
          <div className={`input-holder vitals-holder ${vitalStatuses[input.name].type}`}>
            <input
              className="form-control input-sm"
              placeholder={placeholder}
              id={id}
              type={type}
              disabled={disabled}
              {...input}
            />
          </div>}
      </div>
    )
  }
}
