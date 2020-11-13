import React from "react";
import Navbar from "../../Compounts/Navbar.jsx";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: null,
    };
    this.state.item = this.props.history.location.state;
  }
  render() {
    console.log("in Dashboard", this.state.item);
    return (
      <>
        <Navbar details={this.state.item}></Navbar>
      </>
    );
  }
}
export default Dashboard;
