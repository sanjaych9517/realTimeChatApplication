import express from "express"
import { sendMessage } from "../controllers/messageController.js"
import isAutenticated from "../middleware/isAuthenticated.js"

const router = express.Router()
router.route("/send/:id").post(isAutenticated ,sendMessage)

export default router