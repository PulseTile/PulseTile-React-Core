import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { fabric } from 'fabric';

import { brushSettings, fontsSettings, canvasSettings } from '../drawings.config';
import PTButton from '../../../ui-elements/PTButton/PTButton';

export default class DrawingsPaint extends PureComponent {
  state = {
    currentView: 'brush',
    brushSize: brushSettings.sizes[0],
    brushColor: brushSettings.colors.base[0],
    textParams: {
      fill: fontsSettings.fills[0],
      text: '',
      fontSize: fontsSettings.fontSizes[2],
      fontFamily: fontsSettings.fontFamilies[0],
    },
    addTextObject: null,
    canvasId: 'drawing-canvas',
    canvas: null,
    canvasEl: null,
    uploadParams: null,
    uploadImageURL: '',
    isCanDelete: false,
    imagesName: '',
    file: '',
  };

  componentWillMount() {
    const { detail } = this.props;
    if (detail) {
      this.showEditCanvas(detail);
    }
    this.clearTextParams();
  }

  componentDidMount() {
    this.initCanvasDrawing();
  }

  setCanvasSize = () => {
    const { canvasEl, canvas } = this.state;
    const ratio = 0.5625; // 9/16
    const holder = canvasEl.closest('.drawing-canvas-holder');
    const width = holder.offsetWidth - 2;

    if (holder) {
      canvas.setWidth(width);
      canvas.setHeight(width * ratio);
    }
  };

  setModeBrush = () => {
    const { canvas, brushSize, brushColor } = this.state;
    canvas.isDrawingMode = true;
    canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
    canvas.freeDrawingBrush.color = brushColor;
    canvas.freeDrawingBrush.width = brushSize;
  };

  getCanvasImage64 = () => {
    const { onChangeImageCanvas } = this.props;
    let image64 = null;
    if (!fabric.Canvas.supports('toDataURL')) {
      console.log('This browser doesn\'t provide means to serialize canvas to an image');
    } else {
      image64 = this.state.canvas.toDataURL('png');
    }
    onChangeImageCanvas(image64);
  };

  initCanvasDrawing = () => {
    const { canvasId } = this.state;
    const canvas = window._canvas = new fabric.Canvas(canvasId, canvasSettings);
    this.setState({ canvasEl: document.getElementById(canvasId), canvas });
    setTimeout(() => {
      this.subscribeToCanvasEvents();
      this.setCanvasSize();
      this.setModeBrush();
    }, 0);
  };

  canvasModified = () => {
    this.setIsCanDelete();
    this.getCanvasImage64();
  };

  subscribeToCanvasEvents = () => {
    this.state.canvas.on('object:selected', (object) => {
      this.setTextObject(object.target);
      this.setIsCanDelete();
    });
    this.state.canvas.on('object:modified', this.canvasModified);
    this.state.canvas.on('object:added', this.canvasModified);
    this.state.canvas.on('object:removed', this.canvasModified);
    this.state.canvas.on('mouse:up', this.canvasModified);
  };

  setModeFont = () => {
    this.state.canvas.isDrawingMode = false;
  };

   setModePicture = () => {
     this.state.canvas.isDrawingMode = false;
   };

  setModeDrawing = (mode) => {
    switch (mode) {
      case 'fonts':
        this.setModeFont();
        break;
      case 'picture':
        this.setModePicture();
        break;
      default:
        this.setModeBrush();
    }
  };

  isActiveView = (activeView) => {
    const { currentView } = this.state;
    return activeView === currentView;
  };

  changeActiveView = (activeView) => {
    this.setState({ currentView: activeView });
    this.setModeDrawing(activeView);
  };

  changeBrushSize = (e) => {
    this.setState({ brushSize: e.target.value });
    this.state.canvas.freeDrawingBrush.width = e.target.value;
  };

  isActiveColour = (color) => {
    return color === this.state.brushColor;
  };

  changeBrushColor = (color) => {
    this.setState({ brushColor: color });
    this.state.canvas.freeDrawingBrush.color = color;
  };

  changeFontParams = (textParams) => {
    if (this.isTextObject && this.state.addTextObject) {
      this.state.addTextObject.setText(textParams.text);
      this.state.addTextObject.setFill(textParams.fill);
      this.state.addTextObject.setFontSize(textParams.fontSize);
      this.state.addTextObject.setFontFamily(textParams.fontFamily);
      this.state.canvas.renderAll();
    }
    this.setState({ textParams: {
      fill: textParams.fill,
      text: textParams.text,
      fontSize: textParams.fontSize,
      fontFamily: textParams.fontFamily,
    } });
  };

  isTextObject = () => {
    const { addTextObject } = this.state;
    return !!addTextObject;
  };

  clearTextParams = () => {
    const textParams = {
      text: 'New text',
      fill: fontsSettings.fills[0],
      fontSize: fontsSettings.fontSizes[2],
      fontWeight: 'normal',
      fontFamily: fontsSettings.fontFamilies[0],
    };
    this.setState({ textParams })
  };

  onChangeTextParams = (key, value) => {
    this.state.textParams[key] = value;
    this.changeFontParams(this.state.textParams)
  };

  setTextObject = (object) => {
    if (object instanceof fabric.Text) {
      this.state.addTextObject = object;
      this.setState({ textParams: {
        fill: object.fill,
        text: object.text,
        fontSize: object.fontSize,
        fontFamily: object.fontFamily,
      } })
    } else {
      this.state.addTextObject = null;
      this.clearTextParams();
    }
  };

  addNewText = (text) => {
    this.state.addTextObject = new fabric.Text(text, this.state.textParams);
    this.state.canvas.add(this.state.addTextObject);
  };

  calckScale = (parentWidth, parentHeight, childWidth, childHeight) => {
    let scale = 1;
    const parentRatio = parentHeight / parentWidth; // 9 / 16 (56.25%)
    const childRatio = childHeight / childWidth;

    if (childWidth > parentWidth || childHeight > parentHeight) {
      if (childRatio > parentRatio) {
        scale = parentHeight / childHeight;
      } else {
        scale = parentWidth / childWidth;
      }
    }

    return scale;
  };

  addPictureToCanvas = (base64) => {
    this.resizeCanvas();
    setTimeout(() => {
      fabric.util.loadImage(base64, (img) => {
        const object = new fabric.Image(img);
        const scale = this.calckScale(this.state.canvas.width, this.state.canvas.height, object.width, object.height);

        object.hasRotatingPoint = true;
        object.scaleX = object.scaleY = scale;
        object.isDrawingMode = true;
        this.state.canvas.add(object);
        this.state.canvas.renderAll();
      }, null, { crossOrigin: 'Anonymous' });
    }, 11);
  };

  setIsCanDelete = () => {
    if (this.state.canvas &&
      !this.state.canvas.isDrawingMode &&
      (this.state.canvas.getActiveObject() || this.state.canvas.getActiveGroup())) {
      this.setState({ isCanDelete: true });
    } else {
      this.setState({ isCanDelete: false });
    }
  };

  deleteObject = () => {
    const selectedObject = this.state.canvas.getActiveObject();
    const selectedMultipleObjects = this.state.canvas.getActiveGroup();

    if (selectedObject) {
      selectedObject.remove();
    } else {
      selectedMultipleObjects._objects.forEach((object) => {
        object.remove();
        selectedMultipleObjects.removeWithUpdate(object);
      });
    }
    setTimeout(() => {
      this.state.canvas.discardActiveGroup();
      this.state.canvas.renderAll();
    }, 10)
  };

  clearCanvas = () => {
    if (this.state.canvas) {
      this.state.canvas.clear();
    }
  };

  showEditCanvas = (data) => {
    this.clearCanvas();
    if (data.drawingBase64) {
      this.addPictureToCanvas(data.drawingBase64);
    }
  };

  resizeCanvas = () => {
    setTimeout(() => {
      this.setCanvasSize();
    }, 10);
  };

  onChange = (event) => {
    this.setState({ file: event.target.files[0] });
    this.setState({ imagesName: event.target.files[0].name });
  };

  uploadPicture = () => {
    const { file } = this.state;
    let reader;
    let imgData = {};
    if (file) {
      imgData = file;
      reader = new FileReader();

      reader.onload = (event) => {
        const image64 = event.target.result;
        imgData.imgencode = image64;
        this.addPictureToCanvas(image64);
      };

      // when the file is read it triggers the onload event above.
      reader.readAsDataURL(imgData);
    }
  };

  render() {
    const { brushSize, textParams, isCanDelete, imagesName } = this.state;
    return (
      <div>
        <div className="drawing-control-panel">
          <div className="drawing-control-header">
            <div className="wrap-control-group">
              <div className="control-group without-side-indent right">
                { isCanDelete ? <PTButton className="btn btn-icon-normal btn-drawing btn-drawing-delete" onClick={() => this.deleteObject()}>
                  <i className="btn-icon fa fa-times" />
                </PTButton> : null}
              </div>
              <div className="control-group without-side-indent left">
                <PTButton className={classNames('btn btn-icon-normal btn-drawing', { 'active': this.isActiveView('brush') })} onClick={() => this.changeActiveView('brush')}>
                  <i className="btn-icon fa fa-paint-brush" />
                </PTButton>
                <PTButton className={classNames('btn btn-icon-normal btn-drawing', { 'active': this.isActiveView('fonts') })} onClick={() => this.changeActiveView('fonts')}>
                  <i className="btn-icon fa fa-font" />
                </PTButton>
                <PTButton className={classNames('btn btn-icon-normal btn-drawing', { 'active': this.isActiveView('picture') })} onClick={() => this.changeActiveView('picture')}>
                  <i className="btn-icon fa fa-picture-o" />
                </PTButton>
              </div>
            </div>
          </div>
          <div className="drawing-control-body">
            { this.isActiveView('brush') ? <div>
              <div className="drawing-form-group">
                <div className="drawing-form drawing-form-size">
                  <div className="drawing-label">Size:</div>
                  <div className="drawing-holder">
                    <select
                      className="drawing-form-small form-control input-sm"
                      id="brushSizes"
                      name="brushSizes"
                      onChange={this.changeBrushSize}
                      value={brushSize}
                    >
                      { brushSettings.sizes.map(size => <option value={size}>{`${size}px`}</option>)}
                    </select>
                  </div>
                </div>
                <div className="drawing-form">
                  <div className="drawing-label">Colour:</div>
                  <div className="drawing-holder">
                    <div className="drawing-colors">
                      {Object.keys(brushSettings.colors).map((pointColors, i) => (
                        <div className="drawing-colors-group" key={i}>
                          { brushSettings.colors[pointColors].map(color => <div className={classNames('drawing-color', { 'active': this.isActiveColour(color) })} onClick={() => this.changeBrushColor(color)} style={{ background: color }} />)}
                        </div>)
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div> : null}
            { this.isActiveView('fonts') ? <div>
              <div className="drawing-form-group">
                <div className="drawing-form drawing-form-left">
                  <div className="drawing-label">Font:</div>
                  <div className="drawing-holder">
                    <select
                      className="drawing-form-middle form-control input-sm"
                      id="fontFamily"
                      name="fontFamily"
                      value={textParams.fontFamily}
                      onChange={e => this.onChangeTextParams('fontFamily', e.target.value)}
                    >
                      { fontsSettings.fontFamilies.map(fontFamily => <option value={fontFamily}>{fontFamily}</option>)}
                    </select>
                  </div>
                </div>
                <div className="drawing-form drawing-form-left">
                  <div className="drawing-label">Size:</div>
                  <div className="drawing-holder">
                    <select
                      className="drawing-form-small form-control input-sm"
                      id="fontSize"
                      name="fontSize"
                      value={textParams.fontSize}
                      onChange={e => this.onChangeTextParams('fontSize', e.target.value)}
                    >
                      { fontsSettings.fontSizes.map(fontSize => <option value={fontSize}>{`${fontSize}pt`}</option>)}
                    </select>
                  </div>
                </div>
                <div className="drawing-form drawing-form-left">
                  <div className="drawing-label">Colour:</div>
                  <div className="drawing-holder">
                    <select
                      className="drawing-form-small form-control input-sm"
                      id="fontFill"
                      name="fontFill"
                      value={textParams.fill}
                      onChange={e => this.onChangeTextParams('fill', e.target.value)}
                    >
                      { fontsSettings.fills.map(fill => <option value={fill}>{fill}</option>)}
                    </select>
                  </div>
                </div>
              </div>
              <div className="drawing-form-group">
                <div className="drawing-form">
                  <div className="drawing-label">Text:</div>
                  <div className="drawing-holder">
                    <PTButton className="btn btn-success btn-drawing-add" onClick={() => this.addNewText(addText)}>Add</PTButton>
                    <div className="wrap-overflow">
                      <input
                        className="form-control input-sm input-with-btn"
                        type="text"
                        name="addText"
                        id="addText"
                        value={textParams.text}
                        defaultValue="New Text"
                        onChange={e => this.onChangeTextParams('text', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div> : null}
            { this.isActiveView('picture') ? <div>
              <div className="drawing-form-group">
                <div className="drawing-form">
                  <div className="drawing-label">Select Image:</div>
                  <div className="drawing-holder">
                    <PTButton className="btn btn-success btn-drawing-upload-file" onClick={() => this.uploadPicture()}>Upload</PTButton>
                    <div className="wrap-fcustomfile drawing-fcustomfile">
                      <div className="fcustomfile-control">
                        <input
                          accept="image/jpeg,image/png,image/gif"
                          type="file"
                          name="logoPath"
                          id="logoPath"
                          onChange={this.onChange}
                        />
                        <label htmlFor="logoPath" className="btn btn-success btn-inverse btn-drawing-browse"><span>Browse...</span></label>
                      </div>
                      <div className="fcustomfile-text">{imagesName}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div> : null}
          </div>
        </div>
        <div className="drawing-wrapper">
          <div className="drawing-canvas-holder">
            <canvas id="drawing-canvas" className="drawing-canvas" width={500} height={406} />
          </div>
        </div>
      </div>
    )
  }
}
