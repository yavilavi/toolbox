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

export const fetchTexts = () => (dispatch) => {
  serverPetition.get('texts').then(({ data }) => {
    const payload = data.map((t) => ({
      title: t.title,
      id: t.id,
    }));
    dispatch({
      type: actionTypes.FETCH_TEXTS,
      payload,
    });
  });
};
