import React from "react";
import "../Compounts/compountStyle.scss";
import { Card } from "@material-ui/core/";
import Remind from "./Remind";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import Colour from "./Displaycolor";
import More from "./More";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import ArchiveIcon from "@material-ui/icons/Archive";

class Cards extends React.Component {
  render() {
    return (
      <>
        <Card class="cards">
          <CardContent>
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
            <Colour></Colour>
            <ArchiveIcon></ArchiveIcon>
            <More></More>
          </CardActions>
        </Card>
      </>
    );
  }
}

export default Cards;
