//The author of this file is Jeyanth Kishore Ramasamy(B00875285)
import React, { Component } from "react";
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
import "../css/passwordReset.css";
import axios from "axios";
import Swal from "sweetalert2/src/sweetalert2.js";
import "@sweetalert2/theme-dark/dark.css";

class SecurityCode extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleBackClick = this.handleBackClick.bind(this);
    this.BG_CLASS = "body--bg";
    this.state = {
      securityCode: "",
      newPassword: "",
      resetPassword: "",
    };
  }

  componentDidMount() {
    document.body.classList.add(this.BG_CLASS);
  }

  componentWillUnmount() {
    document.body.classList.remove(this.BG_CLASS);
  }

  handleBackClick() {
    localStorage.removeItem("securityCode");
    localStorage.removeItem("email");
    this.props.history.push("/password-reset");
  }
  async handleClick() {
    if (
      this.state.securityCode === "" ||
      this.state.newPassword === "" ||
      this.state.resetPassword === ""
    ) {
      Swal.fire("Please Enter All Required Details");
      return;
    }
    if (localStorage.getItem("securityCode") !== this.state.securityCode) {
      Swal.fire(
        "Invalid Security Code! \n Please Enter Code Sent to your Mail"
      );
      return;
    }
    if (this.state.newPassword !== this.state.resetPassword) {
      Swal.fire("Password Miss Match");
      return;
    }
    if (
      this.state.newPassword.length > 16 ||
      this.state.resetPassword.length > 16 ||
      this.state.newPassword.length < 8 ||
      this.state.resetPassword.length < 8
    ) {
      Swal.fire("Password should be between 8 to 16 characters");
      return;
    } else {
      await axios
        .get("https://tutorpoint1.herokuapp.com/resetPassword", {
          params: {
            password: this.state.newPassword,
            email: localStorage.getItem("email"),
          },
        })
        .then((response) => {
          if (response.data.message === "not found") {
            Swal.fire("Mail ID not registered with the application !!!");
          } else if (response.data.message === "success") {
            Swal.fire(
              "Password has been reset successfully.\n Use the new password for Login !"
            ).then((response) => {
              this.props.history.push("/");
            });
            localStorage.removeItem("securityCode");
            localStorage.removeItem("email");
          }
        })
        .catch(function (error) {
          console.log(error);
          console.log(error.message);
          Swal.fire("Error in Resetting Password");
        });
    }
  }
  handleChange(event) {
    console.log(event.target.name);
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
  render() {
    return (
      <MDBContainer className="reset-container">
        <MDBRow className="justify-content-center">
          <MDBCol md="6">
            <MDBCard style={{ width: "26rem" }}>
              <MDBCardHeader>
                <h3
                  className="h3 text-center font-weight-bold"
                  style={{ fontFamily: "sans-serif", color: "#f9bf03" }}
                >
                  Reset Password
                </h3>
              </MDBCardHeader>
              <MDBCardBody>
                <form>
                  <div className="">
                    <label htmlFor="resetPassword">
                      Enter your Security Code
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="securityCode"
                      name="securityCode"
                      onChange={this.handleChange}
                    />
                    <label htmlFor="resetPassword">Enter new Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="newPassword"
                      name="newPassword"
                      onChange={this.handleChange}
                    />
                    <label htmlFor="resetPassword">Re-enter new Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="resetPassword"
                      name="resetPassword"
                      onChange={this.handleChange}
                    />
                    <div className="text-center new-button pass-button">
                      <MDBBtn onClick={this.handleClick}>Submit</MDBBtn>
                      <MDBBtn onClick={this.handleBackClick}>Back</MDBBtn>
                    </div>
                  </div>
                </form>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
}

export default SecurityCode;
