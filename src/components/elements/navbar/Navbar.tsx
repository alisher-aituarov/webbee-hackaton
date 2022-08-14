import { FC } from "react";
import { Container, Navbar } from "react-bootstrap";

import { AppNav } from "./Nav";
import { ROUTES } from "../../../constants";

export const AppNavbar: FC = () => {
  return (
    <Navbar bg="light" sticky="top" collapseOnSelect expand="sm">
      <Container>
        <Navbar.Brand href="/">Machines</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarCollapse" />
        <Navbar.Collapse id="navbarCollapse">
          <AppNav routes={ROUTES} />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
