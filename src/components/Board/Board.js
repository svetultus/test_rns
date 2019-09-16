import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Grid } from "@material-ui/core/";
import { makeStyles } from "@material-ui/styles";
import { getTaskList, taskListRequest, mapStatus } from "../../modules/Board";
import List from "../List";

const MapStateToProps = state => ({
  taskList: getTaskList(state)
});
const MapDispatchToProps = { taskListRequest };

export class Board extends React.PureComponent {
  componentDidMount() {
    this.props.taskListRequest();
  }
  render() {
    const { taskList } = this.props;
    return (
      taskList && (
        <Grid container wrap="nowrap" spacing={5}>
          {mapStatus.map((status, index) => (
            <List
              status={status}
              key={status}
              taskList={taskList[index]}
            ></List>
          ))}
        </Grid>
      )
    );
  }
}

export default connect(
  MapStateToProps,
  MapDispatchToProps
)(Board);
