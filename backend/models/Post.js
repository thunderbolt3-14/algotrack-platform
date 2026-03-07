import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String, // We will store Markdown text here
        required: true
    },
    tags: {
        type: [String], // Array of strings e.g., ['System Design', 'Node.js']
        default: []
    },
    isPublished: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

export default mongoose.model('Post', postSchema);