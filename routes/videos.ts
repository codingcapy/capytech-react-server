
/*
author: Paul Kim
date: November 13, 2023
version: 1.0
description: videos router for CapyTV
 */

import express from "express"
const router = express.Router()

import { getVideos, getVideo } from "../controller"

router.route('/').get(getVideos)
router.route('/:videoId').get(getVideo)

module.exports = router 