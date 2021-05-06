//The author of this file is Jeyanth Kishore Ramasamy(B00875285)
// & Prabhjot Kaur(B00843735)
import React, { Component } from "react";
import NavBar from "./navbar";
import NavBarContainer from "./NavBarContainer";
import "./homepage.css";
import { MDBContainer, MDBView, MDBMask } from "mdbreact";
import homepage from "../images/homepage.jpg";
import About from "./js/Homepage/Overview";
import homeCompOne from "./js/Homepage/HomeComponent1";
import homeCompTwo from "./js/Homepage/HomeComponent2";
import homeCompThree from "./js/Homepage/HomeComponent3";
import Footer from "./js/Footer";
import { Table, Card, FormControl, Form, Button } from "react-bootstrap";
import { ThemeConsumer } from "react-bootstrap/esm/ThemeProvider";
import Overview from "./js/Homepage/Overview";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.handleWorkshopClick = this.handleWorkshopClick.bind(this);
    this.handleTutorClick = this.handleTutorClick.bind(this);
    this.onTutorClick = this.onTutorClick.bind(this);
  }
  componentDidMount() {
    var token = localStorage.getItem("access_token");
    if (token === "" || token === undefined || token === null) {
      this.props.history.push("/");
    }
  }
  handleWorkshopClick() {
    this.props.history.push("/workshops");
  }
  handleTutorClick() {
    this.props.history.push("/tutorList");
  }
  onTutorClick() {
    this.props.history.push("/becomeTutor");
  }

  render() {
    return (
      <div className="homepage">
        <header>
          <NavBar></NavBar>
          <MDBView
            style={{
              top: "10px",
            }}
            src={homepage}
          >
            <MDBMask
              overlay="black-strong"
              className="flex-center flex-column text-white text-center"
            >
              <div className="homeCards">
                <Card
                  style={{
                    width: "28rem",
                    color: "white",
                    marginLeft: "0%",
                    marginBottom: "2%",

                    backgroundColor: "rgba(52, 52, 52, 0.8)",
                  }}
                >
                  <Card.Body>
                    <Card.Title>Available tutors</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      <br></br>
                      <ul>
                        <li>Experienced tutors are available here. </li>
                        <li>Easy Booking through appointments.</li>
                        <li>Anytime access based on schedule.</li>
                        <li>Pocket Friendly fees for sessions.</li>
                      </ul>
                      <br></br>
                    </Card.Subtitle>
                    <Button type="submit" onClick={this.handleTutorClick}>
                      View Tutors
                    </Button>
                  </Card.Body>
                </Card>
                <Card
                  style={{
                    width: "30rem",
                    color: "white",
                    marginLeft: "10%",
                    marginBottom: "2%",

                    backgroundColor: "rgba(52, 52, 52, 0.8)",
                  }}
                >
                  <Card.Body>
                    <Card.Title>Workshops</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      <br></br>
                      <ul>
                        <li>Workshops on important course topics. </li>
                        <li>Easy Booking through appointments.</li>
                        <li>Anytime access based on schedule.</li>
                        <li>Q/A sessions at end of each workshop.</li>
                      </ul>
                      <br></br>
                    </Card.Subtitle>

                    <Button type="submit" onClick={this.handleWorkshopClick}>
                      View Workshops
                    </Button>
                  </Card.Body>
                </Card>
                <Card
                  style={{
                    width: "30rem",
                    color: "white",
                    marginLeft: "10%",
                    marginBottom: "2%",

                    backgroundColor: "rgba(52, 52, 52, 0.8)",
                  }}
                >
                  <Card.Body>
                    <Card.Title>Want to become a Tutor?</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      <br></br>
                      <ul>
                        <li>If you are good at any of the courses. </li>
                        <li>Become a tutor and teach others.</li>
                        <li>Checking the availability of courses.</li>
                        <li>Make money while improving skills.</li>
                      </ul>
                      <br></br>
                    </Card.Subtitle>
                    <Button type="submit" onClick={this.onTutorClick}>
                      Apply as Tutor
                    </Button>
                  </Card.Body>
                </Card>
              </div>
              <br></br>
              <br></br>
            </MDBMask>
          </MDBView>
        </header>

        <main>
          <Overview {...homeCompTwo} />
          <Overview {...homeCompOne} />
          <Overview {...homeCompThree} />
        </main>
        <Footer></Footer>
      </div>
    );
  }
}

export default HomePage;
