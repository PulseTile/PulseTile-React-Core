import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class ValidatedTextareaFormGroup extends PureComponent {
  static propTypes = {
    label: PropTypes.string.isRequired,
    input: PropTypes.object.isRequired,
    meta: PropTypes.shape({
      active: PropTypes.bool,
      error: PropTypes.string,
    }).isRequired,
  };

  state={
    isChanged: false,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.meta.dirty) {
      this.setState({ isChanged: true })
    }
  }

  render() {
    const { label, input, meta: { error, touched }, id, isSubmit } = this.props;
    const { isChanged } = this.state;
    const showError = ((touched || isChanged || isSubmit) && error);

    return (
      <div className={classNames('form-group', { 'has-error': showError }, { 'has-success': isChanged && !error })}>
        <label htmlFor={input.name} className="control-label">{label}</label>
        <div className="input-holder">
          <textarea
            className="form-control textarea-big input-sm ng-pristine ng-empty ng-invalid ng-invalid-required ng-touched"
            id={id}
            {...input}
          />
        </div>
        {showError && <span className="required-label">{error}</span>}
      </div>
    )
  }
}
