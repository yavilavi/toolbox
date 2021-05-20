import * as actionType from './actionTypes';

const initialState = {
  textContent: '',
  textsList: [],
};
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.SET_CONTENT:
      return { ...state, textContent: action.payload };
    case actionType.FETCH_TEXTS:
      return { ...state, textsList: action.payload };
    default:
      return { ...state };
  }
};

export default rootReducer;
