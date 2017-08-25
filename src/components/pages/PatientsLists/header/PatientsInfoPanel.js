import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash/fp';
import classNames from 'classnames';
import { Row, Col } from 'react-bootstrap';
import PTButton from '../../../ui-elements/PTButton/PTButton';

const PTCustomCheckbox = ({ title, name, isChecked, disabled = false, onChange }) => {
  const toggleCheckbox = () => !disabled && onChange(name);

  return <Col xs={6} sm={4}>
    <div className="wrap-fcustominp">
      <div className={classNames('fcustominp-state', { disabled })} onClick={toggleCheckbox} >
        <div className="fcustominp">
          <input type="checkbox" name={name} checked={isChecked} onChange={toggleCheckbox} />
          <label htmlFor="patients-table-info-name" />
        </div>
        <label htmlFor={name} className="fcustominp-label">{title}</label>
      </div>
    </div>
  </Col>
}

PTCustomCheckbox.propTypes = {
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  isChecked: PropTypes.bool.isRequired,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
};

export default class PatientsInfoPanel extends PureComponent {
    static propTypes = {
      onSelected: PropTypes.func.isRequired,
    };

    state = {
      isFilterInputVisible: false,
      isPatientInfoPanelVisible: false,
      isChecked: {
        name: true,
        gender: true,
        dateOfBirth: true,
        address: false,
        id: false,
        ordersDate: false,
        resultsDate: false,
        vitalsDate: false,
        diagnosesDate: false,
        ordersCount: false,
        resultsCount: false,
        vitalsCount: false,
        diagnosesCount: false,
      },
    };

    componentDidUpdate(prevProps, prevState) {
      if (!_.isEqual(prevState.isChecked, this.state.isChecked)) this.props.onSelected(this.state.isChecked)
    }

    toggleCheckbox = key => this.setState((prevState) => {
      const newValue = !_.get(['isChecked', key])(prevState);
      return _.set(['isChecked', key], newValue)(prevState);
    });

    render() {
      const { isChecked } = this.state;

      return (
        <div className="dropdown-menu dropdown-menu-panel dropdown-menu-right dropdown-menu-summary dropdown-menu-patients">
          <div className="form-group-wrapper">
            <div className="heading">PATIENT INFO</div>
            <div className="form-group">
              <Row>
                <PTCustomCheckbox title="Name" name="name" isChecked={isChecked.name} disabled />
                <PTCustomCheckbox title="Address" name="address" isChecked={isChecked.address} onChange={this.toggleCheckbox} />
                <PTCustomCheckbox title="Born" name="dateOfBirth" isChecked={isChecked.dateOfBirth} disabled />
                <PTCustomCheckbox title="Gender" name="gender" isChecked={isChecked.gender} disabled />
                <PTCustomCheckbox title="NHS No." name="id" isChecked={isChecked.id} onChange={this.toggleCheckbox} />
                <Col xs={6} sm={4}>
                  <PTButton className="btn btn-success btn-inverse btn-bold btn-smaller" onClick={() => ['address', 'id'].map(this.toggleCheckbox)}>
                    <span className="btn-text">Select All</span>
                  </PTButton>
                </Col>
              </Row>
              <div className="heading">DATE / TIME</div>
              <div className="form-group">
                <Row>
                  <PTCustomCheckbox title="Orders" name="ordersDate" isChecked={isChecked.ordersDate} onChange={this.toggleCheckbox} />
                  <PTCustomCheckbox title="Results" name="resultsDate" isChecked={isChecked.resultsDate} onChange={this.toggleCheckbox} />
                  <PTCustomCheckbox title="Vitals" name="vitalsDate" isChecked={isChecked.vitalsDate} onChange={this.toggleCheckbox} />
                  <PTCustomCheckbox title="Diagnoses" name="diagnosesDate" isChecked={isChecked.diagnosesDate} onChange={this.toggleCheckbox} />
                  <Col xs={6} sm={4}>
                    <PTButton className="btn btn-success btn-inverse btn-bold btn-smaller" onClick={() => ['ordersDate', 'resultsDate', 'vitalsDate', 'diagnosesDate'].map(this.toggleCheckbox)}>
                      <span className="btn-text">Select All</span>
                    </PTButton>
                  </Col>
                </Row>
              </div>
              <div className="heading">COUNT</div>
              <div className="form-group">
                <Row>
                  <PTCustomCheckbox title="Orders" name="ordersCount" isChecked={isChecked.ordersCount} onChange={this.toggleCheckbox} />
                  <PTCustomCheckbox title="Results" name="resultsCount" isChecked={isChecked.resultsCount} onChange={this.toggleCheckbox} />
                  <PTCustomCheckbox title="Vitals" name="vitalsCount" isChecked={isChecked.vitalsCount} onChange={this.toggleCheckbox} />
                  <PTCustomCheckbox title="Diagnoses" name="diagnosesCount" isChecked={isChecked.diagnosesCount} onChange={this.toggleCheckbox} />
                  <Col xs={6} sm={4}>
                    <PTButton className="btn btn-success btn-inverse btn-bold btn-smaller" onClick={() => ['ordersCount', 'resultsCount', 'vitalsCount', 'diagnosesCount'].map(this.toggleCheckbox)}>
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
