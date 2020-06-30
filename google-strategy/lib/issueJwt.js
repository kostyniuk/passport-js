const jsonwebtoken = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const pathToKey = path.join(__dirname, '..', 'id_rsa_priv.pem');
const PRIV_KEY = fs.readFileSync(pathToKey, 'utf8');

module.exports = (user) => {
  const { _id, username } = user;

  const expiresIn = '1d';

  const payload = {
    sub: _id,
    username,
    iat: Date.now(),
  };

  const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, {
    expiresIn: expiresIn,
    algorithm: 'RS256',
  });

  return {
    token: signedToken,
    expires: expiresIn,
  };
};
