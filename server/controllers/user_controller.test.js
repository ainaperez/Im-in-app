const mongoose = require('mongoose');
const { MongoMemoryServer, MongodbMemoryServer } = require('mongodb-memory-server');
// const MongodbMemoryServer = require('mongodb-memory-server').default;
const { MongoClient } = require('mongodb');
const  request = require('supertest');
// const test = require ('ava');
// const mockUsers = require('../utilities/mock-users.json');
const User = require ('../models/user_model');
const app = require ('../index');

// const mongod = new MongoMemoryServer();

describe('user controllers', () => {
  let connection;
  let mongoUri;
  let mongoServer;

  afterAll(() => {
    mongoose.connection.close();
    // app.close();
  });
  // beforeAll(async ()=> {
  //   // mongoServer = await MongoMemoryServer.create();
  //   // mongoUri = mongoServer.getUri();
  //   // connection = await mongoose.connect(mongoUri);
  //   // await mongod.start();
  //   // mongoUri = mongod.getUri();
  //   // connection = await mongoose.connect(mongoUri, {
  //   //   useNewUrlParser: true,
  //   //   useUnifiedTopology: true,
  //   // });
  //   // const user = new User({"name": "Username",
  //   // "profilePicture": "user1-mock_zmeq2k.jpg",
  //   // "phone": "12345",
  //   // "email": "dummy@dummy.com",
  //   // "age": 26,
  //   // "friends": [
  //   //   "64415e7997483b215fd4c3f1"
  //   // ],
  //   // "following": [],
  //   // "savedEvents": [
  //   //   "644295afe5526342bc28c8d0",
  //   //   "644149ca35f35f8c13f25c60"
  //   // ],
  //   // "joinedEvents": [
  //   //   "644295afe5526342bc28c8d0",
  //   //   "644149ca35f35f8c13f25c60"
  //   // ],
  //   // "username": "user_1",
  //   // "salt": "621e83d9c2f21e097b3fbb9f34823f73686b02ba29a5f41e78fee5f9844a8cdd",
  //   // "hash": "c8e13418666608f496526775591b083ece3027f8ac65b9262d8030ff81897dfa22fb48ece055c94c2edfdf1cd42dc7317532349b46cdc3724c2bf20aa9d505f16410ea70c0aad8b0a720d5ad9ff14955f0f450356d6e81c09dc5fc86d072e5c920b2a86c516b427b0b326dc3a61637e5b4ade0fc5dd6a2c87413bbe2a9f99c2eaf29caf4c9af567bbd9052f59a8b9d3f339dc12812df0ccec1edeeba84ac7a858f3edc701ed7d611c772a8d874352f81163a3557f434188cee5270037d0987fa794dc417e81108e5ed56bb43d58fcb2dec454b1acaba236d2880d946c2ae2567584d23063102d0bf46d05dab89e914bd765626aafaf1c991ca3954b2e7ce42ade8309524fdc4ea0646e4a36261cee8e9532d74c278c1ad6f7a71e3bbbfa3c81c2207923e8017406a654a93f3a9418699cb14406519530ad515e16cd552c4a3b4261836141434d0302bd1a2953c2ef94679f472ba8e1820142874e0d5e5ea2e81f58c0b6c6d7efdf50640a27dc456a511606be2c2219bbfb9d3a2a5513d5f7e11e490543aae2da77d2c269bc622bc1533711a2930ff1c1b4c0fff0d071d312513336de75a69c5c664b54f2e057ee871764269a83059c4084c0ae5b44a0b9b1ff98ee89f7cf61514e9eee00485b93d362328ec8b1b7ae2026a57215768d55826c4ade6a1f3e84d91fa17cc93b0b3a9fe1812170b869cdf36cdd8a311f1909d4448",
  //   // "__v": 148});
  //   // await user.save();
  // })
  // afterAll(async ()=> {
  //   // if (connection) {
  //   //   // await User.remove();
  //   //   await connection.close()};
  //   // if (mongoServer) {await mongoServer.stop()};
  //   // if (mongod) {await mongod.stop()};
  //   mongoose.disconnect();
  // })

  // test('should successfully set & get information from the database', async () => {
  //   const db = connection.db(mongoServer.instanceInfo.dbName);

  //   // expect(db).toBeDefined();
  //   // const col = db.collection('test');
  //   // const result = await col.insertMany([{ a: 1 }, { b: 1 }]);
  //   // expect(result.insertedCount).toStrictEqual(2);
  //   // expect(await col.countDocuments({})).toBe(2);
  // });

  describe('Dummy test', () => {
    test('Dummy', () => {
      expect(1 + 2).toEqual(3);
      // request(app)
      //   .end(function(err, res) {
      //   if (err) throw err;
      // })
    })
  });
  
  // describe('createUser', () => {
  //   const user = new User({"name": "Username",
  //   "profilePicture": "user1-mock_zmeq2k.jpg",
  //   "phone": "12345",
  //   "email": "dummy@dummy.com",
  //   "age": 26,
  //   "friends": [
  //     "64415e7997483b215fd4c3f1"
  //   ],
  //   "following": [],
  //   "savedEvents": [
  //     "644295afe5526342bc28c8d0",
  //     "644149ca35f35f8c13f25c60"
  //   ],
  //   "joinedEvents": [
  //     "644295afe5526342bc28c8d0",
  //     "644149ca35f35f8c13f25c60"
  //   ],
  //   "username": "user_1",
  //   "salt": "621e83d9c2f21e097b3fbb9f34823f73686b02ba29a5f41e78fee5f9844a8cdd",
    // "hash": "c8e13418666608f496526775591b083ece3027f8ac65b9262d8030ff81897dfa22fb48ece055c94c2edfdf1cd42dc7317532349b46cdc3724c2bf20aa9d505f16410ea70c0aad8b0a720d5ad9ff14955f0f450356d6e81c09dc5fc86d072e5c920b2a86c516b427b0b326dc3a61637e5b4ade0fc5dd6a2c87413bbe2a9f99c2eaf29caf4c9af567bbd9052f59a8b9d3f339dc12812df0ccec1edeeba84ac7a858f3edc701ed7d611c772a8d874352f81163a3557f434188cee5270037d0987fa794dc417e81108e5ed56bb43d58fcb2dec454b1acaba236d2880d946c2ae2567584d23063102d0bf46d05dab89e914bd765626aafaf1c991ca3954b2e7ce42ade8309524fdc4ea0646e4a36261cee8e9532d74c278c1ad6f7a71e3bbbfa3c81c2207923e8017406a654a93f3a9418699cb14406519530ad515e16cd552c4a3b4261836141434d0302bd1a2953c2ef94679f472ba8e1820142874e0d5e5ea2e81f58c0b6c6d7efdf50640a27dc456a511606be2c2219bbfb9d3a2a5513d5f7e11e490543aae2da77d2c269bc622bc1533711a2930ff1c1b4c0fff0d071d312513336de75a69c5c664b54f2e057ee871764269a83059c4084c0ae5b44a0b9b1ff98ee89f7cf61514e9eee00485b93d362328ec8b1b7ae2026a57215768d55826c4ade6a1f3e84d91fa17cc93b0b3a9fe1812170b869cdf36cdd8a311f1909d4448",
  //   "__v": 148});
    // request(app)
      // .post('/register', )

    // Test that if passed data properly, it calls User.register() appropriately
    // test('If passed data properly, it should call User.register() in the correct way', async (done) => {
      

      // await User.insertOne(mockUsers[0]);
      // expect (await User.find()).toBeDefined(); 
    // });
    
    // Test that if passed data missing a field, it does not call User.register() and returns
    // a 400 status response
    // test('If passed data missing a field, it does not call User.register()', (done) => {
      
    // })
    
    // Test that if passed data with invalid info in a field, e.g. a string for friends,
    // it does not call User.register() and returns a 400 status response
    
    
    // Test that if passed completely wrong data, e.g. the whole request body as a string,
    // it does not call User.register() and returns a 400 status response
    
    
    // NB Do not need to test for duplicates here as that is handled by the model
    
  // })
  
  // describe('loginUser', () => {
  //   // Before each, add a dummy user to the mock database
  //   // beforeEach(async () => {
      
  //   // })

  //   // Test that if passed data properly, it calls User.find() appropriately
    
  //   // Test that if passed 
  // })
    
  
  describe('getAllUsers', () => {
    // If empty database, return empty array
    test('If there are no users in the database, should return an empty array', async () => {
      request(app)
        .get('/users')
        .expect('Content-Type', /json/)
        .expect('Content', "[]")
        .expect(200)
        .end(function(err, res) {
          if (err) throw err;
        })
    })
    
    // Add one user, should return it as the only item of an array
    
    
    // Add two users, should return both
    
    
    
  });
})