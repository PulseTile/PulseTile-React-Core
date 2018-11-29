import React from 'react';

/**
 * This component returns content of Tables section
 */
const Tables = () => {
  return (
    <div id="tables" className="ui-section">
      <strong className="ui-title">Tables</strong>
      <div className="row">
        <div className="col-xs-12 col-sm-6">
          <div className="ui-sub-section">
            <div className="ui-sub-title">Table Simple</div>
            <table className="table">
              <thead>
                <tr>
                  <th className="sorted asc">Cause</th>
                  <th>Reaction</th>
                  <th>Source</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td data-th="Cause" className="sorted asc"><span>Cause 1</span></td>
                  <td data-th="Reaction"><span>Reaction 1</span></td>
                  <td data-th="Source"><span>Source 1</span></td>
                </tr>
                <tr>
                  <td data-th="Cause" className="sorted asc"><span>Cause 2</span></td>
                  <td data-th="Reaction"><span>Reaction 2</span></td>
                  <td data-th="Source"><span>Source 2</span></td>
                </tr>
                <tr>
                  <td data-th="Cause" className="sorted asc"><span>Cause 3</span></td>
                  <td data-th="Reaction"><span>Reaction 3</span></td>
                  <td data-th="Source"><span>Source 3</span></td>
                </tr>
                <tr>
                  <td data-th="Cause" className="sorted asc"><span>Cause 4</span></td>
                  <td data-th="Reaction"><span>Reaction 4</span></td>
                  <td data-th="Source"><span>Source 4</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="col-xs-12 col-sm-6">
          <div className="ui-sub-section">
            <div className="ui-sub-title">Table Striped</div>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th className="sorted asc">Cause</th>
                  <th>Reaction</th>
                  <th>Source</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td data-th="Cause" className="sorted asc"><span>Cause 1</span></td>
                  <td data-th="Reaction"><span>Reaction 1</span></td>
                  <td data-th="Source"><span>Source 1</span></td>
                </tr>
                <tr>
                  <td data-th="Cause" className="sorted asc"><span>Cause 2</span></td>
                  <td data-th="Reaction"><span>Reaction 2</span></td>
                  <td data-th="Source"><span>Source 2</span></td>
                </tr>
                <tr>
                  <td data-th="Cause" className="sorted asc"><span>Cause 3</span></td>
                  <td data-th="Reaction"><span>Reaction 3</span></td>
                  <td data-th="Source"><span>Source 3</span></td>
                </tr>
                <tr>
                  <td data-th="Cause" className="sorted asc"><span>Cause 4</span></td>
                  <td data-th="Reaction"><span>Reaction 4</span></td>
                  <td data-th="Source"><span>Source 4</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12 col-sm-6">
          <div className="ui-sub-section">
            <div className="ui-sub-title">Table Hovered</div>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th className="sorted asc">Cause</th>
                  <th>Reaction</th>
                  <th>Source</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td data-th="Cause" className="sorted asc"><span>Cause 1</span></td>
                  <td data-th="Reaction"><span>Reaction 1</span></td>
                  <td data-th="Source"><span>Source 1</span></td>
                </tr>
                <tr>
                  <td data-th="Cause" className="sorted asc"><span>Cause 2</span></td>
                  <td data-th="Reaction"><span>Reaction 2</span></td>
                  <td data-th="Source"><span>Source 2</span></td>
                </tr>
                <tr>
                  <td data-th="Cause" className="sorted asc"><span>Cause 3</span></td>
                  <td data-th="Reaction"><span>Reaction 3</span></td>
                  <td data-th="Source"><span>Source 3</span></td>
                </tr>
                <tr>
                  <td data-th="Cause" className="sorted asc"><span>Cause 4</span></td>
                  <td data-th="Reaction"><span>Reaction 4</span></td>
                  <td data-th="Source"><span>Source 4</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="col-xs-12 col-sm-6">
          <div className="ui-sub-section">
            <div className="ui-sub-title">Table Bordered</div>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th className="sorted asc">Cause</th>
                  <th>Reaction</th>
                  <th>Source</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td data-th="Cause" className="sorted asc"><span>Cause 1</span></td>
                  <td data-th="Reaction"><span>Reaction 1</span></td>
                  <td data-th="Source"><span>Source 1</span></td>
                </tr>
                <tr>
                  <td data-th="Cause" className="sorted asc"><span>Cause 2</span></td>
                  <td data-th="Reaction"><span>Reaction 2</span></td>
                  <td data-th="Source"><span>Source 2</span></td>
                </tr>
                <tr>
                  <td data-th="Cause" className="sorted asc"><span>Cause 3</span></td>
                  <td data-th="Reaction"><span>Reaction 3</span></td>
                  <td data-th="Source"><span>Source 3</span></td>
                </tr>
                <tr>
                  <td data-th="Cause" className="sorted asc"><span>Cause 4</span></td>
                  <td data-th="Reaction"><span>Reaction 4</span></td>
                  <td data-th="Source"><span>Source 4</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12 col-sm-6">
          <div className="ui-sub-section">
            <div className="ui-sub-title">Transform table on mobile devices</div>
            <table className="table table-bordered table-striped rwd-table">
              <thead>
                <tr>
                  <th className="sorted asc">Cause</th>
                  <th>Reaction</th>
                  <th>Source</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td data-th="Cause" className="sorted asc"><span>Cause 1</span></td>
                  <td data-th="Reaction"><span>Reaction 1</span></td>
                  <td data-th="Source"><span>Source 1</span></td>
                </tr>
                <tr>
                  <td data-th="Cause" className="sorted asc"><span>Cause 2</span></td>
                  <td data-th="Reaction"><span>Reaction 2</span></td>
                  <td data-th="Source"><span>Source 2</span></td>
                </tr>
                <tr>
                  <td data-th="Cause" className="sorted asc"><span>Cause 3</span></td>
                  <td data-th="Reaction"><span>Reaction 3</span></td>
                  <td data-th="Source"><span>Source 3</span></td>
                </tr>
                <tr>
                  <td data-th="Cause" className="sorted asc"><span>Cause 4</span></td>
                  <td data-th="Reaction"><span>Reaction 4</span></td>
                  <td data-th="Source"><span>Source 4</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="col-xs-12 col-sm-6">
          <div className="ui-sub-section">
            <div className="ui-sub-title">Table with fixed columns</div>
            <table className="table table-bordered">
              <colgroup>
                <col style={{ width: '26%' }} />
                <col style={{ width: '55%' }} />
                <col style={{ width: '19%' }} />
              </colgroup>
              <thead>
                <tr>
                  <th className="sorted asc">Cause</th>
                  <th>Reaction</th>
                  <th>Source</th>
                </tr>
              </thead>
              <tbody>
               <tr>
                 <td data-th="Cause" className="sorted asc"><span>Cause 1</span></td>
                 <td data-th="Reaction"><span>Reaction 1</span></td>
                 <td data-th="Source"><span>Source 1</span></td>
               </tr>
               <tr>
                 <td data-th="Cause" className="sorted asc"><span>Cause 2</span></td>
                 <td data-th="Reaction"><span>Reaction 2</span></td>
                 <td data-th="Source"><span>Source 2</span></td>
               </tr>
               <tr>
                 <td data-th="Cause" className="sorted asc"><span>Cause 3</span></td>
                 <td data-th="Reaction"><span>Reaction 3</span></td>
                 <td data-th="Source"><span>Source 3</span></td>
               </tr>
               <tr>
                 <td data-th="Cause" className="sorted asc"><span>Cause 4</span></td>
                 <td data-th="Reaction"><span>Reaction 4</span></td>
                 <td data-th="Source"><span>Source 4</span></td>
               </tr>
             </tbody>
           </table>
         </div>
       </div>
     </div>
     <div className="row">
       <div className="col-xs-12 col-sm-6">
         <div className="ui-sub-section">
           <div className="ui-sub-title">Complete table settings</div>
           <table className="table table-striped table-hover table-bordered rwd-table table-sorted">
             <colgroup>
               <col style={{ width: '26%' }} />
               <col style={{ width: '55%' }} />
               <col style={{ width: '19%' }} />
             </colgroup>
             <thead>
               <tr>
                 <th className="sorted asc">Cause</th>
                 <th>Reaction</th>
                 <th>Source</th>
               </tr>
             </thead>
             <tbody>
               <tr>
                 <td data-th="Cause" className="sorted asc"><span>Cause 1</span></td>
                 <td data-th="Reaction"><span>Reaction 1</span></td>
                 <td data-th="Source"><span>Source 1</span></td>
               </tr>
               <tr>
                 <td data-th="Cause" className="sorted asc"><span>Cause 2</span></td>
                 <td data-th="Reaction"><span>Reaction 2</span></td>
                 <td data-th="Source"><span>Source 2</span></td>
               </tr>
               <tr>
                 <td data-th="Cause" className="sorted asc"><span>Cause 3</span></td>
                 <td data-th="Reaction"><span>Reaction 3</span></td>
                 <td data-th="Source"><span>Source 3</span></td>
               </tr>
               <tr>
                 <td data-th="Cause" className="sorted asc"><span>Cause 4</span></td>
                 <td data-th="Reaction"><span>Reaction 4</span></td>
                 <td data-th="Source"><span>Source 4</span></td>
               </tr>
             </tbody>
           </table>
         </div>
       </div>
       <div className="col-xs-12 col-sm-6">
         <div className="ui-sub-section">
           <div className="ui-sub-title">Empty table</div>
             <table className="table table-striped table-hover table-bordered rwd-table table-sorted">
               <colgroup>
                 <col style={{ width: '26%' }} />
                 <col style={{ width: '55%' }} />
                 <col style={{ width: '19%' }} />
               </colgroup>
               <thead>
                 <tr>
                   <th className="sorted asc">Cause</th>
                   <th>Reaction</th>
                   <th>Source</th>
                 </tr>
               </thead>
               <tbody>
                 <tr>
                   <td colspan="3"><span className="label label-default">No items</span></td>
                 </tr>
               </tbody>
             </table>
           </div>
         </div>
       </div>
     </div>
  );
};

export default Tables;
