const express = require('express');
const attendanceController = require('../controllers/attendanceController');
const router = express.Router();

const attendanceRequestValidator = require('./validations/attendanceRequestValidator');
const { validationsCheck } = require('./validations/validationsCheck');

router.post('/', 
  attendanceRequestValidator.addAttendanceSchema,
  validationsCheck,
  attendanceController.addAttendance);

router.put('/', 
attendanceRequestValidator.updateAttendanceSchema,
  validationsCheck,
  attendanceController.updateAttendance);
  
router.delete('/', 
attendanceRequestValidator.deleteAttendanceSchema,
  validationsCheck,
  attendanceController.deleteAttendance);

module.exports = router;