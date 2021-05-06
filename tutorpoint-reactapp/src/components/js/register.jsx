//The author of this file is Jeyanth Kishore Ramasamy(B00875285)
import { React } from "react";
import { Component } from "react";
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
import validator from "validator";
import "../css/register.css";
import axios from "axios";
import Swal from "sweetalert2/src/sweetalert2.js";
import "@sweetalert2/theme-dark/dark.css";

class Register extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.BG_CLASS = "body--bg";
    this.state = {
      email: "",
      password: "",
      re_password: "",
      dept: "",
      contact: "",
      username: "",
    };
  }

  handleChange(event) {
    console.log(event.target.name);
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  componentDidMount() {
    document.body.classList.add(this.BG_CLASS);
  }

  componentWillUnmount() {
    document.body.classList.remove(this.BG_CLASS);
  }

  async handleClick(event) {
    event.preventDefault();
    if (
      this.state.email === "" ||
      this.state.password === "" ||
      this.state.re_password === "" ||
      this.state.dept === "" ||
      this.state.username === "" ||
      this.state.contact === ""
    ) {
      Swal.fire("Please Fill All The Required Details");
      return;
    }
    if (this.state.password !== this.state.re_password) {
      Swal.fire("Password Miss Match");
      return;
    }
    if (this.state.password.length < 8 || this.state.password.length > 16) {
      Swal.fire("Password Should Be More Than 8 Digits");
    }
    if (!validator.isEmail(this.state.email)) {
      Swal.fire("Please Enter a Valid Email ID");
      return;
    }
    if (!validator.isNumeric(this.state.contact)) {
      Swal.fire("Contact Number Containes Alphabets\n Please Change!");
      return;
    }
    const register = {
      fullname: this.state.username,
      password: this.state.password,
      email: this.state.email,
      contact: this.state.contact,
      dept: this.state.dept,
    };
    await axios
      .post("https://tutorpoint1.herokuapp.com/register", register)
      .then((response) => {
        Swal.fire("Registration Successfull");
        this.props.history.push("/");
      })
      .catch(function (error) {
        console.log(error);
        console.log(error.message);
        Swal.fire("Email Id already Exist! Please enter new email");
      });
  }
  render() {
    return (
      <div id="register">
        <MDBContainer className="register-container">
          <MDBRow className="justify-content-center">
            <MDBCol md="6">
              <MDBCard>
                <MDBCardHeader>
                  <p
                    className="h3 text-center font-weight-bold"
                    style={this.fontStyle}
                  >
                    Registration for Tutor Point
                  </p>
                </MDBCardHeader>
                <MDBCardBody>
                  <form>
                    <div>
                      <MDBInput
                        label="Full Name*"
                        group
                        type="text"
                        name="username"
                        onChange={this.handleChange}
                      ></MDBInput>
                      <MDBInput
                        label="Email ID*"
                        group
                        type="email"
                        name="email"
                        onChange={this.handleChange}
                      ></MDBInput>
                      <MDBInput
                        label="Password*"
                        group
                        type="password"
                        onChange={this.handleChange}
                        name="password"
                      ></MDBInput>
                      <MDBInput
                        label="Re-Enter Password*"
                        group
                        type="password"
                        onChange={this.handleChange}
                        name="re_password"
                      ></MDBInput>
                      <MDBInput
                        label="Contact Number*"
                        group
                        type="text"
                        onChange={this.handleChange}
                        name="contact"
                      ></MDBInput>
                      <MDBInput
                        label="Department*"
                        group
                        type="text"
                        onChange={this.handleChange}
                        name="dept"
                      ></MDBInput>
                      <div className="text-center new-button">
                        <MDBBtn onClick={this.handleClick}>Register</MDBBtn>
                      </div>
                      <p className="text-center">
                        Already have a account? <span className="space"></span>
                        <a href="/">
                          Login
                        </a> <span className="space"></span> here
                      </p>
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

export default Register;
