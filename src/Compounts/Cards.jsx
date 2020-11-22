import React from "react";
import "../Compounts/compountStyle.scss";
import { Card, Button, Grid, Snackbar } from "@material-ui/core/";
import Remind from "./Remind";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import Colour from "./Displaycolor";
import More from "./More";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import ArchiveIcon from "@material-ui/icons/Archive";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import Noteservice from "../Services/NoteServices.js";
import RestoreFromTrashIcon from "@material-ui/icons/RestoreFromTrash";
import DeleteIcon from "@material-ui/icons/Delete";
import UnarchiveIcon from "@material-ui/icons/Unarchive";

class Cards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: null,
      open: false,
      snackbarOpen: false,
      allNotes: [],
      message: "Delete Note",
      title: "",
      description: "",
      id: "",
      condition: this.props.trashNote,
      trashAction: true,
      snackbarMessage: "",
    };
    this.state.allNotes = this.props.allNotes;
  }
  handleChange = async (e) => {
    this.setState({ [e.target.name]: await e.target.value });
  };

  getcolor = (value) => {
    let data = {
      noteIdList: [this.state.id],
      color: value,
    };
    Noteservice.changesColorNotes(data, (res) => {
      this.props.update();
    });
  };

  handleClickOpen = (title, description, id, color) => {
    this.setState({
      open: true,
      title: title,
      description: description,
      id: id,
      color: color,
    });
  };

  close = () => {
    this.setState({ open: false });
  };

  handleClose = () => {
    let data = {
      title: this.state.title,
      description: this.state.description,
      noteId: this.state.id,
    };
    Noteservice.updateNotes(data, (res) => {
      if (res.status === 200) {
        this.props.update();
        this.setState({ open: false });
      } else {
        this.setState({ snackbarOpen: true });
      }
    });
  };
  handleSnackbarClose = (event) => {
    this.setState({
      snackbarOpen: false,
    });
  };

  isDelete = () => {
    let data1 = {
      noteIdList: [this.state.id],
      isArchived: false,
    };
    Noteservice.archiveNotes(data1, (res) => {});

    let data = {
      noteIdList: [this.state.id],
      isDeleted: true,
      isArchived: false,
    };
    Noteservice.trashNotes(data, (res) => {
      this.setState({ snackbarOpen: true, snackbarMessage: "Note Trashed" });
      this.props.update();
    });
  };

  Restore = (id) => {
    console.log(id);
    let data = {
      noteIdList: [id],
      isDeleted: false,
    };
    Noteservice.restoreTrashNotes(data, (res) => {
      console.log(res);
      if (res.status === 200) {
        this.setState({ snackbarOpen: true, snackbarMessage: "Note Restored" });
        this.props.update();
      }
    });
  };

  deleteForever = (id) => {
    let data = {
      noteIdList: [id],
      isDeleted: true,
    };
    Noteservice.deleteForeverNotes(data, (res) => {
      this.setState({ snackbarOpen: true, snackbarMessage: "Note Deleted" });
      this.props.update();
    });
  };

  archive = (id) => {
    let data = {
      noteIdList: [id],
      isArchived: true,
    };
    Noteservice.archiveNotes(data, (res) => {
      this.setState({ snackbarOpen: true, snackbarMessage: "Note archived" });
      this.props.update();
    });
  };

  unArchive = (id) => {
    let data = {
      noteIdList: [id],
      isArchived: false,
    };
    Noteservice.archiveNotes(data, (res) => {
      this.setState({ snackbarOpen: true, snackbarMessage: "Note unArchived" });
      this.props.update();
    });
  };

  render() {
    return (
      <>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          open={this.state.snackbarOpen}
          autoHideDuration={2000}
          onClose={this.handleSnackbarClose}
          message={<span id="message-id">{this.state.snackbarMessage}</span>}
        />
        <Grid container spacing={0} style={{ marginTop: "4%" }}>
          {this.props.allNotes.map((value, index) => {
            return (
              <>
                {value.isDeleted === this.props.trashNote &&
                value.isArchived === this.props.archiveNote &&
                value.title.includes(this.props.searchValue) === true ? (
                  <Grid class="cards" item xs={12} sm={6}>
                    <Card
                      style={{
                        backgroundColor: value.color,
                      }}
                    >
                      <CardContent
                        onClick={() =>
                          this.handleClickOpen(
                            value.title,
                            value.description,
                            value.id,
                            value.color
                          )
                        }
                      >
                        <Typography
                          color="textSecondary"
                          variant="h5"
                          component="h2"
                        >
                          <textarea
                            disabled
                            value={value.title}
                            style={{
                              width: "100%",
                              color: "black",
                              backgroundColor: "transparent",
                              border: "none",
                              resize: "none",
                            }}
                          />
                        </Typography>
                        <Typography variant="h5" component="h2">
                          <textarea
                            value={value.description}
                            disabled
                            style={{
                              width: "100%",
                              color: "black",
                              backgroundColor: "transparent",
                              border: "none",
                              resize: "none",
                            }}
                          />
                        </Typography>
                      </CardContent>
                      {this.props.trashNote === false ? (
                        <CardActions
                          onClick={() => this.setState({ id: value.id })}
                        >
                          <IconButton style={{ marginLeft: "-1%" }}>
                            <Remind></Remind>
                          </IconButton>
                          <IconButton
                            style={{ marginLeft: "-1%", color: "black" }}
                          >
                            <PersonAddIcon></PersonAddIcon>
                          </IconButton>
                          <IconButton style={{ marginLeft: "-1%" }}>
                            <Colour color={this.getcolor}></Colour>
                          </IconButton>
                          {this.props.archiveNote === false ? (
                            <IconButton
                              style={{ marginLeft: "-1%", color: "black" }}
                            >
                              <ArchiveIcon
                                onClick={() => this.archive(value.id)}
                              ></ArchiveIcon>
                            </IconButton>
                          ) : (
                            <IconButton
                              style={{ marginLeft: "-1%", color: "black" }}
                            >
                              <UnarchiveIcon
                                onClick={() => this.unArchive(value.id)}
                              ></UnarchiveIcon>
                            </IconButton>
                          )}

                          <IconButton style={{ marginLeft: "-1%" }}>
                            <More
                              action={this.state.message}
                              delete={this.isDelete}
                            ></More>
                          </IconButton>
                        </CardActions>
                      ) : (
                        <CardActions
                          onClick={() => this.setState({ id: value.id })}
                        >
                          <IconButton
                            style={{ marginLeft: "-1%", color: "black" }}
                          >
                            <DeleteIcon
                              onClick={() => this.deleteForever(value.id)}
                            ></DeleteIcon>
                          </IconButton>
                          <IconButton
                            style={{ marginLeft: "-1%", color: "black" }}
                          >
                            <RestoreFromTrashIcon
                              onClick={() => this.Restore(value.id)}
                            ></RestoreFromTrashIcon>
                          </IconButton>
                        </CardActions>
                      )}
                    </Card>
                  </Grid>
                ) : (
                  ""
                )}
              </>
            );
          })}
        </Grid>
        <Dialog
          open={this.state.open}
          onClose={this.thishandleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <div style={{ backgroundColor: this.state.color }}>
            <DialogContent>
              <h1 style={{ color: this.state.color }}>
                jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
              </h1>
              <CardContent style={{ marginTop: "-19%" }}>
                <Typography color="textSecondary" gutterBottom>
                  <textarea
                    value={this.state.title}
                    style={{
                      width: "100%",
                      backgroundColor: "transparent",
                      border: "none",
                      outline: "none",
                      resize: "none",
                    }}
                    name="title"
                    onChange={this.handleChange}
                  />
                </Typography>
                <Typography variant="h5" component="h2">
                  <textarea
                    value={this.state.description}
                    style={{
                      width: "100%",
                      backgroundColor: "transparent",
                      border: "none",
                      outline: "none",
                      resize: "none",
                    }}
                    name="description"
                    onChange={this.handleChange}
                  />
                </Typography>
              </CardContent>

              <div>
                <CardActions>
                  <Remind></Remind>
                  <PersonAddIcon></PersonAddIcon>
                  <Colour color={this.getcolor}></Colour>
                  <ArchiveIcon style={{ marginLeft: "3%" }}></ArchiveIcon>
                  <More></More>
                  <Button
                    onClick={this.handleClose}
                    color="primary"
                    style={{
                      marginLeft: "45%",
                      marginTop: "1%",
                      color: "black",
                    }}
                  >
                    Close
                  </Button>
                </CardActions>
              </div>
            </DialogContent>
          </div>
        </Dialog>
      </>
    );
  }
}

export default Cards;
