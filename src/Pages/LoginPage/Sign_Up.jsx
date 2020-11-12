import React from "react";
import "../LoginPage/style.css";
import Logo from "../../Imgaes/googleLogo";
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

const NameRegex = RegExp("^[A-Z]{1}[a-zA-Z]{2,}$");
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

class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      hidden: true,
      NAME: null,
      LASTNAME: null,
      EMAIL: null,
      PASSWORD: null,
      CONFIRMPASS: null,
      VALIDNAME: true,
      VALIDLASTNAME: true,
      VALIDEMAIL: true,
      VALIDPASS: true,
      MESSAGE: "",
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
      case "CONFIRMPASS":
        if (this.state.PASSWORD === this.state.CONFIRMPASS) {
          this.setState({ VALIDPASS: false });
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
    console.log("abc", this.state.CONFIRMPASS);
    return (
      <>
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
            <Typography variant="body2" component="p">
              <div className={useStyles.root}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      label="Email"
                      type="text"
                      value={this.state.firstName}
                      className="text"
                      name="EMAIL"
                      variant="outlined"
                      onChange={this.handleChange}
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
                      href="#contained-buttons"
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
