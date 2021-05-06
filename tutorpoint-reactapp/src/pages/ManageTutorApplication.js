/*Author: Yash Jaiswal, BannerID: B00873246*/
import React, { Component } from "react";
import "./TutorForm.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import NavBar from "../components/navbar";
import { MDBContainer, MDBView, MDBMask } from "mdbreact";
import homepage from "../images/homepage.jpg";
import axios from "axios";
import jwt_decode from "jwt-decode";
import Swal from "sweetalert2/src/sweetalert2.js";
import "@sweetalert2/theme-dark/dark.css";

class ManageTutorApplication extends Component {
  state = {};
  constructor(props) {
    super(props);
    this.state = {
      approverId: "",
      applicationId: "",
      decision: "",
      reason: "",
    };
  }
  onChangeHandler = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmitHandler = (event) => {
    event.preventDefault();
    console.log(event.target[0]);
    const data = {
      approverId: this.state.approverId,
      applicationId: this.state.applicationId,
      decision: this.state.decision,
      reason: this.state.reason,
    };
    const conf = {
      headers: {
        "content-type": "application/json",
      },
    };
    // "https://tutorpoint1.herokuapp.com/api/user/tutorapplication";
    axios
      .put(
        "https://tutorpoint1.herokuapp.com/api/user/tutorapplication",
        data,
        conf
      )
      .then((response) => {
        var responseResult = response;
        console.log(
          "val:" +
            responseResult.data.success +
            "condition:" +
            (responseResult.data.success.toString().toUpperCase() == "TRUE")
        );
        if (responseResult.data.success.toString() == "true") {
          console.log("mailsend" + responseResult.data.message);
          const newResponseObject = {
            student_mail: responseResult.data.message.applied_by.email,
            fullName: responseResult.data.message.applied_by.student_name,
            tutorApplicationId:
              responseResult.data.message.tutor_application_id,
          };
          axios
            .post(
              "https://tutorpoint1.herokuapp.com/api/mail/send-application-update",
              newResponseObject
            )
            .then((resp) => {
              Swal.fire({
                title: "Thank You",
                text: "Application Updated Successfully!!!",
              }).then((result) => {
                // Reload the Page
                window.location.reload();
              });
            })
            .catch((error) => {
              Swal.fire({
                title: "Failed!!!",
                text: " Incorrect Approver ID or Application ID!!!",
              });
            });
        } else {
          Swal.fire({
            title: "Failed!!!",
            text: " Incorrect Approver ID or Application ID!!!",
          });
        }
      })
      .catch((error) => {
        Swal.fire({
          title: "Failed!!!",
          text: " Incorrect Approver ID or Application ID!!!",
        });
      });
  };

  render() {
    return (
      <div>
        <header>
          {/* <NavBar></NavBar> */}
          <MDBView src={homepage}>
            <MDBMask
              overlay="black-strong"
              className="flex-center flex-column text-white text-center"
              style={{ overflowY: "scroll" }}
            >
              <div className="TutorForm">
                <h2 className="TutTitle">Manage Tutor Application</h2>
                <br></br>

                <Form className="TutorFormStl" onSubmit={this.onSubmitHandler}>
                  <Form.Group as={Row} controlId="approverId">
                    <Form.Label column sm={2}>
                      {" "}
                      Approver ID
                    </Form.Label>
                    <Col sm={10}>
                      <Form.Control
                        type="input"
                        placeholder="Approver ID"
                        required
                        name="approverId"
                        onChange={this.onChangeHandler}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} controlId="applicationId">
                    <Form.Label column sm={2}>
                      {" "}
                      Application ID
                    </Form.Label>
                    <Col sm={10}>
                      <Form.Control
                        type="input"
                        placeholder="Application ID"
                        name="applicationId"
                        required
                        onChange={this.onChangeHandler}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} controlId="decision">
                    <Form.Label column sm={2}>
                      Decision
                    </Form.Label>
                    <Col sm={10}>
                      {" "}
                      <Form.Control
                        as="select"
                        defaultValue="Your Decision"
                        name="decision"
                        required
                        onChange={this.onChangeHandler}
                      >
                        <option>Select Your Decision</option>
                        <option value="Approved">Approve</option>
                        <option value="Rejected">Reject</option>
                      </Form.Control>
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} controlId="reason">
                    <Form.Label column sm={2}>
                      Reason
                    </Form.Label>
                    <Col sm={10}>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="write here.."
                        name="reason"
                        required
                        onChange={this.onChangeHandler}
                      />
                    </Col>
                  </Form.Group>
                  <Button
                    style={{ marginLeft: "18%", marginBottom: "10%" }}
                    variant="primary"
                    type="submit"
                    // onClick={() =>
                    //   alert(
                    //     "Thanks for Submitting the application!!!! Your reference number is #12345678"
                    //   )
                    // }
                  >
                    Submit
                  </Button>
                </Form>
              </div>
            </MDBMask>
          </MDBView>
        </header>
      </div>
    );
  }
}

export default ManageTutorApplication;
