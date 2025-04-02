import "dotenv/config";

import express from "express";
import cors from "cors";

// routes
import UsersRouter from "./routes/users";
import ClientsRouter from "./routes/clients";

import { HandlerErrorsMiddleware } from "./middlewares/HandlerErrorsMiddleware";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => res.send("teste"));

// routes
app.use("/api", ClientsRouter);
app.use("/api/admin", UsersRouter);

app.use(HandlerErrorsMiddleware);

app.listen(PORT, () => console.log(`Server running in ${PORT}`));
