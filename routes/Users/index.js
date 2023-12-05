import express from "express";
import {
  getUser,
  getUserFriends,
  addRemoveFriend,
} from "../../controllers/Users/index.js";

import { verifyToken } from "../../middleware/Auth.js";

const router = express.Router();

router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);

export default router;
