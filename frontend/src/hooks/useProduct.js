import { useContext } from 'react';
import ProductProvider from '../context/productProvider';

const useProduct = () => {
  return useContext(ProductProvider);
};

export default useProduct;
