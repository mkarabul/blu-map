const { auth } = require("express-oauth2-jwt-bearer");
const { UserInfoClient } = require("auth0");

const issuerBaseUrl = process.env.AUTH0_ISSUER_BASE_URL;
const audience = process.env.AUTH0_AUDIENCE || "http://localhost:5000/";

const checkJwt = auth({
  audience: audience,
  issuerBaseURL: `${issuerBaseUrl}/`,
});

const userInfoClient = new UserInfoClient({
  domain: process.env.AUTH0_DOMAIN,
});

const getUserInfoMiddleware = async (req, res, next) => {
  const token = req.auth.token;

  const userInfo = await userInfoClient.getUserInfo(token);

  req.user = userInfo.data;
  next();
};

module.exports = { checkJwt, getUserInfoMiddleware };