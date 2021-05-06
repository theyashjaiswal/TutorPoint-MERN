//The author of this file is Jeyanth Kishore Ramasamy(B00875285)
import "../css/login.css";
import React, { Component } from "react";
import validator from "validator";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
} from "mdbreact";
import logo from "../../images/logo12.png";
import logo_dal from "../../images/gold.png";
import axios from "axios";
import Swal from "sweetalert2/src/sweetalert2.js";
import "@sweetalert2/theme-dark/dark.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      email: "",
      password: "",
    };
    this.BG_CLASS = "body--bg";
  }

  // fontStyle = {
  //   fontFamily: "sans-serif",
  //   color: "#f9bf03",
  // };

  componentDidMount() {
    document.body.classList.add(this.BG_CLASS);
  }

  componentWillUnmount() {
    document.body.classList.remove(this.BG_CLASS);
  }

  async handleClick() {
    if (!validator.isEmail(this.state.email)) {
      Swal.fire("Please Enter a Valid Email");
    } else if (this.state.password.length <= 8) {
      Swal.fire("Please Enter 8 Digit Passowrd");
    } else {
      const login = {
        password: this.state.password,
        email: this.state.email,
      };
      await axios
        .post("https://tutorpoint1.herokuapp.com/login", login)
        .then((response) => {
          if (response.data.message === "username") {
            Swal.fire("Mail Id not Registered !!!");
          } else if (response.data.message === "password") {
            Swal.fire("Invalid/Mismatch Password :-(");
          } else {
            console.log("Logged IN");
            localStorage.setItem("access_token", response.data.token);
            localStorage.setItem("email", this.state.email);
            console.log(localStorage);
            this.props.history.push("/homepage");
          }
        })
        .catch(function (error) {
          console.log(error);
          console.log(error.message);
          Swal.fire("Login Failure, Try again after sometime");
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
      <div id="login">
        <MDBContainer className="logo-container">
          <MDBRow>
            <MDBCol>
              <div className="logo">
                <img src={logo} alt="logo" />
              </div>
            </MDBCol>
            <MDBCol>
              <div className="logo_dal" id="dal_logo">
                <img src={logo_dal} alt="logo_dal" />
              </div>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
        <MDBContainer className="login-container">
          <MDBRow className="justify-content-center">
            <MDBCard>
              <MDBCardHeader>
                <h3
                  className="h3 text-center font-weight-bold"
                  style={this.fontStyle}
                >
                  Sign in
                </h3>
              </MDBCardHeader>
              <MDBCardBody>
                <form>
                  <div className="">
                    <MDBInput
                      label="Email"
                      icon="envelope"
                      group
                      type="email"
                      name="email"
                      onChange={this.handleChange}
                    ></MDBInput>
                    <MDBInput
                      label="Password"
                      icon="lock"
                      group
                      type="password"
                      name="password"
                      onChange={this.handleChange}
                    ></MDBInput>
                    <div className="text-center new-button">
                      <MDBBtn onClick={this.handleClick}>Login</MDBBtn>
                    </div>
                    <p className="text-center">
                      <a href="#/password-reset">Forget Pasword :( ?</a>
                    </p>
                    <p className="text-center">
                      New User? <span className="space"></span>
                      <a href="#/register">Register</a>
                    </p>
                  </div>
                </form>
              </MDBCardBody>
            </MDBCard>
          </MDBRow>
        </MDBContainer>
      </div>
    );
  }
}

export default Login;
