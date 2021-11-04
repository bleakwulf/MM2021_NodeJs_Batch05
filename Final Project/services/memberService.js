const chalk = require("chalk");

const DataStore = require('../store/dataStore');
const memberDataStore = new DataStore('members', []);
const attendanceDataStore = new DataStore('attendances', []);
const eventDataStore = new DataStore('events', []);

exports.getAllMembers = () => {
  return memberDataStore.getAll();
};

getEventAttendance = (memberId) => {
  const eventsAttendancesData = [];
  
  const eventAttendanceData =  attendanceDataStore
    .getBy({ memberId })
    .map( a => Object.assign({}, { eventId: a.eventId, timeIn: a.timeIn, timeOut: a.timeOut }))
    .forEach( eventAttendance => {
      const eventData = eventDataStore.get(eventAttendance.eventId);
      eventsAttendancesData.push({ 
        eventName: eventData[0].eventName, 
        timeIn: eventAttendance.timeIn, 
        timeOut: eventAttendance.timeOut
      });
    });

  return eventsAttendancesData;
}

exports.getMember = (id) => {
  const memberData = memberDataStore.get(id);
  memberData[0].eventAttendance = getEventAttendance(id);

  return memberData;
};

exports.getMemberBy = (filters) => {;
  return memberDataStore.getBy(filters);
}

exports.addMember = (memberData) => {
  memberDataStore.insert({ 
    id: memberDataStore.generateId(),
    ...memberData 
  });

  console.log(chalk.greenBright(`Member successfully created`));
}

exports.updateMember = (memberData) => {
  const { id } = memberData;
  const memberPrevData = memberDataStore.get(id);

  memberDataStore.update(id, { ...memberPrevData[0], ...memberData });
  console.log(chalk.greenBright(`Member successfully updated`));
}

exports.deleteMember = (id) => {
  memberDataStore.remove(id);
  console.log(chalk.greenBright(`Member successfully deleted`));
};
