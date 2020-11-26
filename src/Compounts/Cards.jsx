import React from "react";
import "../Compounts/compountStyle.scss";
import Property from "../property.js";

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
import Pinicon from "../Imgaes/pinBeforeClick.svg";
import Unpinicon from "../Imgaes/pinAfterClick(1).svg";
import Chip from "@material-ui/core/Chip";
import AccessAlarmIcon from "@material-ui/icons/AccessAlarm";
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
      reminder: null,
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
      this.setState({
        color: value,
      });
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
    this.handleDelete(this.state.id);
    let data1 = {
      noteIdList: [this.state.id],
      isArchived: false,
      reminder: "",
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
      this.setState({
        snackbarOpen: true,
        snackbarMessage: "Note archived",
      });
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

  pinNote = (id) => {
    let data = {
      noteIdList: [id],
      isPined: true,
    };
    Noteservice.pinUnpinNotes(data, (res) => {
      this.setState({ snackbarOpen: true, snackbarMessage: "Note Pined" });
      this.props.update();
    });
  };

  unPinNote = (id) => {
    let data = {
      noteIdList: [id],
      isPined: false,
    };
    Noteservice.pinUnpinNotes(data, (res) => {
      this.setState({ snackbarOpen: true, snackbarMessage: "Note Unpined" });
      this.props.update();
    });
  };

  handleDelete = (id) => {
    let data = {
      noteIdList: [id],
      reminder: "",
    };
    Noteservice.removeReminderNotes(data, (res) => {
      this.setState({
        snackbarOpen: true,
        snackbarMessage: "Note Reminder remove",
      });
      this.props.update();
    });
  };

  getReminder = (value) => {
    let data = {
      noteIdList: [this.state.id],
      reminder: value,
    };
    Noteservice.updateReminderNotes(data, (res) => {
      this.setState({
        snackbarOpen: true,
        snackbarMessage: "Note Reminder Add",
      });
      this.props.update();
    });
  };

  handleLabelDelete = (noteId, labelId) => {
    let data = {
      NoteId: noteId,
      lableId: labelId,
    };
    Noteservice.removeLableToNotes(data, (res) => {
      this.setState({
        snackbarOpen: true,
        snackbarMessage: "Note Label Remove",
      });
      this.props.update();
    });
  };

  render() {
    console.log("prasad", this.state.reminder);
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

        {this.props.allNotes.map((value, index) => {
          return (
            <>
              {value.isDeleted === this.props.trashNote &&
              value.isArchived === this.props.archiveNote &&
              value.title.includes(this.props.searchValue.replace(/ /g, "")) ===
                true &&
              value.isPined === this.props.pin &&
              value.reminder[0] !== this.props.reminderNote ? (
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
                      <Grid container spacing={3}>
                        <Grid item xs={10}>
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
                        </Grid>
                      </Grid>
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

                    <div style={{ marginTop: "-10%", marginBottom: "-11%" }}>
                      {value.reminder[0] != null ? (
                        <Chip
                          icon={<AccessAlarmIcon />}
                          label={value.reminder[0].substring(4, 16) + "8.00PM"}
                          onDelete={() => this.handleDelete(value.id)}
                          color="transparent"
                          variant="outlined"
                          style={{
                            marginLeft: "6%",
                            backgroundColor: "transparent",
                            fontWeight: "bold",
                          }}
                        />
                      ) : (
                        ""
                      )}
                    </div>
                    <div style={{ marginTop: "13%", marginBottom: "-15%" }}>
                      {value.noteLabels[0] != null &&
                      this.props.trashNote === false ? (
                        <>
                          {value.noteLabels.map((labelvalue, index) => {
                            return (
                              <Chip
                                onDelete={() =>
                                  this.handleLabelDelete(
                                    value.id,
                                    labelvalue.id
                                  )
                                }
                                label={labelvalue.label}
                                style={{
                                  marginLeft: "6%",
                                  backgroundColor: "transparent",
                                  fontWeight: "bold",
                                }}
                              />
                            );
                          })}
                        </>
                      ) : (
                        ""
                      )}
                    </div>

                    <Grid item xs={2} style={{ marginTop: "-5%" }}>
                      {this.props.trashNote === false ? (
                        <Button
                          style={{
                            marginLeft: "456%",
                            marginTop: "-480%",
                          }}
                        >
                          {this.props.pin === false ? (
                            <img
                              alt="Remy Sharp"
                              style={{
                                fontSize: "20%",
                                marginTop: "16%",
                                display: this.state.displypin,
                              }}
                              onClick={() => this.pinNote(value.id)}
                              src={Pinicon}
                            />
                          ) : (
                            <img
                              alt="Remy Sharp"
                              style={{
                                fontSize: "20%",
                                marginTop: "16%",
                                display: this.state.displypin,
                              }}
                              onClick={() => this.unPinNote(value.id)}
                              src={Unpinicon}
                            />
                          )}
                        </Button>
                      ) : (
                        ""
                      )}
                    </Grid>
                    {this.props.trashNote === false ? (
                      <CardActions
                        onClick={() => this.setState({ id: value.id })}
                        style={{ marginTop: "4%" }}
                      >
                        <IconButton>
                          <Remind reminder={this.getReminder}></Remind>
                        </IconButton>
                        <IconButton style={{ color: "black" }}>
                          <PersonAddIcon></PersonAddIcon>
                        </IconButton>
                        <IconButton>
                          <Colour color={this.getcolor}></Colour>
                        </IconButton>
                        {this.props.archiveNote === false ? (
                          <IconButton
                            style={{ marginLeft: "1%", color: "black" }}
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
                            allLabls={this.props.allLabls}
                            cardId={value.id}
                            update={this.props.update}
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
        <Dialog
          open={this.state.open}
          onClose={this.thishandleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <div style={{ backgroundColor: this.state.color }}>
            <DialogContent>
              <h1 style={{ color: this.state.color }}>{Property.card}</h1>
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
                <CardActions className="cardicon">
                  <Remind reminder={this.getReminder}></Remind>
                  <PersonAddIcon></PersonAddIcon>
                  <Colour color={this.getcolor}></Colour>
                  <ArchiveIcon
                    // style={{ marginLeft: "3%" }}
                    onClick={() => this.archive(this.state.id)}
                  ></ArchiveIcon>
                  <More delete={this.isDelete}></More>
                  <Button
                    onClick={this.handleClose}
                    color="primary"
                    style={{
                      // marginLeft: "45%",
                      // marginTop: "1%",
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
