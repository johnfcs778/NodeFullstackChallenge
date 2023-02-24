/**
 *  This file defines the entry point for the application and starts the server
 *  Author: John Fahnestock
 */

import express from 'express';
import bodyParser from 'body-parser';
import router from './routes/application-routes.js'

const app = express();
const port = 5000;

app.use(bodyParser.json());

app.use('/api/v1', router);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});