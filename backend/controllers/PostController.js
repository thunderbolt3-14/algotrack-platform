import Post from '../models/Post.js';

// @desc    Create a new blog post
// @route   POST /api/posts
export const createPost = async (req, res) => {
    try {
        const { title, content, tags, isPublished } = req.body;
        
        const newPost = new Post({
            title,
            content,
            tags,
            isPublished
        });

        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create post', error: error.message });
    }
};

// @desc    Get all published blog posts
// @route   GET /api/posts
export const getPosts = async (req, res) => {
    try {
        // We only want to fetch posts where isPublished is true, sorted by newest
        const posts = await Post.find({ isPublished: true }).sort({ createdAt: -1 });
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch posts', error: error.message });
    }
};