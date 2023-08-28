import { SET_USER_DATA, CLEAR_USER_DATA, SET_USER_ERROR, USER_UPDATED,SET_COMMENTS } from '../../actions/ActionTypes';

const initialState = {
    id: null,
    token: null,
    firstName: null,
    lastName: null,
    email: null,
    description: null,
    role: "USER",
};


 const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload,
                error: null
            };
        case USER_UPDATED:
            return {
                ...state,
                ...action.payload,
                error: null
            };
        case CLEAR_USER_DATA:
            return {
                ...initialState
            };
        case SET_USER_ERROR:
            return {
                ...state,
                error: action.payload
            };
        case 'UPDATE_USER_REQUEST':
            return { ...state, isLoading: true, error: null };
        case 'UPDATE_USER_SUCCESS':
            return { ...state, user: action.payload, isLoading: false };
        case 'UPDATE_USER_FAILURE':
            return { ...state, isLoading: false, error: action.error };
        default:
            return state;
    }
};
export default userReducer;
