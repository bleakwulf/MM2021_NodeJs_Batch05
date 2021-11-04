const chalk = require("chalk");

const DataStore = require('../store/dataStore');
const eventDataStore = new DataStore('events', []);
const attendanceDataStore = new DataStore('attendances', []);
const memberDataStore = new DataStore('members', []);

exports.getEvents = () => {
  return eventDataStore.getAll();
};

const getEventAttendees = (id) => {
  const membersData = [];

  const eventAttendanceData =  attendanceDataStore
    .getBy({ eventId: id})
    .map(a => Object.assign({}, { memberId: a.memberId, timeIn: a.timeIn, timeOut: a.timeOut }))
    .forEach(member => {
      const memberData = memberDataStore.get(member.memberId);
      membersData.push({ ...member, name: memberData[0].name });
    });

  return membersData;
}

exports.getEvent = (id) => {
  const eventData = eventDataStore.get(id);
  eventData[0].memberAttendance = getEventAttendees(id);

  return eventData;
};

exports.getEventBy = (filters) => {
  return eventDataStore.getBy(filters);
}

exports.addEvent = (eventData) => {
  eventDataStore.insert({ 
    id: eventDataStore.generateId(),
    ...eventData 
  });

  console.log(chalk.greenBright(`Event successfully created`));
}

exports.updateEvent = (eventData) => {
  const { id } = eventData;
  const eventPrevData = eventDataStore.get(id);
  
  eventDataStore.update( id, { ...eventPrevData[0], ...eventData });
  console.log(chalk.greenBright(`Event successfully updated`));
}

exports.deleteEvent = (id) => {
  eventDataStore.remove(id);
  console.log(chalk.greenBright(`Event successfully deleted`));
};

// exports.exportEvent = (id) => {

// }