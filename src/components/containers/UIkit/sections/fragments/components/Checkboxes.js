import React, { Component } from 'react';

/**
 * This component returns content of Checkboxes section
 *
 * @return {XML}
 * @constructor
 */
export default class Checkboxes extends Component {

  state = {
    isCheckboxTest1: false,
    isCheckboxTest2: false,
    isCheckboxInlineTest1: false,
    isCheckboxInlineTest2: false,
    isCheckboxInlineTest3: false,
  };

  checkPosition = current => {
    this.setState({
      [current] : !this.state[current]
    });
  };

  render() {
    const { isCheckboxTest1, isCheckboxTest2, isCheckboxInlineTest1, isCheckboxInlineTest2, isCheckboxInlineTest3 } = this.state;
    return (
      <div id="checkboxes" className="ui-section">
        <strong className="ui-title">Checkboxes</strong>
        <div className="form-group-wrapper">
          <div className="form-group">
            <div className="input-holder">
              <div className="input-holder">
                <div className="wrap-fcustominp">
                  <div className="fcustominp" onClick={() => this.checkPosition('isCheckboxTest1')}>
                    <input type="checkbox" id="checkboxTest1" checked={isCheckboxTest1} />
                    <label for="checkboxTest1"></label>
                  </div>
                  <label className="fcustominp-label">Checkbox Test 1</label>
                </div>
               </div>
             </div>
           </div>
           <div className="form-group">
             <div className="input-holder">
               <div className="input-holder">
                 <div className="wrap-fcustominp">
                   <div className="fcustominp" onClick={() => this.checkPosition('isCheckboxTest2')}>
                     <input type="checkbox" id="checkboxTest2" checked={isCheckboxTest2}  />
                     <label for="checkboxTest2"></label>
                   </div>
                   <label className="fcustominp-label">Checkbox Test 2</label>
                 </div>
               </div>
             </div>
           </div>
           <div className="form-group">
             <div className="input-holder">
               <div className="input-holder">
                 <div className="wrap-fcustominp">
                   <div className="fcustominp-state disabled">
                     <div className="fcustominp">
                       <input type="checkbox" id="checkboxTest6" disabled />
                       <label for="radioTest6"></label>
                     </div>
                     <label for="radioTest6" className="fcustominp-label">Checkbox Test 3</label>
                   </div>
                 </div>
               </div>
             </div>
            </div>
            <div className="form-group">
              <div className="input-holder">
                <div className="input-holder">
                  <div className="wrap-fcustominps-inline">
                    <div className="wrap-fcustominp">
                      <div className="fcustominp" onClick={() => this.checkPosition('isCheckboxInlineTest1')}>
                        <input type="checkbox" id="checkboxTest3" checked={isCheckboxInlineTest1} />
                        <label for="checkboxTest3"></label>
                      </div>
                      <label className="fcustominp-label">Checkbox Inline Test 1</label>
                    </div>
                    <div className="wrap-fcustominp">
                      <div className="fcustominp" onClick={() => this.checkPosition('isCheckboxInlineTest2')}>
                        <input type="checkbox" id="checkboxTest4" checked={isCheckboxInlineTest2} />
                        <label for="checkboxTest4"></label>
                      </div>
                      <label className="fcustominp-label">Checkbox Inline Test 2</label>
                    </div>
                    <div className="wrap-fcustominp">
                      <div className="fcustominp" onClick={() => this.checkPosition('isCheckboxInlineTest3')}>
                        <input type="checkbox" id="checkboxTest5" checked={isCheckboxInlineTest3} />
                        <label for="checkboxTest5"></label>
                      </div>
                      <label className="fcustominp-label">Checkbox Inline Test 3</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
  }
}