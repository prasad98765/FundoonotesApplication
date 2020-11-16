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
    };
  }

  handleClick = (event) => {
    this.setState({ open: true });
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <>
        <MoreVertIcon
          style={{ marginLeft: "4%", color: "black" }}
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
              <Button color="primary" style={{ color: "black" }}>
                Add label
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
