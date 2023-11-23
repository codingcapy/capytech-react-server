
import { Request, Response } from "express"
import jwt from "jsonwebtoken"

const User = require('./models/User')
const Video = require('./models/Video')
const Comment = require('./models/Comment')
const Reply = require('./models/Reply')
const Like = require('./models/Like')
const CommentLike = require('./models/CommentLike')
const ReplyLike = require('./models/ReplyLike')
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

export async function getVideos(req: Request, res: Response) {
    try {
        const videos = await Video.find({})
        res.json(videos)
    }
    catch (err) {
        res.status(500).json({ msg: err })
    }
}

export async function getVideo(req: Request, res: Response) {
    const videoId = req.params.videoId;
    const video = await Video.findOne({ videoId: parseInt(videoId) })
    const videos = await Video.find({})
    const comments = await Comment.find({ videoId: parseInt(videoId) })
    const replies = await Reply.find({ videoId: parseInt(videoId) })
    const likes = await Like.find({ videoId: parseInt(videoId) })
    const commentLikes = await CommentLike.find({ videoId: parseInt(videoId) })
    const replyLikes = await ReplyLike.find({ videoId: parseInt(videoId) })
    const users = await User.find({})
    const commentsDisplay = comments.map((comment: any) => ({ ...comment, userName: users.find((user: any) => user.userId === comment.userId).username }));
    const repliesDisplay = replies.map((reply: any) => ({ ...reply, userName: users.find((user: any) => user.userId === reply.userId).username }));
    if (!video) {
        res.status(404).json({ error: "Video not found" })
    }
    else {
        res.json({ video: video, comments: commentsDisplay, replies: repliesDisplay, likes: likes, commentLikes: commentLikes, replyLikes: replyLikes, videos:videos })
    }
}