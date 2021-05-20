import axios from 'axios';

import dotenv from 'dotenv';
import * as actionTypes from './actionTypes';

dotenv.config();
const BASE_URL = 'http://localhost:3001/api/';

export const serverPetition = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL || BASE_URL,
  headers: {
    'Access-Control-Allow-Origin': 'localhost:3001',
  },
});

export const setContent = (content) => (dispatch) => {
  dispatch({
    type: actionTypes.SET_CONTENT,
    payload: content,
  });
};

export const saveText = (content) => (dispatch) => {
  serverPetition
    .post('texts', { content })
    .then(({ data }) => {
      if (data.success) {
        dispatch({
          type: actionTypes.SAVE_TEXT,
          payload: content,
        });
      }
    })
    .catch(console.log);
};

export const fetchTexts = (dispatch) => {
  serverPetition
    .get('texts')
    .then(({ data }) => {
      const payload = data;
      dispatch({
        type: actionTypes.FETCH_TEXTS,
        payload,
      });
    })
    .catch((e) => console.log(e.message));
};

export const deleteText = (id) => (dispatch) => {
  serverPetition
    .delete('texts', { data: { id } })
    .then(({ status }) => {
      if (status === 204) {
        fetchTexts(dispatch);
      } else {
        console.log('error');
      }
    })
    .catch((e) => console.log(e.message));
};

export const editText = (id, content) => (dispatch) => {
  serverPetition
    .put('texts', { id, content })
    .then(({ data }) => {
      if (data.success) {
        console.log(data);
        // dispatch({
        //   type: actionTypes.EDIT_TEXT,
        //   payload: content,
        // });
      }
    })
    .catch(console.log);
};
