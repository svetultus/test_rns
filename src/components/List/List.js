import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Grid } from "@material-ui/core/";
import { makeStyles } from "@material-ui/styles";
import { getTaskList } from "../../modules/Board";
import Task from "../Task";
import { useDrop } from "react-dnd";

export const List = props => {
  const acceptIndex = [
    ["1"],
    ["0", "2"],
    ["1", "3"],
    ["2", "4"],
    ["3", "5"],
    ["4"]
  ];

  const { status, statusIndex, taskList, onDrop } = props;
  const [collectedProps, drop] = useDrop({
    accept: acceptIndex[statusIndex],
    collect: mon => ({
      isOver: !!mon.isOver(),
      canDrop: !!mon.canDrop(),
      item: mon.getItem(),
      DropResult: mon.getDropResult(),
      drop: onDrop,
      mon: mon
    }),
    drop: (collectedProps, monitor) => {
      console.log(collectedProps.item);
      console.log(collectedProps.DropResult);
      console.log(collectedProps);
      console.log(monitor);
      console.log("drop DNd");
      onDrop(collectedProps.item, statusIndex);
    }
  });

  return (
    taskList && (
      <Grid container item xs={2} data-status-index={statusIndex} ref={drop}>
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
