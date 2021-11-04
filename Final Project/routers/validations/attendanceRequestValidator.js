const { body, query, param, oneOf } = require("express-validator");
const validationHelpers = require("./helpers/dataValidationHelpers");

const addAttendanceSchema = [
  body("eventId")
    .exists({ checkFalsy: true })
    .withMessage(`Event ID is required.`)
    .bail()
    .custom((value) => {
      if (!validationHelpers.isEventExists(value)) {
        throw new Error(`Event does not exist.`)
      }

      return true;
    }),
  body("memberId")
    .exists({ checkFalsy: true })
    .withMessage(`Member ID is required.`)
    .bail()
    .custom((value) => {
      if (!validationHelpers.isMemberExists(value)) {
        throw new Error(`Member does not exist.`)
      }

      return true;
    }),
  body("timeIn")
    .exists({ checkFalsy: true })
    .withMessage("Time-in is required.")
    .bail()
    .isISO8601()
    .withMessage("Invalid Date format (must use ISO 8601 format).")
    .bail()
    .custom((value, { req }) => {
      const { timeOut } = req.body;

      if (!timeOut) return true;  // let validation be handled on timeOut

      const sDateTime = value.split(`T`)
      const eDateTime = timeOut.split(`T`)

      const [sdYYYY, sdMM, sdDD] = sDateTime[0]?.split(`-`);
      const [edYYYY, edMM, edDD] = eDateTime[0]?.split(`-`);

      const [sdHH, sdMinutes, sdSeconds] = sDateTime[1]?.split(`:`);
      const [edHH, edMinutes, edSeconds] = eDateTime[1]?.split(`:`);

      const sDate = new Date(sdYYYY, sdMM, sdDD, sdHH, sdMinutes, sdSeconds.split(`.`)[0]);
      const eDate = new Date(edYYYY, edMM, edDD, edHH, edMinutes, edSeconds.split(`.`)[0]);

      if (eDate <= sDate) {
        throw new Error(`Time-in should be earlier than Time-out.`);
      }
      return true;
    }),
  body("timeOut")
    .optional({ nullable: true, checkFalsy: true })
    .isISO8601()
    .withMessage("Invalid Date format (must use ISO 8601 format).")
];

const updateAttendanceSchema = [
  body("id")
    .exists({ checkFalsy: true })
    .withMessage("Attendance ID is required.")
    .bail()
    .custom((value) => {
      if (!validationHelpers.isAttendanceExists(value)) {
        throw new Error(`Attendance ID does not exist.`)
      }

      return true;
    }),
  ...addAttendanceSchema
];

const deleteAttendanceSchema = [
  body("id")
    .exists({ checkFalsy: true })
    .withMessage("Attendance ID is required.")
    .bail()
    .custom((value) => {
      if (!validationHelpers.isAttendanceExists(value)) {
        throw new Error(`Attendance ID does not exist.`)
      }

      return true;
    })
];

module.exports = {
  addAttendanceSchema, 
  updateAttendanceSchema, 
  deleteAttendanceSchema
}