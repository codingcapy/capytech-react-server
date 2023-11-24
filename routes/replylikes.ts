
/*
author: Paul Kim
date: November 13, 2023
version: 1.0
description: reply likes router for CapyTV
 */

import express from "express"
const router = express.Router()

import { createReplyLike, updateReplyLike } from "../controller"

router.route('/').post(createReplyLike)
router.route('/:replyLikeId').post(updateReplyLike)

module.exports = router 