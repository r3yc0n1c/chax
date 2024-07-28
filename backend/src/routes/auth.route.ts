import { Router } from "express";

const router = Router();

router.post("/login", async (req, res) => {
    // const { access_token } = req.body;
    console.log(req.body)

    res.status(200).json({user: { username: req.body.data}, accessToken: "1234"})
});

router.post("/google", async (req, res) => {
    // const { access_token } = req.body;
    console.log(req.body)
    const userInfo = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        // headers: { Authorization: `Bearer ${access_token}` },
    })

    console.log(userInfo);
    res.status(200).json(userInfo)
});

export default router;