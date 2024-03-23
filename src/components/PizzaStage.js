import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Grid, Paper, Typography } from "@mui/material";
import { deleteOrder, updateOrderStage } from "../redux/actions/pizzaActions";

const MainDisplay = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.order.orders);
  const [timeElapsed, setTimeElapsed] = useState({});

  const handleCancelOrder = (orderId) => {
    dispatch(deleteOrder(orderId));
  };

  const handleMoveToNextStage = (orderId, stage) => {
    dispatch(updateOrderStage(orderId, stage));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const updatedTimeElapsed = { ...timeElapsed };
      orders.forEach((order) => {
        const { id, startTime, stage, size } = order;
        let stageTime;
        switch (stage) {
          case "Order Placed":
            stageTime = size === "Small" ? 180 : size === "Medium" ? 240 : 300; // Set stage time based on size
            break;
          case "Order in Making":
            stageTime = size === "Small" ? 180 : size === "Medium" ? 240 : 300; // Set stage time based on size
            break;
          case "Order Ready":
            stageTime = size === "Small" ? 180 : size === "Medium" ? 240 : 300; // Set stage time based on size
            break;
          case "Order Picked":
            stageTime = 0; // Set stage time to 0 for "Order Picked" stage
            break;
          default:
            stageTime = 0;
        }
        const timeDiff = Date.now() - startTime;
        const minutesElapsed = Math.floor(
          (timeDiff % (1000 * 60 * 60)) / (1000 * 60)
        );
        // Reset the timer for the current stage if stage changes
        if (timeElapsed[id] === undefined || stage !== timeElapsed[id].stage) {
          updatedTimeElapsed[id] = { stage: stage, time: 0 }; 
        } else {
          updatedTimeElapsed[id] = {
            stage: stage,
            time: minutesElapsed > stageTime ? stageTime : minutesElapsed, 
          };
        }
      });
      setTimeElapsed(updatedTimeElapsed);
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, [orders, timeElapsed]);

  const sortByDelay = (a, b) => {
    const stageOrder = [
      "Order Placed",
      "Order in Making",
      "Order Ready",
      "Order Picked",
    ];
    return stageOrder.indexOf(a.stage) - stageOrder.indexOf(b.stage);
  };

  const sortedOrders = [...orders].sort(sortByDelay);

  return (
    <div>
      <h2>Main Display</h2>
      <div className="orders-container">
        {/* Display each stage in different columns */}
        <Grid container spacing={2}>
          {[
            "Order Placed",
            "Order in Making",
            "Order Ready",
            "Order Picked",
          ].map((stage) => (
            <Grid item xs={3} className="stage-column" key={stage}>
              <h3>{stage}</h3>
              {sortedOrders.map(
                (order) =>
                  order.stage === stage && (
                    <Paper
                      key={order.id}
                      className={`order-card`}
                      style={{
                        backgroundColor:
                          timeElapsed[order.id] &&
                          timeElapsed[order.id].time >= 3
                            ? "red"
                            : "",
                      }}
                    >
                      <Typography variant="body1">
                        Order ID: {order.id}
                      </Typography>
                      <Typography variant="body1">
                        Type: {order.type}
                      </Typography>
                      <Typography variant="body1">
                        Size: {order.size}
                      </Typography>
                      <Typography variant="body1">
                        Base: {order.base}
                      </Typography>
                      <Typography variant="body1">
                        Time Elapsed:{" "}
                        {timeElapsed[order.id] && timeElapsed[order.id].time}{" "}
                        min
                      </Typography>
                      {order.stage !== "Order Picked" && (
                        <Button
                          onClick={() =>
                            handleMoveToNextStage(order.id, getNextStage(stage))
                          }
                        >
                          Move to {getNextStage(stage)}
                        </Button>
                      )}
                      {order.stage === "Order Picked" && (
                        <Button onClick={() => handleCancelOrder(order.id)}>
                          Cancel
                        </Button>
                      )}
                    </Paper>
                  )
              )}
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

const getNextStage = (currentStage) => {
  switch (currentStage) {
    case "Order Placed":
      return "Order in Making";
    case "Order in Making":
      return "Order Ready";
    case "Order Ready":
      return "Order Picked";
    default:
      return "";
  }
};

export default MainDisplay;
