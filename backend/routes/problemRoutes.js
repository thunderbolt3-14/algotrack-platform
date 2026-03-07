import express from 'express';
import { getProblems, createProblem, deleteProblem } from '../controllers/problemController.js';
import { requireAuth } from '../middleware/auth.js'; // <--- Import the guard

const router = express.Router();

// Public Route (Anyone can view)
router.get('/', getProblems);

// Protected Routes (Only logged-in users can add/delete)
router.post('/', requireAuth, createProblem);      // <--- Added requireAuth
router.delete('/:id', requireAuth, deleteProblem); // <--- Added requireAuth

export default router;