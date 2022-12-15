import { createSlice } from "@reduxjs/toolkit";

// create a slice
const masterSlice = createSlice({
  name: "master",
  initialState: {
    countires: null,
    currency:null,
  },
  reducers: {
    actionSetCurrency: (state, action) => {
      state.currency = action.payload;
    },
    actionGetCountries: (state) => {
      state.countires = null;
    },
    actionGetCountriesSuccess: (state, action) => {
      state.countires = action.payload;
    },
    actionGetCountriesFail: (state, action) => {
      state.countires = null;
    },

    actionGetPayment: (state) => {
      state.payment = null;
    },
    actionGetPaymentSuccess: (state, action) => {
      state.payment = action.payload;
    },
    actionGetPaymentFail: (state, action) => {
      state.payment = null;
    },

    actionGetShipping: (state) => {
      state.shipping = null;
    },
    actionGetShippingSuccess: (state, action) => {
      state.shipping = action.payload;
    },
   actionGetShippingFail: (state, action) => {
     state.shipping = null;
    },
  },
});
// export actions
export const {
  actionGetCountries,
  actionGetCountriesSuccess,
  actionGetCountriesFail,

  actionGetPayment,
  actionGetPaymentSuccess,
  actionGetPaymentFail,

  actionGetShipping,
  actionGetShippingSuccess,
  actionGetShippingFail,
  actionSetCurrency,
} = masterSlice.actions;

//export reducers
export default masterSlice.reducer;
