import type { Request, Response } from "express" // Importing Request and Response types from express
import slug from "slug"
import UserModel from "../models/User"
import { hashPassword } from "../untils/auth" 

export const createAccount = async (req : Request , res : Response ): Promise<void> => {
    try {
        // Check if user already exists
        const { email, password } = req.body
        const userExists = await UserModel.findOne({email})

        if(userExists){
            const error = new Error("El usuario ya esta registrado")
            res.status(409).json({error: error.message})
            return
        }

        //Revisar si el handle ya existe
        const handle = (slug(req.body.handle, ''))

        const handleExists = await UserModel.findOne({handle})
        if(handleExists){
            const error = new Error("El nombre de usuario ya esta registrado")
            res.status(409).json({error: error.message})
            return
        }

        const user = new UserModel(req.body)
        //Hashear la contraseña
        user.password = await hashPassword(password)
        //user.handle = handle
        await user.save()

        res.json({message: "User created"})
    } catch (error) {
        console.log(error)
    }
}