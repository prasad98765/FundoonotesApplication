import React from "react";
import { makeStyles, Grid, Typography, Popover } from "@material-ui/core/";
import ColorLensIcon from "@material-ui/icons/ColorLens";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(3),
  },
}));

class SimplePopover extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      anchorEl: null,
      colour: [
        "red",
        "lightblue",
        "lightgreen",
        "lightgray",
        "lightpink",
        "yellow",
        "brown",
        "purple",
      ],
    };
  }

  handleClick = (event) => {
    this.setState({ open: true });
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  getcolour = (abc) => () => {
    this.props.color(abc);
  };

  render() {
    return (
      <>
        <ColorLensIcon
          style={{ marginLeft: "4%", color: "black" }}
          variant="contained"
          color="primary"
          onMouseEnter={this.handleClick}
        ></ColorLensIcon>
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
            style: { height: "15%" },
          }}
        >
          <Typography className={useStyles.typography}>
            <Grid container spacing={3}>
              {this.state.colour.map((value, index) => {
                return (
                  <FiberManualRecordIcon
                    style={{
                      color: value,
                      marginTop: "6%",
                      marginLeft: "10%",
                      fontSize: "220%",
                    }}
                    onClick={this.getcolour(value)}
                  ></FiberManualRecordIcon>
                );
              })}
            </Grid>
          </Typography>
        </Popover>
      </>
    );
  }
}

export default SimplePopover;
