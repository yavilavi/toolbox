import * as actionType from './actionTypes';

const initialState = {
  textContent: '',
  textsList: [],
  search: '',
  alert: {
    fire: false,
    message: '',
    type: 'error',
    position: 'center',
  },
  redirection: {
    should: false,
    path: '',
  },
  isInitializing: false,
  isFetching: false,
  session: {
    isLoggedIn: false,
    authChecked: false,
  },
  isLoggedIn: false,
  userName: '',
  siteTitle: '',
};
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.SET_CONTENT:
      return { ...state, textContent: action.payload };
    case actionType.FETCH_TEXTS:
      return { ...state, textsList: [...action.payload].sort() };
    case actionType.SET_ALERT:
      return { ...state, alert: action.payload };
    case actionType.REDIRECT:
      return { ...state, redirection: action.payload };
    case actionType.SET_INITIALIZING:
      return { ...state, isInitializing: action.payload };
    case actionType.SET_FETCHING:
      return { ...state, isFetching: action.payload };
    case actionType.SET_SITE_TITLE:
      return { ...state, siteTitle: action.payload };
    case actionType.SET_LOG_STATUS:
      return { ...state, session: action.payload };
    case actionType.SET_USER_NAME:
      return { ...state, userName: action.payload };
    case actionType.TRIGGER_SEARCH:
      return { ...state, search: action.payload };
    default:
      return { ...state };
  }
};

export default rootReducer;
