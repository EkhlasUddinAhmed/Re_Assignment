/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { Application, NextFunction, Request, Response } from 'express';

const app: Application = express();
import cors from 'cors';
import UserRouter from './App/modules/User/userRouter';

app.use(express.json());
app.use(cors());
app.use('/api/users', UserRouter);

app.get('/', (req: Request, res: Response) => {
  res.status(200).send('WELCOME ASSIGNMENT 2');
});

app.all('*', (req: Request, res: Response, next: NextFunction) => {
  res.status(400).json({
    success: false,
    message: 'Router Not Found',
    error:{
      code:400,
      description:'Router Not Found',
    }
  });
  next();
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {

  console.log("From GlobalError is:",err)
  res.status(404).json({
    success: false,
    message:err.message||  "Something Wrong",
    error:{
      code:404,
      error:err
    }
  });
});

export default app;
