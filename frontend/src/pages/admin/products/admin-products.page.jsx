import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import ProductForm from '../../../components/product-form/product-form.component';
import ProductList from '../../../components/product-list/product-list.component';
import { getProducts } from '../../../context/actions/products.actions';
import useProduct from '../../../hooks/useProduct';
import AdminPageHeader from '../../../components/root-admin/admin-page-header/admin-page-header.component';
import Button from 'react-bootstrap/Button';

const AdminProducts = () => {
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState(0);
  const [productId, setProductId] = useState(null);
  const handleClose = () => setShow(false);
  /*  const handleShow = () => setShow(true); */

  const {
    productsState: { products },
    productDispatch,
  } = useProduct();

  useEffect(() => {
    getProducts({})(productDispatch);
  }, []);

  return (
    <>
      <AdminPageHeader
        pageTittle="Productos"
        handleSetShow={setShow}
        handleSetMode={setMode}
        handleSetproductId={setProductId}
      />
      {products?.isLoading || !products.data ? (
        <div className="spinner-border" role="status">
          <span className="sr-only"></span>
        </div>
      ) : (
        <Container className="container-fluid mw-100">
          <ProductList
            adminMode={true}
            products={products}
            handleSetShow={setShow}
            handleSetMode={setMode}
            handleSetproductId={setProductId}
          />
        </Container>
      )}
      <ProductForm
        show={show}
        onHide={handleClose}
        mode={mode}
        productId={productId}
      />
    </>
  );
};

export default AdminProducts;
