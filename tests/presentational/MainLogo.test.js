import React from 'react';
import renderer from 'react-test-renderer';
import { StaticRouter } from 'react-router'

import MainLogo from '../../src/components/presentational/MainLogo/MainLogo';

const patientsInfo = {
  'browserTitle': 'PulseTile',
  'logoB64': 'testLogo',
  'themeColor': 'green',
  'title': 'PulseTile',
};

const context = {};

describe('Component <MainLogo />', () => {
  it('should renders when the role of doctor', () => {
    const userAccount = { 'role': 'IDCR' };
    const tree = renderer
      .create(
        <StaticRouter location="someLocation" context={context}>
          <MainLogo
            patientsInfo={patientsInfo}
            userAccount={userAccount}
          />
        </StaticRouter>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should renders when the role of the patient', () => {
    const userAccount = { 'role': 'PHR', 'nhsNumber': '9999999000' };
    const tree = renderer
      .create(
        <StaticRouter location="someLocation" context={context}>
          <MainLogo
            patientsInfo={patientsInfo}
            userAccount={userAccount}
          />
        </StaticRouter>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

	it('should renders without role', () => {
		const userAccount = { 'role': '', 'nhsNumber': '9999999000' };
		const tree = renderer
			.create(
        <StaticRouter location="someLocation" context={context}>
          <MainLogo
            patientsInfo={patientsInfo}
            userAccount={userAccount}
          />
        </StaticRouter>)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
