import express from 'express';
import { initDB } from './db/queue';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();

initDB().then(
  () => {
    console.log(`[ ready ] Successfully initialized DB`);
  },
  () => {
    console.error('[ failure ] Failed to initialize DB');
    process.exit(1);
  }
);

app.get('/', (req, res) => {
  const test = process.env.TEST;

  res.send({ message: 'Hello API' });
});

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
