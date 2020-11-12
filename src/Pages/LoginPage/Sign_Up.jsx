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
  Link,
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

const NameRegex = RegExp("^[A-Z]{1}[a-zA-Z]{2,}$");
const EmailRegex = RegExp(
  "^[a-zA-Z0-9]+[.+_-]?[a-zA-Z0-9]+[@][a-zA-Z0-9]+[.][a-zA-Z]{2,4}[.]?[a-zA-Z]{0,3}"
);
const ContactRegex = RegExp("^[0-9]{10}$");

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

class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      hidden: true,
      NAME: null,
      LASTNAME: null,
      EMAIL: null,
      PASSWORD: null,
      CONTACT: null,
      CONFIRMPASS: null,
      VALIDCONTACT: true,
      VALIDNAME: true,
      VALIDLASTNAME: true,
      VALIDEMAIL: true,
      VALIDPASS: true,
      SUBMIT: true,
      MESSAGE: "",
      open: false,
      message: "",
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = async (e) => {
    const { name } = e.target;
    this.setState({ [e.target.name]: await e.target.value });
    console.log("a", this.state.LASTNAME);
    console.log("b", this.state.EMAIL);

    switch (name) {
      case "NAME":
        NameRegex.test(this.state.NAME)
          ? this.setState({ VALIDNAME: false })
          : this.setState({ VALIDNAME: true });
        break;
      case "LASTNAME":
        NameRegex.test(this.state.LASTNAME)
          ? this.setState({ VALIDLASTNAME: false })
          : this.setState({ VALIDLASTNAME: true });
        break;
      case "EMAIL":
        EmailRegex.test(this.state.EMAIL)
          ? this.setState({ VALIDEMAIL: false })
          : this.setState({ VALIDEMAIL: true });
        break;
      case "CONTACT":
        ContactRegex.test(this.state.CONTACT)
          ? this.setState({ VALIDCONTACT: false })
          : this.setState({ VALIDCONTACT: true });
        break;
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

  createAccount = async () => {
    let userData = {
      firstName: this.state.NAME,
      lastName: this.state.LASTNAME,
      email: this.state.EMAIL,
      contact: this.state.CONTACT,
      password: this.state.CONFIRMPASS,
      service: "advance",
    };
    console.log(userData);

    UserServicesAPI.createAccount(userData, (res) => {
      if (res.status === 200) {
        console.log("get message", res);
        this.setState({ message: res.data.data.message });
        this.setState({ open: true });
        this.props.history.push("/");
      } else {
        this.setState({ message: "Already Register" });
        this.setState({ open: true });
      }
    });
  };

  handleSnackbarClose = (event) => {
    this.setState({
      open: false,
    });
  };

  render() {
    console.log("abc", this.state.CONFIRMPASS);
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
        <Card className="signCard">
          <CardContent>
            <Typography color="textSecondary" style={{ fontSize: "150%" }}>
              <Logo></Logo>
            </Typography>
            <Typography variant="h5" component="h2">
              Create your Google Account
            </Typography>
            <Typography color="textSecondary" style={{ marginTop: "2%" }}>
              <div className={useStyles.root}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="First name"
                      type="text"
                      value={this.state.NAME}
                      className="text"
                      name="NAME"
                      variant="outlined"
                      onChange={this.handleChange}
                      required
                    />
                    {this.state.VALIDNAME === true ? (
                      <FormHelperText
                        style={{ color: "red" }}
                        id="outlined-weight-helper-text"
                      >
                        enter valid name
                      </FormHelperText>
                    ) : null}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Last name"
                      type="text"
                      value={this.state.LASTNAME}
                      className="text"
                      name="LASTNAME"
                      variant="outlined"
                      onChange={this.handleChange}
                      required
                    />
                    {this.state.VALIDLASTNAME === true ? (
                      <FormHelperText
                        style={{ color: "red" }}
                        id="outlined-weight-helper-text"
                      >
                        enter valid Lastname
                      </FormHelperText>
                    ) : null}
                  </Grid>
                </Grid>
              </div>
            </Typography>
            <Typography color="textSecondary" style={{ marginTop: "2%" }}>
              <div className={useStyles.root}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Phone Number"
                      type="text"
                      value={this.state.CONTACT}
                      className="text"
                      name="CONTACT"
                      variant="outlined"
                      onChange={this.handleChange}
                      required
                    />
                    {this.state.VALIDCONTACT === true ? (
                      <FormHelperText
                        style={{ color: "red" }}
                        id="outlined-weight-helper-text"
                      >
                        enter valid Contact
                      </FormHelperText>
                    ) : null}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Email Id"
                      type="text"
                      value={this.state.EMAIL}
                      className="text"
                      name="EMAIL"
                      variant="outlined"
                      onChange={this.handleChange}
                      required
                    />
                    {this.state.VALIDEMAIL === true ? (
                      <FormHelperText
                        style={{ color: "red" }}
                        id="outlined-weight-helper-text"
                      >
                        enter valid Email
                      </FormHelperText>
                    ) : null}
                  </Grid>
                </Grid>
              </div>
            </Typography>
            <Typography color="textSecondary">
              <div className={useStyles.root}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Password"
                      type={this.state.hidden ? "password" : "text"}
                      className="text"
                      name="PASSWORD"
                      variant="outlined"
                      onChange={this.handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl className="text" variant="outlined">
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
            <Typography color="textSecondary" style={{ marginTop: "3%" }}>
              <div className={useStyles.root}>
                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <Link href="/signIn" variant="body2">
                      Sign in instead
                    </Link>
                  </Grid>
                  <Grid item xs={6} style={{ textAlign: "right" }}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={this.createAccount}
                      disabled={this.state.SUBMIT}
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

export default SignUp;
