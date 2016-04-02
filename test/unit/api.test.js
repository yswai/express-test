var should = require('should');
var mongoose = require('mongoose');
var Subscription = mongoose.model('Subscription');
var testHelper = require('../helper/test-helper');
var app = require('../../app');
var request = require('supertest');

describe(`Rest API`, () => {

  describe(`Mongoose model`, () => {

    beforeEach((done) => {
      var setupFixture = () => {
        return Subscription.create({
          name: 'YSW Google API Subscription'
        }).then(() => done());
      }
      testHelper.cleanCollection(Subscription).then(setupFixture);
    });

    it(`should be able to return list of items`, (done) => {
      var checkCollectionSize = () => {
        return Subscription.find().then((data) => {
          data.should.have.length(2);
        });
      }
      Subscription.create({
        name: 'Cruz Google API Subscription'
      }).then((createdModel) => {
        createdModel.should.have.property('_id');
      }).then(checkCollectionSize).then(() => done());
    });

  });

  describe(`Mock subscription API`, () => {
    it(`should return correct subscriptions`, (done) => {
      request(app)
        .get('/subscriptions')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          res.body.should.have.length(2);
          done();
        });
    });
  });

  describe(`User API`, () => {
    it(`should return correct users`, (done) => {
      request(app)
        .get('/users')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          console.log(res.body);
          res.body.should.have.length(1);
          done();
        });
    });
  });

});
