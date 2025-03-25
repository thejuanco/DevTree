import mongoose from "mongoose";
import colors from 'colors';    

export const connectDB = async () => {
    try {
        const {connection} = await mongoose.connect(process.env.DATABASE_MONGO)
        const url = `${connection.host}:${connection.port}/${connection.name}`
        console.log(`Conectado a la base de datos: ${url}`);
    } catch (error) {
        console.log(colors.bgRed.white.bold(error));
        //Terminar la ejecucion de la aplicacion
        process.exit(1);
    }
}