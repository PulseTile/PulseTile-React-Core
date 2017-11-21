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
import GenericPluginCreateForm from './GenericPluginCreate/GenericPluginCreateForm';
import { columnsConfig, defaultColumnsSelected } from './table-columns.config'
import { fetchPatientGenericPluginRequest } from './ducks/fetch-patient-generic-plugin.duck';
import { fetchPatientGenericPluginDetailRequest } from './ducks/fetch-patient-generic-plugin-detail.duck';
import { fetchPatientGenericPluginDetailEditRequest } from './ducks/fetch-patient-generic-plugin-detail-edit.duck';
import { fetchPatientGenericPluginCreateRequest } from './ducks/fetch-patient-generic-plugin-create.duck';
import { fetchPatientGenericPluginOnMount } from '../../../utils/HOCs/fetch-patients.utils';
import { patientGenericPluginSelector, patientGenericPluginDetailSelector, genericPluginDetailFormSelector, genericPluginCreateFormStateSelector } from './selectors';
import { clientUrls } from '../../../config/client-urls.constants';
import GenericPluginDetail from './GenericPluginDetail/GenericPluginDetail';
import { valuesNames } from './forms.config';
import { getDDMMMYYYY } from '../../../utils/time-helpers.utils';
import { checkIsValidateForm, operationsOnCollection } from '../../../utils/plugin-helpers.utils';

const GENERIC_PLUGIN_MAIN = 'genericPluginsMain';
const GENERIC_PLUGIN_DETAIL = 'genericPluginsDetail';
const GENERIC_PLUGIN_CREATE = 'genericPluginsCreate';
const GENERIC_PLUGIN_PANEL = 'genericPluginsPanel';

const mapDispatchToProps = dispatch => ({ actions: bindActionCreators({ fetchPatientGenericPluginRequest, fetchPatientGenericPluginDetailRequest, fetchPatientGenericPluginDetailEditRequest, fetchPatientGenericPluginCreateRequest }, dispatch) });

@connect(patientGenericPluginSelector, mapDispatchToProps)
@connect(patientGenericPluginDetailSelector, mapDispatchToProps)
@connect(genericPluginDetailFormSelector)
@connect(genericPluginCreateFormStateSelector)
@compose(lifecycle(fetchPatientGenericPluginOnMount))
export default class GenericPlugin extends PureComponent {
  static propTypes = {
    allGenericPlugin: PropTypes.arrayOf(PropTypes.object),
  };

  static contextTypes = {
    router: PropTypes.shape({
      history: PropTypes.object,
    }),
  };

  state = {
    nameShouldInclude: '',
    selectedColumns: defaultColumnsSelected,
    openedPanel: GENERIC_PLUGIN_PANEL,
    columnNameSortBy: valuesNames.TYPE,
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
    if (this.context.router.history.location.pathname === `${clientUrls.PATIENTS}/${userId}/${clientUrls.GENERIC_PLUGIN}/${sourceId}` && sourceId !== undefined) {
      this.setState({ isSecondPanel: true, isDetailPanelVisible: true, isBtnExpandVisible: true, isBtnCreateVisible: true, isCreatePanelVisible: false })
    }
    if (this.context.router.history.location.pathname === `${clientUrls.PATIENTS}/${userId}/${clientUrls.GENERIC_PLUGIN}/create`) {
      this.setState({ isSecondPanel: true, isBtnExpandVisible: true, isBtnCreateVisible: true, isCreatePanelVisible: true, openedPanel: GENERIC_PLUGIN_CREATE, isDetailPanelVisible: false })
    }
    if (this.context.router.history.location.pathname === `${clientUrls.PATIENTS}/${userId}/${clientUrls.GENERIC_PLUGIN}`) {
      this.setState({ isSecondPanel: false, isBtnExpandVisible: false, isBtnCreateVisible: true, isCreatePanelVisible: false, openedPanel: GENERIC_PLUGIN_PANEL, isDetailPanelVisible: false })
    }

    setTimeout(() => {
      this.setState({ isLoading: false })
    }, 500)
  }

  handleExpand = (name, currentPanel) => {
    if (currentPanel === GENERIC_PLUGIN_MAIN) {
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

  handleDetailGenericPluginClick = (sourceId) => {
    const { actions, userId } = this.props;
    this.setState({ isSecondPanel: true, isDetailPanelVisible: true, isBtnExpandVisible: true, isBtnCreateVisible: true, isCreatePanelVisible: false, openedPanel: GENERIC_PLUGIN_PANEL, editedPanel: {}, expandedPanel: 'all', isLoading: true });
    actions.fetchPatientGenericPluginDetailRequest({ userId, sourceId });
    this.context.router.history.replace(`${clientUrls.PATIENTS}/${userId}/${clientUrls.GENERIC_PLUGIN}/${sourceId}`);
  };

  handleSetOffset = offset => this.setState({ offset });

  handleCreate = () => {
    const { userId } = this.props;
    this.setState({ isBtnCreateVisible: false, isCreatePanelVisible: true, openedPanel: GENERIC_PLUGIN_CREATE, isSecondPanel: true, isDetailPanelVisible: false, isBtnExpandVisible: true, expandedPanel: 'all', isSubmit: false, isLoading: true });
    this.context.router.history.replace(`${clientUrls.PATIENTS}/${userId}/${clientUrls.GENERIC_PLUGIN}/create`);
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

  handleGenericPluginDetailCancel = (name) => {
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
    const { actions, genericPluginFormState } = this.props;
    if (checkIsValidateForm(genericPluginFormState)) {
      actions.fetchPatientGenericPluginDetailEditRequest(this.formValuesToString(formValues, 'edit'));
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
    this.setState({ isBtnCreateVisible: true, isCreatePanelVisible: false, openedPanel: GENERIC_PLUGIN_PANEL, isSecondPanel: false, isBtnExpandVisible: false, expandedPanel: 'all', isSubmit: false, isLoading: true });
    this.context.router.history.replace(`${clientUrls.PATIENTS}/${userId}/${clientUrls.GENERIC_PLUGIN}`);
  };

  handleSaveSettingsCreateForm = (formValues) => {
    const { actions, userId, genericPluginCreateFormState } = this.props;
    if (checkIsValidateForm(genericPluginCreateFormState)) {
      actions.fetchPatientGenericPluginCreateRequest(this.formValuesToString(formValues, 'create'));
      this.context.router.history.replace(`${clientUrls.PATIENTS}/${userId}/${clientUrls.GENERIC_PLUGIN}`);
      this.hideCreateForm();
      this.setState({ isLoading: true });
    } else {
      this.setState({ isSubmit: true });
    }
  };

  formValuesToString = (formValues, formName) => {
    const { userId, genericPluginDetail } = this.props;
    const sendData = {};

    sendData.userId = userId;
    sendData[valuesNames.TYPE] = formValues[valuesNames.TYPE];
    sendData[valuesNames.NOTE] = formValues[valuesNames.NOTE];
    sendData[valuesNames.AUTHOR] = formValues[valuesNames.AUTHOR];

    if (formName === 'edit') {
      sendData[valuesNames.DATE] = formValues[valuesNames.DATE];
      sendData[valuesNames.SOURCE_ID] = genericPluginDetail[valuesNames.SOURCE_ID];
      sendData[valuesNames.SOURCE] = genericPluginDetail[valuesNames.SOURCE];
    }

    if (formName === 'create') {
      sendData[valuesNames.SOURCE] = formValues[valuesNames.SOURCE];
    }

    return sendData;
  };

  hideCreateForm = () => {
    this.setState({ isBtnCreateVisible: true, isCreatePanelVisible: false, openedPanel: GENERIC_PLUGIN_PANEL, isSecondPanel: false, expandedPanel: 'all', isBtnExpandVisible: false })
  };

  formToShowCollection = (collection) => {
    const {columnNameSortBy, sortingOrder, nameShouldInclude} = this.state;

    collection = operationsOnCollection.modificate(collection, [{
      keyFrom: valuesNames.DATE_CREATED,
      keyTo: `${valuesNames.DATE_CREATED}Convert`,
      fn: getDDMMMYYYY
    }]);

    return operationsOnCollection.filterAndSort({
      collection: collection,
      filterBy: nameShouldInclude,
      sortingByKey: columnNameSortBy,
      sortingByOrder: sortingOrder,
      filterKeys: [valuesNames.TYPE, valuesNames.AUTHOR, `${valuesNames.DATE_CREATED}Convert`, valuesNames.SOURCE]
    });
  };

  render() {
    const { selectedColumns, columnNameSortBy, sortingOrder, isSecondPanel, isDetailPanelVisible, isBtnExpandVisible, expandedPanel, openedPanel, isBtnCreateVisible, isCreatePanelVisible, editedPanel, offset, isSubmit, isLoading } = this.state;
    const { allGenericPlugin, genericPluginDetail, genericPluginFormState, genericPluginCreateFormState } = this.props;

    const isPanelDetails = (expandedPanel === GENERIC_PLUGIN_DETAIL || expandedPanel === GENERIC_PLUGIN_PANEL);
    const isPanelMain = (expandedPanel === GENERIC_PLUGIN_MAIN);
    const isPanelCreate = (expandedPanel === GENERIC_PLUGIN_CREATE);

    const columnsToShowConfig = columnsConfig.filter(columnConfig => selectedColumns[columnConfig.key]);

    const filteredGenericPlugin = this.formToShowCollection(allGenericPlugin);

    let sourceId;
    if (!_.isEmpty(genericPluginDetail)) {
      sourceId = genericPluginDetail[valuesNames.SOURCE_ID];
    }

    return (<section className="page-wrapper">
      <div className={classNames('section', { 'full-panel full-panel-main': isPanelMain, 'full-panel full-panel-details': (isPanelDetails || isPanelCreate) })}>
        <Row>
          {(isPanelMain || expandedPanel === 'all') ? <Col xs={12} className={classNames({ 'col-panel-main': isSecondPanel })}>
            <div className="panel panel-primary">
              <PluginListHeader
                onFilterChange={this.handleFilterChange}
                panelTitle="Generic Plugin List"
                isBtnExpandVisible={isBtnExpandVisible}
                isBtnTableVisible
                name={GENERIC_PLUGIN_MAIN}
                onExpand={this.handleExpand}
                currentPanel={GENERIC_PLUGIN_MAIN}
              />
              <PluginMainPanel
                headers={columnsToShowConfig}
                resourceData={allGenericPlugin}
                emptyDataMessage="No Generic Plugin List"
                onHeaderCellClick={this.handleHeaderCellClick}
                onCellClick={this.handleDetailGenericPluginClick}
                columnNameSortBy={columnNameSortBy}
                sortingOrder={sortingOrder}
                table="genericPlugins"
                filteredData={filteredGenericPlugin}
                totalEntriesAmount={_.size(filteredGenericPlugin)}
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
            <GenericPluginDetail
              onExpand={this.handleExpand}
              name={GENERIC_PLUGIN_DETAIL}
              openedPanel={openedPanel}
              expandedPanel={expandedPanel}
              currentPanel={GENERIC_PLUGIN_DETAIL}
              detail={genericPluginDetail}
              onEdit={this.handleEdit}
              editedPanel={editedPanel}
              onCancel={this.handleGenericPluginDetailCancel}
              onSaveSettings={this.handleSaveSettingsDetailForm}
              genericPluginFormValues={genericPluginFormState.values}
              isSubmit={isSubmit}
            />
          </Col> : null}
          {(expandedPanel === 'all' || isPanelCreate) && isCreatePanelVisible && !isDetailPanelVisible ? <Col xs={12} className={classNames({ 'col-panel-details': isSecondPanel })}>
            <PluginCreate
              onExpand={this.handleExpand}
              name={GENERIC_PLUGIN_CREATE}
              openedPanel={openedPanel}
              onShow={this.handleShow}
              expandedPanel={expandedPanel}
              currentPanel={GENERIC_PLUGIN_CREATE}
              onSaveSettings={this.handleSaveSettingsCreateForm}
              formValues={genericPluginCreateFormState.values}
              onCancel={this.handleCreateCancel}
              isCreatePanelVisible={isCreatePanelVisible}
              componentForm={
                <GenericPluginCreateForm isSubmit={isSubmit} />
              }
              title="Create Generic Plugin"
            />
          </Col> : null}
        </Row>
      </div>
    </section>)
  }
}
