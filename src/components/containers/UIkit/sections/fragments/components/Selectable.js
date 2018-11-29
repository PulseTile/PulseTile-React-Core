import React, { Component } from 'react';

export default class Selectable extends Component {

  state = {
    leftItems: [
      { id: 1, text: 'Item 1' },
      { id: 2, text: 'Item 2' },
      { id: 3, text: 'Item 3' },
      { id: 4, text: 'Item 4' },
      { id: 5, text: 'Item 5' },
      { id: 6, text: 'Item 6' },
    ],
    rightItems: [],
    selectedItemId: null,
  };

  /**
   * This function passes item from left block to right when user makes double click on it
   *
   * @param {number} id
   */
  toggleLeftSelectedItem = id => {
    const { leftItems, rightItems } = this.state;
    const newLeftItems = leftItems.filter(item => {
      return item.id !== id;
    });
    const selectedItem = leftItems.filter(item => {
      return item.id === id;
    });
    const newRightItems = rightItems.concat(selectedItem);
    this.setState({
      leftItems: newLeftItems,
      rightItems: newRightItems,
      selectedItemId: null,
   });
  };

  /**
   * This function passes item from right block to left when user makes double click on it
   *
   * @param {number} id
   */
  toggleRightSelectedItem = id => {
    const { leftItems, rightItems } = this.state;
    const newRightItems = rightItems.filter(item => {
      return item.id !== id;
    });
    const selectedItem = rightItems.filter(item => {
      return item.id === id;
    });
    const newLeftItems = leftItems.concat(selectedItem);
    this.setState({
      leftItems: newLeftItems,
      rightItems: newRightItems,
      selectedItemId: null,
    });
  };

  /**
   * This function sets current selected item
   *
   * @param {number} id
   */
  setSelectedItem = id => {
    this.setState({
      selectedItemId: id,
    });
  };

  /**
   * This function returns className to item <div>
   *
   * @param {number} id
   * @return {string}
   */
  getItemClassName = id => {
    const { selectedItemId } = this.state;
    return (selectedItemId === id) ? "selectable-item selected" : "selectable-item";
  };

  /**
   * This function passes item from left block to right one after ">" clicking
   */
  chooseItem = () => {
    const { leftItems, rightItems, selectedItemId } = this.state;
    if (selectedItemId) {
      const newLeftItems = leftItems.filter(item => {
        return item.id !== selectedItemId;
      });
      const selectedItem = leftItems.filter(item => {
        return item.id === selectedItemId;
      });
      const newRightItems = rightItems.concat(selectedItem);
      this.setState({
        leftItems: newLeftItems,
        rightItems: newRightItems,
        selectedItemId: null,
      });
    }
  };

  /**
   * This function passes item from right block to left one after "<" clicking
   */
  cancelItem = () => {
    const { leftItems, rightItems, selectedItemId } = this.state;
    if (selectedItemId) {
      const newRightItems = rightItems.filter(item => {
        return item.id !== selectedItemId;
      });
      const selectedItem = rightItems.filter(item => {
        return item.id === selectedItemId;
      });
      const newLeftItems = leftItems.concat(selectedItem);
      this.setState({
        leftItems: newLeftItems,
        rightItems: newRightItems,
        selectedItemId: null,
      });
    }
  };

  /**
   * This function passes all items from left block to right one after ">>" clicking
   */
  chooseAll = () => {
    const { leftItems, rightItems } = this.state;
    const newRightItems = rightItems.concat(leftItems);
    this.setState({
      leftItems: [],
      rightItems: newRightItems,
      selectedItemId: null,
    });
  };

  /**
   * This function passes all items from right block to left one after "<<" clicking
   */
  cancelAll = () => {
    const { leftItems, rightItems } = this.state;
    const newLeftItems = leftItems.concat(rightItems);
    this.setState({
      leftItems: newLeftItems,
      rightItems: [],
      selectedItemId: null,
    });
  };

  render() {
    const { leftItems, rightItems } = this.state;
    return (
      <div id="selectable" className="ui-section">
        <strong className="ui-title">Selectable</strong>
        <div className="form-group-wrapper">
          <div className="form-group">
            <div className="selectable">
              <div className="selectable-col selectable-from">
                <label className="control-label">Available Items</label>
                <div className="selectable-list">
                  { leftItems.map((item, key) => {
                      const className = this.getItemClassName(item.id);
                      return (
                        <div key={key} className={className} onDoubleClick={() => this.toggleLeftSelectedItem(item.id)} onClick={() => this.setSelectedItem(item.id)}>
                          <span>{ item.text }</span>
                        </div>
                      );
                    })
                  }
                </div>
              </div>
              <div className="selectable-control">
                 <div className="selectable-control-group">
                    <div className="btn btn-inverse btn-success btn-order" onClick={() => this.chooseItem()}>&rsaquo;</div>
                    <div className="btn btn-inverse btn-success btn-order" onClick={() => this.chooseAll()}>&raquo;</div>
                 </div>
                 <div className="selectable-control-group">
                    <div className="btn btn-inverse btn-success btn-order" onClick={() => this.cancelItem()}>&lsaquo;</div>
                    <div className="btn btn-inverse btn-success btn-order" onClick={() => this.cancelAll()}>&laquo;</div>
                 </div>
               </div>
               <div className="selectable-col selectable-to">
                 <label className="control-label">Selected Items</label>
                 <div className="selectable-list">
                   { rightItems.map((item, key) => {
                       const className = this.getItemClassName(item.id);
                       return (
                         <div key={key} className={className} onDoubleClick={() => this.toggleRightSelectedItem(item.id)} onClick={() => this.setSelectedItem(item.id)}>
                           <span>{ item.text }</span>
                         </div>
                       );
                     })
                   }
                 </div>
               </div>
             </div>
           </div>
        </div>
      </div>
    );
  }
};
