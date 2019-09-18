import React, { PureComponent, useCallback, useEffect } from "react";
import { DndProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import { connect } from "react-redux";
import { Grid } from "@material-ui/core/";
import { makeStyles } from "@material-ui/styles";
import { getTaskList, taskListRequest, mapStatus } from "../../modules/Board";
import List from "../List";

const MapStateToProps = state => ({
  taskList: getTaskList(state)
});
const MapDispatchToProps = { taskListRequest };

export const Board = props => {
  useEffect(() => {
    props.taskListRequest();
  }, []);

  const handleDrop = useCallback((index, item) => {
    console.log("handleDrop", item);
  }, []);

  // componentDidMount() {
  //   this.props.taskListRequest();
  // }

  const { taskList } = props;
  return (
    taskList && (
      <DndProvider backend={HTML5Backend}>
        <Grid container wrap="nowrap" spacing={5}>
          {mapStatus.map((status, index) => (
            <List
              status={status}
              key={status}
              statusIndex={index}
              taskList={taskList[index]}
              onDrop={item => handleDrop(index, item)}
            ></List>
          ))}
        </Grid>
      </DndProvider>
    )
  );
};

export default connect(
  MapStateToProps,
  MapDispatchToProps
)(Board);
