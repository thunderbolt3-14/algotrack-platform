import mongoose from 'mongoose';

const problemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    difficulty: {
        type: String,
        required: true,
        enum: ['Easy', 'Medium', 'Hard']
    },
    category: {
        type: String,
        required: true
    },
    // We removed userId completely
}, { timestamps: true });

const Problem = mongoose.model('Problem', problemSchema);

export default Problem;