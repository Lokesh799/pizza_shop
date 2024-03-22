import React from "react";
import PizzaCard from "../components/PizzaCard";
import { PizzaStage } from "../components/PizzaStage";
import PizzaForm from "../components/PizzaForm";
const HomePage = () => {
  return (
    <div>
      {" "}
      HomePage
      <PizzaCard />
      <PizzaStage />
      <PizzaForm />
    </div>
  );
};

export default HomePage;
