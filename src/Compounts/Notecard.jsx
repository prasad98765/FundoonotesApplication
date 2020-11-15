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

import Colour from "./Displaycolor";
import Remind from "./Remind";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import InsertPhotoIcon from "@material-ui/icons/InsertPhoto";
import EditIcon from "@material-ui/icons/Edit";
import Pin from "../Imgaes/pin.png";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
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
      color: "",
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
      this.setState({ message: "Take a note..." });
    }
    this.setState({ expanded: !this.state.expanded });
    this.setState({ setExpanded: !this.state.setExpanded });
  };

  handleClickAway = () => {
    this.setState({ show: "block" });
    this.setState({ pin: "none" });
    this.setState({ message: "Take a note..." });
    this.setState({ expanded: false });
    this.setState({ setExpanded: false });
  };
  getcolor = (value) => {
    this.setState({ color: value });
  };
  render() {
    return (
      <ClickAwayListener onClickAway={this.handleClickAway}>
        <Card class="note" style={{ backgroundColor: this.state.color }}>
          <CardActions>
            <InputBase
              style={{
                marginLeft: "4%",
                width: "100%",
              }}
              onClick={this.handleExpandClick}
              aria-expanded={this.state.expanded}
              placeholder={this.state.message}
            ></InputBase>

            <CheckBoxIcon
              style={{ marginLeft: "0%", display: this.state.show }}
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
                marginLeft: "8%",
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
              <Remind></Remind>
              <PersonAddIcon
                style={{ marginLeft: "4%", marginTop: "3%" }}
              ></PersonAddIcon>
              <Colour color={this.getcolor}></Colour>
              <InsertPhotoIcon style={{ marginLeft: "4%" }}></InsertPhotoIcon>
              <ArchiveIcon style={{ marginLeft: "4%" }}></ArchiveIcon>
              <MoreVertIcon style={{ marginLeft: "4%" }}></MoreVertIcon>
              <div>
                <Button style={{ marginLeft: "87%", marginTop: "-9%" }}>
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
