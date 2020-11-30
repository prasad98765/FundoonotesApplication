import React from "react";
import "../Compounts/compountStyle.scss";
import Checkbox from "@material-ui/core/Checkbox";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Button } from "@material-ui/core/";
import Noteservice from "../Services/NoteServices.js";
import { makeStyles, Typography, Popover } from "@material-ui/core/";
import MoreVertIcon from "@material-ui/icons/MoreVert";
const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(3),
  },
}));

class More extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      labelopen: false,
      anchorEl: null,
      message: "",
      gilad: false,
      checkedValues: [],
      labelId: null,
    };
    this.state.message = this.props.action;
  }

  handleClick = (event) => {
    if (!this.props.action) {
      this.setState({ message: "Add Drawming" });
    } else {
      this.setState({ message: "Delete Note" });
    }
    this.setState({ open: true });
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ open: false, labelopen: false });
  };

  LabelhandleClose = () => {
    this.setState({ labelopen: false, open: false });
  };

  deleteNote = () => {
    this.props.delete("aba");
  };

  LabelNote = () => {
    this.setState({ labelopen: true });
  };

  closeLable = () => {
    this.setState({ labelopen: false, open: false });
  };

  handleCheck(e, x, id) {
    this.setState((state) => ({
      checkedValues: state.checkedValues.includes(x)
        ? state.checkedValues.filter((c) => c !== x)
        : [...state.checkedValues, x],
    }));
    this.props.getId(id);
    let data = {
      NoteId: this.props.cardId,
      lableId: id,
    };
    Noteservice.addLableToNotes(data, (res) => {
      console.log(res);
      this.setState({ open: false, labelopen: false });
      this.props.update();
    });
  }

  render() {
    console.log("in More Class", this.state.checkedValues);
    return (
      <>
        <MoreVertIcon
          style={{ marginLeft: "4%", color: "black", cursor: "pointer" }}
          variant="contained"
          color="primary"
          title="Remind me"
          onClick={this.handleClick}
        ></MoreVertIcon>
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          onClose={this.handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          PaperProps={{
            className: "more",
          }}
        >
          <Typography className={useStyles.typography}>
            <p style={{ marginTop: "-1%", color: "black" }}>
              <Button
                color="primary"
                style={{ color: "black" }}
                onClick={this.deleteNote}
              >
                {this.state.message}
              </Button>
            </p>
            <p style={{ marginTop: "-11%" }}>
              <Button
                color="primary"
                style={{ color: "black" }}
                onClick={this.LabelNote}
              >
                Add Label
              </Button>
            </p>
            <p style={{ marginTop: "-11%" }}>
              <Button color="primary" style={{ color: "black" }}>
                show checkboxes
              </Button>
            </p>
          </Typography>
        </Popover>

        <Popover
          aria-labelledby="simple-dialog-title"
          open={this.state.labelopen}
          anchorEl={this.state.anchorEl}
          onClose={this.handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
            display: "flex",
          }}
          PaperProps={{
            className: "more",
          }}
        >
          <FormLabel component="legend">Label note</FormLabel>
          {this.props.allLabls.map((value, x) => {
            return (
              <FormControlLabel
                control={
                  <Checkbox
                    label={x}
                    key={x.toString()}
                    onChange={(e) => this.handleCheck(e, x, value.id)}
                    checked={this.state.checkedValues.includes(x)}
                  />
                }
                label={value.label}
              />
            );
          })}
        </Popover>
      </>
    );
  }
}

export default More;
