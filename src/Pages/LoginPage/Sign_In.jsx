import React from "react";
import "../LoginPage/style.scss";
import Logo from "../../Imgaes/googleLogo";
import UserServicesAPI from "../../Services/UserServicesAPI.js";

import {
  CardContent,
  Button,
  Typography,
  TextField,
  Grid,
  Card,
  makeStyles,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  FormHelperText,
  FormControl,
  IconButton,
  Snackbar,
} from "@material-ui/core/";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
const EmailRegex = RegExp(
  "^[a-zA-Z0-9]+[.+_-]?[a-zA-Z0-9]+[@][a-zA-Z0-9]+[.][a-zA-Z]{2,4}[.]?[a-zA-Z]{0,3}"
);

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

class SignIn extends React.Component {
  constructor() {
    super();
    this.state = {
      EMAIL: null,
      PASSWORD: null,
      VALIDEMAIL: true,
      hidden: true,
      open: false,
      message: "",
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = async (e) => {
    const { name } = e.target;
    this.setState({ [e.target.name]: await e.target.value });
    switch (name) {
      case "EMAIL":
        EmailRegex.test(this.state.EMAIL)
          ? this.setState({ VALIDEMAIL: false })
          : this.setState({ VALIDEMAIL: true });
        break;
      default:
        break;
    }
  };

  ShowPassword = () => {
    this.setState({ hidden: false });
  };

  userLogin = async () => {
    let data = {
      email: this.state.EMAIL,
      password: this.state.PASSWORD,
    };
    UserServicesAPI.userLogin(data, (res) => {
      if (res.status === 200) {
        let userdetails = {
          name: res.data.firstName,
          lastName: res.data.lastName,
          email: res.data.email,
        };
        this.props.history.push({
          pathname: "/dashboard",
          state: { userdetails },
        });
      } else {
        this.setState({ message: "Login failed" });
        this.setState({ open: true });
      }
    });
  };

  handleSnackbarClose = (event) => {
    this.setState({
      open: false,
    });
    // this.props.history.push("/");
  };

  render() {
    return (
      <>
        <Snackbar
          anchorOrigin={{
            vertical: "center",
            horizontal: "center",
          }}
          open={this.state.open}
          autoHideDuration={3000}
          onClose={this.handleSnackbarClose}
          message={<span id="message-id">{this.state.message}</span>}
        />
        <Card
          className="signCard"
          style={{ textAlign: "center", padding: "2%" }}
        >
          <CardContent>
            <Typography color="textSecondary" style={{ fontSize: "150%" }}>
              <Logo></Logo>
            </Typography>
            <Typography variant="h5" component="h2" style={{ marginTop: "3%" }}>
              Sign in
            </Typography>
            <Typography variant="h6" component="h2" style={{ marginTop: "1%" }}>
              Use your Google Account
            </Typography>
            <Typography
              variant="body2"
              component="p"
              style={{ marginTop: "5%" }}
            >
              <div className={useStyles.root}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      label="Email id"
                      type="text"
                      value={this.state.firstName}
                      className="textLogin"
                      name="EMAIL"
                      variant="outlined"
                      onChange={this.handleChange}
                    />
                    {this.state.VALIDEMAIL === true ? (
                      <FormHelperText
                        style={{ color: "red", marginLeft: "12%" }}
                        id="outlined-weight-helper-text"
                      >
                        enter valid Email
                      </FormHelperText>
                    ) : null}
                  </Grid>
                </Grid>
              </div>
            </Typography>

            <Typography variant="body2" component="p">
              <div className={useStyles.root}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <FormControl variant="outlined" className="textLogin">
                      <InputLabel htmlFor="outlined-adornment-password">
                        Password
                      </InputLabel>
                      <OutlinedInput
                        type={this.state.hidden ? "password" : "text"}
                        name="PASSWORD"
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
                    </FormControl>
                    {this.state.VALIDPASS === true ? (
                      <FormHelperText
                        style={{ color: "red" }}
                        id="outlined-weight-helper-text"
                      >
                        {this.state.MESSAGE}
                      </FormHelperText>
                    ) : null}
                  </Grid>
                </Grid>
              </div>
            </Typography>

            <Typography
              variant="body2"
              component="p"
              style={{ marginTop: "1%" }}
            >
              <Grid
                item
                xs={12}
                sm={6}
                style={{ textAlign: "left", marginLeft: "17%" }}
              >
                <p
                  className="forgotPass"
                  style={{ fontSize: "110%", fontWeight: "bold" }}
                >
                  <Button color="primary" href="/forgotPass">
                    Forgot Password ?
                  </Button>
                </p>
              </Grid>
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
                    <p
                      className="forgotPass"
                      style={{ fontSize: "110%", fontWeight: "bold" }}
                    >
                      <Button color="primary" href="/signUp">
                        Create Account
                      </Button>
                    </p>
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
                      onClick={this.userLogin}
                    >
                      Login
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

export default SignIn;
