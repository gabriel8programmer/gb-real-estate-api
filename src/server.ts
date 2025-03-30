import "dotenv/config";

import express from "express";
import cors from "cors";
import AuthRouter from "./routes/auth";
import { HandlerErrorsMiddleware } from "./middlewares/HandlerErrorsMiddleware";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// routes
app.use("/api/auth", AuthRouter);

app.use(HandlerErrorsMiddleware);

app.listen(port);
