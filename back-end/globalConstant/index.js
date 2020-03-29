export const MORGAN_FORMAT = ':remote-addr - :remote-user [:date[iso]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" - :response-time ms';
export const LANG_DEFAULT = 'vi';
export const AVATAR_DEFAULT = 'avatar-default.png';
export const VERIFY_ACCOUNT = 60 * 60 * 1000;
export const MIN_TIME_RESEND = 3;
export const MAX_TIME_SESSION = 60 * 60 * 1000 * 5;

export const ROLES = {
  ADMIN: 'ADMIN',
  USER: 'USER',
  ROOT: 'ROOT',
  MANAGER: 'MANAGER'
};

export const USER_STATUS = {
  NOT_ACTIVE: 1, // Registry but waiting for admin-api approval (super user)/super user approve (regular user)
  ACTIVE: 2, // Admin had approved (super user)/Super user had approved (regular user)
  REJECTED: 3, // Admin had rejected (super user)/Super user had rejected (regular user)
  INACTIVE: 4, // Deleted by user have permission: Admin, Super user, Regular user
  UNCOMPLETED: 5, // Just provide some information but not complete all step to registry (only for super user)
  BLOCKED: 6,
  REMOVED: 7,
};

export const PLATFORMS = {
  ANDROID: 'android',
  IOS: 'ios',
  WEB: 'web'
};

export const ROLE_ACCEPT_ADMIN_PAGE = [ROLES.ADMIN, ROLES.ROOT, ROLES.MANAGER];
/**
 * Define error code
 * */
export const CODE_ERROR = {
  INVALID_PARAMS: 'INVALID_PARAMS',
  NOT_PERMISSION: 'NOT_PERMISSION',
  FORBIDDEN: 'FORBIDDEN',
  NOT_MATCH: 'NOT_MATCH'
};

export const CODE_USER_ERROR = {
  EMAIL_USED: 'EMAIL_USED',
  USER_NOT_REGISTRY: 'USER_NOT_REGISTRY',
  ACCOUNT_IS_VERIFIED: 'ACCOUNT_IS_VERIFIED',
  USER_NOT_FOUND: 'USER_NOT_FOUND',
  EXPIRED_VERIFY: 'EXPIRED_VERIFY'
};

export const CODE_ADMIN_ERROR = {
  ADMIN_NOT_FOUND: 'ADMIN_NOT_FOUND'
};


/**
 * RABBIT WORKER
 */

export const JOB_NAME = {
  TEST_RABBIT: 'TEST_RABBIT',
  SEND_EMAIL: 'SEND_EMAIL',
  REGISTER_BONUS: 'REGISTER_BONUS',
  FORGOT_PASSWORD: "FORGOT_PASSWORD",
  RESEND_OTP: "RESEND_OTP"
};


export const CONFIG = {
  jwt_expiration: 60 * 60 * 24 * 7,
  jwt_encryption: `abc`
}


export const USER_ERROR = {
  EMAIL_HAS_EXISTS: "EMAIL_HAS_EXISTS",
  USERNAME_HAS_EXISTS: "USERNAME_HAS_EXISTS"
}