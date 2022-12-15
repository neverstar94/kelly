import { createSlice } from "@reduxjs/toolkit";

// create a slice
const checkoutSlice = createSlice({
  name: "checkout",
  initialState: {
    add_coupon: {},
    remove_coupon: {},
    shipping: {},
    payment: {},
    order: {
      isLoading: false,
      data: null,
    },

    total: {
      isLoading: false,
      data: null,
    },

  },

  reducers: {
    actionAddCoupon: (state) => {},
    actionAddCouponSuccess: (state, action) => {},
    actionAddCouponFail: (state, action) => {},

    //delet coupon
    actionDeleteCoupon: (state) => {},
    actionDeleteCouponSuccess: (state, action) => {},
    actionDeleteCouponFail: (state, action) => {},

    //shipping
    actionShippingPrice: (state) => {},
    actionShippingPriceSuccess: (state, action) => {},

    actionShippingPriceFail: (state, action) => {},

    //payment

    actionAddPayment: (state) => {},

    actionAddPaymentSuccess: (state, action) => {},

    actionAddPaymentFail: (state, action) => {},

    actionPlaceOrder: (state) => {
      state.order = {
        isLoading: true,
        data: null,
      };
    },
    actionPlaceOrderSuccess: (state, action) => {
      state.order = {
        isLoading: false,
        data: action.payload,
      };
    },
    actionPlaceOrderFail: (state, action) => {
      state.order = {
        isLoading: false,
        data: null,
      };
    },

    actionGetPricing: (state) => {
      state.total = {
        isLoading: true,
        data: null,
      };
    },
    actionGetPricingSuccess: (state, action) => {
      state.total = {
        isLoading: false,
        data: action.payload,
      };
    },
    actionGetPricingFail: (state, action) => {
      state.total = {
        isLoading: false,
        data: null,
      };
    },
  },
});
// export actions
export const {
  actionGetPricing,
  actionGetPricingSuccess,
  actionGetPricingFail,
  actionPlaceOrder,
  actionPlaceOrderSuccess,
  actionPlaceOrderFail,
  actionAddCoupon,
  actionAddCouponSuccess,
  actionAddCouponFail,
  actionShippingPrice,
  actionShippingPriceFail,
  actionShippingPriceSuccess,
} = checkoutSlice.actions;

//export reducers
export default checkoutSlice.reducer;
