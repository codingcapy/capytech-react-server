
/*
author: Paul Kim
date: November 13, 2023
version: 1.0
description: comment likes router for CapyTV
 */

import express from "express"
const router = express.Router()

import { createCommentLike, updateCommentLike } from "../controller"

router.route('/').post(createCommentLike)
router.route('/:commentLikeId').post(updateCommentLike)

module.exports = router 