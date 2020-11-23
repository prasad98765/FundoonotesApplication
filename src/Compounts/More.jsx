import React from "react";
import "../Compounts/compountStyle.scss";

import { makeStyles, Typography, Popover, Button } from "@material-ui/core/";
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
      anchorEl: null,
      message: "",
    };
    this.state.message = this.props.action;
  }

  handleClick = (event) => {
    if (!this.props.action) {
      this.setState({ message: "Add label" });
    } else {
      this.setState({ message: "Delete Note" });
    }
    this.setState({ open: true });
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  deleteNote = () => {
    this.props.delete("aba");
  };

  render() {
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
              <Button color="primary" style={{ color: "black" }}>
                Add drawing
              </Button>
            </p>
            <p style={{ marginTop: "-11%" }}>
              <Button color="primary" style={{ color: "black" }}>
                show checkboxes
              </Button>
            </p>
          </Typography>
        </Popover>
      </>
    );
  }
}

export default More;
