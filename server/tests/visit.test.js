import request from 'supertest-as-promised';
import httpStatus from 'http-status';
import {expect} from 'chai';
import app from '../../index';

describe('## Visit APIs', () => {
  let visit = {
    date: Date.now() + 100000,
    visitReason: 'Because I can, mostly',
    diagnosisPlan: 'Check your health status',
    referralOrInterclinical: 'Mental doctor',
    patient: '5785a24414d67cd03a7986f9'
  };

  describe('# POST /api/visits', () => {
    it('should create a new visit', (done) => {
      request(app)
        .post('/api/visits')
        .send(visit)
        .expect(httpStatus.OK)
        .then(res => {
          expect(res.body.visitReason).to.equal(visit.visitReason);
          expect(res.body.diagnosisPlan).to.equal(visit.diagnosisPlan);
          expect(res.body.referralOrInterclinical).to.equal(visit.referralOrInterclinical);
          expect(res.body.patient).to.deep.equal(visit.patient);
          visit = res.body;
          done();
        });
    });
  });

  describe('# GET /api/visits/:visitId', () => {
    it('should get visit details', (done) => {
      request(app)
        .get(`/api/visits/${visit._id}`) // eslint-disable-line
        .expect(httpStatus.OK)
        .then(res => {
          expect(res.body.date).to.equal(visit.date);
          expect(res.body.visitReason).to.equal(visit.visitReason);
          expect(res.body.diagnosisPlan).to.equal(visit.diagnosisPlan);
          expect(res.body.referralOrInterclinical).to.equal(visit.referralOrInterclinical);
          expect(res.body.patient).to.deep.equal(visit.patient);
          done();
        });
    });

    it('should report error - Not found, if visit not exists', (done) => {
      request(app)
        .get('/api/visits/56c787ccc67fc16ccc1a5e92')
        .expect(httpStatus.NOT_FOUND)
        .then(res => {
          expect(res.body.message).to.equal('Not Found');
          done();
        });
    });
  });

  describe('# PUT /api/visits/:visitId', () => {
    it('should update user details', (done) => {
      visit.visitReason = 'Why are you here?';
      visit.visit = '507f191e810c19729de860ea';
      request(app)
        .put(`/api/visits/${visit._id}`) // eslint-disable-line
        .send(visit)
        .expect(httpStatus.OK)
        .then(res => {
          expect(res.body.visitReason).to.equal(visit.visitReason);
          expect(res.body.diagnosisPlan).to.equal(visit.diagnosisPlan);
          expect(res.body.referralOrInterclinical).to.equal(visit.referralOrInterclinical);
          expect(res.body.patient).to.deep.equal(visit.patient);
          done();
        });
    });
  });

  describe('# GET /api/visits', () => {
    it('should get all visits', (done) => {
      request(app)
        .get('/api/visits')
        .expect(httpStatus.OK)
        .then(res => {
          expect(res.body).to.be.an('array');
          done();
        })
        .catch(() => done());
    });
  });

  describe('# DELETE /api/visits', () => {
    it('should delete an visit', (done) => {
      request(app)
        .delete(`/api/visits/${visit._id}`) // eslint-disable-line
        .expect(httpStatus.OK)
        .then(res => {
          expect(res.body.visitReason).to.equal(visit.visitReason);
          expect(res.body.diagnosisPlan).to.equal(visit.diagnosisPlan);
          expect(res.body.referralOrInterclinical).to.equal(visit.referralOrInterclinical);
          expect(res.body.patient).to.deep.equal(visit.patient);
          done();
        });
    });
  });
});
