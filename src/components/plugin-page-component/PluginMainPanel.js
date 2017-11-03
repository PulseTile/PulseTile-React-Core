import React, { PureComponent } from 'react';
import _ from 'lodash/fp';

import PTButton from '../ui-elements/PTButton/PTButton';
import SortableTable from '../containers/SortableTable/SortableTable';
import PaginationBlock from '../presentational/PaginationBlock/PaginationBlock';

export default class PluginMainPanel extends PureComponent {
  static defaultProps = {
    listPerPageAmount: 10,
    emptyDataMessage: 'No list'
  };
  getClinicalNotesOnFirstPage = (list) => {
    const { listPerPageAmount, offset } = this.props;

    return (_.size(list) > listPerPageAmount
      ? _.slice(offset, offset + listPerPageAmount)(list)
      : list)
  };

  shouldHavePagination = list => _.size(list) > this.props.listPerPageAmount;

  render() {
    const { headers, resourceData, emptyDataMessage, onHeaderCellClick, onCellClick, columnNameSortBy, sortingOrder, table, filteredData, totalEntriesAmount, offset, setOffset, isBtnCreateVisible, onCreate, listPerPageAmount } = this.props;
    const listOnFirstPage = _.flow(this.getClinicalNotesOnFirstPage)(filteredData);
    return (
      <div className="panel-body">
        <SortableTable
          headers={headers}
          data={listOnFirstPage}
          resourceData={resourceData}
          emptyDataMessage={emptyDataMessage}
          onHeaderCellClick={onHeaderCellClick}
          onCellClick={onCellClick}
          columnNameSortBy={columnNameSortBy}
          sortingOrder={sortingOrder}
        />
        <div className="panel-control">
          <div className="wrap-control-group">
            {this.shouldHavePagination(filteredData) &&
            <div className="control-group with-indent left">
              <PaginationBlock
                entriesPerPage={listPerPageAmount}
                totalEntriesAmount={totalEntriesAmount}
                offset={offset}
                setOffset={setOffset}
              />
            </div>
            }
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
