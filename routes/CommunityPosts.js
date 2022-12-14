import express from "express";
import auth from "../middleware/auth.js";
import {CreatePost} from "../controllers/posts.js";
import {getAllPosts} from "../controllers/posts.js";
import {deletePost} from "../controllers/posts.js";
import {votePost} from "../controllers/posts.js";
const router = express.Router();

router.post("/CreatePost", auth, CreatePost);
router.get("/get", getAllPosts);
router.get("/", (req, res) => {
  res.send("Hello from community route");
});
router.delete("/delete/:id", auth, deletePost);
router.patch("/vote/:id", auth, votePost);

export default router;
