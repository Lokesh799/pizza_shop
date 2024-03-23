export const ADD_ORDER = "ADD_ORDER";
export const DELETE_ORDER = "DELETE_ORDER";
export const UPDATE_ORDER_STAGE = "UPDATE_ORDER_STAGE";

export const addOrder = (order) => ({
  type: ADD_ORDER,
  payload: {
    ...order,
    startTime: Date.now(),
  },
});

export const deleteOrder = (orderId) => ({
  type: DELETE_ORDER,
  payload: orderId,
});

export const updateOrderStage = (orderId, stage) => ({
  type: UPDATE_ORDER_STAGE,
  payload: { orderId, stage },
});
