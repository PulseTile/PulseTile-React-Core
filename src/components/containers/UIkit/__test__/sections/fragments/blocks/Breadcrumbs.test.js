import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import Breadcrumbs from '../../../../sections/fragments/blocks/Breadcrumbs';

Enzyme.configure({ adapter: new Adapter() });

describe('Component <Breadcrumbs />', () => {
    it('should renders Breadcrumbs with props correctly', () => {
        const component = shallow(<Breadcrumbs />);
        expect(component).toMatchSnapshot();
    });
});
