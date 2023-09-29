import axios from "axios";

import {
  ALL_PRODUCT_FAILED,
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,

  CLEAR_ERRORS,
} from "../consants/productConsants";

// Get All Products
export const getProduct =
  (keyword = "", currentPage = 1, price = [0, 25000], category, ratings = 0) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_PRODUCT_REQUEST });

      let link = `http://192.168.1.123:2000/api/v1/products`;

    
      const { data } = await axios.get(link);

      dispatch({
        type: ALL_PRODUCT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type:   ALL_PRODUCT_FAILED,
        payload: error.response.data.message,
      });
    }
  };





// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};