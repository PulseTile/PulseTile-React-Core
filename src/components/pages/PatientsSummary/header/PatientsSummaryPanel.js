import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash/fp';
import { lifecycle } from 'recompose';
import { Row } from 'react-bootstrap';

import PTCustomCheckbox from './PTCustomCheckbox';
import { unmountOnBlur } from '../../../../utils/HOCs/unmount-on-blur.utils'
import { patientsSummaryConfig } from '../patients-summary.config';

@lifecycle(unmountOnBlur)
export default class PatientsSummaryPanel extends PureComponent {
    static propTypes = {
      onCategorySelected: PropTypes.func.isRequired,
      selectedCategory: PropTypes.objectOf(PropTypes.bool).isRequired,
    };

    state = {
      selected: this.props.selectedCategory,
    };

    componentDidUpdate(prevProps, prevState) {
      if (!_.isEqual(prevState.selected, this.state.selected)) this.props.onCategorySelected(this.state.selected)
    }

    toggleCheckbox = key => this.setState((prevState) => {
      const newValue = !_.get(['selected', key])(prevState);
      return _.set(['selected', key], newValue)(prevState);
    });

    render() {
      const { selected } = this.state;

      return (
        <div className="dropdown-menu dropdown-menu-panel dropdown-menu-summary">
          <div className="form-group-wrapper">
            <div className="heading">SHOW</div>
            <div className="form-group">
              <Row>
                {patientsSummaryConfig.map((item, index) => {
                  return (<PTCustomCheckbox
                    key={index}
                    title={item.title}
                    name={item.nameCheckboxes}
                    isChecked={selected[item.key]}
                    onChange={this.toggleCheckbox}
                  />)
                })}
              </Row>
            </div>
          </div>
        </div>
      )
    }
}
