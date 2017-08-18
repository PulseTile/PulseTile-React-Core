import React, { PureComponent } from 'react';
import { Row, Col, Panel } from 'react-bootstrap';

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
