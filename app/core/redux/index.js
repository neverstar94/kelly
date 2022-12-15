import { combineReducers } from "@reduxjs/toolkit";
import AuthReducers from "./auth.actions";
import CartReducers from "./cart.actions";
import MasterReducer from "./master.actions";
import ProfileReducer from "./profile.actions";
import CheckoutReducer from "./checkout.actions";

const rootReducers = combineReducers({
    auth: AuthReducers,
    shopping: CartReducers,
    master: MasterReducer,
    profile: ProfileReducer,
    checkout: CheckoutReducer,
});
export default rootReducers;