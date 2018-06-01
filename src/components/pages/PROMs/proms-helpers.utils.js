export const serviceProms = {
  getStatusOnValue: (value) => {
    let status = '';
    switch (true) {
      case (value > -1 && value < 50) :
        status = 'success';
        break;
      case (value > 49 && value < 80) :
        status = 'warning';
        break;
      case (value > 79 && value < 101) :
        status = 'danger';
        break;
    }

    return status;
  },

  modificatePromsArr: (arr) => {
    for (let i = 0; i < arr.length; i++) {
      const statusScore = serviceProms.getStatusOnValue(arr[i].score);
      arr[i].highlighters = [];
      arr[i].highlighters.push({
        name: 'score',
        status: statusScore,
      });
    }
    return arr;
  },
};
