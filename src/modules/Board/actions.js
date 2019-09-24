import { createAction } from "redux-actions";

export const taskListRequest = createAction("TASK_LIST_REQUEST");
export const taskListSuccess = createAction("TASK_LIST_SUCCESS");
export const taskListFailure = createAction("TASK_LIST_FAILURE");

export const taskRequest = createAction("TASK_REQUEST");
export const taskSuccess = createAction("TASK_SUCCESS");
export const taskFailure = createAction("TASK_FAILURE");

export const taskMoved = createAction("TASK_MOVED");
export const modalOpen = createAction("MODAL_OPEN");
export const modalClose = createAction("MODAL_CLOSE");
