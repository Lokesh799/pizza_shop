import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateOrderStage, cancelOrder } from '../redux/actions/pizzaActions';

const PizzaOrders = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      dispatch({ type: 'INCREMENT_TIME_SPENT' });
    }, 1000);
    return () => clearInterval(timer);
  }, [dispatch]);

  const handleStageChange = (orderId, stage) => {
    dispatch(updateOrderStage(orderId, stage));
  };

  const handleCancelOrder = (orderId) => {
    dispatch(cancelOrder(orderId));
  };

  const renderOrders = () => {
    return orders.map((order) => (
      <div key={order.id} style={{ backgroundColor: order.stage === 'Order Ready' ? 'green' : order.timeSpent > 180 ? 'red' : 'white' }}>
        <p>Order Id: {order.id}</p>
        <p>Stage: {order.stage}</p>
        <p>
          Total Time Spent: {Math.floor(order.timeSpent / 60)} min {order.timeSpent % 60} sec
        </p>
        {order.stage !== 'Order Ready' && (
          <button onClick={() => handleStageChange(order.id, 'Order Ready')}>Order Ready</button>
        )}
        <button onClick={() => handleCancelOrder(order.id)}>Cancel</button>
        <hr />
      </div>
    ));
  };

  return (
    <div>
      <h2>Pizza Orders</h2>
      {orders.length === 0 ? <p>No orders placed yet.</p> : renderOrders()}
    </div>
  );
};

export default PizzaOrders;

