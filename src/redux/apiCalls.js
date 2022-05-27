import { loginFailure, loginStart, loginSuccess } from "./userRedux";
import { publicRequest, userRequest } from "../requestMethods";
import {
  deleteCustomerFailure,
  deleteCustomerStart,
  deleteCustomerSuccess,
  getCustomerFailure,
  getCustomerStart,
  getCustomerSuccess,
  updateCustomerFailure,
  updateCustomerStart,
  updateCustomerSuccess,
} from "./customersRedux";
import {
  addProductFailure,
  addProductStart,
  addProductSuccess,
  deleteProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  getProductFailure,
  getProductStart,
  getProductSuccess,
  updateProductFailure,
  updateProductStart,
  updateProductSuccess,
} from "./productsRedux";

//[=][=][=][=][=]***LOGGING-IN ADMIN***[=][=][=][=][=]//
export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure(err.response.data));
  }
};

//Customers---

//[=][=][=][=][=]***FETCHING CUSTOMER'S DATA***[=][=][=][=][=]//
export const getCustomers = async (dispatch, customer) => {
  dispatch(getCustomerStart());
  try {
    const res = await userRequest.get("/users/", customer);
    dispatch(getCustomerSuccess(res.data));
  } catch (err) {
    dispatch(getCustomerFailure());
  }
};

//[=][=][=][=][=]***DELETING CUSTOMER'S ACCOUNT***[=][=][=][=][=]//
export const deleteCustomer = async (id, dispatch) => {
  dispatch(deleteCustomerStart());
  try {
    const res = await userRequest.delete(`/users/${id}`);
    dispatch(deleteCustomerSuccess(res));
  } catch (err) {
    dispatch(deleteCustomerFailure());
  }
};

//[=][=][=][=][=]***UPDATING CUSTOMER'S DATA***[=][=][=][=][=]//
export const updateCustomer = async (dispatch, id, customer) => {
  dispatch(updateCustomerStart());
  try {
    // update
    const res = await userRequest.put(`/users/${id}`, customer);
    dispatch(updateCustomerSuccess(res.data));
  } catch (err) {
    dispatch(updateCustomerFailure());
  }
};

//Products---

//[=][=][=][=][=]***FETCHING PRODUCT'S DATA***[=][=][=][=][=]//
export const getProducts = async (dispatch, product) => {
  dispatch(getProductStart());
  try {
    const res = await userRequest.get("/products/", product);
    dispatch(getProductSuccess(res.data));
  } catch (err) {
    dispatch(getProductFailure());
  }
};

//[=][=][=][=][=]***DELETING PRODUCT***[=][=][=][=][=]//
export const deleteProduct = async (id, dispatch) => {
  dispatch(deleteProductStart());
  try {
    const res = await userRequest.delete(`/products/${id}`);
    dispatch(deleteProductSuccess(res));
  } catch (err) {
    dispatch(deleteProductFailure());
  }
};

//[=][=][=][=][=]***ADDING PRODUCT***[=][=][=][=][=]//
export const addProduct = async (product, dispatch) => {
  dispatch(addProductStart());
  try {
    const res = await userRequest.post(`/products`, product);
    dispatch(addProductSuccess(res.data));
  } catch (err) {
    dispatch(addProductFailure(err.response.data));
  }
};

//[=][=][=][=][=]***UPDATING PRODUCTS'S DATA***[=][=][=][=][=]//
export const updateProduct = async (id, product, dispatch) => {
  dispatch(updateProductStart());
  try {
    // update
    const res = await userRequest.put(`/products/${id}`, product);
    dispatch(updateProductSuccess(res.data));
  } catch (err) {
    dispatch(updateProductFailure(err.response.data));
  }
};
