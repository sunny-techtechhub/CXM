import { FETCH_ALL, FETCH_CUSTOMER, FETCH_BY_SEARCH, CREATE, UPDATE, LIKE, COMMENT, DELETE, START_LOADING, END_LOADING } from '../constants/actionTypes';
import * as api from '../api';

// Action Creators
export const getCustomer = (id) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.fetchCustomer(id);

        dispatch({ type: FETCH_CUSTOMER, payload: { customer: data } });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }

}

export const getCustomers = (page) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data: { data, currentPage, numberOfPages } } = await api.fetchCustomers(page);

        dispatch({ type: FETCH_ALL, payload: { data, currentPage, numberOfPages } });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }

}

export const getCustomersBySearch = (searchQuery) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data: { data } } = await api.fetchCustomersBySearch(searchQuery);

        dispatch({ type: FETCH_BY_SEARCH, payload: { data } });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }
}

export const createCustomer = (customer) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.createCustomer(customer);

        dispatch({ type: CREATE, payload: data });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }
}

export const updateCustomer = (id, customer) => async (dispatch) => {
    try {
        const { data } = await api.updateCustomer(id, customer);

        dispatch({ type: UPDATE, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const commentCustomer = (value, id) => async (dispatch) => {
    try {
        const { data } = await api.commentCustomer(value, id);

        dispatch({ type: COMMENT, payload: data });

        return data.comments;
    } catch (error) {
        console.log(error);
    }
}

export const deleteCustomer = (id) => async (dispatch) => {
    try {
        await api.deleteCustomer(id);

        dispatch({ type: DELETE, payload: id });
    } catch (error) {
        console.log(error);
    }
}

export const likeCustomer = (id) => async (dispatch) => {
    try {
        const { data } = await api.likeCustomer(id);

        dispatch({ type: LIKE, payload: data });
    } catch (error) {
        console.log(error);
    }
}