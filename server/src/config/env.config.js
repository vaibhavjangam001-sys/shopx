import dotenv from 'dotenv';

const result = dotenv.config();

if (result.error) {
  throw new Error('Failed to load environment variables');
}

const requiredEnv = [
  'PORT',
  'MONGO_URI',
  'CLOUDINARY_CLOUD_NAME',
  'CLOUDINARY_API_KEY',
  'CLOUDINARY_API_SECRET',
  'BCRYPT_SALT_ROUNDS',
  'JWT_ACCESS_SECRET',
];

for (const key of requiredEnv) {
  if (!process.env[key]?.trim()) {
    throw new Error(`${key} environment variable is required`);
  }
}

const PORT = Number(process.env.PORT);

if (!Number.isInteger(PORT) || PORT < 1 || PORT > 65535) {
  throw new Error('PORT must be a valid number between 1 and 65535');
}

const NODE_ENV = process.env.NODE_ENV || 'development';

const allowedEnvironments = ['development', 'production', 'test'];

if (!allowedEnvironments.includes(NODE_ENV)) {
  throw new Error(
    `Invalid NODE_ENV: ${NODE_ENV}. Allowed values: ${allowedEnvironments.join(', ')}`
  );
}

const BCRYPT_SALT_ROUNDS = Number(process.env.BCRYPT_SALT_ROUNDS);

if (!Number.isInteger(BCRYPT_SALT_ROUNDS)) {
  throw new Error('BCRYPT_SALT_ROUNDS must be a valid number.');
}

const env = Object.freeze({
  NODE_ENV: NODE_ENV,
  PORT: PORT,
  MONGO_URI: process.env.MONGO_URI,
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
  BCRYPT_SALT_ROUNDS: BCRYPT_SALT_ROUNDS,
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
});

export default env;
