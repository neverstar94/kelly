import { createSlice } from "@reduxjs/toolkit";

// create a slice 
const authSlice = createSlice({
name:"auth",
initialState:{
    user: {
        isLoading: false,
        data: null,
        errors:null,
    },
},
    reducers: {
    
    actionGetUser:  (state) => {
        state.user = {
            isLoading: true,
            data: null,
            errors:null,
        }
    },
    actionGetUserSuccess:(state, action) => {
        state.user = {
                isLoading: false,
                data: action.payload && action.payload.data && action.payload.data.data,
                errors: null,
        }
    },
     actionGetUserFail: (state, action) => {
        state.user = {
                isLoading: false,
                data: null,
                errors:action.payload
        }
        },
        actionUserLogout: (state) => {
         state.user = {
                isLoading: false,
                data: null,
                errors:null,
        }
     }


   }
})
// export actions
export const {
    actionGetUser,
    actionGetUserSuccess,
    actionGetUserFail,
    actionUserLogout,
} = authSlice.actions

//export reducers
export default authSlice.reducer;