const mongoose = require('mongoose');
const request = require('supertest');

beforeEach(()=> {
  // Create mock empty database

})
afterEach(()=> {
  // Empty the mock database

})

describe('createUser', () => {
  // Test that if passed data properly, it calls User.register() appropriately
  test('If passed data properly, it should call User.register() in the correct way', () => {

  })

  // Test that if passed data missing a field, it does not call User.register() and returns
  // a 400 status response
  test('If passed data missing a field, it does not call User.register()', () => {

  })

  // Test that if passed data with invalid info in a field, e.g. a string for friends,
  // it does not call User.register() and returns a 400 status response


  // Test that if passed completely wrong data, e.g. the whole request body as a string,
  // it does not call User.register() and returns a 400 status response


  // NB Do not need to test for duplicates here as that is handled by the model

})

describe('loginUser', () => {
  // Before each, add a dummy user to the mock database

  // Test that if passed data properly, it calls User.find() appropriately
  test('', () => {

  })
  // Test that if passed 

});