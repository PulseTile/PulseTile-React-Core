import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import classNames from 'classnames';
import _ from 'lodash/fp';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { lifecycle, compose } from 'recompose';

import AllergiesListHeader from './header/AllergiesListHeader';
import SortableTable from '../../containers/SortableTable/SortableTable';
import PaginationBlock from '../../presentational/PaginationBlock/PaginationBlock';
import { allergiesColumnsConfig, defaultColumnsSelected } from '../../../config/allergies-table-columns.config'
import { fetchPatientAllergiesRequest } from '../../../ducks/fetch-patient-allergies.duck';
import { fetchPatientAllergiesCreateRequest } from '../../../ducks/fetch-patient-allergies-create.duck';
import { fetchPatientAllergiesDetailRequest } from '../../../ducks/fetch-patient-allergies-detail.duck';
import { fetchPatientAllergiesDetailEditRequest } from '../../../ducks/fetch-patient-allergies-detail-edit.duck';
import { fetchPatientAllergiesOnMount, fetchPatientAllergiesDetailOnMount } from '../../../utils/HOCs/fetch-patients.utils';
import { patientAllergiesSelector, allergiePanelFormStateSelector, allergiesCreateFormStateSelector, metaPanelFormStateSelector, patientAllergiesDetailSelector } from './selectors';
import AllergiesDetail from './AllergiesDetail/AllergiesDetail';
import AllergiesCreate from './AllergiesCreate/AllergiesCreate';
import PTButton from '../../ui-elements/PTButton/PTButton';
import { valuesNames } from './AllergiesCreate/AllergiesCreateForm/values-names.config';
import { clientUrls } from '../../../config/client-urls.constants';

const ALLERGIES_MAIN = 'allergiesMain';
const ALLERGIES_DETAIL = 'allergiesDetail';
const ALLERGIES_CREATE = 'allergiesCreate';
const ALLERGIE_PANEL = 'allergiePanel';
const META_PANEL = 'metaPanel';

const mapDispatchToProps = dispatch => ({ actions: bindActionCreators({ fetchPatientAllergiesRequest, fetchPatientAllergiesCreateRequest, fetchPatientAllergiesDetailRequest, fetchPatientAllergiesDetailEditRequest }, dispatch) });

@connect(patientAllergiesSelector, mapDispatchToProps)
@connect(patientAllergiesDetailSelector, mapDispatchToProps)
@connect(allergiePanelFormStateSelector)
@connect(allergiesCreateFormStateSelector)
@connect(metaPanelFormStateSelector)
@compose(lifecycle(fetchPatientAllergiesOnMount), lifecycle(fetchPatientAllergiesDetailOnMount))
export default class Allergies extends PureComponent {
  static propTypes = {
    allAllergies: PropTypes.arrayOf(PropTypes.object),
    allergiesPerPageAmount: PropTypes.number,
  };

  static contextTypes = {
    router: PropTypes.shape({
      history: PropTypes.object,
    }),
  };

  static defaultProps = {
    allergiesPerPageAmount: 10,
  };

  state = {
    nameShouldInclude: '',
    selectedColumns: defaultColumnsSelected,
    openedPanel: ALLERGIE_PANEL,
    columnNameSortBy: 'cause',
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
  };

  componentWillReceiveProps() {
    const sourceId = this.context.router.route.match.params.sourceId;
    const userId = this.context.router.route.match.params.userId;
    if (this.context.router.history.location.pathname === `${clientUrls.PATIENTS}/${userId}/${clientUrls.ALLERGIES}/${sourceId}` && sourceId !== undefined) {
      this.setState({ isSecondPanel: true, isDetailPanelVisible: true, isBtnExpandVisible: true, isBtnCreateVisible: true, isCreatePanelVisible: false })
    }
  }

  handleFilterChange = ({ target: { value } }) => this.setState({ nameShouldInclude: _.toLower(value) });

  handleHeaderCellClick = (e, { name, sortingOrder }) => this.setState({ columnNameSortBy: name, sortingOrder });

  handleDetailAllergiesClick = (id, name, sourceId) => {
    const { actions, userId } = this.props;
    this.setState({ isSecondPanel: true, isDetailPanelVisible: true, isBtnExpandVisible: true, isBtnCreateVisible: true, isCreatePanelVisible: false, openedPanel: ALLERGIE_PANEL, editedPanel: {} })
    actions.fetchPatientAllergiesDetailRequest({ userId, sourceId });
    this.context.router.history.replace(`${clientUrls.PATIENTS}/${userId}/${clientUrls.ALLERGIES}/${sourceId}`);
  };

  handleExpand = (name, currentPanel) => {
    if (currentPanel === ALLERGIES_MAIN) {
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

  handleShow = (name) => {
    this.setState({ openedPanel: name })
  };

  filterAndSortAllergies = (allergies) => {
    const { columnNameSortBy, sortingOrder, nameShouldInclude } = this.state;
    const filterByCausePredicate = _.flow(_.get('cause'), _.toLower, _.includes(nameShouldInclude));
    const filterByReactionPredicate = _.flow(_.get('reaction'), _.toLower, _.includes(nameShouldInclude));
    const filterBySourcePredicate = _.flow(_.get('source'), _.toLower, _.includes(nameShouldInclude));
    const reverseIfDescOrder = _.cond([
      [_.isEqual('desc'), () => _.reverse],
      [_.stubTrue, () => v => v],
    ])(sortingOrder);

    const filterByCause = _.flow(_.sortBy([columnNameSortBy]), reverseIfDescOrder, _.filter(filterByCausePredicate))(allergies);
    const filterByReaction = _.flow(_.sortBy([columnNameSortBy]), reverseIfDescOrder, _.filter(filterByReactionPredicate))(allergies);
    const filterBySource = _.flow(_.sortBy([columnNameSortBy]), reverseIfDescOrder, _.filter(filterBySourcePredicate))(allergies);

    const filteredAndSortedAllergies = [filterByCause, filterByReaction, filterBySource].filter((item) => {
      return _.size(item) !== 0;
    });

    return _.head(filteredAndSortedAllergies)
  };

  handleCreate = (name) => {
    const { userId } = this.props;
    this.setState({ isBtnCreateVisible: false, isCreatePanelVisible: true, openedPanel: name, isSecondPanel: true, isDetailPanelVisible: false })
    this.context.router.history.replace(`${clientUrls.PATIENTS}/${userId}/${clientUrls.ALLERGIES}/create`);
  };

  handleSaveSettingsCreateForm = (formValues) => {
    const { actions, userId } = this.props;
    actions.fetchPatientAllergiesCreateRequest(this.formValuesToCreateString(formValues));
    setTimeout(() => actions.fetchPatientAllergiesRequest({ userId }), 1000);
    this.context.router.history.replace(`${clientUrls.PATIENTS}/${userId}/${clientUrls.ALLERGIES}`);
    this.hideCreateForm();
  };

  handleSaveSettingsDetailForm = (formValues, name) => {
    const { allergieDetail, actions } = this.props;
    formValues.causeCode = allergieDetail.causeCode;
    formValues.sourceId = '';
    if (name === ALLERGIE_PANEL) {
      allergieDetail.cause = formValues.cause;
      allergieDetail.reaction = formValues.reaction;
      formValues.causeTerminology = allergieDetail.causeTerminology;
    }
    if (name === META_PANEL) {
      allergieDetail.causeTerminology = formValues.causeTerminology;
      formValues.cause = allergieDetail.cause;
      formValues.reaction = allergieDetail.reaction;
    }
    actions.fetchPatientAllergiesDetailEditRequest(this.formValuesToDetailEditString(formValues));
    this.setState(prevState => ({
      editedPanel: {
        ...prevState.editedPanel,
        [name]: false,
      },
    }))
  };

  handleCreateCancel = () => {
    const { userId } = this.props;
    this.setState({ isBtnCreateVisible: true, isCreatePanelVisible: false, openedPanel: ALLERGIE_PANEL, isSecondPanel: false });
    this.context.router.history.replace(`${clientUrls.PATIENTS}/${userId}/${clientUrls.ALLERGIES}`);
  };

  formValuesToCreateString = (formValues) => {
    const { userId } = this.props;
    const isCauseValid = _.isEmpty((formValues[valuesNames.CAUSE]));
    const cause = _.get(valuesNames.CAUSE)(formValues);
    const reaction = _.get(valuesNames.REACTION)(formValues);
    const causeTerminology = _.get(valuesNames.TERMINOLOGY)(formValues);
    const author = _.get(valuesNames.AUTHOR)(formValues);
    const currentDate = _.get(valuesNames.DATE)(formValues);
    const causeCode = _.get(valuesNames.CAUSECODE)(formValues);
    const isImport = _.get(valuesNames.ISIMPORT)(formValues);
    const sourceId = _.get(valuesNames.SOURCEID)(formValues);
    const terminologyCode = _.get(valuesNames.TERMINOLOGYCODE)(formValues);

    if (!isCauseValid) return ({ cause, reaction, causeTerminology, causeCode, isImport, sourceId, userId });
    return ({ cause, reaction, causeTerminology, author, currentDate, causeCode, isImport, sourceId, terminologyCode });
  };

  formValuesToDetailEditString = (formValues) => {
    const { userId } = this.props;
    const isCauseValid = _.isEmpty((formValues[valuesNames.CAUSE]));
    const cause = _.get(valuesNames.CAUSE)(formValues);
    const reaction = _.get(valuesNames.REACTION)(formValues);
    const causeTerminology = _.get(valuesNames.TERMINOLOGY)(formValues);
    const author = _.get(valuesNames.AUTHOR)(formValues);
    const currentDate = _.get(valuesNames.DATE)(formValues);
    const causeCode = _.get(valuesNames.CAUSECODE)(formValues);
    const isImport = _.get(valuesNames.ISIMPORT)(formValues);
    const sourceId = _.get(valuesNames.SOURCEID)(formValues);
    const terminologyCode = _.get(valuesNames.TERMINOLOGYCODE)(formValues);
    const source = 'ethercis';

    if (!isCauseValid) return ({ cause, reaction, causeTerminology, causeCode, sourceId, source, userId });
    return ({ cause, reaction, causeTerminology, author, currentDate, causeCode, isImport, sourceId, terminologyCode });
  };

  hideCreateForm = () => {
    this.setState({ isBtnCreateVisible: true, isCreatePanelVisible: false, openedPanel: ALLERGIE_PANEL, isSecondPanel: false })
  };

  handleEdit = (name) => {
    this.setState(prevState => ({
      editedPanel: {
        ...prevState.editedPanel,
        [name]: true,
      },
    }))
  };

  handleAllergieDetailCancel = (name) => {
    this.setState(prevState => ({
      editedPanel: {
        ...prevState.editedPanel,
        [name]: false,
      },
    }))
  };

  getAllergiesOnFirstPage = (allergies) => {
    const { offset } = this.state;
    const { allergiesPerPageAmount } = this.props;

    return (_.size(allergies) > allergiesPerPageAmount
      ? _.slice(offset, offset + allergiesPerPageAmount)(allergies)
      : allergies)
  };

  shouldHavePagination = allergies => _.size(allergies) > this.props.allergiesPerPageAmount;

  handleSetOffset = offset => this.setState({ offset });

  render() {
    const { selectedColumns, columnNameSortBy, sortingOrder, isSecondPanel, isDetailPanelVisible, isBtnExpandVisible, expandedPanel, openedPanel, isBtnCreateVisible, isCreatePanelVisible, editedPanel, offset } = this.state;
    const { allAllergies, allergiePanelFormState, allergiesCreateFormState, metaPanelFormState, allergieDetail, allergiesPerPageAmount } = this.props;
    const columnsToShowConfig = allergiesColumnsConfig.filter(columnConfig => selectedColumns[columnConfig.key]);
    const filteredAllergies = this.filterAndSortAllergies(allAllergies);

    const isPanelDetails = (expandedPanel === ALLERGIES_DETAIL || expandedPanel === ALLERGIE_PANEL || expandedPanel === META_PANEL);
    const isPanelMain = (expandedPanel === ALLERGIES_MAIN);
    const isPanelCreate = (expandedPanel === ALLERGIES_CREATE);

    const allergiesOnFirstPage = _.flow(this.getAllergiesOnFirstPage)(filteredAllergies);

    return (<section className="page-wrapper">
      <div className={classNames('section', { 'full-panel full-panel-main': isPanelMain, 'full-panel full-panel-details': (isPanelDetails || isPanelCreate) })}>
        <Row>
          {(isPanelMain || expandedPanel === 'all') ? <Col xs={12} className={classNames({ 'col-panel-main': isSecondPanel })}>
            <div className="panel panel-primary">
              <AllergiesListHeader
                onFilterChange={this.handleFilterChange}
                panelTitle="Allergies"
                isBtnExpandVisible={isBtnExpandVisible}
                name={ALLERGIES_MAIN}
                onExpand={this.handleExpand}
                currentPanel={ALLERGIES_MAIN}
              />
              <div className="panel-body">
                <SortableTable
                  headers={columnsToShowConfig}
                  data={allergiesOnFirstPage}
                  onHeaderCellClick={this.handleHeaderCellClick}
                  onCellClick={this.handleDetailAllergiesClick}
                  columnNameSortBy={columnNameSortBy}
                  sortingOrder={sortingOrder}
                />
                <div className="panel-control">
                  <div className="wrap-control-group">
                    {this.shouldHavePagination(filteredAllergies) &&
                    <div className="control-group with-indent left">
                      <PaginationBlock
                        entriesPerPage={allergiesPerPageAmount}
                        totalEntriesAmount={_.size(allAllergies)}
                        offset={offset}
                        setOffset={this.handleSetOffset}
                      />
                    </div>
                    }
                    <div className="control-group with-indent right">
                      {isBtnCreateVisible ? <PTButton className="btn btn-success btn-inverse btn-create" onClick={() => this.handleCreate(ALLERGIES_CREATE)}>
                        <i className="btn-icon fa fa-plus" />
                        <span className="btn-text">Create</span>
                      </PTButton> : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Col> : null}
          {(expandedPanel === 'all' || isPanelDetails) && isDetailPanelVisible && !isCreatePanelVisible ? <Col xs={12} className={classNames({ 'col-panel-details': isSecondPanel })}>
            <AllergiesDetail
              onExpand={this.handleExpand}
              name={ALLERGIES_DETAIL}
              openedPanel={openedPanel}
              onShow={this.handleShow}
              expandedPanel={expandedPanel}
              currentPanel={ALLERGIES_DETAIL}
              detail={allergieDetail}
              onEdit={this.handleEdit}
              editedPanel={editedPanel}
              onCancel={this.handleAllergieDetailCancel}
              onSaveSettings={this.handleSaveSettingsDetailForm}
              allergiePanelFormValues={allergiePanelFormState.values}
              metaPanelFormValues={metaPanelFormState.values}
            />
          </Col> : null}
          {(expandedPanel === 'all' || isPanelCreate) && isCreatePanelVisible && !isDetailPanelVisible ? <Col xs={12} className={classNames({ 'col-panel-details': isSecondPanel })}>
            <AllergiesCreate
              onExpand={this.handleExpand}
              name={ALLERGIES_CREATE}
              openedPanel={openedPanel}
              onShow={this.handleShow}
              expandedPanel={expandedPanel}
              currentPanel={ALLERGIES_CREATE}
              onSaveSettings={this.handleSaveSettingsCreateForm}
              formValues={allergiesCreateFormState.values}
              onCancel={this.handleCreateCancel}
              isCreatePanelVisible={isCreatePanelVisible}
            />
          </Col> : null}
        </Row>
      </div>
    </section>)
  }
}
