import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import classNames from 'classnames';
import _ from 'lodash/fp';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { lifecycle } from 'recompose';

import AllergiesListHeader from './header/AllergiesListHeader';
import SortableTable from '../../containers/SortableTable/SortableTable';
import { allergiesColumnsConfig, defaultColumnsSelected } from '../../../config/allergies-table-columns.config'
import { fetchPatientAllergiesRequest } from '../../../ducks/fetch-patient-allergies.duck';
import { fetchPatientAllergiesOnMount } from '../../../utils/HOCs/fetch-patients.utils';
import patientAllergiesSelector from './selectors';
import AllergiesDetail from './AllergiesDetail/AllergiesDetail';
import AllergiesCreate from './AllergiesCreate/AllergiesCreate';
import PTButton from '../../ui-elements/PTButton/PTButton';

const ALLERGIES_MAIN = 'allergiesMain';
const ALLERGIES_DETAIL = 'allergiesDetail';
const ALLERGIES_CREATE = 'allergiesCreate';
const ALLERGIE_PANEL = 'allergiePanel';
const META_PANEL = 'metaPanel';

const mapDispatchToProps = dispatch => ({ actions: bindActionCreators({ fetchPatientAllergiesRequest }, dispatch) });

@connect(patientAllergiesSelector, mapDispatchToProps)
@lifecycle(fetchPatientAllergiesOnMount)
export default class Allergies extends PureComponent {
  static propTypes = {
    allAllergies: PropTypes.arrayOf(PropTypes.object),
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
  };

  handleFilterChange = ({ target: { value } }) => this.setState({ nameShouldInclude: _.toLower(value) });

  handleHeaderCellClick = (e, { name, sortingOrder }) => this.setState({ columnNameSortBy: name, sortingOrder });

  handleDetailAllergiesClick = () => {
    this.setState({ isSecondPanel: true, isDetailPanelVisible: true, isBtnExpandVisible: true, isBtnCreateVisible: true, isCreatePanelVisible: false, openedPanel: ALLERGIE_PANEL })
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
    const reverseIfDescOrder = _.cond([
      [_.isEqual('desc'), () => _.reverse],
      [_.stubTrue, () => v => v],
    ])(sortingOrder);

    return _.flow(
      _.sortBy([columnNameSortBy]),
      reverseIfDescOrder,
      _.filter(filterByCausePredicate)
    )(allergies);
  };

  handleCreate = (name) => {
    this.setState({ isBtnCreateVisible: false, isCreatePanelVisible: true, openedPanel: name, isSecondPanel: true, isDetailPanelVisible: false })
  };

  render() {
    const { selectedColumns, columnNameSortBy, sortingOrder, isSecondPanel, isDetailPanelVisible, isBtnExpandVisible, expandedPanel, openedPanel, isBtnCreateVisible, isCreatePanelVisible } = this.state;
    const { allAllergies } = this.props;
    const columnsToShowConfig = allergiesColumnsConfig.filter(columnConfig => selectedColumns[columnConfig.key]);

    // This part of the code is needed for testing when the server is down
    let filteredAllergies;
    if (allAllergies === undefined) {
      filteredAllergies = this.filterAndSortAllergies([{ 'cause': 'fafaf', 'reaction': 'afaf', 'source': 'ethercis', 'sourceId': '57f4567a-a9c9-4f3b-890e-9099e24a4761' }, { 'cause': 'qqq', 'reaction': 'qqq', 'source': 'ethercis', 'sourceId': 'cc0e5df2-f0c5-4a42-a136-cf88fd3b3958' }]);
    } else {
      filteredAllergies = this.filterAndSortAllergies(allAllergies);
    }

    const isPanelDetails = (expandedPanel === ALLERGIES_DETAIL || expandedPanel === ALLERGIE_PANEL || expandedPanel === META_PANEL);
    const isPanelMain = (expandedPanel === ALLERGIES_MAIN);
    const isPanelCreate = (expandedPanel === ALLERGIES_CREATE);

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
                  data={filteredAllergies}
                  onHeaderCellClick={this.handleHeaderCellClick}
                  onCellClick={this.handleDetailAllergiesClick}
                  columnNameSortBy={columnNameSortBy}
                  sortingOrder={sortingOrder}
                />
                <div className="panel-control">
                  <div className="wrap-control-group">
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
            />
          </Col> : null}
        </Row>
      </div>
    </section>)
  }
}
