const userReducer = (state, { payload, type }) => {
  switch (type) {
    case 'GET_USER_IN_PROGRESS':
      return {
        ...state,
        user: {
          ...state.user,
          inProgress: true,
        },
      };

    case 'GET_USER_SUCCESS':
      return {
        ...state,
        user: {
          ...state.user,
          inProgress: false,
          data: payload,
        },
      };
    case 'GET_USER_ERROR':
      return {
        ...state,
        user: {
          ...state.user,
          inProgress: false,
          error: payload,
        },
      };
    default:
      return state;
  }
};
export default userReducer;
