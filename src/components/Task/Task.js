import React from "react";
import { Grid } from "@material-ui/core/";
import { useDrag } from "react-dnd";
import { makeStyles } from "@material-ui/styles";
import cx from "classnames";

export const Task = props => {
  const {
    data: { name, id, status, progress, progressMsg, description, workers }
  } = props;
  const { data, openModal } = props;

  const [collectedProps, drag] = useDrag({
    item: { id: id, status: status, type: status.toString(), data: data }
  });

  const useStyles = makeStyles(theme => ({
    task: {
      margin: "10px 0",
      backgroundColor: "white",
      border: "1px solid black",
      width: "100%"
    },
    task__name: {
      padding: 10
    },
    task_status: {
      backgroundColor: "lightgreen"
    },
    task__id: {
      textDecoration: "underline",
      padding: 10
    },
    task__progress: {
      padding: 10
    },
    task__progressMsg: {
      backgroundColor: "seagreen",
      padding: 10
    },
    task__progressMsg_error: {
      backgroundColor: "yellow"
    },
    task__description: {
      height: 100,
      overflowY: "scroll",
      padding: 10
    },
    task__workers: {
      padding: 10,
      display: "flex",
      flexWrap: "no-wrap"
    },
    task__worker: {
      display: "inline-block",
      margin: "0.2rem",
      padding: "0.3rem"
    },
    task__worker_active: {
      backgroundColor: "red"
    },
    task__worker_past: {
      backgroundColor: "yellow"
    }
  }));

  const classes = useStyles();

  return (
    props.data && (
      <Grid
        item
        ref={drag}
        data-id={id}
        className={cx("task__root", classes.task)}
      >
        <div className={classes.task__name}>
          <a href="#" title={name}>
            {name}
          </a>
        </div>
        <Grid
          container
          wrap="nowrap"
          justify="space-between"
          className={classes.task_status}
        >
          <Grid item className={classes.task__id} onClick={openModal}>
            {id}
          </Grid>
          <Grid item className={classes.task__progress}>
            {progress}
          </Grid>
        </Grid>
        <div
          className={cx(
            progressMsg === "error" && classes.task__progressMsg_error,
            classes.task__progressMsg
          )}
        >
          {progressMsg}
        </div>
        <div className={classes.task__description}>{description}</div>
        <div className={classes.task__workers}>
          {workers.map((item, index) => {
            return (
              <div
                key={index}
                className={cx(
                  classes.task__worker,
                  item.status === "current" && classes.task__worker_active,
                  item.status === "past" && classes.task__worker_past
                )}
              >
                {item.name}
              </div>
            );
          })}
        </div>
      </Grid>
    )
  );
};

export default Task;
