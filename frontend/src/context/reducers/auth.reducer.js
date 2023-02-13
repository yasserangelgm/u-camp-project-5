const authReducer = (state, { payload, type }) => {
  switch (type) {
    case 'SIGNUP_IN_PROGRESS':
    case 'LOGIN_IN_PROGRESS':
    case 'GET_AUTH_IN_PROGRESS':
    case 'UPDATE_USER_IN_PROGRESS':
      return {
        ...state,
        auth: {
          ...state.auth,
          inProgress: true,
        },
      };
    case 'SIGNUP_SUCCESS':
    case 'LOGIN_SUCCESS':
    case 'GET_AUTH_SUCCESS':
    case 'UPDATE_USER_SUCCESS':
      return {
        ...state,
        auth: {
          ...state.auth,
          inProgress: false,
          data: { ...payload },
        },
      };
    case 'SIGNUP_ERROR':
    case 'LOGIN_ERROR':
    case 'GET_AUTH_ERROR':
    case 'UPDATE_USER_ERROR':
      return {
        ...state,
        auth: {
          ...state.auth,
          inProgress: false,
          error: payload,
        },
      };

    case 'LOGOUT_SUCCESS':
      return {
        ...state,
        auth: {
          inProgress: false,
          data: null,
          error: null,
        },
      };
    default:
      return state;
  }
};
export default authReducer;
