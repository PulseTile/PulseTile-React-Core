import React from 'react';
import renderer from 'react-test-renderer';
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
    const tree = renderer
      .create(
        <PaginationBlock
          offset={offset}
          entriesPerPage={entriesPerPage}
          totalEntriesAmount={totalEntriesAmount}
          setOffset={handleSetOffset}
        />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });


  it('should renders when we move to another page', () => {
    const offset = 80;
    const tree = renderer
      .create(
        <PaginationBlock
          offset={offset}
          entriesPerPage={entriesPerPage}
          totalEntriesAmount={totalEntriesAmount}
          setOffset={handleSetOffset}
        />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should renders on the last page', () => {
    const offset = 20;
    const tree = renderer
      .create(
        <PaginationBlock
          offset={offset}
          entriesPerPage={entriesPerPage}
          totalEntriesAmount={totalEntriesAmount}
          setOffset={handleSetOffset}
        />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should work methods', () => {
    let offset = 0;
    const setOffset = (page) => {
      offset = page;
    };
    const paginationBlock = shallow(
      <PaginationBlock
        offset={offset}
        entriesPerPage={entriesPerPage}
        totalEntriesAmount={totalEntriesAmount}
        setOffset={setOffset}
      />
    );
    expect(paginationBlock).toMatchSnapshot();
    paginationBlock.find('.pagination-link.nn').simulate('click');
    expect(paginationBlock).toMatchSnapshot();
  });


  it('should be renders when we have less than six pages', () => {
    const offset = 10;
    const totalEntriesAmount = 40;
    const tree = renderer
      .create(
        <PaginationBlock
          offset={offset}
          entriesPerPage={entriesPerPage}
          totalEntriesAmount={totalEntriesAmount}
          setOffset={handleSetOffset}
        />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should be renders when we are in the middle of the pagination block', () => {
    const offset = 30;
    const totalEntriesAmount = 120;
    const tree = renderer
      .create(
        <PaginationBlock
          offset={offset}
          entriesPerPage={entriesPerPage}
          totalEntriesAmount={totalEntriesAmount}
          setOffset={handleSetOffset}
        />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should be renders when totalEntriesAmount less then offset', () => {
    const offset = 30;
    const totalEntriesAmount = 29;
    const tree = renderer
      .create(
        <PaginationBlock
          offset={offset}
          entriesPerPage={entriesPerPage}
          totalEntriesAmount={totalEntriesAmount}
          setOffset={handleSetOffset}
        />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should work all methods of component', () => {
    const offset = 30;
    const totalEntriesAmount = 29;
    const paginationBlock = shallow(
      <PaginationBlock
        offset={offset}
        entriesPerPage={entriesPerPage}
        totalEntriesAmount={totalEntriesAmount}
        setOffset={handleSetOffset}
      />);

    paginationBlock.instance().setPage(101)();
    paginationBlock.instance().setPage(0)();
  });
});

