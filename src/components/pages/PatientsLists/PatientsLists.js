import React, { PureComponent } from 'react';
import { Row, Col, Panel } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { lifecycle } from 'recompose';

import patientsSelector from './selectors';
import { fetchPatientsRequest } from '../../../ducks/feth-patients.duck';
import { fetchPatientsOnMount } from '../../../utils/hoc-arguments/fetch-patients.utils';

const mapDispatchToProps = dispatch => ({ actions: bindActionCreators({ fetchPatientsRequest }, dispatch) });

@connect(patientsSelector, mapDispatchToProps)
@lifecycle(fetchPatientsOnMount)
class PatientsLists extends PureComponent {
  render() {
    return (<section className="page-wrapper">
      <Row>
        <Col xs={12}>
          <Panel>
            <article className="wrap-patients-table">
              <table className="table table-striped table-bordered rwd-table table-sorted table-hover table-fixedcol table-patients-name">
                <colgroup>
                  {/*//TODO inject theme here*/}
                  <col />
                </colgroup>
                <thead>
                  <tr>
                    <th>test</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </article>
          </Panel>
        </Col>
      </Row>
    </section>)
  }
}

export default PatientsLists;
