beforeEach(()=> {
  // Set up mock replacement for ActiveUser model / database

})

afterEach(()=> {
  // clear the mock database

})

describe ('setActiveUser', () => {
  // Test that if passed a correctly defined user, it passes it to the
  // ActiveUser.create function
  test (`If passed a correctly defined user, it should pass that user
  to the ActiveUser.create() function`, () => {
    
  });
  // Test that if passed a user missing required information, it
  // (does what? validation is handled server-side) (returns a 400
  // status?)
  test (`If passed a user missing information in a required field, it should
  return a 400 status`, () => {

  });
  // Test that if passed a user with a duplicated field (is this even
  // possible?), it (does what?)
  test (`If passed a user with a duplicated field, it should return a 400 status`,
  () => {

  });
})

describe ('getActiveUser', () => {
  // 
})

describe ('deleteActiveUser', () => {
  // 
})