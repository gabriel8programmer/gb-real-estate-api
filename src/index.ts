import express, { Request, Response } from "express"
import cors from "cors"
import authRouter from "./routes/auth"
//config dotenv
import dotenv from 'dotenv';
dotenv.config();

const app = express()
const port = process.env.PORT || 3000

//config json and cors
app.use(express.json())
app.use(cors())

//add routes
app.use("/auth", authRouter)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
