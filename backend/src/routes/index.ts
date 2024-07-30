import { Router } from "express";
import AuthController from "../controllers/auth";
import avatarGenerator from "../utils";

const router = Router();

router.get("/", (req, res) => res.json({ test: "server is serving..." }));

router.post("/auth/signup", AuthController.Signup);
router.post("/auth/google/signup", AuthController.GoogleSignup);
router.post("/auth/login", AuthController.Login);
router.post("/auth/google", AuthController.GoogleLogin);


export default router;