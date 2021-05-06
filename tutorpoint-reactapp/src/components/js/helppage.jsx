//The author of this file is Jeyanth Kishore Ramasamy
import React, { Component } from "react";
import helppage from "../../images/help.jpg";
import NavBar from "../navbar";
import "../homepage.css";
import { MDBContainer, MDBView, MDBMask } from "mdbreact";

class HelpPage extends Component {
  state = {};
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  render() {
    return (
      <div>
        <header>
          <NavBar></NavBar>
          <MDBView src={helppage}>
            <MDBMask
              overlay="black-strong"
              className="flex-center flex-column text-white text-center"
            >
              <br></br>
              <br></br>
              <h2>What happens if we book Appointments?</h2>
              <br></br>
              <p>
                You will recieve an email stating the Appointment Schedule. You
                will also recieve the contact information of the professor, so
                that you can make use of it.
              </p>
              <br></br>
              <br></br>
              <h2>What is the use of feedback page?</h2>
              <br></br>
              <p>
                This page allows you to rate the tutor. It helps other students
                to choose their tutor based on your ratings.
              </p>
            </MDBMask>
          </MDBView>
        </header>

        <main>
          <MDBContainer className="text-center my-5">
            <h3>Want to become a Tutor?</h3>
            <p align="justify">
              If you are a pro at a course, then become a tutor and teach
              others. Enroll as a Tutor now by checking on our availability from
              "Courses".
            </p>
            <br></br>
            <h3>Want to learn new concepts?</h3>
            <p align="justify">
              1) Select your course<br></br>
              2) Choose your Tutor<br></br>
              3) Schedule your timings<br></br>
              4) Book your Appointments<br></br>
            </p>
          </MDBContainer>
        </main>
      </div>
    );
  }
}

export default HelpPage;
