import { Router } from "express";

const router = Router();

// Auth and register
router.post("/auth/register", () => {
    console.log("Register");
})

export default router;