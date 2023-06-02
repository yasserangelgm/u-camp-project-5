import { createContext, useReducer } from 'react';

import productInitialState from '../initialStates/productInitialState';
import productReducer from '../reducers/product.reducer';

const ProductContext = createContext({});

export const ProductProvider = ({ children }) => {
  const [productsState, productDispatch] = useReducer(
    productReducer,
    productInitialState
  );

  return (
    <ProductContext.Provider value={{ productsState, productDispatch }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;
