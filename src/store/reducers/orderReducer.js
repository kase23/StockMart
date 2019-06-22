const initState = {
  orders: [
    { stock: "APPL", price: "100", quantity: "5", total: "500" },
    { stock: "BBY", price: "10", quantity: "25", total: "250" },
    { stock: "VOO", price: "70", total: "70" }
  ]
};

export const addOrder = order => {
  return { type: "ADD_ORDER", payload: order };
};

//action is an object
const orderReducer = (state = initState, action) => {
  switch (action.type) {
    case "ADD_ORDER":
      return {
        ...state,
        orders: [...state.orders, action.payload]
      };
    default:
      return state;
  }
};

export default orderReducer;
