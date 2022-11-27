import express from "express";
import {
  deleteUser,
  dislike,
  getUser,
  like,
  subscribe,
  unSubscribe,
  updateUser,
} from "../controllers/users.js";
import { verifyToken } from "../Middleware/verifyToken.js";

const router = express.Router();

// update user
router.put("/:id", verifyToken, updateUser);

// delete user
router.delete("/:id", verifyToken, deleteUser);

// get user
router.get("/find/:id", getUser);

// subscribe
router.put("/subs/:id", verifyToken, subscribe);

// unsubscribe
router.put("/unsubs/:id", verifyToken, unSubscribe);

// like
router.put("/like/:videoId", verifyToken, like);

// dislike
router.put("/dislike/:videoId", verifyToken, dislike);

export default router;

