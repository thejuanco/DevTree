//Esta archivo solo sirve para arrancar el servidor
import express from "express";

const app = express();

app.get('/', (req, res) => {
    res.send("Inicio de la app / Typescript")
})

export default app