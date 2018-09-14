import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import configureStore from 'redux-mock-store';

import ClinicalNoteField from '../form-fields/ClinicalNoteField';
import { valuesNames } from '../forms.config';

Enzyme.configure({ adapter: new Adapter() });

const userId = '9999999000';
const tagName = 'chestpain';
const testListTags = ['chestpain', 'shouder', ''];
const testListStatements = [{
  id: 5,
  phrase: 'test phrase',
}, {
  id: 36,
  phrase: 'test phrase 2',
}, {
  id: 6,
  phrase: 'the test phrase for filter',
}, {
  id: 7,
  phrase: 'test phrase 3',
}, {
  id: 8,
  phrase: 'test phrase 4',
}, {
  id: 9,
  phrase: 'test phrase 2',
}];

const mockStore = configureStore();
const storeResource = {
  patientsClinicalStatementsTags: {
    '9999999000': null,
  },
  clinicalStatementsQuery: {},
};
const store = mockStore(Object.assign({}, storeResource));

const storeResourceWithTags = {
  patientsClinicalStatementsTags: {
    '9999999000': testListTags,
  },
  clinicalStatementsQuery: {},
};
const storeWithTags = mockStore(Object.assign({}, storeResourceWithTags));

const DATE_TO_USE = new Date('2017');
const DATE_TO_USE_TIME = DATE_TO_USE.getTime();
global.Date = jest.fn(() => DATE_TO_USE);
Date.now = jest.fn(() => DATE_TO_USE_TIME);

const match = { params: { userId } };
const testProps = {
  input: {
    value: {
      [valuesNames.NOTE_TEXT]: 'The pain was mild at 3 in severity',
      [valuesNames.EDITABLE_EMPTY_FIELDS]: 0,
      [valuesNames.NOTE_CONTENT]: {
        name: 'ts',
        phrases: [{
          id: 7,
          tag: tagName,
        }, {
          id: 5,
          tag: tagName,
        }],
      },
    },
    onChange: value => value,
  },
  meta: {
    active: false,
    error: null,
  },
};

describe('Component <ClinicalNoteField />', () => {
  it('should renders with props correctly shallow testing different methods', () => {
    const component = shallow(
      <ClinicalNoteField
        store={storeWithTags}
        input={testProps.input}
        meta={testProps.meta}
        match={match}
      />).dive().dive().dive();

    expect(component.find('PaginationBlock')).toHaveLength(1);
    expect(component.find('.form-group')).toHaveLength(3);
    expect(component.find('[contentEditable]')).toHaveLength(2);

    // Testing setTag method
    expect(component.state().clinicalTag).toEqual('');
    expect(component.state().statements.length).toEqual(0);
    component.instance().setTag(tagName)();
    expect(component.state().clinicalTag).toEqual(tagName);

    // Testing componentWillReceiveProps method
    component.setProps({ clinicalStatementsQuery: {
      'shouder': [{
        id: 7,
        phrase: 'test phrase',
      }],
    }});

    component.setProps({ clinicalStatementsQuery: {
      [tagName]: testListStatements,
    }});
    expect(component.state().statements).toEqual(testListStatements);

    // Testing requestStatements method
    component.instance().requestStatements(tagName);

    // Testing handleSetOffset method
    expect(component.state().offset).toEqual(0);
    component.instance().handleSetOffset(1);
    expect(component.state().offset).toEqual(1);

    // Testing getQueryFilter method
    expect(component.state().queryFilter).toEqual('');
    component.instance().getQueryFilter({ target: { value: 'c' } });
    expect(component.state().queryFilter).toEqual('c');

    // Testing removeTag method
    component.setState({ offset: 10, clinicalTag: tagName, queryFilter: 'c', statements: testListStatements });
    component.instance().removeTag(5);
    expect(component.state().offset).toEqual(0);
    expect(component.state().clinicalTag).toEqual('');
    expect(component.state().queryFilter).toEqual('');
    expect(component.state().statements !== testListStatements).toEqual(true);
    expect(component.state().statements.length).toEqual(0);

    // Testing functionality of close clinical Tags popover
    component.setState({ offset: 10, clinicalTag: tagName, queryFilter: 'c', statements: testListStatements });
    component.setProps({ clickOnCreate: true });
    expect(component.state().offset).toEqual(0);
    expect(component.state().clinicalTag).toEqual('');
    expect(component.state().queryFilter).toEqual('');
    expect(component.state().statements !== testListStatements).toEqual(true);
    expect(component.state().statements.length).toEqual(0);

    // Testing filterStatements method
    component.setState({ queryFilter: 'the', statements: testListStatements });
    expect(testListStatements.length).toEqual(6);
    const resultQueryFilter = component.instance().filterStatements(testListStatements);
    expect(resultQueryFilter.length).toEqual(1);

    // Testing handleBlurContentEditable method
    component.instance().handleBlurContentEditable();

    // Testing handleChangeContentEditable method
    component.instance().handleChangeContentEditable();
    component.setState({ tempPhrases: {
      1519493102871: {
        id: 16,
        tag: tagName,
      },
      1519493209326: {
        id: 26,
        tag: tagName,
      }
    }});
    component.instance().handleChangeContentEditable();

    component.setState({ tempPhrases: {
      'test': null,
      } });
    component.instance().handleChangeContentEditable();

    expect(component).toMatchSnapshot();

    // Testing unmount method
    component.unmount();
  });

  it('should renders with empty props correctly', () => {
    const component = shallow(
      <ClinicalNoteField
        store={store}
        input={testProps.input}
        meta={testProps.meta}
        match={{ params: { userId: '' } }}
      />).dive().dive().dive();

    // Testing requestStatements method
    component.instance().requestStatements(tagName);

    expect(component).toMatchSnapshot();
  });

  it('should renders with error message', () => {
    const component = shallow(
      <ClinicalNoteField
        store={storeWithTags}
        input={testProps.input}
        meta={{
          active: false,
          error: 'Error message',
        }}
        match={match}
        isSubmit
      />).dive().dive().dive();

    expect(component).toMatchSnapshot();
  });
});

