import bodyParser from 'body-parser';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import { initDB } from './db/connector';
import actionRouter from './routers/actionRouter';
const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();

//const test = process.env.TEST;

initDB().then(
  () => {
    console.log(`[ ready ] Successfully initialized DB`);
  },
  () => {
    console.error('[ failure ] Failed to initialize DB');
    process.exit(1);
  }
);

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

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
