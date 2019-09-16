import { combineReducers } from "redux";
import { fork } from "redux-saga/effects";
import board, { sagas as boardSagas } from "./Board";

export default combineReducers({ board });

export function* rootSaga() {
  yield fork(boardSagas);
}
