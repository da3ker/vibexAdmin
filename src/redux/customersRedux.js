import { createSlice } from "@reduxjs/toolkit";

const customerSlice = createSlice({
  name: "customer",
  initialState: {
    customers: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    //Get All
    getCustomerStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getCustomerSuccess: (state, action) => {
      state.isFetching = false;
      state.customers = action.payload;
    },
    getCustomerFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    //Delete Account
    deleteCustomerStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteCustomerSuccess: (state, action) => {
      state.isFetching = false;
      state.customers.splice(
        state.customers.findIndex((item) => item._id === action.payload),
        1
      );
    },
    deleteCustomerFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    //Update Account
    updateCustomerStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateCustomerSuccess: (state, action) => {
      state.isFetching = false;
      state.customers[
        state.customers.findIndex((item) => item._id === action.payload.id)
      ] = action.payload;
    },
    updateCustomerFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  getCustomerStart,
  getCustomerSuccess,
  getCustomerFailure,
  deleteCustomerStart,
  deleteCustomerSuccess,
  deleteCustomerFailure,
  updateCustomerStart,
  updateCustomerSuccess,
  updateCustomerFailure,
} = customerSlice.actions;
export default customerSlice.reducer;
