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
import { fetchPatientVitalsRequest } from './ducks/fetch-patient-vitals.duck';
import { fetchPatientVitalsCreateRequest } from './ducks/fetch-patient-vitals-create.duck';
import { fetchPatientVitalsDetailRequest } from './ducks/fetch-patient-vitals-detail.duck';
import { fetchPatientVitalsDetailEditRequest } from './ducks/fetch-patient-vitals-detail-edit.duck';
import { fetchPatientVitalsOnMount, fetchPatientVitalsDetailOnMount } from '../../../utils/HOCs/fetch-patients.utils';
import { patientVitalsSelector, vitalsDetailFormStateSelector, vitalsCreateFormStateSelector, patientVitalsDetailSelector } from './selectors';
import { clientUrls } from '../../../config/client-urls.constants';
import { checkIsValidateForm, operationsOnCollection } from '../../../utils/plugin-helpers.utils';
import VitalsDetail from './VitalsDetail/VitalsDetail';
import PluginCreate from '../../plugin-page-component/PluginCreate';
import VitalsCreateForm from './VitalsCreate/VitalsCreateForm'
import { getDDMMMYYYY } from '../../../utils/time-helpers.utils';
import { serviceVitalsSigns } from './viltals-helpers.utils';

const VITALS_MAIN = 'vitalsMain';
const VITALS_DETAIL = 'vitalsDetail';
const VITALS_CREATE = 'vitalsCreate';
const VITAL_PANEL = 'vitalPanel';

const mapDispatchToProps = dispatch => ({ actions: bindActionCreators({ fetchPatientVitalsRequest, fetchPatientVitalsCreateRequest, fetchPatientVitalsDetailRequest, fetchPatientVitalsDetailEditRequest }, dispatch) });

@connect(patientVitalsSelector, mapDispatchToProps)
@connect(patientVitalsDetailSelector, mapDispatchToProps)
@connect(vitalsDetailFormStateSelector)
@connect(vitalsCreateFormStateSelector)
@compose(lifecycle(fetchPatientVitalsOnMount), lifecycle(fetchPatientVitalsDetailOnMount))

export default class Vitals extends PureComponent {
  static propTypes = {
    allVitals: PropTypes.arrayOf(PropTypes.object),
  };

  static contextTypes = {
    router: PropTypes.shape({
      history: PropTypes.object,
    }),
  };

  state = {
    nameShouldInclude: '',
    selectedColumns: defaultColumnsSelected,
    openedPanel: VITAL_PANEL,
    columnNameSortBy: valuesNames.ID,
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
    if (this.context.router.history.location.pathname === `${clientUrls.PATIENTS}/${userId}/${clientUrls.VITALS}/${sourceId}` && sourceId !== undefined) {
      this.setState({ isSecondPanel: true, isDetailPanelVisible: true, isBtnExpandVisible: true, isBtnCreateVisible: true, isCreatePanelVisible: false })
    }
    if (this.context.router.history.location.pathname === `${clientUrls.PATIENTS}/${userId}/${clientUrls.VITALS}/create`) {
      this.setState({ isSecondPanel: true, isBtnExpandVisible: true, isBtnCreateVisible: false, isCreatePanelVisible: true, openedPanel: VITALS_CREATE, isDetailPanelVisible: false })
    }
    if (this.context.router.history.location.pathname === `${clientUrls.PATIENTS}/${userId}/${clientUrls.VITALS}`) {
      this.setState({ isSecondPanel: false, isBtnExpandVisible: false, isBtnCreateVisible: true, isCreatePanelVisible: false, openedPanel: VITAL_PANEL, isDetailPanelVisible: false, expandedPanel: 'all' })
    }

    /* istanbul ignore next */
    setTimeout(() => {
      this.setState({ isLoading: false })
    }, 500)
  }

  handleExpand = (name, currentPanel) => {
    if (currentPanel === VITALS_MAIN) {
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

  handleDetailVitalsClick = (sourceId) => {
    const { actions, userId } = this.props;
    this.setState({ isSecondPanel: true, isDetailPanelVisible: true, isBtnExpandVisible: true, isBtnCreateVisible: true, isCreatePanelVisible: false, openedPanel: VITAL_PANEL, editedPanel: {}, expandedPanel: 'all', isLoading: true })
    actions.fetchPatientVitalsDetailRequest({ userId, sourceId });
    this.context.router.history.replace(`${clientUrls.PATIENTS}/${userId}/${clientUrls.VITALS}/${sourceId}`);
  };

  handleSetOffset = offset => this.setState({ offset });

  handleCreate = () => {
    const { userId } = this.props;
    this.setState({ isBtnCreateVisible: false, isCreatePanelVisible: true, openedPanel: VITALS_CREATE, isSecondPanel: true, isDetailPanelVisible: false, isSubmit: false, isLoading: true })
    this.context.router.history.replace(`${clientUrls.PATIENTS}/${userId}/${clientUrls.VITALS}/create`);
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

  handleVitalDetailCancel = (name) => {
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
    const { actions, vitalsDetailFormState } = this.props;
    if (checkIsValidateForm(vitalsDetailFormState)) {
      actions.fetchPatientVitalsDetailEditRequest(this.formValuesToString(formValues, 'edit'));
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
    this.setState({ isBtnCreateVisible: true, isCreatePanelVisible: false, openedPanel: VITAL_PANEL, isSecondPanel: false, isBtnExpandVisible: false, expandedPanel: 'all', isSubmit: false, isLoading: true });
    this.context.router.history.replace(`${clientUrls.PATIENTS}/${userId}/${clientUrls.VITALS}`);
  };

  handleSaveSettingsCreateForm = (formValues) => {
    const { actions, userId, vitalsCreateFormState } = this.props;

    if (checkIsValidateForm(vitalsCreateFormState)) {
      actions.fetchPatientVitalsCreateRequest(this.formValuesToString(formValues, 'create'));
      this.context.router.history.replace(`${clientUrls.PATIENTS}/${userId}/${clientUrls.VITALS}`);
      this.hideCreateForm();
      this.setState({ isSubmit: false, isLoading: true });
    } else {
      this.setState({ isSubmit: true });
    }
  };

  formValuesToString = (formValues, formName) => {
    const { userId, vitalDetail } = this.props;
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
      sendData[valuesNames.SOURCE_ID] = vitalDetail[valuesNames.SOURCE_ID];
    }

    operationsOnCollection.propsToString(sendData, valuesNames.DATE, valuesNames.DATE_CREATED);
    return sendData;
  };

  hideCreateForm = () => {
    this.setState({ isBtnCreateVisible: true, isCreatePanelVisible: false, openedPanel: VITAL_PANEL, isSecondPanel: false })
  };

  formToShowCollection = (collection) => {
    const { columnNameSortBy, sortingOrder, nameShouldInclude } = this.state;

    collection = operationsOnCollection.modificate(collection, [{
      keyFrom: valuesNames.DATE_CREATED,
      keyTo: `${valuesNames.DATE_CREATED}Convert`,
      fn: getDDMMMYYYY,
    }]);

    return operationsOnCollection.filterAndSort({
      collection,
      filterBy: nameShouldInclude,
      sortingByKey: columnNameSortBy,
      sortingByOrder: sortingOrder,
      filterKeys: [`${valuesNames.DATE_CREATED}Convert`, valuesNames.ID, valuesNames.NEWS_SCORE, valuesNames.SOURCE],
      modeSorting: {
        number: [valuesNames.ID, valuesNames.NEWS_SCORE],
      },
    });
  };

  modificateVitals = (allVitals) => {
    let vitals;
    if (!_.isEmpty(allVitals)) {
      allVitals.map((item, index) => item[valuesNames.ID] = index + 1);
      vitals = serviceVitalsSigns.modificateVitalsArr(allVitals);
    }
    return vitals
  };

  render() {
    const { selectedColumns, columnNameSortBy, sortingOrder, isSecondPanel, isDetailPanelVisible, isBtnExpandVisible, expandedPanel, openedPanel, isBtnCreateVisible, isCreatePanelVisible, editedPanel, offset, isSubmit, isLoading } = this.state;
    const { allVitals, vitalsDetailFormState, vitalsCreateFormState, vitalDetail } = this.props;

    const isPanelDetails = (expandedPanel === VITALS_DETAIL || expandedPanel === VITAL_PANEL);
    const isPanelMain = (expandedPanel === VITALS_MAIN);
    const isPanelCreate = (expandedPanel === VITALS_CREATE);

    const columnsToShowConfig = columnsConfig.filter(columnConfig => selectedColumns[columnConfig.key]);
    const filteredVitals = this.formToShowCollection(this.modificateVitals(allVitals));

    let sourceId;
    if (!_.isEmpty(vitalDetail)) {
      sourceId = vitalDetail.sourceId;
    }

    return (<section className="page-wrapper">
      <div className={classNames('section', { 'full-panel full-panel-main': isPanelMain, 'full-panel full-panel-details': (isPanelDetails || isPanelCreate) })}>
        <Row>
          {(isPanelMain || expandedPanel === 'all') ? <Col xs={12} className={classNames({ 'col-panel-main': isSecondPanel })}>
            <div className="panel panel-primary">
              <PluginListHeader
                onFilterChange={this.handleFilterChange}
                panelTitle="Vitals - News"
                isBtnExpandVisible={isBtnExpandVisible}
                isBtnTableVisible={false}
                name={VITALS_MAIN}
                onExpand={this.handleExpand}
                currentPanel={VITALS_MAIN}
              />
              <PluginMainPanel
                headers={columnsToShowConfig}
                resourceData={allVitals}
                emptyDataMessage="No vitals"
                onHeaderCellClick={this.handleHeaderCellClick}
                onCellClick={this.handleDetailVitalsClick}
                columnNameSortBy={columnNameSortBy}
                sortingOrder={sortingOrder}
                table="vitals"
                filteredData={filteredVitals}
                totalEntriesAmount={_.size(filteredVitals)}
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
            <VitalsDetail
              onExpand={this.handleExpand}
              name={VITALS_DETAIL}
              openedPanel={openedPanel}
              onShow={this.handleShow}
              expandedPanel={expandedPanel}
              currentPanel={VITALS_DETAIL}
              detail={vitalDetail}
              onEdit={this.handleEdit}
              editedPanel={editedPanel}
              onCancel={this.handleVitalDetailCancel}
              onSaveSettings={this.handleSaveSettingsDetailForm}
              vitalsDetailFormValues={vitalsDetailFormState.values}
              isSubmit={isSubmit}
            />
          </Col> : null}
          {(expandedPanel === 'all' || isPanelCreate) && isCreatePanelVisible && !isDetailPanelVisible ? <Col xs={12} className={classNames({ 'col-panel-details': isSecondPanel })}>
            <PluginCreate
              title="Create Vital"
              onExpand={this.handleExpand}
              name={VITALS_CREATE}
              openedPanel={openedPanel}
              onShow={this.handleShow}
              expandedPanel={expandedPanel}
              currentPanel={VITALS_CREATE}
              onSaveSettings={this.handleSaveSettingsCreateForm}
              formValues={vitalsCreateFormState.values}
              onCancel={this.handleCreateCancel}
              isCreatePanelVisible={isCreatePanelVisible}
              componentForm={
                <VitalsCreateForm isSubmit={isSubmit} />
              }
            />
          </Col> : null}
        </Row>
      </div>
    </section>)
  }
}
