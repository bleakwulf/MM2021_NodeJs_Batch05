const chalk = require("chalk");

const DataStore = require('../store/dataStore');
const attendanceDataStore = new DataStore('attendances', []);

exports.getAttendance = (id) => {
  return attendanceDataStore.get(id);
};

exports.getAttendancesBy = (filters) => {
  return attendanceDataStore.getBy(filters);
};

exports.addAttendance = (attendanceData) => {
  attendanceDataStore.insert({ 
    id: attendanceDataStore.generateId(),
    ...attendanceData 
  });

  console.log(chalk.greenBright(`Attendance successfully registered.`));
}

exports.updateAttendance = (attendanceData) => {
  const { id } = attendanceData;
  const attendancePrevData = attendanceDataStore.get(id);

  attendanceDataStore.update(id, { ...attendancePrevData[0], ...attendanceData });

  console.log(chalk.greenBright(`Attendance successfully updated.`));
}

exports.deleteAttendance = (id) => {
  attendanceDataStore.remove(id);
  console.log(chalk.greenBright(`Attendance successfully deleted.`));
};
