import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import ProductForm from '../../../components/product-form/product-form.component';
import ProductList from '../../../components/product-list/product-list.component';
import { getProducts } from '../../../context/actions/products.actions';
import useProduct from '../../../hooks/useProduct';
import AdminPageHeader from '../../../components/root-admin/admin-page-header/admin-page-header.component';
import useForm from '../../../hooks/useForm';

const AdminProducts = () => {
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState(0);
  const [productId, setProductId] = useState(null);
  const handleClose = () => setShow(false);
  /*  const handleShow = () => setShow(true); */

  const {
    productsState: { products },
    productDispatch,
    productsState,
  } = useProduct();

  useEffect(() => {
    getProducts({})(productDispatch);
  }, []);

  console.log('PRODUCT STATE', productsState);
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
        form={useForm()}
      />
    </>
  );
};

export default AdminProducts;
