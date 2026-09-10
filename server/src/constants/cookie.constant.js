import { env } from '../config/index.js';

const COOKIE_NAMES = Object.freeze({
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
});

const COOKIE_OPTIONS = Object.freeze({
  httpOnly: true,
  secure: env.NODE_ENV === 'production',
  sameSite: env.NODE_ENV === 'production' ? 'none' : 'lax',
});

const ACCESS_TOKEN_COOKIE_OPTIONS = Object.freeze({
  ...COOKIE_OPTIONS,
  maxAge: 15 * 60 * 1000,
});

const REFRESH_TOKEN_COOKIE_OPTIONS = Object.freeze({
  ...COOKIE_OPTIONS,
  maxAge: 7 * 24 * 60 * 60 * 1000,
});

const cookieFeatures = Object.freeze({
  COOKIE_NAMES,
  COOKIE_OPTIONS,
  ACCESS_TOKEN_COOKIE_OPTIONS,
  REFRESH_TOKEN_COOKIE_OPTIONS,
});

export default cookieFeatures;
