
const initialState = {
    data: [],     
    isLoading: false,
    error: null
};

const messagesReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_COMMENTS_REQUEST':
            return {
                ...state,
                isLoading: true,
                error: null
            };
        case 'FETCH_COMMENTS_SUCCESS':
            return {
                ...state,
                data: action.payload,
                isLoading: false
            };
        case 'FETCH_COMMENTS_FAILURE':
            return {
                ...state,
                isLoading: false,
                error: action.error
            };
        case 'POST_COMMENT_REQUEST':
            return {
                ...state,
                isLoading: true,
                error: null
            };
        case 'POST_COMMENT_SUCCESS':
            return {
                ...state,
                data: [action.payload, ...state.data],  
                isLoading: false
            };
        case 'POST_COMMENT_FAILURE':
            return {
                ...state,
                isLoading: false,
                error: action.error
            };
        default:
            return state;
    }
};

export default messagesReducer;
