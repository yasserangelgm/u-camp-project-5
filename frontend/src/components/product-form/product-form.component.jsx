import Modal from 'react-bootstrap/Modal';
import useProduct from '../../hooks/useProduct';

import { addProduct } from '../../context/actions/products.actions';
const ProductForm = ({
  show,
  onHide,
  mode,
  productId,
  form: { onChange, form },
}) => {
  const {
    productsState: {
      products: { loading, error, data },
    },
    productDispatch,
  } = useProduct();

  const handleSubmit = async (e) => {
    e.preventDefault();
    addProduct(form)(productDispatch);
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
            {productId && <h6>{productId}</h6>}
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
                value={form.name || ''}
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
                value={form.description || ''}
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
                value={form.price || ''}
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
                value={form.imgURL || ''}
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
                value={form.quantity || ''}
              />
            </div>
          </form>
        </Modal.Body>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onHide}>
            Cancelar
          </button>
          <button className="btn btn-primary" onClick={handleSubmit}>
            {mode !== 3 ? 'Guardar' : 'Eliminar'}
          </button>
        </div>
      </Modal>
    </>
  );
};

export default ProductForm;
