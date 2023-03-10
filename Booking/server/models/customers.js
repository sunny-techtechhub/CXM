import mongoose from 'mongoose';

const customerSchema = mongoose.Schema({
    id: {
        type: String,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    mobile: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    selectedFile: String,
    tags: [String],
    likes: {
        type: [String],
        default: []
    },
    comments: {
        type: [String],
        default: []
    },
    creator: String,
    createdAt: {
        type: Date,
        default: new Date()
    }
});

export default mongoose.model("Customer", customerSchema);