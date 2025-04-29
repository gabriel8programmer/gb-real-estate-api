import "dotenv/config"; // config dotenv

import express from "express";
import cors from "cors";

// routes
import UsersRouter from "./routes/users";
import ClientsRouter from "./routes/clients";
import PropertiesRouter from "./routes/properties";
import PropertyTypesRouter from "./routes/propertyTypes";
import AuthRouter from "./routes/auth";

import { HandlerErrorsMiddleware } from "./middlewares/HandlerErrorsMiddleware";

const app = express();
const PORT = process.env.PORT || 3000;

// config json and cors
app.use(express.json());
app.use(cors());

// routes
app.use("/api/auth", AuthRouter);
app.use("/api/users", UsersRouter);
app.use("/api/clients", ClientsRouter);
app.use("/api/properties", PropertiesRouter);
app.use("/api/properties-types", PropertyTypesRouter);

// global errors handler middleware
app.use(HandlerErrorsMiddleware);

app.listen(PORT, () => console.log(`Server running in ${PORT}`));
