import { useState } from 'react';
import axios from 'axios';

const ProblemForm = ({ onProblemAdded }) => {
    const [formData, setFormData] = useState({
        title: '',
        difficulty: 'Easy',
        category: 'Arrays',
        link: ''
    });

    // REPLACE WITH YOUR RENDER URL
    const API_URL = 'https://algotrack-backend-wf1l.onrender.com';

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // No headers, no tokens. Just data.
            const response = await axios.post(`${API_URL}/api/problems`, formData);

            onProblemAdded(response.data);
            setFormData({ title: '', difficulty: 'Easy', category: 'Arrays', link: '' });
            alert("Problem Added Successfully!");
        } catch (error) {
            console.error('Error adding problem:', error);
            alert("Failed to add problem.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-8 border border-slate-200">
            <h2 className="text-xl font-bold mb-4 text-slate-800">Log New Problem</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input 
                    required 
                    type="text" 
                    name="title" 
                    value={formData.title} 
                    onChange={handleChange} 
                    placeholder="Problem Title (e.g., Two Sum)" 
                    className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                />
                <input 
                    required 
                    type="url" 
                    name="link" 
                    value={formData.link} 
                    onChange={handleChange} 
                    placeholder="Problem Link (LeetCode URL)" 
                    className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                />
                <select name="difficulty" value={formData.difficulty} onChange={handleChange} className="p-3 border rounded-lg">
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                </select>
                <input 
                    type="text" 
                    name="category" 
                    value={formData.category} 
                    onChange={handleChange} 
                    placeholder="Category (e.g., Arrays, DP)" 
                    className="p-3 border rounded-lg" 
                />
            </div>
            <button type="submit" className="bg-blue-600 text-white py-3 px-6 rounded-lg font-bold hover:bg-blue-700 transition-colors w-full md:w-auto">
                Add Problem
            </button>
        </form>
    );
};

export default ProblemForm;