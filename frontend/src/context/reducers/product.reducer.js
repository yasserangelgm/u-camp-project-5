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
    case 'UPDATING_PRODUCT_IN_PROGRESS':
    case 'DELETING_PRODUCT_IN_PROGRESS':
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
    case 'UPDATING_PRODUCT_ERROR':
    case 'DELETING_PRODUCT_ERROR':
      return {
        ...state,
        products: {
          ...state.products,
          isLoading: false,
          error: payload,
        },
      };

    case 'UPDATING_PRODUCT_SUCCESS':
      return {
        products: {
          data: {
            products: state.products.data.products.map((p) => {
              if (p._id === payload._id) return payload;
              else return p;
            }),
          },
          isLoading: false,
          error: null,
        },
      };

    case 'DELETING_PRODUCT_SUCCESS':
      return {
        products: {
          data: {
            products: state.products.data.products.filter(
              (p) => p._id !== payload._id
            ),
          },
          isLoading: false,
          error: null,
        },
      };

    default:
      return state;
  }
};
export default productReducer;
