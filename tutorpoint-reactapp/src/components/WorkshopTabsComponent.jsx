/*Author: Manpreet Singh, BannerID: B00853930*/
import React from "react";
import WorkshopListComponent from "./WorkshopListComponent.jsx";
import { ListGroup, Tab, Row, Col, Nav, Button } from "react-bootstrap";
import NavBar from "./navbar";
import { MDBContainer, MDBView, MDBMask } from "mdbreact";
import homepage from "../images/homepage.jpg";
import jwt_decode from "jwt-decode";

class WorkshopTabsComponent extends React.Component {
  constructor(props) {
    super(props);
    const token = localStorage.access_token;
    const decoded = jwt_decode(token);
    this.state = {
      departments: [],
      email: decoded.email,
      dept: decoded.dept,
      contact: decoded.contact.toString(),
      username: decoded.username,
      role: decoded.role,
    };

    this.addWorkshop = this.addWorkshop.bind(this);
    this.registerdWorkshops = this.registerdWorkshops.bind(this);

    this.formatInputData();
  }

  addWorkshop() {
    this.props.history.push("/addworkshop");
  }
  registerdWorkshops() {
    this.props.history.push("/registeredWorkshops");
  }

  formatInputData() {
    let departments = [];
    this.props.workshopList.map((item) => {
      if (!departments.includes(item.department)) {
        departments.push(item.department);
      }
    });
    this.setState({ departments });
  }

  createNavList() {
    let navs = [];
    let departments = [];
    this.props.workshopList.map((item) => {
      if (!departments.includes(item.department)) {
        departments.push(item.department);
      }
    });
    departments.map((dep) => {
      navs.push(
        <Nav.Item>
          <Nav.Link className="navLink" eventKey={dep}>
            {dep}
          </Nav.Link>
        </Nav.Item>
      );
    });
    return navs;
  }
  createTabContent() {
    let departments = [];
    this.props.workshopList.map((item) => {
      if (!departments.includes(item.department)) {
        departments.push(item.department);
      }
    });
    let panes = [];
    departments.map((dep) => {
      let workshops = [];
      this.props.workshopList.map((workshop) => {
        if (dep === workshop.department) {
          if (!workshops.includes(workshop.name)) {
            workshops.push(workshop);
          }
        }
      });
      panes.push(
        <Tab.Pane eventKey={dep}>
          <WorkshopListComponent workshopList={workshops} />
        </Tab.Pane>
      );
    });
    return panes;
  }

  render() {
    return (
      <header>
        <NavBar></NavBar>
        <MDBView src={homepage}>
          <MDBMask
            overlay="black-strong"
            className="flex-center-tab flex-column text-white text-center"
          >
            <Tab.Container id="left-tabs-example" defaultActiveKey="Medicine">
              <Row className="workshop-tabs">
                <Col sm={3}>
                  <Nav variant="pills" className="flex-column">
                    {this.createNavList()}
                  </Nav>
                </Col>

                <Col sm={9}>
                  <Tab.Content>
                    <h2 className="workshopHead">List of Workshops</h2>
                    {this.createTabContent()}
                  </Tab.Content>
                </Col>
              </Row>
            </Tab.Container>
            {this.state.role === "tutor" && (
              <Button type="submit" onClick={this.addWorkshop}>
                Add a Workshop
              </Button>
            )}
            <Button type="submit" onClick={this.registerdWorkshops}>
              Registered Workshops
            </Button>
          </MDBMask>
        </MDBView>
      </header>
    );
  }
}

export default WorkshopTabsComponent;
