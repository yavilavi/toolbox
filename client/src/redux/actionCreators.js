import axios from 'axios';

import dotenv from 'dotenv';
import * as actionTypes from './actionTypes';

dotenv.config();
const BASE_URL = 'http://localhost:3001/api/';
export const instantiateAxios = () =>
  axios.create({
    withCredentials: true,
    baseURL: process.env.REACT_APP_BACKEND_URL || BASE_URL,
    headers: {
      'Access-Control-Allow-Origin': 'localhost:3001',
      Authorization: localStorage.getItem('AUTH_TOKEN'),
    },
  });

export const setContent = (content) => (dispatch) => {
  dispatch({
    type: actionTypes.SET_CONTENT,
    payload: content,
  });
};

export const saveText = (content) => (dispatch) => {
  const serverPetition = instantiateAxios();
  serverPetition
    .post('texts', { content })
    .then(({ data }) => {
      if (data.success) {
        dispatch({
          type: actionTypes.SAVE_TEXT,
          payload: content,
        });
      }
      return data.text;
    })
    .then((text) => {
      setAlert(dispatch, true, 'Text created successfully', 'success', 'center');
      return text;
    })
    .then((text) => {
      redirect(dispatch, true, `/view-text/${text.id}`);
    })
    .catch((e) => {
      setError(e, dispatch);
    });
};

export const fetchTexts = (dispatch) => {
  const serverPetition = instantiateAxios();
  serverPetition
    .get('texts')
    .then(({ data }) => {
      const payload = data;
      dispatch({
        type: actionTypes.FETCH_TEXTS,
        payload,
      });
    })
    .catch((e) => {
      dispatch({
        type: actionTypes.FETCH_TEXTS,
        payload: [],
      });
      setError(e, dispatch);
    });
};

export const deleteText = (id) => (dispatch) => {
  const serverPetition = instantiateAxios();
  serverPetition
    .delete(`texts/${id}`)
    .then(({ status }) => {
      if (status === 204) {
        fetchTexts(dispatch);
      } else {
        throw new Error('failed');
      }
    })
    .then(() => {
      setAlert(dispatch, true, 'Your text has been deleted.', 'success');
    })
    .catch((e) => {
      setError(e, dispatch);
    });
};

export const editText = (id, content) => (dispatch) => {
  const serverPetition = instantiateAxios();
  serverPetition
    .put('texts', { id, content })
    .then(({ data }) => {
      if (data.success) {
        setAlert(dispatch, true, 'Text was saved successfully', 'success', 'center');
      }
    })
    .catch((e) => {
      setError(e, dispatch);
    });
};

export const doLogin = (userData, dispatch) => {
  const serverPetition = instantiateAxios();
  serverPetition
    .post('auth/login', userData)
    .then(({ data }) => {
      localStorage.setItem('AUTH_TOKEN', `bearer ${data.token}`);
      return data.userName;
    })
    .then((userName) => {
      setAlert(dispatch, true, 'Authenticated, redirecting..', 'success', 'center');
      return userName;
    })
    .then((userName) => {
      setFetching(dispatch, false);
      dispatch({
        type: actionTypes.SET_LOG_STATUS,
        payload: {
          isLoggedIn: true,
          authChecked: true,
        },
      });
      dispatch({
        type: actionTypes.SET_USER_NAME,
        payload: userName,
      });
      redirect(dispatch, true, '/');
    })
    .catch((e) => {
      setError(e, dispatch);
    });
};

export const doSignup = (userData, dispatch) => {
  const serverPetition = instantiateAxios();
  serverPetition
    .post('auth/signup', userData)
    .then(() => {
      setAlert(dispatch, true, 'Registration successfull, redirecting ...', 'success');
    })
    .then(() => {
      redirect(dispatch, true, '/auth/login');
    })
    .catch((e) => {
      setError(e, dispatch);
    });
};

export const doLogout = (dispatch) => {
  localStorage.removeItem('AUTH_TOKEN');
  dispatch({
    type: actionTypes.SET_LOG_STATUS,
    payload: false,
  });
  dispatch({
    type: actionTypes.FETCH_TEXTS,
    payload: [],
  });
  dispatch({
    type: actionTypes.SET_LOG_STATUS,
    payload: {
      isLoggedIn: false,
      authChecked: true,
    },
  });
  redirect(dispatch, true, '/auth/login');
};

export const checkAuth = (dispatch) => {
  const serverPetition = instantiateAxios();
  serverPetition
    .get('auth/me')
    .then(({ data }) => {
      dispatch({
        type: actionTypes.SET_LOG_STATUS,
        payload: data,
      });
    })
    .catch((e) => {
      if (e.response) {
        dispatch({
          type: actionTypes.SET_LOG_STATUS,
          payload: e.response.data,
        });
      } else {
        dispatch({
          type: actionTypes.SET_LOG_STATUS,
          payload: {
            isLoggedIn: false,
            authChecked: true,
          },
        });
      }
    });
};

export const setAlert = (
  dispatch,
  fire = false,
  message = '',
  type = 'error',
  position = 'center',
) => {
  dispatch({
    type: actionTypes.SET_ALERT,
    payload: {
      fire,
      type,
      position,
      message,
    },
  });
};

export const redirect = (dispatch, should = false, path = '') => {
  dispatch({
    type: actionTypes.REDIRECT,
    payload: {
      should,
      path,
    },
  });
};

const setError = (e, dispatch) => {
  if (e.response) {
    if (e.response.data.noLoggedIN) {
      redirect(dispatch, true, '/auth/login');
    } else {
      setAlert(dispatch, true, e.response.data.error, 'error', 'center');
    }
  } else {
    setAlert(dispatch, true, 'There was an error, please try again.', 'error', 'center');
  }
};

export const setFetching = (dispatch, status = false) => {
  dispatch({
    type: actionTypes.SET_FETCHING,
    payload: status,
  });
};

export const setSiteTitle = (dispatch, title) => {
  dispatch({
    type: actionTypes.SET_SITE_TITLE,
    payload: title,
  });
};
