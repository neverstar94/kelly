import { createSlice } from "@reduxjs/toolkit";

// create a slice
const profileSlice = createSlice({
  name: "profile",
  initialState: {
    address: {
      data: null,
      isLoading: false,
      errors: false,
    },

    wishlist:{
      isLoading: false,
      errors: null,
      data: null,
    },

    update: {
      isLoading: false,
      data: null,
      errors: null,
    },
    default: {
      isLoading: false,
      data: null,
      errors: null,
    },
  },
  reducers: {

    
    actionGetAddress: (state) => {
      state.address = {
        isLoading: true,
        data: null,
        errors: null,
      };
    },
    actionGetAddressSuccess: (state, action) => {
      state.address = {
        isLoading: false,
        data: action.payload,
        errors: null,
      };
    },
    actionGetAddressFail: (state, action) => {
      state.address = {
        isLoading: false,
        data: null,
        errors: action.payload,
      };
    },
    actionAddToFavourite: (state) => {
      state.wishlist = {
        data: null,
        isLoading: true,
        errors: false,
      };
    },
    actionAddToFavouriteSuccess: (state, action) => {
      state.wishlist = {
        isLoading: false,
        data: action.payload,
        erros: null,
      };
    },
    actionAddToFavouriteFail: (state, action) => {
      state.wishlist = {
        isLoading: false,
        errors: action.payload,
        data: null,
      };
    },

    actionUpdateProfile: (state) => {
      state.update = {
        isLoading: true,
        data: null,
        errors: null,
      };
    },

    actionUpdateProfileSuccess: (state, action) => {
      state.update = {
        isLoading: false,
        data: action.payload,
        errors: null,
      };
    },

    actionUpdateProfileFail: (state, action) => {
      state.update = {
        isLoading: false,
        data: null,
        errors: action.payload,
      };
    },

    actionGetWishlist: (state) => {
      state.wishlist = {
        isLoading: true,
        data: null,
        errors: null,
      };
    },
    actionGetWishlistSuccess: (state, action) => {
      state.wishlist = {
        isLoading: false,
        data: action.payload,
        errors: null,
      };
    },
    actionGetWishlistFail: (state, action) => {
      state.wishlist = {
        isLoading: false,
        errors: action.payload,
        data: null,
      };
    },

    actionMakeDefault: (state) => {
      state.default = {
        isLoading: true,
        data: null,
        errors: null,
      };
    },

    actionMakeDefaultSuccess: (state, action) => {
      state.default = {
        isLoading: false,
        data: action.payload,
        errors: null,
      };
    },

    actionMakeDefaultFail: (state, action) => {
      state.default = {
        isLoading: false,
        data: null,
        errors: action.payload,
      };
    },

    actionDeleteAddress: (state) => {
      state.address = {
        isLoading: true,
        data: null,
        errors: null,
      };
    },
    actionDeleteAddressSuccess: (state, action) => {
      state.address = {
        isLoading: false,
        data: action.payload,
        errors: null,
      };
    },
    actionDeleteAddressFail: (state, action) => {
      state.address = {
        isLoading: false,
        errors: action.payload,
        data: null,
      };
    },

    actionCreateAddress: (state) => {
      state.create = {
        isLoading: true,
        data: null,
        errors: null,
      };
    },

    actionCreateAddressSuccess: (state, action) => {
      state.create = {
        isLoading: false,
        data: action.payload,
        errors: null,
      };
    },
    

    actionCreateAddressFail: (state, action) => {
      state.create = {
        isLoading: false,
        data: null,
        errors: action.payload,
      };
    },
    actionEditAddress: (state) => {
      state.create = {
        isLoading: true,
        data: null,
        errors: null,
      };
    },

    actionEditAddressSuccess: (state, action) => {
      state.create = {
        isLoading: false,
        data: action.payload,
        errors: null,
      };
    },
    

    actionEditAddressFail: (state, action) => {
      state.create = {
        isLoading: false,
        data: null,
        errors: action.payload,
      };
    },
  },
});
// export actions
export const {
  actionGetAddress,
  actionGetAddressSuccess,
  actionGetAddressFail,

  actionAddToFavourite,
  actionAddToFavouriteSuccess,
  actionAddToFavouriteFail,

  actionUpdateProfile,
  actionUpdateProfileFail,
  actionUpdateProfileSuccess,

  actionGetWishlist,
  actionGetWishlistSuccess,
  actionGetWishlistFail,

  actionMakeDefault,
  actionMakeDefaultSuccess,
  actionMakeDefaultFail,

  actionDeleteAddress,
  actionDeleteAddressSuccess,
  actionDeleteAddressFail,

  actionCreateAddress,
  actionCreateAddressSuccess,
  actionCreateAddressFail,

  actionEditAddress,
  actionEditAddressSuccess,
  actionEditAddressFail,
} = profileSlice.actions;

//export reducers
export default profileSlice.reducer;
