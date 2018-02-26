import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import moment from 'moment';

import ImagesDetail from '../ImagesDetail/ImagesDetail';
import { valuesNames, valuesLabels } from '../forms.config';

Enzyme.configure({ adapter: new Adapter() });

const propsForImagePanel = {
  detail: {
    [valuesNames.SOURCE]: 'orthanc',
    [valuesNames.SOURCE_ID]: '00d87cf2-13d39285-50905549-3faf78a7-59656dd3',
    [valuesNames.MODALITY]: 'CT',
    [valuesNames.SERIES_DATE]: 736124400000,
    [valuesNames.SERIES_TIME]: 37644000,
    [valuesNames.STATION_NAME]: 'CT01OC0',
    [valuesNames.OPERATORS_NAME]: 'Anonymized',
    [valuesNames.SERIES_NUMBER]: '365',
    [valuesNames.AUTHOR]: 'test',
    instanceIds: [
      'd1d4875a-2a8267c2-2ee4f8f0-3d9e917e-9a141930',
    ],
    [valuesNames.PROTOCOL_NAME]: 'test',
  },
  instanceIds: [
    'ecd967b0-aaec17a2-860b3925-91d8ef8b-1932d1c7',
  ],
};

const IMAGES_PANEL = 'imagesPanel';
const IMAGES_DETAIL_PANEL = 'imagesDetailPanel';
const CONVERT_SERIES_DATE = moment(propsForImagePanel.detail[valuesNames.SERIES_DATE]).format('DD-MMM-YYYY');
const CONVERT_SERIES_TIME = moment(propsForImagePanel.detail[valuesNames.SERIES_TIME]).format('HH:MM');
const EVENT = {
  preventDefault: () => {},
  removeEventListener: () => {},
  target: {
    className: 'swiper-slide',
    querySelector: () => {},
    id: 'img-0',
    style: {
      marginTop: 20,
      marginLeft: 20,
    },
  },
  clientX: 10,
  clientY: 10,
};

describe('Component <ImagesDetail />', () => {
  it('should renders with props correctly', () => {
    const component = shallow(<ImagesDetail
      instanceIds={['ecd967b0-aaec17a2-860b3925-91d8ef8b-1932d1c7']}
    />);

    // Testing component when detail filled object, expandedPanel is all, and panel not edited
    component.setProps({ detail: propsForImagePanel.detail, expandedPanel: 'all', editedPanel: {}, instanceIds: propsForImagePanel.instanceIds });
    expect(component.props().className).toEqual('section-detail');
    expect(component.find('PluginDetailPanel')).toHaveLength(1);
    expect(component.find('ImagesDetailPanel')).toHaveLength(1);

    // Testing imagePanel
    expect(component.find('ImagesDetailPanel').at(0).props().name).toEqual(IMAGES_PANEL);
    expect(component.find('ImagesDetailPanel').at(0).props().title).toEqual('Image(s) Series');
    expect(component.find('ImagesDetailPanel').at(0).props().isOpen).toEqual(false);
    expect(component.find('ImagesDetailPanel').at(0).props().isBtnShowPanel).toEqual(true);

    expect(component.find('.dicom-container').at(0)).toHaveLength(1);
    expect(component.find('Swiper').at(0)).toHaveLength(1);

    // Testing imagesDetailPanel
    expect(component.find('PluginDetailPanel').at(0).props().name).toEqual(IMAGES_DETAIL_PANEL);
    expect(component.find('PluginDetailPanel').at(0).props().title).toEqual('Image Details');
    expect(component.find('PluginDetailPanel').at(0).props().isOpen).toEqual(false);
    expect(component.find('PluginDetailPanel').at(0).props().isBtnShowPanel).toEqual(true);
    expect(component.find('PluginDetailPanel').at(0).props().isShowControlPanel).toEqual(false);

    expect(component.find('.control-label').at(0).text()).toEqual(valuesLabels.MODALITY);
    expect(component.find('.control-label').at(1).text()).toEqual(valuesLabels.PROTOCOL_NAME);
    expect(component.find('.control-label').at(2).text()).toEqual(valuesLabels.STATION_NAME);
    expect(component.find('.control-label').at(3).text()).toEqual(valuesLabels.OPERATORS_NAME);
    expect(component.find('.control-label').at(4).text()).toEqual(valuesLabels.SERIES_DATE);
    expect(component.find('.control-label').at(5).text()).toEqual(valuesLabels.SERIES_TIME);
    expect(component.find('.control-label').at(6).text()).toEqual(valuesLabels.AUTHOR);
    expect(component.find('.control-label').at(7).text()).toEqual(`${valuesLabels.SERIES_NUMBER}:`);

    expect(component.find('.form-control-static').at(0).text()).toEqual(propsForImagePanel.detail[valuesNames.MODALITY]);
    expect(component.find('.form-control-static').at(1).text()).toEqual(propsForImagePanel.detail[valuesNames.PROTOCOL_NAME]);
    expect(component.find('.form-control-static').at(2).text()).toEqual(propsForImagePanel.detail[valuesNames.STATION_NAME]);
    expect(component.find('.form-control-static').at(3).text()).toEqual(propsForImagePanel.detail[valuesNames.OPERATORS_NAME]);
    expect(component.find('.form-control-static').at(4).text()).toEqual(CONVERT_SERIES_DATE);
    expect(component.find('.form-control-static').at(5).text()).toEqual(CONVERT_SERIES_TIME);
    expect(component.find('.form-control-static').at(6).text()).toEqual(propsForImagePanel.detail[valuesNames.AUTHOR]);
    expect(component.find('.form-control-static').at(7).text()).toEqual(propsForImagePanel.detail[valuesNames.SERIES_NUMBER]);

    expect(component).toMatchSnapshot();

    // Testing methods shallow

    expect(component.state().isVisibleCornerstone).toEqual(true);
    component.instance().visibleCornerstone(false);
    expect(component.state().isVisibleCornerstone).toEqual(false);
    component.instance().visibleCornerstone(true);
    expect(component.state().isVisibleCornerstone).toEqual(true);
    component.instance().disableCornerstoneTools(EVENT);

  });

  it('should renders with props correctly mount', () => {
    const component = mount(<ImagesDetail
      instanceIds={['ecd967b0-aaec17a2-860b3925-91d8ef8b-1932d1c7']}
      detail={propsForImagePanel.detail}
      expandedPanel="all"
    />);

    // Testing methods

    component.instance().getImgBlock();
    component.instance().getURLtoImage('test');

    component.setProps({ instanceIds: ['ecd967b0-aaec17a2-860b3925-91d8ef8b-1932d1c9'] });
    expect(component).toMatchSnapshot();

    component.setProps({ instanceIds: [] });
    expect(component).toMatchSnapshot();
  });

  it('should renders correctly with different state of props', () => {
    const component = shallow(
      <ImagesDetail
        instanceIds={['ecd967b0-aaec17a2-860b3925-91d8ef8b-1932d1c8']}
      />);
    // // Testing component when detail empty object, expandedPanel is imagePanel
    component.setProps({ detail: { [valuesNames.SERIES_DATE]: 1507020019000, [valuesNames.SERIES_TIME]: 37644000 }, expandedPanel: IMAGES_PANEL, editedPanel: {} });
    expect(component.find('ImagesDetailPanel')).toHaveLength(1);
    expect(component.find('ImagesDetailPanel').props().name).toEqual(IMAGES_PANEL);
    expect(component).toMatchSnapshot();

    // Testing component when detail empty object, expandedPanel is imagesDetailPanel
    component.setProps({ detail: {}, expandedPanel: IMAGES_DETAIL_PANEL });
    expect(component.find('PluginDetailPanel')).toHaveLength(1);
    expect(component.find('PluginDetailPanel').props().name).toEqual(IMAGES_DETAIL_PANEL);
    expect(component).toMatchSnapshot();
  });
});

