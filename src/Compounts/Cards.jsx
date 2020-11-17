import React from "react";
import "../Compounts/compountStyle.scss";
import { Card, Button } from "@material-ui/core/";
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

class Cards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: "",
      open: false,
    };
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
        <Card class="cards" style={{ backgroundColor: this.state.color }}>
          <CardContent onClick={this.handleClickOpen}>
            <Typography color="textSecondary" gutterBottom>
              <textarea
                disabled
                style={{
                  width: "100%",
                  backgroundColor: "transparent",
                  border: "none",
                }}
              >
                Title
              </textarea>
            </Typography>
            <Typography variant="h5" component="h2">
              <textarea
                disabled
                style={{
                  width: "100%",
                  backgroundColor: "transparent",
                  border: "none",
                }}
              >
                Title Body
              </textarea>
            </Typography>
          </CardContent>
          <CardActions>
            <Remind></Remind>
            <PersonAddIcon></PersonAddIcon>
            <Colour color={this.getcolor}></Colour>
            <ArchiveIcon></ArchiveIcon>
            <More></More>
          </CardActions>
        </Card>
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
            <CardActions>
              <Remind></Remind>
              <PersonAddIcon></PersonAddIcon>
              <Colour color={this.getcolor}></Colour>
              <ArchiveIcon></ArchiveIcon>
              <More></More>
            </CardActions>
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
