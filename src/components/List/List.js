import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Grid } from "@material-ui/core/";
import { makeStyles } from "@material-ui/styles";
import { getTaskList } from "../../modules/Board";
import Task from "../Task";

export const List = props => {
  const { status, taskList } = props;
  return (
    taskList && (
      <Grid container item xs={2}>
        <h2>
          {status}({taskList.length})
        </h2>
        {taskList.map(item => (
          <Task key={item.id} data={item}></Task>
        ))}
      </Grid>
    )
  );
};

export default List;
