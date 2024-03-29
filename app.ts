
/*
author: Paul Kim
date: November 23, 2023
version: 1.0
description: web server script for CapyTV
 */

import express from "express"
import cors from "cors"
import connectDB from "./connect"
require('dotenv').config()
const users = require('./routes/users')
const user = require('./routes/user')
const videos = require('./routes/videos')
const comments = require('./routes/comments')
const replies = require('./routes/replies')
const likes = require('./routes/likes')
const commentLikes = require('./routes/commentlikes')
const replyLikes = require('./routes/replylikes')
const cron = require('cron')
const https = require('https')

const backendUrl = "https://capytvserver.onrender.com/"
const job = new cron.CronJob("*/14 * * * *", () => {
    console.log("restarting server")
    https.get(backendUrl, (res: any) => {
        if (res.statusCode === 200) {
            console.log('Server restarted')
        }
        else {
            console.log('failed to restart')
        }
    })
})

job.start()

const app = express()
const port = process.env.PORT || 7000

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
    res.send("welcome")
})

app.use('/api/user', user)
app.use('/api/users', users)
app.use("/api/videos", videos)
app.use('/api/comments', comments)
app.use('/api/replies', replies)
app.use('/api/likes', likes)
app.use('/api/commentlikes', commentLikes)
app.use('/api/replylikes', replyLikes)

async function start() {
    try {
        await connectDB(process.env.MONGO_URI)
        console.log("Connected to database")
        app.listen(port, () => console.log(`Server listening on port: ${port}`))
    }
    catch (err) {
        console.log(err)
    }
}

start()