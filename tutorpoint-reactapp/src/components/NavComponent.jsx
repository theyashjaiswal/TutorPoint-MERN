//Author: Prabhjot Kaur(B00843735)
import React from 'react';
import {ListGroup, Tab, Row, Col, Nav, Container,Navbar,Form,FormControl,Button
,} from 'react-bootstrap';
import logo from '../images/logo.png'
//import '../styles/Nav.css'
class  NavComponent extends React.Component {
  render() {
    return (
   <>
  <Navbar bg="primary" variant="dark">
    <Navbar.Brand href="#home">
      <img
        src={logo}
        className="d-inline-block align-top"
        width="75"
        height="75"
        alt="React Bootstrap logo"
      />
    </Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link href="#home">Home</Nav.Link>
      <Nav.Link href="#features">About Us</Nav.Link>
      <Nav.Link href="#pricing">Contact Us</Nav.Link>
      <Nav.Link href="#pricing">Appointments</Nav.Link>
      </Nav>
       <Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-light">Search</Button>
    </Form>
  </Navbar>
</>
  );
  }

}

export default NavComponent;