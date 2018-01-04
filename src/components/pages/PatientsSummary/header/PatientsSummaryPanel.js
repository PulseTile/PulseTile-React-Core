import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash/fp';
import { lifecycle } from 'recompose';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';

import PTCustomInput from './PTCustomInput';
import { unmountOnBlur } from '../../../../utils/HOCs/unmount-on-blur.utils'

@lifecycle(unmountOnBlur)
export default class PatientsSummaryPanel extends PureComponent {
    static propTypes = {
      onCategorySelected: PropTypes.func.isRequired,
      onViewOfBoardsSelected: PropTypes.func.isRequired,
      selectedCategory: PropTypes.objectOf(PropTypes.bool).isRequired,
      selectedViewOfBoards: PropTypes.objectOf(PropTypes.bool).isRequired,
    };

    state = {
      selected: this.props.selectedCategory,
      selectedViewOptions: this.props.selectedViewOfBoards
    };

    componentDidUpdate(prevProps, prevState) {
      if (!_.isEqual(prevState.selected, this.state.selected)) this.props.onCategorySelected(this.state.selected)
      if (!_.isEqual(prevState.selectedViewOptions, this.state.selectedViewOptions)) this.props.onViewOfBoardsSelected(this.state.selectedViewOptions)
    }

    toggleCheckbox = key => this.setState((prevState) => {
      const newValue = !_.get(['selected', key])(prevState);
      return _.set(['selected', key], newValue)(prevState);
    });

    toggleRadio = key => this.setState((prevState) => {
      const selectedViewOptions = Object.assign({}, prevState.selectedViewOptions);
      selectedViewOptions.full = false;
      selectedViewOptions.preview = false;
      selectedViewOptions.list = false;
      selectedViewOptions[key] = true;
      return { 'selectedViewOptions': selectedViewOptions };
    });

    render() {
      const { selected, selectedViewOptions } = this.state;

      return (
        <div className="dropdown-menu dropdown-menu-panel dropdown-menu-summary">
          <div className="form-group-wrapper">
            <div className="heading">SHOW</div>
            <div className="form-group">
              <Row>
                <Col xs={6} sm={4}>
                  <PTCustomInput type="checkbox" title="Problems" id="problems" name="problems" isChecked={selected.problems} onChange={this.toggleCheckbox} />
                </Col>
                <Col xs={6} sm={4}>
                  <PTCustomInput type="checkbox" title="Contacts" id="contacts" name="contacts" isChecked={selected.contacts} onChange={this.toggleCheckbox} />
                </Col>
                <Col xs={6} sm={4}>
                  <PTCustomInput type="checkbox" title="Allergies" id="allergies" name="allergies" isChecked={selected.allergies} onChange={this.toggleCheckbox} />
                </Col>
                <Col xs={6} sm={4}>
                  <PTCustomInput type="checkbox" title="Medications" id="medications" name="medications" isChecked={selected.medications} onChange={this.toggleCheckbox} />
                </Col>
                <Col xs={6} sm={4}>
                  <PTCustomInput type="checkbox" title="Vaccinations" id="vaccinations" name="vaccinations" isChecked={selected.vaccinations} onChange={this.toggleCheckbox} />
                </Col>
              </Row>
            </div>

            <div className="heading">VIEW OF BOARDS</div>
            <div className="form-group">
              <Row>
                <Col xs={12}>
                  <PTCustomInput type="radio" title="Full View" id="full" name="view-of-preview" value="full" isChecked={selectedViewOptions.full} onChange={this.toggleRadio} />
                </Col>
              </Row>
              <Row>
                <Col xs={12} sm={6}>
                  <PTCustomInput type="radio" title="Only Preview" id="preview" name="view-of-preview" value="preview" isChecked={selectedViewOptions.preview} onChange={this.toggleRadio} />
                </Col>
                <Col xs={12} sm={6}>
                  <PTCustomInput type="radio" title="Only List" id="list" name="view-of-preview" value="list" isChecked={selectedViewOptions.list} onChange={this.toggleRadio} />
                </Col>
              </Row>
            </div>
          </div>
        </div>
      )
    }
}
