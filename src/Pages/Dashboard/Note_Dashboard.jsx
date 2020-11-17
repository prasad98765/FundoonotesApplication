import React from "react";
import Navbar from "../../Compounts/Navbar.jsx";
import Notes from "../../Compounts/CreateNote.jsx";
import Sidebar from "../../Compounts/Sidebar";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: null,
      drawerOpen: false,
    };
    // this.state.item = this.props.history.location.state;
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

  componentWillMount = () => {
    if (!this.props.history.location.state) {
      this.props.history.push({
        pathname: "/error",
      });
    } else {
      this.setState({
        item: this.props.history.location.state,
      });
    }
  };

  handleClose = () => {};
  render() {
    return (
      <>
        <Notes></Notes>
        <Sidebar
          menuOpen={this.handleDrawerOpen}
          menuClose={this.handleDrawerClose}
          drawerOpen={this.state.drawerOpen}
        ></Sidebar>
        <Navbar
          details={this.state.item}
          menuOpen={this.handleDrawerOpen}
        ></Navbar>
      </>
    );
  }
}
export default Dashboard;
