import { combineReducers } from "redux";
import { handleActions } from "redux-actions";
import { taskListRequest, taskListSuccess, taskListFailure } from "./actions";
import { createSelector } from "reselect";

export const mapStatus = [
  "Согласование",
  "Ожидание",
  "Разработка",
  "Тестирование",
  "Корректировки",
  "Готова"
];

const taskList = handleActions(
  {
    [taskListRequest]: (state, action) => null,
    [taskListSuccess]: (state, action) => action.payload,
    [taskListFailure]: (state, action) => null
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

export default combineReducers({
  taskList
});
