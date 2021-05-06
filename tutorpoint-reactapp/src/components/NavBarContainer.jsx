import React from "react";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import logo from "../images/logo12.png";

class NavBarContainer extends React.Component {
  render() {
    return (
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">
          <a href="/homepage">
            <img
              src={logo}
              className="d-inline-block align-top"
              width="100"
              height="60"
              alt="React Bootstrap logo"
            />
          </a>
        </Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/homepage" active>
            Home
          </Nav.Link>
          <Nav.Link href="/workshops">Workshops</Nav.Link>

          <Nav.Link href="/tutorList">Tutors</Nav.Link>
          <Nav.Link href="/feedback">Feedback</Nav.Link>
        </Nav>
        <Button variant="outline-info" href="/becomeTutor">
          Become a Tutor
        </Button>
        <Nav>
          <Nav.Link href="/">SignOut</Nav.Link>
        </Nav>
      </Navbar>
    );
  }
}

export default NavBarContainer;
