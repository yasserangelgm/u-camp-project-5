import useProduct from '../../hooks/useProduct';
import { useEffect } from 'react';
import { getProducts } from '../../context/actions/products.actions';
import { Container } from 'react-bootstrap';

const ProductSlide = ({ adminMode }) => {
  const {
    productsState: { products },
    productDispatch,
  } = useProduct();

  useEffect(() => {
    getProducts()(productDispatch);
  }, []);
  return <></>;
};

export default ProductSlide;
