import express, { Application, NextFunction, Request, Response } from 'express';

const app: Application = express();
import cors from 'cors';
import UserRouter from './App/modules/User/userRouter';

app.use(express.json());
app.use(cors());
app.use('/api/users', UserRouter);

app.get('/', (req: Request, res: Response) => {
  res.status(200).send('Heloo Belal');
});

app.all('*', (req: Request, res: Response, next: NextFunction) => {
  res.status(400).json({
    success: false,
    message: 'Router Not Found',
  });
  next();
});

export default app;
