import bodyParser from 'body-parser';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import { createServer } from 'node:http';

import { initDB } from './db/connector';
import { startExecutionPolling } from './executionManager';
import actionRouter from './routers/actionRouter';
import { initSocketServer } from './socketServer';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();
const server = createServer(app);
initSocketServer(server);
//const test = process.env.TEST;

initDB().then(
  () => {
    console.log(`[ ready ] Successfully initialized DB`);
  },
  (err) => {
    console.error('[ failure ] Failed to initialize DB', err);
    process.exit(1);
  }
);
startExecutionPolling();

// A basic http logger, could be replaced bt Morgan or similar
app.use(function (req: Request, res: Response, next: NextFunction) {
  console.log('[ request ]', req.method, req.url);
  next();
});

app.use(cors());

app.use(bodyParser.json()); // to support JSON-encoded bodies

app.use('/api/actions', actionRouter);

app.get('/', (req, res) => {
  res.send({ message: 'Health check OK' });
});

server.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
