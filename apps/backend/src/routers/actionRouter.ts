import express from 'express';
import actionController from '../controllers/actionController';

const actionRouter = express.Router();

// POST /actions/color
actionRouter.post('/color', (req, res) => {
  const { value } = req.body;
  actionController.setColor(value);
  res.json({ message: 'ok' });
});

// POST /actions/size
actionRouter.post('/size', (req, res) => {
  const { value } = req.body;
  actionController.setSize(parseInt(value, 10));
  res.json({ message: 'ok' });
});

export default actionRouter;
