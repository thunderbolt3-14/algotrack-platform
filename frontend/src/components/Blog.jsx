import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, Calendar, Tag, BookOpen } from 'lucide-react';
import PostForm from './PostForm';
import ReactMarkdown from 'react-markdown';

const Blog = () => {
    const [posts, setPosts] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);

    const API_URL = 'https://algotrack-backend-wf1l.onrender.com';

    useEffect(() => {
        axios.get(`${API_URL}/api/posts`)
            .then(response => setPosts(response.data))
            .catch(error => console.error(error));
    }, []);

    const handlePostAdded = (newPost) => {
        setPosts([newPost, ...posts]);
        setShowForm(false);
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
            {/* Header */}
            <div className="flex justify-between items-center border-b border-white/10 pb-6">
                <div>
                    <h2 className="text-3xl font-bold text-white">Technical Blog</h2>
                    <p className="text-gray-400 mt-1">Documenting the learning journey.</p>
                </div>
                <button 
                    onClick={() => setShowForm(true)}
                    className="bg-purple-600 hover:bg-purple-500 text-white px-5 py-2.5 rounded-full font-semibold flex items-center gap-2 transition-all shadow-lg shadow-purple-900/20"
                >
                    <Plus size={18} /> Write Post
                </button>
            </div>

            {/* Create Post Modal */}
            <AnimatePresence>
                {showForm && (
                    <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
                    >
                        <motion.div 
                            initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}
                            className="w-full max-w-2xl"
                        >
                            <PostForm onPostAdded={handlePostAdded} onClose={() => setShowForm(false)} />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Post Reading Modal */}
            <AnimatePresence>
                {selectedPost && (
                    <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
                        onClick={() => setSelectedPost(null)}
                    >
                        <motion.div 
                            initial={{ y: 50 }} animate={{ y: 0 }} exit={{ y: 50 }}
                            className="bg-[#111] border border-white/10 w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-2xl p-8 shadow-2xl relative"
                            onClick={e => e.stopPropagation()}
                        >
                            <button 
                                onClick={() => setSelectedPost(null)}
                                className="absolute top-4 right-4 p-2 bg-white/5 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-colors"
                            >
                                <X size={20} />
                            </button>

                            <h1 className="text-3xl font-bold text-white mb-4">{selectedPost.title}</h1>
                            
                            <div className="flex gap-4 text-sm text-gray-400 mb-8 border-b border-white/10 pb-4">
                                <span className="flex items-center gap-1"><Calendar size={14} /> {new Date(selectedPost.createdAt).toLocaleDateString()}</span>
                                <div className="flex gap-2">
                                    {selectedPost.tags && selectedPost.tags.map((tag, i) => (
                                        <span key={i} className="flex items-center gap-1 bg-purple-500/10 text-purple-400 px-2 py-0.5 rounded text-xs">
                                            <Tag size={12} /> {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="prose prose-invert prose-lg max-w-none text-gray-300">
                                <ReactMarkdown>{selectedPost.content}</ReactMarkdown>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Blog Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {posts.map((post, index) => (
                    <motion.div 
                        key={post._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => setSelectedPost(post)}
                        className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 hover:border-purple-500/50 transition-all cursor-pointer group h-full flex flex-col"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-purple-500/10 rounded-xl text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-colors">
                                <BookOpen size={24} />
                            </div>
                            <span className="text-xs text-gray-500 font-mono">
                                {new Date(post.createdAt).toLocaleDateString()}
                            </span>
                        </div>
                        
                        <h3 className="text-xl font-bold text-gray-100 mb-2 group-hover:text-purple-400 transition-colors line-clamp-2">
                            {post.title}
                        </h3>
                        
                        <p className="text-gray-400 text-sm mb-4 line-clamp-3 flex-grow">
                            {post.content.substring(0, 150)}...
                        </p>

                        <div className="flex flex-wrap gap-2 mt-auto">
                            {post.tags && post.tags.slice(0, 3).map((tag, i) => (
                                <span key={i} className="text-xs px-2 py-1 rounded bg-black/30 text-gray-400 border border-white/5">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>

            {posts.length === 0 && (
                <div className="text-center py-20 text-gray-600">
                    <p>No articles yet. Start writing your legacy.</p>
                </div>
            )}
        </motion.div>
    );
};

export default Blog;