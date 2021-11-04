const express = require('express');
const memberController = require('../controllers/memberController');
const router = express.Router();

const eventValidators = require('./validations/membersRequestValidator');
const { validationsCheck } = require('./validations/validationsCheck');

router.get('/search', 
  eventValidators.searchMemberSchema,
  validationsCheck,
  memberController.getMemberBy);

router.get('/:id', memberController.getMember);

router.get('/', memberController.getAllMembers);

router.post('/', 
  eventValidators.addMemberSchema,
  validationsCheck,
  memberController.addMember);

router.put('/', 
  eventValidators.updateMemberSchema,
  validationsCheck,
  memberController.updateMember);
  
router.delete('/', 
  eventValidators.deleteMemberSchema,
  validationsCheck,
  memberController.deleteMember);

module.exports = router;