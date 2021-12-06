import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { MdEdit } from "react-icons/md";
import MvtForm from "./MvtForm";

const MvtModalEdit = ({ balance, mvt, editMvt }) => {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const hideModal = () => {
    handleClose();
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        <MdEdit />
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <MvtForm
            balance={balance} //Objeto tipo modelo balance que esta en el App para que el saldo se pueda validar en los gastos
            editMvt={editMvt} //Metodo que controla la edición (Está en el App)
            editedMvt={mvt} //Envia el objeto (Modelo mvt) que se está editando / Elemento que se seleccionó en la lista derecha para editar
            hideModal={hideModal} //Metodo que oculta el modal para que pueda ser llamado desde el Formulario en modo edición y se pueda ocultar automaticamente el modal al guardar
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default MvtModalEdit;
