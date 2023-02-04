import React from 'react';
import Container from 'react-bootstrap/Container';
import ProductList from '../../../components/product-list/product-list.component';

const AdminProducts = () => {
  return (
    <>
      <Container className="conatiner-fluid">
        <Container>
          <div>Agregar productos</div>
        </Container>
        <ProductList adminMode={true} />
      </Container>
    </>
  );
};

export default AdminProducts;
