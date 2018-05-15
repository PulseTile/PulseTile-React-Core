import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';

import { themeConfigs } from '../../../themes.config';
import SimpleDashboardPanel from './SimpleDashboardPanel';
import RssDashboardPanel from './RssDashboardPanel';
import ConfirmationModal from '../../ui-elements/ConfirmationModal/ConfirmationModal';
import PatientsSummaryListHeader from './header/PatientsSummaryListHeader';
import {
    patientProblemsSelector,
    patientContactsSelector,
    patientAllergiesSelector,
    patientMedicationsSelector,
    patientVaccinationsSelector,
    patientTopThreeThingsSelector,
} from './separate-selectors';
import { patientsSummaryConfig, defaultViewOfBoardsSelected } from './patients-summary.config';
import { fetchPatientDiagnosesSynopsisRequest } from '../ProblemsDiagnosis/ducks/fetch-patient-diagnoses.duck';
import { fetchPatientContactsSynopsisRequest } from '../Contacts/ducks/fetch-patient-contacts.duck';
import { fetchPatientAllergiesSynopsisRequest } from '../Allergies/ducks/fetch-patient-allergies.duck';
import { fetchPatientMedicationsSynopsisRequest } from '../Medications/ducks/fetch-patient-medications.duck';
import { fetchPatientVaccinationsSynopsisRequest } from '../Vaccinations/ducks/fetch-patient-vaccinations.duck';
import { fetchPatientTopThreeThingsSynopsisRequest } from '../TopThreeThings/ducks/fetch-patient-top-three-things.duck';
import {
    fetchPatientProblemsSynopsisOnMount,
    fetchPatientContactsSynopsisOnMount,
    fetchPatientAllergiesSynopsisOnMount,
    fetchPatientMedicationsSynopsisOnMount,
    fetchPatientVaccinationsSynopsisOnMount,
    fetchPatientTopThreeThingsSynopsisOnMount,
} from '../../../utils/HOCs/fetch-patients.utils';
import { dashboardVisible, dashboardBeing } from '../../../plugins.config';
import { fetchFeedsRequest } from '../Feeds/ducks/fetch-feeds.duck';
import { feedsSelector } from '../Feeds/selectors';
import { getNameFromUrl } from '../../../utils/rss-helpers';

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({
        fetchPatientDiagnosesSynopsisRequest,
        fetchPatientContactsSynopsisRequest,
        fetchPatientAllergiesSynopsisRequest,
        fetchPatientMedicationsSynopsisRequest,
        fetchPatientVaccinationsSynopsisRequest,
        fetchPatientTopThreeThingsSynopsisRequest,
        fetchFeedsRequest
    }, dispatch) });

const feeds = [
  {
    name: 'NYTimes.com',
    landingPageUrl: 'https://www.nytimes.com/section/health',
    rssFeedUrl: 'http://rss.nytimes.com/services/xml/rss/nyt/Health.xml',
    sourceId: 'testSourceID6',
  }, {
    name: 'BBC Health',
    landingPageUrl: 'http://www.bbc.co.uk/news/health',
    rssFeedUrl: 'http://feeds.bbci.co.uk/news/health/rss.xml?edition=uk#',
    sourceId: 'testSourceID1',
  }, {
    name: 'NHS Choices',
    landingPageUrl: 'https://www.nhs.uk/news/',
    rssFeedUrl: 'https://www.nhs.uk/NHSChoices/shared/RSSFeedGenerator/RSSFeed.aspx?site=News',
    sourceId: 'testSourceID2',
  }, {
    name: 'Public Health',
    landingPageUrl: 'https://www.gov.uk/government/organisations/public-health-england',
    rssFeedUrl: 'https://www.gov.uk/government/organisations/public-health-england.atom',
    sourceId: 'testSourceID3',
  }, {
    name: 'Leeds Live - Whats on',
    landingPageUrl: 'https://www.leeds-live.co.uk/best-in-leeds/whats-on-news/',
    rssFeedUrl: 'https://www.leeds-live.co.uk/best-in-leeds/whats-on-news/?service=rss',
    sourceId: 'testSourceID4',
  }, {
    name: 'Leeds CC Local News',
    landingPageUrl: 'https://news.leeds.gov.uk',
    rssFeedUrl: 'https://news.leeds.gov.uk/tagfeed/en/tags/Leeds-news',
    sourceId: 'testSourceID5',
  },
];

@connect(patientProblemsSelector, mapDispatchToProps)
@connect(patientContactsSelector, mapDispatchToProps)
@connect(patientAllergiesSelector, mapDispatchToProps)
@connect(patientMedicationsSelector, mapDispatchToProps)
@connect(patientVaccinationsSelector, mapDispatchToProps)
@connect(patientTopThreeThingsSelector, mapDispatchToProps)
@connect(feedsSelector)

@compose(lifecycle(fetchPatientProblemsSynopsisOnMount))
@compose(lifecycle(fetchPatientContactsSynopsisOnMount))
@compose(lifecycle(fetchPatientAllergiesSynopsisOnMount))
@compose(lifecycle(fetchPatientMedicationsSynopsisOnMount))
@compose(lifecycle(fetchPatientVaccinationsSynopsisOnMount))
@compose(lifecycle(fetchPatientTopThreeThingsSynopsisOnMount))

export default class PatientsSummary extends PureComponent {
    static propTypes = {
        problems: PropTypes.array.isRequired,
        contacts: PropTypes.array.isRequired,
        allergies: PropTypes.array.isRequired,
        medications: PropTypes.array.isRequired,
        vaccinations: PropTypes.array.isRequired,
        topThreeThings: PropTypes.array.isRequired,
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

    componentDidMount() {
      const { actions } = this.props;
      themeConfigs.isLeedsPHRTheme ? actions.fetchFeedsRequest() : null;
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

      const { problems, contacts, allergies, medications, vaccinations, topThreeThings } = this.props;

        const boards = {
            problems: problems,
            contacts: contacts,
            allergies: allergies,
            medications: medications,
            vaccinations: vaccinations,
            topThreeThings: topThreeThings,
        };

      // const { feeds } = this.props;
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
                    return (selectedCategory[item.key] && dashboardBeing[item.key] !== false ?
                      <SimpleDashboardPanel
                        key={index}
                        title={item.title}
                        items={boards[item.key]}
                        state={item.state}
                        goToState={this.handleGoToState}
                        srcPrevirew={item.imgPreview}
                        isHasPreview={isHasPreview}
                        isHasList={isHasList}
                      />
                      : null)
                  })}
                  {themeConfigs.isLeedsPHRTheme ? feeds.map((item) => {
                    const nameItem = getNameFromUrl(item.landingPageUrl);
                    return (selectedCategory[nameItem] ?
                      <RssDashboardPanel
                        key={nameItem}
                        title={item.name}
                        state={item.landingPageUrl}
                        goToState={this.handleGoToState}
                        rssFeedName={nameItem}
                        rssFeedUrl={item.rssFeedUrl}
                        isHasPreview={isHasPreview}
                        isHasList={isHasList}
                      />
                      : null)
                  }) : null}
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
