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
  jwt_encryption: `hkashd3478asfju4t9349934fnsf98@434543sdfslfK`
}


export const USER_ERROR = {
  EMAIL_HAS_EXISTS: "EMAIL HAS EXISTS",
  EMAIL_NOT_EXISTS: "EMAIL NOT EXISTS",
  USERNAME_HAS_EXISTS: "USERNAME HAS EXISTS",
  PASSWORD_INVALID: "PASSWORD INVALID",
  USER_NOT_FOUND: "USER NOT FOUND",
  USER_HAS_BLOCKED:"USER HAS BLOCKED",
  USER_HAS_REMOVED:"USER HAS REMOVED"
}





/**
 * SendGird Config
 * */
export const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY || `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`;
export const SENDER_EMAIL = process.env.SENDER_EMAIL || 'MangaTea <16520479@gm.uit.edu.vn';
export const TEMPLATE = {
  REG: process.env.T_REG_MAIL || `d-20a0f633e2d84428bc550e25545c33bb`,
  FORGOT_PASSWORD: process.env.T_FORGOT_PASSWORD || `d-8b122d7297cb4039b9215225c3740bfc`
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
 * 
 * @param {*} Manga
 * @param {*} callback 
 */
export const MANGA = {
  MANGA_SAVED_EXIST: "MANGA SAVED EXIST",
  MANGA_NOT_EXISTS: "MANGA IS NOT EXISTS",
  MANGA_IS_EXISTS: "MANGA IS EXISTS",
  MANGA_NOT_FOUND: "MANGA IS NOT FOUND",
  MANGA_MISSING_ID: "MISSING ID MANGA",
  MANGA_permission_denied: "Permission denied"
}

export const CHAPTER = {
  CHAPTER_IS_NOT_FOUND: "Chapter is not found.",
  CHAPTER_IS_EXIST: "Chapter is exist.",
  CHAPTER_IS_NOT_EXIST: "Chapter is not exist.",
  CHAPTER_permission_denied: "You do not have permission to update.",
}



export const URL_FE = process.env.URL_FE || `https://mangatea.live/`
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

