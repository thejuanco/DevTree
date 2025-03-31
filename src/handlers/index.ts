import UserModel from "../models/User"

export const createAccount = async (req, res) => {
    await UserModel.create(req.body)

    res.json({message: "User created"})
}