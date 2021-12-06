import React from "react";
import {
  Badge,
  Card,
  Col,
  Container,
  Form,
  FormControl,
  InputGroup,
  Table,
} from "react-bootstrap";
import MvtItem from "./MvtItem";

const MvtList = ({
  balance,
  mvts,
  establishSearchFilter,
  establishTypeMvtFilter,
  removeMvt,
  editMvt,
}) => {
  const handleSearchInputChange = (e) => {
    establishSearchFilter(e.target.value);
  };

  const handleCheckboxesClick = (e) => {
    establishTypeMvtFilter(e.target.value);
  };

  return (
    <Card>
      <Card.Header>
        Listado Movimientos
        <div className="float-right">
          <Badge variant="success">{mvts.length}</Badge>
        </div>
      </Card.Header>
      <Card.Body>
        <Form.Row className="align-items-center">
          <Col xs="auto">
            <Form.Label htmlFor="inlineFormInputGroup" srOnly>
              Username
            </Form.Label>
            <InputGroup className="mb-2">
              <InputGroup.Prepend>
                <InputGroup.Text>?</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                id="inlineFormInputGroup"
                placeholder="Buscar"
                onChange={handleSearchInputChange}
              />
            </InputGroup>
          </Col>
          <Col xs="auto">
            <Form.Check
              inline
              label="Todos"
              value="Todos"
              type="radio"
              name="mvtType"
              onClick={handleCheckboxesClick}
              defaultChecked
            />
            <Form.Check
              inline
              label="Ingreso"
              value="Ingreso"
              type="radio"
              name="mvtType"
              onClick={handleCheckboxesClick}
            />
            <Form.Check
              inline
              label="Gasto"
              value="Gasto"
              type="radio"
              name="mvtType"
              onClick={handleCheckboxesClick}
            />
          </Col>
        </Form.Row>
      </Card.Body>
      <Container>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th></th>
              <th>Nombre Movimiento</th>
              <th>Valor</th>
            </tr>
          </thead>
          <tbody>
            {mvts.map((mvt) => (
              <MvtItem
                key={mvt.id}
                balance={balance}
                mvt={mvt}
                removeMvt={removeMvt}
                editMvt={editMvt}
              ></MvtItem>
            ))}
          </tbody>
        </Table>
      </Container>
    </Card>
  );
};

export default MvtList;
