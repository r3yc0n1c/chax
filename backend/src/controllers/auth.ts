import type { Request, Response } from 'express';
import googleOAuth2Client from '../config/google_auth';
import axios from 'axios';
import redisClient from '../config/redis';
import utils from '../utils';

const getGoogleUserData = async (access_token: string | null | undefined) => {
    const userInfo = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: { Authorization: `Bearer ${access_token}` },
    });
    return userInfo;
}

const Login = async (req: Request, res: Response) => {
    // const { access_token } = req.body;
    console.log(req.body)

    res.status(200).json({ user: { _id: "id123" }, accessToken: "1234" })
}

const GoogleLogin = async (req: Request, res: Response) => {
    const { tokens } = await googleOAuth2Client.getToken(req.body.code);
    const { data } = await getGoogleUserData(tokens.access_token);

    const user = {
        _id: "asdbascaskcnjsacajks",
        username: data.name,
        email: data.email,
        avatarURL: data.picture
    };

    console.log('userInfo', data, tokens);
    res.status(200).json({ user, accessToken: tokens.access_token })
}

const Signup = async (req: Request, res: Response) => {
    // save user
    const { email, username, password } = req.body;

    const id = utils.generateUserId();
    const userId = `user:${id}`;
    const avatarURL = utils.avatarGenerator(id);

    const existingUser = await redisClient.hGetAll(userId);
    console.log('eu', existingUser)

    if (Object.keys(existingUser).length === 0) {
        const user = {
            id,
            email,
            username,
            password,
            avatarURL
        };
        await redisClient.hSet(userId, user);

        res.status(200).json({ user, accessToken: "1234" })
    }

    console.log('rb', req.body)
    // console.log(req.get("host"))

    res.status(200).json({ user: { id: "id123" }, accessToken: "1234" })
}

const GoogleSignup = async (req: Request, res: Response) => {
    const { tokens } = await googleOAuth2Client.getToken(req.body.code);
    const { data } = await getGoogleUserData(tokens.access_token);

    const user = {
        _id: "asdbascaskcnjsacajks",
        username: data.name,
        email: data.email,
        avatarURL: data.picture
    };

    // save user

    console.log('userInfo', data, tokens);
    res.status(200).json({ user, accessToken: tokens.access_token })
}

export default {
    Signup,
    GoogleSignup,
    Login,
    GoogleLogin,
};