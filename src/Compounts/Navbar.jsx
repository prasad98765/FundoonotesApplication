import React from "react";
import "../Compounts/compountStyle.scss";
import FormatAlignJustifyIcon from "@material-ui/icons/FormatAlignJustify";
import Logo from "../Imgaes/googleLogo";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Box from "@material-ui/core/Box";
import Popover from "@material-ui/core/Popover";
import SearchBar from "material-ui-search-bar";
import Fab from "@material-ui/core/Fab";
import { Avatar, Button, makeStyles } from "@material-ui/core/";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import MenuIcon from "@material-ui/icons/Menu";
import UserServicesAPI from "../Services/UserServicesAPI.js";
import ViewComfyIcon from "@material-ui/icons/ViewComfy";

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));
class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: null,
      value: "",
      file: null,
      change: true,
    };
    this.state.item = this.props.details;
  }

  handleChange = async (e) => {
    console.log(e.target.value);
  };

  changeProfileImage = (event) => {
    this.setState({ file: event.target.files[0] });
    const formData = new FormData();
    formData.append("file", event.target.files[0]);

    UserServicesAPI.uploadProfileImage(formData, (res) => {
      console.log("image uploda backend", res.data.status.imageUrl);

      var userdetails = {
        imageUrl:
          "http://fundoonotes.incubation.bridgelabz.com/" +
          res.data.status.imageUrl,
      };
      localStorage.setItem("image", JSON.stringify(userdetails));
      this.props.update();
    });
  };

  changeView = () => {
    this.setState({ change: !this.state.change });
    this.props.changeView(this.state.change);
  };

  render() {
    return (
      <>
        <AppBar style={{ backgroundColor: "white" }}>
          <Toolbar>
            <div style={{ color: "black" }}>
              <FormatAlignJustifyIcon
                onMouseOver={this.props.menuOpen}
              ></FormatAlignJustifyIcon>
            </div>
            <div class="logo" style={{ fontSize: "200%", marginLeft: "2%" }}>
              <Logo></Logo>
            </div>

            <div class="searchbar">
              <SearchBar
                className="search"
                value={this.state.value}
                onChange={(newValue) => this.props.searchValue(newValue)}
              />
            </div>
            <div class="menu" title="List view" style={{ cursor: "pointer" }}>
              {this.state.change === true ? (
                <ViewComfyIcon onClick={this.changeView}></ViewComfyIcon>
              ) : (
                <MenuIcon onClick={this.changeView}></MenuIcon>
              )}
            </div>
            <div color="inherit" class="profile">
              <PopupState variant="popover" popupId="demo-popup-popover">
                {(popupState) => (
                  <div>
                    <IconButton
                      {...bindTrigger(popupState)}
                      aria-label="account of current user"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      color="inherit"
                    >
                      <Avatar alt="Remy Sharp" src={this.props.imageUrl} />
                    </IconButton>
                    <Popover
                      {...bindPopover(popupState)}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "center",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "center",
                      }}
                      style={{ marginTop: "0.6%" }}
                    >
                      <Box p={2}>
                        <Typography
                          style={{
                            textAlign: "center",
                            height: "190px",
                          }}
                        >
                          <label htmlFor="upload-photo">
                            <input
                              style={{ display: "none" }}
                              id="upload-photo"
                              name="upload-photo"
                              type="file"
                              onChange={this.changeProfileImage}
                            />
                            <Fab size="small" component="span" aria-label="add">
                              <Avatar
                                alt="Remy Sharp"
                                src={this.props.imageUrl}
                                className={useStyles.large}
                              />
                            </Fab>
                          </label>
                          <h4 style={{ marginTop: "8%" }}>
                            {this.state.item.customerdetails.name} {}
                            {this.state.item.customerdetails.lastName}{" "}
                          </h4>
                          <h4 style={{ marginTop: "-11%", opacity: "70%" }}>
                            {this.state.item.customerdetails.email}
                          </h4>
                          <Button variant="outlined" href="/">
                            Sign out
                          </Button>
                        </Typography>
                      </Box>
                    </Popover>
                  </div>
                )}
              </PopupState>
            </div>
          </Toolbar>
        </AppBar>
      </>
    );
  }
}

export default Navbar;
