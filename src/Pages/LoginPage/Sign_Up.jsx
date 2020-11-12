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
} from "@material-ui/core/";

import FormHelperText from "@material-ui/core/FormHelperText";
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
      staticText: "@gmail.com",
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

  render() {
    return (
      <>
        <Card className="signCard" style={{ padding: "3%" }}>
          <CardContent>
            <Typography color="textSecondary" style={{ fontSize: "150%" }}>
              <Logo></Logo>
            </Typography>
            <Typography variant="h5" component="h2" style={{ marginTop: "1%" }}>
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
                        enter valid firstname
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
                      label="Email id"
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
                      type="password"
                      className="text"
                      name="PASSWORD"
                      variant="outlined"
                      onChange={this.handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Confirm"
                      type="password"
                      className="text"
                      name="CONFIRMPASS"
                      variant="outlined"
                      onChange={this.handleChange}
                    />
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
