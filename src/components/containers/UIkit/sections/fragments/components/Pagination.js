import React from 'react';
import PaginationBlock from '../../../../../presentational/PaginationBlock/PaginationBlock';

/**
 * This component returns content of Pagination section
 */
const Pagination = () => {
    return (
        <div id="pagination" className="ui-section">
            <strong className="ui-title">Pagination (page 18)</strong>
            <div className="row">
                <div className="col-xs-12 col-sm-6">
                    <div className="ui-sub-section">
                        <div className="ui-sub-title">Pagination normal</div>
                        <div className="wrap-control-group">
                            <div className="control-group with-indent left">
                                <PaginationBlock
                                    entriesPerPage={20}
                                    totalEntriesAmount={1200}
                                    offset={334}
                                    setOffset={function() {}}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xs-12 col-sm-6">
                    <div className="ui-sub-section">
                        <div className="ui-sub-title">Pagination short</div>
                        <div className="wrap-control-group">
                            <div className="control-group with-indent left">
                                <PaginationBlock
                                    entriesPerPage={20}
                                    totalEntriesAmount={19}
                                    offset={1}
                                    setOffset={function() {}}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Pagination;
