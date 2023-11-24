
/*
author: Paul Kim
date: November 23, 2023
version: 1.0
description: video model schema for CapyTV
 */

import mongoose from "mongoose"

const VideoSchema = new mongoose.Schema({
    title: { type: String, required: [true, 'title is required'], trim: true, maxlength: [300, 'title char limit is 300'] },
    creator: { type: String, required: [true, 'creator is required'], maxlength: [80, 'creator char limit is 80'] },
    uploadDate: { type: String, required: [true, 'date is required'] },
    videoId: { type: Number, required: [true, 'videoId is required'] },
})

module.exports = mongoose.model('Video', VideoSchema)