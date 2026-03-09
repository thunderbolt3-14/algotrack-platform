import { useState } from 'react';
import axios from 'axios';
import { X, Send, PenTool } from 'lucide-react';

const PostForm = ({ onPostAdded, onClose }) => {
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        tags: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const API_URL = 'https://algotrack-backend-wf1l.onrender.com';

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const tagsArray = formData.tags.split(',').map(tag => tag.trim()).filter(t => t);

        const postPayload = {
            title: formData.title,
            content: formData.content,
            tags: tagsArray,
            isPublished: true
        };

        try {
            const response = await axios.post(`${API_URL}/api/posts`, postPayload);
            onPostAdded(response.data);
            setFormData({ title: '', content: '', tags: '' });
            onClose();
        } catch (error) {
            console.error('Error creating post:', error);
            alert("Failed to publish post.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-[#111] border border-white/20 p-8 rounded-2xl shadow-2xl relative">
            <button 
                type="button" 
                onClick={onClose} 
                className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
            >
                <X size={24} />
            </button>

            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-purple-600 rounded-lg text-white">
                    <PenTool size={20} />
                </div>
                <h2 className="text-2xl font-bold text-white">Draft New Post</h2>
            </div>
            
            <div className="space-y-4 mb-6">
                <div>
                    <input 
                        required 
                        type="text" 
                        name="title" 
                        value={formData.title} 
                        onChange={handleChange} 
                        placeholder="Article Title..." 
                        className="w-full bg-black/50 border border-white/10 text-white p-4 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 text-lg font-semibold placeholder:text-gray-600 transition-all" 
                    />
                </div>
                
                <div>
                    <input 
                        type="text" 
                        name="tags" 
                        value={formData.tags} 
                        onChange={handleChange} 
                        placeholder="Tags (e.g. C++, Recursion, Interview)" 
                        className="w-full bg-black/50 border border-white/10 text-white p-3 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 text-sm placeholder:text-gray-600 transition-all" 
                    />
                </div>
                
                <div>
                    <textarea 
                        required 
                        name="content" 
                        value={formData.content} 
                        onChange={handleChange} 
                        placeholder="Write your content here using Markdown..." 
                        rows="8"
                        className="w-full bg-black/50 border border-white/10 text-gray-300 p-4 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 font-mono text-sm resize-none placeholder:text-gray-700 transition-all" 
                    ></textarea>
                </div>
            </div>
            
            <button 
                type="submit" 
                disabled={isSubmitting} 
                className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-4 rounded-xl transition-all flex justify-center items-center gap-2 shadow-lg shadow-purple-900/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isSubmitting ? 'Publishing...' : <><Send size={18} /> Publish Article</>}
            </button>
        </form>
    );
};

export default PostForm;