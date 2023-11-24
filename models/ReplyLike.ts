
/*
author: Paul Kim
date: November 23, 2023
version: 1.0
description: reply like model schema for CapyTV
 */

import mongoose from "mongoose";

const ReplyLikeSchema = new mongoose.Schema({
    value: { type: Number, required: [true, 'value is required'] },
    videoId: { type: Number, required: [true, 'videoId is required'] },
    commentId: { type: Number, required: [true, 'commentId is required'] },
    replyId: { type: Number, required: [true, 'replyId is required'] },
    voterId: { type: Number, required: [true, 'voterId is required'] },
    replyLikeId: { type: Number, required: [true, 'replyLikeId is required'] },
})

module.exports = mongoose.model('ReplyLike', ReplyLikeSchema)