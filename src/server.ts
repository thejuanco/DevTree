//Esta archivo solo sirve para arrancar el servidor
import express from "express";
import router from "./routes/Router.routes"

const app = express();

app.use("/", router);

export default app