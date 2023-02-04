import axios from '../api/axios';

export const getProducts = () => async (dispatch) => {
  dispatch({
    type: 'LOADING_PRODUCTS',
  });

  try {
    const response = await axios.get('/product/');
    console.log(response);
    dispatch({
      type: 'LOADING_SUCCESS',
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: 'PRODUCT_ERROR',
      payload: error.response.data,
    });
    console.log(error);
  }
};
