
/*
author: Paul Kim
date: November 23, 2023
version: 1.0
description: replies router for CapyTV
 */

import express from "express"
const router = express.Router()

import { createReply, updateReply } from "../controller"

router.route('/').post(createReply)
router.route('/:replyId').post(updateReply)

module.exports = router 