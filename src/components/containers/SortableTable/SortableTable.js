import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash/fp';
import { Row, Col, Panel } from 'react-bootstrap';

import SortableTableHeaderRow from './SortableTableHeaderRow';
import SortableTableRow from './SortableTableRow';
import { getArrByTemplate } from '../../../utils/table-helpers/table.utils';

export default class SortableTable extends PureComponent {
    static propTypes = {
      headers: SortableTableHeaderRow.propTypes.headers,
      data: PropTypes.objectOf(
        PropTypes.object
      ).isRequired,
    };

    render() {
      const { headers, data } = this.props;
      const values = getArrByTemplate(headers, data);

      return (
        <div>
          <table
            className="table table-striped table-bordered table-hover table-sorted "
          >
            <colgroup>
              {/*//TODO inject theme here*/}
              <col />
            </colgroup>
            <thead>
              <SortableTableHeaderRow headers={headers} />
            </thead>
            <tbody>
              {_.map(rowData => <SortableTableRow key={_.uniqueId('__SortableTableRow__')} rowData={rowData} />, values)}
            </tbody>
          </table>
        </div>)
    }
}

