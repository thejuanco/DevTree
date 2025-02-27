import express from "express";

const app = express();

app.get('/', (req, res) => {
    res.send("Inicio de la app")
})

const port = process.env.PORT || 4000

app.listen(port, () => {
    console.log(`El servidor esta en el puerto ${port}`)
})