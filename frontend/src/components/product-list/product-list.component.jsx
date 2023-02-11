import Container from 'react-bootstrap/Container';
import ProductCard from '../product-card/product-card.component';
import './product-list.styles.css';
const ProductList = ({ adminMode, products, handleSetShow, handleSetMode }) => {
  const productList = products?.data?.products?.map((item) => (
    <li>
      <ProductCard
        key={item._id}
        name={item.name}
        description={item.description}
        price={item.price}
        imgURL={item.imgURL}
        adminMode={adminMode}
        handleSetShow={handleSetShow}
        handleSetMode={handleSetMode}
      />
    </li>
  ));

  return (
    <>
      <section className="product-list-container" id="product-list-container">
        <ul>{productList}</ul>
      </section>
    </>
  );
};

export default ProductList;
