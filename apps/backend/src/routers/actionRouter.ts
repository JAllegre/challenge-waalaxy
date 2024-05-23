import { SetColorRequestBody, SetSizeRequestBody } from '@shared/types';
import express from 'express';
import actionController from '../controllers/actionController';

const actionRouter = express.Router();

// POST /actions/color
actionRouter.post('/color', (req, res) => {
  const { value } = req.body as SetColorRequestBody;
  actionController.setColor(value);
  res.json({ message: 'ok' });
});

// POST /actions/size
actionRouter.post('/size', (req, res) => {
  const { value } = req.body as SetSizeRequestBody;
  actionController.setSize(parseInt(value, 10));
  res.json({ message: 'ok' });
});

export default actionRouter;
