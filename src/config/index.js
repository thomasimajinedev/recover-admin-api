import 'dotenv/config';

const config = {
  // Generals
  env: process.env.NODE_ENV || 'test',
  client: process.env.URL_CLIENT,
  appPort: process.env.APP_PORT || 8080,
  logging: false,
  secretKey: process.env.SECRET_KEY || 'secret',
  // Database
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
};

module.exports = config;
