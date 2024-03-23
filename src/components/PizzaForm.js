import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import CustomSelect from "./ui/Select";
import CustomForm from "./ui/CustomForm";
import { useDispatch, useSelector } from "react-redux";
import { addOrder } from "../redux/actions/pizzaActions";

import { v4 as uuidv4 } from "uuid";

const GlobalTypography = () => (
  <Typography
    variant="body1"
    component="style"
    dangerouslySetInnerHTML={{
      __html: `
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap');
        body {
          font-family: 'Roboto', sans-serif;
        }
      `,
    }}
  />
);
const ModalContent = styled(Box)(({ theme }) => ({
  backgroundColor: "white",
  borderRadius: "8px",
  boxShadow: theme.shadows[5],
  padding: theme.spacing(4),
  outline: "none",
  maxWidth: "400px",
  width: "90%",
  textAlign: "center",
}));

const PizzaForm = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.order.orders);
  const [order, setOrder] = useState({
    type: "Veg",
    size: "Large",
    base: "Thin",
  });
  const [modalOpen, setModalOpen] = useState(false);

  const handleChange = (e) => {
    setOrder({ ...order, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (orders.length < 10) {
      const newOrder = {
        ...order,
        id: uuidv4(),
        stage: "Order Placed",
        timeSpent: 0,
      };
      dispatch(addOrder(newOrder));
      setOrder({ type: "Veg", size: "Large", base: "Thin" });
    } else {
      alert("Not taking any order for now");
    }
  };

  const handleCancel = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <GlobalTypography />
      <h2>Place Order</h2>
      <Button variant="contained" onClick={() => setModalOpen(true)}>
        Order Pizza
      </Button>
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        aria-labelledby="order-pizza-modal-title"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ModalContent>
          <Typography variant="h6" id="order-pizza-modal-title" gutterBottom>
            Place Order
          </Typography>
          <CustomForm handleSubmit={handleSubmit} handleCancel={handleCancel}>
            <CustomSelect
              label="Type"
              value={order.type}
              onChange={handleChange}
              options={["Veg", "Non-Veg"]}
            />
            <CustomSelect
              label="Size"
              value={order.size}
              onChange={handleChange}
              options={["Large", "Medium", "Small"]}
            />
            <CustomSelect
              label="Base"
              value={order.base}
              onChange={handleChange}
              options={["Thin", "Thick"]}
            />
          </CustomForm>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default PizzaForm;
