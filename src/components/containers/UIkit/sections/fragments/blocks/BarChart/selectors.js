import _ from 'lodash/fp';
import { createSelector } from 'reselect';
import { patientsDepartments } from '../../../../../../../config/patients.constants';

export const patientsByDepartmentsSelector = ({ patients }) => patientsDepartments.map(department => _.filter(department.predicate)(patients));

const patientsSelector = createSelector(
    patientsByDepartmentsSelector,
    (patientsByDepartment => {
        return {
            patientsByDepartment: patientsByDepartment
        }
    })
);

export default patientsSelector;
