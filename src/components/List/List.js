import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Grid } from "@material-ui/core/";
import { makeStyles } from "@material-ui/styles";
import { getTaskList } from "../../modules/Board";
import Task from "../Task";
import { useDrop } from "react-dnd";
import cx from "classnames";

export const List = props => {
  const acceptIndex = [
    ["1"],
    ["0", "2"],
    ["1", "3"],
    ["2", "4"],
    ["3", "5"],
    ["4"]
  ];

  const { status, statusIndex, taskList, onDrop, openModal } = props;
  const [collectedProps, drop] = useDrop({
    accept: acceptIndex[statusIndex],
    collect: mon => ({
      isOver: !!mon.isOver(),
      canDrop: !!mon.canDrop(),
      item: mon.getItem()
    }),
    drop: onDrop
  });

  const useStyles = makeStyles(theme => ({
    list: {
      flexDirection: "column",
      flexShrink: 0,
      flexGrow: 0,
      minHeight: "100vh"
    },
    list_droppable: {
      backgroundColor: "lightblue"
    },
    list__title: {
      fontSize: "1.2rem"
    }
  }));

  const classes = useStyles();

  return (
    taskList && (
      <Grid
        container
        item
        xs={2}
        data-status-index={statusIndex}
        ref={drop}
        className={cx(
          classes.list,
          collectedProps.canDrop &&
            collectedProps.isOver &&
            classes.list_droppable
        )}
      >
        <h2 className={classes.list__title}>
          {status}({taskList.length})
        </h2>
        {taskList.map(item => (
          <Task key={item.id} data={item} openModal={openModal}></Task>
        ))}
      </Grid>
    )
  );
};

export default List;
