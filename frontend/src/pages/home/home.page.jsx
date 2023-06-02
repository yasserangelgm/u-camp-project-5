import './home.styles.css';
import { Container } from 'react-bootstrap';
import ProductList from '../../components/product-list/product-list.component';
import ProductSlide from '../../components/product-slide/product-slide.component';
import useProduct from '../../hooks/useProduct';
import { getProducts } from '../../context/actions/products.actions';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const {
    productsState: { products },
    productDispatch,
  } = useProduct();

  useEffect(() => {
    getProducts({ limit: 4, sort: -1 })(productDispatch);
  }, []);

  return (
    <main>
      <Container className="container-fluid  hero mw-100">
        <Container className="container-fluid h-100 mw-100 hero-image">
          <Container className="container-sm h-100">
            <div className="hero-text abs-center">
              <h1 className="text-light text-center">
                Siente el arte y la tradición
              </h1>
            </div>
          </Container>
        </Container>
      </Container>
      <Container className="container-fluid mw-100 py-4">
        <Container className="container-sm mw-100 px-0 position-relative">
          <h3 className="py-4 my-0 fs-2 tittle">Nuevos productos</h3>
          <Link to="/shop" className="btn btn-secondary p-3  end-0 rigth-link">
            Ver todos los productos
          </Link>
        </Container>
      </Container>
      {products ? (
        <ProductSlide products={products} />
      ) : (
        <div className="spinner-border" role="status">
          <span className="sr-only"></span>
        </div>
      )}
    </main>
  );
};

export default HomePage;
