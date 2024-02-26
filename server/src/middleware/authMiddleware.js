const { auth } = require("express-oauth2-jwt-bearer");
const auth0 = require("auth0-js");

const issuerBaseUrl = process.env.AUTH0_ISSUER_BASE_URL;
const audience = process.env.AUTH0_AUDIENCE || "http://localhost:5000/";

const checkJwt = auth({
  audience: audience,
  issuerBaseURL: `${issuerBaseUrl}/`,
});

const auth0Client = new auth0.Authentication({
  domain: process.env.AUTH0_ISSUER_BASE_URL,
  clientID: process.env.AUTH0_CLIENT_ID,
});

const getUserInfoMiddleware = (req, res, next) => {
  const token = req.auth.token;
  console.log(token);
  auth0Client.userInfo(token, (err, userInfo) => {
    if (err) {
      return next(err);
    }
    
    req.user = userInfo;
    next();
  });
};

module.exports = { checkJwt, getUserInfoMiddleware };
