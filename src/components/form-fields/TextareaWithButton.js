import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';

export default class TextareaWithButton extends PureComponent {
  static propTypes = {
    button: PropTypes.object.isRequired,
    fieldProps: PropTypes.object.isRequired,
  };

  render() {
    console.log(this.props.fieldProps);
    return (
      <div>
        <div className="control-group right buttoned-control-group">
          {this.props.button}
        </div>
        <Field
          {...this.props.fieldProps}
        />
      </div>
    )
  }
}

