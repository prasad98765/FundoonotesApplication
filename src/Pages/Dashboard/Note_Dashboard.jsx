import React from "react";
import Navbar from "../../Compounts/Navbar.jsx";
import Notes from "../../Compounts/CreateNote.jsx";
import Sidebar from "../../Compounts/Sidebar";
import Noteservice from "../../Services/NoteServices.js";
class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: null,
      drawerOpen: false,
      allNotes: [],
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

  componentWillMount = () => {
    console.log("ahsdkjfhsfahsdkfjhsadafjkdfhk");
    Noteservice.getAllNotes((res) => {
      this.setState({
        allNotes: res.data.data.data,
      });
    });
  };

  handleClose = () => {};
  render() {
    return (
      <>
        <Notes note={this.componentWillMount}></Notes>
        <Sidebar
          menuOpen={this.handleDrawerOpen}
          menuClose={this.handleDrawerClose}
          drawerOpen={this.state.drawerOpen}
          notes={this.state.allNotes}
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
