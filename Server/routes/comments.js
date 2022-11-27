import express from 'express'
import { addComments, deleteComments, getComments } from '../controllers/comments.js';
import { verifyToken } from '../Middleware/verifyToken.js';

const router = express.Router()

// add comment
router.post("/", verifyToken, addComments)
// get comment
router.get("/:videoId", getComments)
// delete comment
router.delete("/:id", verifyToken, deleteComments)

export default router;