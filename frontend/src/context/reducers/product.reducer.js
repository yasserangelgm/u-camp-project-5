const productReducer = (state, { payload, type }) => {
  switch (type) {
    case 'LOADING_PRODUCTS':
      return {
        ...state,
        products: {
          ...state.products,
          loading: true,
        },
      };

    case 'LOADING_SUCCESS':
      return {
        ...state,
        products: {
          ...state.products,
          loading: false,
          data: payload,
        },
      };

    case 'LOADING_ERROR':
      return {
        ...state,
        products: {
          ...state.products,
          loading: false,
          error: payload,
        },
      };

    case 'SAVING_PRODUCT':
      return {
        ...state,
        addProduct: {
          ...state.addProduct,
          saving: true,
        },
      };
    default:
      return state;
  }
};
export default productReducer;
