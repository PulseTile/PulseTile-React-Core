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
    const { instanceIds } = this.props;
    if (nextProps.instanceIds[0] !== instanceIds[0]) {
      this.initCornerstone();
    }
  }

  initCornerstone = () => {
    const { imageId, visibleCornerstone, index } = this.props;
    const { reEnableCornerstoneElement } = this.state;
    const element = document.getElementById(`dicomImage-${index}`);
    /* istanbul ignore next */
    if (element) {
      console.log('element ---->', element);
      cornerstoneTools.external.cornerstone = cornerstone;
      cornerstoneTools.external.cornerstoneMath = cornerstoneMath;
      cornerstoneWebImageLoader.external.cornerstone = cornerstone;
      cornerstoneWebImageLoader.external.cornerstoneMath = cornerstoneMath;

      if (reEnableCornerstoneElement) {
        console.log('reEnableCornerstoneElement --->', reEnableCornerstoneElement);
        cornerstone.enable(element);
      }

      cornerstone.loadImage(imageId).then((image) => {
        console.log('image --->', image);
        cornerstone.displayImage(element, image);
        if (image) {
          this.setState({ reEnableCornerstoneElement: false });
          visibleCornerstone(true)
        }
      }).catch((e) => {
        console.log('errorsLoadImage --->', e);
        this.setState({ reEnableCornerstoneElement: true });
        console.log(e);
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
