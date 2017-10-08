import _ from 'lodash/fp';

export const isIDCRRole = _.flow(_.get('role'), _.eq('IDCR'));
