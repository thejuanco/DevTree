import { Router } from "express";
import { body } from "express-validator";
import { createAccount, getUser, getUserByHandle, login, searchByHandle, updateProfile, uploadImage } from "../handlers";
import { handleInputError } from "../middleware/validation";
import { authenticate } from "../middleware/auth";

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
    handleInputError,
    createAccount)

router.post("/auth/login", 
    body('email')
        .isEmail()
        .withMessage("El correo no es valido"),
    body('password')
        .isLength({min: 8})
        .withMessage("La contraseña debe de tener 8 caracteres"),
    handleInputError,
    login)

router.get('/user', authenticate, getUser)

router.patch('/user', 
    body('handle')
        .notEmpty()
        .withMessage("El handle no puede ir vacío"),
    // body('description')
    //     .notEmpty()
    //     .withMessage("La descripción no puede ir vacía"),
    handleInputError, 
    authenticate, 
    updateProfile
)

router.post('/user/image', authenticate, uploadImage)

//Url dinamica
router.get('/:handle', getUserByHandle)
//Url publicas
router.post("/search", 
    body("handle")
        .notEmpty()
        .withMessage("El handle no puede ir vacío"),
    searchByHandle
)

export default router;