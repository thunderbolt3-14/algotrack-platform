import Problem from '../models/Problem.js';

// @desc    Add a new coding problem
// @route   POST /api/problems
export const createProblem = async (req, res) => {
    try {
        const { title, platform, problemId, difficulty, status, notes } = req.body;
        
        const newProblem = new Problem({
            title,
            platform,
            problemId,
            difficulty,
            status,
            notes
        });

        const savedProblem = await newProblem.save();
        res.status(201).json(savedProblem);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create problem', error: error.message });
    }
};

// @desc    Get all tracked problems
// @route   GET /api/problems
export const getProblems = async (req, res) => {
    try {
        const problems = await Problem.find().sort({ createdAt: -1 }); // Newest first
        res.status(200).json(problems);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch problems', error: error.message });
    }
};

// @desc    Delete a problem
// @route   DELETE /api/problems/:id
export const deleteProblem = async (req, res) => {
    try {
        // req.params extracts the 'id' from the end of the URL
        const { id } = req.params;
        
        // Tell Mongoose to find the document by its ID and remove it
        const deletedProblem = await Problem.findByIdAndDelete(id);
        
        if (!deletedProblem) {
            return res.status(404).json({ message: 'Problem not found in database' });
        }
        
        res.status(200).json({ message: 'Problem deleted successfully', id });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete problem', error: error.message });
    }
};

// @desc    Update a problem (e.g., changing status)
// @route   PUT /api/problems/:id
export const updateProblem = async (req, res) => {
    try {
        const { id } = req.params;
        
        // The { new: true } option tells Mongoose to return the UPDATED document, not the old one
        const updatedProblem = await Problem.findByIdAndUpdate(id, req.body, { new: true });
        
        if (!updatedProblem) {
            return res.status(404).json({ message: 'Problem not found' });
        }
        
        res.status(200).json(updatedProblem);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update problem', error: error.message });
    }
};
