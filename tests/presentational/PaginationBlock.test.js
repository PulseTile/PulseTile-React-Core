import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import PaginationBlock from '../../src/components/presentational/PaginationBlock/PaginationBlock';

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

  it('should be with transitions', () => {
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
});

