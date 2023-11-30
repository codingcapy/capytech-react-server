
/*
author: Paul Kim
date: November 23, 2023
version: 1.0
description: users router for CapyTV
 */

import express from "express"
import { createUser, getUser, updateUser } from "../controller"

const router = express.Router()

router.route('/').post(createUser)
router.route('/update/:userId').post(updateUser)
router.route('/:userId').get(getUser)

module.exports = router