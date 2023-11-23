
import express from "express"
import { decryptToken, validateUser } from "../controller"

const router = express.Router()

router.route('/login').post(validateUser)
router.route('/validation').post(decryptToken)

module.exports = router