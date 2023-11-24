
import express from "express"
const router = express.Router()

import { createReply, updateReply } from "../controller"

router.route('/').post(createReply)
router.route('/:replyId').post(updateReply)

module.exports = router 