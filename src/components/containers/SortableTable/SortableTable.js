import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Panel } from 'react-bootstrap';

import SortableTableHeaderRow from './SortableTableHeaderRow';

export default class SortableTable extends PureComponent {
    static propTypes = {
      headers: SortableTableHeaderRow.propTypes.headers,
    };

    render() {
      const { headers } = this.props;

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
              <tr>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>)
    }
}

