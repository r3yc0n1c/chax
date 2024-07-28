import { Router } from "express";
import auth from "./auth.route";

const router = Router();

router.get("/", (req, res) => res.json({ test: "server is serving..." }));
router.use("/auth", auth);

export default router;