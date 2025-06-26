import jwt, { JwtPayload } from 'jsonwebtoken'

export const generateJWT = (payload : JwtPayload) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        //Duracion del jwt
        expiresIn: '180d'
    })
    return token
}