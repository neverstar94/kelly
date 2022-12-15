import { all } from "redux-saga/effects";

import AuthSaga from "./auth.saga";
import CartSaga from "./cart.saga";
import MasterSaga from "./master.saga";
import ProfileSaga from "./profile.saga";
import CheckoutSaga from "./checkout.saga";

function* rootSaga() {
  yield all([
    AuthSaga(),
    CartSaga(),
    MasterSaga(),
    ProfileSaga(),
    CheckoutSaga(),
  ]);
}
export default rootSaga;