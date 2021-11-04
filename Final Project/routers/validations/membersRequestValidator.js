const { body, query, param, oneOf } = require("express-validator");
const validationHelpers = require("./helpers/dataValidationHelpers");

const searchMemberSchema = [
  query("name")
    .exists()
    .withMessage("Name criteria not found among search parameters."),
  query("status")
    .exists()
    .withMessage("Status criteria not found among search parameters.")
    .bail()
    .isIn([ "Active", "In-active" ])
    .withMessage(`Invalid Status.`),
];

const addMemberSchema = [
  body("name")
    .exists({ checkFalsy: true })
    .withMessage(`Member Name is required.`),
  body("joinedDate")
    .optional({ nullable: true, checkFalsy: true })
    .isISO8601()
    .withMessage("Invalid Date format (must use ISO 8601 format)."),
  body("status")
    .exists({ checkFalsy: true })
    .withMessage(`Status is required.`)
    .bail()
    .isIn([ `Active`, `In-active`])
    .withMessage(`Invalid Status value.`)
];

const updateMemberSchema = [
  body("id")
    .exists({ checkFalsy: true })
    .withMessage("Member ID is required.")
    .bail()
    .custom((value) => {
      if (!validationHelpers.isMemberExists(value)) {
        throw new Error(`Member does not exist.`)
      }

      return true;
    }),
  ...addMemberSchema
];

const deleteMemberSchema = [
  body("id")
    .exists({ checkFalsy: true })
    .withMessage("Member ID is required.")
    .bail()
    .custom((value) => {
      if (!validationHelpers.isMemberExists(value)) {
        throw new Error(`Member does not exist.`);
      }

      return true;
    })
    .bail()
    .custom((value) => {
      if (!!validationHelpers.isMemberHasEvent(value)) {
        throw new Error(`Unable to delete member since member is an attendee to at least one event.`);
      } 
      return true;
    })
];

module.exports = {
  searchMemberSchema, 
  addMemberSchema, 
  updateMemberSchema, 
  deleteMemberSchema
}