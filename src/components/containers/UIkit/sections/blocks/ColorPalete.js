import React from 'react';

/**
 * This component returns Color Palete block
 *
 * @return {XML}
 * @constructor
 */
const ColorPalete = () => {
  return (
    <div id="color-pallete" className="ui-section">
      <h2 className="ui-main-title">Color Pallete</h2>
      <div id="main-colors" className="ui-sub-section">
        <strong className="ui-title">Main colors</strong>
        <div className="row">
          <div className="col-xs-6 col-md-4">
            <div className="ui-color-box ui-color-default">
              <div className="ui-color-box-example"></div>
              <div className="ui-color-heading">Default Color</div>
              <div className="ui-color-box-hex"></div>
            </div>
          </div>
          <div className="col-xs-6 col-md-4">
            <div className="ui-color-box ui-color-primary">
              <div className="ui-color-box-example"></div>
              <div className="ui-color-heading">Primary Color</div>
              <div className="ui-color-box-hex"></div>
            </div>
          </div>
          <div className="col-xs-6 col-md-4">
            <div className="ui-color-box ui-color-success">
              <div className="ui-color-box-example"></div>
              <div className="ui-color-heading">Success Color</div>
              <div className="ui-color-box-hex"></div>
            </div>
          </div>
          <div className="col-xs-6 col-md-4">
            <div className="ui-color-box ui-color-info">
              <div className="ui-color-box-example"></div>
              <div className="ui-color-heading">Info Color</div>
              <div className="ui-color-box-hex"></div>
            </div>
          </div>
          <div className="col-xs-6 col-md-4">
            <div className="ui-color-box ui-color-warning">
              <div className="ui-color-box-example"></div>
              <div className="ui-color-heading">Warning Color</div>
              <div className="ui-color-box-hex"></div>
            </div>
          </div>
          <div className="col-xs-6 col-md-4">
             <div className="ui-color-box ui-color-danger">
               <div className="ui-color-box-example"></div>
               <div className="ui-color-heading">Danger Color</div>
               <div className="ui-color-box-hex"></div>
             </div>
          </div>
        </div>
      </div>
      <div id="theme-colors" className="ui-sub-section">
        <strong className="ui-title">Theme colors</strong>
        <div className="row">
          <div className="col-xs-6 col-md-4">
            <div className="ui-color-box ui-color-base-color">
              <div className="ui-color-box-example"></div>
              <div className="ui-color-heading">Base Color</div>
              <div className="ui-color-box-hex"></div>
            </div>
          </div>
          <div className="col-xs-6 col-md-4">
            <div className="ui-color-box ui-color-light-color">
              <div className="ui-color-box-example"></div>
              <div className="ui-color-heading">Light Color</div>
              <div className="ui-color-box-hex"></div>
            </div>
          </div>
          <div className="col-xs-6 col-md-4">
            <div className="ui-color-box ui-color-lighter-color">
              <div className="ui-color-box-example"></div>
              <div className="ui-color-heading">Lighter Color</div>
              <div className="ui-color-box-hex"></div>
            </div>
          </div>
        </div>
      </div>
      <div id="black-white-colors" className="ui-sub-section">
        <strong className="ui-title">Black and White colors</strong>
        <ul className="ui-list-colors list-reset">
          <li className="ui-list-colors-item"><span className="ui-color" style={{ background: '#ffffff'}}></span><span className="ui-color-name">#ffffff</span></li>
          <li className="ui-list-colors-item"><span className="ui-color" style={{ background: '#f7f7f7'}}></span><span className="ui-color-name">#f7f7f7</span></li>
          <li className="ui-list-colors-item"><span className="ui-color" style={{ background: '#f3f3f3'}}></span><span className="ui-color-name">#f3f3f3</span></li>
          <li className="ui-list-colors-item"><span className="ui-color" style={{ background: '#eeeeee'}}></span><span className="ui-color-name">#eeeeee</span></li>
          <li className="ui-list-colors-item"><span className="ui-color" style={{ background: '#e8e8e8'}}></span><span className="ui-color-name">#e8e8e8</span></li>
          <li className="ui-list-colors-item"><span className="ui-color" style={{ background: '#d8d8d8'}}></span><span className="ui-color-name">#d8d8d8</span></li>
          <li className="ui-list-colors-item"><span className="ui-color" style={{ background: '#cccccc'}}></span><span className="ui-color-name">#cccccc</span></li>
          <li className="ui-list-colors-item"><span className="ui-color" style={{ background: '#bdbdbd'}}></span><span className="ui-color-name">#bdbdbd</span></li>
          <li className="ui-list-colors-item"><span className="ui-color" style={{ background: '#aaaaaa'}}></span><span className="ui-color-name">#aaaaaa</span></li>
          <li className="ui-list-colors-item"><span className="ui-color" style={{ background: '#949494'}}></span><span className="ui-color-name">#949494</span></li>
          <li className="ui-list-colors-item"><span className="ui-color" style={{ background: '#303030'}}></span><span className="ui-color-name">#303030</span></li>
          <li className="ui-list-colors-item"><span className="ui-color" style={{ background: '#222222'}}></span><span className="ui-color-name">#222222</span></li>
          <li className="ui-list-colors-item"><span className="ui-color" style={{ background: '#000000'}}></span><span className="ui-color-name">#000000</span></li>
        </ul>
      </div>
    </div>
  );
};

export default ColorPalete;
