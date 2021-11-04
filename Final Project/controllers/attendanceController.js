const chalk = require("chalk");

const attendanceService = require("../services/attendanceService");

exports.addAttendance = (req, res) => {
  const attendanceData = req.body;
  attendanceService.addAttendance(attendanceData);
  
  res.status(201).send(`Attendance successfully registered.`);
}

exports.updateAttendance = (req, res) => {
  const attendanceData = req.body;
  attendanceService.updateAttendance(attendanceData);
  
  res.status(200).send(`Attendance successfully updated.`);
}

exports.deleteAttendance = (req, res) => {
  const { id } = req.body;
  attendanceService.deleteAttendance(id);
  
  res.status(200).send(`Attendance successfully deleted.`);
};
