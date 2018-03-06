import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

import ApplicationPreferencesPanel from '../panels/ApplicationPreferencesPanel';
import { valuesSettingsFormLabels } from '../forms.config';

Enzyme.configure({ adapter: new Adapter() });

const APPLICATION_PREFERENCES = 'applicationPreferences';

const testProps = {
  formState: {
    values: {},
  },
  patientsInfo: {
    title: 'ripple',
    logoB64: 'data:image/gif;base64,R0lGODlhDwAPAKECAAAAzMzM/////wAAACwAAAAADwAPAAACIISPeQHsrZ5ModrLlN48CXF8m2iQ3YmmKqVlRtW4MLwWACH+H09wdGltaXplZCBieSBVbGVhZCBTbWFydFNhdmVyIQAAOw==',
    themeColor: 'green',
    browserTitle: 'PulseTile',
  },
  openedPanel: APPLICATION_PREFERENCES,
  expandedPanel: 'all',
  editedPanel: {},
  onShow: () => {},
  onExpand: () => {},
  onEdit: () => {},
  onCancel: () => {},
  onSaveSettings: () => {},
  isShowControlPanel: true,
  isSaveButton: true,
  theme: { baseColor: '#0D672F', name: 'Green Theme' },
};

describe('Component <ApplicationPreferencesPanel />', () => {
  it('should renders with all props correctly', () => {
    const component = shallow(
      <ApplicationPreferencesPanel
        formState={testProps.formState}
        patientsInfo={testProps.patientsInfo}
        openedPanel={testProps.openedPanel}
        expandedPanel={testProps.expandedPanel}
        editedPanel={testProps.editedPanel}
        onShow={testProps.onShow}
        onExpand={testProps.onExpand}
        onEdit={testProps.onEdit}
        onCancel={testProps.onCancel}
        onSaveSettings={testProps.onSaveSettings}
        isShowControlPanel={testProps.isShowControlPanel}
        isSaveButton={testProps.isSaveButton}
        theme={testProps.theme}
      />
    );

    expect(component.find('ControlPanel')).toHaveLength(1);
    expect(component.find('ControlPanel').props().title).toEqual('Application Preferences');
    expect(component.find('ControlPanel').props().name).toEqual('applicationPreferences');

    expect(component.find('.control-label').at(0).text()).toEqual(valuesSettingsFormLabels.APP_TITLE);
    expect(component.find('.control-label').at(1).text()).toEqual(valuesSettingsFormLabels.LOGO_PATH);
    expect(component.find('.control-label').at(2).text()).toEqual(valuesSettingsFormLabels.SELECT_THEME_ONE);
    expect(component.find('.control-label').at(3).text()).toEqual(valuesSettingsFormLabels.BROWSER_TITLE);

    expect(component.find('.form-control-static').at(0).text()).toEqual(testProps.patientsInfo.title);
    expect(component.find('.form-control-static').at(2).text()).toEqual(testProps.patientsInfo.browserTitle);

    expect(component.find('.palette-color-icon').at(0).props().style.background).toEqual('#0D672F');
    expect(component.find('.palette-color-name').text()).toEqual('Green Theme');

    expect(component).toMatchSnapshot();


    // test panel with edit
    component.setProps({ editedPanel: { applicationPreferences: true } });
    expect(component.find('ReduxForm')).toHaveLength(1);

    expect(component).toMatchSnapshot();
  });
});

