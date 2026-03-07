import { useState } from 'react';
import axios from 'axios';

const ProblemForm = ({ onProblemAdded }) => {
    // 1. Setup the state for our form inputs
    const [formData, setFormData] = useState({
        title: '',
        platform: 'LeetCode',
        problemId: '',
        difficulty: 'Medium',
        status: 'To Do'
    });
    
    // 2. Prevent multiple clicks while saving
    const [isSubmitting, setIsSubmitting] = useState(false);

    // 3. Handle typing in the input fields
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // 4. Handle the form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevents the default page reload
        setIsSubmitting(true);
        
        try {
            // Send the POST request to your backend
            const response = await axios.post('https://algotrack-backend-wf1l.onrender.com/api/problems', formData);
            
            // Pass the newly saved problem up to the main App component
            onProblemAdded(response.data);
            
            // Clear the form fields
            setFormData({ 
                title: '', platform: 'LeetCode', problemId: '', difficulty: 'Medium', status: 'To Do' 
            });
        } catch (error) {
            console.error('Error adding problem:', error);
            alert("Failed to add problem. Check the console.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-8">
            <h2 className="text-xl font-bold text-slate-800 mb-4">Log a New Problem</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
                <input 
                    required 
                    type="text" 
                    name="title" 
                    value={formData.title} 
                    onChange={handleChange} 
                    placeholder="Problem Title (e.g., Two Sum)" 
                    className="col-span-1 md:col-span-2 p-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
                />
                
                <input 
                    required 
                    type="text" 
                    name="problemId" 
                    value={formData.problemId} 
                    onChange={handleChange} 
                    placeholder="ID (e.g., 1)" 
                    className="p-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
                />
                
                <select name="platform" value={formData.platform} onChange={handleChange} className="p-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="LeetCode">LeetCode</option>
                    <option value="Codeforces">Codeforces</option>
                    <option value="HackerRank">HackerRank</option>
                    <option value="Other">Other</option>
                </select>
                
                <select name="difficulty" value={formData.difficulty} onChange={handleChange} className="p-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                </select>
                
                <select name="status" value={formData.status} onChange={handleChange} className="p-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="To Do">To Do</option>
                    <option value="Attempted">Attempted</option>
                    <option value="Solved">Solved</option>
                </select>
            </div>
            
            <button 
                type="submit" 
                disabled={isSubmitting} 
                className="w-full bg-slate-900 text-white font-semibold py-2 rounded hover:bg-slate-800 transition-colors disabled:opacity-50"
            >
                {isSubmitting ? 'Saving to Database...' : 'Add Problem'}
            </button>
        </form>
    );
};

export default ProblemForm;