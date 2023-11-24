
/*
author: Paul Kim
date: November 23, 2023
version: 1.0
description: user router for CapyTV
 */

import express from "express"
import { decryptToken, validateUser } from "../controller"

const router = express.Router()

router.route('/login').post(validateUser)
router.route('/validation').post(decryptToken)

module.exports = router