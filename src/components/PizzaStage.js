import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { deleteOrder, updateOrderStage } from "../redux/actions/pizzaActions";

const PizzaOrders = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.order.orders);
  const [timeElapsed, setTimeElapsed] = useState({});

  // const handleCancelOrder = (orderId) => {
  //   dispatch(deleteOrder(orderId));
  // };

  const handleMoveToNextStage = (orderId, stage) => {
    const updatedOrders = orders.map((order) => {
      if (order.id === orderId) {
        return {
          ...order,
          stage,
          startTime: Date.now(),
        };
      }
      return order;
    });
    dispatch(updateOrderStage(updatedOrders));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const updatedTimeElapsed = { ...timeElapsed };
      orders.forEach((order) => {
        const { id, startTime, stage, size } = order;
        let stageTime;
        switch (stage) {
          case "Order Placed":
            stageTime = size === "Small" ? 180 : size === "Medium" ? 240 : 300;
            break;
          case "Order in Making":
            stageTime = size === "Small" ? 180 : size === "Medium" ? 240 : 300;
            break;
          case "Order Ready":
            stageTime = size === "Small" ? 180 : size === "Medium" ? 240 : 300;
            break;
          case "Order Picked":
            stageTime = 0;
            break;
          default:
            stageTime = 0;
        }
        const timeDiff = Date.now() - startTime;
        const minutesElapsed = Math.floor(
          (timeDiff % (1000 * 60 * 60)) / (1000 * 60)
        );
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
    }, 1000);

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
                      <Box sx={{ p: 2 }}>
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
                      </Box>
                      {order.stage !== "Order Picked" && (
                        <Button
                          variant="contained"
                          sx={{
                            backgroundColor: "black",
                            color: "#fff", 
                            borderRadius: "20px", 
                            padding: "10px 20px",
                            "&:hover": {
                              backgroundColor: "#388e3c", 
                            },
                          }}
                          onClick={() =>
                            handleMoveToNextStage(order.id, getNextStage(stage))
                          }
                        >
                          Move to {getNextStage(stage)}
                        </Button>
                      )}
                      {/* {order.stage === "Order Picked" && (
                        <Button onClick={() => handleCancelOrder(order.id)}>
                          Cancel
                        </Button>
                      )} */}
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

export default PizzaOrders;
