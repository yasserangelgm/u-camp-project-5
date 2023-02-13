import { useEffect } from 'react';
import useProduct from '../../hooks/useProduct';
import ProductCard from '../product-card/product-card.component';
import './product-list.styles.css';
const ProductList = ({
  adminMode,
  handleSetShow = null,
  handleSetMode = null,
  handleSetproductId,
}) => {
  const {
    productsState: { products },
  } = useProduct();

  console.log(products);

  return (
    <>
      <section className="product-list-container" id="product-list-container">
        <ul>
          {products?.data?.products?.map((item) => (
            <li key={item._id}>
              <ProductCard
                name={item.name}
                description={item.description}
                price={item.price}
                imgURL={item.imgURL}
                adminMode={adminMode}
                handleSetShow={handleSetShow}
                handleSetMode={handleSetMode}
                handleSetproductId={handleSetproductId}
                productId={item._id}
              />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};

export default ProductList;
