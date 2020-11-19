import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import EmojiObjectsOutlinedIcon from "@material-ui/icons/EmojiObjectsOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import ArchiveOutlinedIcon from "@material-ui/icons/ArchiveOutlined";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import Cards from "../Compounts/Cards.jsx";

import "../Compounts/compountStyle.scss";

const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    display: "flex",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
      marginTop: "65px",
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
}));

export default function MiniDrawer(props) {
  console.log("xyz", props.notes);
  const classes = useStyles();
  return (
    <div class="sidebar">
      <Drawer
        variant="permanent"
        marginBottom="5px"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: props.drawerOpen,
          [classes.drawerClose]: !props.drawerOpen,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: props.drawerOpen,
            [classes.drawerClose]: !props.drawerOpen,
          }),
        }}
        onMouseOver={props.menuOpen}
        onMouseOut={props.menuClose}
      >
        <List className="list-icons">
          {["Notes", "Reminders", "Edit labels", "Archive", "Trash"].map(
            (text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index === 0 ? (
                    <div>
                      <EmojiObjectsOutlinedIcon />
                    </div>
                  ) : index === 1 ? (
                    <div>
                      <NotificationsNoneIcon />
                    </div>
                  ) : index === 2 ? (
                    <div>
                      <EditOutlinedIcon />
                    </div>
                  ) : index === 3 ? (
                    <div>
                      <ArchiveOutlinedIcon />
                    </div>
                  ) : (
                    <div>
                      <DeleteOutlineOutlinedIcon />
                    </div>
                  )}
                </ListItemIcon>
                <ListItemText className="textss" primary={text} />
              </ListItem>
            )
          )}
        </List>
      </Drawer>
      <Cards allNotes={props.notes}></Cards>
    </div>
  );
}
