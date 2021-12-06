import React from "react";
import { FormControl, InputGroup, Navbar } from "react-bootstrap";

const Header = ({ mvtList, title, balance, updateInitialBalance }) => {
  const handleInitialBalanceChange = (e) => {
    updateInitialBalance(e.target.value);
  };

  return (
    <React.Fragment>
      <Navbar bg="info" variant="dark">
        <Navbar.Brand href="#home">
          <img
            alt=""
            src="https://i.ibb.co/W252xGD/Dinero.jpg" 
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{" "}
          {title}
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end, px-6">
          <Navbar.Text>Saldo Inicial:{` `}</Navbar.Text>
          <InputGroup className="px-4">
            <InputGroup.Prepend>
              <InputGroup.Text>$</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              aria-label="Amount (to the nearest dollar)"
              value={balance.initialBalance}
              onChange={handleInitialBalanceChange}
            />
          </InputGroup>
          <Navbar.Text>Saldo Final:{` `}</Navbar.Text>
          <InputGroup className="px-4">
            <InputGroup.Prepend>
              <InputGroup.Text>$</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              aria-label="Amount (to the nearest dollar)"
              readOnly="readOnly"
              value={balance.finalBalance}
            />
          </InputGroup>
        </Navbar.Collapse>
      </Navbar>
      <br />
    </React.Fragment>
  );
};

export default Header;
