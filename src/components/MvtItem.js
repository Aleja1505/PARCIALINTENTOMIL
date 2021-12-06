import React from "react";
import { Button, Col, InputGroup, ListGroup, Row } from "react-bootstrap";
import { MdClose } from "react-icons/md";

import MvtModalEdit from "./MvtModalEdit";

const MvtItem = ({ balance, mvt, removeMvt, editMvt }) => {
  const handleRemoveClick = () => {
    removeMvt(mvt.id);
  };

  return (
    <tr>
      <td Style="width: 115px">
        {" "}
        <Button variant="info" type="button" onClick={handleRemoveClick}>
          <MdClose />
        </Button>{" "}
        <MvtModalEdit balance={balance} mvt={mvt} editMvt={editMvt} />
      </td>
      <td>{mvt.name}</td>
      <td
        className={mvt.typeMvt === "Ingreso" ? "table-success" : "table-danger"}
      >
        {mvt.qty}
      </td>
    </tr>
  );
};

export default MvtItem;
