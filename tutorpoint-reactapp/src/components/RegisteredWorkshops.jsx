/*Author: Manpreet Singh, BannerID: B00853930*/
import React, { Component } from "react";
import "./TutorForm.css";
import Form from "react-bootstrap/Form";
import { Button, Table } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import NavBar from "./navbar";
import { MDBContainer, MDBView, MDBMask } from "mdbreact";
import homepage from "../images/homepage.jpg";
import axios from "axios";
import jwt_decode from "jwt-decode";
import Swal from "sweetalert2/src/sweetalert2.js";
import "@sweetalert2/theme-dark/dark.css";

class RegisteredWorkshops extends React.Component {
  constructor(props) {
    super(props);
    const token = localStorage.access_token;
    const decoded = jwt_decode(token);
    this.state = {
      workshops: [],
      email: decoded.email,
      dept: decoded.dept,
      contact: decoded.contact.toString(),
      username: decoded.username,
    };

    this.getWorkshops = this.getWorkshops.bind(this);
    this.createTableRow = this.createTableRow.bind(this);

    this.getWorkshops();
  }

  //workshops are fetched base on logged in user email
  async getWorkshops() {
    await axios
      .get(
        "https://tutorpoint1.herokuapp.com/api/workshopRegisterDetails/specific",
        {
          params: { email: this.state.email },
        }
      )
      .then((response) => {
        axios
          .get(
            "https://tutorpoint1.herokuapp.com/api/workshopDetails/specific",
            {
              params: { id: response },
            }
          )
          .then((response) => {
            this.setState({ workshops: response.data });
          })
          .catch(function (error) {
            console.log(error);
            console.log(error.message);
            Swal.fire("Workshops not found!");
          });
      });
  }

  createTableRow() {
    let trs = [];
    this.state.workshops.map((row, index) => {
      trs.push(
        <tr>
          <td>{row.name}</td>
          <td>{row.tutor}</td>
          <td>{row.date}</td>
          <td>{row.time}</td>
        </tr>
      );
    });
    return trs;
  }

  render() {
    return (
      <div>
        <header>
          <NavBar></NavBar>
          <MDBView src={homepage}>
            <MDBMask
              overlay="black-strong"
              className="flex-center flex-column text-white text-center"
            >
              <div className="tableContainer">
                <Table striped bordered hover size="sm">
                  <thead>
                    <tr>
                      <th>Workshop Name</th>
                      <th>Tutor</th>
                      <th>Date</th>
                      <th>Time</th>
                    </tr>
                  </thead>
                  {<tbody>{this.createTableRow()}</tbody>}
                </Table>
              </div>
            </MDBMask>
          </MDBView>
        </header>
      </div>
    );
  }
}

export default RegisteredWorkshops;
