import React from "react";
import "../Compounts/compountStyle.scss";
import moment from "moment";
import {
  makeStyles,
  Grid,
  Typography,
  Popover,
  Box,
  TextField,
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
      time: "8 PM",
      todayDate: new Date().toJSON(),
      setDateTime: null,
    };
  }

  handleChange = async (e) => {
    console.log(e.target.value);
    this.setState({ setDateTime: await e.target.value });
    this.props.reminder(this.state.setDateTime);
  };

  handleClick = (event) => {
    this.setState({ open: true });
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  getReminder = (value) => {
    if (value === "Later today") {
      this.props.reminder(
        moment(this.state.todayDate).format("yyyy-MM-DD") + "T08:00:00.000Z"
      );
    } else if (value === "Tomorrow") {
      this.props.reminder(
        moment(this.state.todayDate).add(1, "day").format("yyyy-MM-DD") +
          "T08:00:00.000Z"
      );
    } else if (value === "Next week") {
      this.props.reminder(
        moment(this.state.todayDate).add(7, "day").format("yyyy-MM-DD") +
          "T08:00:00.000Z"
      );
    }
  };

  render() {
    return (
      <>
        <AddAlertIcon
          style={{ marginLeft: "4%", color: "black", cursor: "pointer" }}
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
              <h3
                style={{
                  marginTop: "-2%",
                  opacity: "80%",
                }}
              >
                Reminder:
              </h3>

              {this.state.remind.map((value, index) => {
                return (
                  <div class="reminder">
                    <h4
                      variant="outlined"
                      onClick={() => this.getReminder(value)}
                    >
                      <Grid
                        container
                        spacing={1}
                        style={{ color: "black", cursor: "pointer" }}
                      >
                        <Grid
                          container
                          item
                          xs={12}
                          sm={6}
                          style={{ marginTop: "2.5%" }}
                        >
                          <h4>{value} </h4>
                        </Grid>
                        <Grid container item xs={12} sm={6} class="time">
                          <h4>{this.state.time}</h4>
                        </Grid>
                      </Grid>
                    </h4>
                  </div>
                );
              })}
              <form noValidate style={{ marginTop: "-13%" }}>
                <TextField
                  value="setDateTime"
                  id="datetime-local"
                  label="Select Date & Time"
                  type="datetime-local"
                  format="yyyy-MM-DD"
                  onChange={this.handleChange}
                  // className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </form>
            </Box>
          </Typography>
        </Popover>
      </>
    );
  }
}

export default RemindMe;
