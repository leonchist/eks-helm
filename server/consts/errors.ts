const ERRORS = {
  UNKNOWN_ERROR: {
    code: 1,
    status: 400,
  },
  USER_NOT_EXIST: {
    code: 2,
    status: 400,
  },
  INPUT_DATA_MISSING: {
    code: 3,
    status: 400,
  },
  DUPLICATED_USER: {
    code: 4,
    status: 400,
  },
  PASSWORD_NOT_CORRECT: {
    code: 5,
    status: 400,
  },
  UNAUTHORIZED: {
    code: 6,
    status: 401,
  },
  KYC_STATUS_NOT_CORRECT: {
    code: 7,
    status: 400,
  },
  KYC_STATUS_REQUIRED: {
    code: 8,
    status: 400,
  },
  MFA_VERIFICATION_REQUIRED: {
    code: 9,
    status: 400,
  },
};

export default ERRORS;
