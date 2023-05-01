const request = require('supertest');
const assert = require('assert');
const express = require('express');
const mongoose = require ('mongoose');

const app = express();

afterAll(() => {
  mongoose.connection.close();
  // app.close();
});

app.get('/user', function(req, res) {
  res.status(200).json({ name: 'john' });
});

describe('Dummy test', () => {
  test('Dummy', () => {
    expect(1 + 2).toEqual(3);
    // request(app)
    // .end(function(err, res) {
    //   if (err) throw err;
    // })
  })
});

describe('Dummy test 2', () => {
  request(app)
  .get('/user')
  .expect('Content-Type', /json/)
  .expect('Content-Length', '15')
  .expect(200)
  .end(function(err, res) {
    if (err) throw err;
  });
})
