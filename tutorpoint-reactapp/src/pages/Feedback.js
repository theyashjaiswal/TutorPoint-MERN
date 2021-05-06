/*Author: Yash Jaiswal, BannerID: B00873246*/
import React, { Component } from "react";
import "./TutorForm.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import NavBarContainer from "../components/NavBarContainer";
import { MDBContainer, MDBView, MDBMask } from "mdbreact";
import homepage from "../images/homepage.jpg";
import NavBar from "../components/navbar";
import axios from "axios";
import jwt_decode from "jwt-decode";
import ReactStars from "react-rating-stars-component";

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
class Feedback extends Component {
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
      tutorsList: [],
      tutorObj: [],
      tutorRating: "",
      tutorName: "",
      tutorDept: "",
      tutorCourse: "",
      tutorEmail: "",
      comment: "",
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
    this.setState({
      tutorObj: [],
      tutorsList: [],
    });
    axios
      .get(
        "https://tutorpoint1.herokuapp.com/api/user/tutors/" +
          event.target.value
      )
      .then((response) => {
        this.setState({
          tutorObj: response.data,
        });
        if (this.state.tutorObj.length > 0) {
          var k;
          var tempTutorsList = [];
          for (k = 0; k < this.state.tutorObj.length; k++) {
            console.log(this.state.tutorObj[k].name);
            tempTutorsList.push(this.state.tutorObj[k].name);
          }
          this.setState({
            tutorsList: tempTutorsList,
          });
          console.table(this.state.tutorsList);
        }
      });
  };

  onTutorSelect = (event) => {
    event.preventDefault();
    console.log("tutorhere" + event.target.value);
    console.log("tutorobj" + this.state.tutorObj);
    var i;
    var j;
    var tutorName = "";
    var tutorDept = "";
    var tutorCourse = "";
    var tutorEmail = "";
    for (i = 0; i < this.state.tutorObj.length; i++) {
      if (this.state.tutorObj[i].name == event.target.value) {
        tutorName = this.state.tutorObj[i].name;
        tutorDept = this.state.tutorObj[i].dep;
        tutorCourse = this.state.tutorObj[i].course;
        tutorEmail = this.state.tutorObj[i].email;
        this.setState({
          tutorName: tutorName,
          tutorDept: tutorDept,
          tutorCourse: tutorCourse,
          tutorEmail: tutorEmail,
        });
        console.log(
          "tutorName" +
            this.state.tutorName +
            this.state.tutorDept +
            this.state.tutorCourse +
            this.state.tutorEmail
        );
      }
    }
  };
  onChangeHandler = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  onSubmitHandler = (event) => {
    event.preventDefault();
    console.log("submithandler");
    console.log(event.target[0]);
    if (
      this.state.username == this.state.tutorName &&
      this.state.email == this.state.tutorEmail
    ) {
      Swal.fire("Invalid Request!! You cannot rate yourself!!!!!");
    } else {
      const data = {
        fullName: this.state.username,
        email: this.state.email,
        tutorRating: this.state.tutorRating,
        tutorName: this.state.tutorName,
        tutorDept: this.state.tutorDept,
        tutorCourse: this.state.tutorCourse,
        tutorEmail: this.state.tutorEmail,
        comment: this.state.comment,
      };
      const conf = {
        headers: {
          "content-type": "application/json",
        },
      };
      axios
        .post(
          "https://tutorpoint1.herokuapp.com/api/user/tutorrating",
          data,
          conf
        )
        .then((response) => {
          console.log(response);
          Swal.fire("Feedback Submitted Succesfully!!");
          window.setTimeout(function () {
            window.location.reload();
          }, 2000);
        })
        .catch((error) => {});
    }
  };

  render() {
    const ratingChanged = (newRating) => {
      console.log(newRating);
      this.setState({ tutorRating: newRating });
    };
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
    const tutorOptions = this.state.tutorsList.map((r) => {
      console.log("checklogher" + r);
      return (
        <option key={r} value={r}>
          {r}
        </option>
      );
    });

    return (
      <div>
        <header>
          <NavBar></NavBar>
          <MDBView src={homepage}>
            <MDBMask
              overlay="black-strong"
              className="flex-center flex-column text-white text-center"
              style={{ overflowY: "scroll" }}
            >
              <div className="TutorForm">
                <h2 className="TutTitle">Feedback Form</h2>
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
                        name="course"
                        required
                        onChange={this.onCourseSelect}
                      >
                        <option>Choose Course</option>
                        {courseOptions}
                      </Form.Control>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="tutor">
                    <Form.Label column sm={2}>
                      Tutor
                    </Form.Label>
                    <Col sm={10}>
                      <Form.Control
                        as="select"
                        name="tutor"
                        required
                        onChange={this.onTutorSelect}
                        required
                      >
                        <option>Choose Tutor</option>
                        {tutorOptions}
                      </Form.Control>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="tutorrating">
                    <Form.Label column sm={2}>
                      Overall Rating for Tutor
                    </Form.Label>
                    <Col sm={10}>
                      <ReactStars
                        count={5}
                        onChange={ratingChanged}
                        size={24}
                        activeColor="#ffd700"
                        name="tutorrating"
                        required
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="comment">
                    <Form.Label column sm={2}>
                      Comment
                    </Form.Label>
                    <Col sm={10}>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        name="comment"
                        placeholder="write here.."
                        required
                        onChange={this.onChangeHandler}
                      />
                    </Col>
                  </Form.Group>

                  <Button
                    style={{ marginLeft: "18%", marginBottom: "10%" }}
                    variant="primary"
                    type="submit"
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

export default Feedback;
