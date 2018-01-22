import React, { PureComponent } from 'react';
import Swiper from 'react-id-swiper';
import 'react-id-swiper/src/styles/scss/swiper.scss';
import _ from 'lodash/fp'
import moment from 'moment'

import PluginDetailPanel from '../../../plugin-page-component/PluginDetailPanel'
import { getDDMMMYYYY } from '../../../../utils/time-helpers.utils';
import { valuesNames, valuesLabels } from '../forms.config';

const IMAGES_PANEL = 'imagesPanel';
const IMAGES_DETAIL_PANEL = 'imagesDetailPanel';

export default class ImagesDetail extends PureComponent {
  getURLtoImage = id => `http://46.101.95.245/orthanc/instances/${id}/preview`;

  render() {
    const { onExpand, onShow, openedPanel, expandedPanel, currentPanel, onEdit, editedPanel, instanceIds } = this.props;
    let { detail } = this.props;
    detail = detail || {};
    const seriesDate = (detail[valuesNames.SERIES_DATE]) ? moment(detail[valuesNames.SERIES_DATE]).format('DD-MMM-YYYY') : '';
    const seriesTime = (detail[valuesNames.SERIES_TIME]) ? moment(detail[valuesNames.SERIES_TIME]).format('HH:MM') : '';

    const params = {
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      spaceBetween: 30,
    };

    const swiperSlide = instanceIds.map((item) => {
      return <div><img src={this.getURLtoImage(item)} /></div>
    });

    return (
      <div className="section-detail">
        <div className="panel-group accordion">
          {(expandedPanel === IMAGES_PANEL || expandedPanel === 'all') ? <PluginDetailPanel
            onExpand={onExpand}
            name={IMAGES_PANEL}
            title="Image(s) Series"
            isOpen={openedPanel === IMAGES_PANEL}
            currentPanel={currentPanel}
            onEdit={onEdit}
            editedPanel={editedPanel}
            isBtnShowPanel
            isShowControlPanel={false}
            onShow={onShow}
          >
            <div className="panel-body-inner">
              <div className="form">
                <div className="form-group-wrapper dicom-container">
                  <Swiper
                    pagination={params.pagination}
                    navigation={params.navigation}
                    spaceBetween={params.spaceBetween}
                  >
                    { !_.isEmpty(instanceIds) ? swiperSlide : null }
                  </Swiper>
                </div>
              </div>
            </div>
          </PluginDetailPanel> : null}
          {(expandedPanel === IMAGES_DETAIL_PANEL || expandedPanel === 'all') ? <PluginDetailPanel
            onExpand={onExpand}
            name={IMAGES_DETAIL_PANEL}
            title="Image Details"
            isOpen={openedPanel === IMAGES_DETAIL_PANEL}
            currentPanel={currentPanel}
            onEdit={onEdit}
            editedPanel={editedPanel}
            isBtnShowPanel
            isShowControlPanel={false}
            onShow={onShow}
          >
            <div className="panel-body-inner">
              <div className="form">
                <div className="form-group-wrapper">
                  <div className="form-group">
                    <label className="control-label">{valuesLabels.MODALITY}</label>
                    <div className="form-control-static">{detail[valuesNames.MODALITY]}</div>
                  </div>
                  <div className="row-expand">
                    <div className="col-expand-left">
                      <div className="form-group">
                        <label className="control-label">{valuesLabels.PROTOCOL_NAME}</label>
                        <div className="form-control-static">{detail[valuesNames.PROTOCOL_NAME]}</div>
                      </div>
                    </div>
                    <div className="col-expand-right">
                      <div className="form-group">
                        <label className="control-label">{valuesLabels.STATION_NAME}</label>
                        <div className="form-control-static">{detail[valuesNames.STATION_NAME]}</div>
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="control-label">{valuesLabels.OPERATORS_NAME}</label>
                    <div className="form-control-static">{detail[valuesNames.OPERATORS_NAME]}</div>
                  </div>
                  <div className="row-expand">
                    <div className="col-expand-left">
                      <div className="form-group">
                        <label className="control-label">{valuesLabels.SERIES_DATE}</label>
                        <div className="form-control-static">{seriesDate}</div>
                      </div>
                    </div>
                    <div className="col-expand-right">
                      <div className="form-group">
                        <label className="control-label">{valuesLabels.SERIES_TIME}</label>
                        <div className="form-control-static">{seriesTime}</div>
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="control-label">{valuesLabels.AUTHOR}</label>
                    <div className="form-control-static">{detail[valuesNames.AUTHOR]}</div>
                  </div>
                  <div className="form-group">
                    <label className="control-label">{valuesLabels.SERIES_NUMBER}:</label>
                    <div className="form-control-static">{detail[valuesNames.SERIES_NUMBER]}</div>
                  </div>
                </div>
              </div>
            </div>
          </PluginDetailPanel> : null}
        </div>
      </div>
    )
  }
}
