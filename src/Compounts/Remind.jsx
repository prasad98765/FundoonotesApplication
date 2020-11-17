import React from "react";
import "../Compounts/compountStyle.scss";

import {
  makeStyles,
  Grid,
  Typography,
  Popover,
  Box,
  Link,
} from "@material-ui/core/";
import AddAlertIcon from "@material-ui/icons/AddAlert";
const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(3),
  },
}));

class RemindMe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      anchorEl: null,
      remind: ["Later today", "Tomorrow", "Next week"],
      time: "8:00 PM",
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
        <AddAlertIcon
          style={{ marginLeft: "4%", color: "black" }}
          variant="contained"
          color="primary"
          title="Remind me"
          onClick={this.handleClick}
        ></AddAlertIcon>
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          onClose={this.handleClose}
          style={{ marginTop: "-2%" }}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          PaperProps={{
            className: "remind",
          }}
        >
          <Typography className={useStyles.typography}>
            <Box p={2}>
              <h3 style={{ marginTop: "-2%", opacity: "80%" }}>Reminder:</h3>

              {this.state.remind.map((value, index) => {
                return (
                  <div class="reminder">
                    <Link variant="outlined">
                      <Grid container spacing={3} style={{ color: "black" }}>
                        <Grid container item xs={12} sm={6}>
                          <h4>{value}</h4>
                        </Grid>
                        <Grid container item xs={12} sm={6} class="time">
                          <h4>{this.state.time}</h4>
                        </Grid>
                      </Grid>
                    </Link>
                  </div>
                );
              })}
            </Box>
          </Typography>
        </Popover>
      </>
    );
  }
}

export default RemindMe;
