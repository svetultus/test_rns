import React, { PureComponent, useCallback, useEffect } from "react";
import { DndProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import { connect } from "react-redux";
import { Grid, Modal } from "@material-ui/core/";
import { makeStyles } from "@material-ui/styles";
import {
  getTaskList,
  getTaskInModal,
  taskListRequest,
  taskRequest,
  mapStatus,
  taskMoved,
  taskRemoveFromModal
} from "../../modules/Board";
import List from "../List";

const MapStateToProps = state => ({
  taskList: getTaskList(state),
  taskInModal: getTaskInModal(state)
});

const MapDispatchToProps = {
  taskListRequest,
  taskMoved,
  taskRequest,
  taskRemoveFromModal
};

export const Board = props => {
  useEffect(() => {
    props.taskListRequest();
  }, []);

  const { taskList, taskInModal, taskRequest, taskRemoveFromModal } = props;

  const handleDrop = useCallback((targetIndex, item) => {
    const itemChanged = JSON.parse(JSON.stringify(item));
    itemChanged.data.status = targetIndex;
    props.taskMoved(itemChanged.data);
  }, []);

  const useStyles = makeStyles(theme => ({
    board: {
      backgroundColor: "grey"
    },
    modal: {
      position: "absolute",
      width: 400,
      backgroundColor: "white",
      border: "2px solid #000",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      padding: 20
    },
    task__title: {
      fontSize: "1.5rem",
      margin: "0.5rem auto"
    }
  }));

  const classes = useStyles();

  const handleOpen = evt => {
    const id = evt.target.closest(".task__root").dataset.id;
    taskRequest(Number(id));
  };

  const handleClose = () => {
    taskRemoveFromModal();
  };

  return (
    taskList && (
      <DndProvider backend={HTML5Backend}>
        {taskInModal && (
          <Modal
            aria-labelledby="modal-title"
            aria-describedby="modal-name"
            open={true}
            onClose={handleClose}
          >
            <div className={classes.modal}>
              <h2 id="modal-title" className={classes.task__title}>
                Задание {taskInModal.id}
              </h2>
              <div id="modal-name" className={classes.task__name}>
                {taskInModal.name}
              </div>
              <div className={classes.progress}>
                {taskInModal.task__progress}
              </div>
              <div className={classes.task__progressMsg}>
                {taskInModal.progressMsg}
              </div>
              <div className={classes.task__description}>
                {taskInModal.description}
              </div>
            </div>
          </Modal>
        )}
        <Grid
          container
          wrap="nowrap"
          spacing={5}
          alignItems="flex-start"
          className={classes.board}
        >
          {mapStatus.map((status, index) => (
            <List
              status={status}
              key={status}
              statusIndex={index}
              taskList={taskList[index]}
              onDrop={item => handleDrop(index, item)}
              openModal={handleOpen}
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
