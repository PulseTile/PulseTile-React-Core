import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

import DocumentsDetail from '../../../src/components/pages/Documents/DocumentsDetail/DocumentsDetail';

Enzyme.configure({ adapter: new Adapter() });
const DATE_TO_USE = new Date('2017');
const DATE_TO_USE_TIME = DATE_TO_USE.getTime();
global.Date = jest.fn(() => DATE_TO_USE);
Date.now = jest.fn(() => DATE_TO_USE_TIME);

const testProps = {
  onExpand: () => {},
  onShow: () => {},
  onEdit: () => {},
  onCancel: () => {},
  onSaveSettings: () => {},
  openedPanel: '',
  expandedPanel: 'all',
  currentPanel: '',
  editedPanel: '',
  testResultsDetailFormValues: '',
};
const userId = '9999999000';
const sourceId = 'cde19270-2c62-46e2-8443-4b28e7ee8b71';
const context = {
  router: {
    history: {
      push: () => {},
      replace: () => {},
      location: {
        pathname: `/patients/${userId}/documents/${sourceId}`,
      },
    },
    route: {
      match: {
        params: {
          sourceId,
          userId,
        },
      },
    },
  },
};


describe('Component <DocumentsDetail />', () => {
  it('should renders with props and states correctly', () => {
    const component = shallow(
      <DocumentsDetail
        onExpand={testProps.onExpand}
        onShow={testProps.onShow}
        onEdit={testProps.onEdit}
        onCancel={testProps.onCancel}
        onSaveSettings={testProps.onSaveSettings}
        openedPanel={testProps.openedPanel}
        expandedPanel={testProps.expandedPanel}
        currentPanel={testProps.currentPanel}
        editedPanel={testProps.editedPanel}
        testResultsDetailFormValues={testProps.testResultsDetailFormValues}
      />, {context});

    expect(component).toMatchSnapshot();

    component.instance().importHandler('discharge', {name: 'name'})();
    component.instance().onOkModal();

    expect(component.state().isOpenModal).toEqual(false);
    expect(component.find('ConfirmationModal')).toHaveLength(0);
    component.instance().openModal();
    expect(component.state().isOpenModal).toEqual(true);
    component.setProps({isOpenModal: true});
    expect(component).toMatchSnapshot();
    expect(component.find('ConfirmationModal')).toHaveLength(1);
    component.instance().closeModal();
    expect(component.state().isOpenModal).toEqual(false);
    expect(component.find('ConfirmationModal')).toHaveLength(1);

    expect(component.instance().getTypeOfDocument()).toEqual(null);

    expect(component.find('PluginDetailPanel')).toHaveLength(1);
    component.setProps({expandedPanel: 'list'});
    expect(component.find('PluginDetailPanel')).toHaveLength(0);
  });

  it('should renders with different document Type correctly', () => {
    const component = shallow(
      <DocumentsDetail
        onExpand={testProps.onExpand}
        onShow={testProps.onShow}
        onEdit={testProps.onEdit}
        onCancel={testProps.onCancel}
        onSaveSettings={testProps.onSaveSettings}
        openedPanel={testProps.openedPanel}
        expandedPanel={testProps.expandedPanel}
        currentPanel={testProps.currentPanel}
        editedPanel={testProps.editedPanel}
        testResultsDetailFormValues={testProps.testResultsDetailFormValues}
      />, {context});

    expect(component.find('DocumentsDetailDischarge')).toHaveLength(0);
    expect(component.find('DocumentsDetailReferral')).toHaveLength(0);
    expect(component.find('.form-group')).toHaveLength(1);
    expect(component).toMatchSnapshot();

    component.setProps({detail: {documentType: 'Discharge Summary'}});
    expect(component.find('DocumentsDetailDischarge')).toHaveLength(1);
    expect(component.find('DocumentsDetailReferral')).toHaveLength(0);
    expect(component.find('.form-group')).toHaveLength(0);
    expect(component).toMatchSnapshot();

    component.setProps({detail: {documentType: 'Referral Summary'}});
    expect(component.find('DocumentsDetailDischarge')).toHaveLength(0);
    expect(component.find('DocumentsDetailReferral')).toHaveLength(1);
    expect(component.find('.form-group')).toHaveLength(0);
    expect(component).toMatchSnapshot();
  });
});

