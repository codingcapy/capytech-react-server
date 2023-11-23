
/*
author: Paul Kim
date: November 13, 2023
version: 1.0
description: likes router for CapyTV
 */

import express from "express"
const router = express.Router()

import { createLike, updateLike } from "../controller"

router.route('/').post(createLike)
router.route('/:likeId').post(updateLike)

module.exports = router 