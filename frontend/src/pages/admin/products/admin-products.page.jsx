import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import ProductForm from '../../../components/product-form/product-form.component';
import ProductList from '../../../components/product-list/product-list.component';
import { getProducts } from '../../../context/actions/products.actions';
import useProduct from '../../../hooks/useProduct';
import Button from 'react-bootstrap/Button';

const AdminProducts = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    console.log('click');
    setShow(true);
  };

  const {
    productsState: { products },
    productDispatch,
  } = useProduct();

  useEffect(() => {
    getProducts({})(productDispatch);
  }, []);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      {products?.isLoading || !products.data ? (
        <div className="spinner-border" role="status">
          <span className="sr-only"></span>
        </div>
      ) : (
        <Container className="container-fluid mw-100">
          <ProductList adminMode={true} products={products} />
          <ProductForm show={show} onHide={handleClose} />
        </Container>
      )}
    </>
  );
};

export default AdminProducts;
