
/*
author: Paul Kim
date: November 23, 2023
version: 1.0
description: controller for CapyTV
 */

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
        return user.username === username;
    })
    if (!user) return res.json({ result: { user: null, token: null } });;
    bcrypt.compare(password, user.password, function (err: any, result: boolean) {
        if (result === true) {
            const token = jwt.sign({ id: user.userId }, "secret", { expiresIn: "2days" });
            res.json({ result: { user, token } });
        }
        else {
            return res.json({ result: { user: null, token: null } });
        }
    })
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

export async function getUser(req: Request, res: Response) {
    const userId = req.params.userId;
    const userComments = await Comment.find({ userId: parseInt(userId) })
    const userReplies = await Reply.find({ userId: parseInt(userId) })
    res.json({ comments: userComments, replies: userReplies })
}

export async function createUser(req: Request, res: Response) {
    const users = await User.find({})
    const userId = users.length === 0 ? 1 : users[users.length - 1].userId + 1;
    const username = req.body.username;
    const password = req.body.password;
    if (users.find((user: any) => user.username === username.toString())) {
        res.json({ success: false, message: "Username already exists" })
    }
    else {
        const encrypted = await bcrypt.hash(password, saltRounds)
        const user = await User.create({ username: username, password: encrypted, userId: userId })
        res.status(200).json({ success: true, message: "Sign up successful!" })
    }
}

export async function updateUser(req: Request, res: Response) {
    const userId = parseInt(req.params.userId)
    const incomingUser = await req.body;
    const incomingPassword = incomingUser.password
    const encrypted = await bcrypt.hash(incomingPassword, saltRounds)
    const updatedUser = await User.findOneAndUpdate(
        { userId: userId },
        { username: incomingUser.username, password: encrypted, userId: incomingUser.userId },
        { new: true }
    );
    res.status(200).json({ success: true });

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
        res.json({ video: video, comments: commentsDisplay, replies: repliesDisplay, likes: likes, commentLikes: commentLikes, replyLikes: replyLikes, videos: videos })
    }
}

export async function createComment(req: Request, res: Response) {
    const comments = await Comment.find({})
    const commentId = comments.length === 0 ? 1 : comments[comments.length - 1].commentId + 1;
    const incomingComment = req.body
    const comment = await Comment.create({ ...incomingComment, commentId: commentId })
    res.status(200).json({ success: true })
}

export async function updateComment(req: Request, res: Response) {
    const commentId = parseInt(req.params.commentId)
    const incomingComment = req.body;
    const updatedComment = await Comment.findOneAndUpdate(
        { commentId: commentId },
        incomingComment,
        { new: true }
    );
    res.status(200).json({ success: true });
}

export async function createLike(req: Request, res: Response) {
    const likes = await Like.find({})
    const likeId = likes.length === 0 ? 1 : likes[likes.length - 1].likeId + 1
    const incomingLike = req.body
    const like = await Like.create({ ...incomingLike, likeId: likeId })
    res.status(200).json({ success: true })
}

export async function updateLike(req: Request, res: Response) {
    const likeId = parseInt(req.params.likeId)
    const incomingLike = req.body;
    const updatedLike = await Like.findOneAndUpdate(
        { likeId: likeId },
        incomingLike,
        { new: true }
    );
    res.status(200).json({ success: true });
}

export async function createCommentLike(req: Request, res: Response) {
    const commentLikes = await CommentLike.find({})
    const commentLikeId = commentLikes.length === 0 ? 1 : commentLikes[commentLikes.length - 1].commentLikeId + 1
    const incomingLike = req.body
    const commentLike = await CommentLike.create({ ...incomingLike, commentLikeId: commentLikeId })
    res.status(200).json({ success: true })
}

export async function updateCommentLike(req: Request, res: Response) {
    const commentLikeId = parseInt(req.params.commentLikeId)
    const incomingCommentLike = req.body;
    const updatedCommentLike = await CommentLike.findOneAndUpdate(
        { commentLikeId: commentLikeId },
        incomingCommentLike,
        { new: true }
    );
    res.status(200).json({ success: true });
}

export async function createReply(req: Request, res: Response) {
    const replies = await Reply.find({})
    const replyId = replies.length === 0 ? 1 : replies[replies.length - 1].replyId + 1;
    const incomingReply = req.body
    const reply = await Reply.create({ ...incomingReply, replyId: replyId })
    res.status(200).json({ success: true })
}

export async function updateReply(req: Request, res: Response) {
    const replyId = parseInt(req.params.replyId)
    const incomingReply = req.body;
    const updatedReply = await Reply.findOneAndUpdate(
        { replyId: replyId },
        incomingReply,
        { new: true }
    );
    res.status(200).json({ success: true });
}

export async function createReplyLike(req: Request, res: Response) {
    const replyLikes = await ReplyLike.find({})
    const replyLikeId = replyLikes.length === 0 ? 1 : replyLikes[replyLikes.length - 1].replyLikeId + 1
    const incomingLike = req.body
    const replyLike = await ReplyLike.create({ ...incomingLike, replyLikeId: replyLikeId })
    res.status(200).json({ success: true })
}

export async function updateReplyLike(req: Request, res: Response) {
    const replyLikeId = parseInt(req.params.replyLikeId)
    const incomingReplyLike = req.body;
    const updatedReplyLike = await ReplyLike.findOneAndUpdate(
        { replyLikeId: replyLikeId },
        incomingReplyLike,
        { new: true }
    );
    res.status(200).json({ success: true });
}