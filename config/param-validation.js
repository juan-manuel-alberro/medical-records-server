import Joi from 'joi';

export default {
  Users: {
    create: {
      body: {
        username: Joi.string().required(),
        mobileNumber: Joi.string().regex(/^[1-9][0-9]{9}$/).required()
      }
    },
    update: {
      body: {
        username: Joi.string().required(),
        mobileNumber: Joi.string().regex(/^[1-9][0-9]{9}$/).required()
      },
      params: {
        userId: Joi.string().hex().required()
      }
    }
  },
  Interviews: {
    create: {
      body: {
        date: Joi.date().min('now').required(),
        test: Joi.string().required(),
        befall: Joi.string().required(),
        hypothesis: Joi.string().required()
      }
    },
    update: {
      body: {
        date: Joi.date().min('now').required(),
        test: Joi.string().required(),
        befall: Joi.string().required(),
        hypothesis: Joi.string().required(),
        visit: Joi.string().required()
      },
      params: {
        interviewId: Joi.string().hex().required()
      }
    }
  },
  Patients: {
    create: {
      body: {
        name: Joi.string().required(),
        lastname: Joi.string().required(),
        dob: Joi.date().required(),
        education: Joi.string(),
        phoneNumber: Joi.string().required(),
        mobileNumber: Joi.string().required(),
        referer: Joi.string(),
        familyTree: Joi.string()
      }
    },
    update: {
      body: {
        name: Joi.string().required(),
        lastname: Joi.string().required(),
        dob: Joi.date().required(),
        education: Joi.string(),
        phoneNumber: Joi.string().required(),
        mobileNumber: Joi.string().required(),
        referer: Joi.string(),
        familyTree: Joi.string()
      },
      params: {
        patientId: Joi.string().hex().required()
      }
    }
  },
  Visits: {
    create: {
      body: {
        date: Joi.date().min('now').required(),
        visitReason: Joi.string().required(),
        diagnosisPlan: Joi.string(),
        firstSetOfHypothesis: Joi.string(),
        referralOrInterclinical: Joi.string(),
        patient: Joi.string().required()
      }
    },
    update: {
      body: {
        date: Joi.date().min('now').required(),
        visitReason: Joi.string().required(),
        diagnosisPlan: Joi.string(),
        firstSetOfHypothesis: Joi.string(),
        referralOrInterclinical: Joi.string(),
        patient: Joi.string().required()
      },
      params: {
        visitId: Joi.string().hex().required()
      }
    }
  }
};
