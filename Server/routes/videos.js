import express from "express";
import {
  addToWatchLater,
  addVideos,
  deleteAllVideos,
  deleteVideos,
  findByTags,
  getOwnVideos,
  getVideos,
  getWatchLaterVideos,
  randomVideos,
  search,
  subscriptionVideos,
  trendingVideos,
  updateVideos,
  views,
} from "../controllers/videos.js";
import { verifyToken } from "../Middleware/verifyToken.js";

const router = express.Router();
// create videos
router.post("/", verifyToken, addVideos);
// update videos
router.put("/:id", verifyToken, updateVideos);
// get videos

router.get("/find/:id", getVideos);
// delete videos
router.delete("/:id", verifyToken, deleteVideos);

router.put("/view/:id", views);
router.get("/trending", trendingVideos);
router.get("/random", randomVideos);
router.get("/sub", verifyToken, subscriptionVideos);
router.get("/tags", findByTags);
router.get("/search", search);
router.get("/ownVideos", verifyToken , getOwnVideos)
router.delete("/deleteAllVideos/:userId", verifyToken,  deleteAllVideos)
router.patch("/addToWatchLaterVideo/:id", addToWatchLater )
router.get("/watchlatervideo", getWatchLaterVideos )
export default router;
