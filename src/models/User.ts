//Here is the User model that will be used to store the user data in the database.
import mongoose, { Schema } from "mongoose";

interface IUser {
    name: string
    email: string
    password: string
}

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    }
})

//Implemtenta la interfaz de usuario en el esquema de mongoose, con un generic
const UserModel = mongoose.model<IUser>('User', userSchema);
export default UserModel;