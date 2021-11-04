const { body, query, param, oneOf } = require("express-validator");
const validationHelpers = require("./helpers/dataValidationHelpers");

const searchEventSchema = [
  oneOf(
    [
      query("eventname").exists(),
      query("datestart").exists(),
      query("dateend").exists()
    ], 
    "Unable to perform search without any search parameters."
  ), 
  query("eventname")
    .optional()
    .not().isEmpty()
    .withMessage("No criteria specified for event name in search parameters."),
  query("datestart")
    .optional()
    .not().isEmpty()
    .withMessage("No criteria specified for date start in search parameters.")
    .bail()
    .isISO8601()
    .withMessage("Invalid Date format (must use ISO 8601 format)."),
  query("dateend")
    .optional()
    .not().isEmpty()
    .withMessage("No criteria specified for date end in search parameters.")
    .bail()
    .isISO8601()
    .withMessage("Invalid Date format (must use ISO 8601 format).")
];

const addEventSchema = [
  body("eventName")
    .exists({ checkFalsy: true })
    .withMessage("Event Name is required."),
  body("eventType")
    .exists({ checkFalsy: true })
    .withMessage("Event Type is required."),
  body("startDate")
    .exists({ checkFalsy: true })
    .withMessage("Start Date is required.")
    .bail()
    .isISO8601()
    .withMessage("Invalid Date format (must use ISO 8601 format).")
    .bail()
    .custom((value, { req }) => {
      const { endDate } = req.body;

      if (!endDate) return true;  // let validation be handled on endDate

      const [sdYYYY, sdMM, sdDD] = (value.split(`T`)[0])?.split(`-`);
      const [edYYYY, edMM, edDD] = (endDate.split(`T`)[0])?.split(`-`);

      const sDate = new Date(sdYYYY, sdMM, sdDD);
      const eDate = new Date(edYYYY, edMM, edDD);

      if (eDate <= sDate) {
        throw new Error(`Start Date should be earlier than End Date.`);
      }
      return true;
    }),
  body("endDate")
    .exists({ checkFalsy: true })
    .withMessage("End Date is required.")
    .bail()
    .isISO8601()
    .withMessage("Invalid Date format (must use ISO 8601 format).")
];

const updateEventSchema = [
  body("id")
    .exists({ checkFalsy: true })
    .withMessage("Event ID is required.")
    .bail()
    .custom((value) => {
      if (!validationHelpers.isEventExists(value)) {
        throw new Error(`Event does not exist.`);
      }

      return true;
    }),
  ...addEventSchema
];

const deleteEventSchema = [
  body("id")
    .exists({ checkFalsy: true })
    .withMessage("Event ID is required.")
    .bail()
    .custom((value) => {
      if (!validationHelpers.isEventExists(value)) {
        throw new Error(`Event does not exist.`);
      }

      return true;
    })
    .bail()
    .custom((value) => {
      if (!!validationHelpers.isEventWithAttendees(value)) {
        throw new Error(`Unable to delete the event since event already has/have attendee/s.`);
      } 
      return true;
    })
];

module.exports = {
  searchEventSchema, 
  addEventSchema, 
  updateEventSchema, 
  deleteEventSchema
}