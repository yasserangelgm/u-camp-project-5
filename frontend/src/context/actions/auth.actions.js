import axios from '../../api/axios';

export const signup =
  ({ name, lastname, email, password }) =>
  async (dispatch) => {
    dispatch({
      type: 'SIGNUP_IN_PROGRESS',
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
        type: 'SIGNUP_SUCCESS',
        payload: response.data,
      });
    } catch (err) {
      const errorPayload = err?.response
        ? err.response.data
        : { err: 'No hay respuesta del servidor' };

      if (!err?.response) {
        console.log('No hay respuesta del servidor'); //Seria conveniente borrar este if??????
      } else {
        console.log(err);
      }
      dispatch({
        type: 'SIGNUP_ERROR',
        payload: errorPayload,
      });
    }
  };
