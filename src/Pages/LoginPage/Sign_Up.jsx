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
} from "@material-ui/core/";

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
      NAME: null,
      formErrors: {
        NAME: "",
      },
    };
  }
  render() {
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
                  <Grid item xs={6}>
                    <TextField
                      className="text"
                      name="NAME"
                      id="outlined-helperText"
                      label="First Name"
                      defaultValue=""
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      className="text"
                      id="outlined-helperText"
                      label="Last Name"
                      defaultValue=""
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
              </div>
            </Typography>
            <Typography variant="body2" component="p">
              <div className={useStyles.root}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      className="textEmail"
                      id="outlined-helperText"
                      label="Email Id"
                      defaultValue=""
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
              </div>
            </Typography>
            <Typography color="textSecondary">
              <div className={useStyles.root}>
                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <TextField
                      className="text"
                      type="password"
                      id="outlined-helperText"
                      label="Password"
                      defaultValue=""
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      className="text"
                      type="password"
                      id="outlined-helperText"
                      label="Confirm"
                      defaultValue=""
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
              </div>
            </Typography>
            <Typography color="textSecondary" style={{ marginTop: "3%" }}>
              <div className={useStyles.root}>
                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <Button variant="outlined" color="secondary" href="/">
                      Sign in instead
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button variant="outlined" color="secondary">
                      submit
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
