import React from "react";
import "../LoginPage/style.scss";
import {
  CardContent,
  Button,
  Typography,
  TextField,
  Grid,
  Card,
  makeStyles,
  Link,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  FormHelperText,
  FormControl,
  IconButton,
} from "@material-ui/core/";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import Logo from "../../Imgaes/googleLogo";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(3),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

class ResetPass extends React.Component {
  constructor() {
    super();
    this.state = {
      PASSWORD: null,
      CONFIRMPASS: null,
      VALIDPASS: true,
      hidden: true,
      MESSAGE: "",
      open: false,
      message: "",
    };
  }
  handleChange = async (e) => {
    const { name } = e.target;
    this.setState({ [e.target.name]: await e.target.value });
    switch (name) {
      case "CONFIRMPASS":
        if (this.state.PASSWORD === this.state.CONFIRMPASS) {
          this.setState({ VALIDPASS: false });
          this.setState({ SUBMIT: false });
        } else {
          this.setState({ VALIDPASS: true });
          this.setState({ MESSAGE: "Both Password didn't match try again" });
        }
        break;
      default:
        break;
    }
  };

  ShowPassword = () => {
    this.setState({ hidden: false });
  };
  render() {
    return (
      <>
        <Card
          className="signCard"
          style={{ textAlign: "center", padding: "3%" }}
        >
          <CardContent>
            <Typography color="textSecondary" style={{ fontSize: "150%" }}>
              <Logo></Logo>
            </Typography>
            <Typography variant="h5" component="h2" style={{ marginTop: "2%" }}>
              Reset Password
            </Typography>
            <Typography
              variant="body2"
              component="p"
              style={{ marginTop: "3%" }}
            >
              <div className={useStyles.root}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      type="passwoed"
                      name="PASSWORD"
                      className="textLogin"
                      id="outlined-helperText"
                      label="Enter Password"
                      defaultValue=""
                      variant="outlined"
                      onChange={this.handleChange}
                    />
                  </Grid>
                </Grid>
              </div>
            </Typography>

            <Typography variant="body2" component="p">
              <div className={useStyles.root}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <FormControl className="textLogin" variant="outlined">
                      <InputLabel htmlFor="outlined-adornment-password">
                        Confirm
                      </InputLabel>
                      <OutlinedInput
                        type={this.state.hidden ? "password" : "text"}
                        name="CONFIRMPASS"
                        value={this.state.CONFIRMPASS}
                        onChange={this.handleChange}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={this.ShowPassword}
                              edge="end"
                            >
                              {this.state.hidden ? (
                                <VisibilityOffIcon />
                              ) : (
                                <VisibilityIcon />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        labelWidth={70}
                      />
                      {this.state.VALIDPASS === true ? (
                        <FormHelperText
                          style={{ color: "red" }}
                          id="outlined-weight-helper-text"
                        >
                          {this.state.MESSAGE}
                        </FormHelperText>
                      ) : null}
                    </FormControl>
                  </Grid>
                </Grid>
              </div>
            </Typography>

            <Typography color="textSecondary" style={{ marginTop: "3%" }}>
              <div className={useStyles.root}>
                <Grid container spacing={3}>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    style={{ textAlign: "left", marginLeft: "16%" }}
                  >
                    <Link
                      href="/"
                      variant="body2"
                      class="forgotPass"
                      style={{ fontSize: "110%" }}
                    >
                      Sign in instead
                    </Link>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    style={{ textAlign: "right", marginLeft: "-27%" }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={this.restPasswod}
                    >
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </Typography>
          </CardContent>
        </Card>
      </>
    );
  }
}

export default ResetPass;
