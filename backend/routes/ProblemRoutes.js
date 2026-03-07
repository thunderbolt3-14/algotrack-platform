import express from 'express';
import { createProblem, getProblems, deleteProblem, updateProblem } from '../controllers/problemController.js';

const router = express.Router();

router.post('/', createProblem);
router.get('/', getProblems);
router.delete('/:id', deleteProblem);
router.put('/:id', updateProblem); // <-- Added update route

export default router;