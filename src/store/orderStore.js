import axios from "axios";

const initState = {
  orders: [],
  stocks: []
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

export const getOrders = userid => {
  return dispatch => {
    return axios.get(`api/orders/${userid}`).then(result => {
      const orders = result.data;
      dispatch(gotOrdersFromServer(orders));
    });
  };
};

const gotStocksFromServer = stocks => ({
  type: "FETCH_STOCKS",
  stocks
});

export const getStocks = userid => {
  return dispatch => {
    return axios.get(`api/orders/stocks/${userid}`).then(result => {
      const stocks = result.data;
      dispatch(gotStocksFromServer(stocks));
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
    case "FETCH_STOCKS":
      return {
        ...state,
        stocks: action.stocks
      };
    default:
      return state;
  }
};

export default orderReducer;
