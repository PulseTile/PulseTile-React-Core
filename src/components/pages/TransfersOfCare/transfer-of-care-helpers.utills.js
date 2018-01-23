import _ from 'lodash/fp';
import { getDDMMMYYYY } from "../../../utils/time-helpers.utils";
// import {fetchPatientMedicationsRequest} from "../Medications/ducks/fetch-patient-medications.duck";
// import {fetchPatientEventsRequest} from "../Events/ducks/fetch-patient-events.duck";
// import {fetchPatientReferralsRequest} from "../Referrals/ducks/fetch-patient-referrals.duck";
// import {fetchPatientDiagnosesRequest} from "../ProblemsDiagnosis/ducks/fetch-patient-diagnoses.duck";
// import {fetchPatientVitalsRequest} from "../Vitals/ducks/fetch-patient-vitals.duck";

export const serviceTransferOfCare = {
  config: {
    diagnosis: {
      title: 'Problems / Diagnosis',
      actionsFuncAll: 'fetchPatientDiagnosesRequest',
      // actionsFuncOne: diagnosesActions.get,
      stateName: 'allDiagnoses',
      setMethodName: 'setDiagnosisRecords',
      records: null,
    },
    medications: {
      title: 'Medications',
      actionsFuncAll: 'fetchPatientMedicationsRequest',
      // actionsFuncOne: medicationsActions.get,
      stateName: 'allMedications',
      setMethodName: 'setMedicationRecords',
      records: null,
    },
    referrals: {
      title: 'Referrals',
      actionsFuncAll: 'fetchPatientReferralsRequest',
      // actionsFuncOne: referralsActions.get,
      stateName: 'allReferrals',
      setMethodName: 'setReferralsRecords',
      records: null,
    },
    events: {
      title: 'Events',
      actionsFuncAll: 'fetchPatientEventsRequest',
      // actionsFuncOne: eventsActions.get,
      stateName: 'allEvents',
      setMethodName: 'setEventsRecords',
      records: null,
    },
    vitals: {
      title: 'Vitals',
      actionsFuncAll: 'fetchPatientVitalsRequest',
      // actionsFuncOne: vitalsActions.get,
      stateName: 'allVitals',
      setMethodName: 'setVitalsRecords',
      records: null,
    }
  },
  getConfig: () => {
    return serviceTransferOfCare.config;
  },
  changeArraysForTable: (arr, name, date) => {
    return arr.map(el => {
      el.tableName = el[name];
      el.date = getDDMMMYYYY(el[date]);
      return {
        spacialValue: el,
        title: el[name],
      };
    });
  },
  setDiagnosisRecords: data => {
    serviceTransferOfCare.config.diagnosis.records = serviceTransferOfCare.changeArraysForTable(data, 'problem', 'dateOfOnset');
  },
  setMedicationRecords: data => {
    serviceTransferOfCare.config.medications.records = serviceTransferOfCare.changeArraysForTable(data, 'name', 'dateCreated');
  },
  setReferralsRecords: data => {
    serviceTransferOfCare.config.referrals.records = data.map(el => {
      const date = getDDMMMYYYY(el.dateOfReferral);
      el.date = date;
      el.tableName = `${date} ${el.referralFrom} ${el.referralTo}`;
      return {
        specialValue: el,
        title: `${date} - ${el.referralFrom} -> ${el.referralTo}`
      }
    });
  },
  modificateEventsArr: arr => {
    // goto: Later types will come
    // arr = _.chain(arr)
    //   .filter(function (value) {
    //     return value.dateOfAppointment;
    //   })
    //   .each(function (value, index) {
    //     value.type = 'Appointment';
    //     value.date = serviceTransferOfCareFormatted.formattingDate(value.dateOfAppointment, serviceTransferOfCareFormatted.formatCollection.DDMMMYYYY);
    //     value.tableName = value.serviceTransferOfCareTeam;
    //     value.selectName = value.serviceTransferOfCareTeam;
    //     return value;
    //   })
    //   .groupBy(function(value) {
    //     return value.type;
    //   })
    //   .value();

    return arr;
  },
  setEventsRecords: data => {
    serviceTransferOfCare.config.events.records = serviceTransferOfCare.modificateEventsArr(data);
  },
  setVitalsRecords: data => {
    serviceTransferOfCare.config.vitals.records = [];
    serviceTransferOfCare.config.vitals.records.push({
      specialValue: data[1]
    });

    serviceTransferOfCare.config.vitals.records[0].specialValue.date = getDDMMMYYYY(serviceTransferOfCare.config.vitals.records[0].dateCreated);
    serviceTransferOfCare.config.vitals.records[0].specialValue.tableName = 'Latest Vitals Data (News Score: ' + serviceTransferOfCare.config.vitals.records[0].newsScore + ')';
    serviceTransferOfCare.config.vitals.records[0].title = 'Latest Vitals Data';
  },

  setAllRecords: (data) => {
    for (const key in serviceTransferOfCare.config) {
      const stateName = serviceTransferOfCare.config[key].stateName;
      if (!_.isEmpty(data[stateName])) {
        serviceTransferOfCare[serviceTransferOfCare.config[key].setMethodName](data[stateName]);
      }
    }
  },
};



