import React from "react";
import clsx from "clsx";
import { makeStyles, Grid } from "@material-ui/core/";
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
import Pin from "../Compounts/PinCard.jsx";
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
        <List>
          {["Notes", "Reminders", "Edit labels", "Archive", "Trash"].map(
            (text, index) => (
              <ListItem
                button
                key={text}
                onClick={() => props.drawerclick(text)}
              >
                <ListItemIcon>
                  {index === 0 ? (
                    <div>
                      <EmojiObjectsOutlinedIcon></EmojiObjectsOutlinedIcon>
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
                <ListItemText primary={text} />
              </ListItem>
            )
          )}
        </List>
      </Drawer>
      <Grid container spacing={0}>
        <Grid container item xs={12} spacing={0}>
          <Pin
            allNotes={props.notes}
            update={props.update}
            trashNote={props.trashNotes}
            archiveNote={props.archiveNotes}
            searchValue={props.searchValue}
          ></Pin>
        </Grid>
        <Grid container item xs={12} spacing={0}>
          <Cards
            pin={false}
            allNotes={props.notes}
            update={props.update}
            trashNote={props.trashNotes}
            archiveNote={props.archiveNotes}
            searchValue={props.searchValue}
          ></Cards>
        </Grid>
      </Grid>
    </div>
  );
}
