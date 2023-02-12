const productReducer = (state, { payload, type }) => {
  switch (type) {
    case 'LOADING_PRODUCTS':
      return {
        ...state,
        products: {
          ...state.products,
          isLoading: true,
        },
      };

    case 'LOADING_SUCCESS':
      return {
        ...state,
        products: {
          ...state.products,
          isLoading: false,
          data: payload,
        },
      };

    case 'LOADING_ERROR':
      return {
        ...state,
        products: {
          ...state.products,
          isLoading: false,
          error: payload,
        },
      };

    case 'SAVING_PRODUCT_IN_PROGRESS':
      return {
        ...state,
        products: {
          ...state.products,
          isLoading: true,
          error: null,
        },
      };

    case 'SAVING_PRODUCT_SUCCESS':
      return {
        products: {
          ...state.products,
          data: {
            products: [payload, ...state.products.data.products],
          },
          isLoading: false,
        },
      };

    case 'SAVING_PRODUCT_ERROR':
      return {
        ...state,
        products: {
          ...state.products,
          isLoading: false,
          error: payload,
        },
      };
    default:
      return state;
  }
};
export default productReducer;
