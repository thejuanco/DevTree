//Esta archivo solo sirve para arrancar el servidor
import express from "express";
import router from "./routes/routes";
import "dotenv/config";
import { connectDB } from "./config/db";

const app = express();

//Conectar a la base de datos
connectDB();

//Habilitar la lectura de formularios
app.use(express.json());

app.use("/", router);

export default app