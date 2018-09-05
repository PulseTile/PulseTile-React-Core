import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import { get } from 'lodash';
import { themeConfigs } from '../../../themes.config';
import SimpleDashboardPanel from './SimpleDashboardPanel';
import ConfirmationModal from '../../ui-elements/ConfirmationModal/ConfirmationModal';
import PatientsSummaryListHeader from './header/PatientsSummaryListHeader';
import { summarySynopsisSelector } from './selectors';
import { patientsSummaryConfig, defaultViewOfBoardsSelected } from './patients-summary.config';
import { fetchPatientDiagnosesSynopsisRequest } from '../Diagnosis/ducks/fetch-patient-diagnoses.duck';
import { fetchPatientContactsSynopsisRequest } from '../Contacts/ducks/fetch-patient-contacts.duck';
import { fetchPatientAllergiesSynopsisRequest } from '../Allergies/ducks/fetch-patient-allergies.duck';
import { fetchPatientMedicationsSynopsisRequest } from '../Medications/ducks/fetch-patient-medications.duck';

import {
  fetchPatientProblemsSynopsisOnMount,
  fetchPatientContactsSynopsisOnMount,
  fetchPatientAllergiesSynopsisOnMount,
  fetchPatientMedicationsSynopsisOnMount,
} from '../../../utils/HOCs/fetch-patients.utils';

import { pluginFeedsOnMount } from './non-core-utils';
import FeedsPanel from './FeedsPanel';

import { themeSynopsisOnMount, themeSynopsisRequests } from '../../theme/config/synopsisRequests';
import { dashboardVisible, dashboardBeing } from '../../../plugins.config';
import { testConstants, isDevMode } from '../../../config/for-test.constants';

const coreActionsArray = {
  fetchPatientDiagnosesSynopsisRequest,
  fetchPatientContactsSynopsisRequest,
  fetchPatientAllergiesSynopsisRequest,
  fetchPatientMedicationsSynopsisRequest,
};
const actionsArray = Object.assign(coreActionsArray, themeSynopsisRequests);
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actionsArray, dispatch)
});

@connect(summarySynopsisSelector, mapDispatchToProps)

@compose(
  lifecycle(fetchPatientProblemsSynopsisOnMount),
  lifecycle(fetchPatientContactsSynopsisOnMount),
  lifecycle(fetchPatientAllergiesSynopsisOnMount),
  lifecycle(fetchPatientMedicationsSynopsisOnMount),
  lifecycle(pluginFeedsOnMount),
  lifecycle(themeSynopsisOnMount),
)

export default class PatientsSummary extends PureComponent {
  static propTypes = {
    boards: PropTypes.shape({}).isRequired,
  };

  static contextTypes = {
    router: PropTypes.shape({
      history: PropTypes.object,
    }),
  };

  state = {
    selectedCategory: [],
    selectedViewOfBoards: defaultViewOfBoardsSelected,
    isDisclaimerModalVisible: false,
    isCategory: {},
  };

  componentWillMount() {
    const isShowDisclaimerOfRedirect = localStorage.getItem('isShowDisclaimerOfRedirect');
    localStorage.removeItem('isShowDisclaimerOfRedirect');

    if (isShowDisclaimerOfRedirect) {
      this.setState({ isDisclaimerModalVisible: true });
    }

    this.setState({ selectedCategory: this.getDefaultCategorySelected() });
  }

  getDefaultCategorySelected = () => {
    const defaultCategorySelected = {};

    patientsSummaryConfig.forEach((item) => {
      if (dashboardVisible[item.key] !== undefined) {
        defaultCategorySelected[item.key] = dashboardVisible[item.key];
      } else {
        defaultCategorySelected[item.key] = item.isDefaultSelected;
      }
    });

    return defaultCategorySelected;
  };

  closeDisclaimer = () => this.setState({ isDisclaimerModalVisible: false });

  handleCategorySelected = selectedCategory => this.setState({ selectedCategory });

  handleViewOfBoardsSelected = selectedViewOfBoards => this.setState({ selectedViewOfBoards });

  handleGoToState = (state, externalTransitionUrl) => {
    if (state.indexOf('http://') !== -1 ||
      state.indexOf('https://') !== -1 ||
      state.indexOf('www.') !== -1) {
      if (externalTransitionUrl) {
        window.open(externalTransitionUrl)
      } else {
        window.open(state)
      }
    } else {
      this.context.router.history.push(state)
    }
  };

  render() {

    const { boards } = this.props;
    const feeds = get(boards, 'feeds.feeds', []);

    const { selectedCategory, selectedViewOfBoards, isDisclaimerModalVisible, isCategory } = this.state;
    let isHasPreview = selectedViewOfBoards.full || selectedViewOfBoards.preview;
    const isHasList = selectedViewOfBoards.full || selectedViewOfBoards.list;

    if (!themeConfigs.patientsSummaryHasPreviewSettings) { isHasPreview = false; }

    return (<section className="page-wrapper">
      <Row>
        <Col xs={12}>
          <div className="panel panel-primary panel-dashboard">
            <PatientsSummaryListHeader
              onCategorySelected={this.handleCategorySelected}
              onViewOfBoardsSelected={this.handleViewOfBoardsSelected}
              selectedCategory={selectedCategory}
              selectedViewOfBoards={selectedViewOfBoards}
              title={themeConfigs.patientsSummaryPageName}
              feeds={feeds}
            />
            <div className="panel-body">
              <div className="dashboard">

                {patientsSummaryConfig.map((item, index) => {
                  const imageSource = isDevMode ? (testConstants.hostName + item.imgPreview) : item.imgPreview;
                  return (selectedCategory[item.key] && dashboardBeing[item.key] !== false ?
                    <SimpleDashboardPanel
                      key={index}
                      title={item.title}
                      items={boards[item.key]}
                      state={item.state}
                      goToState={this.handleGoToState}
                      srcPrevirew={imageSource}
                      isHasPreview={isHasPreview}
                      isHasList={isHasList}
                    />
                    : null)
                })}

                {feeds.map((item, index) => {
                  return (
                    <FeedsPanel
                      key={index}
                      item={item}
                      handleGoToState={this.handleGoToState}
                      isHasPreview={isHasPreview}
                      isHasList={isHasList}
                    />
                  );
                })}

              </div>
            </div>
          </div>
        </Col>
      </Row>
      {isDisclaimerModalVisible && <ConfirmationModal
        title={'Notification'}
        isShow
        onOk={this.closeDisclaimer}
        onHide={this.closeDisclaimer}
        isShowOkButton
      >
        <span>You was redirected to your home page because you are logged in as a PHR user.</span>
      </ConfirmationModal>}
    </section>)
  }
}
