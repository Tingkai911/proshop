import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_DELIVER_FAIL,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_SUCCESS,
} from "../constants/orderConstants";
import axios from "axios";

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_CREATE_REQUEST,
    });

    // Get the token
    const {
      userLogin: { userInfo },
    } = getState();

    // To send the content type and the token in the header
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    // Send request to create a new order
    const { data } = await axios.post(`/api/orders`, order, config);
    console.log(data);

    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload: message,
    });
  }
};

export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_DETAILS_REQUEST,
    });

    // Get the token
    const {
      userLogin: { userInfo },
    } = getState();

    // To send the content type and the token in the header
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    // Send request to get the order by id
    const { data } = await axios.get(`/api/orders/${id}`, config);

    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: message,
    });
  }
};

export const payOrder = (orderId, paymentResult) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: ORDER_PAY_REQUEST,
    });

    // Get the token
    const {
      userLogin: { userInfo },
    } = getState();

    // To send the content type and the token in the header
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    // Send put request to update the order in the backend
    const { data } = await axios.put(
      `/api/orders/${orderId}/pay`,
      paymentResult,
      config
    );

    dispatch({
      type: ORDER_PAY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: ORDER_PAY_FAIL,
      payload: message,
    });
  }
};

export const deliverOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_DELIVER_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    // Send put request to the backend to update the order (empty object is needed)
    const { data } = await axios.put(
      `/api/orders/${order._id}/deliver`,
      {},
      config
    );

    dispatch({
      type: ORDER_DELIVER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: ORDER_DELIVER_FAIL,
      payload: message,
    });
  }
};

export const listMyOrders = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_LIST_MY_REQUEST,
    });

    // Get the token
    const {
      userLogin: { userInfo },
    } = getState();

    // To send the content type and the token in the header
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    // Send get request to backend to get all the order by the logged in user
    const { data } = await axios.get(`/api/orders/myorders`, config);

    dispatch({
      type: ORDER_LIST_MY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: ORDER_LIST_MY_FAIL,
      payload: message,
    });
  }
};

export const listOrders = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_LIST_REQUEST,
    });

    // Get the token
    const {
      userLogin: { userInfo },
    } = getState();

    // To send the content type and the token in the header
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    // Send get request to backend to get all orders
    const { data } = await axios.get(`/api/orders`, config);

    dispatch({
      type: ORDER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: ORDER_LIST_FAIL,
      payload: message,
    });
  }
};
