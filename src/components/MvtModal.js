import React, { forwardRef, useImperativeHandle, useState } from "react";
import { Button, Modal } from "react-bootstrap";

const MvtModal = forwardRef((props, ref) => {
  const [show, setShow] = useState(false);

  const [mvtModal, setMvtModal] = useState({
    modalTitle: "",
    modalBody: "",
  });

  //const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  // The component instance will be extended
  // with whatever you return from the callback passed
  // as the second argument
  //Permite incribir metodos que se pueden consumir desde el componente padre usando "useRef"
  useImperativeHandle(ref, () => ({
    showMessageModal(title, body) {
      setMvtModal({ modalTitle: title, modalBody: body });
      setShow(true);
    },
  }));

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{mvtModal.modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{mvtModal.modalBody}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
});

export default MvtModal;
