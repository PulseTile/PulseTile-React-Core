import React, { PureComponent } from 'react';
import Swiper from 'react-id-swiper';
import 'react-id-swiper/src/styles/scss/swiper.scss';
import moment from 'moment';
import _ from 'lodash/fp';

import PluginDetailPanel from '../../../plugin-page-component/PluginDetailPanel';
import ImagesDetailPanel from '../images-page-component/ImagesDetailPanel';
import { valuesNames, valuesLabels } from '../forms.config';
import { hasClass } from '../../../../utils/plugin-helpers.utils';

const IMAGES_PANEL = 'imagesPanel';
const IMAGES_DETAIL_PANEL = 'imagesDetailPanel';
const SCALE = 100;

export default class ImagesDetail extends PureComponent {
  state = {
    styleSwiper: {},
    coordX: '',
    coordY: '',
    drag: false,
    targ: {},
    marginTop: 0,
    marginLeft: 0,
    touchMode: true,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.instanceIds[0] !== this.props.instanceIds[0]) {
      this.setState({ styleSwiper: {}, touchMode: true });
      this.swiper.allowTouchMove = true;
    }
  }

  componentDidMount() {
    document.onmousedown = this.startDrag;
    document.onmouseup = this.stopDrag;
  }

  getURLtoImage = (id) => `${window.location.protocol}//46.101.95.245/orthanc/instances/${id}/preview`;

  startDrag = /* istanbul ignore next */ (e) => {
    if (!this.state.touchMode) {
      if (e.preventDefault) e.preventDefault();

      let target = e.target ? e.target : e.srcElement;

      if (hasClass(target, 'swiper-slide')) {
        target = target.querySelector('img');
      }

      if (target.id !== `img-${this.swiper.activeIndex}`) { return }

      this.setState({ targ: target });

      if (target.id !== `img-${this.swiper.activeIndex}`) { return }
      const marginTop = parseInt(target.style.marginTop) || 0;
      const marginLeft = parseInt(target.style.marginLeft) || 0;
      this.setState({
        coordX: parseInt(e.clientX),
        coordY: parseInt(e.clientY),
        drag: true,
        marginTop,
        marginLeft,
      });

      document.onmousemove = this.dragDiv;

      return false;
    }
  };

  dragDiv = (e) => {
    const { drag, coordX, coordY, styleSwiper, marginTop, marginLeft } = this.state;
    if (!drag) { return }
    const currentCoordX = e.clientX;
    const currentCoordY = e.clientY;
    this.setState({ styleSwiper: {
      ...styleSwiper,
      [this.swiper.activeIndex]: {
        ...styleSwiper[this.swiper.activeIndex],
        marginLeft: `${marginLeft - coordX + currentCoordX}px`,
        marginTop: `${marginTop - coordY + currentCoordY}px`,
      },
    } });
    return false;
  };

  stopDrag = () => {
    this.setState({ drag: false });
  };

  zoomin = /* istanbul ignore next */ () => {
    const { styleSwiper } = this.state;
    const myImg = document.getElementById(`img-${this.swiper.activeIndex}`);
    const currWidth = myImg.clientWidth;
    const currHeight = myImg.clientHeight;

    this.setState({ styleSwiper: {
      ...styleSwiper,
      [this.swiper.activeIndex]: {
        ...styleSwiper[this.swiper.activeIndex],
        width: `${currWidth + SCALE}px`,
        height: `${currHeight + SCALE}px`,
        maxWidth: 'initial',
        maxHeight: 'initial',
      },
    } });
  };
  zoomout = /* istanbul ignore next */ () => {
    const { styleSwiper } = this.state;
    const myImg = document.getElementById(`img-${this.swiper.activeIndex}`);
    const currWidth = myImg.clientWidth;
    const currHeight = myImg.clientHeight;
    this.setState({ styleSwiper: {
      ...styleSwiper,
      [this.swiper.activeIndex]: {
        ...styleSwiper[this.swiper.activeIndex],
        width: `${currWidth - SCALE}px`,
        height: `${currHeight - SCALE}px`,
        maxWidth: 'initial',
        maxHeight: 'initial',
      },
    } });
  };

  moveImg = () => {
    this.setState({ touchMode: false });
    this.swiper.allowTouchMove = false;
  };

  fadeImg = () => {
    this.setState({ touchMode: true });
    this.swiper.allowTouchMove = true;
  };

  render() {
    const { onExpand, onShow, openedPanel, expandedPanel, currentPanel, onEdit, editedPanel, instanceIds } = this.props;
    const { styleSwiper, touchMode } = this.state;
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
        return (<div key={index}><img id={`img-${index}`} style={styleSwiper[index] ? styleSwiper[index] : null} src={this.getURLtoImage(item)} /></div>)
      });
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
                    { swiperSlide }
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
