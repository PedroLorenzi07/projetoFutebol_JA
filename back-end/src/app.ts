import express, { Express, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import timesRouter from './Routes/time';
import estadiosRouter from './Routes/estadio';

const app: Express = express();
const port: number = 3000

app.use(cors());
app.use(express.json());
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`[${new Date()}] ${req.ip} ${req.method} ${req.url}`);
  next();
});

app.use(timesRouter);
app.use(estadiosRouter);

app.listen(port, () => {
  console.log(`Servidor iniciado em http://localhost:${port}`);
});
