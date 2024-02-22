const { auth } = require("express-oauth2-jwt-bearer");

const issuerBaseUrl = process.env.AUTH0_ISSUER_BASE_URL;
const audience = process.env.AUTH0_AUDIENCE || "http://localhost:5000/";

const checkJwt = auth({
  audience: audience,
  issuerBaseURL: `${issuerBaseUrl}/`,
});

module.exports = { checkJwt };
