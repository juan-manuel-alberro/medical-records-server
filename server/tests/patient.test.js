import request from 'supertest-as-promised';
import httpStatus from 'http-status';
import {expect} from 'chai';
import app from '../../index';

describe('## Patient APIs', () => {
  let patient = {
    name: 'Juan Manuel',
    lastname: 'Alberro',
    dob: '123',
    education: 'BS Engineer',
    phoneNumber: '1234567890',
    mobileNumber: '1234567891',
    referer: 'Dr. Nick Riviera',
    familyTree: 'Dad, Mom, brothers and a dog.'
  };

  describe('# POST /api/patients', () => {
    it('should create a new patient', (done) => {
      request(app)
        .post('/api/patients')
        .send(patient)
        .expect(httpStatus.OK)
        .then(res => {
          expect(res.body.name).to.equal(patient.name);
          expect(res.body.lastname).to.equal(patient.lastname);
          expect(res.body.education).to.equal(patient.education);
          expect(res.body.phoneNumber).to.equal(patient.phoneNumber);
          expect(res.body.mobileNumber).to.equal(patient.mobileNumber);
          expect(res.body.referer).to.equal(patient.referer);
          expect(res.body.familyTree).to.equal(patient.familyTree);
          patient = res.body;
          done();
        });
    });
  });

  describe('# GET /api/patients/:patientId', () => {
    it('should get patient details', (done) => {
      request(app)
        .get(`/api/patients/${patient._id}`) // eslint-disable-line
        .expect(httpStatus.OK)
        .then(res => {
          expect(res.body.name).to.equal(patient.name);
          expect(res.body.lastname).to.equal(patient.lastname);
          expect(res.body.education).to.equal(patient.education);
          expect(res.body.phoneNumber).to.equal(patient.phoneNumber);
          expect(res.body.mobileNumber).to.equal(patient.mobileNumber);
          expect(res.body.referer).to.equal(patient.referer);
          expect(res.body.familyTree).to.equal(patient.familyTree);
          done();
        });
    });

    it('should report error - Not found, if patient not exists', (done) => {
      request(app)
        .get('/api/patients/56c787ccc67fc16ccc1a5e92')
        .expect(httpStatus.NOT_FOUND)
        .then(res => {
          expect(res.body.message).to.equal('Not Found');
          done();
        });
    });
  });

  describe('# PUT /api/patients/:patientId', () => {
    it('should update user details', (done) => {
      patient.phoneNumber = '2234567809';
      request(app)
        .put(`/api/patients/${patient._id}`) // eslint-disable-line
        .send(patient)
        .expect(httpStatus.OK)
        .then(res => {
          expect(res.body.name).to.equal(patient.name);
          expect(res.body.lastname).to.equal(patient.lastname);
          expect(res.body.education).to.equal(patient.education);
          expect(res.body.phoneNumber).to.equal(patient.phoneNumber);
          expect(res.body.mobileNumber).to.equal(patient.mobileNumber);
          expect(res.body.referer).to.equal(patient.referer);
          done();
        });
    });
  });

  describe('# GET /api/patients', () => {
    it('should get all patients', (done) => {
      request(app)
        .get('/api/patients')
        .expect(httpStatus.OK)
        .then(res => {
          expect(res.body).to.be.an('array');
          done();
        })
        .catch(() => done());
    });
  });

  describe('# DELETE /api/patients', () => {
    it('should delete an patient', (done) => {
      request(app)
        .delete(`/api/patients/${patient._id}`) // eslint-disable-line
        .expect(httpStatus.OK)
        .then(() => done());
    });
  });
});
