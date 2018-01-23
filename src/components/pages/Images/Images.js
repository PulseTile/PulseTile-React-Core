import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import classNames from 'classnames';
import _ from 'lodash/fp';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { lifecycle, compose } from 'recompose';

import PluginListHeader from '../../plugin-page-component/PluginListHeader';
import PluginMainPanel from '../../plugin-page-component/PluginMainPanel';
import { columnsConfig, defaultColumnsSelected } from './table-columns.config'
import { valuesNames } from './forms.config';
import { fetchPatientImagesRequest } from './ducks/fetch-patient-images.duck';
import { fetchPatientImagesDetailRequest } from './ducks/fetch-patient-images-detail.duck';
import { fetchSeriesRequest } from './ducks/fetch-all-series.duck';
import { fetchSeriesDetailRequest } from './ducks/fetch-series-detail.duck';
import { fetchPatientImagesOnMount, fetchPatientImagesDetailOnMount, fetchSeriesOnMount } from '../../../utils/HOCs/fetch-patients.utils';
import { patientImagesSelector, patientImagesDetailSelector, seriesDetailAndInstanceIdsSelector } from './selectors';
import { clientUrls } from '../../../config/client-urls.constants';
import ImagesDetail from './ImagesDetail/ImagesDetail';
import { getDDMMMYYYY } from '../../../utils/time-helpers.utils';
import { operationsOnCollection } from '../../../utils/plugin-helpers.utils';

const IMAGES_MAIN = 'imagesMain';
const IMAGES_DETAIL = 'imagesDetail';
const IMAGES_PANEL = 'imagesPanel';
const IMAGES_DETAIL_PANEL = 'imagesDetailPanel';

const mapDispatchToProps = dispatch => ({ actions: bindActionCreators({ fetchPatientImagesRequest, fetchPatientImagesDetailRequest, fetchSeriesRequest, fetchSeriesDetailRequest }, dispatch) });

@connect(patientImagesSelector, mapDispatchToProps)
@connect(patientImagesDetailSelector)
@connect(seriesDetailAndInstanceIdsSelector)
@compose(lifecycle(fetchPatientImagesOnMount), lifecycle(fetchSeriesOnMount))
export default class Images extends PureComponent {
  static propTypes = {
    allImages: PropTypes.arrayOf(PropTypes.object),
  };

  static contextTypes = {
    router: PropTypes.shape({
      history: PropTypes.object,
    }),
  };

  state = {
    nameShouldInclude: '',
    selectedColumns: defaultColumnsSelected,
    openedPanel: IMAGES_PANEL,
    columnNameSortBy: valuesNames.STUDY_DESCRIPTION,
    sortingOrder: 'asc',
    expandedPanel: 'all',
    isBtnCreateVisible: false,
    isBtnExpandVisible: false,
    isAllPanelsVisible: false,
    isDetailPanelVisible: false,
    isSecondPanel: false,
    editedPanel: {},
    offset: 0,
    isLoading: true,
  };

  componentWillReceiveProps() {
    const sourceId = this.context.router.route.match.params.sourceId;
    const userId = this.context.router.route.match.params.userId;

    //TODO should be implemented common function, and the state stored in the store Redux
    if (this.context.router.history.location.pathname === `${clientUrls.PATIENTS}/${userId}/${clientUrls.IMAGES}/${sourceId}` && sourceId !== undefined) {
      this.setState({ isSecondPanel: true, isDetailPanelVisible: true, isBtnExpandVisible: true })
    }
    if (this.context.router.history.location.pathname === `${clientUrls.PATIENTS}/${userId}/${clientUrls.IMAGES}`) {
      this.setState({ isSecondPanel: false, isBtnExpandVisible: false, openedPanel: IMAGES_PANEL, isDetailPanelVisible: false, expandedPanel: 'all' })
    }

    /* istanbul ignore next */
    setTimeout(() => {
      this.setState({ isLoading: false })
    }, 500)
  }

  handleExpand = (name, currentPanel) => {
    if (currentPanel === IMAGES_MAIN) {
      if (this.state.expandedPanel === 'all') {
        this.setState({ expandedPanel: name });
      } else {
        this.setState({ expandedPanel: 'all' });
      }
    } else if (this.state.expandedPanel === 'all') {
      this.setState({ expandedPanel: name, openedPanel: name });
    } else {
      this.setState({ expandedPanel: 'all' });
    }
  };

  handleFilterChange = ({ target: { value } }) => this.setState({ nameShouldInclude: _.toLower(value) });

  handleHeaderCellClick = (e, { name, sortingOrder }) => this.setState({ columnNameSortBy: name, sortingOrder });

  handleDetailImagesClick = (sourceId) => {
    const { actions, userId } = this.props;
    this.setState({ isSecondPanel: true, isDetailPanelVisible: true, isBtnExpandVisible: true, openedPanel: IMAGES_PANEL, editedPanel: {}, expandedPanel: 'all', isLoading: true });
    actions.fetchSeriesRequest({ userId, studyId: sourceId, source: 'orthanc' });
    this.context.router.history.push(`${clientUrls.PATIENTS}/${userId}/${clientUrls.IMAGES}/${sourceId}`);
  };

  handleSetOffset = offset => this.setState({ offset });

  formToShowCollection = (collection) => {
    const { columnNameSortBy, sortingOrder, nameShouldInclude } = this.state;

    collection = operationsOnCollection.modificate(collection, [{
      keyFrom: valuesNames.DATE_RECORDED,
      keyTo: `${valuesNames.DATE_RECORDED}Convert`,
      fn: getDDMMMYYYY,
    }]);

    return operationsOnCollection.filterAndSort({
      collection,
      filterBy: nameShouldInclude,
      sortingByKey: columnNameSortBy,
      sortingByOrder: sortingOrder,
      filterKeys: [valuesNames.STUDY_DESCRIPTION, `${valuesNames.DATE_RECORDED}Convert`, valuesNames.SOURCE],
      modeSorting: {
        number: [valuesNames.DATE_RECORDED],
      },
    });
  };

  handleShow = (name) => {
    this.setState({ openedPanel: name })
  };

  render() {
    const { selectedColumns, columnNameSortBy, sortingOrder, isSecondPanel, isDetailPanelVisible, isBtnExpandVisible, expandedPanel, openedPanel, isBtnCreateVisible, editedPanel, offset, isLoading } = this.state;
    const { allImages, imageDetail, instanceIds, serieDetail } = this.props;

    const isPanelDetails = (expandedPanel === IMAGES_DETAIL || expandedPanel === IMAGES_PANEL || expandedPanel === IMAGES_DETAIL_PANEL);
    const isPanelMain = (expandedPanel === IMAGES_MAIN);

    const columnsToShowConfig = columnsConfig.filter(columnConfig => selectedColumns[columnConfig.key]);

    const filteredImages = this.formToShowCollection(allImages);

    let sourceId;
    if (!_.isEmpty(imageDetail)) {
      sourceId = imageDetail[valuesNames.STUDY_ID];
    }

    return (<section className="page-wrapper">
      <div className={classNames('section', { 'full-panel full-panel-main': isPanelMain, 'full-panel full-panel-details': isPanelDetails })}>
        <Row>
          {(isPanelMain || expandedPanel === 'all') ? <Col xs={12} className={classNames({ 'col-panel-main': isSecondPanel })}>
            <div className="panel panel-primary">
              <PluginListHeader
                onFilterChange={this.handleFilterChange}
                panelTitle="Images"
                isBtnExpandVisible={isBtnExpandVisible}
                name={IMAGES_MAIN}
                onExpand={this.handleExpand}
                currentPanel={IMAGES_MAIN}
              />
              <PluginMainPanel
                headers={columnsToShowConfig}
                resourceData={allImages}
                emptyDataMessage="No images"
                onHeaderCellClick={this.handleHeaderCellClick}
                onCellClick={this.handleDetailImagesClick}
                columnNameSortBy={columnNameSortBy}
                sortingOrder={sortingOrder}
                table="images"
                filteredData={filteredImages}
                totalEntriesAmount={_.size(filteredImages)}
                offset={offset}
                setOffset={this.handleSetOffset}
                isBtnCreateVisible={isBtnCreateVisible}
                onCreate={this.handleCreate}
                id={sourceId}
                isLoading={isLoading}
              />
            </div>
          </Col> : null }
          {(expandedPanel === 'all' || isPanelDetails) && isDetailPanelVisible ? <Col xs={12} className={classNames({ 'col-panel-details': isSecondPanel })}>
            <ImagesDetail
              onExpand={this.handleExpand}
              name={IMAGES_DETAIL}
              openedPanel={openedPanel}
              expandedPanel={expandedPanel}
              currentPanel={IMAGES_DETAIL}
              detail={serieDetail}
              onEdit={this.handleEdit}
              editedPanel={editedPanel}
              onShow={this.handleShow}
              instanceIds={instanceIds}
            />
          </Col> : null}
        </Row>
      </div>
    </section>)
  }
}
