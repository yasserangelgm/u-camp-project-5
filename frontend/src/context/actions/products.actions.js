import axios from '../../api/axios';

export const getProducts = () => async (dispatch) => {
  dispatch({
    type: 'LOADING_PRODUCTS',
  });
  try {
    const response = await axios.get('/product/');

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
