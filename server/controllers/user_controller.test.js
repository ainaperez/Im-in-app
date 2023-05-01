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
  const user1 = new User({"name": "Username",
  "profilePicture": "user1-mock_zmeq2k.jpg",
  "phone": "12345",
  "email": "dummy@dummy.com",
  "age": 26,
  "friends": [
    "64415e7997483b215fd4c3f1"
  ],
  "following": [],
  "savedEvents": [
    "644295afe5526342bc28c8d0",
    "644149ca35f35f8c13f25c60"
  ],
  "joinedEvents": [
    "644295afe5526342bc28c8d0",
    "644149ca35f35f8c13f25c60"
  ],
  "username": "user_1",
  "salt": "621e83d9c2f21e097b3fbb9f34823f73686b02ba29a5f41e78fee5f9844a8cdd",
  "hash": "c8e13418666608f496526775591b083ece3027f8ac65b9262d8030ff81897dfa22fb48ece055c94c2edfdf1cd42dc7317532349b46cdc3724c2bf20aa9d505f16410ea70c0aad8b0a720d5ad9ff14955f0f450356d6e81c09dc5fc86d072e5c920b2a86c516b427b0b326dc3a61637e5b4ade0fc5dd6a2c87413bbe2a9f99c2eaf29caf4c9af567bbd9052f59a8b9d3f339dc12812df0ccec1edeeba84ac7a858f3edc701ed7d611c772a8d874352f81163a3557f434188cee5270037d0987fa794dc417e81108e5ed56bb43d58fcb2dec454b1acaba236d2880d946c2ae2567584d23063102d0bf46d05dab89e914bd765626aafaf1c991ca3954b2e7ce42ade8309524fdc4ea0646e4a36261cee8e9532d74c278c1ad6f7a71e3bbbfa3c81c2207923e8017406a654a93f3a9418699cb14406519530ad515e16cd552c4a3b4261836141434d0302bd1a2953c2ef94679f472ba8e1820142874e0d5e5ea2e81f58c0b6c6d7efdf50640a27dc456a511606be2c2219bbfb9d3a2a5513d5f7e11e490543aae2da77d2c269bc622bc1533711a2930ff1c1b4c0fff0d071d312513336de75a69c5c664b54f2e057ee871764269a83059c4084c0ae5b44a0b9b1ff98ee89f7cf61514e9eee00485b93d362328ec8b1b7ae2026a57215768d55826c4ade6a1f3e84d91fa17cc93b0b3a9fe1812170b869cdf36cdd8a311f1909d4448",
  "__v": 148});
  const user2 = new User({"name": "",
  "profilePicture": "user2-mock.jpeg",
  "phone": "",
  "email": "",
  "age": 18,
  "friends": [],
  "following": [],
  "savedEvents": [],
  "joinedEvents": [],
  "username": "jordi",
  "salt": "8e0dabad2edc0c0db6f558b74149690373014a687468290ce11ac9306ce9e179",
  "hash": "75583ea6109ce0a443c1c604f9d1b26260ed6963bc8be681d03a5edd1d55ffa86ac40c29dca7e677027cca6a4b5ad841cd6f412f529ae85ed45d73799f9f21bf4cef09927214d8359c45aad520513ddf48b264732c60137c18c9daef0d18ba1fee5d4f305b5e44bf3e32543988258c9d884205e348a4585807695fc6647d606c87e87256ef69b232487448d50baec1b11e71efc1d4ce9d7462e79f23ae935bcc1aa00b7172a9d59e6e64390b04963fca6f1cfc6193adc44dcf41c3f0a52bb183cedcdbdc6c3f4d01293a229e2501bf4c7321c57744f6ef733abfcfa6a93a43ed1a14097cda9ef14c98a407c0533d1d5c606fed8927d777834254235233575111174639866dbbaddbd37b34238588e2b05e0e481d9977da57df3ae11d31a208018e41214b88766334d68d8e212441f088029c5e3bca0d2a6557241d02213b82fd2f2fd540fcc5df20164a8b1c010dc092040197641cbacda5af59168636bdd78e3f516ed79a777bbd84da52772375e686529307df519c56aedb22cd8e3ea902c4bb7b7700548ed8fad036465e1f9acf78c42a17ea5626fc88fc62a7597f65fcbe4f6a7a6d6f5ca2c12e065e683163c10ae449650196d5c012603f411da5dc95af71efd89b6e96303119d90d34b40ccb563beee79a75dfc96ef0dc4de773e47bb7f113b25efb51343f48c7db76428fadfdf425b33eb8f31853237da42890bc25f3",
  "__v": 0})

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
        .timeout(1000)
        .expect('Content-Type', /json/)
        .then((res)=>{
          // expect(res.body).toEqual([]) // This works with an empty array, a JSON string of an empty array, or ['hello]
          // .expect(200)
          // .end(function(err, res) {
          //   if (err) throw err;
          // })
          assert.equal([], res.text);
          assert.equal(res.status, 200);
          assert.equal(res.status, 202);
          assert.equal(res.status, 'heliotrope');
        })
    }),
    test('Dummy', () => {
      expect(1 + 2).toEqual(3);
    }),
    
    // Add one user, should return it as the only item of an array
    test('If one user is added to the database, should return an array containing only that user', async () => {
      // await user1.save();
      request(app)
        .get('/users')
        .timeout(1000)
        .expect('Content-Type', /json/)
        .then((res)=>{
          expect(res.body).toEqual(user1)
          .expect(res.body).toHaveLength(1)
          .expect(200)
          .end(function(err, res) {
            if (err) throw err;
        })
      })
    })
    
    // Add two distinct users, should return both
    test('If two distinct users are added to the database, should return an array containing both', async () => {
      expect(1 + 2).toEqual(3);
    })


    
    
    
    
  });
})