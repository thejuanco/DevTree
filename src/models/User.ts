//Here is the User model that will be used to store the user data in the database.
import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
    handle: string
    name: string
    email: string
    password: string
    description: string
    image: string
    links: string
}

const userSchema = new Schema({
    handle: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
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
    },
    description: {
        type: String,
        default: ""
    },
    image: {
        type: String,
        default: ""
    },
    links: {
        type: String,
        default: "[]"
    }
})

//Implemtenta la interfaz de usuario en el esquema de mongoose, con un generic
const UserModel = mongoose.model<IUser>('User', userSchema);
export default UserModel;