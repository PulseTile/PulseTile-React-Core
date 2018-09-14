import React, { PureComponent } from 'react';
import classNames from 'classnames';

import PTButton from '../../../ui-elements/PTButton/PTButton';

export default class OrdersSelectable extends PureComponent {
  render() {
    const { idSelectedLeft, chosenOrders, idSelectedRight, listOrders, isFirstPage, setSelectedLeft, setSelectedRight, toggleSelectedItem, chooseItem, chooseAll, cancelItem, cancelAll, pageTwo, pageOne } = this.props;
    return (
      <div>
        {isFirstPage ? <div className="form-group">
          <div className="selectable">
            <div className="selectable-col selectable-from">
              <label htmlFor="" className="control-label">Available Orders</label>
              <div className="selectable-list">
                { listOrders.map(suggestion => <div className={classNames('selectable-item', { 'selected': suggestion.code === idSelectedLeft })} onClick={() => setSelectedLeft(suggestion.code)} onDoubleClick={() => toggleSelectedItem(suggestion.code)}>
                  <span>{ suggestion.text }</span>
                </div>)}
              </div>
            </div>
            <div className="selectable-control">
              <div className="selectable-control-group">
                <div className="btn btn-inverse btn-success btn-order" onClick={() => chooseItem()}>&rsaquo;</div>
                <div className="btn btn-inverse btn-success btn-order" onClick={() => chooseAll()}>&raquo;</div>
              </div>
              <div className="selectable-control-group">
                <div className="btn btn-inverse btn-success btn-order" onClick={() => cancelItem()}>&lsaquo;</div>
                <div className="btn btn-inverse btn-success btn-order" onClick={() => cancelAll()}>&laquo;</div>
              </div>
            </div>
            <div className="selectable-col selectable-to">
              <label htmlFor="" className="control-label">Selected Orders</label>
              <div className="selectable-list">
                { chosenOrders.map(chosenOrder => <div className={classNames('selectable-item', { 'selected': chosenOrder.code === idSelectedRight })} onClick={() => setSelectedRight(chosenOrder.code)} onDoubleClick={() => toggleSelectedItem(chosenOrder.code)}>
                  <span>{ chosenOrder.text }</span>
                </div>)}
              </div>
            </div>
          </div>
          <div className="wrap-control-group">
            <div className="control-group right">
              <PTButton className={classNames('btn btn-success btn-inverse btn-create', { 'disabled': !chosenOrders.length })} onClick={() => pageTwo()}>
                <i className="btn-icon fa fa-plus"></i>
                <span className="btn-text"> Create</span>
              </PTButton>
            </div>
          </div>
        </div> : null }
        {!isFirstPage ? <div className="row-expand">
          <div className="col-expand-left">
            <div className="form-group">
              <label htmlFor="" className="control-label">Create Selected Orders?</label>
              {chosenOrders.map(chosenOrder => <ul className="orders-choosen-list">
                <li className="orders-choosen-item">
                  <i className="orders-choosen-close fa fa-times-circle" onClick={() => toggleSelectedItem(chosenOrder.code)}></i>
                  <span> { chosenOrder.text }</span>
                </li>
              </ul>)}
              <div className="wrap-control-group">
                <div className="control-group right">
                  <PTButton className="btn btn-primary btn-inverse" onClick={() => pageOne()}>
                    <i className="btn-icon fa fa-angle-left"></i>
                    <span className="btn-text"> Back</span>
                  </PTButton>
                </div>
              </div>
            </div>
          </div>
        </div> : null }
      </div>
    )
  }
}
