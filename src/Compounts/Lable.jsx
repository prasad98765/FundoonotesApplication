import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import { IconButton, Button } from "@material-ui/core/";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import CloseIcon from "@material-ui/icons/Close";
import CheckIcon from "@material-ui/icons/Check";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Noteservice from "../Services/NoteServices.js";

const details = JSON.parse(localStorage.getItem("details"));

class Lable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lable: "",
      Newlabel: "",
      ab: true,
    };
  }
  handleChange = async (e) => {
    this.setState({ [e.target.name]: await e.target.value });
  };
  changeIcon = () => {
    this.setState({ ab: false });
  };
  changeLableIcon = () => {
    this.setState({ ab: true });
  };

  closeLable = () => {
    this.props.onClose();
  };

  postLable = () => {
    let data = {
      label: this.state.lable,
      isDeleted: false,
      userId: details.userId,
    };
    Noteservice.noteLabels(data, (res) => {
      this.setState({ lable: "" });
      this.props.update();
    });
  };

  deleteLable = (id) => {
    console.log("delete lable", id);
    let data = {
      id: id,
    };
    Noteservice.deleteNoteLabels(data, (res) => {
      console.log(res);
      this.props.update();
    });
  };

  editLable = (id) => {
    let data = {
      label: this.state.Newlabel,
      isDeleted: false,
      userId: details.userId,
      id: id,
    };
    Noteservice.updateNoteLabels(data, (res) => {
      this.props.update();
    });
  };

  render() {
    return (
      <>
        <Dialog aria-labelledby="simple-dialog-title" open={this.props.lable}>
          <DialogTitle id="simple-dialog-title">Edit lable</DialogTitle>
          <DialogTitle id="simple-dialog-title" style={{ color: "white" }}>
            rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr
          </DialogTitle>
          <DialogTitle id="simple-dialog-title" style={{ color: "white" }}>
            <FormControl
              style={{
                width: "100%",
                marginTop: "-35%",
              }}
            >
              <Input
                id="standard-adornment-password"
                placeholder="Create New Lable"
                style={{ marginTop: "4%" }}
                value={this.state.lable}
                name="lable"
                onChange={this.handleChange}
                startAdornment={
                  <>
                    <InputAdornment position="start">
                      <IconButton aria-label="toggle password visibility">
                        {
                          <CloseIcon
                            onClick={() => {
                              this.setState({ lable: "" });
                            }}
                          />
                        }
                      </IconButton>
                    </InputAdornment>
                  </>
                }
                endAdornment={
                  <>
                    <InputAdornment position="end">
                      <IconButton aria-label="toggle password visibility">
                        {<CheckIcon onClick={this.postLable} />}
                      </IconButton>
                    </InputAdornment>
                  </>
                }
              />
            </FormControl>
          </DialogTitle>
          <DialogTitle id="simple-dialog-title" style={{ color: "white" }}>
            <FormControl
              style={{
                width: "100%",
                marginTop: "-40%",
              }}
            >
              {this.props.allLabls.map((value, index) => {
                return (
                  <>
                    <Input
                      placeholder="Create New Lable"
                      type="text"
                      style={{ marginTop: "2%" }}
                      defaultValue={value.label}
                      name="Newlabel"
                      onChange={this.handleChange}
                      startAdornment={
                        <>
                          <InputAdornment position="start">
                            <IconButton
                              d
                              onMouseOut={this.changeLableIcon}
                              onMouseOver={this.changeIcon}
                            >
                              <DeleteIcon
                                onClick={() => this.deleteLable(value.id)}
                              ></DeleteIcon>
                            </IconButton>
                          </InputAdornment>
                        </>
                      }
                      endAdornment={
                        <>
                          <InputAdornment position="end">
                            <IconButton aria-label="toggle password visibility">
                              {
                                <EditIcon
                                  onClick={() => this.editLable(value.id)}
                                />
                              }
                            </IconButton>
                          </InputAdornment>
                        </>
                      }
                    />
                  </>
                );
              })}
            </FormControl>
          </DialogTitle>
          <Button
            variant="outlined"
            color="primary"
            style={{ color: "black" }}
            onClick={this.closeLable}
          >
            Close
          </Button>
        </Dialog>
      </>
    );
  }
}

export default Lable;
