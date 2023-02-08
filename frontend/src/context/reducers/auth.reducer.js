const authReducer = (state, { payload, type }) => {
  switch (type) {
    case "SIGNUP_IN_PROGRESS":
    case "LOGIN_IN_PROGRESS":
      return {
        ...state,
        auth: {
          ...state.auth,
          inProgress: true,
        },
      };
    case "SIGNUP_SUCCESS":
    case "LOGIN_SUCCESS":
      return {
        ...state,
        auth: {
          ...state.auth,
          inProgress: false,
          data: { ...payload },
        },
      };
    case "SIGNUP_ERROR":
    case "LOGIN_ERROR":
      return {
        ...state,
        auth: {
          ...state.auth,
          inProgress: false,
          error: payload,
        },
      };
    default:
      return state;
  }
};
export default authReducer;
