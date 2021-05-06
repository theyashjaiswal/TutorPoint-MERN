import React from 'react';
import NavComponent from '../components/NavComponent.jsx'

class NavContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {workshops:['a','b','c']};
  }

  render() {
    return (
      <NavComponent/>
    );
  }
}

export default NavContainer;