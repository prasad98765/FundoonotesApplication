import React from "react";
import { Grid } from "@material-ui/core/";
import Navbar from "../../Compounts/Navbar.jsx";
import Notes from "../../Compounts/CreateNote.jsx";
import Sidebar from "../../Compounts/Sidebar";
import Noteservice from "../../Services/NoteServices.js";
import Lable from "../../Compounts/Lable.jsx";
import Pin from "../../Compounts/PinCard.jsx";
import Cards from "../../Compounts/Cards.jsx";
const details = JSON.parse(localStorage.getItem("image"));

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
      reminderNote: "",
      searchValue: "",
      allLabls: [],
      lable: false,
      profileImage: "",
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

    Noteservice.getNoteLabelList((res) => {
      this.setState({
        allLabls: res.data.data.details,
      });
    });
    this.setState({ profileImage: details.imageUrl });
  };

  onclickdrawer = (value) => {
    if (value === "Notes") {
      this.componentWillMount();
      this.setState({
        reminderNote: "ab",
        trashNote: false,
        archiveNote: false,
        condition: true,
      });
    } else if (value === "Trash") {
      this.componentWillMount();
      this.setState({
        reminderNote: "ab",
        trashNote: true,
        archiveNote: false,
        condition: false,
      });
    } else if (value === "Archive") {
      this.componentWillMount();
      this.setState({
        reminderNote: "ab",
        archiveNote: true,
        trashNote: false,
        condition: false,
      });
    } else if (value === "Edit labels") {
      this.setState({ lable: true });
    } else if (value === "Reminders") {
      this.componentWillMount();
      this.setState({
        reminderNote: null,
        archiveNote: false,
        condition: false,
        trashNote: false,
      });
    } else {
      Noteservice.getNotesListByLabels(value, (res) => {
        this.setState({
          allNotes: res.data.data.data,
          condition: false,
          reminderNote: "ab",
        });
      });
    }
  };

  onClose = (value) => {
    this.setState({ lable: false });
  };

  render() {
    return (
      <>
        {this.state.condition === true ? (
          <Notes
            note={this.componentWillMount}
            allLabls={this.state.allLabls}
            update={this.componentWillMount}
          ></Notes>
        ) : (
          ""
        )}
        <Sidebar
          menuOpen={this.handleDrawerOpen}
          menuClose={this.handleDrawerClose}
          drawerOpen={this.state.drawerOpen}
          drawerclick={this.onclickdrawer}
          allLabls={this.state.allLabls}
        ></Sidebar>
        <Navbar
          details={this.state.item}
          menuOpen={this.handleDrawerOpen}
          update={this.componentWillMount}
          searchValue={this.searchValue}
          imageUrl={this.state.profileImage}
        ></Navbar>
        <Grid container spacing={0}>
          <Grid container item xs={12} spacing={0}>
            <Pin
              allNotes={this.state.allNotes}
              update={this.componentWillMount}
              trashNote={this.state.trashNote}
              archiveNote={this.state.archiveNote}
              searchValue={this.state.searchValue}
              reminderNote={this.state.reminderNote}
              allLabls={this.state.allLabls}
            ></Pin>
          </Grid>
          <Grid container item xs={12} spacing={0}>
            <Cards
              pin={false}
              allNotes={this.state.allNotes}
              update={this.componentWillMount}
              trashNote={this.state.trashNote}
              archiveNote={this.state.archiveNote}
              searchValue={this.state.searchValue}
              reminderNote={this.state.reminderNote}
              allLabls={this.state.allLabls}
            ></Cards>
          </Grid>
        </Grid>
        <Lable
          allLabls={this.state.allLabls}
          lable={this.state.lable}
          update={this.componentWillMount}
          onClose={this.onClose}
        ></Lable>
      </>
    );
  }
}
export default Dashboard;
