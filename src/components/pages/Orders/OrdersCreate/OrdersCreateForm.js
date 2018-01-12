import React, { PureComponent } from 'react';
import { Field, reduxForm } from 'redux-form'

import ValidatedInput from '../../../form-fields/ValidatedInputFormGroup';
import DateInput from '../../../form-fields/DateInput';
import { valuesNames, valuesLabels } from '../forms.config';
import { defaultFormValues } from './default-values.config';
import OrdersSelectable from './OrdersSelectable'

@reduxForm({ form: 'ordersCreateFormSelector' })
export default class OrdersCreateForm extends PureComponent {
  state = {
    idSelectedLeft: null,
    idSelectedRight: null,
    chosenOrders: [],
    listOrders: [],
    isFirstPage: true,
  };

  componentWillMount() {
    const { listOrders } = this.props;
    this.setState({ listOrders })
  }

  componentDidMount() {
    this.props.initialize(defaultFormValues);
  }

  setSelectedLeft = (idSelectedLeft) => {
    this.setState({ idSelectedRight: null, idSelectedLeft })
  };

  setSelectedRight = (idSelectedRight) => {
    this.setState({ idSelectedLeft: null, idSelectedRight })
  };

  isInSuggestionsList = (idSelected) => {
    const { listOrders } = this.state;
    for (let b = 0; b < listOrders.length; b++) {
      if (listOrders[b].code === idSelected) {
        return true;
      }
    }
    return false;
  };

  toggleSelectedItem = (idSelected) => {
    const { chosenOrders, listOrders } = this.state;
    if (this.isInSuggestionsList(idSelected)) {
      for (let i = 0; i < listOrders.length; i++) {
        if (listOrders[i].code === idSelected) {
          this.setState({ chosenOrders: chosenOrders.concat(listOrders[i]) });
          listOrders.splice(i, 1);
        }
      }
    } else {
      for (let i = 0; i < chosenOrders.length; i++) {
        if (chosenOrders[i].code === idSelected) {
          this.setState({ listOrders: listOrders.concat(chosenOrders[i]) });
          chosenOrders.splice(i, 1);
        }
      }
    }
    if (chosenOrders.length === 0) {
      this.setState({ isFirstPage: true })
    }
  };

  chooseItem = () => {
    const { idSelectedLeft, chosenOrders, listOrders } = this.state;
    for (let i = 0; i < listOrders.length; i++) {
      if (listOrders[i].code === idSelectedLeft) {
        this.setState({ chosenOrders: chosenOrders.concat(listOrders[i]) });
        listOrders.splice(i, 1);
      }
    }
  };

  chooseAll = () => {
    const { chosenOrders, listOrders } = this.state;
    this.setState({ chosenOrders: chosenOrders.concat(listOrders), listOrders: [] });
  };

  cancelItem = () => {
    const { idSelectedRight, chosenOrders, listOrders } = this.state;
    for (let i = 0; i < chosenOrders.length; i++) {
      if (chosenOrders[i].code === idSelectedRight) {
        this.setState({ listOrders: listOrders.concat(chosenOrders[i]) });
        chosenOrders.splice(i, 1);
      }
    }
  };

  cancelAll = () => {
    const { chosenOrders, listOrders } = this.state;
    this.setState({ listOrders: listOrders.concat(chosenOrders), chosenOrders: [] });
  };

  pageTwo = () => {
    const { chosenOrders } = this.state;
    if (chosenOrders.length) {
      this.setState({ isFirstPage: false })
    }
  };

  pageOne = () => {
    this.setState({ isFirstPage: true })
  };

  render() {
    const { idSelectedLeft, chosenOrders, idSelectedRight, listOrders, isFirstPage } = this.state;
    const date = new Date();
    const dateCreated = date.getTime();
    this.props.setChosenOrders(chosenOrders);

    return (
      <div className="panel-body-inner">
        <form name="orderForm" className="form orderForm">
          <div className="form-group-wrapper">
            <Field
              name={valuesNames.SELECTABLE}
              component={OrdersSelectable}
              props={{
                idSelectedLeft,
                chosenOrders,
                idSelectedRight,
                listOrders,
                isFirstPage,
                setSelectedLeft: this.setSelectedLeft,
                setSelectedRight: this.setSelectedRight,
                toggleSelectedItem: this.toggleSelectedItem,
                chooseItem: this.chooseItem,
                chooseAll: this.chooseAll,
                cancelItem: this.cancelItem,
                cancelAll: this.cancelAll,
                pageTwo: this.pageTwo,
                pageOne: this.pageOne,
              }}
            />
            <div className="row-expand">
              <div className="col-expand-left">
                <Field
                  label={valuesLabels.AUTHOR}
                  name={valuesNames.AUTHOR}
                  id={valuesNames.AUTHOR}
                  component={ValidatedInput}
                  props={{ disabled: true }}
                />
              </div>
              <div className="col-expand-right">
                <Field
                  label={valuesLabels.DATE}
                  name={valuesNames.DATE}
                  id={valuesNames.DATE}
                  component={DateInput}
                  props={{ disabled: true, value: dateCreated, format: 'DD-MMM-YYYY' }}
                />
              </div>
            </div>
          </div>
        </form>
      </div>)
  }
}
