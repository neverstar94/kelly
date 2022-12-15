
import { call, put, takeLatest ,takeEvery} from "redux-saga/effects";
import Profile from "core/services/profile";
import {
  actionGetAddress,
  actionGetAddressFail, actionGetAddressSuccess, actionAddToFavouriteSuccess,
  actionAddToFavouriteFail, actionUpdateProfileSuccess, actionUpdateProfileFail,
  actionGetWishlistSuccess,
  actionGetWishlistFail,
  actionMakeDefaultSuccess,
  actionMakeDefaultFail,
  actionDeleteAddressSuccess,
  actionDeleteAddressFail,
  actionCreateAddressSuccess,
  actionCreateAddressFail
} from "core/redux/profile.actions";
import { AlertError, AlertSuccess } from "core/plugins/kelly-toast";

function* workProfileAddress() {
  const response = yield call(Profile.address);
  if (response && response.data.status) {
    yield put(actionGetAddressSuccess(response.data.data));

  } else {
    yield put(actionGetAddressFail(response));
  }
}

function* workFavourites(action) {
  const {response} = yield call(Profile.wishlist, action.payload);
  console.log(response.status);
  if (response && response.status === 200 || response.status === 201) {
    yield put(actionAddToFavouriteSuccess(response));
  } else {
    if (response && response.status === 401) {
       AlertError("Please login to continue");
    }
    yield put(actionAddToFavouriteFail(response));
  }
}

function* workUpdate(action) {
  const response = yield call(Profile.update, action.payload);
  if (response && response.data.status) {
    yield put(actionUpdateProfileSuccess(response));
    AlertSuccess("Profile updated ");
  } else {
    AlertError(response.data.message);
    yield put(actionUpdateProfileFail(response));
  }
}

function* workWishlist() {
  const response = yield call(Profile.wishlist);
  if (response && response.data.status) {
    yield put(actionGetWishlistSuccess(response.data.data.wishlist));
  } else {
    yield put(actionGetWishlistFail(response));
  }
}

function* workDefault(action) {
  const response = yield call(Profile.default, action.payload);
  if (response && response.data.status) {
    AlertSuccess("Address updated successfully.");
    yield put(actionMakeDefaultSuccess(response));
    yield put(actionGetAddress());
  } else {
    yield put(actionMakeDefaultFail(response));
  }
}


function* workDelete(action) {
  const response = yield call(Profile.delete, action.payload);
  if (response && response.data.status) {
    AlertSuccess("Address deleted successfully.");
    yield put(actionDeleteAddressSuccess(response));
    yield put(actionGetAddress());
  } else {
    yield put(actionDeleteAddressFail(response));
  }
}

function* workCreate(action) {
  const response = yield call(Profile.create, action.payload);
  if (response && response.data.status) {
    AlertSuccess("New address created successfully.");
    yield put(actionCreateAddressSuccess(response));
    yield put(actionGetAddress());
  } else {
    AlertError(response.data.message);
    yield put(actionCreateAddressFail(response));
  }
}



function* ProfileSaga() {
  yield takeLatest("profile/actionGetAddress", workProfileAddress);
  yield takeLatest("profile/actionGetWishlist", workWishlist);
  yield takeEvery("profile/actionAddToFavourite", workFavourites);
  yield takeEvery("profile/actionUpdateProfile", workUpdate);
  yield takeEvery("profile/actionMakeDefault", workDefault);
  yield takeEvery("profile/actionDeleteAddress", workDelete);
  yield takeEvery("profile/actionCreateAddress", workCreate);
}

export default ProfileSaga;
