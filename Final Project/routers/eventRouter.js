const express = require('express');
const eventController = require('../controllers/eventController');
const router = express.Router();

const eventValidators = require('./validations/eventsRequestValidator');
const { validationsCheck } = require('./validations/validationsCheck');

router.get('/search', 
  eventValidators.searchEventSchema,
  validationsCheck,
  eventController.getEventBy);

router.get('/:id', eventController.getEvent);

router.get('/', eventController.getAllEvents);
  
// router.get('/export', 
//   eventController.nameExistsValidator, 
//   eventController.getUser);

router.post('/', 
  eventValidators.addEventSchema,
  validationsCheck,
  eventController.addEvent);

router.put('/', 
  eventValidators.updateEventSchema,
  validationsCheck,
  eventController.updateEvent);
  
router.delete('/', 
  eventValidators.deleteEventSchema,
  validationsCheck,
  eventController.deleteEvent);

module.exports = router;