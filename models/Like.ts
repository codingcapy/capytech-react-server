
/*
author: Paul Kim
date: November 22, 2023
version: 1.0
description: like schema for CapyTV
 */

import mongoose from "mongoose";

const LikeSchema = new mongoose.Schema({
    value: { type: Number, required: [true, 'value is required'] },
    videoId: { type: Number, required: [true, 'videoId is required'] },
    voterId: { type: Number, required: [true, 'voterId is required'] },
    likeId: { type: Number, required: [true, 'likeId is required'] },
})

module.exports = mongoose.model('Like', LikeSchema)