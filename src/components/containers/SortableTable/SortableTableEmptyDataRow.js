import React from 'react';

const SortableTableEmptyDataRow = props => <tr>
  <td colSpan={props.amountCollumns}>
    {props.isLoading ? <span className="label label-default">Loading...</span> : <span className="label label-default">{props.emptyDataMessage}</span> }
  </td>
</tr>;

export default SortableTableEmptyDataRow
