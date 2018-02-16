export const serviceProms = {
  getStatusOnValue: (value) => {
    let status = '';
    switch (true) {
      case (value > -1 && value < 5) :
        status = 'success';
        break;
      case (value > 4 && value < 8) :
        status = 'warning';
        break;
      case (value > 7 && value < 11) :
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
