import type { Request, Response } from "express" // Importing Request and Response types from express
import { validationResult } from "express-validator"
import slug from "slug"
import jwt from "jsonwebtoken"
import UserModel from "../models/User"
import { hashPassword, checkPassword } from "../untils/auth" 
import { generateJWT } from "../untils/jwt"

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

export const login = async (req : Request, res: Response ) : Promise<void> => {
    try {
        // Revisar si el usuario existe
        const { email, password } = req.body
        const userExists = await UserModel.findOne({email})

        if(!userExists){
            const error = new Error("El usuario no existe")
            res.status(409).json({error: error.message})
            return
        }

        //Comparar la contraseña
        const isPasswordCorrect = await checkPassword(password, userExists.password)
        if(!isPasswordCorrect){
            const error = new Error("La contraseña es incorrecta")
            res.status(401).json({error: error.message})
            return
        }

        const token = generateJWT({id: userExists._id})
        res.send(token)
    } catch (error) {
        console.log(error)
    }
}

export const getUser = async (req: Request, res: Response ) => {
    res.json(req.user)
}