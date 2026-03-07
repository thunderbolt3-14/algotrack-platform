import mongoose from 'mongoose';

const problemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    platform: {
        type: String,
        required: true,
        enum: ['LeetCode', 'Codeforces', 'HackerRank', 'Other'] // Restricts to these values
    },
    problemId: {
        type: String, // e.g., '13' or '9'
        required: true
    },
    difficulty: {
        type: String,
        enum: ['Easy', 'Medium', 'Hard'],
        default: 'Medium'
    },
    status: {
        type: String,
        enum: ['Solved', 'Attempted', 'To Do'],
        default: 'To Do'
    },
    notes: {
        type: String, // You can store your approach or space/time complexity here
        default: ''
    }
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

export default mongoose.model('Problem', problemSchema);