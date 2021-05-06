/*Author: Manpreet Singh, BannerID: B00853930*/
import React from "react";
import { ListGroup, Tab, Row, Col, Nav, Button } from "react-bootstrap";
import axios from "axios";
import jwt_decode from "jwt-decode";
import Swal from "sweetalert2/src/sweetalert2.js";
import "@sweetalert2/theme-dark/dark.css";

class WorkshopListComponent extends React.Component {
  constructor(props) {
    super(props);
    const token = localStorage.access_token;
    const decoded = jwt_decode(token);
    this.state = {
      email: decoded.email,
      dept: decoded.dept,
      contact: decoded.contact.toString(),
      username: decoded.username,
      role: decoded.role,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  async handleClick(val) {
    const workshopRegister = {
      workshopid: val,
      email: this.state.email,
    };
    await axios
      .post(
        "https://tutorpoint1.herokuapp.com/api/workshopRegisterDetails/",
        workshopRegister
      )
      .then((response) => {
        if (response.success) {
          Swal.fire("Workshop registered successfull!");
        } else {
          Swal.fire("Workshop already registered!");
        }

        //this.props.history.push("/workshops");
      })
      .catch(function (error) {
        console.log(error);
        console.log(error.message);
        Swal.fire("Workshop not registered!");
      });
  }

  createListGroup() {
    let listgrp = [];
    this.props.workshopList.map((item, index) => {
      listgrp.push(
        <ListGroup.Item action>
          {`${item.name} | ${item.tutor} | ${item.date} | ${item.time}`}
          <Button
            value={item.id}
            onClick={() => {
              this.handleClick(item.id);
            }}
          >
            Register
          </Button>
        </ListGroup.Item>
      );
    });
    return listgrp;
  }
  render() {
    return (
      <ListGroup defaultActiveKey="#link1">{this.createListGroup()}</ListGroup>
    );
  }
}

export default WorkshopListComponent;
