/*Author: Manpreet Singh, BannerID: B00853930*/
import React from "react";
import axios from "axios";
import WorkshopTabsComponent from "../components/WorkshopTabsComponent.jsx";
import { Button } from "react-bootstrap";
import Swal from "sweetalert2/src/sweetalert2.js";
import "@sweetalert2/theme-dark/dark.css";

class WorkshopContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { workshopDetails: [] };
    // this.getWorkshops();
  }
  componentDidMount() {
    this.getWorkshops();
  }

  async getWorkshops() {
    await axios
      .get("https://tutorpoint1.herokuapp.com/api/workshopDetails/")
      .then((response) => {
        this.setState({
          workshopDetails: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
        console.log(error.message);
        Swal.fire("workShops not found");
      });
  }

  render() {
    return (
      <div>
        <WorkshopTabsComponent
          workshopList={this.state.workshopDetails}
          history={this.props.history}
        />
      </div>
    );
  }
}

export default WorkshopContainer;
