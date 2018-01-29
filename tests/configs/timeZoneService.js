const execSync = require('child_process').execSync;
const os = require('os');
const fs = require('fs');

const NAME_TZ_FILE = 'tempTZ.json';

const setTimezone = () => {
  if (os.platform() === 'win32') {
    const previousTZ = execSync('tzutil /g').toString();
    fs.writeFileSync(NAME_TZ_FILE, previousTZ);
    execSync('tzutil /s "FLE Standard Time"');
  } else {
    process.env.TZ = 'Europe/Kiev'
  }
};

fs.readFile(`./${NAME_TZ_FILE}`, (err, data) => {
  if (err) {
    setTimezone();
  } else {
    execSync(`tzutil /s "${data}"`);
    fs.unlink(`./${NAME_TZ_FILE}`, () => {
      console.log(`Deleted ${NAME_TZ_FILE}`);
    });
  }
});

