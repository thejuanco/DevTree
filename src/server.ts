//Esta archivo solo sirve para arrancar el servidor
import express from "express";
import router from "./routes/Router.routes"

const app = express();

//Habilitar la lectura de formularios
app.use(express.json());

app.use("/", router);

export default app