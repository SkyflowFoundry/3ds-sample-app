import React from "react";
import { CardDetailsStep } from "../../organisms/CardDetailsStep";
import Background from "../../templates/Background";

const Home = () => {
  return (
    <Background
      title={"3DS WITH SKYFLOW"}
      subtitle={
        "See how Skyflow's comprehensive 3DS solution makes it easy to make transactions, protecting sensitive data."
      }
      body={CardDetailsStep}
      documentationLink={`https://docs.skyflow.com`}
    />
  );
};

export default Home;
