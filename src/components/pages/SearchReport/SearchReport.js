import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import qs from 'qs';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import { Row, Col } from 'react-bootstrap';
import _ from 'lodash/fp';
import moment from 'moment';

import PTPanel from '../../ui-elements/PTPanel/PTPanel';
import PatientsChart from '../../containers/PatientsChart/PatientsChart';

import { fetchPatientOnSearch } from '../../../utils/HOCs/fetch-patient-on-search.utils';
import { fetchClinicalQuerySearchRequest } from '../../../ducks/fetch-clinical-query-search.duck';
import { fetchBasicPatientSearchRequest } from '../../../ducks/fetch-basic-patient-search.duck';
import { patientsSelector, clinicalQuerySearchSelector } from './selectors';
import { patientAgeRangesForClinicalSearch } from '../../../config/patients.constants';
import { clientUrls } from '../../../config/client-urls.constants';

const mapDispatchToProps = dispatch => ({ actions: bindActionCreators({ fetchClinicalQuerySearchRequest, fetchBasicPatientSearchRequest }, dispatch) });

@connect(patientsSelector, mapDispatchToProps)
@connect(clinicalQuerySearchSelector)
@compose(lifecycle(fetchPatientOnSearch))
class SearchReport extends PureComponent {
  static contextTypes = {
    router: PropTypes.shape({
      history: PropTypes.object,
    }),
  };

  state = {
    searchResult: '',
  };

  componentDidMount() {
    this.getSearchParams(this.props.clinicalQuerySearch);
  }

  componentWillReceiveProps(nextProps) {
    this.getSearchParams(nextProps.clinicalQuerySearch);
  }

  getSearchParams = (clinicalQuerySearch) => {
    const { router } = this.context;
    const searchString = router.history.location.search.replace('?', '');

    let params = {};
    let paramsText = '';
    const paramsArr = [];

    if (!_.isEmpty(searchString) && !_.isEmpty(clinicalQuerySearch)) {
      params = JSON.parse(qs.parse(searchString).searchString);
    } else {
      this.setState({ searchResult: '' });
    }

    if (params.type) {
      paramsArr.push({
        key: 'Search Type',
        value: params.type,
      });
    }

    if (params.queryContains && params.queryText) {
      paramsArr.push({
        key: 'Search Query',
        value: `contains "${params.queryText}"`,
      });
    }

    if (params.minValue && params.maxValue) {
      paramsArr.push({
        key: 'Age Range',
        value: `${params.minValue}-${params.maxValue}`,
      });
    } else if (params.dateOfBirth) {
      paramsArr.push({
        key: 'Date of Birth',
        value: moment(params.dateOfBirth).format('DD-MMM-YYYY'),
      });
    }

    if (params.sexFemale || params.sexMale) {
      let genderText = '';

      if (params.sexFemale && params.sexMale) {
        genderText = 'All';
      } else if (params.sexFemale) {
        genderText = 'Female';
      } else {
        genderText = 'Male';
      }

      paramsArr.push({
        key: 'Gender',
        value: genderText,
      });
    }

    for (let i = 0; i < paramsArr.length; i++) {
      if (i !== 0) {
        paramsText += ', ';
      }

      paramsText += `${paramsArr[i].key}: ${paramsArr[i].value}`;
    }

    if (paramsText.length) {
      this.setState({ searchResult: `(${paramsText})` });
    } else {
      this.setState({ searchResult: '' });
    }
  };

  handleBarClick = (data) => {
    const { searchResult } = this.state;
    this.context.router.history.push({
      pathname: `${clientUrls.PATIENTS}`,
      state: { data, searchResult },
    });
  };

  render() {
    const { patientsByAge, clinicalQuerySearch } = this.props;
    const { searchResult } = this.state;
    const isChartsDataReceived = patientsByAge.map(_.size).reduce((a, b) => a + b) > 0;
    return (<section className="page-wrapper">
      <Row>
        <Col xs={12}>
          <PTPanel className="col-xs-12" classNameForPanel={`${(!_.isEmpty(searchResult) && !_.isEmpty(clinicalQuerySearch))} ? 'mainPagePanel': ''`} header={<h3 className="panel-title"><i className="fa fa-bar-chart" />{` Patients Sorted By Age ${searchResult}`}</h3>}>
            { (!_.isEmpty(searchResult) && !_.isEmpty(clinicalQuerySearch)) ? <PatientsChart
              title="Found Patients By Clinical Query"
              subTitle={`Clinical Query: ${searchResult}`}
              patients={patientsByAge}
              labels={patientAgeRangesForClinicalSearch}
              borderColor="rgba(126, 41, 205,1)"
              backgroundColor="rgba(126, 41, 205,0.3)"
              isChartsDataReceived={isChartsDataReceived}
              onBarClick={this.handleBarClick}
              isClinicalQueryChart
            /> : <div>There are no results that match your search criteria</div> }
          </PTPanel>
        </Col>
      </Row>
    </section>)
  }
}

export default SearchReport;
