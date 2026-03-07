import { useState, useEffect } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import PostForm from './PostForm'; // <-- 1. Import the new form

const Blog = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false); // <-- 2. State to toggle form visibility

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/posts');
                setPosts(response.data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    // <-- 3. Function to handle instant UI update when a new post is published
    const handlePostAdded = (newPost) => {
        setPosts([newPost, ...posts]);
    };

    return (
        <div className="max-w-3xl mx-auto space-y-8">
            {/* Header and Toggle Button */}
            <div className="flex justify-between items-center border-b border-slate-200 pb-4">
                <h2 className="text-2xl font-bold text-slate-800">Your Articles</h2>
                <button 
                    onClick={() => setShowForm(!showForm)}
                    className="bg-slate-900 text-white px-4 py-2 rounded shadow hover:bg-slate-800 transition-colors text-sm font-semibold flex items-center gap-2"
                >
                    {showForm ? 'Cancel' : (
                        <>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                            Write New Post
                        </>
                    )}
                </button>
            </div>

            {/* Conditionally render the form */}
            {showForm && (
                <PostForm 
                    onPostAdded={handlePostAdded} 
                    onClose={() => setShowForm(false)} 
                />
            )}

            {/* Render the Posts */}
            {loading ? (
                <div className="py-20 text-center text-slate-600 animate-pulse">Loading blog posts...</div>
            ) : posts.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-xl border border-slate-200 border-dashed">
                    <p className="text-slate-500 mb-4">No articles published yet.</p>
                    <button onClick={() => setShowForm(true)} className="text-blue-600 font-semibold hover:underline">Write your first post</button>
                </div>
            ) : (
                <div className="space-y-8">
                    {posts.map((post) => (
                        <article key={post._id} className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 transition-all hover:shadow-md">
                            <header className="mb-6">
                                <h3 className="text-3xl font-extrabold text-slate-900 mb-4 leading-tight">{post.title}</h3>
                                <div className="flex flex-wrap gap-2">
                                    {post.tags.map((tag, index) => (
                                        <span key={index} className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider rounded-full">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </header>
                            
                            {/* Tailwind Typography plugin makes this look gorgeous automatically */}
                            <div className="prose prose-slate prose-a:text-blue-600 hover:prose-a:text-blue-500 max-w-none">
                                <ReactMarkdown>{post.content}</ReactMarkdown>
                            </div>
                            
                            <div className="mt-8 pt-4 border-t border-slate-100 text-xs text-slate-400">
                                Published on {new Date(post.createdAt).toLocaleDateString()}
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Blog;