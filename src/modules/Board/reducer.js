import { combineReducers } from "redux";
import { handleActions } from "redux-actions";
import {
  taskListRequest,
  taskListSuccess,
  taskListFailure,
  taskRequest,
  taskSuccess,
  taskFailure,
  taskMoved,
  modalOpen,
  modalClose
} from "./actions";
import { createSelector } from "reselect";

export const mapStatus = [
  "Согласование",
  "Ожидание",
  "Разработка",
  "Тестирование",
  "Корректировки",
  "Готова"
];

export const taskInModal = handleActions(
  {
    [taskRequest]: state => null,
    [taskSuccess]: (state, action) => action.payload,
    [taskFailure]: state => null,
    [modalClose]: state => null
  },
  null
);

const taskList = handleActions(
  {
    [taskListRequest]: (state, action) => null,
    [taskListSuccess]: (state, action) => action.payload,
    [taskListFailure]: (state, action) => null,
    [taskMoved]: (state, action) => {
      const newState = JSON.parse(JSON.stringify(state));
      newState[action.payload.id - 1] = action.payload;
      return newState;
    }
  },
  null
);

export const getTaskList = createSelector(
  state => state.board,
  board => {
    if (!board.taskList) return null;

    const list = [];
    mapStatus.forEach((status, index) => {
      list[index] = board.taskList.filter(item => item.status === index);
    });
    return list;
  }
);

export const getTaskInModal = createSelector(
  state => state.board.taskInModal,
  taskInModal => taskInModal
);

export default combineReducers({
  taskList,
  taskInModal
});
