import cors from 'cors';
import dotenv from "dotenv";
import express, { Application } from "express";
import { errorHandler } from './middlewares/errorHandler';
import { notFound } from './middlewares/notFound';
import logger from "./misc/logger";
import appRouter from './routes/index';

dotenv.config();

const app: Application = express();

app.use(express.json());

app.use(cors());

app.use(appRouter);


app.use(notFound);
app.use(errorHandler);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => logger.info(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));

