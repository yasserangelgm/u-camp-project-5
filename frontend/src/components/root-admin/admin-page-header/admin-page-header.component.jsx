const AdminPageHeader = ({
  pageTittle,
  handleSetShow,
  handleSetMode,
  handleSetproductId,
}) => {
  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">{pageTittle}</h1>
        <div className="btn-toolbar mb-2 mb-md-0">
          <div className="btn-group me-2">
            <button
              type="button"
              className="btn btn-sm btn-outline-secondary"
              onClick={() => {
                handleSetShow(true);
                handleSetMode(0);
                handleSetproductId(null);
              }}
            >
              Agregar
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPageHeader;
