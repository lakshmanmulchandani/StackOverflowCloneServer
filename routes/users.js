import express from "express";

import {login, signup} from "../controllers/auth.js";
import {getAllUsers, updateProfile} from "../controllers/users.js";
import auth from "../middleware/auth.js";
import User from "../models/auth.js";
import {follow} from "../controllers/users.js";
import {unfollow} from "../controllers/users.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/getAllUsers", getAllUsers);
router.patch("/update/:id", auth, updateProfile);
router.put("/:id/follow", auth, follow);
router.put("/:id/unfollow", auth, unfollow);

export default router;
