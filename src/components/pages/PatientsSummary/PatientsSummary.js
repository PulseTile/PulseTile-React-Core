import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';

import { themeConfigs } from '../../../themes.config';
import SimpleDashboardPanel from './SimpleDashboardPanel';
import ConfirmationModal from '../../ui-elements/ConfirmationModal/ConfirmationModal';
import PatientsSummaryListHeader from './header/PatientsSummaryListHeader';
import patientSummarySelector from './selectors';
import rssFeedsSelector from '../../../selectors/rss-feeds';
import { patientsSummaryConfig, defaultViewOfBoardsSelected } from './patients-summary.config';
import { fetchPatientSummaryRequest } from '../../../ducks/fetch-patient-summary.duck';
import { fetchPatientSummaryOnMount, fetchGetRssFeedsOnMount } from '../../../utils/HOCs/fetch-patients.utils';
import { fetchGetRssFeedsRequest } from '../../../ducks/fetch-get-rss-feeds.duck';
import { dashboardVisible, dashboardBeing } from '../../../plugins.config';
import imgRss from '../../../assets/images/patients-summary/rss.jpg';

const mapDispatchToProps = dispatch => ({ actions: bindActionCreators({ fetchPatientSummaryRequest, fetchGetRssFeedsRequest }, dispatch) });

const feeds = [
  {
    name: 'BBC Health',
    landingPageUrl: 'http://www.bbc.co.uk/news/health',
    sourceId: 'testSourceID1',
  },
  {
    name: 'NHS Choices',
    landingPageUrl: 'https://www.nhs.uk/news/',
    sourceId: 'testSourceID2',
  },
  {
    name: 'Public Health',
    landingPageUrl: 'https://www.gov.uk/government/organisations/public-health-england',
    sourceId: 'testSourceID3',
  },
  {
    name: 'Leeds Live - Whats on',
    landingPageUrl: 'https://www.leeds-live.co.uk/best-in-leeds/whats-on-news/',
    sourceId: 'testSourceID4',
  },
  {
    name: 'Leeds CC Local News',
    landingPageUrl: 'https://news.leeds.gov.uk/tagfeed/en/tags/Leeds-news',
    sourceId: 'testSourceID5',
  },
];

@connect(rssFeedsSelector)
@connect(patientSummarySelector, mapDispatchToProps)
@compose(lifecycle(fetchPatientSummaryOnMount), lifecycle(fetchGetRssFeedsOnMount))
export default class PatientsSummary extends PureComponent {
    static propTypes = {
      boards: PropTypes.object.isRequired,
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
      let isExternalTransition;
      if (state.indexOf('http://') !== -1 || state.indexOf('https://') !== -1 || state.indexOf('www.') !== -1) {
        isExternalTransition = true;
      } else {
        isExternalTransition = false;
      }

      if (isExternalTransition) {
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
      const { boards, rssFeeds } = this.props;
      const { selectedCategory, selectedViewOfBoards, isDisclaimerModalVisible, isCategory } = this.state;
      let isHasPreview = selectedViewOfBoards.full || selectedViewOfBoards.preview;
      const isHasList = selectedViewOfBoards.full || selectedViewOfBoards.list;

      console.log('rssFeeds', rssFeeds);

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
              />
              <div className="panel-body">
                <div className="dashboard">
                  {patientsSummaryConfig.map((item, index) => {
                    return (selectedCategory[item.key] && dashboardBeing[item.key] !== false ?
                      <SimpleDashboardPanel
                        key={index}
                        title={item.title}
                        items={boards[item.key]}
                        navigateTo={console.log}
                        state={item.state}
                        goToState={this.handleGoToState}
                        srcPrevirew={item.imgPreview}
                        isHasPreview={isHasPreview}
                        isHasList={isHasList}
                      />
                      : null)
                  })}
                  {themeConfigs.isLeedsPHRTheme ? feeds.map((item) => {
                    return (selectedCategory[item.name] ?
                      <SimpleDashboardPanel
                        key={item.name}
                        title={item.name}
                        state={item.landingPageUrl}
                        goToState={this.handleGoToState}
                        items={[
                          {
                            text: 'testUrl1',
                            rssPostUrl: 'http://testUrl1',
                          },
                          {
                            text: 'testUrl2',
                            rssPostUrl: 'http://testUrl2',
                          },
                          {
                            text: 'testUrl3',
                            rssPostUrl: 'http://testUrl3',
                          },
                          {
                            text: 'testUrl4',
                            rssPostUrl: 'http://testUrl4',
                          },
                        ]}
                        srcPrevirew={imgRss}
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
