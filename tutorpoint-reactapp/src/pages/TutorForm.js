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

function coursesList() {
  return axios
    .get("https://tutorpoint1.herokuapp.com/api/courses")
    .then(function (results) {
      return results.data;
    })
    .catch((error) => {});
}

class TutorForm extends Component {
  state = {};
  constructor(props) {
    super(props);
    this.state = {
      files: {
        label: "upload your resume and transcripts (PDFs)",
        selectedFiles: null,
        loaded: 0,
      },
      fullName: null,
      errors: {
        fullName: "",
      },
      departmentObject: [],
      departmentList: [],
      selectedDepartment: "",
      courseList: [],
      facultyEmail: "",
      approverId: "",
      courseId: "",
      email: "",
      username: "",
    };
    coursesList().then((res) => {
      let deptNames = [];
      var i;
      for (i = 0; i < res[0].departments.length; i++) {
        deptNames.push(res[0].departments[i].department_name);
      }
      console.log("datadepna" + typeof deptNames);
      this.setState({
        departmentObject: res[0].departments,
        departmentList: deptNames,
      });
    });
  }

  componentDidMount() {
    var token = localStorage.getItem("access_token");
    if (token === "" || token === undefined || token === null) {
      this.props.history.push("/");
    }
    const decoded = jwt_decode(token);

    coursesList().then((res) => {
      let deptNames = [];
      var i;
      for (i = 0; i < res[0].departments.length; i++) {
        deptNames.push(res[0].departments[i].department_name);
      }
      console.log("datadepna" + typeof deptNames);
      this.setState({
        departmentObject: res[0].departments,
        departmentList: deptNames,
        email: decoded.email,
        username: decoded.username,
      });
    });
  }

  onDropdownSelect = (event) => {
    event.preventDefault();
    console.log("here" + event.target.value);
    var i;
    var j;
    var courseNames = [];
    for (i = 0; i < this.state.departmentObject.length; i++) {
      console.log("ind" + this.state.departmentObject[i].department_name);
      if (
        this.state.departmentObject[i].department_name === event.target.value
      ) {
        for (j = 0; j < this.state.departmentObject[i].courses.length; j++) {
          courseNames.push(
            this.state.departmentObject[i].courses[j].course_name
          );
          this.setState({
            selectedDepartment: this.state.departmentObject[i].department_name,
          });
        }
        console.log(
          "insideDropedowd" + this.state.departmentObject[i].courses.length
        );
      }
    }
    this.setState({ courseList: courseNames });
  };

  onCourseSelect = (event) => {
    event.preventDefault();
    console.log("here" + event.target.value);
    console.log("incourseSelect" + this.state.selectedDepartment);
    var i;
    var j;
    var facultyEmail = "";
    var courseId = "";
    var approverId = "";
    for (i = 0; i < this.state.departmentObject.length; i++) {
      if (
        this.state.departmentObject[i].department_name ===
        this.state.selectedDepartment
      ) {
        for (j = 0; j < this.state.departmentObject[i].courses.length; j++) {
          if (
            this.state.departmentObject[i].courses[j].course_name ===
            event.target.value
          ) {
            console.log(
              "seehere" +
                this.state.departmentObject[i].courses[j].faculty_email
            );
            facultyEmail = this.state.departmentObject[i].courses[j]
              .faculty_email;
            courseId = this.state.departmentObject[i].courses[j].course_id;
            approverId = this.state.departmentObject[i].courses[j].approver_id;
          }
        }
      }
    }
    this.setState({
      facultyEmail: facultyEmail,
      courseId: courseId,
      approverId: approverId,
    });
    console.log(this.state.facultyEmail);
  };
  onTutorApplicationStatusClick() {
    this.props.history.push("/tutor-application-status");
  }

  onFileChangeHandler = (event) => {
    event.preventDefault();
    var text = "";
    var i;
    console.log(event.target.files);
    for (i = 0; i < event.target.files.length; i++) {
      text += event.target.files[i].name;
      if (i === event.target.files.length - 1) {
        continue;
      } else {
        text += ", ";
      }
      // console.log(event.target.files[i].name);
    }
    // console.log(text);

    this.setState({
      files: {
        label: text,
        selectedFiles: event.target.files,
        loaded: 0,
      },
    });
  };

  onSubmitHandler = (event) => {
    event.preventDefault();
    console.log("submithandler");
    const data = new FormData(event.target);
    data.uploadDocuments = ("files", this.state.files.selectedFiles);
    data.append("facultyEmail", this.state.facultyEmail);
    data.append("courseId", this.state.courseId);
    data.append("approverId", this.state.approverId);
    // alert("A form was submitted" + JSON.stringify(Object.fromEntries(data)));
    // alert(
    //   "A form was submitted" +
    //     JSON.stringify(Object.fromEntries(data)) +
    //     data.uploadDocuments[0].name
    // );

    const conf = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    //changeapiurllater
    axios
      .post("https://tutorpoint1.herokuapp.com/api/user/uploadfile", data, conf)
      .then((response) => {
        var responseUpload = response;
        console.log("resbody" + responseUpload.data.formData);
        console.log("restype" + typeof responseUpload.data);
        axios
          .post(
            "https://tutorpoint1.herokuapp.com/api/mail/send",
            response.data
          )
          .then((resp) => {
            Swal.fire("Application submitted successfully");
            // alert("MAILSENT!!" + resp);
          })
          .catch((error) => {});
      })
      .catch((error) => {});

    this.props.history.push("/tutor-application-status");
  };
  render() {
    const options = this.state.departmentList.map((r) => {
      return (
        <option key={r} value={r}>
          {r}
        </option>
      );
    });
    const courseOptions = this.state.courseList.map((r) => {
      return (
        <option key={r} value={r}>
          {r}
        </option>
      );
    });

    // const departmentNames = this.state.departmentObject.map(function (
    //   department
    // ) {
    //   console.log(department.department_name);
    //   return department.department_name;
    // });
    // console.log("constrendfunc" + departmentNames);
    // console.log("list" + typeof this.state.departmentList);
    return (
      <div>
        <section>
          <NavBar></NavBar>
          <MDBView src={homepage}>
            <MDBMask
              overlay="black-strong"
              className="flex-center flex-column text-white text-center"
              style={{ overflowY: "scroll" }}
            >
              <div className="TutorForm">
                <div
                  style={{
                    marginLeft: "75%",
                    marginBottom: "0%",
                    color: "orange",
                    fontWeight: "50",
                  }}
                >
                  <a href="#/tutor-application-status">
                    {" "}
                    👉 Tutor Application Status
                  </a>
                </div>
                <h2 className="TutTitle">Application Form - Become a Tutor</h2>
                <br></br>

                <Form className="TutorFormStl" onSubmit={this.onSubmitHandler}>
                  <Form.Group as={Row} controlId="fullName">
                    <Form.Label column md={2}>
                      {" "}
                      Full Name
                    </Form.Label>
                    <Col md={10}>
                      <Form.Control
                        type="input"
                        placeholder="Full Name"
                        name="fullName"
                        required
                        minlength="5"
                        value={this.state.username}
                        readonly
                        style={{ backgroundColor: "lightgrey" }}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} controlId="email">
                    <Form.Label column md={2}>
                      Email
                    </Form.Label>
                    <Col md={10}>
                      <Form.Control
                        type="email"
                        placeholder="Enter email"
                        name="email"
                        required
                        value={this.state.email}
                        readonly
                        style={{ backgroundColor: "lightgrey" }}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} controlId="department" required>
                    <Form.Label column md={2}>
                      Department
                    </Form.Label>
                    <Col md={10}>
                      {" "}
                      <Form.Control
                        as="select"
                        // defaultValue="Choose Department"
                        name="department"
                        required
                        onChange={this.onDropdownSelect}
                      >
                        <option>Choose Department</option>
                        {options}
                        {/* {this.state.departmentList.map((r) => {
                          return (
                            <option key={r} value={r}>
                              {r}
                            </option>
                          );
                        })} */}
                      </Form.Control>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="course">
                    <Form.Label column md={2}>
                      Course
                    </Form.Label>
                    <Col md={10}>
                      <Form.Control
                        as="select"
                        // defaultValue="Choose Course"
                        name="course"
                        required
                        onChange={this.onCourseSelect}
                      >
                        <option>Choose Course</option>
                        {courseOptions}
                      </Form.Control>
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} controlId="description">
                    <Form.Label column md={2}>
                      Why do you want to teach?
                    </Form.Label>
                    <Col md={10}>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="write here.."
                        name="description"
                        required
                        minlength="100"
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} controlId="availability">
                    <Form.Label column md={2}>
                      Availability (Tutoring)
                    </Form.Label>
                    <Col md={10}>
                      <Form.Control
                        placeholder="&nbsp; &nbsp; &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  eg. Monday - Tuesday and 7 - 8 PM"
                        name="availability"
                        required
                        minlength="5"
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="uploadDocuments">
                    <Form.Label column md={2}>
                      Upload Documents
                    </Form.Label>
                    <Col md={10}>
                      <Form.File
                        type="file"
                        id="uploadDocuments"
                        name="uploadDocuments"
                        label={this.state.files.label}
                        custom
                        multiple
                        accept="application/pdf"
                        onChange={this.onFileChangeHandler}
                        value={this.state.selectedFiles}
                        required
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group id="agreeTermsAndConditions">
                    <Form.Check
                      style={{
                        marginLeft: "18%",
                        marginBottom: "0%",
                        marginTop: "0%",
                      }}
                      type="checkbox"
                      label="By selecting this checkbox, you agree that all of the information provided is accurate."
                      required
                    />
                  </Form.Group>
                  <Button
                    style={{ marginLeft: "18%", marginBottom: "0%" }}
                    variant="primary"
                    type="submit"
                  >
                    Submit
                  </Button>
                </Form>
              </div>
            </MDBMask>
          </MDBView>
        </section>
      </div>
    );
  }
}

export default TutorForm;
