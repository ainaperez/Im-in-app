// Import data
const mockEvents = require('./mock-events.json');
const mockUsers = require('./mock-users.json');
const baseUrl = 'http://localhost:3030';

async function registerUser (userObject) {
  const response = await fetch (baseUrl + '/register', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    },
    body: JSON.stringify(userObject)
  });
  const newUser = await response.json();
  return newUser;
};

async function addEvent (eventObject) {
  const response = await fetch (baseUrl + '/add-event', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    },
    body: JSON.stringify(eventObject)
  });
  const newEvent = await response.json();
  return newEvent;
}

function addMockUsers (mockUsers) {
  for (let i = 0; i < mockUsers.length; i++) {
    registerUser({...mockUsers[i], password: `hello${i}`});
  };
}

function addMockEvents (mockEvents) {
  for (let i = 0; i < mockEvents.length; i++) {
    addEvent(mockEvents[i]);
  };
}

export function populateMockUsersDB () {addMockUsers(mockUsers)};
export function populateMockEventsDB () {addMockEvents(mockEvents)};