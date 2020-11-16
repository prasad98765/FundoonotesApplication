import React from "react";
import Navbar from "../../Compounts/Navbar.jsx";
import Notes from "../../Compounts/Notecard.jsx";
import Sidebar from "../../Compounts/Sidebar";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: null,
      drawerOpen: false,
    };
    this.state.item = this.props.history.location.state;
  }

  handleDrawerOpen = () => {
    console.log("Ajakjajk");
    this.setState({
      drawerOpen: true,
    });
  };

  handleDrawerClose = () => {
    this.setState({
      drawerOpen: false,
    });
  };
  render() {
    return (
      <>
        <Sidebar
          menuOpen={this.handleDrawerOpen}
          menuClose={this.handleDrawerClose}
          drawerOpen={this.state.drawerOpen}
        ></Sidebar>
        <Navbar
          details={this.state.item}
          menuOpen={this.handleDrawerOpen}
        ></Navbar>
        <Notes></Notes>
      </>
    );
  }
}
export default Dashboard;
