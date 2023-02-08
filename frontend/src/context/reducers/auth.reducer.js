const authReducer = (state, { payload, type }) => {
  switch (type) {
    case 'SIGNUP_IN_PROGRESS':
      return {
        ...state,
        auth: {
          ...state.auth,
          inProgress: true,
        },
      };
    case 'SIGNUP_SUCCESS':
      return {
        ...state,
        auth: {
          ...state.auth,
          inProgress: false,
          user: { ...payload },
        },
      };
    case 'SIGNUP_ERROR':
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
