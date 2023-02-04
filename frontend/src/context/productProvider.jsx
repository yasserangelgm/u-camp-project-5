import { createContext, useReducer } from 'react';
/* import axios from '../../api/axios'; */
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import productInitialState from '../initialStates/productInitialState';
import productReducer from '../reducers/product.reducer';

const ProductContext = createContext({});

export const ProductProvider = ({ children }) => {
  const [productsState, productDispatch] = useReducer(
    productReducer,
    productInitialState
  );

  /* const getProducts = async () =>{
        try{
            const response = await axios.get('/product/');

        }catch (error){

        }
    } */

  return (
    <ProductContext.Provider value={{ productsState, productDispatch }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;
