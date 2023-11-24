/*
author: Paul Kim
date: November 23, 2023
version: 1.0
description: comment model schema for CapyTV
 */

import mongoose from "mongoose"

const CommentSchema = new mongoose.Schema({
    content: { type: String, required: [true, 'content is required'], maxlength: [10000, 'content char limit is 10000'] },
    videoId: { type: Number, required: [true, 'videoId is required'] },
    userId: { type: Number, required: [true, 'userId is required'] },
    date: { type: String, required: [true, 'date is required'] },
    edited: { type: Boolean, default: false },
    deleted: { type: Boolean, default: false },
    commentId: { type: Number, required: [true, 'commentId is required'] },
})

module.exports = mongoose.model('Comment', CommentSchema)