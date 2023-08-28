import { SET_TOKEN } from '../../actions/ActionTypes';

const initialState = null; 

const jwtTokenReducer = (state = initialState, action) => {
  console.log(action);  
  switch (action.type) {
    case SET_TOKEN:
      return action.payload;
    default:
      return state;
  }
};

export default jwtTokenReducer;
