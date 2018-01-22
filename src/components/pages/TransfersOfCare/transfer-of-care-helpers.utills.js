import _ from 'lodash/fp';
import { getDDMMMYYYY } from "../../../utils/time-helpers.utils";

export const serviceTransferOfCare = {
  config: {
    diagnosis: {
      title: 'Problems / Diagnosis',
      // actionsFuncAll: diagnosesActions.all,
      // actionsFuncOne: diagnosesActions.get,
      stateName: 'allDiagnoses',
      setMethodName: 'setDiagnosisRecords',
      records: null
    },
    medications: {
      title: 'Medications',
      // actionsFuncAll: medicationsActions.all,
      // actionsFuncOne: medicationsActions.get,
      stateName: 'allMedications',
      setMethodName: 'setMedicationRecords',
      records: null
    },
    referrals: {
      title: 'Referrals',
      // actionsFuncAll: referralsActions.all,
      // actionsFuncOne: referralsActions.get,
      stateName: 'allReferrals',
      setMethodName: 'setReferralsRecords',
      records: null
    },
    events: {
      title: 'Events',
      // actionsFuncAll: eventsActions.all,
      // actionsFuncOne: eventsActions.get,
      stateName: 'allEvents',
      setMethodName: 'setEventsRecords',
      records: null
    },
    vitals: {
      title: 'Vitals',
      // actionsFuncAll: vitalsActions.all,
      // actionsFuncOne: vitalsActions.get,
      stateName: 'allVitals',
      setMethodName: 'setVitalsRecords',
      records: null
    }
  },
  getConfig: () => {
    return serviceTransferOfCare.config;
  },
  changeArraysForTable: (arr, name, date) => {
    arr.map(el => {
      el.date = getDDMMMYYYY(el[date]);
      el.tableName = el[name];
      el.selectName = el[name];
      return el;
    });
  },
  setDiagnosisRecords: data => {
    serviceTransferOfCare.config.diagnosis.records = data;
    serviceTransferOfCare.changeArraysForTable(serviceTransferOfCare.config.diagnosis.records, 'problem', 'dateOfOnset');
  },
  setMedicationRecords: data => {
    serviceTransferOfCare.config.medications.records = data;
    serviceTransferOfCare.changeArraysForTable(serviceTransferOfCare.config.medications.records, 'name', 'dateCreated');
  },
  setReferralsRecords: data => {
    serviceTransferOfCare.config.referrals.records = data;
    serviceTransferOfCare.config.referrals.records.map(function (el) {
      const date = getDDMMMYYYY(el.dateOfReferral);
      el.date = date;
      el.tableName = date + ' ' + el.referralFrom + ' ' + el.referralTo;
      el.selectName = date + ' - ' + el.referralFrom + ' -> ' + el.referralTo;
      return el;
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
    serviceTransferOfCare.config.vitals.records.push(data[1]);

    serviceTransferOfCare.config.vitals.records[0].date = getDDMMMYYYY(serviceTransferOfCare.config.vitals.records[0].dateCreate);
    serviceTransferOfCare.config.vitals.records[0].selectName = 'Latest Vitals Data';
    serviceTransferOfCare.config.vitals.records[0].tableName = 'Latest Vitals Data (News Score: ' + serviceTransferOfCare.config.vitals.records[0].newsScore + ')';
  },

  setAllRecords: (data) => {
    for (const key in serviceTransferOfCare.config) {
      const stateName = serviceTransferOfCare.config[key].stateName;
      if (!_.isEmpty(data[stateName])) {
        serviceTransferOfCare[serviceTransferOfCare.config[key].setMethodName](data[stateName]);
      }
    }
  }
};



