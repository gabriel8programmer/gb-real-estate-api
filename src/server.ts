import "dotenv/config";

import express from "express";
import cors from "cors";

// routes
import UsersRouter from "./routes/users";

import { HandlerErrorsMiddleware } from "./middlewares/HandlerErrorsMiddleware";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// routes
app.use("/admin/users", UsersRouter);

app.use(HandlerErrorsMiddleware);

app.listen(PORT, () => console.log(`Server runnin in ${PORT}`));
