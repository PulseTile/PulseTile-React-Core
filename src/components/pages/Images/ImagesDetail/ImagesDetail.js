import React, { PureComponent } from 'react';
import Swiper from 'react-id-swiper';
import 'react-id-swiper/src/styles/scss/swiper.scss';
import moment from 'moment';
import _ from 'lodash/fp';
import * as cornerstone from 'cornerstone-core';
import * as cornerstoneTools from 'cornerstone-tools';

import PluginDetailPanel from '../../../plugin-page-component/PluginDetailPanel';
import ImagesDetailPanel from '../images-page-component/ImagesDetailPanel';
import CornerstoneImage from '../images-page-component/CornerstoneImage';
import { valuesNames, valuesLabels } from '../forms.config';

const IMAGES_PANEL = 'imagesPanel';
const IMAGES_DETAIL_PANEL = 'imagesDetailPanel';

export default class ImagesDetail extends PureComponent {
  state = {
    touchMode: true,
    isVisibleCornerstone: true,
    isImageLoaded: true,
  };

  componentDidMount() {
    this.updateSwiper();
  }

  componentWillReceiveProps(nextProps) {
    const { isImageLoaded } = this.state;
    if ((nextProps.instanceIds[0] !== this.props.instanceIds[0]) && this.props.instanceIds.length) {
      this.setState({ touchMode: true });
      this.visibleCornerstone(false);
      this.swiper.allowTouchMove = true;
      const cornerstoneElement = this.getImgBlock();
      /* istanbul ignore next */
      if (cornerstoneElement && isImageLoaded) {
        this.disableCornerstoneTools(cornerstoneElement);
        cornerstone.reset(cornerstoneElement);
      }
    }
  }

  componentDidUpdate() {
    this.updateSwiper();
  }

  getImgBlock = () => document.getElementById(`dicomImage-${this.swiper.activeIndex}`);

  getURLtoImage = id => `${window.location.protocol}//46.101.95.245/orthanc/instances/${id}/preview`;

  imageLoaded = isImageLoaded => this.setState({ isImageLoaded });

  visibleCornerstone = isVisibleCornerstone => this.setState({ isVisibleCornerstone });

  updateSwiper = () => {
    if (this.swiper) {
      this.swiper.update();
    }
  };

  disableCornerstoneTools = (cornerstoneElement) => {
    cornerstoneTools.mouseInput.disable(cornerstoneElement);
    cornerstoneTools.pan.disable(cornerstoneElement);
    cornerstoneTools.wwwc.disable(cornerstoneElement);
  };

  zoomin = /* istanbul ignore next */ () => {
    const cornerstoneElement = this.getImgBlock();
    const viewport = cornerstone.getViewport(cornerstoneElement);
    viewport.scale += 0.1;
    cornerstone.setViewport(cornerstoneElement, viewport);
  };
  zoomout = /* istanbul ignore next */ () => {
    const cornerstoneElement = this.getImgBlock();
    const viewport = cornerstone.getViewport(cornerstoneElement);
    if (viewport.scale > 0.1) {
      viewport.scale -= 0.1;
      cornerstone.setViewport(cornerstoneElement, viewport);
    }
  };

  moveImg = /* istanbul ignore next */ () => {
    const { touchMode } = this.state;
    const cornerstoneElement = this.getImgBlock();
    if (touchMode) {
      this.setState({ touchMode: false });
      this.swiper.allowTouchMove = false;
      cornerstoneTools.mouseInput.enable(cornerstoneElement);
      cornerstoneTools.pan.activate(cornerstoneElement, 1);
      cornerstoneTools.wwwc.disable(cornerstoneElement)
    } else {
      this.setState({ touchMode: true });
      this.swiper.allowTouchMove = true;
      this.disableCornerstoneTools(cornerstoneElement)
    }
  };

  fadeImg = /* istanbul ignore next */ () => {
    const { touchMode } = this.state;
    const cornerstoneElement = this.getImgBlock();
    if (!touchMode) {
      cornerstoneTools.mouseInput.enable(cornerstoneElement);
      cornerstoneTools.mouseWheelInput.enable(cornerstoneElement);
      cornerstoneTools.pan.disable(cornerstoneElement);
      cornerstoneTools.wwwc.activate(cornerstoneElement, 2)
    } else {
      this.swiper.allowTouchMove = true;
      this.disableCornerstoneTools(cornerstoneElement);
    }
    this.setState({ touchMode: true });
  };

  render() {
    const { onExpand, onShow, openedPanel, expandedPanel, currentPanel, onEdit, editedPanel, instanceIds } = this.props;
    const { touchMode, isVisibleCornerstone } = this.state;
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
      init: true,
      allowTouchMove: touchMode,
    };

    let swiperSlide;
    if (!_.isEmpty(instanceIds)) {
      swiperSlide = instanceIds.map((item, index) => {
        return (
          <div key={index}>
            <CornerstoneImage
              instanceIds={instanceIds}
              imageId={this.getURLtoImage(item)}
              visibleCornerstone={this.visibleCornerstone}
              imageLoaded={this.imageLoaded}
              isVisibleCornerstone={isVisibleCornerstone}
              index={index}
            />
          </div>
        );
      }
      )
    }

    return (
      <div className="section-detail">
        <div className="panel-group accordion">
          {(expandedPanel === IMAGES_PANEL || expandedPanel === 'all') ? <ImagesDetailPanel
            onExpand={onExpand}
            name={IMAGES_PANEL}
            title="Image(s) Series"
            isOpen={openedPanel === IMAGES_PANEL}
            currentPanel={currentPanel}
            isBtnShowPanel
            onShow={onShow}
            zoomin={this.zoomin}
            zoomout={this.zoomout}
            moveImg={this.moveImg}
            fadeImg={this.fadeImg}
          >
            <div className="panel-body-inner">
              <div className="form">
                <div className="form-group-wrapper dicom-container">
                  <Swiper
                    {...params}
                    ref={node => this.swiper = node ? node.swiper : null}
                  >
                    { swiperSlide || <div /> }
                  </Swiper>
                </div>
              </div>
            </div>
          </ImagesDetailPanel> : null}
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
