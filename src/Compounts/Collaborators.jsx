import React from "react";
import Property from "../property.js";

import { Button, CardContent, Avatar } from "@material-ui/core/";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import UserServicesAPI from "../Services/UserServicesAPI.js";
import CloseIcon from "@material-ui/icons/Close";
import Noteservice from "../Services/NoteServices.js";
const details = JSON.parse(localStorage.getItem("details"));
class Collaborators extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      input: "",
      users: [],
      userDetails: [],
      r: [this.props.coll],
      searchEmail: "",
      displayUserDetails: [{ firstName: "ab", email: "al" }],
    };
  }
  handleClick = () => {
    this.setState({ open: true });
  };
  thishandleClose = () => {
    this.setState({ open: false });
  };
  handleUserEmail = async (value) => {
    this.setState({ searchEmail: await value });

    this.state.users.map((addItem) => {
      if (addItem.email === this.state.searchEmail) {
        this.state.userDetails.push([
          {
            name: addItem.firstName,
            lastname: addItem.lastName,
            email: addItem.email,
            id: addItem.userId,
          },
        ]);
      }
      return addItem.email;
    });
  };

  handleChange = async (e) => {
    this.setState({ [e.target.name]: await e.target.value });
    let data = {
      searchWord: this.state.input,
    };
    UserServicesAPI.searchUserList(data, (res) => {
      console.log(res);
      if (res.status === 200) {
        this.setState({ users: res.data.data.details });
      } else {
        this.setState({ users: [] });
      }
    });
  };
  setSearchEmail = (value) => {
    this.setState({ searchEmail: value });
  };

  saveCollaborators = () => {
    let data = {
      noteId: this.props.cardId,
      email: this.state.userDetails[0][0].email,
      firstName: this.state.userDetails[0][0].name,
      lastName: this.state.userDetails[0][0].lastname,
      userId: this.state.userDetails[0][0].id,
    };
    Noteservice.addCollaboratorsNotes(data, (res) => {
      console.log(res);
      this.props.update();
    });
  };

  deteleCollaborators = (userId) => {
    var data = {
      noteId: this.props.cardId,
      userId: userId,
    };
    Noteservice.deleteCollaboratorsNotes(data, (res) => {
      console.log(res);
      this.props.update();
    });
  };

  render() {
    return (
      <>
        <PersonAddIcon
          style={{ marginLeft: "4%", color: "black", cursor: "pointer" }}
          variant="contained"
          color="primary"
          title="Remind me"
          onClick={this.handleClick}
        ></PersonAddIcon>
        <Dialog
          open={this.state.open}
          onClose={this.thishandleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <div style={{ backgroundColor: this.state.color }}>
            <DialogTitle id="alert-dialog-title">Collaborators</DialogTitle>
            <DialogContent>
              <h1 style={{ color: "white" }}>{Property.Collaborator}</h1>

              <CardContent style={{ marginTop: "-6%" }}>
                <h4 style={{ marginTop: "-18%" }}>
                  {details.name} {details.lastname} (Owner)
                </h4>
                <h4 style={{ marginTop: "-5%" }}>{details.email}</h4>
                <div>
                  {this.props.coll.map((item, index) => (
                    <div
                      key={index}
                      className="showUserEmailWithAvatar"
                      style={{ marginBottom: "5%" }}
                    >
                      <Avatar className="avatar" style={{ width: "10%" }}>
                        {item.firstName.slice(0, 1)}
                      </Avatar>
                      <h4 style={{ marginTop: "-10%", marginLeft: "11%" }}>
                        {item.firstName} {item.lastName}
                      </h4>
                      <h4 style={{ marginTop: "-5%", marginLeft: "11%" }}>
                        {item.email}
                      </h4>
                      <Avatar
                        className="avatar"
                        style={{
                          marginTop: "-13%",
                          marginLeft: "70%",
                          backgroundColor: "transparent",
                          color: "black",
                          cursor: "pointer",
                        }}
                      >
                        <CloseIcon
                          onClick={() => this.deteleCollaborators(item.userId)}
                        ></CloseIcon>
                      </Avatar>
                    </div>
                  ))}
                </div>
                <Autocomplete
                  freeSolo
                  style={{
                    marginLeft: "0%",
                    display: "flex",
                    alignItems: "center",
                  }}
                  options={this.state.users.map((options) => options.email)}
                  onChange={(event, value) => this.handleUserEmail(value)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      margin="normal"
                      variant="standard"
                      name="input"
                      autoFocus
                      label={
                        <div>
                          <AddCircleOutlineIcon></AddCircleOutlineIcon>
                          <p
                            style={{
                              marginLeft: "13%",
                              marginTop: "-11%",
                              width: "100%",
                            }}
                          >
                            {" "}
                            person or email to share with
                          </p>
                        </div>
                      }
                      onChange={this.handleChange}
                    />
                  )}
                />
              </CardContent>
            </DialogContent>
          </div>
          <DialogActions>
            <Button color="primary" onClick={this.saveCollaborators} autoFocus>
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

export default Collaborators;
