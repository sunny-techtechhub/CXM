import mongoose from "mongoose";

const menuSchema = mongoose.Schema({
    title: String,
    cTitle: String,
    chef: String,
    recipe: String,
    tags: [String],
    selectedFile: String,
    name: String,
    creator: String,
    likes: {
        type: [String],
        default: []
    },
    comments: {
        type: [String],
        default: []
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

const Menu = mongoose.model('Menu', menuSchema);

export default Menu;