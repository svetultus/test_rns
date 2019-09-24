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
  modalOpen,
  modalClose
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
  modalClose
};

export const Board = props => {
  useEffect(() => {
    props.taskListRequest();
  }, []);

  const { taskList, taskInModal, taskRequest, modalClose } = props;

  const handleDrop = useCallback((targetIndex, item) => {
    const itemChanged = JSON.parse(JSON.stringify(item));
    itemChanged.data.status = targetIndex;
    props.taskMoved(itemChanged.data);
  }, []);

  const useStyles = makeStyles(theme => ({
    paper: {
      position: "absolute",
      width: 400,
      backgroundColor: "white",
      border: "2px solid #000",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)"
    }
  }));

  const classes = useStyles();

  const handleOpen = evt => {
    const id = evt.target.closest(".MuiGrid-item").dataset.id;
    taskRequest(Number(id));
  };

  const handleClose = () => {
    modalClose();
  };

  return (
    taskList && (
      <DndProvider backend={HTML5Backend}>
        <Grid container wrap="nowrap" spacing={5}>
          {taskInModal && (
            <Modal
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
              open={true}
              onClose={handleClose}
            >
              <div className={classes.paper}>
                <h2 id="simple-modal-title">Text in a modal</h2>
                <p id="simple-modal-description">
                  Duis mollis, est non commodo luctus, nisi erat porttitor
                  ligula.
                </p>
                <div>{taskInModal.id}</div>
                <div>{taskInModal.name}</div>
                <div>{taskInModal.progress}</div>
                <div>{taskInModal.progressMsg}</div>
                <div>{taskInModal.description}</div>
              </div>
            </Modal>
          )}
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
