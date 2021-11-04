const chalk = require("chalk");

const eventService = require("../services/eventService");

const emptySearchSchema = {
  eventname: null, 
  datestart: null, 
  dateend: null 
}

exports.getAllEvents = (req, res) => {
  const events = eventService.getEvents();
  res.status(200).send(events);
};

exports.getEvent = (req, res) => {
    const { id } = req.params;
    const eventFound = eventService.getEvent(id);

    if (!!eventFound.length) {
      res.status(200).send(eventFound);
    } else {
      console.log(chalk.redBright.bold(`Event ${id} not found.!`));
      res.status(404).send("Event not Found");
    }
};

exports.getEventBy = (req, res) => {
  const { 
    eventname: eventName , 
    datestart: startDate, 
    dateend: endDate 
  } = { ...emptySearchSchema, ...req.query };

  const eventsFound = eventService.getEventBy({ eventName, startDate, endDate });

  res.status(200).send(eventsFound);
}

exports.addEvent = (req, res) => {
  const eventData = req.body;
  eventService.addEvent(eventData);
  
  res.status(201).send(`Event successfully created`);
}

exports.updateEvent = (req, res) => {
  const eventData = req.body;
  eventService.updateEvent(eventData);

  res.status(200).send(`Event successfully updated`);
}

exports.deleteEvent = (req, res) => {
  const { id } = req.body;
  eventService.deleteEvent(id);

  res.status(200).send(`Event successfully deleted`);
};

// exports.exportEvent = (req. res) => {

// }