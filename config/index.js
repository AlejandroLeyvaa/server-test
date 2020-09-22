require('dotenv').config();

const config = {
  dev: process.env.NODE_ENV !== 'production',
  port: process.env.PORT || 3000,
  cors: process.env.CORS,
  dbuser: process.env.DB_USER,
  dbpassword: process.env.DB_PASSWORD,
  dbhost: process.env.DB_HOST,
  dbname: process.env.DB_NAME,
  apiUrl: process.env.API_URL,
};

module.exports = { config };

