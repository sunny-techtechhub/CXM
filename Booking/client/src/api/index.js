import axios from 'axios'

const API = axios.create({ baseURL: 'http://localhost:5100' });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }

    return req;
})

export const fetchCustomer = (id) => API.get(`/customers/${id}`);
export const fetchCustomers = (page) => API.get(`/customers?page=${page}`);
export const fetchCustomersBySearch = (searchQuery) => API.get(`/customers/search?searchQuery=${searchQuery.searchTerms || 'none'}&tags=${searchQuery.searchTags}`);
export const createCustomer = (newCustomer) => API.post('/customers', newCustomer);
export const likeCustomer = (id) => API.patch(`/customers/${id}/likeCustomer`);
export const commentCustomer = (value, id) => API.post(`/customers/${id}/commentCustomer`, { value });
export const updateCustomer = (id, updatedCustomer) => API.patch(`/customers/${id}`, updatedCustomer);
export const deleteCustomer = (id) => API.delete(`/customers/${id}`);

export const signIn = (formData) => API.post('/users/signIn', formData);
export const signUp = (formData) => API.post('/users/signUp', formData);
