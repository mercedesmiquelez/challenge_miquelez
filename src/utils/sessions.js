const session = require('cookie-session');
require('dotenv').config();

function initSession() {

  return session({
    secret: process.env.SESSION_NAME,
  });
};


module.exports = {
  initSession
};