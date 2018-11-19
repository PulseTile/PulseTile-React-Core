import { get } from 'lodash';
import asyncComponent from '../containers/AsyncComponent/AsyncComponent';
import { themeConfigs } from '../../themes.config';
import { redirectToCharts } from '../../utils/redirect-helpers.utils';

const SystemDashboard = asyncComponent(() => import(/* webpackChunkName: "systemDashboard" */ './SystemDashboard/SystemDashboard').then(module => module.default));
const PatientsLists = asyncComponent(() => import(/* webpackChunkName: "patientsLists" */ './PatientsLists/PatientsLists').then(module => module.default));
const PatientsFullDetailsSearch = asyncComponent(() => import(/* webpackChunkName: "patientsFullDetailsSearch" */ './PatientsFullDetailsSearch/PatientsFullDetailsSearch').then(module => module.default));
const UserProfile = asyncComponent(() => import(/* webpackChunkName: "userProfile" */ './UserProfile/UserProfile').then(module => {
  return get(themeConfigs, 'isShowUserAccountPage', true) ? module.default : redirectToCharts();
}));
const PatientsSummary = asyncComponent(() => import(/* webpackChunkName: "patientsSummary" */ './PatientsSummary/PatientsSummary').then(module => module.default));
const SearchReport = asyncComponent(() => import(/* webpackChunkName: "searchReport" */ './SearchReport/SearchReport').then(module => module.default));

export { SystemDashboard, PatientsLists, PatientsFullDetailsSearch, UserProfile, PatientsSummary, SearchReport }
