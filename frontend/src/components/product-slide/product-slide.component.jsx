import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import ProductCard from '../product-card/product-card.component';
import { Container } from 'react-bootstrap';

const ProductSlide = ({ products }) => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 1600 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 1600, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const productList = products?.data?.products?.map((item) => (
    <ProductCard
      key={item._id}
      name={item.name}
      description={item.description}
      price={item.price}
      imgURL={item.imgURL}
    />
  ));

  return (
    <>
      {products?.isLoading || !products.data ? (
        <div className="spinner-border" role="status">
          <span className="sr-only"></span>
        </div>
      ) : (
        <Container className="container-fluid mw-100">
          <Container className="container-sm mw-100 px-0">
            <Carousel responsive={responsive}>{productList}</Carousel>
          </Container>
        </Container>
      )}
    </>
  );
};

export default ProductSlide;
