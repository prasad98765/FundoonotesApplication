import React from "react";
import "../LoginPage/style.css";

import Logo from "../../Imgaes/googleLogo";
import {
  Card,
  makeStyles,
  CardContent,
  Button,
  Typography,
  TextField,
  Grid,
  Link,
  FormHelperText,
} from "@material-ui/core";

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
      VALIDEMAIL: true,
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
  render() {
    return (
      <>
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
                    <TextField
                      className="textLogin"
                      type="password"
                      id="outlined-helperText"
                      label="Password"
                      defaultValue=""
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
              </div>
            </Typography>

            <Typography
              variant="body2"
              component="p"
              style={{ marginTop: "1%" }}
            >
              <Grid item item xs={12} sm={6}>
                <Link
                  href="/"
                  variant="body2"
                  class="forgotPass"
                  style={{ fontSize: "110%", fontWeight: "bold" }}
                >
                  Forgot Password ?
                </Link>
              </Grid>
            </Typography>
            <Typography color="textSecondary" style={{ marginTop: "3%" }}>
              <div className={useStyles.root}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <Link
                      href="/"
                      variant="body2"
                      class="forgotPass"
                      style={{ fontSize: "110%" }}
                    >
                      Create Account
                    </Link>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    style={{ textAlign: "right", marginLeft: "-11%" }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      href="#contained-buttons"
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
