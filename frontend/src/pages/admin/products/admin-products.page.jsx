import { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import ProductList from '../../../components/product-list/product-list.component';
import { getProducts } from '../../../context/actions/products.actions';
import useProduct from '../../../hooks/useProduct';

const AdminProducts = () => {
  const {
    productsState: { products },
    productDispatch,
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
          <ProductList adminMode={true} products={products} />
        </Container>
      )}
    </>
  );
};

export default AdminProducts;
