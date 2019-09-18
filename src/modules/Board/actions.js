import { createAction } from "redux-actions";

export const taskListRequest = createAction("TASK_LIST_REQUEST");
export const taskListSuccess = createAction("TASK_LIST_SUCCESS");
export const taskListFailure = createAction("TASK_LIST_FAILURE");
export const droppableChange = createAction("DROPPABLE_CHANGE");
