// src/redux/actions/pizzaActions.js
export const placeOrder = (order) => {
  return {
    type: 'PLACE_ORDER',
    payload: order,
  };
};

export const updateOrderStage = (orderId, stage) => {
  return {
    type: 'UPDATE_ORDER_STAGE',
    payload: { orderId, stage },
  };
};

export const cancelOrder = (orderId) => {
  return {
    type: 'CANCEL_ORDER',
    payload: orderId,
  };
};


