import mongoose from 'mongoose';
import Customer from '../models/customers.js'

export const getCustomers = async (req, res) => {
    const { page } = req.query;

    try {
        const LIMIT = 8;
        const startIndex = (Number(page) - 1) * LIMIT;
        const total = await Customer.countDocuments({});
        const Customers = await Customer.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);

        res.status(200).json({ data: Customers, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT) });
    } catch (error) {
        res.status(404).json({ message: error.message });

    }
};

export const getCustomersBySearch = async (req, res) => {
    const { searchQuery, tags } = req.query;
    try {
        const mobile = new RegExp(searchQuery, 'i');
        const firstName = mobile;
        const lastName = mobile;
        const customers = await Customer.find({ $or: [{ mobile }, { firstName }, { lastName}, { tags: { $in: tags.split(',') } }] });
        // rate: { $gt: min | 1, $lt: max || 999 }

        res.status(200).json({ data: customers });
    } catch (error) {
        res.status(404).json({ message: error.message });

    }
};

export const getCustomer = async (req, res) => {
    const { id } = req.params;
    try {
        const customer = await Customer.findById(id);

        res.status(200).json(customer);
    } catch (error) {
        res.status(404).json({ message: error.message });

    }
};

export const createCustomer = async (req, res) => {
    const customer = req.body;

    const newCustomer = new Customer({ ...customer, creator: req.userId, createdAt: new Date().toISOString() });

    try {
        await newCustomer.save();

        res.status(201).json(newCustomer);
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

export const updateCustomer = async (req, res) => {
    const { id: _id } = req.params;
    const customer = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No Customer with that id');

    const updatedCustomer = await Customer.findByIdAndUpdate(_id, { ...customer, _id }, { new: true });

    res.json(updateCustomer);
};

export const deleteCustomer = async (req, res) => {
    const { id } = req.params;
    const customer = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No Customer with that id');

    const updatedCustomer = await Customer.findByIdAndRemove(id);

    res.json({ message: 'Customer deleted successfully' });
};

export const likeCustomer = async (req, res) => {
    const { id } = req.params;

    if (!req.userId) return res.json({ message: "Unauthenticated" });

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No Customer with that id');

    const customer = await Customer.findById(id);
    const index = customer.likes.findIndex((id) => id === String(req.userId));

    if (index == -1) {
        customer.likes.push(req.userId);
    } else {
        customer.likes = customer.likes.filter((id) => id !== String(req.userId));
    }
    const updatedCustomer = await Customer.findByIdAndUpdate(id, customer, { new: true });

    res.json(updatedCustomer);
};

export const commentCustomer = async (req, res) => {
    const { id } = req.params;
    const { value } = req.body;

    // single statement to push like
    const updatedCustomer = await Customer.findByIdAndUpdate(id, {
        $push: { comments: value }
    },
        { new: true }
    );

    /*
    const customer = await Customer.findById(id);
    customer.comments.push(value);
    
    const updatedCustomer = await Customer.findByIdAndUpdate(id, customer, { new: true });
    */

    res.json(updatedCustomer);
};