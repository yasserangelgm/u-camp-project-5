import React from 'react';

import './product-card.styles.css';
const ProductCard = ({ name, description, price, imgURL }) => {
  return (
    <>
      <div className="card">
        <img
          src={imgURL}
          className="card-img-top card-image"
          alt={description}
        />
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className="card-text">{description}</p>
          <p className="price">{`$${price}`}</p>
          <a href="#" className="btn btn-primary">
            Agregar al carrito
          </a>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
