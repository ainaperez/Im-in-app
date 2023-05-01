const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { MongoClient } = require('mongodb');
//let mongod = null;

// This test fails because 1 !== 2
// it("Testing to see if Jest works", () => {
//   expect(1).toBe(2);
// });

// // This test passes because 1 === 1
// it("Testing to see if Jest works", () => {
//   expect(1).toBe(1);
// });

describe('Initial test', function () {
  let connection;
  let mongoServer;

  beforeAll(
    async function () {
      mongoServer = await MongoMemoryServer.create();
      connection = await MongoClient.connect(mongoServer.getUri(), {});
    }
  );

  afterAll(
    async function () {
      if (connection) {await connection.close()};
      if (mongoServer) {await mongoServer.stop()};
    }
  );

  it('should successfully set & get information from the database', async function () {
    const db = connection.db(mongoServer.instanceInfo.dbName);
    expect(db).toBeDefined();
    const collection = db.collection('test');
    const result = await collection.insertMany([{ a: 1 }, { b: 1 }]);
    expect(result.insertedCount).toStrictEqual(2);
    expect(await collection.countDocuments({})).toBe(2);
  });
});

// beforeAll or beforeEach?

// // This will create an new instance of "MongoMemoryServer" and automatically start it
// const mongod = await MongoMemoryServer.create();

// const uri = mongod.getUri();

// // The Server can be stopped again with
// await mongod.stop();




