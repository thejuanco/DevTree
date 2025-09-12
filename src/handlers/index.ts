import type { Request, RequestHandler, Response } from "express" // Importing Request and Response types from express
import { validationResult } from "express-validator"
import slug from "slug"
import formidable from "formidable"
import { v4 as uuid } from "uuid"
import UserModel from "../models/User"
import { hashPassword, checkPassword } from "../untils/auth" 
import { generateJWT } from "../untils/jwt"
import cloudinary from "../config/cloudinary"

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

export const updateProfile = async (req: Request, res: Response ) => {
    try {
        const { description, links } = req.body
        //Revisar si el handle ya existe
        const handle = (slug(req.body.handle, ''))

        const handleExists = await UserModel.findOne({handle})

        if(handleExists && handleExists.email !== req.user.email){
            const error = new Error("El nombre de usuario ya esta registrado")
            res.status(409).json({error: error.message})
            return
        }

        //Actualizar el usuario
        req.user.description = description
        req.user.handle = handle
        req.user.links = links
        await req.user.save()
        res.send('Perfil actualizado correctamente')
    } catch (e) {
        const error = new Error('Ocurrio un error')
        return res.status(500).json({message: error.message})
    }
}

export const uploadImage = async (req: Request, res: Response ) => {
    try {
        const form = formidable({multiples: false})
        form.parse(req, (error, fields, files) => {
            //metodo para subir imagenes
            cloudinary.uploader.upload(files.file[0].filepath, {public_id: uuid()}, async function(error, result){
                if(error){
                    const error = new Error('Ocurrio un error al subir la imagen')
                    return res.status(500).json({error: error.message})
                }
                
                if(result){
                    req.user.image = result.secure_url
                    await req.user.save()
                    res.json({image: result.secure_url})
                }
            })
        }) 
    } catch (e) {
        const error = new Error('Ocurrio un error')
        return res.status(500).json({error: error.message})
    }
}

export const getUserByHandle = async (req: Request, res: Response ) => {
    try {
        //Recuperar el parametro
        const { handle } = req.params
        const user = await UserModel.findOne({handle}).select('-_id -__v -email -password')
        //Validacion
        if(!user){
            const error = new Error('El usuario no existe')
            return res.status(404).json({error: error.message})
        }

        res.json(user)
    } catch (e) {
        const error = new Error('Ocurrio un error')
        return res.status(500).json({message: error.message})
    }
}