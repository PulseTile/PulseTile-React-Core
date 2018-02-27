import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash/fp';
import { lifecycle } from 'recompose';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';

import PTCustomInput from './PTCustomInput';
import { unmountOnBlur } from '../../../../utils/HOCs/unmount-on-blur.utils'
import { patientsSummaryConfig } from '../patients-summary.config';
import { themeConfigs } from '../../../../themes.config';
import { dashboardBeing } from '../../../../plugins.config';

const feeds = [
  {
    name: 'BBC Health',
    landingPageUrl: 'http://www.bbc.co.uk/news/health',
    sourceId: 'testSourceID1',
  },
  {
    name: 'NHS Choices',
    landingPageUrl: 'https://www.nhs.uk/news/',
    sourceId: 'testSourceID2',
  },
  {
    name: 'Public Health',
    landingPageUrl: 'https://www.gov.uk/government/organisations/public-health-england',
    sourceId: 'testSourceID3',
  },
  {
    name: 'Leeds Live - Whats on',
    landingPageUrl: 'https://www.leeds-live.co.uk/best-in-leeds/whats-on-news/',
    sourceId: 'testSourceID4',
  },
  {
    name: 'Leeds CC Local News',
    landingPageUrl: 'https://news.leeds.gov.uk/tagfeed/en/tags/Leeds-news',
    sourceId: 'testSourceID5',
  },
];


@lifecycle(unmountOnBlur)
export default class PatientsSummaryPanel extends PureComponent {
    static propTypes = {
      onCategorySelected: PropTypes.func.isRequired,
      onViewOfBoardsSelected: PropTypes.func.isRequired,
      selectedCategory: PropTypes.objectOf(PropTypes.bool).isRequired,
      selectedViewOfBoards: PropTypes.objectOf(PropTypes.bool).isRequired,
    };

    state = {
      selected: this.props.selectedCategory,
      selectedViewOptions: this.props.selectedViewOfBoards,
    };

    componentDidUpdate(prevProps, prevState) {
      if (!_.isEqual(prevState.selected, this.state.selected)) this.props.onCategorySelected(this.state.selected);
      if (!_.isEqual(prevState.selectedViewOptions, this.state.selectedViewOptions)) this.props.onViewOfBoardsSelected(this.state.selectedViewOptions);
    }

    toggleCheckbox = key => this.setState((prevState) => {
      const newValue = !_.get(['selected', key])(prevState);
      return _.set(['selected', key], newValue)(prevState);
    });

    toggleRadio = key => this.setState((prevState) => {
      const selectedViewOptions = Object.assign({}, prevState.selectedViewOptions);
      selectedViewOptions.full = false;
      selectedViewOptions.preview = false;
      selectedViewOptions.list = false;
      selectedViewOptions[key] = true;
      return { 'selectedViewOptions': selectedViewOptions };
    });

    render() {
      const { selected, selectedViewOptions } = this.state;
      const { patientsSummaryHasPreviewSettings } = this.props;

      return (
        <div className="dropdown-menu dropdown-menu-panel dropdown-menu-summary">
          <div className="form-group-wrapper">
            <div className="heading">SHOW</div>
            <div className="form-group">
              <Row>
                {patientsSummaryConfig.map((item) => {
                  return dashboardBeing[item.key] !== false ?
                    <Col xs={6} sm={4} key={item.nameCheckboxes}>
                      <PTCustomInput
                        type="checkbox"
                        title={item.titleCheckboxes}
                        id={item.nameCheckboxes}
                        name={item.nameCheckboxes}
                        isChecked={selected[item.key]}
                        onChange={this.toggleCheckbox}
                      />
                    </Col> : null
                })}
              </Row>
            </div>
            {themeConfigs.isLeedsPHRTheme ?
              <div>
                <div className="heading">FEEDS</div>
                <div className="form-group">
                  <Row>
                    {feeds.map((item) => {
                      return (
                        <Col xs={6} sm={4} key={item.name}>
                          <PTCustomInput
                            type="checkbox"
                            title={item.name}
                            id={item.name}
                            name={item.name}
                            isChecked={selected[item.name]}
                            onChange={this.toggleCheckbox}
                          />
                        </Col>)
                    })}
                  </Row>
                </div>
              </div> : null }
            {(themeConfigs.patientsSummaryHasPreviewSettings || patientsSummaryHasPreviewSettings) ?
              <div>
                <div className="heading">VIEW OF BOARDS</div>
                <div className="form-group">
                  <Row>
                    <Col xs={12}>
                      <PTCustomInput type="radio" title="Full View" id="full" name="view-of-preview" value="full" isChecked={selectedViewOptions.full} onChange={this.toggleRadio} />
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12} sm={6}>
                      <PTCustomInput type="radio" title="Only Preview" id="preview" name="view-of-preview" value="preview" isChecked={selectedViewOptions.preview} onChange={this.toggleRadio} />
                    </Col>
                    <Col xs={12} sm={6}>
                      <PTCustomInput type="radio" title="Only List" id="list" name="view-of-preview" value="list" isChecked={selectedViewOptions.list} onChange={this.toggleRadio} />
                    </Col>
                  </Row>
                </div>
              </div> : null}
          </div>
        </div>
      )
    }
}
