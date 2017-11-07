import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash/fp';
import { lifecycle } from 'recompose';
import { Row, Col } from 'react-bootstrap';

import PTButton from '../../../ui-elements/PTButton/PTButton';
import PTCustomCheckbox from './PTCustomCheckbox';
import { unmountOnBlur } from '../../../../utils/HOCs/unmount-on-blur.utils'

@lifecycle(unmountOnBlur)
export default class PatientsInfoPanel extends PureComponent {
    static propTypes = {
      onColumnsSelected: PropTypes.func.isRequired,
      selectedColumns: PropTypes.objectOf(PropTypes.bool).isRequired,
    };

    state = {
      isFilterInputVisible: false,
      isPatientInfoPanelVisible: false,
      selected: this.props.selectedColumns,
    };

    componentDidUpdate(prevProps, prevState) {
      if (!_.isEqual(prevState.selected, this.state.selected)) this.props.onColumnsSelected(this.state.selected)
    }

    toggleCheckbox = key => this.setState((prevState) => {
      const newValue = !_.get(['selected', key])(prevState);
      return _.set(['selected', key], newValue)(prevState);
    });

    toggleMultipleCheckboxes = keys => () => {
      const nextCheckedValues = keys.map(_.flow(_.pick(keys), _.every(_.eq(true)))(this.state.selected) ? _.stubFalse : _.stubTrue);
      this.setState(prevState => _.merge(prevState, { selected: _.zipObject(keys, nextCheckedValues) }));
    };

    render() {
      const { selected } = this.state;

      return (
        <div
          className="dropdown-menu dropdown-menu-panel dropdown-menu-right dropdown-menu-summary dropdown-menu-patients"
        >
          <div className="form-group-wrapper">
            <div className="heading">PATIENT INFO</div>
            <div className="form-group">
              <Row>
                <PTCustomCheckbox title="Name" name="name" isChecked={selected.name} disabled />
                <PTCustomCheckbox title="Address" name="address" isChecked={selected.address} onChange={this.toggleCheckbox} />
                <PTCustomCheckbox title="Born" name="dateOfBirth" isChecked={selected.dateOfBirth} disabled />
                <PTCustomCheckbox title="Gender" name="gender" isChecked={selected.gender} disabled />
                <PTCustomCheckbox title="NHS No." name="id" isChecked={selected.id} onChange={this.toggleCheckbox} />
                <Col xs={6} sm={4}>
                  <PTButton className="btn btn-success btn-inverse btn-bold btn-smaller" onClick={this.toggleMultipleCheckboxes(['address', 'id'])}>
                    <span className="btn-text">Select All</span>
                  </PTButton>
                </Col>
              </Row>
              <div className="heading">DATE / TIME</div>
              <div className="form-group">
                <Row>
                  <PTCustomCheckbox title="Orders" name="ordersDate" isChecked={selected.ordersDate} onChange={this.toggleCheckbox} />
                  <PTCustomCheckbox title="Results" name="resultsDate" isChecked={selected.resultsDate} onChange={this.toggleCheckbox} />
                  <PTCustomCheckbox title="Vitals" name="vitalsDate" isChecked={selected.vitalsDate} onChange={this.toggleCheckbox} />
                  <PTCustomCheckbox title="Diagnosis" name="diagnosesDate" isChecked={selected.diagnosesDate} onChange={this.toggleCheckbox} />
                  <Col xs={6} sm={4}>
                    <PTButton className="btn btn-success btn-inverse btn-bold btn-smaller" onClick={this.toggleMultipleCheckboxes(['ordersDate', 'resultsDate', 'vitalsDate', 'diagnosesDate'])}>
                      <span className="btn-text">Select All</span>
                    </PTButton>
                  </Col>
                </Row>
              </div>
              <div className="heading">COUNT</div>
              <div className="form-group">
                <Row>
                  <PTCustomCheckbox title="Orders" name="ordersCount" isChecked={selected.ordersCount} onChange={this.toggleCheckbox} />
                  <PTCustomCheckbox title="Results" name="resultsCount" isChecked={selected.resultsCount} onChange={this.toggleCheckbox} />
                  <PTCustomCheckbox title="Vitals" name="vitalsCount" isChecked={selected.vitalsCount} onChange={this.toggleCheckbox} />
                  <PTCustomCheckbox title="Diagnosis" name="diagnosesCount" isChecked={selected.diagnosesCount} onChange={this.toggleCheckbox} />
                  <Col xs={6} sm={4}>
                    <PTButton className="btn btn-success btn-inverse btn-bold btn-smaller" onClick={this.toggleMultipleCheckboxes(['ordersCount', 'resultsCount', 'vitalsCount', 'diagnosesCount'])}>
                      <span className="btn-text">Select All</span>
                    </PTButton>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        </div>
      )
    }
}
