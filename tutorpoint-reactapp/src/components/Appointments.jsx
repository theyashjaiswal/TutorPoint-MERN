//Author: Prabhjot Kaur(B00843735)
import React from "react";
import { Table, Card, FormControl, Form, Button } from "react-bootstrap";
import NavBarContainer from "./NavBarContainer";
import { MDBContainer, MDBView, MDBMask } from "mdbreact";
import homepage from "../images/homepage.jpg";
import NavBar from "./navbar";
import axios from "axios";
import TutorAvailabilityModal from "./TutorAvailabilityModal";
import jwt_decode from "jwt-decode";
import Swal from "sweetalert2/src/sweetalert2.js";
import "@sweetalert2/theme-dark/dark.css";

class Appointments extends React.Component {
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
      appointments: [],
    };

    this.getAppointments = this.getAppointments.bind(this);

    this.getAppointments();
  }

  async getAppointments() {
    await axios
      .get("https://tutorpoint1.herokuapp.com/api/appointmentsForStudent", {
        params: { studentemail: this.state.email },
      })
      .then((response) => {
        this.setState({
          appointments: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
        console.log(error.message);
        Swal.fire("No Appointments");
      });
  }

  createTableRow() {
    let trs = [];
    this.state.appointments.map((row, index) => {
      trs.push(
        <tr>
          <td>{row.tutorname}</td>
          <td>{row.day}</td>
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
                <h1>Booked Appointments</h1>
                <Table striped bordered hover size="sm">
                  <thead>
                    <tr>
                      <th>TutorName</th>
                      <th>Day</th>
                      <th>Time</th>
                    </tr>
                  </thead>
                  <tbody>{this.createTableRow()}</tbody>
                </Table>
              </div>
            </MDBMask>
          </MDBView>
        </header>
      </div>
    );
  }
}

export default Appointments;
