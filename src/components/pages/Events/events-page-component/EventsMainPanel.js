import React, { PureComponent } from 'react';
import _ from 'lodash/fp';
import classNames from 'classnames';

import PTButton from '../../../ui-elements/PTButton/PTButton';
import SortableTable from '../../../containers/SortableTable/SortableTable';
import PaginationBlock from '../../../presentational/PaginationBlock/PaginationBlock';
import Spinner from '../../../ui-elements/Spinner/Spinner';
import Timelines from './EventsTimelines';

const CREATE_CONTENT = 'createContent';

export default class EventsMainPanel extends PureComponent {
  static defaultProps = {
    listPerPageAmount: 10,
    emptyDataMessage: 'No list',
  };
  getClinicalNotesOnFirstPage = (list) => {
    const { listPerPageAmount, offset } = this.props;

    return (_.size(list) > listPerPageAmount
      ? _.slice(offset, offset + listPerPageAmount)(list)
      : list)
  };

  state = {
    openedPanel: '',
    activeCreate: '',
  };

  componentWillMount() {
    document.addEventListener('click', this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClick, false);
  }

  handleClick = (e) => {
    if (!this.node.contains(e.target)) {
      this.setState({ openedPanel: '' });
    }
  };

  handleMouseDown = (name) => {
    this.setState((prevState) => {
      if (prevState.openedPanel !== name) {
        return ({ openedPanel: name })
      }
      return ({ openedPanel: '' })
    })
  };

  shouldHavePagination = list => _.size(list) > this.props.listPerPageAmount;

  render() {
    const { openedPanel, activeCreate } = this.state;
    const { headers, resourceData, emptyDataMessage, onHeaderCellClick, onCellClick, columnNameSortBy, sortingOrder, filteredData, totalEntriesAmount, offset, setOffset, isBtnCreateVisible, onCreate, listPerPageAmount, isLoading, id, eventsTimeline, activeView } = this.props;
    const listOnFirstPage = _.flow(this.getClinicalNotesOnFirstPage)(filteredData);
    return (
      <div className="panel-body">
        {activeView === 'table' ? <SortableTable
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
        {activeView === 'timeline' ? <Timelines
          eventsTimeline={eventsTimeline}
        /> : null }
        <div className="panel-control">
          <div className="wrap-control-group">
            {(this.shouldHavePagination(filteredData) && activeView === 'table') ? <div className="control-group with-indent left">
              <PaginationBlock
                entriesPerPage={listPerPageAmount}
                totalEntriesAmount={totalEntriesAmount}
                offset={offset}
                setOffset={setOffset}
              />
            </div> : null }
            <div className="control-group with-indent right" ref={node => this.node = node}>
              <div className={classNames('dropdown', { 'open': openedPanel === CREATE_CONTENT })}>
                <PTButton className="btn btn-success btn-dropdown-toggle btn-table" onClick={() => this.handleMouseDown(CREATE_CONTENT)}>
                  <span className="btn-text">Create</span>
                </PTButton>
                <div className="dropdown-menu dropdown-menu-top-right dropdown-menu-small-size">
                  <div className="dropdown-menu-wrap-list">
                    <div className="dropdown-menu-list">
                      <div className="dropdown-menu-item"><span className="dropdown-menu-item-text">Appointment</span></div>
                      <div className="dropdown-menu-item"><span className="dropdown-menu-item-text">Admission</span></div>
                      <div className="dropdown-menu-item"><span className="dropdown-menu-item-text">Transfer</span></div>
                      <div className="dropdown-menu-item"><span className="dropdown-menu-item-text">Discharge</span></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
