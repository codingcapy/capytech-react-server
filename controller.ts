
import { Request, Response } from "express"
import jwt from "jsonwebtoken"

const User = require('./models/User')
const bcrypt = require('bcrypt');

const saltRounds = 6;

export interface IDecodedUser {
    userId: number
};

export async function validateUser(req: Request, res: Response) {
    const users = await User.find({})
    const { username, password } = req.body
    const user = users.find((user: any) => {
        return user.username === username && user.password === password;
    })
    if (!user) return res.json({ result: { user: null, token: null } });;
    const token = jwt.sign({ id: user.userId }, "secret", { expiresIn: "2days" });
    res.json({ result: { user, token } });
}

export async function decryptToken(req: Request, res: Response) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            res.status(403).send("Header does not exist");
            return "";
        }
        const token = authHeader.split(" ")[1];
        const decodedUser = jwt.verify(token, "secret");
        const user = searchUserById((decodedUser as IDecodedUser).userId);
        res.json({ result: { user, token } });
    }
    catch (err) {
        res.status(401).json({ err });
    }
}

export async function searchUserById(userId: number) {
    const users = await User.find({})
    const user = users.find((user: any) => user.userId === userId);
    // if (!user) throw new Error("User not found");
    return user;
}

export async function createUser(req: Request, res: Response) {
    const users = await User.find({})
    const userId = users.length === 0 ? 1 : users[users.length - 1].userId + 1;
    const username = req.body.username;
    const password = req.body.password;
    console.log(username)
    console.log(password)
    console.log(users.find((user: any) => user.username === username.toString()))
    if (users.find((user: any) => user.username === username.toString())) {
        res.json({ success: false, message: "Username already exists" })
    }
    else {
        console.log(users.find((user: any) => user.username === username.toString()))
        const encrypted = await bcrypt.hash(password, saltRounds)
        const user = await User.create({ username: username, password: password, userId: userId })
        res.status(200).json({ success: true, message: "Sign up successful!" })
    }
}