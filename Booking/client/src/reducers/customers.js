import { FETCH_ALL, FETCH_BY_SEARCH, FETCH_CUSTOMER, CREATE, UPDATE, DELETE, LIKE, COMMENT, START_LOADING, END_LOADING } from '../constants/actionTypes';

export default (state = { isLoading: true, customers: [] }, action) => {
    switch (action.type) {
        case START_LOADING:
            return { ...state, isLoading: true };
        case END_LOADING:
            return { ...state, isLoading: false };
        case FETCH_ALL:
            return {
                ...state,
                customers: action.payload.data,
                currentPage: action.payload.data.currentPage,
                numberOfPages: action.payload.data.numberOfPages,
            };
        case FETCH_BY_SEARCH:
            return { ...state, customers: action.payload.data };
        case FETCH_CUSTOMER:
            return { ...state, customer: action.payload.customer };
        case CREATE:
            return { ...state, customers: [...state.customers, action.payload] };
        case LIKE:
            return { ...state, customers: state.customers.map((customer) => customer._id === action.payload._id ? action.payload : customer) };
        case COMMENT:
            return { ...state, customers: state.customers.map((customer) => customer._id === action.payload._id ? action.payload : customer) };
        case UPDATE:
            return { ...state, customers: state.customers.map((customer) => customer._id === action.payload._id ? action.payload : customer) };
        case DELETE:
            return { ...state, customers: state.customers.filter((customer) => customer._id !== action.payload) };
        default:
            return state;
    }
}