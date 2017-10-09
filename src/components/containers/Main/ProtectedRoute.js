import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash/fp';
import { Route, Redirect } from 'react-router-dom'

import { isIDCRRole } from '../../../utils/auth/auth-check-permissions';
import { clientUrls } from '../../../config/client-urls.constants';

const ProtectedRoute = ({ userAccount, ...props }) => {
  if (isIDCRRole(userAccount)) return <Route {...props} />
  return <Redirect to={`#${clientUrls.PATIENTS}/${_.get('nhsNumber', userAccount)}/${clientUrls.PATIENTS_SUMMARY}`} />;
};

ProtectedRoute.propTypes = {
  userAccount: PropTypes.shape({
    role: PropTypes.string,
  }),
};

export default ProtectedRoute;
