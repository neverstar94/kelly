import { createSlice } from "@reduxjs/toolkit";
import { AlertSuccess, AlertError } from "core/plugins/kelly-toast";
// create a slice
const cartSlice = createSlice({
  name: "shopping",
  initialState: {
    cart: {
      isLoading: false,
      data: null,
      errors: null,
    },
    update: {
      isLoading: false,
      data: null,
      errors: null,
    },
    add: {
      isLoading: false,
      data: null,
      errors: null,
    },
    remove: {
      isLoading: false,
      data: null,
      errors: null,
    },
  },
  reducers: {
    actionGetCart: (state) => {
      state.cart = {
        isLoading: true,
        data: null,
        errors: null,
      };
    },
    actionGetCartSuccess: (state, action) => {
      state.cart = {
        isLoading: false,
        data: action.payload,
        errors: null,
      };
    },
    actionGetCartFail: (state, action) => {
      state.cart = {
        isLoading: false,
        data: null,
        errors: action.payload,
      };
    },

    //add to cart
    actionAddCart: (state) => {
      state.add = {
        isLoading: true,
        data: null,
        errors: null,
      };
    },
    actionAddCartSuccess: (state, action) => {
      state.add = {
        isLoading: false,
        data: action.payload,
        errors: null,
      };
    },
    actionAddCartFail: (state, action) => {
      state.add = {
        isLoading: false,
        data: null,
        errors: action.payload,
      };
    },

    //remove from cart

    actionRemoveCart: (state) => {
      state.remove = {
        isLoading: true,
        data: null,
        errors: null,
      };
    },
    actionRemoveCartSuccess: (state, action) => {
      AlertSuccess("Item removed from your cart !");
      state.remove = {
        isLoading: false,
        data: action.payload,
        errors: null,
      };
    },
    actionRemoveCartFail: (state, action) => {
      state.remove = {
        isLoading: false,
        data: null,
        errors: action.payload,
      };
    },

    //add to cart
    actionUpdateCart: (state) => {
      state.update = {
        isLoading: true,
        data: null,
        errors: null,
      };
    },
    actionUpdateCartSuccess: (state, action) => {
      state.update = {
        isLoading: false,
        data: action.payload,
        errors: null,
      };
    },
    actionUpdateCartFail: (state, action) => {
      state.update = {
        isLoading: false,
        data: null,
        errors: action.payload,
      };
    },
  },
});
// export actions
export const {
  actionGetCart,
  actionGetCartSuccess,
  actionGetCartFail,
  actionAddCart,
  actionAddCartFail,
  actionAddCartSuccess,
  actionRemoveCart,
  actionRemoveCartFail,
  actionRemoveCartSuccess,
  actionUpdateCart,
  actionUpdateCartSuccess,
  actionUpdateCartFail,
} = cartSlice.actions;

//export reducers
export default cartSlice.reducer;
