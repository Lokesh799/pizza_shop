import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { deleteOrder, updateOrderStage } from "../redux/actions/pizzaActions";

const MainDisplay = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.order.orders);
  const [timeElapsed, setTimeElapsed] = useState({});
  const [totalDeliveredItems, setTotalDeliveredItems] = useState(0);

  useEffect(() => {
    // Calculate total delivered items
    const totalDelivered = orders.filter(
      (order) => order.stage === "Order Picked"
    ).length;
    setTotalDeliveredItems(totalDelivered);

    // Calculate time elapsed for each order
    const interval = setInterval(() => {
      const updatedTimeElapsed = {};
      orders.forEach((order) => {
        const { id, startTime } = order;
        const timeDiff = Date.now() - startTime;
        const minutesElapsed = Math.floor(
          (timeDiff % (1000 * 60 * 60)) / (1000 * 60)
        );
        updatedTimeElapsed[id] = minutesElapsed;
      });
      setTimeElapsed(updatedTimeElapsed);
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, [orders]);

  const handleCancelOrder = (orderId) => {
    dispatch(deleteOrder(orderId));
  };

  const handleMoveToNextStage = (orderId, stage) => {
    dispatch(updateOrderStage(orderId, stage));
  };

  return (
    <div>
      <h2>Main Display</h2>
      <Typography variant="h6">
        Total Delivered Items: {totalDeliveredItems}
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Stage</TableCell>
              <TableCell>Total Time Spent</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.stage}</TableCell>
                <TableCell>{timeElapsed[order.id]} min</TableCell>
                <TableCell>
                  {order.stage === "Order in Making" && (
                    <Button onClick={() => handleCancelOrder(order.id)}>
                      Cancel
                    </Button>
                  )}
                  {/* {(order.stage === 'Order Placed' || order.stage === 'Order Ready') && (
                    <Button onClick={() => handleMoveToNextStage(order.id, getNextStage(order.stage))}>
                      Move to {getNextStage(order.stage)}
                    </Button>
                  )} */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

// const getNextStage = (currentStage) => {
//   switch (currentStage) {
//     case 'Order Placed':
//       return 'Order in Making';
//     case 'Order in Making':
//       return 'Order Ready';
//     case 'Order Ready':
//       return 'Order Picked';
//     default:
//       return '';
//   }
// };

export default MainDisplay;
