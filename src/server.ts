//Esta archivo solo sirve para arrancar el servidor
import express from "express";
import cors from "cors"
import router from "./routes/routes";
import "dotenv/config";
import { connectDB } from "./config/db";
import { corsConfig } from "./config/cors";

const app = express();

//Conectar a la base de datos
connectDB();

//cors
app.use(cors())

//Habilitar la lectura de formularios
app.use(express.json());

app.use("/", router);

export default app