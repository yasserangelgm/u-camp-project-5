import { useContext } from 'react';
import ProductProvider from '../context/providers/productProvider';

const useProduct = () => {
  return useContext(ProductProvider);
};

export default useProduct;
