import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app: express.Application = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// import routes
import schoolRouter from "@/routers/school.route";
import { errorHandler } from "./middlewares/errorHandler.middleware";
app.use("/api/", schoolRouter);

// error handler
app.use(errorHandler);
export default app;
