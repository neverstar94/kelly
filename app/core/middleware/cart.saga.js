import {
  actionGetCart,
  actionGetCartFail,
  actionGetCartSuccess,
  actionRemoveCartFail,
  actionRemoveCartSuccess,
  actionUpdateCartSuccess,
  actionUpdateCartFail,
  actionClearCartSuccess,
  actionClearCartFail,
} from "core/redux/cart.actions";
import Cart from "core/services/cart";
import { call, put, takeLatest } from "redux-saga/effects";

function* workGetCart() {
  const response = yield call(Cart.get);
  console.log(response);
  if (response && response.data.status) {
    yield put(actionGetCartSuccess(response.data.data));
  } else {
    yield put(actionGetCartFail(response));
  }
}

function* workRemoveCart(action) {
  const response = yield call(Cart.remove, action.payload);
  if (response && response.data.status) {
    yield put(actionRemoveCartSuccess(response.data.data));
    yield put(actionGetCart());
  } else {
    yield put(actionRemoveCartFail(response));
  }
}

function* workUpdateCart(action) {
  const response = yield call(Cart.update, action.payload);
  if (response && response.data.status) {
    yield put(actionUpdateCartSuccess(response.data.data));
    yield put(actionGetCart());
  } else {
    yield put(actionUpdateCartFail(response));
  }
}
function* CartSaga() {
  yield takeLatest("shopping/actionGetCart", workGetCart);
  yield takeLatest("shopping/actionRemoveCart", workRemoveCart);
  yield takeLatest("shopping/actionUpdateCart", workUpdateCart);
}

export default CartSaga;
