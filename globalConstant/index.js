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
  NOT_MATCH: 'NOT_MATCH',
  NAME_STATUS_IS_ALREADY: "NAME_STATUS_IS_ALREADY",
  CODE_STATUS_IS_ALREADY: "CODE_STATUS_IS_ALREADY"
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
  SEND_EMAIL_REG: "SEND_EMAIL_REG",
  REGISTER_BONUS: 'REGISTER_BONUS',
  FORGOT_PASSWORD: "FORGOT_PASSWORD",
  RESEND_OTP: "RESEND_OTP"
};

/**
 * JWT
 */
export const CONFIG = {
  jwt_expiration: 60 * 60 * 24 * 7,
  jwt_encryption: `hkashd3478asfju4t9349934fnsf98@434543sdfslf`
}


export const USER_ERROR = {
  EMAIL_HAS_EXISTS: "EMAIL HAS EXISTS",
  EMAIL_NOT_EXISTS: "EMAIL NOT EXISTS",
  USERNAME_HAS_EXISTS: "USERNAME HAS EXISTS",
  PASSWORD_INVALID: "PASSWORD INVALID",
  USER_NOT_FOUND: "USER NOT FOUND"
}



/**
 * 
 * @param {*} Manga
 * @param {*} callback 
 */
export const MANGA = {
  MANGA_SAVED_EXIST: "MANGA SAVED EXIST",
  MANGA_NOT_EXISTS: "MANGA NOT EXISTS",
  MANGA_NOT_FOUND: "MANGA NOT FOUND",
  MANGA_MISSING_ID: "MISSING ID MANGA"
}


/**
 * SendGird Config
 * */
export const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY || `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`;
export const SENDER_EMAIL = process.env.SENDER_EMAIL || 'MangaTea <no-reply@mangatea.xyz>';
export const TEMPLATE = {
  REG: process.env.T_REG_MAIL || `d-89c3e2fe02774250b6579037b4c0a7ee`
}
export const FOOTER_EMAIL = {
  nameCompany: process.env.NAME_COMPANY || `MangaTea Inc.`,
  addressCompany: process.env.ADDRESS_COMPANY || `Ho Chi Minh City`,
  phoneCompany: process.env.PHONE_COMPANY || `LOL`,
  websiteCompany: process.env.WEBSITE_COMPANY || `MangaTea.xyz`,
  supportCompany: process.env.SUPPORT_COMPANY || `MangaTea.xyz`
};

/**
 * 
 * @param {*} Rating
 * @param {*} callback 
 */

export const RATING = {
  RATING_ID: "MangaID and GroupTranslationID are not empty or cannot appear at the same time."
}


export const COMMENT = {
  COMMENT_NOT_FOUND: "Comment not found."
}


export const APPELLATION = {
  APPELLATION_ID_NOT_FOUND: "Appellation ID not found.",
  APPELLATION_IS_EXIST: "Appellation is exist."
}

export const AUTHOR = {
  AUTHOR_ID_NOT_FOUND: "Author ID not found.",
  AUTHOR_IS_EXIST: "Author is exist."
}


export const GROUP_TRANSLATION = {
  GROUP_TRANSLATION_IS_NOT_FOUND: "Group translation is not found.",
  GROUP_TRANSLATION_IS_EXIST: "Group translation is exist.",
  GROUP_TRANSLATION_IS_NOT_EXIST: "Group translation is not exist.",
  GROUP_TRANSLATION_permission_denied: "You do not have permission to update.",
}
/**
 * CORS
 */
export function ALLOW_URL(origin, callback) {
  let whitelist = process.env.SERVER_ORIGIN || "*"
  if (whitelist.indexOf(origin) !== -1) {
    callback(null, true)
  } else {
    callback(new Error('Access Denied'))
  }
}



export const CORS = {
  // Find and fill your options here: https://github.com/expressjs/cors#configuration-options
  origin: "*" || ALLOW_URL,
  methods: 'GET,PUT,POST,DELETE'
}

