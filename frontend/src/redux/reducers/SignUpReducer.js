 const signUpReducer = (state = {}, action) => {
    switch (action.type) {
      case 'SIGN_UP_SUCCESS':
        return { ...state, signUpSuccess: true };
      case 'SIGN_UP_FAILURE':
        return { ...state, signUpError: action.payload };
      default:
        return state;
    }
  };
  export default signUpReducer;
  