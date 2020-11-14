import React from "react";
import "../Compounts/compountStyle.scss";

import {
  Card,
  CardContent,
  CardActions,
  Collapse,
  InputBase,
  Avatar,
  Button,
  ClickAwayListener,
} from "@material-ui/core";

import MoreVertIcon from "@material-ui/icons/MoreVert";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import InsertPhotoIcon from "@material-ui/icons/InsertPhoto";
import EditIcon from "@material-ui/icons/Edit";
import Pin from "../Imgaes/pin.png";
import AddAlertIcon from "@material-ui/icons/AddAlert";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import ColorLensIcon from "@material-ui/icons/ColorLens";
import ArchiveIcon from "@material-ui/icons/Archive";

class Cards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      setExpanded: false,
      show: "",
      pin: "none",
      message: "Take a note...",
    };
  }

  handleExpandClick = () => {
    if (this.state.expanded === false) {
      this.setState({ show: "none" });
      this.setState({ pin: "block" });
      this.setState({ message: "Title" });
    } else {
      this.setState({ show: "block" });
      this.setState({ pin: "none" });
      this.setState({ message: "Take A Note..." });
    }
    this.setState({ expanded: !this.state.expanded });
    this.setState({ setExpanded: !this.state.setExpanded });
  };

  handleClickAway = () => {
    this.setState({ show: "block" });
    this.setState({ pin: "none" });
    this.setState({ message: "Take A Note..." });
    this.setState({ expanded: false });
    this.setState({ setExpanded: false });
  };

  render() {
    return (
      <ClickAwayListener onClickAway={this.handleClickAway}>
        <Card class="note">
          <CardActions>
            <InputBase
              style={{ width: "1000%", marginLeft: "4%" }}
              onClick={this.handleExpandClick}
              aria-expanded={this.state.expanded}
              placeholder={this.state.message}
            />

            <CheckBoxIcon
              style={{ marginLeft: "50%", display: this.state.show }}
            ></CheckBoxIcon>

            <EditIcon
              style={{ marginLeft: "4%", display: this.state.show }}
            ></EditIcon>
            <InsertPhotoIcon
              style={{ marginLeft: "4%", display: this.state.show }}
            ></InsertPhotoIcon>
            <Avatar
              alt="Remy Sharp"
              style={{
                marginLeft: "60%",
                display: this.state.pin,
                fontSize: "50%",
              }}
              src={Pin}
            />
          </CardActions>
          <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <InputBase
                style={{ width: "90%", marginLeft: "3%" }}
                placeholder="Take a note..."
              />
              <AddAlertIcon
                style={{ marginLeft: "4%", marginTop: "3%" }}
              ></AddAlertIcon>
              <PersonAddIcon
                style={{ marginLeft: "4%", marginTop: "3%" }}
              ></PersonAddIcon>
              <ColorLensIcon
                style={{ marginLeft: "4%", marginTop: "3%" }}
              ></ColorLensIcon>
              <InsertPhotoIcon style={{ marginLeft: "4%" }}></InsertPhotoIcon>
              <ArchiveIcon style={{ marginLeft: "4%" }}></ArchiveIcon>
              <MoreVertIcon style={{ marginLeft: "4%" }}></MoreVertIcon>
              <div>
                <Button style={{ marginLeft: "80%", marginTop: "-9%" }}>
                  Close
                </Button>
              </div>
            </CardContent>
          </Collapse>
        </Card>
      </ClickAwayListener>
    );
  }
}

export default Cards;
