import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const MainDisplay = () => {
  const orders = useSelector((state) => state.orders);
  const currentTime = new Date();

  const renderInProgressOrders = () => {
    return orders
      .filter((order) => order.stage !== 'Order Picked')
      .map((order) => (
        <div key={order.id}>
          <p>Order Id: {order.id}</p>
          <p>Stage: {order.stage}</p>
          <p>Remaining Time: {calculateRemainingTime(order)} sec</p>
          <hr />
        </div>
      ));
  };

  const calculateRemainingTime = (order) => {
    const stageStart = new Date(order.startTime);
    const elapsedTime = (currentTime - stageStart) / 1000;
    return Math.max(0, getStageTime(order.stage) - elapsedTime);
  };

  const getStageTime = (stage) => {
    switch (stage) {
      case 'Order Placed':
        return 180; // 3 minutes
      case 'Order in Making':
        return 240; // 4 minutes
      case 'Order Ready':
        return 300; // 5 minutes
      default:
        return 0;
    }
  };

  return (
    <div>
      <h2>Main Display</h2>
      {orders.length === 0 ? <p>No orders placed yet.</p> : renderInProgressOrders()}
    </div>
  );
};

export default MainDisplay;
