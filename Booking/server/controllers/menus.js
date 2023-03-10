import mongoose from 'mongoose';
import Menu from '../models/menu.js'

export const getPosts = async (req, res) => {
    const { page } = req.query;

    try {
        const LIMIT = 8;
        const startIndex = (Number(page) - 1) * LIMIT;
        const total = await Menu.countDocuments({});
        const menus = await Menu.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);

        res.status(200).json({ data: menus, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT) });
    } catch (error) {
        res.status(404).json({ message: error.message });

    }
};

export const getPostsBySearch = async (req, res) => {
    const { searchQuery, tags } = req.query;
    try {
        const title = new RegExp(searchQuery, 'i');
        const posts = await Menu.find({ $or: [{ title }, { tags: { $in: tags.split(',') } }] });
        // rate: { $gt: min | 1, $lt: max || 999 }

        res.status(200).json({ data: posts });
    } catch (error) {
        res.status(404).json({ message: error.message });

    }
};

export const getPost = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await Menu.findById(id);

        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });

    }
};

export const createPost = async (req, res) => {
    const post = req.body;

    const newPost = new Menu({ ...post, creator: req.userId, createdAt: new Date().toISOString() });

    try {
        await newPost.save();

        res.status(201).json(newPost);
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

export const updatePost = async (req, res) => {
    const { id: _id } = req.params;
    const post = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No menu with that id');

    const updatedPost = await Menu.findByIdAndUpdate(_id, { ...post, _id }, { new: true });

    res.json(updatePost);
};

export const deletePost = async (req, res) => {
    const { id } = req.params;
    const post = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No menu with that id');

    const updatedPost = await Menu.findByIdAndRemove(id);

    res.json({ message: 'Menu eleted successfully' });
};

export const likePost = async (req, res) => {
    const { id } = req.params;

    if (!req.userId) return res.json({ message: "Unauthenticated" });

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No menu with that id');

    const post = await Menu.findById(id);
    const index = post.likes.findIndex((id) => id === String(req.userId));

    if (index == -1) {
        post.likes.push(req.userId);
    } else {
        post.likes = post.likes.filter((id) => id !== String(req.userId));
    }
    const updatedPost = await Menu.findByIdAndUpdate(id, post, { new: true });

    res.json(updatePost);
};

export const commentPost = async (req, res) => {
    const { id } = req.params;
    const { value } = req.body;

    // single statement to push like
    const updatedPost = await Menu.findByIdAndUpdate(id, {
        $push: { comments: value }
    },
        { new: true }
    );

    /*
    const post = await Menu.findById(id);
    post.comments.push(value);
    
    const updatedPost = await Menu.findByIdAndUpdate(id, post, { new: true });
    */

    res.json(updatedPost);
};