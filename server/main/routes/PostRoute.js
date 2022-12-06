import { Router } from "express";
import {
  createPost,
  getPost,
  updatePost,
  deletePost,
} from "../controllers/PostController";

const router = Router();
router.route("/post/create").post(createPost);

router.route("/posts").get(getPost);

router.route("/post/:id").put(updatePost).delete(deletePost);

export default router;
