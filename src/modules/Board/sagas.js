import {
  taskListRequest,
  taskListSuccess,
  taskListFailure,
  taskRequest,
  taskSuccess,
  taskFailure
} from "./actions";
import { fetchTaskList, fetchTask } from "./api.js";
import { take, takeLatest, put, call } from "redux-saga/effects";

function* fetchTaskListWatcher(action) {
  yield takeLatest(taskListRequest, fetchTaskListFlow);
  yield takeLatest(taskRequest, fetchTaskFlow);
}

export function* fetchTaskListFlow(action) {
  try {
    const result = yield call(fetchTaskList);
    if (result) {
      yield put(taskListSuccess(result));
    } else yield put(taskListFailure("Ошибка получения списка задач"));
  } catch (err) {
    yield put(taskListFailure(err.message));
  }
}

export function* fetchTaskFlow(action) {
  const id = action.payload;
  try {
    const result = yield call(fetchTask, id);
    if (result) {
      yield put(taskSuccess(result));
    } else yield put(taskFailure("Ошибка получения задачи"));
  } catch (err) {
    yield put(taskFailure(err.message));
  }
}

export default fetchTaskListWatcher;
