import { taskListRequest, taskListSuccess, taskListFailure } from "./actions";
import { fetchTaskList } from "./api.js";
import { take, takeLatest, put, call } from "redux-saga/effects";

function* fetchTaskListWatcher(action) {
  yield takeLatest(taskListRequest, fetchTaskListFlow);
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
export default fetchTaskListWatcher;
