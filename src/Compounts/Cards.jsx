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
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import Noteservice from "../Services/NoteServices.js";
import RestoreFromTrashIcon from "@material-ui/icons/RestoreFromTrash";
import DeleteIcon from "@material-ui/icons/Delete";

class Cards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: "",
      open: false,
      snackbarOpen: false,
      allNotes: [],
      message: "Delete Note",
      title: "",
      description: "",
      id: "",
      condition: this.props.trashNote,
      trashAction: true,
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

  handleClickOpen = (title, description, id) => {
    this.setState({
      open: true,
      title: title,
      description: description,
      id: id,
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
    let data = {
      noteIdList: [this.state.id],
      isDeleted: true,
    };
    Noteservice.trashNotes(data, (res) => {
      this.props.update();
    });
  };

  render() {
    return (
      <>
        <Snackbar
          anchorOrigin={{
            vertical: "center",
            horizontal: "center",
          }}
          open={this.state.snackbarOpen}
          autoHideDuration={3000}
          onClose={this.handleSnackbarClose}
          message={<span id="message-id">Somthing is Wrong</span>}
        />
        <Grid container spacing={0} style={{ marginTop: "4%" }}>
          {this.props.allNotes.map((value, index) => {
            return (
              <>
                {value.isDeleted === this.props.trashNote ? (
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
                            value.id
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
                          <IconButton
                            style={{ marginLeft: "-1%", color: "black" }}
                          >
                            <ArchiveIcon></ArchiveIcon>
                          </IconButton>
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
                            <DeleteIcon></DeleteIcon>
                          </IconButton>
                          <IconButton
                            style={{ marginLeft: "-1%", color: "black" }}
                          >
                            <RestoreFromTrashIcon></RestoreFromTrashIcon>
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
          <DialogContent>
            <h1 style={{ color: "white" }}>
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
                  style={{ marginLeft: "45%", marginTop: "1%" }}
                >
                  Close
                </Button>
              </CardActions>
            </div>
          </DialogContent>
          <DialogActions></DialogActions>
        </Dialog>
      </>
    );
  }
}

export default Cards;
