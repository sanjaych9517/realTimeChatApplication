import express from "express"
import { getMessage, sendMessage } from "../controllers/messageController.js"
import isAutenticated from "../middleware/isAuthenticated.js"

const router = express.Router()
router.route("/send/:id").post(isAutenticated ,sendMessage)
router.route("/:id").get(isAutenticated, getMessage)

export default router