import cors from "cors";
import dotenv from "dotenv";
import express, { Application } from "express";
import { errorHandler } from "./middlewares/errorHandler";
import { v2 as cloudinary } from "cloudinary";
import { notFound } from "./middlewares/notFound";
import logger from "./misc/logger";
import appRouter from "./routes/index";

dotenv.config({
  path: __dirname + "/../.env",
});

// logger.info(cloudinary.config().cloud_name);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const app: Application = express();

app.use(express.json({ limit: "50mb" }));

app.use(cors());

app.use(appRouter);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>
  logger.info(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
