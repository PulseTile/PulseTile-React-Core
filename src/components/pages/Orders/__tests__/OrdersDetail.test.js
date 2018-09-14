import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

import OrdersDetail from '../OrdersDetail/OrdersDetail';
import { valuesNames, valuesLabels } from '../forms.config';
import { getDDMMMYYYY } from '../../../../utils/time-helpers.utils';

Enzyme.configure({ adapter: new Adapter() });

const propsForOrdersPanel = {
  detail: {
    [valuesNames.NAME]: 'Cardiac-ECG',
    [valuesNames.CODE]: 'order3',
    [valuesNames.TERMINOLOGY]: 'SNOMED-CT',
    [valuesNames.ORDER_DATE]: 1459845495014,
    [valuesNames.AUTHOR]: 'Dr John Smith',
    [valuesNames.DATE]: 1459845501000,
    [valuesNames.SOURCE]: 'ethercis',
    [valuesNames.SOURCE_ID]: '7ae34463-0770-4a36-bbde-4869bb6a0f05',
  },
};

const ORDERS_PANEL = 'ordersPanel';
const CONVERT_DATE = getDDMMMYYYY(propsForOrdersPanel.detail[valuesNames.DATE]);

describe('Component <OrdersDetail />', () => {
  it('should renders with props correctly', () => {
    const component = shallow(<OrdersDetail />);

    // Testing component when detail filled object, expandedPanel is all, and panel not edited
    component.setProps({ detail: propsForOrdersPanel.detail, expandedPanel: 'all', editedPanel: { [ORDERS_PANEL]: false } });
    expect(component.props().className).toEqual('section-detail');
    expect(component.find('PluginDetailPanel')).toHaveLength(1);

    // Testing ordersPanel
    expect(component.find('PluginDetailPanel').at(0).props().name).toEqual(ORDERS_PANEL);
    expect(component.find('PluginDetailPanel').at(0).props().title).toEqual('Orders');
    expect(component.find('PluginDetailPanel').at(0).props().isOpen).toEqual(false);
    expect(component.find('PluginDetailPanel').at(0).props().isBtnShowPanel).toEqual(false);
    expect(component.find('PluginDetailPanel').at(0).props().isShowControlPanel).toEqual(false);

    expect(component.find('.control-label').at(0).text()).toEqual(valuesLabels.NAME);
    expect(component.find('.control-label').at(1).text()).toEqual(valuesLabels.AUTHOR);
    expect(component.find('.control-label').at(2).text()).toEqual(valuesLabels.DATE);
    expect(component.find('.control-label').at(3).text()).toEqual(valuesLabels.SOURCE);

    expect(component.find('.form-control-static').at(0).text()).toEqual(propsForOrdersPanel.detail[valuesNames.NAME]);
    expect(component.find('.form-control-static').at(1).text()).toEqual(propsForOrdersPanel.detail[valuesNames.AUTHOR]);
    expect(component.find('.form-control-static').at(2).text()).toEqual(CONVERT_DATE);
    expect(component.find('.form-control-static').at(3).text()).toEqual(propsForOrdersPanel.detail[valuesNames.SOURCE]);

    expect(component).toMatchSnapshot();
  });
});

