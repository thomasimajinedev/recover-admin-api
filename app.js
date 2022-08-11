import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from './src/routes';
import { errorHandler } from './src/helpers';
import connectDatabase from './src/services/database';

var jwt = require('express-jwt');
var jwks = require('jwks-rsa');

const app = express();

connectDatabase();

app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.use(
  cors({
    origin: '*',
    credentials: true,
  }),
);

app.use(bodyParser.json());

// var jwtCheck = jwt({
//   secret: jwks.expressJwtSecret({
//     cache: true,
//     rateLimit: true,
//     jwksRequestsPerMinute: 5,
//     jwksUri: 'https://thomasimajine.us.auth0.com/.well-known/jwks.json',
//   }),
//   audience: 'https://localhost:8080/api/v1/',
//   issuer: 'https://thomasimajine.us.auth0.com/',
//   algorithms: ['RS256'],
// });

// app.use(jwtCheck);

app.use('/api/v1', routes);

app.get('/', (req, res) => {
  res.send({
    code: 200,
    data: 'RD ADMIN REST API - OK',
    success: true,
  });
});

app.use(errorHandler);

module.exports = app;
