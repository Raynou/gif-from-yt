const FullScreenModal = () => {
  return (
    <div className="fullscreen-modal">
      <div className="modal-backdrop" />
      <div className="modal-content">
        <span>Cargando...</span>
        {/* Puedes meter un spinner aquí */}
      </div>
    </div>
  );
};

export default FullScreenModal;
