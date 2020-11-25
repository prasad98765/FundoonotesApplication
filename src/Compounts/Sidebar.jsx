import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import EmojiObjectsOutlinedIcon from "@material-ui/icons/EmojiObjectsOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import ArchiveOutlinedIcon from "@material-ui/icons/ArchiveOutlined";
import LabelOutlinedIcon from "@material-ui/icons/LabelOutlined";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import "../Compounts/compountStyle.scss";

const drawerWidth = 180;

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
  console.log("in the sidebar caLSS", props.allLabls);
  return (
    <>
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
            <ListItem button onClick={() => props.drawerclick("Notes")}>
              <ListItemIcon>
                <EmojiObjectsOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary={"Notes"} />
            </ListItem>
            <ListItem button onClick={() => props.drawerclick("Reminders")}>
              <ListItemIcon>
                <NotificationsNoneIcon />
              </ListItemIcon>
              <ListItemText primary={"Reminders"} />
            </ListItem>

            {props.allLabls.map((value, index) => {
              return (
                <>
                  {value !== null ? (
                    <ListItem
                      button
                      onClick={() => props.drawerclick(value.label)}
                    >
                      <ListItemIcon>
                        <LabelOutlinedIcon />
                      </ListItemIcon>
                      <ListItemText primary={value.label} />
                    </ListItem>
                  ) : (
                    ""
                  )}
                </>
              );
            })}
            <ListItem button onClick={() => props.drawerclick("Edit labels")}>
              <ListItemIcon>
                <EditOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary={"Edit labels"} />
            </ListItem>
            <ListItem button onClick={() => props.drawerclick("Archive")}>
              <ListItemIcon>
                <ArchiveOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary={"Archive"} />
            </ListItem>
            <ListItem button onClick={() => props.drawerclick("Trash")}>
              <ListItemIcon>
                <DeleteOutlineOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary={"Trash"} />
            </ListItem>
          </List>
        </Drawer>
      </div>
    </>
  );
}
