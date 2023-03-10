import express from 'express';

import { getCustomersBySearch, getCustomer, getCustomers, createCustomer, updateCustomer, deleteCustomer, likeCustomer, commentCustomer } from '../controllers/customers.js'
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/search', getCustomersBySearch);
router.get('/', getCustomers);
router.get('/:id', getCustomer);
router.post('/', auth, createCustomer);
router.patch('/:id', auth, updateCustomer);
router.delete('/:id', auth, deleteCustomer);
router.patch('/:id/likeCustomer', auth, likeCustomer);
router.post('/:id/commentCustomer', auth, commentCustomer);


export default router;