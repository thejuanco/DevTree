import { Router } from "express";
import { body } from "express-validator";
import { createAccount } from "../handlers";

const router = Router();

// Auth and register
router.post("/auth/register",
    body('handle')
        .notEmpty()
        .withMessage("El handle no puede ir vacío"),
    body('name')
        .notEmpty()
        .withMessage("El nombre de usuario no puede ir vacío"),
    body('email')
        .isEmail()
        .withMessage("El correo no es valido"),
    body('password')
        .isLength({min: 8})
        .withMessage("La contraseña debe de tener 8 caracteres"),
    createAccount)

export default router;