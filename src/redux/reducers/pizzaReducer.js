import { ADD_ORDER, DELETE_ORDER, UPDATE_ORDER_STAGE } from "../actions/pizzaActions";

const initialState = {
  orders: [],
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ORDER:
      return {
        ...state,
        orders: [...state.orders, { ...action.payload, stage: "Order Placed" }],
      };
    case DELETE_ORDER:
      return {
        ...state,
        orders: state.orders.filter((order) => order.id !== action.payload),
      };
    case UPDATE_ORDER_STAGE:
      return {
        ...state,
        orders: state.orders.map((order) =>
          order.id === action.payload.orderId
            ? { ...order, stage: action.payload.stage }
            : order
        ),
      };
    default:
      return state;
  }
};

export default orderReducer;
