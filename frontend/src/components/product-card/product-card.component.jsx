import React from 'react';

import './product-card.styles.css';
const ProductCard = ({ name, description, price, imgURL, adminMode }) => {
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
          {!adminMode ? (
            <a href="#" className="btn btn-primary">
              Agregar al carrito
            </a>
          ) : (
            <div
              className="btn-toolbar"
              role="toolbar"
              aria-label="Toolbar with button groups"
            >
              <div
                className="btn-group mr-2"
                role="group"
                aria-label="First group"
              >
                <button type="button" className="btn btn-secondary">
                  Editar
                </button>
              </div>
              <div
                className="btn-group mr-2"
                role="group"
                aria-label="Second group"
              >
                <button type="button" className="btn btn-secondary">
                  Eliminar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductCard;
