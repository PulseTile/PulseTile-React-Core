export const serviceVitalsSigns = {
  vitalsConfig: {
    respirationRate: [
      {
        label: '≤ 8',
        condition(value) {
          return value < 9
        },
        column: 1,
        point: 3,
      }, {
        label: '9-11',
        condition(value) {
          return value > 8 && value < 12
        },
        column: 3,
        point: 1,
      }, {
        label: '12-20',
        condition(value) {
          return value > 11 && value < 21
        },
        column: 4,
        point: 0,
      }, {
        label: '21-24',
        condition(value) {
          return value > 20 && value < 25
        },
        column: 6,
        point: 2,
      }, {
        label: '≥ 25',
        condition(value) {
          return value > 24
        },
        column: 7,
        point: 3,
      },
    ],
    oxygenSaturation: [
      {
        label: '≤ 91',
        condition(value) {
          return value < 92
        },
        column: 1,
        point: 3,
      }, {
        label: '92-93',
        condition(value) {
          return value === 92 || value === 93
        },
        column: 2,
        point: 2,
      }, {
        label: '94-95',
        condition(value) {
          return value === 94 || value === 95
        },
        column: 3,
        point: 1,
      }, {
        label: '≥ 96',
        condition(value) {
          return value > 95
        },
        column: 4,
        point: 0,
      },
    ],
    oxygenSupplemental: [
      {
        label: 'Yes',
        condition(value) {
          return value === true
        },
        column: 2,
        point: 2,
      }, {
        label: 'No',
        condition(value) {
          return value === false
        },
        column: 4,
        point: 0,
      },
    ],
    temperature: [
      {
        label: '≤ 35.0',
        condition(value) {
          return value <= 35
        },
        column: 1,
        point: 3,
      }, {
        label: '35.1-36.0',
        condition(value) {
          return value > 35 && value <= 36
        },
        column: 3,
        point: 1,
      }, {
        label: '36.1-38.0',
        condition(value) {
          return value > 36 && value <= 38
        },
        column: 4,
        point: 0,
      }, {
        label: '38.1-39.0',
        condition(value) {
          return value > 38 && value <= 39
        },
        column: 5,
        point: 1,
      }, {
        label: '≥ 39.1',
        condition(value) {
          return value > 39
        },
        column: 6,
        point: 2,
      },
    ],
    systolicBP: [
      {
        label: '≤ 90',
        condition(value) {
          return value < 91
        },
        column: 1,
        point: 3,
      }, {
        label: '91-100',
        condition(value) {
          return value > 90 && value < 101
        },
        column: 2,
        point: 2,
      }, {
        label: '101-110',
        condition(value) {
          return value > 100 && value < 111
        },
        column: 3,
        point: 1,
      }, {
        label: '111-219',
        condition(value) {
          return value > 110 && value < 220
        },
        column: 4,
        point: 0,
      }, {
        label: '≥ 220',
        condition(value) {
          return value > 219
        },
        column: 7,
        point: 3,
      },
    ],
    heartRate: [
      {
        label: '≤ 40',
        condition(value) {
          return value < 41
        },
        column: 1,
        point: 3,
      }, {
        label: '41-50',
        condition(value) {
          return value > 40 && value < 51
        },
        column: 3,
        point: 1,
      }, {
        label: '51-90',
        condition(value) {
          return value > 50 && value < 91
        },
        column: 4,
        point: 0,
      }, {
        label: '91-110',
        condition(value) {
          return value > 90 && value < 111
        },
        column: 5,
        point: 1,
      }, {
        label: '111-130',
        condition(value) {
          return value > 110 && value < 131
        },
        column: 6,
        point: 2,
      }, {
        label: '≥ 131',
        condition(value) {
          return value > 130
        },
        column: 7,
        point: 3,
      },
    ],
    levelOfConsciousness: [
      {
        label: 'A',
        condition(value) {
          return value === 'Alert'
        },
        column: 4,
        point: 0,
      }, {
        label: 'V,P or U',
        condition(value) {
          return value === 'Voice' || value === 'Pain' || value === 'Unresponsive'
        },
        column: 7,
        point: 3,
      },
    ],
    newsScore: [
      {
        label: '0',
        condition(value) {
          return value === 0
        },
        column: 4,
      }, {
        label: '1-4',
        condition(value) {
          return value > 0 && value < 5
        },
        column: 5,
      }, {
        label: '5-6',
        condition(value) {
          return value === 5 || value === 6
        },
        column: 6,
      }, {
        label: '> 7',
        condition(value) {
          return value > 6
        },
        column: 7,
      },
    ],
  },

  pattern: {
    number: '\\d+',
    numberPoint: '\\d+(\\.\\d+)?',
    numberPersent: '^(0|([1-9][0-9]?)|(100))$',
  },

  getLabels: () => {
    const labels = {};

    for (const vital in serviceVitalsSigns.vitalsConfig) {
      labels[vital] = [];

      for (let i = 0; i < serviceVitalsSigns.vitalsConfig[vital].length; i++) {
        labels[vital].push({
          text: serviceVitalsSigns.vitalsConfig[vital][i].label,
          place: serviceVitalsSigns.vitalsConfig[vital][i].column,
        });
      }
    }

    return labels;
  },

  getStatusOnValue: (value, key) => {
    const cache = serviceVitalsSigns.getStatusOnValue.cache;
    let range,
      status;

    if (typeof cache[key] === 'undefined') cache[key] = {};
    if (typeof cache[key][value] !== 'undefined') {
      return cache[key][value];
    }

    range = serviceVitalsSigns.determineRangeOnValue(value, key);
    status = {
      point: range.point,
    };

    switch (range.column) {
      case 1:
      case 7:
        status.type = 'danger';
        break;
      case 2:
      case 6:
        status.type = 'warning';
        break;
      case 3:
      case 5:
        status.type = 'success';
        break;
    }

    cache[key][value] = status;

    return status;
  },

  determineRangeOnValue: (value, key) => {
    const vitalRanges = serviceVitalsSigns.vitalsConfig[key];

    if (vitalRanges) {
      for (let i = 0; i < vitalRanges.length; i++) {
        if (vitalRanges[i].condition(value)) {
          return {
            column: vitalRanges[i].column,
            point: vitalRanges[i].point,
          };
        }
      }
    }

    return false;
  },

  setVitalStatuses: (vital) => {
    const vitalStatuses = {};

    for (const vitalConfig in serviceVitalsSigns.vitalsConfig) {
      vitalStatuses[vitalConfig] = serviceVitalsSigns.getStatusOnValue(vital[vitalConfig], vitalConfig);
    }

    return vitalStatuses;
  },

  modificateVitalsArr: (arr) => {
    for (let i = 0; i < arr.length; i++) {
      serviceVitalsSigns.convertVitalCharacteristics(arr[i]);
      const statusNewsScore = serviceVitalsSigns.getStatusOnValue(arr[i].newsScore, 'newsScore').type;
      arr[i].highlighters = [];
      arr[i].highlighters.push({
        name: 'newsScore',
        status: statusNewsScore,
      });
    }
    return arr;
  },

  convertVitalCharacteristics: (vital) => {
    return {
      ...vital,
      respirationRate: +vital.respirationRate,
      diastolicBP: +vital.diastolicBP,
      oxygenSaturation: +vital.oxygenSaturation,
      temperature: +vital.temperature,
      systolicBP: +vital.systolicBP,
      heartRate: +vital.heartRate,
      oxygenSupplemental: vital.oxygenSupplemental === 'true' || vital.oxygenSupplemental === true,
    };
  },

  countNewsScore: (statuses) => {
    let newsScore = 0;
    for (const status in statuses) {
      if (status !== 'newsScore' && statuses[status].point) {
        newsScore += statuses[status].point;
      }
    }

    return newsScore;
  },

  getHighlighterClass: (status) => {
    if (typeof status === 'undefined') return 'highlighter-not-vital;'

    return `highlighter-${status.type || 'not-vital'}`;
  },
};

serviceVitalsSigns.getStatusOnValue.cache = {};
