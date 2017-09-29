import React, { PureComponent } from 'react';
import { Row, Col } from 'react-bootstrap';
import _ from 'lodash/fp';

import AllergiesListHeader from './header/AllergiesListHeader';
import SortableTable from '../../containers/SortableTable/SortableTable';
import { allergiesColumnsConfig, defaultColumnsSelected } from '../../../config/allergies-table-columns.config'

export default class Allergies extends PureComponent {
  state = {
    nameShouldInclude: '',
    selectedColumns: defaultColumnsSelected,
  };
  handleFilterChange = ({ target: { value } }) => this.setState({ nameShouldInclude: _.toLower(value) });

  render() {
    const { selectedColumns } = this.state;
    const columnsToShowConfig = allergiesColumnsConfig.filter(columnConfig => selectedColumns[columnConfig.key]);
    return (<section className="page-wrapper">
      <Row>
        <Col xs={12}>
          <div className="panel panel-primary">
            <AllergiesListHeader
              onFilterChange={this.handleFilterChange}
              panelTitle="Allergies"
            />
            <div className="panel-body">
              <SortableTable
                headers={columnsToShowConfig}
              />
            </div>
          </div>
        </Col>
      </Row>
    </section>)
  }
}
