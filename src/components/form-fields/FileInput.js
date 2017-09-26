import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import _ from 'lodash/fp';

export default class FileInput extends PureComponent {
  static propTypes = {
    label: PropTypes.string.isRequired,
    input: PropTypes.object.isRequired,
    meta: PropTypes.shape({
      active: PropTypes.bool,
      error: PropTypes.bool,
    }).isRequired,
    id: PropTypes.string.isRequired,
  };

  onChange = (event) => {
    const { input } = this.props;
    const reader = new FileReader();
    const file = event.target.files[0];

    event.preventDefault();
    reader.onloadend = () => input.onChange(reader.result);
    reader.readAsDataURL(file);
  };

  render() {
    const { label, input: { name, value }, meta: { active, error }, id } = this.props;
    const hasError = !_.isEmpty(error);

    return (
      <div>
        <div className={classNames('form-group', { 'has-error': hasError }, { 'has-success': !hasError && active })}>
          <label htmlFor="applicationLogo" className="control-label">{label}</label>
          <div className="input-holder">
            <div className="wrap-fcustomfile">
              <div className="fcustomfile-control">
                <input
                  className="form-control input-sm"
                  type="file"
                  id={id}
                  onChange={this.onChange}
                />
                <label htmlFor={name} className="btn btn-success btn-inverse btn-normal-icon">
                  <i className="fa fa-plus"/>
                  <span>Upload logo</span>
                </label>
              </div>
              <div className="fcustomfile-text"/>
            </div>
          </div>
          <span className="help-block animate-fade">You must enter a value.</span>
          {hasError && <span className="required-label">{error}</span>}
        </div>
        {!_.isEmpty(value) && <div className="form-group">
          <div className="form-control-static">
            <img src={value} alt="Logo Example" />
          </div>
        </div>}
      </div>
    )
  }
}

