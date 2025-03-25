import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const connection = await mongoose.connect("")
    } catch (error) {
        console.log(error);
        //Terminar la ejecucion de la aplicacion
        process.exit(1);
    }
}