import React, { PureComponent } from 'react';
import _ from 'lodash/fp';

import PTButton from '../../../ui-elements/PTButton/PTButton';
import SortableTable from '../../../containers/SortableTable/SortableTable';
import PaginationBlock from '../../../presentational/PaginationBlock/PaginationBlock';
import Spinner from '../../../ui-elements/Spinner/Spinner';
import VitalsChart from './VitalsChart';

export default class VitalsMainPanel extends PureComponent {
  static defaultProps = {
    listPerPageAmount: 10,
    emptyDataMessage: 'No list',
  };

  getVitalsOnFirstPage = (list) => {
    const { listPerPageAmount, offset } = this.props;

    return (_.size(list) > listPerPageAmount
      ? _.slice(offset, offset + listPerPageAmount)(list)
      : list)
  };

  shouldHavePagination = list => _.size(list) > this.props.listPerPageAmount;

  render() {
    const { headers, resourceData, emptyDataMessage, onHeaderCellClick, onCellClick, columnNameSortBy, sortingOrder, filteredData, totalEntriesAmount, offset, setOffset, onCreate, listPerPageAmount, isLoading, id, activeView, isBtnCreateVisible, chartLoad } = this.props;
    const listOnFirstPage = this.getVitalsOnFirstPage(filteredData);
    const dataChart = chartLoad(listOnFirstPage);

    return (
      <div className="panel-body">
        {activeView === 'tableNews' ? <SortableTable
          headers={headers}
          data={listOnFirstPage}
          resourceData={resourceData}
          emptyDataMessage={emptyDataMessage}
          onHeaderCellClick={onHeaderCellClick}
          onCellClick={onCellClick}
          columnNameSortBy={columnNameSortBy}
          sortingOrder={sortingOrder}
          id={id}
        /> : null }
        {isLoading ? <Spinner /> : null }
        {activeView === 'chartNews' ?
          <VitalsChart
            dataChart={dataChart}
            onCellClick={onCellClick}
          /> : null }
        <div className="panel-control">
          <div className="wrap-control-group">
            {(this.shouldHavePagination(filteredData) && activeView === 'tableNews') ? <div className="control-group with-indent left">
              <PaginationBlock
                entriesPerPage={listPerPageAmount}
                totalEntriesAmount={totalEntriesAmount}
                offset={offset}
                setOffset={setOffset}
              />
            </div> : null }
            <div className="control-group with-indent right">
              {isBtnCreateVisible ? <PTButton className="btn btn-success btn-inverse btn-create" onClick={() => onCreate()}>
                <i className="btn-icon fa fa-plus" />
                <span className="btn-text"> Create</span>
              </PTButton> : null}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
