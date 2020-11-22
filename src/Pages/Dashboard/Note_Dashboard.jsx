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
      condition: true,
      trashNote: false,
      archiveNote: false,
      searchValue: "",
    };
    this.state.item = this.props.history.location.state;
  }

  handleDrawerOpen = () => {
    this.setState({
      drawerOpen: true,
    });
  };

  handleDrawerClose = () => {
    this.setState({
      drawerOpen: false,
    });
  };
  searchValue = (value) => {
    console.log(value);
    if (value !== "") {
      this.setState({ searchValue: value });
      this.setState({ condition: false });
    } else {
      if (this.state.archiveNote === false && this.state.trashNote === false) {
        this.setState({ searchValue: "" });
        this.setState({ condition: true });
      } else {
        this.setState({ searchValue: "" });
        this.setState({ condition: false });
      }
    }
  };

  componentWillMount = () => {
    Noteservice.getAllNotes((res) => {
      this.setState({
        allNotes: res.data.data.data.reverse(),
      });
    });
  };

  onclickdrawer = (value) => {
    if (value === "Notes") {
      this.setState({ trashNote: false, archiveNote: false, condition: true });
    } else if (value === "Trash") {
      this.setState({ trashNote: true, archiveNote: false, condition: false });
    } else if (value === "Archive") {
      this.setState({ archiveNote: true, trashNote: false, condition: false });
    }
  };

  handleClose = () => {};
  render() {
    return (
      <>
        {this.state.condition === true ? (
          <Notes note={this.componentWillMount}></Notes>
        ) : (
          ""
        )}
        <Sidebar
          menuOpen={this.handleDrawerOpen}
          menuClose={this.handleDrawerClose}
          drawerOpen={this.state.drawerOpen}
          notes={this.state.allNotes}
          update={this.componentWillMount}
          drawerclick={this.onclickdrawer}
          trashNotes={this.state.trashNote}
          archiveNotes={this.state.archiveNote}
          searchValue={this.state.searchValue}
        ></Sidebar>
        <Navbar
          details={this.state.item}
          menuOpen={this.handleDrawerOpen}
          searchValue={this.searchValue}
        ></Navbar>
      </>
    );
  }
}
export default Dashboard;
