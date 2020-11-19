import React from "react";
import "../Compounts/compountStyle.scss";
import { Card, Button, Grid } from "@material-ui/core/";
import Remind from "./Remind";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import Colour from "./Displaycolor";
import More from "./More";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import ArchiveIcon from "@material-ui/icons/Archive";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";

class Cards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: "",
      open: false,
      allNotes: [],
    };
    this.state.allNotes = this.props.allNotes;
  }
  getcolor = (value) => {
    this.setState({ color: value });
  };
  handleClickOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <>
        <Grid container spacing={0}>
          {this.props.allNotes.reverse().map((value, index) => {
            return (
              <>
                <Grid class="cards" item xs={12} sm={6}>
                  <Card style={{ backgroundColor: this.state.color }}>
                    <CardContent onClick={this.handleClickOpen}>
                      <Typography
                        color="textSecondary"
                        variant="h5"
                        component="h2"
                      >
                        <textarea
                          disabled
                          value={value.title}
                          style={{
                            width: "100%",
                            backgroundColor: "transparent",
                            border: "none",
                            resize: "none",
                          }}
                        />
                      </Typography>
                      <Typography variant="h5" component="h2">
                        <textarea
                          value={value.description}
                          disabled
                          style={{
                            width: "100%",
                            backgroundColor: "transparent",
                            border: "none",
                            resize: "none",
                          }}
                        />
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <IconButton style={{ marginLeft: "-1%" }}>
                        <Remind></Remind>
                      </IconButton>
                      <IconButton style={{ marginLeft: "-1%" }}>
                        <PersonAddIcon></PersonAddIcon>
                      </IconButton>
                      <IconButton style={{ marginLeft: "-1%" }}>
                        <Colour color={this.getcolor}></Colour>
                      </IconButton>
                      <IconButton style={{ marginLeft: "-1%" }}>
                        <ArchiveIcon></ArchiveIcon>
                      </IconButton>
                      <IconButton style={{ marginLeft: "-1%" }}>
                        <More></More>
                      </IconButton>
                    </CardActions>
                  </Card>
                </Grid>
              </>
            );
          })}
        </Grid>
        <Dialog
          open={this.state.open}
          onClose={this.thishandleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <h1 style={{ color: "white" }}>
              jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
            </h1>
            <CardContent style={{ marginTop: "-19%" }}>
              <Typography color="textSecondary" gutterBottom>
                <textarea
                  style={{
                    width: "100%",
                    backgroundColor: "transparent",
                    borderColor: "transparent",
                    outline: "none",
                    resize: "none",
                  }}
                >
                  Title
                </textarea>
              </Typography>
              <Typography variant="h5" component="h2">
                <textarea
                  style={{
                    width: "100%",
                    backgroundColor: "transparent",
                    border: "none",
                    outline: "none",
                    resize: "none",
                  }}
                >
                  Title Body
                </textarea>
              </Typography>
            </CardContent>

            <div>
              <CardActions>
                <Remind></Remind>
                <PersonAddIcon></PersonAddIcon>
                <Colour color={this.getcolor}></Colour>
                <ArchiveIcon></ArchiveIcon>
                <More></More>
              </CardActions>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Disagree
            </Button>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={this.state.open}
          onClose={this.thishandleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <h1 style={{ color: "white" }}>
              jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
            </h1>
            <CardContent style={{ marginTop: "-19%" }}>
              <Typography color="textSecondary" gutterBottom>
                <textarea
                  style={{
                    width: "100%",
                    backgroundColor: "transparent",
                    border: "none",
                    borderColor: "transparent",
                    outline: "none",
                  }}
                >
                  Title
                </textarea>
              </Typography>
              <Typography variant="h5" component="h2">
                <textarea
                  style={{
                    width: "100%",
                    backgroundColor: "transparent",
                    border: "none",
                    outline: "none",
                  }}
                >
                  Title Body
                </textarea>
              </Typography>
            </CardContent>

            <div>
              <CardActions>
                <Remind></Remind>
                <PersonAddIcon></PersonAddIcon>
                <Colour color={this.getcolor}></Colour>
                <ArchiveIcon></ArchiveIcon>
                <More></More>
              </CardActions>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Disagree
            </Button>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

export default Cards;
