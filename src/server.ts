import "dotenv/config"; // config dotenv

import express from "express";
import cors from "cors";

// routes
import AuthRouter from "./routes/auth";
import AdminRouter from "./routes/admin";
import AgentsRouter from "./routes/agents";
import ClientsRouter from "./routes/clients";
import PropertiesRouter from "./routes/properties";
import PropertyTypesRouter from "./routes/propertyTypes";
import RentalRequestsRouter from "./routes/rentalRequests";

import { HandlerErrorsMiddleware } from "./middlewares/HandlerErrorsMiddleware";

const app = express();
const PORT = process.env.PORT || 3000;

// config json and cors
app.use(express.json());
app.use(cors());

// routes
app.use("/api/auth", AuthRouter);
app.use("/api/admin", AdminRouter);
app.use("/api/agents", AgentsRouter);
app.use("/api/clients", ClientsRouter);
app.use("/api/properties", PropertiesRouter);
app.use("/api/property-types", PropertyTypesRouter);
app.use("/api/rental-requests", RentalRequestsRouter);

// global errors handler middleware
app.use(HandlerErrorsMiddleware);

app.listen(PORT, () => console.log(`Server running in ${PORT}`));
