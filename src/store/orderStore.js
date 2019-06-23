import axios from "axios";

const initState = {
  orders: []
};

export const addOrder = order => {
  //return { type: "ADD_ORDER", payload: order };
  return (dispatch, getState) => {
    dispatch({ type: "ADD_ORDER", order });
  };
};

const gotOrdersFromServer = orders => ({
  type: "FETCH_ORDERS",
  orders
});

export const getOrders = () => {
  return dispatch => {
    return axios.get("api/orders").then(result => {
      const orders = result.data;
      dispatch(gotOrdersFromServer(orders));
    });
  };
};

//action is an object
const orderReducer = (state = initState, action) => {
  switch (action.type) {
    case "ADD_ORDER":
      return {
        ...state,
        orders: [...state.orders, action.order]
      };
    case "FETCH_ORDERS":
      return {
        ...state,
        orders: action.orders
      };
    default:
      return state;
  }
};

export default orderReducer;
