require('dotenv').config();
const crypto = require('crypto');
const generateSessionSecret = () => {
  const randomBytes = crypto.randomBytes(32).toString('hex');
  return randomBytes;
};
const sessionSecret = generateSessionSecret();

const { 
    MONGO_URI, 
    NODE_ENV,
} = process.env;

const isProduction = NODE_ENV === 'production';

module.exports = {
    mongoURI: isProduction ? MONGO_URI : 'mongodb://localhost:27017/db_app_fhsp',
    // mongoURI: `${MONGO_URI}`,
    sessionSecret: sessionSecret||"supersecretsessionsecret",

}
