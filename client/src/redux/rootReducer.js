import * as actionType from './actionTypes';

const initialState = {
  textContent: '',
  textsList: [],
  search: '',
};
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.SET_CONTENT:
      return { ...state, textContent: action.payload };
    case actionType.FETCH_TEXTS:
      return { ...state, textsList: [...action.payload].sort() };
    case actionType.TRIGGER_SEARCH:
      return { ...state, search: action.payload };
    default:
      return { ...state };
  }
};

export default rootReducer;
