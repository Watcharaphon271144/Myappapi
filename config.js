require('dotenv').config();

module.exports = {
  jwtSecret: process.env.JWT_SECRET || 'secretkey',
  port: process.env.PORT || 3000,
};
