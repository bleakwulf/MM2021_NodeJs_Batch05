const eventService = require("../../../services/eventService");
const memberService = require("../../../services/memberService");
const attendanceService = require("../../../services/attendanceService");

exports.isEventExists = (id) => {
  const eventsFound = eventService.getEvent(id);
  return !!eventsFound.length; 
}

exports.isEventWithAttendees = ( eventId ) => {
  const attendees = attendanceService.getAttendancesBy({ eventId });
  return !!attendees.length;
}

exports.isMemberExists = (id) => {
  const membersFound = memberService.getMember(id);
  return !!membersFound.length; 
}

exports.isMemberHasEvent = ( memberId ) => {
  const attendances = attendanceService.getAttendancesBy({ memberId });
  return !!attendances.length;
}

exports.isAttendanceExists = (id) => {
  const attendanceFound = attendanceService.getAttendance(id);
  return !!attendanceFound.length; 
}