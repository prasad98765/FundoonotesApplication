import React from "react";
import "../Compounts/compountStyle.scss";
import FormatAlignJustifyIcon from "@material-ui/icons/FormatAlignJustify";
import Logo from "../Imgaes/googleLogo";
import Profile from "../Imgaes/prasad.jpg";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Box from "@material-ui/core/Box";
import Popover from "@material-ui/core/Popover";
import SearchBar from "material-ui-search-bar";
import { Avatar, Button, makeStyles } from "@material-ui/core/";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import MenuIcon from "@material-ui/icons/Menu";
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
    };
    this.state.item = this.props.details;
  }

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
                onChange={(newValue) => this.setState({ value: newValue })}
                // onRequestSearch={() => doSomethingWith(this.state.value)}
              />
            </div>
            <div class="menu" title="List view">
              <MenuIcon></MenuIcon>
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
                      <AccountCircle style={{ textAlign: "center" }} />
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
                          <Avatar
                            style={{ marginLeft: "37%" }}
                            alt="Remy Sharp"
                            src={Profile}
                            className={useStyles.large}
                          />

                          <h4 style={{ marginTop: "8%" }}>
                            {this.state.item.userdetails.name} {}
                            {this.state.item.userdetails.lastName}{" "}
                          </h4>
                          <h4 style={{ marginTop: "-11%", opacity: "70%" }}>
                            {this.state.item.userdetails.email}
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
