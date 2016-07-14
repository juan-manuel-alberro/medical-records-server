import request from 'supertest-as-promised';
import httpStatus from 'http-status';
import {expect} from 'chai';
import app from '../../index';

describe('## Interview APIs', () => {
  let interview = {
    date: Date.now() + 100000,
    test: 'Test number one',
    befall: 'Patient zero',
    hypothesis: 'Run far away',
    visit: '507f191e810c19729de860ea'
  };

  describe('# POST /api/interviews', () => {
    it('should create a new interview', (done) => {
      request(app)
        .post('/api/interviews')
        .send(interview)
        .expect(httpStatus.OK)
        .then(res => {
          expect(res.body.test).to.equal(interview.test);
          expect(res.body.befall).to.equal(interview.befall);
          expect(res.body.hypothesis).to.equal(interview.hypothesis);
          expect(res.body.visit).to.deep.equal(interview.visit);
          interview = res.body;
          done();
        });
    });
  });

  describe('# GET /api/interviews/:interviewId', () => {
    it('should get interview details', (done) => {
      request(app)
        .get(`/api/interviews/${interview._id}`) // eslint-disable-line
        .expect(httpStatus.OK)
        .then(res => {
          expect(res.body.test).to.equal(interview.test);
          expect(res.body.befall).to.equal(interview.befall);
          expect(res.body.hypothesis).to.equal(interview.hypothesis);
          expect(res.body.visit).to.deep.equal(interview.visit);
          done();
        });
    });

    it('should report error - Not found, if interview not exists', (done) => {
      request(app)
        .get('/api/interviews/56c787ccc67fc16ccc1a5e92')
        .expect(httpStatus.NOT_FOUND)
        .then(res => {
          expect(res.body.message).to.equal('Not Found');
          done();
        });
    });
  });

  describe('# PUT /api/interviews/:interviewId', () => {
    it('should update user details', (done) => {
      interview.test = 'New test';
      interview.visit = '507f191e810c19729de860ea';
      request(app)
        .put(`/api/interviews/${interview._id}`) // eslint-disable-line
        .send(interview)
        .expect(httpStatus.OK)
        .then(res => {
          expect(res.body.test).to.equal(interview.test);
          expect(res.body.befall).to.equal(interview.befall);
          expect(res.body.hypothesis).to.equal(interview.hypothesis);
          expect(res.body.visit).to.deep.equal(interview.visit);
          done();
        });
    });
  });

  describe('# GET /api/interviews', () => {
    it('should get all interviews', (done) => {
      request(app)
        .get('/api/interviews')
        .expect(httpStatus.OK)
        .then(res => {
          expect(res.body).to.be.an('array');
          done();
        })
        .catch(() => done());
    });
  });

  describe('# DELETE /api/interviews', () => {
    it('should delete an interview', (done) => {
      request(app)
        .delete(`/api/interviews/${interview._id}`) // eslint-disable-line
        .expect(httpStatus.OK)
        .then(res => {
          expect(res.body.test).to.equal(interview.test);
          expect(res.body.befall).to.equal(interview.befall);
          expect(res.body.hypothesis).to.equal(interview.hypothesis);
          expect(res.body.visit).to.deep.equal(interview.visit);
          done();
        });
    });
  });
});
