import Problem from '../models/problem.js';

// Get all problems
export const getProblems = async (req, res) => {
    try {
        const problems = await Problem.find().sort({ createdAt: -1 });
        res.status(200).json(problems);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// Create a new problem (NO AUTH CHECK)
export const createProblem = async (req, res) => {
    const { title, link, difficulty, category } = req.body;

    try {
        // We removed 'userId' here so it won't crash
        const newProblem = new Problem({ 
            title, 
            link, 
            difficulty, 
            category 
        });

        await newProblem.save();
        res.status(201).json(newProblem);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

// Delete a problem
export const deleteProblem = async (req, res) => {
    const { id } = req.params;
    try {
        await Problem.findByIdAndDelete(id);
        res.status(200).json({ message: "Problem deleted successfully" });
    } catch (error) {
        res.status(404).json({ message: "Problem not found" });
    }
};