
/*
author: Paul Kim
date: November 23, 2023
version: 1.0
description: comment router for CapyTV
 */

import express from "express"
const router = express.Router()

import { createComment, updateComment } from "../controller"

router.route('/').post(createComment)
router.route('/:commentId').post(updateComment)
router.route('/delete/:commentId').post(updateComment)

module.exports = router 