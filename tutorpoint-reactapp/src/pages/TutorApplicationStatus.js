/*Author: Yash Jaiswal, BannerID: B00873246*/
import React, { Component } from "react";
import "./TutorForm.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Table from "react-bootstrap/Table";
import NavBar from "../components/navbar";
import { MDBContainer, MDBView, MDBMask } from "mdbreact";
import homepage from "../images/homepage.jpg";
import axios from "axios";
import jwt_decode from "jwt-decode";

function tutorApplicationList(email) {
  console.log(email);
  const conf = {
    headers: {
      "content-type": "application/json",
    },
  };
  const data = { email: email };
  return axios
    .post(
      "https://tutorpoint1.herokuapp.com/api/user/tutorapplications",
      data,
      conf
    )
    .then(function (results) {
      return results.data;
    })
    .catch((error) => {});
}
class TutorApplicationStatus extends Component {
  state = {};
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      dept: "",
      contact: "",
      username: "",
      tutorApplicationsList: [],
      tableObjectList: [],
    };
  }
  componentDidMount() {
    const token = localStorage.getItem("access_token");
    if (token === "" || token === undefined || token === null) {
      this.props.history.push("/");
    }
    const decoded = jwt_decode(token);
    tutorApplicationList(decoded.email).then((res) => {
      console.log("appstatus" + res.length);
      const tableObject = [];
      var i;
      for (i = 0; i < res.length; i++) {
        var tempJSON = {
          application_id: res[i].tutor_application_id,
          course: res[i].applied_for.course_name,
          applied_on: res[i].application_details.created_at,
          application_status: res[i].application_status.status,
          reason: res[i].application_status.reason,
        };
        tableObject.push(tempJSON);
      }

      this.setState({
        tutorApplicationsList: res,
        email: decoded.email,
        dept: decoded.dept,
        contact: decoded.contact.toString(),
        username: decoded.username,
        tableObjectList: tableObject,
      });
    });
  }
  render() {
    var counterVar = 0;
    var applicationRows = [];
    if (this.state.tableObjectList.length > 0) {
      applicationRows = this.state.tableObjectList.map((r, index) => {
        console.log(r + "hihih");
        return (
          <tr>
            <td>{index + 1}</td>
            <td key={r.application_id} value={r.application_id}>
              {r.application_id}
            </td>
            <td key={r.course} value={r.course}>
              {r.course}
            </td>
            <td key={r.applied_on} value={r.applied_on}>
              {r.applied_on.substring(0, 10)}
            </td>
            <td key={r.application_status} value={r.application_status}>
              {r.application_status}
            </td>
            <td key={r.reason} value={r.reason}>
              {r.reason}
            </td>
          </tr>
        );
      });
    } else {
      applicationRows = (
        <tr>
          <td>1</td>
          <td colSpan="5">No Applications Yet!!!!!!!</td>
        </tr>
      );
    }

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
                  <a onClick={() => window.location.reload(false)}>
                    {" "}
                    🔄 refresh
                  </a>
                </div>
                <h2>Tutor Application Status </h2>
                <br></br>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Application ID</th>
                      <th>Course</th>
                      <th>Applied On</th>
                      <th>Application Status</th>
                      <th>Reason</th>
                    </tr>
                  </thead>
                  <tbody>{applicationRows}</tbody>
                </Table>
              </div>
            </MDBMask>
          </MDBView>
        </section>
      </div>
    );
  }
}

export default TutorApplicationStatus;
