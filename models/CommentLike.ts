/*
author: Paul Kim
date: November 23, 2023
version: 1.0
description: comment like model schema for CapyTV
 */

import mongoose from "mongoose";

const CommentLikeSchema = new mongoose.Schema({
    value: { type: Number, required: [true, 'value is required'] },
    videoId: { type: Number, required: [true, 'videoId is required'] },
    commentId: { type: Number, required: [true, 'commentId is required'] },
    voterId: { type: Number, required: [true, 'voterId is required'] },
    commentLikeId: { type: Number, required: [true, 'commentLikeId is required'] },
})

module.exports = mongoose.model('CommentLike', CommentLikeSchema)