import { useState } from 'react';
import axios from 'axios';
import { Send } from 'lucide-react';

const ProblemForm = ({ onProblemAdded }) => {
    const [formData, setFormData] = useState({
        title: '',
        difficulty: 'Easy',
        category: 'Arrays',
        link: ''
    });

    const API_URL = 'https://algotrack-backend-wf1l.onrender.com';

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${API_URL}/api/problems`, formData);
            onProblemAdded(response.data);
            setFormData({ title: '', difficulty: 'Easy', category: 'Arrays', link: '' });
        } catch (error) {
            console.error('Error adding problem:', error);
            alert("Failed to add problem.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-[#111] p-6 rounded-2xl border border-white/10 shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                <div className="space-y-2">
                    <label className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Problem Title</label>
                    <input 
                        required 
                        type="text" 
                        name="title" 
                        value={formData.title} 
                        onChange={handleChange} 
                        placeholder="e.g. Reverse Linked List" 
                        className="w-full bg-black/50 border border-white/10 text-white p-3 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all placeholder:text-gray-700" 
                    />
                </div>
                
                <div className="space-y-2">
                    <label className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Problem Link</label>
                    <input 
                        required 
                        type="url" 
                        name="link" 
                        value={formData.link} 
                        onChange={handleChange} 
                        placeholder="https://leetcode.com/..." 
                        className="w-full bg-black/50 border border-white/10 text-white p-3 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all placeholder:text-gray-700" 
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Difficulty</label>
                    <select 
                        name="difficulty" 
                        value={formData.difficulty} 
                        onChange={handleChange} 
                        className="w-full bg-black/50 border border-white/10 text-white p-3 rounded-lg focus:outline-none focus:border-purple-500 transition-all appearance-none"
                    >
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                    </select>
                </div>

                <div className="space-y-2">
                    <label className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Category</label>
                    <input 
                        type="text" 
                        name="category" 
                        value={formData.category} 
                        onChange={handleChange} 
                        placeholder="e.g. DP, Graphs" 
                        className="w-full bg-black/50 border border-white/10 text-white p-3 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all placeholder:text-gray-700" 
                    />
                </div>
            </div>
            
            <button type="submit" className="w-full bg-purple-600 hover:bg-purple-500 text-white py-3 px-6 rounded-lg font-bold transition-all flex justify-center items-center gap-2 shadow-lg shadow-purple-900/20">
                <Send size={18} /> Add to Tracker
            </button>
        </form>
    );
};

export default ProblemForm;