// import Users from "core/services/Users";
import Auth from "core/services/auth";
import { call, put, takeLatest } from "redux-saga/effects";
import {
  actionGetUserSuccess,
  actionGetUserFail,
} from "../redux/auth.actions";


function* workGetUser() {
  const response = yield call(Auth.me);
  if (response && response.data.status) {
    yield put(actionGetUserSuccess(response));
  } else {
    yield put(actionGetUserFail(response));
  }
}

function* AuthSaga() {
  yield takeLatest("auth/actionGetUser", workGetUser);
}

export default AuthSaga;
