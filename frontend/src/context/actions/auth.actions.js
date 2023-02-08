import axios from "../../api/axios";

export const signup =
  ({ name, lastname, email, password }) =>
  async (dispatch) => {
    dispatch({
      type: "LOGIN_IN_PROGRESS",
    });
    try {
      const response = await axios.post(
        "/signup",
        { name, lastname, email, password },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: response.data,
      });
    } catch (err) {
      if (!err?.response) {
        console.log("No hay respuesta del servidor"); //Seria conveniente borrar este if??????
      } else {
        console.log(err);
      }
      dispatch({
        type: "LOGIN_ERROR",
        payload: err.response
          ? err.response.data
          : "No hay respuesta del servidor",
      });
    }
  };

export const signin =
  ({ email, password }) =>
  async (dispatch) => {
    dispatch({
      type: "SIGNUP_IN_PROGRESS",
    });
    try {
      const response = await axios.post(
        "/signin",
        { email, password },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      localStorage.setItem("accesToken", response.data.accessToken);
      dispatch({
        type: "SIGNUP_SUCCESS",
        payload: response.data,
      });
    } catch (err) {
      if (!err?.response) {
        console.log("No hay respuesta del servidor"); //Seria conveniente borrar este if??????
      } else {
        console.log(err);
      }
      dispatch({
        type: "LOGIN_ERROR",
        payload: err.response
          ? err.response.data
          : "No hay respuesta del servidor",
      });
    }
  };

/* 
   try {
      const response = await axios.post(
        "/signin",
        {
          email: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const accessToken = response?.data.accessToken;
      const role = response?.data.user.role;

      setAuth({ role, accessToken }); //-------------------> Aqui se setea el accesToken a toda la app
      setCurrentUser(response?.data.user);

      setEmail("");
      setPassword(""); //TODO Alert success

      navigate(from, { replace: true });
    } catch (err) {
      if (err?.response) {
        console.log("No hay respuesta del servidor"); //TODO manejar los distintos tipos de errores
      } else {
        console.log(err);
      }
    }
  
  */
