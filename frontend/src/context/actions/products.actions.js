import axios from '../../api/axios';
import { axiosPrivate } from '../../api/axios';

export const getProducts = (query) => async (dispatch) => {
  const queryString = Object.entries(query)
    .reduce((acc, q) => {
      return (acc += `${q[0]}=${q[1]}&`);
    }, '?')
    .replace(/&$/i, '');

  dispatch({
    type: 'LOADING_PRODUCTS',
  });
  try {
    const response = await axios.get(`/product/${queryString}`);
    dispatch({
      type: 'LOADING_SUCCESS',
      payload: response.data,
    });
  } catch (err) {
    if (!err?.response) {
      console.log('No hay respuesta del servidor'); //Seria conveniente borrar este if??????
    } else {
      console.log(err);
    }
    dispatch({
      type: 'LOADING_ERROR',
      payload: err.response
        ? err.response.data
        : 'No hay respuesta del servidor',
    });
  }
};

export const addProduct =
  ({ name, description, price, imgURL, quantity }) =>
  async (dispatch) => {
    dispatch({
      type: 'SAVING_PRODUCT_IN_PROGRESS',
    });

    try {
      const response = await axiosPrivate.post(
        '/product',
        { name, description, price, imgURL, quantity },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
      dispatch({
        type: 'SAVING_PRODUCT_SUCCESS',
        payload: { ...response.data },
      });
    } catch (err) {
      if (!err?.response) {
        console.log('No hay respuesta del servidor'); //Seria conveniente borrar este if??????
      } else {
        console.log(err);
      }
      dispatch({
        type: 'SAVING_PRODUCT_ERROR',
        payload: err.response
          ? err.response.data
          : 'No hay respuesta del servidor',
      });
    }
  };
