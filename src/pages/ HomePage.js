import React from "react";
import PizzaOrders from "../components/PizzaStage"
import PizzaForm from "../components/PizzaForm";
import MainDisplay from "../components/PizzaCard"
const HomePage = () => {
  return (
    <div>
      {" "}
      <PizzaForm />
      <PizzaOrders />
      <MainDisplay />

    </div>
  );
};

export default HomePage;
