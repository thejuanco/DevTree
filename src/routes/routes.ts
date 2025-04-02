import { Router } from "express";
import { body } from "express-validator";
import { createAccount } from "../handlers";

const router = Router();

// Auth and register
router.post("/auth/register", createAccount)

export default router;