const REGEX = Object.freeze({
  SLUG: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
  SKU: /^[A-Za-z0-9-]+$/,
  PASSWORD_REGEX: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/,
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_REGEX: /^[6-9]\d{9}$/,
});

export default REGEX;
