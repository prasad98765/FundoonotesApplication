import React from "react";
import "../Compounts/compountStyle.scss";

import {
  Card,
  CardContent,
  CardActions,
  Collapse,
  InputBase,
  Button,
  ClickAwayListener,
} from "@material-ui/core";

import Colour from "./Displaycolor";
import Remind from "./Remind";
import More from "./More";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import InsertPhotoIcon from "@material-ui/icons/InsertPhoto";
import EditIcon from "@material-ui/icons/Edit";
import Pin from "../Imgaes/pinBeforeClick.svg";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import ArchiveIcon from "@material-ui/icons/Archive";
import Noteservice from "../Services/NoteServices.js";
import Unpinicon from "../Imgaes/pinAfterClick(1).svg";

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
      title: "",
      description: "",
      isarchived: false,
      ispined: false,
      displypin: Pin,
    };
  }

  handleChange = async (e) => {
    this.setState({ [e.target.name]: await e.target.value });
  };

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
    if (this.state.title !== "" || this.state.description !== "") {
      let noteDetails = {
        title: this.state.title,
        description: this.state.description,
        color: this.state.color,
        isArchived: this.state.isarchived,
        isPined: this.state.ispined,
      };
      Noteservice.saveNote(noteDetails, (res) => {
        this.setState({
          title: "",
          description: "",
          color: "",
        });
        this.props.note("");
      });
    }
    this.setState({ show: "block" });
    this.setState({ pin: "none" });
    this.setState({ message: "Take a note..." });
    this.setState({ expanded: false });
    this.setState({ setExpanded: false });
  };
  archived = async () => {
    await this.setState({ isarchived: true });
    this.handleClickAway();
  };

  getcolor = (value) => {
    this.setState({ color: value });
  };

  pinNote = () => {
    this.setState({ ispined: true });
    this.setState({ displypin: Unpinicon });
  };

  render() {
    console.log("get color", this.state.isarchived);
    return (
      <>
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
                onChange={this.handleChange}
                name="title"
                value={this.state.title}
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
              <Button
                style={{
                  display: this.state.pin,
                }}
                onClick={this.pinNote}
              >
                <img
                  alt="Remy Sharp"
                  style={{
                    fontSize: "20%",
                    marginTop: "16%",
                    display: this.state.displypin,
                  }}
                  src={this.state.displypin}
                />
              </Button>
            </CardActions>
            <Collapse
              in={this.state.expanded}
              timeout="auto"
              unmountOnExit
              style={{ marginBottom: "-2%" }}
            >
              <CardContent style={{ marginBottom: "-6%" }}>
                <textarea
                  style={{
                    marginLeft: "2%",
                    width: "100%",
                    backgroundColor: "transparent",
                    border: "none",
                    borderColor: "transparent",
                    outline: "none",
                    resize: "none",
                    fontSize: "110%",
                    opacity: "80%",
                  }}
                  placeholder="Description"
                  name="description"
                  onChange={this.handleChange}
                  value={this.state.description}
                />
                <Remind></Remind>
                <PersonAddIcon
                  style={{
                    marginLeft: "4%",
                    marginTop: "3%",
                    cursor: "pointer",
                  }}
                ></PersonAddIcon>
                <Colour color={this.getcolor}></Colour>
                <InsertPhotoIcon
                  style={{ marginLeft: "4%", cursor: "pointer" }}
                ></InsertPhotoIcon>
                <ArchiveIcon
                  style={{
                    marginLeft: "4%",
                    cursor: "pointer",
                  }}
                  onClick={this.archived}
                ></ArchiveIcon>
                <More></More>
                <div>
                  <Button
                    style={{ marginLeft: "87%", marginTop: "-9%" }}
                    onClick={() => {
                      this.setState({
                        expanded: false,
                        setExpanded: false,
                        show: "block",
                        pin: "none",
                      });
                    }}
                  >
                    Close
                  </Button>
                </div>
              </CardContent>
            </Collapse>
          </Card>
        </ClickAwayListener>
      </>
    );
  }
}

export default Cards;
