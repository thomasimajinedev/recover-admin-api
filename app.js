import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from './src/routes';
import { errorHandler } from './src/helpers';
import connectDatabase from './src/services/database';

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
