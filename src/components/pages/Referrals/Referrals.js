import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import classNames from 'classnames';
import _ from 'lodash/fp';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { lifecycle, compose } from 'recompose';

import PluginListHeader from '../../plugin-page-component/PluginListHeader';
import PluginMainPanel from '../../plugin-page-component/PluginMainPanel';

import { columnsConfig, defaultColumnsSelected } from './table-columns.config'
import { valuesNames } from './forms.config';
import { fetchPatientReferralsRequest } from './ducks/fetch-patient-referrals.duck';
import { fetchPatientReferralsCreateRequest } from './ducks/fetch-patient-referrals-create.duck';
import { fetchPatientReferralsDetailRequest } from './ducks/fetch-patient-referrals-detail.duck';
import { fetchPatientReferralsDetailEditRequest } from './ducks/fetch-patient-referrals-detail-edit.duck';
import { fetchPatientReferralsOnMount, fetchPatientReferralsDetailOnMount } from '../../../utils/HOCs/fetch-patients.utils';
import { patientReferralsSelector, referralsDetailFormStateSelector, referralsCreateFormStateSelector, metaPanelFormStateSelector, patientReferralsDetailSelector } from './selectors';
import { clientUrls } from '../../../config/client-urls.constants';
import { checkIsValidateForm, operationsOnCollection } from '../../../utils/plugin-helpers.utils';
import ReferralsDetail from './ReferralsDetail/ReferralsDetail';
import PluginCreate from '../../plugin-page-component/PluginCreate';
import ReferralsCreateForm from './ReferralsCreate/ReferralsCreateForm'
import { getDDMMMYYYY } from '../../../utils/time-helpers.utils';

const REFERRALS_MAIN = 'referralsMain';
const REFERRALS_DETAIL = 'referralsDetail';
const REFERRALS_CREATE = 'referralsCreate';
const REFERRAL_PANEL = 'referralPanel';

const mapDispatchToProps = dispatch => ({ actions: bindActionCreators({ fetchPatientReferralsRequest, fetchPatientReferralsCreateRequest, fetchPatientReferralsDetailRequest, fetchPatientReferralsDetailEditRequest }, dispatch) });

@connect(patientReferralsSelector, mapDispatchToProps)
@connect(patientReferralsDetailSelector, mapDispatchToProps)
@connect(referralsDetailFormStateSelector)
@connect(referralsCreateFormStateSelector)
@compose(lifecycle(fetchPatientReferralsOnMount), lifecycle(fetchPatientReferralsDetailOnMount))

export default class Referrals extends PureComponent {
  static propTypes = {
    allReferrals: PropTypes.arrayOf(PropTypes.object),
  };

  static contextTypes = {
    router: PropTypes.shape({
      history: PropTypes.object,
    }),
  };

  state = {
    nameShouldInclude: '',
    selectedColumns: defaultColumnsSelected,
    openedPanel: REFERRAL_PANEL,
    columnNameSortBy: valuesNames.DATE,
    sortingOrder: 'asc',
    expandedPanel: 'all',
    isBtnCreateVisible: true,
    isBtnExpandVisible: false,
    isAllPanelsVisible: false,
    isDetailPanelVisible: false,
    isSecondPanel: false,
    isCreatePanelVisible: false,
    editedPanel: {},
    offset: 0,
    isSubmit: false,
    isLoading: true,
  };

  componentWillReceiveProps() {
    const sourceId = this.context.router.route.match.params.sourceId;
    const userId = this.context.router.route.match.params.userId;

    //TODO should be implemented common function, and the state stored in the store Redux
    if (this.context.router.history.location.pathname === `${clientUrls.PATIENTS}/${userId}/${clientUrls.REFERRALS}/${sourceId}` && sourceId !== undefined) {
      this.setState({ isSecondPanel: true, isDetailPanelVisible: true, isBtnExpandVisible: true, isBtnCreateVisible: true, isCreatePanelVisible: false })
    }
    if (this.context.router.history.location.pathname === `${clientUrls.PATIENTS}/${userId}/${clientUrls.REFERRALS}/create`) {
      this.setState({ isSecondPanel: true, isBtnExpandVisible: true, isBtnCreateVisible: true, isCreatePanelVisible: true, openedPanel: REFERRALS_CREATE, isDetailPanelVisible: false })
    }
    if (this.context.router.history.location.pathname === `${clientUrls.PATIENTS}/${userId}/${clientUrls.REFERRALS}`) {
      this.setState({ isSecondPanel: false, isBtnExpandVisible: false, isBtnCreateVisible: true, isCreatePanelVisible: false, openedPanel: REFERRAL_PANEL, isDetailPanelVisible: false })
    }

    setTimeout(() => {
      this.setState({ isLoading: false })
    }, 500)
  }

  handleExpand = (name, currentPanel) => {
    if (currentPanel === REFERRALS_MAIN) {
      if (this.state.expandedPanel === 'all') {
        this.setState({ expandedPanel: name });
      } else {
        this.setState({ expandedPanel: 'all' });
      }
    } else if (this.state.expandedPanel === 'all') {
      this.setState({ expandedPanel: name, openedPanel: name });
    } else {
      this.setState({ expandedPanel: 'all' });
    }
  };

  handleFilterChange = ({ target: { value } }) => this.setState({ nameShouldInclude: _.toLower(value) });

  handleHeaderCellClick = (e, { name, sortingOrder }) => this.setState({ columnNameSortBy: name, sortingOrder });

  handleDetailReferralsClick = (sourceId) => {
    const { actions, userId } = this.props;
    this.setState({ isSecondPanel: true, isDetailPanelVisible: true, isBtnExpandVisible: true, isBtnCreateVisible: true, isCreatePanelVisible: false, openedPanel: REFERRAL_PANEL, editedPanel: {}, isLoading: true })
    actions.fetchPatientReferralsDetailRequest({ userId, sourceId });
    this.context.router.history.replace(`${clientUrls.PATIENTS}/${userId}/${clientUrls.REFERRALS}/${sourceId}`);
  };

  handleSetOffset = offset => this.setState({ offset });

  handleCreate = () => {
    const { userId } = this.props;
    this.setState({ isBtnCreateVisible: false, isCreatePanelVisible: true, openedPanel: REFERRALS_CREATE, isSecondPanel: true, isDetailPanelVisible: false, isSubmit: false, isLoading: true })
    this.context.router.history.replace(`${clientUrls.PATIENTS}/${userId}/${clientUrls.REFERRALS}/create`);
  };

  handleEdit = (name) => {
    this.setState(prevState => ({
      editedPanel: {
        ...prevState.editedPanel,
        [name]: true,
      },
      isSubmit: false,
    }))
  };

  handleReferralDetailCancel = (name) => {
    this.setState(prevState => ({
      editedPanel: {
        ...prevState.editedPanel,
        [name]: false,
      },
      isSubmit: false,
      isLoading: true,
    }))
  };

  handleSaveSettingsDetailForm = (formValues, name) => {
    const { actions, referralsDetailFormState } = this.props;
    if (checkIsValidateForm(referralsDetailFormState)) {
      actions.fetchPatientReferralsDetailEditRequest(this.formValuesToString(formValues, 'edit'));
      this.setState(prevState => ({
        editedPanel: {
          ...prevState.editedPanel,
          [name]: false,
        },
        isSubmit: false,
        isLoading: true,
      }))
    } else {
      this.setState({ isSubmit: true });
    }
  };

  handleCreateCancel = () => {
    const { userId } = this.props;
    this.setState({ isBtnCreateVisible: true, isCreatePanelVisible: false, openedPanel: REFERRAL_PANEL, isSecondPanel: false, isBtnExpandVisible: false, expandedPanel: 'all', isSubmit: false, isLoading: true });
    this.context.router.history.replace(`${clientUrls.PATIENTS}/${userId}/${clientUrls.REFERRALS}`);
  };

  handleSaveSettingsCreateForm = (formValues) => {
    const { actions, userId, referralsCreateFormState } = this.props;

    if (checkIsValidateForm(referralsCreateFormState)) {
      actions.fetchPatientReferralsCreateRequest(this.formValuesToString(formValues, 'create'));
      this.context.router.history.replace(`${clientUrls.PATIENTS}/${userId}/${clientUrls.REFERRALS}`);
      this.hideCreateForm();
      this.setState({ isSubmit: false, isLoading: true });
    } else {
      this.setState({ isSubmit: true });
    }
  };

  formValuesToString = (formValues, formName) => {
    const { userId, referralDetail } = this.props;
    const sendData = {};
    const currentDate = new Date();

    sendData.userId = userId;

    sendData[valuesNames.FROM] = formValues[valuesNames.FROM];
    sendData[valuesNames.TO] = formValues[valuesNames.TO];
    sendData[valuesNames.DATE] = new Date(formValues[valuesNames.DATE]);
    sendData[valuesNames.REASON] = formValues[valuesNames.REASON];
    sendData[valuesNames.SUMMARY] = formValues[valuesNames.SUMMARY];
    sendData[valuesNames.AUTHOR] = formValues[valuesNames.AUTHOR];
    sendData[valuesNames.DATE_CREATED] = currentDate;
    sendData[valuesNames.SOURCE] = 'ethercis';

    if (formName === 'edit') {
      sendData[valuesNames.SOURCE_ID] = referralDetail[valuesNames.SOURCE_ID];
    }

    return sendData;
  };

  hideCreateForm = () => {
    this.setState({ isBtnCreateVisible: true, isCreatePanelVisible: false, openedPanel: REFERRAL_PANEL, isSecondPanel: false })
  };

  handleShow = (name) => {
    this.setState({ openedPanel: name })
  };

  formToShowCollection = (collection) => {
    const {columnNameSortBy, sortingOrder, nameShouldInclude} = this.state;

    collection = operationsOnCollection.modificate(collection, [{
      keyFrom: valuesNames.DATE,
      keyTo: `${valuesNames.DATE}Convert`,
      fn: getDDMMMYYYY
    }]);

    return operationsOnCollection.filterAndSort({
      collection: collection,
      filterBy: nameShouldInclude,
      sortingByKey: columnNameSortBy,
      sortingByOrder: sortingOrder,
      filterKeys: [`${valuesNames.DATE}Convert`, valuesNames.FROM, valuesNames.TO, valuesNames.SOURCE]
    });
  };

  render() {
    const { selectedColumns, columnNameSortBy, sortingOrder, isSecondPanel, isDetailPanelVisible, isBtnExpandVisible, expandedPanel, openedPanel, isBtnCreateVisible, isCreatePanelVisible, editedPanel, offset, isSubmit, isLoading } = this.state;
    const { allReferrals, referralsDetailFormState, referralsCreateFormState, metaPanelFormState, referralDetail, referralsPerPageAmount } = this.props;

    const isPanelDetails = (expandedPanel === REFERRALS_DETAIL || expandedPanel === REFERRAL_PANEL);
    const isPanelMain = (expandedPanel === REFERRALS_MAIN);
    const isPanelCreate = (expandedPanel === REFERRALS_CREATE);

    const columnsToShowConfig = columnsConfig.filter(columnConfig => selectedColumns[columnConfig.key]);

    const filteredReferrals = this.formToShowCollection(allReferrals);

    let sourceId;
    if (!_.isEmpty(referralDetail)) {
      sourceId = referralDetail.sourceId;
    }

    return (<section className="page-wrapper">
      <div className={classNames('section', { 'full-panel full-panel-main': isPanelMain, 'full-panel full-panel-details': (isPanelDetails || isPanelCreate) })}>
        <Row>
          {(isPanelMain || expandedPanel === 'all') ? <Col xs={12} className={classNames({ 'col-panel-main': isSecondPanel })}>
            <div className="panel panel-primary">
              <PluginListHeader
                onFilterChange={this.handleFilterChange}
                panelTitle="Referrals"
                isBtnExpandVisible={isBtnExpandVisible}
                isBtnTableVisible={false}
                name={REFERRALS_MAIN}
                onExpand={this.handleExpand}
                currentPanel={REFERRALS_MAIN}
              />
              <PluginMainPanel
                headers={columnsToShowConfig}
                resourceData={allReferrals}
                emptyDataMessage="No referrals"
                onHeaderCellClick={this.handleHeaderCellClick}
                onCellClick={this.handleDetailReferralsClick}
                columnNameSortBy={columnNameSortBy}
                sortingOrder={sortingOrder}
                table="referrals"
                filteredData={filteredReferrals}
                totalEntriesAmount={_.size(filteredReferrals)}
                offset={offset}
                setOffset={this.handleSetOffset}
                isBtnCreateVisible={isBtnCreateVisible}
                onCreate={this.handleCreate}
                id={sourceId}
                isLoading={isLoading}
              />
            </div>
          </Col> : null}
          {(expandedPanel === 'all' || isPanelDetails) && isDetailPanelVisible && !isCreatePanelVisible ? <Col xs={12} className={classNames({ 'col-panel-details': isSecondPanel })}>
            <ReferralsDetail
              onExpand={this.handleExpand}
              name={REFERRALS_DETAIL}
              openedPanel={openedPanel}
              onShow={this.handleShow}
              expandedPanel={expandedPanel}
              currentPanel={REFERRALS_DETAIL}
              detail={referralDetail}
              onEdit={this.handleEdit}
              editedPanel={editedPanel}
              onCancel={this.handleReferralDetailCancel}
              onSaveSettings={this.handleSaveSettingsDetailForm}
              referralsDetailFormValues={referralsDetailFormState.values}
              isSubmit={isSubmit}
            />
          </Col> : null}
          {(expandedPanel === 'all' || isPanelCreate) && isCreatePanelVisible && !isDetailPanelVisible ? <Col xs={12} className={classNames({ 'col-panel-details': isSecondPanel })}>
            <PluginCreate
              title="Create Referral"
              onExpand={this.handleExpand}
              name={REFERRALS_CREATE}
              openedPanel={openedPanel}
              onShow={this.handleShow}
              expandedPanel={expandedPanel}
              currentPanel={REFERRALS_CREATE}
              onSaveSettings={this.handleSaveSettingsCreateForm}
              formValues={referralsCreateFormState.values}
              onCancel={this.handleCreateCancel}
              isCreatePanelVisible={isCreatePanelVisible}
              componentForm={
                <ReferralsCreateForm isSubmit={isSubmit} />
              }
            />
          </Col> : null}
        </Row>
      </div>
    </section>)
  }
}
