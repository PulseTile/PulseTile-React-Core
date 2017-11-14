import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom'

const ProtectedRoute = ({ userAccount, ...props }) => {
  return <Route {...props} />
};

ProtectedRoute.propTypes = {
  userAccount: PropTypes.shape({
    role: PropTypes.string,
  }),
};

export default ProtectedRoute;
