import { SetColorRequestBody, SetSizeRequestBody } from '@shared/types';
import express from 'express';
import {
  addSetColorAction,
  addSetSizeAction,
} from '../controllers/actionController';

const actionRouter = express.Router();

// POST /actions/color
actionRouter.post('/color', (req, res) => {
  const { value } = req.body as SetColorRequestBody;
  addSetColorAction(value);
  res.json({ message: 'ok' });
});

// POST /actions/size
actionRouter.post('/size', (req, res) => {
  const { value } = req.body as SetSizeRequestBody;
  addSetSizeAction(parseInt(value, 10));
  res.json({ message: 'ok' });
});

export default actionRouter;
