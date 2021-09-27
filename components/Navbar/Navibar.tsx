import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { useAuthDispatch } from "../../context/context";

const NaviBar = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container style={{marginLeft: "100px", marginRight: '100px'}}>

        <Navbar.Brand href="#home">Dashboard</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href={"/dashboard?role=student"}>Student</Nav.Link>
            <Nav.Link href={"/dashboard?role=staff"}>Staff</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NaviBar;
