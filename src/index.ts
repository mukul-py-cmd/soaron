import 'reflect-metadata';
import { createConnection } from 'typeorm';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import routes from './routes';

createConnection()
  .then(async (connection) => {
    // create express app
    const app = express();
    app.use(bodyParser.json());
    app.use('/api/', routes);
    app.listen(4000);
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
