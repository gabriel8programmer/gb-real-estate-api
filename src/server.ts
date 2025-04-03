import "dotenv/config";

import express from "express";
import cors from "cors";

// routes
import UsersRouter from "./routes/users";
import ClientsRouter from "./routes/clients";
import propertiesRouter from "./routes/properties";
import propertyTypesRouter from "./routes/propertyTypes";

import { HandlerErrorsMiddleware } from "./middlewares/HandlerErrorsMiddleware";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// routes
app.use("/api", ClientsRouter);
app.use("/api", propertiesRouter);

// admins only
app.use("/api/admin", UsersRouter);
app.use("/api/admin", propertyTypesRouter);

app.use(HandlerErrorsMiddleware);

app.listen(PORT, () => console.log(`Server running in ${PORT}`));
