
/*
author: Paul Kim
date: November 23, 2023
version: 1.0
description: users router for CapyTV
 */

import express from "express"
import { createUser } from "../controller"

const router = express.Router()

router.route('/').post(createUser)

module.exports = router