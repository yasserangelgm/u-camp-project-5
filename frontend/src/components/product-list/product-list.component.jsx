import useProduct from '../../hooks/useProduct';
import { useEffect } from 'react';
import { getProducts } from '../../actions/products.actions';
import { Container } from 'react-bootstrap';

const ProductList = () => {
  const {
    productsState: { products },
    productDispatch,
  } = useProduct();

  console.log(products);

  useEffect(() => {
    getProducts()(productDispatch);
  }, []);
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
                <div className="col col-6" key={item.id}>
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
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Container>
          {/* 
            
              
                
                  
                  
                    
                  </div>
                </div>
              </div>
              <div className="col col-6">
                <div className="card h-100">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/new/standard/city/042.webp"
                    className="card-img-top"
                    alt="Palm Springs Road"
                  />
                  <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">This is a short card.</p>
                  </div>
                </div>
              </div>
              <div className="col col-6">
                <div className="card h-100">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/new/standard/city/043.webp"
                    className="card-img-top"
                    alt="Los Angeles Skyscrapers"
                  />
                  <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">
                      This is a longer card with supporting text below as a
                      natural lead-in to additional content.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col col-6">
                <div className="card h-100">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/new/standard/city/044.webp"
                    className="card-img-top"
                    alt="Skyscrapers"
                  />
                  <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">
                      This is a longer card with supporting text below as a
                      natural lead-in to additional content. This content is a
                      little bit longer.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Container> */}
        </Container>
      )}
    </div>
  );
};

export default ProductList;
