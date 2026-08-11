import dotenv from 'dotenv';
dotenv.config();

if (!process.env.PORT) {
  throw new Error('PORT environment variable is required');
}

if (!process.env.MONGO_URI) {
  throw new Error('MONGO_URI environment variable is required');
}

const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: Number(process.env.PORT),
  MONGO_URI: process.env.MONGO_URI,
};

export default env;
