import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

import PaginationBlock from '../PaginationBlock';

Enzyme.configure({ adapter: new Adapter() });

const entriesPerPage = 10;
const totalEntriesAmount = 89;

const handleSetOffset = offset => console.log(offset);

describe('Component <PaginationBlock />', () => {
  it('should renders on the first page', () => {
    const offset = 0;
    const component = shallow(
      <PaginationBlock
        offset={offset}
        entriesPerPage={entriesPerPage}
        totalEntriesAmount={totalEntriesAmount}
        setOffset={handleSetOffset}
      />);

    expect(component).toMatchSnapshot();

    component.setProps({ isShortView: true })
  });


  it('should renders when we move to another page', () => {
    const offset = 80;
    const component = shallow(
      <PaginationBlock
        offset={offset}
        entriesPerPage={entriesPerPage}
        totalEntriesAmount={totalEntriesAmount}
        setOffset={handleSetOffset}
      />);

    expect(component).toMatchSnapshot();
  });

  it('should renders on the last page', () => {
    const offset = 20;
    const component = shallow(
      <PaginationBlock
        offset={offset}
        entriesPerPage={entriesPerPage}
        totalEntriesAmount={totalEntriesAmount}
        setOffset={handleSetOffset}
      />);

    expect(component).toMatchSnapshot();
  });

  it('should work methods', () => {
    let offset = 0;
    const setOffset = (page) => {
      offset = page;
    };
    const component = shallow(
      <PaginationBlock
        offset={offset}
        entriesPerPage={entriesPerPage}
        totalEntriesAmount={totalEntriesAmount}
        setOffset={setOffset}
      />
    );
    expect(component).toMatchSnapshot();
    component.find('.pagination-link.nn').simulate('click');
    expect(component).toMatchSnapshot();
  });


  it('should be renders when we have less than six pages', () => {
    const offset = 10;
    const totalEntriesAmount = 40;
    const component = shallow(
      <PaginationBlock
        offset={offset}
        entriesPerPage={entriesPerPage}
        totalEntriesAmount={totalEntriesAmount}
        setOffset={handleSetOffset}
      />
    );
    expect(component).toMatchSnapshot();
  });

  it('should be renders when we are in the middle of the pagination block', () => {
    const offset = 30;
    const totalEntriesAmount = 120;
    const component = shallow(
      <PaginationBlock
        offset={offset}
        entriesPerPage={entriesPerPage}
        totalEntriesAmount={totalEntriesAmount}
        setOffset={handleSetOffset}
      />
    );
    expect(component).toMatchSnapshot();
  });

  it('should be renders when totalEntriesAmount less then offset', () => {
    const offset = 30;
    const totalEntriesAmount = 29;
    const component = shallow(
      <PaginationBlock
        offset={offset}
        entriesPerPage={entriesPerPage}
        totalEntriesAmount={totalEntriesAmount}
        setOffset={handleSetOffset}
      />
    );
    expect(component).toMatchSnapshot();
  });

  it('should work all methods of component', () => {
    const offset = 30;
    const totalEntriesAmount = 29;
    const component = shallow(
      <PaginationBlock
        offset={offset}
        entriesPerPage={entriesPerPage}
        totalEntriesAmount={totalEntriesAmount}
        setOffset={handleSetOffset}
      />);

    component.instance().setPage(101)();
    component.instance().setPage(0)();
  });
});

