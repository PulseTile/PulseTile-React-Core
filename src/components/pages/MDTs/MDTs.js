import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import classNames from 'classnames';
import _ from 'lodash/fp';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { lifecycle, compose } from 'recompose';

import PluginListHeader from '../../plugin-page-component/PluginListHeader';
import PluginCreate from '../../plugin-page-component/PluginCreate';
import PluginMainPanel from '../../plugin-page-component/PluginMainPanel';
import MDTsCreateForm from './MDTsCreate/MDTsCreateForm';
import { columnsConfig, defaultColumnsSelected } from './table-columns.config'
import { valuesNames } from './forms.config';
import { fetchPatientMDTsRequest } from './ducks/fetch-patient-mdts.duck';
import { fetchPatientMDTsDetailRequest } from './ducks/fetch-patient-mdts-detail.duck';
import { fetchPatientMDTsDetailEditRequest } from './ducks/fetch-patient-mdts-detail-edit.duck';
import { fetchPatientMDTsCreateRequest } from './ducks/fetch-patient-mdts-create.duck';
import { fetchPatientMDTsOnMount, fetchPatientMDTsDetailOnMount } from '../../../utils/HOCs/fetch-patients.utils';
import { patientMDTsSelector, patientMDTsDetailSelector, mdtPanelFormSelector, mdtCreateFormStateSelector } from './selectors';
import { clientUrls } from '../../../config/client-urls.constants';
import MDTsDetail from './MDTsDetail/MDTsDetail';
import { getDDMMMYYYY } from '../../../utils/time-helpers.utils';
import { checkIsValidateForm, operationsOnCollection } from '../../../utils/plugin-helpers.utils';

const MDTS_MAIN = 'mdtsMain';
const MDTS_DETAIL = 'mdtsDetail';
const MDTS_CREATE = 'mdtsCreate';
const MDTS_PANEL = 'mdtsPanel';

const mapDispatchToProps = dispatch => ({ actions: bindActionCreators({ fetchPatientMDTsRequest, fetchPatientMDTsDetailRequest, fetchPatientMDTsDetailEditRequest, fetchPatientMDTsCreateRequest }, dispatch) });

@connect(patientMDTsSelector, mapDispatchToProps)
@connect(patientMDTsDetailSelector, mapDispatchToProps)
@connect(mdtPanelFormSelector)
@connect(mdtCreateFormStateSelector)
@compose(lifecycle(fetchPatientMDTsOnMount), lifecycle(fetchPatientMDTsDetailOnMount))
export default class MDTs extends PureComponent {
  static propTypes = {
    allMDTs: PropTypes.arrayOf(PropTypes.object),
  };

  static contextTypes = {
    router: PropTypes.shape({
      history: PropTypes.object,
    }),
  };

  state = {
    nameShouldInclude: '',
    selectedColumns: defaultColumnsSelected,
    openedPanel: MDTS_PANEL,
    columnNameSortBy: valuesNames.DATE_OF_REQUEST,
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
    if (this.context.router.history.location.pathname === `${clientUrls.PATIENTS}/${userId}/${clientUrls.MDTS}/${sourceId}` && sourceId !== undefined) {
      this.setState({ isSecondPanel: true, isDetailPanelVisible: true, isBtnExpandVisible: true, isBtnCreateVisible: true, isCreatePanelVisible: false })
    }
    if (this.context.router.history.location.pathname === `${clientUrls.PATIENTS}/${userId}/${clientUrls.MDTS}/create`) {
      this.setState({ isSecondPanel: true, isBtnExpandVisible: true, isBtnCreateVisible: false, isCreatePanelVisible: true, openedPanel: MDTS_CREATE, isDetailPanelVisible: false })
    }
    if (this.context.router.history.location.pathname === `${clientUrls.PATIENTS}/${userId}/${clientUrls.MDTS}`) {
      this.setState({ isSecondPanel: false, isBtnExpandVisible: false, isBtnCreateVisible: true, isCreatePanelVisible: false, openedPanel: MDTS_PANEL, isDetailPanelVisible: false })
    }

    /* istanbul ignore next */
    setTimeout(() => {
      this.setState({ isLoading: false })
    }, 500)
  }

  handleExpand = (name, currentPanel) => {
    if (currentPanel === MDTS_MAIN) {
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

  handleDetailMDTsClick = (sourceId) => {
    const { actions, userId } = this.props;
    this.setState({ isSecondPanel: true, isDetailPanelVisible: true, isBtnExpandVisible: true, isBtnCreateVisible: true, isCreatePanelVisible: false, openedPanel: MDTS_PANEL, editedPanel: {}, expandedPanel: 'all', isLoading: true });
    actions.fetchPatientMDTsDetailRequest({ userId, sourceId });
    this.context.router.history.push(`${clientUrls.PATIENTS}/${userId}/${clientUrls.MDTS}/${sourceId}`);
  };

  handleSetOffset = offset => this.setState({ offset });

  handleCreate = () => {
    const { userId } = this.props;
    this.setState({ isBtnCreateVisible: false, isCreatePanelVisible: true, openedPanel: MDTS_CREATE, isSecondPanel: true, isDetailPanelVisible: false, isBtnExpandVisible: true, expandedPanel: 'all', isSubmit: false, isLoading: true });
    this.context.router.history.push(`${clientUrls.PATIENTS}/${userId}/${clientUrls.MDTS}/create`);
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

  handleMDTsDetailCancel = (name) => {
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
    const { actions, mdtFormState } = this.props;
    if (checkIsValidateForm(mdtFormState)) {
      actions.fetchPatientMDTsDetailEditRequest(this.formValuesToString(formValues, 'edit'));
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
    this.setState({ isBtnCreateVisible: true, isCreatePanelVisible: false, openedPanel: MDTS_PANEL, isSecondPanel: false, isBtnExpandVisible: false, expandedPanel: 'all', isSubmit: false, isLoading: true });
    this.context.router.history.push(`${clientUrls.PATIENTS}/${userId}/${clientUrls.MDTS}`);
  };

  handleSaveSettingsCreateForm = (formValues) => {
    const { actions, userId, mdtCreateFormState } = this.props;
    if (checkIsValidateForm(mdtCreateFormState)) {
      actions.fetchPatientMDTsCreateRequest(this.formValuesToString(formValues, 'create'));
      this.context.router.history.push(`${clientUrls.PATIENTS}/${userId}/${clientUrls.MDTS}`);
      this.hideCreateForm();
      this.setState({ isLoading: true });
    } else {
      this.setState({ isSubmit: true });
    }
  };

  formValuesToString = (formValues, formName) => {
    const { userId, mdtDetail } = this.props;
    const sendData = {};

    sendData.userId = userId;
    sendData[valuesNames.TEAM] = formValues[valuesNames.TEAM];
    sendData[valuesNames.LINK] = formValues[valuesNames.LINK];
    sendData[valuesNames.QUESTION] = formValues[valuesNames.QUESTION];
    sendData[valuesNames.NOTES] = formValues[valuesNames.NOTES];
    sendData[valuesNames.DATE_OF_REQUEST] = new Date(formValues[valuesNames.DATE_OF_REQUEST]).getTime();
    sendData[valuesNames.DATE_OF_MEETING] = new Date(formValues[valuesNames.DATE_OF_MEETING]).getTime();
    sendData[valuesNames.DATE_CREATED] = new Date().getTime();

    if (formName === 'edit') {
      sendData[valuesNames.SOURCE_ID] = mdtDetail[valuesNames.SOURCE_ID];
      sendData[valuesNames.SOURCE] = mdtDetail[valuesNames.SOURCE];
    }

    if (formName === 'create') {
      sendData[valuesNames.SOURCE] = formValues[valuesNames.SOURCE];
    }

    operationsOnCollection.propsToString(sendData, valuesNames.DATE_OF_REQUEST, valuesNames.DATE_OF_MEETING, valuesNames.DATE_CREATED);
    return sendData;
  };

  hideCreateForm = () => {
    this.setState({ isBtnCreateVisible: true, isCreatePanelVisible: false, openedPanel: MDTS_PANEL, isSecondPanel: false, expandedPanel: 'all', isBtnExpandVisible: false })
  };

  formToShowCollection = (collection) => {
    const {columnNameSortBy, sortingOrder, nameShouldInclude} = this.state;

    collection = operationsOnCollection.modificate(collection, [{
      keyFrom: valuesNames.DATE_OF_REQUEST,
      keyTo: `${valuesNames.DATE_OF_REQUEST}Convert`,
      fn: getDDMMMYYYY
    }, {
      keyFrom: valuesNames.DATE_OF_MEETING,
      keyTo: `${valuesNames.DATE_OF_MEETING}Convert`,
      fn: getDDMMMYYYY
    }]);

    return operationsOnCollection.filterAndSort({
      collection: collection,
      filterBy: nameShouldInclude,
      sortingByKey: columnNameSortBy,
      sortingByOrder: sortingOrder,
      filterKeys: [`${valuesNames.DATE_OF_REQUEST}Convert`, valuesNames.TEAM, `${valuesNames.DATE_OF_MEETING}Convert`, valuesNames.SOURCE]
    });
  };

  render() {
    const { selectedColumns, columnNameSortBy, sortingOrder, isSecondPanel, isDetailPanelVisible, isBtnExpandVisible, expandedPanel, openedPanel, isBtnCreateVisible, isCreatePanelVisible, editedPanel, offset, isSubmit, isLoading } = this.state;
    const { allMDTs, mdtDetail, mdtFormState, mdtCreateFormState } = this.props;

    const isPanelDetails = (expandedPanel === MDTS_DETAIL || expandedPanel === MDTS_PANEL);
    const isPanelMain = (expandedPanel === MDTS_MAIN);
    const isPanelCreate = (expandedPanel === MDTS_CREATE);

    const columnsToShowConfig = columnsConfig.filter(columnConfig => selectedColumns[columnConfig.key]);

    const filteredMDTs = this.formToShowCollection(allMDTs);

    let sourceId;
    if (isDetailPanelVisible && !_.isEmpty(mdtDetail)) {
      sourceId = mdtDetail[valuesNames.SOURCE_ID];
    }

    return (<section className="page-wrapper">
      <div className={classNames('section', { 'full-panel full-panel-main': isPanelMain, 'full-panel full-panel-details': (isPanelDetails || isPanelCreate) })}>
        <Row>
          {(isPanelMain || expandedPanel === 'all') ? <Col xs={12} className={classNames({ 'col-panel-main': isSecondPanel })}>
            <div className="panel panel-primary">
              <PluginListHeader
                onFilterChange={this.handleFilterChange}
                panelTitle="Generic MDT"
                isBtnExpandVisible={isBtnExpandVisible}
                isBtnTableVisible
                name={MDTS_MAIN}
                onExpand={this.handleExpand}
                currentPanel={MDTS_MAIN}
              />
              <PluginMainPanel
                headers={columnsToShowConfig}
                resourceData={allMDTs}
                emptyDataMessage="No MDTs"
                onHeaderCellClick={this.handleHeaderCellClick}
                onCellClick={this.handleDetailMDTsClick}
                columnNameSortBy={columnNameSortBy}
                sortingOrder={sortingOrder}
                table="mdts"
                filteredData={filteredMDTs}
                totalEntriesAmount={_.size(filteredMDTs)}
                offset={offset}
                setOffset={this.handleSetOffset}
                isBtnCreateVisible={isBtnCreateVisible}
                onCreate={this.handleCreate}
                id={sourceId}
                isLoading={isLoading}
              />
            </div>
          </Col> : null }
          {(expandedPanel === 'all' || isPanelDetails) && isDetailPanelVisible && !isCreatePanelVisible ? <Col xs={12} className={classNames({ 'col-panel-details': isSecondPanel })}>
            <MDTsDetail
              onExpand={this.handleExpand}
              name={MDTS_DETAIL}
              openedPanel={openedPanel}
              expandedPanel={expandedPanel}
              currentPanel={MDTS_DETAIL}
              detail={mdtDetail}
              onEdit={this.handleEdit}
              editedPanel={editedPanel}
              onCancel={this.handleMDTsDetailCancel}
              onSaveSettings={this.handleSaveSettingsDetailForm}
              mdtFormValues={mdtFormState.values}
              isSubmit={isSubmit}
            />
          </Col> : null}
          {(expandedPanel === 'all' || isPanelCreate) && isCreatePanelVisible && !isDetailPanelVisible ? <Col xs={12} className={classNames({ 'col-panel-details': isSecondPanel })}>
            <PluginCreate
              onExpand={this.handleExpand}
              name={MDTS_CREATE}
              openedPanel={openedPanel}
              onShow={this.handleShow}
              expandedPanel={expandedPanel}
              currentPanel={MDTS_CREATE}
              onSaveSettings={this.handleSaveSettingsCreateForm}
              formValues={mdtCreateFormState.values}
              onCancel={this.handleCreateCancel}
              isCreatePanelVisible={isCreatePanelVisible}
              componentForm={
                <MDTsCreateForm isSubmit={isSubmit} />
              }
              title="Create Create MDT"
            />
          </Col> : null}
        </Row>
      </div>
    </section>)
  }
}
