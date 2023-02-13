import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';

import ProductList from '../../components/product-list/product-list.component';
import { getProducts } from '../../context/actions/products.actions';
import useProduct from '../../hooks/useProduct';
const Shop = () => {
  const [productId, setProductId] = useState(null);

  const {
    productsState: { products },
    productDispatch,
    productsState,
  } = useProduct();

  useEffect(() => {
    getProducts({})(productDispatch);
  }, []);

  return (
    <>
      {products?.isLoading || !products.data ? (
        <div className="spinner-border" role="status">
          <span className="sr-only"></span>
        </div>
      ) : (
        <Container className="container-fluid mw-100">
          <ProductList adminMode={false} handleSetproductId={setProductId} />
        </Container>
      )}
    </>
  );
};

export default Shop;
