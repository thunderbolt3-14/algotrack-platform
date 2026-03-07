import express from 'express';
import { getPosts, createPost } from '../controllers/postController.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getPosts);
router.post('/', requireAuth, createPost); // <--- Protected

export default router;