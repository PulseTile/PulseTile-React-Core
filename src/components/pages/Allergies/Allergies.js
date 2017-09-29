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
import AllergiesDetail from './AllergiesDetail';

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
    allAllergies: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  state = {
    nameShouldInclude: '',
    selectedColumns: defaultColumnsSelected,
    columnNameSortBy: 'cause',
    sortingOrder: 'asc',
    isSecondPanel: false,
    isDetailPanelVisible: false,
    isBtnExpandVisible: false,
    expandedPanel: 'all',
    isAllPanelsVisible: false,
    openedPanel: ALLERGIE_PANEL,
  };

  handleFilterChange = ({ target: { value } }) => this.setState({ nameShouldInclude: _.toLower(value) });

  handleHeaderCellClick = (e, { name, sortingOrder }) => this.setState({ columnNameSortBy: name, sortingOrder });

  handleDetailAllergiesClick = () => {
    this.setState({ isSecondPanel: true, isDetailPanelVisible: true, isBtnExpandVisible: true })
  };

  handleExpand = (name) => {
    if (this.state.expandedPanel === 'all') {
      this.setState(prevState => ({ expandedPanel: name, isAllPanelsVisible: !prevState.isAllPanelsVisible }));
    } else {
      this.setState(prevState => ({ expandedPanel: 'all', isAllPanelsVisible: !prevState.isAllPanelsVisible }));
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

  render() {
    const { selectedColumns, columnNameSortBy, sortingOrder, isSecondPanel, isDetailPanelVisible, isBtnExpandVisible, expandedPanel, isAllPanelsVisible, openedPanel } = this.state;
    const { allAllergies } = this.props;
    const columnsToShowConfig = allergiesColumnsConfig.filter(columnConfig => selectedColumns[columnConfig.key]);
    const filteredAllergies = this.filterAndSortAllergies(allAllergies);
    return (<section className="page-wrapper">
      <div className={classNames('section', { 'full-panel full-panel-main': expandedPanel === ALLERGIES_MAIN, 'full-panel full-panel-details': expandedPanel === ALLERGIES_DETAIL })}>
        <Row>
          {(expandedPanel === ALLERGIES_MAIN || expandedPanel === 'all') ? <Col xs={12} className={classNames({ 'col-panel-main': isSecondPanel })}>
            <div className="panel panel-primary">
              <AllergiesListHeader
                onFilterChange={this.handleFilterChange}
                panelTitle="Allergies"
                isBtnExpandVisible={isBtnExpandVisible}
                name={ALLERGIES_MAIN}
                onExpand={this.handleExpand}
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
              </div>
            </div>
          </Col>: null}
          {(expandedPanel === ALLERGIES_DETAIL || expandedPanel === 'all') && isDetailPanelVisible ? <Col xs={12} className={classNames({ 'col-panel-details': isSecondPanel })}>
            <AllergiesDetail
              onExpand={this.handleExpand}
              name={ALLERGIES_DETAIL}
              openedPanel={openedPanel}
              onShow={this.handleShow}
            />
          </Col> : null}
        </Row>
      </div>
    </section>)
  }
}
