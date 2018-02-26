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
import PluginBanner from '../../plugin-page-component/PluginBanner';

import { columnsConfig, defaultColumnsSelected } from './table-columns.config'
import { valuesNames } from './forms.config';
import { defaultFormValues } from './ContactsCreate/default-values.config';

import { fetchPatientContactsRequest } from './ducks/fetch-patient-contacts.duck';
import { fetchPatientContactsCreateRequest } from './ducks/fetch-patient-contacts-create.duck';
import { fetchPatientContactsDetailRequest } from './ducks/fetch-patient-contacts-detail.duck';
import { fetchPatientContactsDetailEditRequest } from './ducks/fetch-patient-contacts-detail-edit.duck';
import { fetchPatientContactsOnMount, fetchPatientContactsDetailOnMount } from '../../../utils/HOCs/fetch-patients.utils';
import { patientContactsSelector, contactsDetailFormStateSelector, contactsCreateFormStateSelector, metaPanelFormStateSelector, patientContactsDetailSelector } from './selectors';
import { clientUrls } from '../../../config/client-urls.constants';
import { checkIsValidateForm, operationsOnCollection } from '../../../utils/plugin-helpers.utils';
import ContactsDetail from './ContactsDetail/ContactsDetail';
import PluginCreate from '../../plugin-page-component/PluginCreate';
import ContactsCreateForm from './ContactsCreate/ContactsCreateForm'
import imgBanner from '../../../assets/images/banners/contacts.jpg';

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
  };

  static contextTypes = {
    router: PropTypes.shape({
      history: PropTypes.object,
    }),
  };

  state = {
    nameShouldInclude: '',
    selectedColumns: defaultColumnsSelected,
    openedPanel: CONTACT_PANEL,
    columnNameSortBy: valuesNames.NAME,
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
    if (this.context.router.history.location.pathname === `${clientUrls.PATIENTS}/${userId}/${clientUrls.CONTACTS}/${sourceId}` && sourceId !== undefined) {
      this.setState({ isSecondPanel: true, isDetailPanelVisible: true, isBtnExpandVisible: true, isBtnCreateVisible: true, isCreatePanelVisible: false })
    }
    if (this.context.router.history.location.pathname === `${clientUrls.PATIENTS}/${userId}/${clientUrls.CONTACTS}/create`) {
      this.setState({ isSecondPanel: true, isBtnExpandVisible: true, isBtnCreateVisible: false, isCreatePanelVisible: true, openedPanel: CONTACTS_CREATE, isDetailPanelVisible: false })
    }
    if (this.context.router.history.location.pathname === `${clientUrls.PATIENTS}/${userId}/${clientUrls.CONTACTS}`) {
      this.setState({ isSecondPanel: false, isBtnExpandVisible: false, isBtnCreateVisible: true, isCreatePanelVisible: false, openedPanel: CONTACT_PANEL, isDetailPanelVisible: false, expandedPanel: 'all' })
    }

    /* istanbul ignore next */
    setTimeout(() => {
      this.setState({ isLoading: false })
    }, 500)
  }

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

  handleFilterChange = ({ target: { value } }) => this.setState({ nameShouldInclude: _.toLower(value) });

  handleHeaderCellClick = (e, { name, sortingOrder }) => this.setState({ columnNameSortBy: name, sortingOrder });

  handleDetailContactsClick = (sourceId) => {
    const { actions, userId } = this.props;
    this.setState({ isSecondPanel: true, isDetailPanelVisible: true, isBtnExpandVisible: true, isBtnCreateVisible: true, isCreatePanelVisible: false, openedPanel: CONTACT_PANEL, editedPanel: {}, expandedPanel: 'all', isLoading: true })
    actions.fetchPatientContactsDetailRequest({ userId, sourceId });
    this.context.router.history.push(`${clientUrls.PATIENTS}/${userId}/${clientUrls.CONTACTS}/${sourceId}`);
  };

 handleSetOffset = offset => this.setState({ offset });

  handleCreate = () => {
    const { userId } = this.props;
    this.setState({ isBtnCreateVisible: false, isCreatePanelVisible: true, openedPanel: CONTACTS_CREATE, isSecondPanel: true, isDetailPanelVisible: false, isSubmit: false, isLoading: true })
    this.context.router.history.push(`${clientUrls.PATIENTS}/${userId}/${clientUrls.CONTACTS}/create`);
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

 handleContactDetailCancel = (name) => {
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
   const { actions, contactsDetailFormState } = this.props;
   if (checkIsValidateForm(contactsDetailFormState)) {
     actions.fetchPatientContactsDetailEditRequest(this.formValuesToString(formValues, 'edit'));
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
   this.setState({ isBtnCreateVisible: true, isCreatePanelVisible: false, openedPanel: CONTACT_PANEL, isSecondPanel: false, isBtnExpandVisible: false, expandedPanel: 'all', isSubmit: false, isLoading: true });
   this.context.router.history.push(`${clientUrls.PATIENTS}/${userId}/${clientUrls.CONTACTS}`);
 };

 handleSaveSettingsCreateForm = (formValues) => {
   const { actions, userId, contactsCreateFormState } = this.props;

   if (checkIsValidateForm(contactsCreateFormState)) {
     actions.fetchPatientContactsCreateRequest(this.formValuesToString(formValues, 'create'));
     this.context.router.history.push(`${clientUrls.PATIENTS}/${userId}/${clientUrls.CONTACTS}`);
     this.hideCreateForm();
     this.setState({ isSubmit: false, isLoading: true });
   } else {
     this.setState({ isSubmit: true });
   }
 };

 formValuesToString = (formValues, formName) => {
   const { userId, contactDetail } = this.props;
   const sendData = {};

   sendData.userId = userId;
   sendData[valuesNames.NAME] = formValues[valuesNames.NAME];
   sendData[valuesNames.NEXT_OF_KIN] = formValues[valuesNames.NEXT_OF_KIN] || false;
   sendData[valuesNames.REALATIONSHIP] = formValues[valuesNames.REALATIONSHIP];
   sendData[valuesNames.REALATIONSHIP_CODE] = formValues[valuesNames.REALATIONSHIP_CODE];
   sendData[valuesNames.REALATIONSHIP_TERMINOLOGY] = defaultFormValues[valuesNames.REALATIONSHIP_TERMINOLOGY];
   sendData[valuesNames.CONTACT_INFORMATION] = formValues[valuesNames.CONTACT_INFORMATION];
   sendData[valuesNames.NOTES] = formValues[valuesNames.NOTES];
   sendData[valuesNames.AUTHOR] = formValues[valuesNames.AUTHOR];
   sendData[valuesNames.DATE_SUBMITTED] = new Date();
   sendData[valuesNames.SOURCE] = 'ethercis';

   if (formName === 'edit') {
     sendData[valuesNames.SOURCE_ID] = contactDetail[valuesNames.SOURCE_ID];
   }

   operationsOnCollection.propsToString(sendData, valuesNames.DATE_SUBMITTED);
   return sendData;
 };

  hideCreateForm = () => {
    this.setState({ isBtnCreateVisible: true, isCreatePanelVisible: false, openedPanel: CONTACT_PANEL, isSecondPanel: false })
  };

  handleShow = (name) => {
    this.setState({ openedPanel: name })
  };

  formToShowCollection = (collection) => {
    const { columnNameSortBy, sortingOrder, nameShouldInclude } = this.state;

    return operationsOnCollection.filterAndSort({
      collection,
      filterBy: nameShouldInclude,
      sortingByKey: columnNameSortBy,
      sortingByOrder: sortingOrder,
      filterKeys: [valuesNames.NAME, valuesNames.REALATIONSHIP, valuesNames.NEXT_OF_KIN, valuesNames.SOURCE],
    });
  };

  render() {
    const { selectedColumns, columnNameSortBy, sortingOrder, isSecondPanel, isDetailPanelVisible, isBtnExpandVisible, expandedPanel, openedPanel, isBtnCreateVisible, isCreatePanelVisible, editedPanel, offset, isSubmit, isLoading } = this.state;
    const { allContacts, contactsDetailFormState, contactsCreateFormState, metaPanelFormState, contactDetail } = this.props;

    const isPanelDetails = (expandedPanel === CONTACTS_DETAIL || expandedPanel === CONTACT_PANEL || expandedPanel === META_PANEL);
    const isPanelMain = (expandedPanel === CONTACTS_MAIN);
    const isPanelCreate = (expandedPanel === CONTACTS_CREATE);

    const filteredContacts = this.formToShowCollection(allContacts);

    const columnsToShowConfig = columnsConfig.filter(columnConfig => selectedColumns[columnConfig.key]);

    let sourceId;
    if (isDetailPanelVisible && !_.isEmpty(contactDetail)) {
      sourceId = contactDetail[valuesNames.SOURCE_ID];
    }

    return (<section className="page-wrapper">
      {!(isDetailPanelVisible || isCreatePanelVisible) ?
        <PluginBanner
          title="Contacts"
          subTitle="Short blurb containing a few words to describe this section"
          img={imgBanner}
        />
        : null
      }
      <div className={classNames('section', { 'full-panel full-panel-main': isPanelMain, 'full-panel full-panel-details': (isPanelDetails || isPanelCreate) })}>
        <Row>
          {(isPanelMain || expandedPanel === 'all') ? <Col xs={12} className={classNames({ 'col-panel-main': isSecondPanel })}>
            <div className="panel panel-primary">
              <PluginListHeader
                onFilterChange={this.handleFilterChange}
                panelTitle="Contacts"
                isBtnExpandVisible={isBtnExpandVisible}
                isBtnTableVisible={false}
                name={CONTACTS_MAIN}
                onExpand={this.handleExpand}
                currentPanel={CONTACTS_MAIN}
              />
              <PluginMainPanel
                headers={columnsToShowConfig}
                resourceData={allContacts}
                emptyDataMessage="No contacts"
                onHeaderCellClick={this.handleHeaderCellClick}
                onCellClick={this.handleDetailContactsClick}
                columnNameSortBy={columnNameSortBy}
                sortingOrder={sortingOrder}
                table="contacts"
                filteredData={filteredContacts}
                totalEntriesAmount={_.size(filteredContacts)}
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
              isSubmit={isSubmit}
            />
          </Col> : null}
          {(expandedPanel === 'all' || isPanelCreate) && isCreatePanelVisible && !isDetailPanelVisible ? <Col xs={12} className={classNames({ 'col-panel-details': isSecondPanel })}>
            <PluginCreate
              title="Create Contact"
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
              componentForm={
                <ContactsCreateForm isSubmit={isSubmit} />
              }
            />
          </Col> : null}
        </Row>
      </div>
    </section>)
  }
}
