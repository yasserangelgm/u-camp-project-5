import useProduct from '../../hooks/useProduct';
import { useEffect } from 'react';
import { getProducts } from '../../context/actions/products.actions';
import { Container } from 'react-bootstrap';

const ProductList = ({ adminMode, products }) => {
  console.log(products);
  return (
    <div>
      {products?.loading ? (
        <div className="spinner-border" role="status">
          <span className="sr-only"></span>
        </div>
      ) : (
        <Container className="container-fluid pt-4 mw-100">
          <Container className="container-sm mw-100 px-0">
            <div className="row row-cols-1 row-cols-md-4 g-4">
              {products?.data?.products?.map((item) => (
                <div className="col col-6" key={item._id}>
                  <div className="card h-100">
                    <img
                      src={item.imgURL}
                      className="card-img-top"
                      alt="Hollywood Sign on The Hill"
                    />
                    <div className="card-body">
                      <h5 className="card-title">{item.name}</h5>
                      <p className="card-text">{item.description}</p>
                      <p className="card-text">{item.price}</p>
                      {adminMode && (
                        <div className="d-grid gap-2 d-md-block">
                          <button className="btn btn-primary" type="button">
                            Editar
                          </button>
                          <button className="btn btn-danger" type="button">
                            Eliminar
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </Container>
      )}
    </div>
  );
};

export default ProductList;
