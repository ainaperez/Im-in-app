const initializeMongoServer = require('../mongoConfigTesting');
const express = require('express');
const router = require('./router');
const supertest = require('supertest');
const User = require('./models/user_model'); 
const { initialize } = require('passport');
const mocks = require ('../utilities/utility_functions');
const mockUsers = require('../utilities/mock-users.json');
// Surely the above is not what we want? Need to replace with mock DB


describe('user controllers', () => {
  const app = express();
  app.use(express.json());
  app.use(router);
  const request = supertest(app);

  beforeEach(async ()=> {
    await initializeMongoServer();
    User.create(mockUsers[0]);
  })
  afterEach(async ()=> {
    await User.deleteMany();
  })
  
  describe('createUser', () => {
    // Test that if passed data properly, it calls User.register() appropriately
    test('If passed data properly, it should call User.register() in the correct way', (done) => {
      
    })
    
    // Test that if passed data missing a field, it does not call User.register() and returns
    // a 400 status response
    test('If passed data missing a field, it does not call User.register()', (done) => {
      
    })
    
    // Test that if passed data with invalid info in a field, e.g. a string for friends,
    // it does not call User.register() and returns a 400 status response
    
    
    // Test that if passed completely wrong data, e.g. the whole request body as a string,
    // it does not call User.register() and returns a 400 status response
    
    
    // NB Do not need to test for duplicates here as that is handled by the model
    
  })
  
  describe('loginUser', () => {
    // Before each, add a dummy user to the mock database
    beforeEach(async () => {
      
    })

    // Test that if passed data properly, it calls User.find() appropriately
    
    // Test that if passed 
  })
    
  
  describe('getAllUsers', () => {
    // If empty database, return empty array
    test('If there are no users in the database, should return an empty array', async () => {
      const res = await request(index).get('/users');
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual([]);
    })
    
    // Add one user, should return it as the only item of an array
    
    
    // Add two users, should return both
    
    
    
  });
})