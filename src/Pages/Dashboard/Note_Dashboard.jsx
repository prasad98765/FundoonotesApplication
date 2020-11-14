import React from "react";
import Navbar from "../../Compounts/Navbar.jsx";
import Notes from "../../Compounts/Notecard.jsx";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: null,
    };
    this.state.item = this.props.history.location.state;
  }
  render() {
    return (
      <>
        <Navbar details={this.state.item}></Navbar>
        <Notes></Notes>
      </>
    );
  }
}
export default Dashboard;
