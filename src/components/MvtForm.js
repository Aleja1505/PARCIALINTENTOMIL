import React, { useState, useRef } from "react";
import {
  Form,
  Button,
  Card,
  InputGroup,
  Row,
  Col,
  FormControl,
} from "react-bootstrap";
import MvtModal from "./MvtModal";
import { v4 as uuidv4 } from "uuid";

const MvtForm = ({ balance, addMvt, editMvt, editedMvt, hideModal }) => {
  //Referencia para poder llamar metodos en componentes hijos
  const childRef = useRef();

  //Use State
  const [mvt, setMvt] = useState({
    id: editedMvt?.id ?? "",
    typeMvt: editedMvt?.typeMvt ?? "Ingreso",
    name: editedMvt?.name ?? "",
    qty: editedMvt?.qty ?? 0,
  });

  //Eventos
  const handleInputChange = (e) => {
    setMvt({ ...mvt, [e.target.name]: e.target.value }); //Se captura el dato del usuario y se lleva al modelo (mvt) de acuerdo al "name" del control que detona el evento
  };
  //Intl.NumberFormat().format(number));
  //("de-DE", {style: "currency", currency: "EUR"}).
  //maximumFractionDigits
  //Intl.NumberFormat("en-US",{style:"currency",currency: "USD",minimumFractionDigits:2,})
  const handleInputQtyChange = (e) => {
    setMvt({ ...mvt, qty: parseFloat(e.target.value) }); //Se captura el dato de la cantidad $ y se lleva al modelo (mvt) en el campo qty haciendo antes el parseo a float
  };

  //Evento para el boton cancelar
  const handleCancelClick = (e) => {
    setMvt({ ...mvt, typeMvt: "Ingreso", name: "", qty: 0 }); //limpiar formulario
  };

  //Evento para el boton guardar que es el principal que se encarga de validar y posteriormente guardar los cambios (ingreso o edición)
  const handleSubmit = (e) => {
    e.preventDefault();

    //Se realizan las validaciones
    let validationErrors = "";

    if (!mvt.name.trim()) {
      validationErrors += " - El nombre es obligatorio.";
    }

    if (mvt.qty <= 0) {
      validationErrors += " - La cantidad debe ser mayor que cero.";
    }

    if (
      mvt.typeMvt === "Gasto" &&
      parseFloat(mvt.qty) > parseFloat(balance.finalBalance)
    ) {
      validationErrors +=
        " - No cuenta con el suficiente saldo para realizar este movimiento.";
    }

    if (validationErrors.trim() !== "") {
      ////////////////////////////////////
      //Si la variable validationErrors NO está vacía es porque hay errores de validacion y se debe mostrar un mensaje indicando el error

      childRef.current.showMessageModal("Error", validationErrors); //Se hace llamado a la función del componente hijo del modal que se encarga de mostrar un mensaje con el resumen de errores
    } else {
      ////////////////////////////////////
      //Si la variable validationErrors está vacía es porque NO hay errores de validacion y se puede realizar el guardado

      if (editedMvt) {
        /////////////////////////////////////////////////////////////////////////////////////////////
        //Si la variable editedMvt está diferente de null es porque se está realizando una edición (Llamado desde la lista boton editar)

        editMvt(mvt); //Enviar al App.js
        hideModal();
      } else {
        /////////////////////////////////////////////////////////////////////////////////////////////
        //Si entra acá es porque se está agregando un nuevo registro

        addMvt({ ...mvt, id: uuidv4() }); //establecer el ID y enviar al App.js (Llamado desde el formulario de la izquierda)
      }

      setMvt({ ...mvt, typeMvt: "Ingreso", name: "", qty: 0 }); //limpiar formulario

    //llevar la variable typeMVt para poder personalizar el mensaje en la ventana modal
    childRef.current.showMessageModal(
      "Registro exitoso",
       mvt.typeMvt + " guardado correctamente.",
    );
    }
  };

  return (
    <Card>
      <Card.Header>Registro</Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group as={Row} className="mt-2">
            <Form.Label column sm="5">
              Tipo de Movimiento:
            </Form.Label>
            <Col sm="6">
              <Form.Control
                as="select"
                name="typeMvt"
                onChange={handleInputChange}
                value={mvt.typeMvt}
              >
                <option>Ingreso</option>
                <option>Gasto</option>
              </Form.Control>
            </Col>

            <Form.Label column sm="5" className="mt-4">
              Nombre:
            </Form.Label>
            <Col sm="6">
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text className="mt-4">N</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  sm="5"
                  className="mt-4"
                  aria-label="Amount (to the nearest dollar)"
                  name="name"
                  value={mvt.name}
                  onChange={handleInputChange}
                />
              </InputGroup>
            </Col>

            <Form.Label column sm="5" className="mt-4">
              Cantidad:
            </Form.Label>
            <Col sm="6">
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text className="mt-4">$</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  sm="5"
                  className="mt-4"
                  aria-label="Amount (to the nearest dollar)"
                  type="number"
                  name="qty"
                  value={mvt.qty}
                  onChange={handleInputQtyChange}
                />
              </InputGroup>
            </Col>
          </Form.Group>
          <Button
            className="ml-5"
            variant="secondary"
            onClick={handleCancelClick}
          >
            Cancelar
          </Button>
          <MvtModal ref={childRef} />
          <Button className="ml-5" variant="info" type="submit">
            {editedMvt ? "Editar Movimiento" : "Agregar Movimiento"}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default MvtForm;
