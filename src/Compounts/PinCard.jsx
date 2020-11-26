import React from "react";
import Card from "../Compounts/Cards";

class Pin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pinCondition: true,
      Condition: false,
      display: "block",
    };
  }
  render() {
    return (
      <>
        <Card
          allNotes={this.props.allNotes}
          pin={this.state.pinCondition}
          update={this.props.update}
          trashNote={this.props.trashNote}
          archiveNote={this.props.archiveNote}
          searchValue={this.props.searchValue}
          reminderNote={this.props.reminderNote}
          allLabls={this.props.allLabls}
        ></Card>
      </>
    );
  }
}

export default Pin;
