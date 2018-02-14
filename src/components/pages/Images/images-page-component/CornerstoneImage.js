import React, { PureComponent } from 'react';
import * as cornerstone from 'cornerstone-core';
import * as cornerstoneTools from 'cornerstone-tools';
import * as cornerstoneMath from 'cornerstone-math';
import * as cornerstoneWebImageLoader from 'cornerstone-web-image-loader';

export default class CornerstoneImage extends PureComponent {

  state={
    reEnableCornerstoneElement: true,
  };

  componentDidMount() {
    this.initCornerstone();
  }

  componentWillReceiveProps(nextProps) {
    const { instanceIds, imageLoaded } = this.props;
    if (nextProps.instanceIds[0] !== instanceIds[0]) {
      imageLoaded(true);
      this.initCornerstone();
    }
  }

  initCornerstone = () => {
    const { imageId, visibleCornerstone, index, imageLoaded } = this.props;
    const { reEnableCornerstoneElement } = this.state;
    const element = document.getElementById(`dicomImage-${index}`);
    /* istanbul ignore next */
    if (element) {
      cornerstoneTools.external.cornerstone = cornerstone;
      cornerstoneTools.external.cornerstoneMath = cornerstoneMath;
      cornerstoneWebImageLoader.external.cornerstone = cornerstone;
      cornerstoneWebImageLoader.external.cornerstoneMath = cornerstoneMath;

      if (reEnableCornerstoneElement) {
        cornerstone.enable(element);
      }

      cornerstone.loadImage(imageId).then((image) => {
        cornerstone.displayImage(element, image);
        if (image) {
          this.setState({ reEnableCornerstoneElement: false });
          visibleCornerstone(true);
          imageLoaded(true);
        }
      }).catch((e) => {
        this.setState({ reEnableCornerstoneElement: true });
        imageLoaded(false);
      })
    }
  };

  render() {
    const { isVisibleCornerstone, index } = this.props;
    return (
      <div id={`dicomImage-${index}`} style={{ width: '100%', height: '512px', margin: 'auto', visibility: isVisibleCornerstone ? 'visible' : 'hidden' }} />
    )
  }
}
