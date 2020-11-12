import React from "react";
import "../LoginPage/style.scss";
import {
  Card,
  makeStyles,
  CardContent,
  Button,
  Link,
  Grid,
  TextField,
  Typography,
  FormHelperText,
} from "@material-ui/core/";
import Logo from "../../Imgaes/googleLogo";
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

class ForgotPass extends React.Component {
  constructor() {
    super();
    this.state = {
      NAME: null,
      EMAIL: null,
      VALIDEMAIL: true,
    };
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
          style={{ textAlign: "center", padding: "3%" }}
        >
          <CardContent>
            <Typography color="textSecondary" style={{ fontSize: "150%" }}>
              <Logo></Logo>
            </Typography>
            <Typography variant="h5" component="h2" style={{ marginTop: "2%" }}>
              Account Recovery
            </Typography>
            <Typography variant="h6" component="h2" style={{ marginTop: "2%" }}>
              Enter The Your Email
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
                      className="textLogin"
                      name="EMAIL"
                      id="outlined-helperText"
                      label="Email Id"
                      defaultValue=""
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
                      href="#contained-buttons"
                    >
                      Next
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

export default ForgotPass;
