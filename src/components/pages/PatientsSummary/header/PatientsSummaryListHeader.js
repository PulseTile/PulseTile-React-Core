import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash/fp';
import classNames from 'classnames';

import PatientsSummaryPanel from './PatientsSummaryPanel';
import PTButton from '../../../ui-elements/PTButton/PTButton';

export default class PatientsSummaryListHeader extends PureComponent {
    static propTypes = {
      onCategorySelected: PropTypes.func.isRequired,
      onViewOfBoardsSelected: PropTypes.func.isRequired,
      selectedCategory: PropTypes.objectOf(PropTypes.bool).isRequired,
      selectedViewOfBoards: PropTypes.objectOf(PropTypes.bool).isRequired,
    };

    state = {
      isPatientSummaryPanelVisible: false,
    };

    togglePatientSummaryPanelVisibility = (e, visibility) => this.setState(prevState => _.cond([
      [_.isUndefined, () => ({ isPatientSummaryPanelVisible: !prevState.isPatientSummaryPanelVisible })],
      [v => v, isPatientSummaryPanelVisible => ({ isPatientSummaryPanelVisible })],
    ])(visibility));

    render() {
      const { isPatientSummaryPanelVisible } = this.state;
      const { onCategorySelected, onViewOfBoardsSelected, selectedCategory, selectedViewOfBoards, title } = this.props;

      return (
        <div className="panel-heading">
          <div className="control-group left">
            <div className={classNames('dropdown', { open: isPatientSummaryPanelVisible })}>
              <PTButton className="btn btn-success btn-inverse btn-dropdown-toggle open" onClick={this.togglePatientSummaryPanelVisibility}>
                <i className="btn-icon fa fa-cog" />
              </PTButton>
              {isPatientSummaryPanelVisible && <PatientsSummaryPanel
                onCategorySelected={onCategorySelected}
                onViewOfBoardsSelected={onViewOfBoardsSelected}
                selectedCategory={selectedCategory}
                selectedViewOfBoards={selectedViewOfBoards}
                toggleVisibility={this.togglePatientSummaryPanelVisibility}
              />}
            </div>
          </div>
          <h3 className="panel-title">{ title }</h3>
        </div>
      )
    }
}
