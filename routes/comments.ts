
import express from "express"
const router = express.Router()

import { createComment } from "../controller"

router.route('/').post(createComment)

module.exports = router 