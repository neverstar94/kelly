

import { call, put, takeLatest } from "redux-saga/effects";
import Master from "core/services/master";
import {
  actionGetCountriesFail, actionGetCountriesSuccess, actionGetPaymentSuccess, actionGetPaymentFail,
actionGetShippingFail, actionGetShippingSuccess} from "core/redux/master.actions";
import { AlertSuccess } from "core/plugins/kelly-toast";

function* workCountries() {
    const response = yield call(Master.getCounties);
  if (response && response.data.status) {
    console.log(response.data.data.countries)
    yield put(actionGetCountriesSuccess(response.data.data.countries));
  } else {
    yield put(actionGetCountriesFail(response));
  }
}

function* workShipping(action) {
    const response = yield call(Master.getShipping, action.payload);
  if (response && response.data.status) {
    yield put(actionGetShippingSuccess(response.data.data.shipping_services));
    AlertSuccess("Choose Delivery option");
  } else {
    yield put(actionGetShippingFail(response));
  }
}

function* workPayment() {
    const response = yield call(Master.getPaymentTypes);
  if (response && response.data.status) {
    yield put(actionGetPaymentSuccess(response.data.data.countries));
  } else {
    yield put(actionGetPaymentFail(response));
  }
}

function* MasterSaga() {
  yield takeLatest("master/actionGetCountries", workCountries);
  yield takeLatest("master/actionGetShipping", workShipping);
  yield takeLatest("master/actionGetPayment", workPayment);
}

export default MasterSaga;
