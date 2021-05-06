//The author of this file is Jeyanth Kishore Ramasamy
import React, { Component } from "react";
import NavBar from "../navbar";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
} from "mdbreact";
import validator from "validator";
import "../css/detailchange.css";
import jwt_decode from "jwt-decode";
import axios from "axios";
import Swal from "sweetalert2/src/sweetalert2.js";
import "@sweetalert2/theme-dark/dark.css";

class DetailsChange extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmitClick = this.handleSubmitClick.bind(this);
    this.handleCancelClick = this.handleCancelClick.bind(this);
    this.BG_CLASS = "body--bgchange";
    const token = localStorage.access_token;
    const decoded = jwt_decode(token);
    console.log(decoded.email);
    console.log(decoded.dept);
    console.log(typeof decoded.contact.toString());
    this.state = {
      email: decoded.email,
      dept: decoded.dept,
      contact: decoded.contact.toString(),
      username: decoded.username,
    };
  }

  handleChange(event) {
    console.log(event.target.name);
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
  async handleSubmitClick() {
    if (
      this.state.email === "" ||
      this.state.dept === "" ||
      this.state.username === "" ||
      this.state.contact === ""
    ) {
      Swal.fire("Please Enter All Required Details");
      return;
    }
    if (!validator.isEmail(this.state.email)) {
      Swal.fire("Please Enter a Valid Email ID");
      return;
    }
    if (!validator.isNumeric(this.state.contact)) {
      Swal.fire("Phone number containes alphabets");
      return;
    } else {
      const details = {
        username: this.state.username,
        email: this.state.email,
        dept: this.state.dept,
        contact: this.state.contact,
      };
      console.log("send request");
      await axios
        .post("https://tutorpoint1.herokuapp.com/changeDetail", details)
        .then((response) => {
          if (response.data.message === "not found") {
            Swal.fire("Mail Id not registered !!!");
          } else if (response.data.message === "success") {
            Swal.fire("Changes are made Successfull").then((result) => {
              this.props.history.push("/homepage");
            });
            localStorage.setItem("access_token", response.data.token);
            localStorage.setItem("email", this.state.email);
            console.log(localStorage);
          }
        })
        .catch(function (error) {
          console.log(error);
          console.log(error.message);
          Swal.fire("Update Failure, Try again after sometime");
        });
    }
  }
  handleCancelClick() {
    this.props.history.push("/homepage");
  }
  componentDidMount() {
    document.body.classList.add(this.BG_CLASS);
  }

  componentWillUnmount() {
    document.body.classList.remove(this.BG_CLASS);
  }
  render() {
    return (
      <div>
        <NavBar></NavBar>
        <MDBContainer className="change-container">
          <MDBRow className="justify-content-center">
            <MDBCol md="6">
              <MDBCard style={{ width: "26rem" }}>
                <MDBCardHeader>
                  <h3
                    className="h3 text-center font-weight-bold"
                    style={{ fontFamily: "sans-serif", color: "#f9bf03" }}
                  >
                    User Details Change
                  </h3>
                </MDBCardHeader>
                <MDBCardBody>
                  <form>
                    <div className="">
                      <label htmlFor="username">Full Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="username"
                        value={this.state.username}
                        name="username"
                        onChange={this.handleChange}
                      />
                      <label htmlFor="email">Email ID</label>
                      <input
                        type="text"
                        className="form-control"
                        id="email"
                        name="email"
                        value={this.state.email}
                        onChange={this.handleChange}
                      />
                      <label htmlFor="contact">Contact Number</label>
                      <input
                        type="text"
                        onChange={this.handleChange}
                        className="form-control"
                        id="contact"
                        value={this.state.contact}
                        name="contact"
                      ></input>
                      <label htmlFor="email">Department</label>
                      <input
                        type="text"
                        className="form-control"
                        id="dept"
                        value={this.state.dept}
                        name="dept"
                        onChange={this.handleChange}
                      />
                      <div className="text-center new-button password-button">
                        <MDBBtn onClick={this.handleSubmitClick}>Submit</MDBBtn>
                        <MDBBtn onClick={this.handleCancelClick}>Cancel</MDBBtn>
                      </div>
                    </div>
                  </form>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    );
  }
}

export default DetailsChange;
