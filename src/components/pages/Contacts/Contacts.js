import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import classNames from 'classnames';
import _ from 'lodash/fp';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { lifecycle, compose } from 'recompose';

import ContactsListHeader from './header/ContactsListHeader';
import SortableTable from '../../containers/SortableTable/SortableTable';
import PaginationBlock from '../../presentational/PaginationBlock/PaginationBlock';
import { contactsColumnsConfig, defaultColumnsSelected } from './contacts-table-columns.config'
import { fetchPatientContactsRequest } from './ducks/fetch-patient-contacts.duck';
import { fetchPatientContactsCreateRequest } from './ducks/fetch-patient-contacts-create.duck';
import { fetchPatientContactsDetailRequest } from './ducks/fetch-patient-contacts-detail.duck';
import { fetchPatientContactsDetailEditRequest } from './ducks/fetch-patient-contacts-detail-edit.duck';
import { fetchPatientContactsOnMount, fetchPatientContactsDetailOnMount } from '../../../utils/HOCs/fetch-patients.utils';
import { patientContactsSelector, contactsDetailFormStateSelector, contactsCreateFormStateSelector, metaPanelFormStateSelector, patientContactsDetailSelector } from './selectors';
import ContactsDetail from './ContactsDetail/ContactsDetail';
import ContactsCreate from './ContactsCreate/ContactsCreate';
import PTButton from '../../ui-elements/PTButton/PTButton';
import { valuesNames } from './ContactsCreate/ContactsCreateForm/values-names.config';
import { clientUrls } from '../../../config/client-urls.constants';

const CONTACTS_MAIN = 'contactsMain';
const CONTACTS_DETAIL = 'contactsDetail';
const CONTACTS_CREATE = 'contactsCreate';
const CONTACT_PANEL = 'contactPanel';
const META_PANEL = 'metaPanel';

const mapDispatchToProps = dispatch => ({ actions: bindActionCreators({ fetchPatientContactsRequest, fetchPatientContactsCreateRequest, fetchPatientContactsDetailRequest, fetchPatientContactsDetailEditRequest }, dispatch) });

@connect(patientContactsSelector, mapDispatchToProps)
@connect(patientContactsDetailSelector, mapDispatchToProps)
@connect(contactsDetailFormStateSelector)
@connect(contactsCreateFormStateSelector)
@connect(metaPanelFormStateSelector)
@compose(lifecycle(fetchPatientContactsOnMount), lifecycle(fetchPatientContactsDetailOnMount))

export default class Contacts extends PureComponent {
  static propTypes = {
    allContacts: PropTypes.arrayOf(PropTypes.object),
    contactsPerPageAmount: PropTypes.number,
  };

  static contextTypes = {
    router: PropTypes.shape({
      history: PropTypes.object,
    }),
  };

  static defaultProps = {
    contactsPerPageAmount: 10,
  };

  state = {
    nameShouldInclude: '',
    selectedColumns: defaultColumnsSelected,
    openedPanel: CONTACT_PANEL,
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
    if (this.context.router.history.location.pathname === `${clientUrls.PATIENTS}/${userId}/${clientUrls.CONTACTS}/${sourceId}` && sourceId !== undefined) {
      this.setState({ isSecondPanel: true, isDetailPanelVisible: true, isBtnExpandVisible: true, isBtnCreateVisible: true, isCreatePanelVisible: false })
    }
  }

  handleFilterChange = ({ target: { value } }) => this.setState({ nameShouldInclude: _.toLower(value) });

  handleHeaderCellClick = (e, { name, sortingOrder }) => this.setState({ columnNameSortBy: name, sortingOrder });

  handleDetailContactsClick = (id, name, sourceId) => {
    const { actions, userId } = this.props;
    this.setState({ isSecondPanel: true, isDetailPanelVisible: true, isBtnExpandVisible: true, isBtnCreateVisible: true, isCreatePanelVisible: false, openedPanel: CONTACT_PANEL, editedPanel: {} })
    actions.fetchPatientContactsDetailRequest({ userId, sourceId });
    this.context.router.history.replace(`${clientUrls.PATIENTS}/${userId}/${clientUrls.CONTACTS}/${sourceId}`);
  };

  handleExpand = (name, currentPanel) => {
    if (currentPanel === CONTACTS_MAIN) {
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

  filterAndSortContacts = (contacts) => {
    const { columnNameSortBy, sortingOrder, nameShouldInclude } = this.state;

    const filterByNamePredicate = _.flow(_.get('name'), _.toLower, _.includes(nameShouldInclude));
		const filterByRelationshipPredicate = _.flow(_.get('relationship'), _.toLower, _.includes(nameShouldInclude));
		const filterByNextOfKinPredicate = _.flow(_.get('nextOfKin'), _.toLower, _.includes(nameShouldInclude));
    const filterBySourcePredicate = _.flow(_.get('source'), _.toLower, _.includes(nameShouldInclude));

    const reverseIfDescOrder = _.cond([
      [_.isEqual('desc'), () => _.reverse],
      [_.stubTrue, () => v => v],
    ])(sortingOrder);

    const filterByName = _.flow(_.sortBy([columnNameSortBy]), reverseIfDescOrder, _.filter(filterByNamePredicate))(contacts);
		const filterByRelationship = _.flow(_.sortBy([columnNameSortBy]), reverseIfDescOrder, _.filter(filterByRelationshipPredicate))(contacts);
		const filterByNextOfKin = _.flow(_.sortBy([columnNameSortBy]), reverseIfDescOrder, _.filter(filterByNextOfKinPredicate))(contacts);
    const filterBySource = _.flow(_.sortBy([columnNameSortBy]), reverseIfDescOrder, _.filter(filterBySourcePredicate))(contacts);

    const filteredAndSortedContacts = [filterByName, filterByRelationship, filterByNextOfKin, filterBySource].filter((item) => {
      return _.size(item) !== 0;
    });

    return _.head(filteredAndSortedContacts)
  };

  handleCreate = (name) => {
    const { userId } = this.props;
    this.setState({ isBtnCreateVisible: false, isCreatePanelVisible: true, openedPanel: name, isSecondPanel: true, isDetailPanelVisible: false })
    this.context.router.history.replace(`${clientUrls.PATIENTS}/${userId}/${clientUrls.CONTACTS}/create`);
  };

  handleSaveSettingsCreateForm = (formValues) => {
    const { actions, userId } = this.props;
    actions.fetchPatientContactsCreateRequest(this.formValuesToCreateString(formValues));
    setTimeout(() => actions.fetchPatientContactsRequest({ userId }), 1000);
    this.context.router.history.replace(`${clientUrls.PATIENTS}/${userId}/${clientUrls.CONTACTS}`);
    this.hideCreateForm();
  };

  handleSaveSettingsDetailForm = (formValues, name) => {
    const { actions } = this.props;

    actions.fetchPatientContactsDetailEditRequest(this.formValuesToDetailEditString(formValues));
    this.setState(prevState => ({
      editedPanel: {
        ...prevState.editedPanel,
        [name]: false,
      },
    }))
  };

  handleCreateCancel = () => {
    const { userId } = this.props;
    this.setState({ isBtnCreateVisible: true, isCreatePanelVisible: false, openedPanel: CONTACT_PANEL, isSecondPanel: false });
    this.context.router.history.replace(`${clientUrls.PATIENTS}/${userId}/${clientUrls.CONTACTS}`);
  };

  formValuesToCreateString = (formValues) => {
    const { userId } = this.props;

    const name = _.get(valuesNames.NAME)(formValues);
		let nextOfKin = _.get(valuesNames.NEXT_OF_KIN)(formValues);
		nextOfKin = nextOfKin ? nextOfKin : false;
		const relationship = _.get(valuesNames.REALATIONSHIP)(formValues);
		const relationshipType = _.get(valuesNames.REALATIONSHIP_TYPE)(formValues);
		const relationshipCode = _.get(valuesNames.REALATIONSHIP_CODE)(formValues);
		const relationshipTerminology = _.get(valuesNames.REALATIONSHIP_TERMINOLOGY)(formValues);
		const contactInformation = _.get(valuesNames.CONTACT_INFORMATION)(formValues);
		const notes = _.get(valuesNames.NOTES)(formValues);
		const author = _.get(valuesNames.AUTHOR)(formValues);
		const dateSubmitted = new Date();
		const source = 'ethercis';

    return ({ userId, name, relationship, nextOfKin, relationshipType, relationshipCode, relationshipTerminology, contactInformation, notes, author, dateSubmitted, source });
  };

  formValuesToDetailEditString = (formValues) => {
    const { userId } = this.props;

		const name = _.get(valuesNames.NAME)(formValues);
		const relationship = _.get(valuesNames.REALATIONSHIP)(formValues);
		const nextOfKin = _.get(valuesNames.NEXT_OF_KIN)(formValues);
		const relationshipType = _.get(valuesNames.REALATIONSHIP_TYPE)(formValues);
		const contactInformation = _.get(valuesNames.CONTACT_INFORMATION)(formValues);
		const notes = _.get(valuesNames.NOTES)(formValues);
		const author = _.get(valuesNames.AUTHOR)(formValues);
		const dateSubmitted = new Date();
		const sourceId = _.get(valuesNames.SOURCEID)(formValues);
		const source = 'ethercis';

    return ({ userId, name, relationship, nextOfKin, relationshipType, contactInformation, notes, author, dateSubmitted, source, sourceId });
  };

  hideCreateForm = () => {
    this.setState({ isBtnCreateVisible: true, isCreatePanelVisible: false, openedPanel: CONTACT_PANEL, isSecondPanel: false })
  };

  handleEdit = (name) => {
    this.setState(prevState => ({
      editedPanel: {
        ...prevState.editedPanel,
        [name]: true,
      },
    }))
  };

  handleContactDetailCancel = (name) => {
    this.setState(prevState => ({
      editedPanel: {
        ...prevState.editedPanel,
        [name]: false,
      },
    }))
  };

  getContactsOnFirstPage = (contacts) => {
    const { offset } = this.state;
    const { contactsPerPageAmount } = this.props;

    return (_.size(contacts) > contactsPerPageAmount
      ? _.slice(offset, offset + contactsPerPageAmount)(contacts)
      : contacts)
  };

  shouldHavePagination = contacts => _.size(contacts) > this.props.contactsPerPageAmount;

  handleSetOffset = offset => this.setState({ offset });

	fixContactsItems = (contacts) => contacts.map(el => {
    el.nextOfKin = el.nextOfKin || false;
    return el;
  });

  render() {
    const { selectedColumns, columnNameSortBy, sortingOrder, isSecondPanel, isDetailPanelVisible, isBtnExpandVisible, expandedPanel, openedPanel, isBtnCreateVisible, isCreatePanelVisible, editedPanel, offset } = this.state;
    const { allContacts, contactsDetailFormState, contactsCreateFormState, metaPanelFormState, contactDetail, contactsPerPageAmount } = this.props;
		let fixedAllContacts;

		if (allContacts) {
			fixedAllContacts = this.fixContactsItems(allContacts);
		}

    const columnsToShowConfig = contactsColumnsConfig.filter(columnConfig => selectedColumns[columnConfig.key]);

    const filteredContacts = this.filterAndSortContacts(fixedAllContacts);

    const isPanelDetails = (expandedPanel === CONTACTS_DETAIL || expandedPanel === CONTACT_PANEL || expandedPanel === META_PANEL);
    const isPanelMain = (expandedPanel === CONTACTS_MAIN);
    const isPanelCreate = (expandedPanel === CONTACTS_CREATE);

    const contactsOnFirstPage = _.flow(this.getContactsOnFirstPage)(filteredContacts);

    return (<section className="page-wrapper">
      <div className={classNames('section', { 'full-panel full-panel-main': isPanelMain, 'full-panel full-panel-details': (isPanelDetails || isPanelCreate) })}>
        <Row>
          {(isPanelMain || expandedPanel === 'all') ? <Col xs={12} className={classNames({ 'col-panel-main': isSecondPanel })}>
            <div className="panel panel-primary">
              <ContactsListHeader
                onFilterChange={this.handleFilterChange}
                panelTitle="Contacts"
                isBtnExpandVisible={isBtnExpandVisible}
                name={CONTACTS_MAIN}
                onExpand={this.handleExpand}
                currentPanel={CONTACTS_MAIN}
              />
              <div className="panel-body">
                <SortableTable
                  headers={columnsToShowConfig}
                  data={contactsOnFirstPage}
                  resourceData={allContacts}
                  emptyDataMessage="No contacts"
                  onHeaderCellClick={this.handleHeaderCellClick}
                  onCellClick={this.handleDetailContactsClick}
                  columnNameSortBy={columnNameSortBy}
                  sortingOrder={sortingOrder}
                  table="contacts"
                />
                <div className="panel-control">
                  <div className="wrap-control-group">
                    {this.shouldHavePagination(filteredContacts) &&
                    <div className="control-group with-indent left">
                      <PaginationBlock
                        entriesPerPage={contactsPerPageAmount}
                        totalEntriesAmount={_.size(fixedAllContacts)}
                        offset={offset}
                        setOffset={this.handleSetOffset}
                      />
                    </div>
                    }
                    <div className="control-group with-indent right">
                      {isBtnCreateVisible ? <PTButton className="btn btn-success btn-inverse btn-create" onClick={() => this.handleCreate(CONTACTS_CREATE)}>
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
            <ContactsDetail
              onExpand={this.handleExpand}
              name={CONTACTS_DETAIL}
              openedPanel={openedPanel}
              onShow={this.handleShow}
              expandedPanel={expandedPanel}
              currentPanel={CONTACTS_DETAIL}
              detail={contactDetail}
              onEdit={this.handleEdit}
              editedPanel={editedPanel}
              onCancel={this.handleContactDetailCancel}
              onSaveSettings={this.handleSaveSettingsDetailForm}
              contactsDetailFormValues={contactsDetailFormState.values}
              metaPanelFormValues={metaPanelFormState.values}
            />
          </Col> : null}
          {(expandedPanel === 'all' || isPanelCreate) && isCreatePanelVisible && !isDetailPanelVisible ? <Col xs={12} className={classNames({ 'col-panel-details': isSecondPanel })}>
            <ContactsCreate
              onExpand={this.handleExpand}
              name={CONTACTS_CREATE}
              openedPanel={openedPanel}
              onShow={this.handleShow}
              expandedPanel={expandedPanel}
              currentPanel={CONTACTS_CREATE}
              onSaveSettings={this.handleSaveSettingsCreateForm}
              formValues={contactsCreateFormState.values}
              onCancel={this.handleCreateCancel}
              isCreatePanelVisible={isCreatePanelVisible}
            />
          </Col> : null}
        </Row>
      </div>
    </section>)
  }
}
