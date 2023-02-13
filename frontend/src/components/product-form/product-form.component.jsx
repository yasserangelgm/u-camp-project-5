import Modal from 'react-bootstrap/Modal';
import useProduct from '../../hooks/useProduct';

import {
  addProduct,
  deleteProduct,
  updateProduct,
} from '../../context/actions/products.actions';
import { useEffect, useState } from 'react';

const ProductForm = ({
  show,
  onHide,
  mode,
  productId,
  form: { onChange, form, setForm },
}) => {
  const [currentProduct, setCurrentProduct] = useState();
  const {
    productsState: {
      products: { loading, error, data },
    },
    productDispatch,
  } = useProduct();

  useEffect(() => {
    setCurrentProduct(data?.products?.find((p) => p._id === productId));
    setForm(currentProduct);
  }, [currentProduct, productId]);

  const handleSubmit = async (e) => {
    console.log('SUBMIT mode', mode);
    e.preventDefault();
    if (mode === 0) {
      addProduct(form)(productDispatch);
    } else if (mode === 1) {
      updateProduct(form)(productDispatch);
    } else if (mode === 2) {
      deleteProduct(form)(productDispatch);
    }
    onHide();
  };

  return (
    <>
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>
            {mode === 0
              ? 'Agregar producto'
              : mode === 1
              ? 'Editar producto'
              : 'Eliminar producto'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            {/* {productId && <h6>{currentProduct?._id}</h6>} */}
            {console.log('CURRENT FORM JSX', form)}
            <div className="mb-3">
              {/* <label className="form-label">Nombre del producto</label> */}
              <input
                className="form-control"
                type="text"
                placeholder="Escriba el nombre del producto"
                autoFocus
                id="name"
                name="name"
                autoComplete="off"
                required
                onChange={onChange}
                value={form?.name || ''}
                disabled={mode === 2 ? true : null}
              />
            </div>
            <div className="mb-3">
              {/* <label className="form-label">Descripción</label> */}
              <input
                className="form-control"
                type="text"
                placeholder="Escriba la descripción"
                id="description"
                name="description"
                autoComplete="off"
                required
                onChange={onChange}
                value={form?.description || ''}
                disabled={mode === 2 ? true : null}
              />
            </div>
            <div className="mb-3">
              {/* <label className="form-label">Precio</label> */}
              <input
                className="form-control"
                type="number"
                placeholder="Escriba el precio"
                id="price"
                name="price"
                autoComplete="off"
                required
                onChange={onChange}
                value={form?.price || ''}
                disabled={mode === 2 ? true : null}
              />
            </div>
            <div className="mb-3">
              {/* <label className="form-label">Precio</label> */}
              <input
                className="form-control"
                type="text"
                placeholder="Ingrese imagen del producto"
                id="imgURL"
                name="imgURL"
                autoComplete="off"
                required
                onChange={onChange}
                value={form?.imgURL || ''}
                disabled={mode === 2 ? true : null}
              />
            </div>
            <div className="mb-3">
              {/* <label className="form-label">Precio</label> */}
              <input
                className="form-control"
                type="number"
                placeholder="Cantidad"
                id="quantity"
                name="quantity"
                autoComplete="off"
                required
                onChange={onChange}
                value={form?.quantity || ''}
                disabled={mode === 2 ? true : null}
              />
            </div>
          </form>
        </Modal.Body>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onHide}>
            Cancelar
          </button>
          <button className="btn btn-primary" onClick={handleSubmit}>
            {mode !== 2 ? 'Guardar' : 'Eliminar'}
          </button>
        </div>
      </Modal>
    </>
  );
};

export default ProductForm;
