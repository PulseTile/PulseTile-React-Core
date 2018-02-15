import React, { PureComponent } from 'react';

import {valuesLabels, valuesNames} from "./forms.config";

export default class RecordsOfTableView extends PureComponent {
  render() {
    const { records } = this.props;

    return (
      <div className="form-group">
        <label className="control-label">{valuesLabels.RECORDS}</label>
        { records && records.length
          ? <table className="table table-striped table-hover table-bordered rwd-table table-fixedcol table-no-cursor">
            <colgroup>
              <col />
              <col style={{ width: '21%' }} />
              <col style={{ width: '21%' }} />
              <col style={{ width: '18%' }} />
            </colgroup>
            <thead><tr>
              <th>{valuesLabels.RECORDS_NAME}</th>
              <th>{valuesLabels.RECORDS_TYPE}</th>
              <th>{valuesLabels.RECORDS_DATE}</th>
              <th>{valuesLabels.RECORDS_SOURCE}</th>
            </tr></thead>
            <tbody>
            { records.map((record, index) => <tr key={index}>
              <td data-th={valuesLabels.RECORDS_NAME}><span>{record[valuesNames.RECORDS_NAME]}</span></td>
              <td data-th={valuesLabels.RECORDS_TYPE}><span>{record[valuesNames.RECORDS_TYPE]}</span></td>
              <td data-th={valuesLabels.RECORDS_DATE}><span>{record[valuesNames.RECORDS_DATE]}</span></td>
              <td data-th={valuesLabels.RECORDS_SOURCE}><span>{record[valuesNames.RECORDS_SOURCE]}</span></td>
            </tr>)}
            </tbody>
          </table>
          : <div className="form-control-static">{valuesLabels.RECORDS_NOT_EXIST}</div>
        }
      </div>
    )
  }
}