import { Router } from "express";

const router = Router();

// Auth and register
router.get("/auth/register", () => {
    console.log("Register");
})

export default router;