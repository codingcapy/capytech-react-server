
import express from "express"
import { createUser } from "../controller"

const router = express.Router()

router.route('/').post(createUser)

module.exports = router