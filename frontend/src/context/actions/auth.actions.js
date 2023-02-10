import axios from '../../api/axios';
import { axiosPrivate } from '../../api/axios';

export const signup =
  ({ name, lastname, email, password }) =>
  async (dispatch) => {
    dispatch({
      type: 'LOGIN_IN_PROGRESS',
    });
    try {
      const response = await axios.post(
        '/signup',
        { name, lastname, email, password },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: response.data,
      });
    } catch (err) {
      if (!err?.response) {
        console.log('No hay respuesta del servidor'); //Seria conveniente borrar este if??????
      } else {
        console.log(err);
      }
      dispatch({
        type: 'LOGIN_ERROR',
        payload: err.response
          ? err.response.data
          : 'No hay respuesta del servidor',
      });
    }
  };

export const signin =
  ({ email, password }) =>
  async (dispatch) => {
    dispatch({
      type: 'SIGNUP_IN_PROGRESS',
    });
    try {
      const response = await axios.post(
        '/signin',
        { email, password },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
      localStorage.setItem('accessToken', response.data.accessToken);
      dispatch({
        type: 'SIGNUP_SUCCESS',
        payload: response.data,
      });
    } catch (err) {
      if (!err?.response) {
        console.log('No hay respuesta del servidor'); //Seria conveniente borrar este if??????
      } else {
        console.log(err);
      }
      dispatch({
        type: 'LOGIN_ERROR',
        payload: err.response
          ? err.response.data
          : 'No hay respuesta del servidor',
      });
    }
  };

export const updateUser =
  ({ name, lastname, email, password }) =>
  async (dispatch) => {
    dispatch({
      type: 'UPDATE_USER_IN_PROGRESS',
    });
    try {
      const response = await axiosPrivate.put(
        '/user',
        { name, lastname, email, password },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      dispatch({
        type: 'UPDATE_USER_SUCCESS',
        payload: response.data,
      });
    } catch (err) {
      if (!err?.response) {
        console.log('No hay respuesta del servidor'); //Seria conveniente borrar este if??????
      } else {
        console.log(err);
      }
      dispatch({
        type: 'UPDATE_USER_ERROR',
        payload: err.response
          ? err.response.data
          : 'No hay respuesta del servidor',
      });
    }
  };

export const getAuth = () => async (dispatch) => {
  dispatch({
    type: 'GET_AUTH_IN_PROGRESS',
  });
  try {
    const response = await axiosPrivate.get('/user');

    dispatch({
      type: 'GET_AUTH_SUCCESS',
      payload: response.data,
    });

    console.log(response?.data);
  } catch (err) {
    if (!err?.response) {
      console.log('No hay respuesta del servidor'); //Seria conveniente borrar este if??????
    } else {
      console.log(err);
    }
    dispatch({
      type: 'GET_AUTH_ERROR',
      payload: err.response
        ? err.response.data
        : 'No hay respuesta del servidor',
    });
  }
};
