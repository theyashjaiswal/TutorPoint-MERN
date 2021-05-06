//The author of this file is Jeyanth Kishore Ramasamy(B00875285)
import React, { Component } from "react";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavbarToggler,
  MDBCollapse,
  MDBNavItem,
  MDBNavLink,
  MDBIcon,
  MDBDropdown,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBDropdownItem,
  Button,
} from "mdbreact";
import logo from "../images/tp-brown.png";
import { HashRouter as Router } from "react-router-dom";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
    };
    this.onClick = this.onClick.bind(this);
    this.logOut = this.logOut.bind(this);
  }

  onClick() {
    this.setState({
      collapse: !this.state.collapse,
    });
  }

  logOut() {
    localStorage.removeItem("access_token");
  }

  render() {
    return (
      <div>
        <Router>
          <header>
            <MDBNavbar id="nav-bar" dark expand="md" scrolling fixed="top">
              <MDBNavbarBrand href="/homepage">
                <a href="/homepage">
                  <img
                    src={logo}
                    className="d-inline-block align-top"
                    width="100"
                    height="40"
                    alt="React Bootstrap logo"
                  />
                </a>
              </MDBNavbarBrand>
              <MDBNavbarToggler onClick={this.onClick} />
              <MDBCollapse isOpen={this.state.collapse} navbar>
                <MDBNavbarNav left>
                  <MDBNavItem>
                    <MDBNavLink to="/homepage">
                      <strong>HOME</strong>
                    </MDBNavLink>
                  </MDBNavItem>
                  <MDBNavItem>
                    <MDBNavLink to="/workshops">
                      <strong>Workshops</strong>
                    </MDBNavLink>
                  </MDBNavItem>
                  <MDBNavItem>
                    <MDBNavLink to="/tutorList">
                      <strong>Tutors</strong>
                    </MDBNavLink>
                  </MDBNavItem>
                  <MDBNavItem>
                    <MDBNavLink to="/appointments">
                      <strong>Appointments</strong>
                    </MDBNavLink>
                  </MDBNavItem>
                  <MDBNavItem>
                    <MDBNavLink to="/feedback">
                      <strong>Feedback</strong>
                    </MDBNavLink>
                  </MDBNavItem>
                  <MDBNavItem>
                    <MDBNavLink to="/helppage">
                      <strong>Help</strong>
                    </MDBNavLink>
                  </MDBNavItem>
                </MDBNavbarNav>
                <MDBNavbarNav right>
                  <Button className="nav-button" href="#/becomeTutor">
                    Become a Tutor
                  </Button>
                  <MDBNavItem>
                    <MDBDropdown>
                      <MDBDropdownToggle nav caret>
                        <MDBIcon icon="user" />
                      </MDBDropdownToggle>
                      <MDBDropdownMenu className="dropdown-default align-center">
                        <MDBDropdownItem href="#/" onClick={this.logOut}>
                          Log Out
                        </MDBDropdownItem>
                        <MDBDropdownItem href="#/password-change">
                          Change Password
                        </MDBDropdownItem>
                        <MDBDropdownItem href="#/details-change">
                          Change Profile Details
                        </MDBDropdownItem>
                        <MDBDropdownItem href="#/tutor-application-status">
                          View Tutor Application Status
                        </MDBDropdownItem>
                      </MDBDropdownMenu>
                    </MDBDropdown>
                  </MDBNavItem>
                </MDBNavbarNav>
              </MDBCollapse>
            </MDBNavbar>
          </header>
        </Router>
      </div>
    );
  }
}

export default NavBar;
