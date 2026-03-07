import { useState } from 'react';
import axios from 'axios';

const PostForm = ({ onPostAdded, onClose }) => {
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        tags: '' // We will take this as a comma-separated string and convert it
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Convert the comma-separated tags string into a clean array
        const tagsArray = formData.tags
            .split(',')
            .map(tag => tag.trim())
            .filter(tag => tag !== '');

        const postPayload = {
            title: formData.title,
            content: formData.content,
            tags: tagsArray,
            isPublished: true
        };

        try {
            const response = await axios.post('https://algotrack-backend-wf1l.onrender.com/api/posts', postPayload);
            onPostAdded(response.data);
            setFormData({ title: '', content: '', tags: '' });
            onClose(); // Automatically close the form after successful submission
        } catch (error) {
            console.error('Error creating post:', error);
            alert("Failed to publish post.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-8 animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-slate-800">Draft a New Post</h2>
                <button type="button" onClick={onClose} className="text-slate-400 hover:text-slate-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
            </div>
            
            <div className="space-y-4 mb-4">
                <input 
                    required 
                    type="text" 
                    name="title" 
                    value={formData.title} 
                    onChange={handleChange} 
                    placeholder="Post Title (e.g., Implementing a Trie in C++)" 
                    className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold text-lg" 
                />
                
                <input 
                    type="text" 
                    name="tags" 
                    value={formData.tags} 
                    onChange={handleChange} 
                    placeholder="Tags (comma separated, e.g., C++, Data Structures, Trees)" 
                    className="w-full p-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" 
                />
                
                <textarea 
                    required 
                    name="content" 
                    value={formData.content} 
                    onChange={handleChange} 
                    placeholder="Write your content in Markdown... (e.g., ## Introduction, **Bold Text**, `code snippets`)" 
                    rows="8"
                    className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm resize-y" 
                ></textarea>
            </div>
            
            <button 
                type="submit" 
                disabled={isSubmitting} 
                className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
                {isSubmitting ? 'Publishing...' : 'Publish Post'}
            </button>
        </form>
    );
};

export default PostForm;