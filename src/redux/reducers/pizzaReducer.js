const initialState = {
  orders: [],
  totalDelivered: 0,
};

const pizzaReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'PLACE_ORDER':
      return {
        ...state,
        orders: [...state.orders, { ...action.payload, stage: 'Order Placed', startTime: new Date(), timeSpent: 0 }],
      };
    case 'UPDATE_ORDER_STAGE':
      return {
        ...state,
        orders: state.orders.map((order) =>
          order.id === action.payload.orderId ? { ...order, stage: action.payload.stage } : order
        ),
      };
    case 'CANCEL_ORDER':
      return {
        ...state,
        orders: state.orders.filter((order) => order.id !== action.payload),
      };
    default:
      return state;
  }
};

export default pizzaReducer;

