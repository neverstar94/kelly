
import { call, put, takeLatest } from "redux-saga/effects";
import {
  actionAddCouponSuccess, actionAddCouponFail, actionShippingPriceSuccess,
  actionShippingPriceFail, actionPlaceOrderSuccess, actionPlaceOrderFail,
  actionGetPricingSuccess,actionGetPricingFail,
} from "core/redux/checkout.actions";
import Checkout from "core/services/checkout";
import { AlertError, AlertSuccess } from "core/plugins/kelly-toast";

function* workCouponAdd(action) {
  const response = yield call(Checkout.applyCoupon, action.payload);
  if (response && response.data.status) {

    if (response.data.status) {
      AlertSuccess(response.data.message);
      yield put(actionAddCouponSuccess(response.data.data));
    } else {
      yield put(actionAddCouponFail(null));
      AlertError(response.data.message);
    }
  } else {
      AlertError("Invalid Promo coupon");
    yield put(actionAddCouponFail(null));
  }
}

function* workShippingPrice(action) {
  const response = yield call(Checkout.shippingCost, action.payload);
  if (response && response.data.status) {
      yield put(actionShippingPriceSuccess(response.data.data));
    AlertSuccess("Shipping added");
  } else {
    yield put(actionShippingPriceFail(null));
  }
}

function* workPlaceOrder() {
  const response = yield call(Checkout.totalPricing);
  if (response && response.data.status) {
      yield put(actionPlaceOrderSuccess(response.data.data));
    AlertSuccess("Total pricing calculated & ready to pay !");
  } else {
    yield put(actionPlaceOrderFail(null))
  }
} 


function* workGetPricing() {
  const response = yield call(Checkout.totalPricing);
  if (response && response.data.status) {
      yield put(actionGetPricingSuccess(response.data.data.totals));
  } else {
    yield put(actionGetPricingFail(null));
  }
} 


function* CheckoutSaga() {
  yield takeLatest("checkout/actionAddCoupon", workCouponAdd);
  yield takeLatest("checkout/actionShippingPrice", workShippingPrice);
  yield takeLatest("checkout/actionPlaceOrder", workPlaceOrder);
  yield takeLatest("checkout/actionGetPricing", workGetPricing);
}

export default CheckoutSaga;
