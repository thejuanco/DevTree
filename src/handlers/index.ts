import type { Request, Response } from "express" // Importing Request and Response types from express
import UserModel from "../models/User"

export const createAccount = async (req : Request , res : Response ) => {
    await UserModel.create(req.body)

    res.json({message: "User created"})
}