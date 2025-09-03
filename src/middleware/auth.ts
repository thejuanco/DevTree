import type { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import UserModel, { IUser } from "../models/User"

//Escribiendo sobre la propiedad Request de express
declare global {
    namespace Express {
        interface Request {
            user?: IUser
        }
    }
}

export const authenticate = async (req : Request, res : Response, next: NextFunction) => {
    const bearer = req.headers.authorization

    //Validacion
    if(!bearer){
        const error = new Error('No autorizado')
        res.status(401).json({error: error.message})
        return
    }

    //toma la parte de la derecha y la asigna a token
    const [, token] = bearer.split(' ')

    if(!token){
        const error = new Error('No autorizado')
        res.status(401).json({error: error.message})
        return
    }

    try {
        const result = jwt.verify(token, process.env.JWT_SECRET)
        if(typeof result === "object" && result.id){
            const user = await UserModel.findById(result.id).select('name handle email description image')
            if(!token){
                const error = new Error('El usuario no existe')
                res.status(404).json({error: error.message})
                return
            }
            //Pasando el usuario por medio del request
            req.user = user
            next()
        }
    } catch (error) {
        res.status(500).json({error: "Token no válido"})
    }
}